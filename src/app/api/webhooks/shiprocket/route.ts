import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/admin";

/**
 * Shiprocket tracking webhook — authoritative shipment-status path.
 *
 * Shiprocket POSTs every scan/status change here. We:
 *   1. authenticate via a shared token header (configured in dashboard),
 *   2. record the event idempotently in shipment_events,
 *   3. update the shipment row,
 *   4. roll the order's status up from its shipments.
 *
 * Configure in the Shiprocket dashboard (Settings → Webhooks):
 *   URL:   https://<host>/api/webhooks/shiprocket
 *   Token: SHIPROCKET_WEBHOOK_TOKEN  (sent back as the x-api-key header)
 *
 * NOTE: the payload field names below (`awb`, `current_status`,
 * `current_status_id`, `shipment_status`) follow Shiprocket's documented
 * shape but are marked `// FIELD-MAP` — confirm against a real webhook
 * delivery before production.
 */

export const dynamic = "force-dynamic";

// Maps a raw Shiprocket status to our shipments.status enum + the
// order-level roll-up state. // FIELD-MAP: confirm exact status strings.
function mapStatus(raw: string): {
  shipment: string;
  terminal: "delivered" | "cancelled" | null;
} {
  const s = raw.toUpperCase();
  if (s.includes("DELIVERED")) return { shipment: "delivered", terminal: "delivered" };
  if (s.includes("RTO")) return { shipment: "rto", terminal: "cancelled" };
  if (s.includes("CANCEL")) return { shipment: "cancelled", terminal: "cancelled" };
  if (s.includes("OUT FOR DELIVERY") || s.includes("OFD"))
    return { shipment: "ofd", terminal: null };
  if (s.includes("PICKED")) return { shipment: "picked_up", terminal: null };
  if (s.includes("TRANSIT") || s.includes("SHIPPED"))
    return { shipment: "in_transit", terminal: null };
  return { shipment: "created", terminal: null };
}

export async function POST(request: Request) {
  const token = process.env.SHIPROCKET_WEBHOOK_TOKEN;
  if (!token) {
    console.error("Shiprocket webhook: SHIPROCKET_WEBHOOK_TOKEN not set");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  // Shiprocket sends the configured token back as x-api-key.
  if (request.headers.get("x-api-key") !== token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let event: Record<string, unknown>;
  try {
    event = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  // FIELD-MAP: confirm these keys against a real webhook body.
  const awb: string | undefined = event?.awb as string | undefined;
  const rawStatus: string = String(
    event?.current_status ?? event?.shipment_status ?? ""
  );
  const statusId = event?.current_status_id ?? rawStatus;

  if (!awb) {
    // Nothing to reconcile; ack so Shiprocket stops retrying.
    return NextResponse.json({ received: true });
  }

  const admin = createServiceClient();
  if (!admin) {
    console.error("Shiprocket webhook: service client unavailable");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  // Find the shipment this AWB belongs to.
  const { data: shipment } = await admin
    .from("shipments")
    .select("id, order_id")
    .eq("awb_code", awb)
    .maybeSingle();

  if (!shipment) {
    // AWB we don't know about (e.g. created outside this app). Ack.
    return NextResponse.json({ received: true });
  }

  // 1. Idempotent event log. The unique (provider, provider_event_id)
  //    constraint makes a duplicate delivery a no-op.
  const providerEventId = `${awb}-${statusId}`;
  const { error: evErr } = await admin.from("shipment_events").insert({
    shipment_id: shipment.id,
    provider: "shiprocket",
    provider_event_id: providerEventId,
    event_type: rawStatus,
    raw_status: rawStatus,
    payload: event,
  });
  // 23505 = unique_violation -> already processed; safe to continue/ack.
  if (evErr && evErr.code !== "23505") {
    console.error("Shiprocket webhook event insert error:", evErr);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
  if (evErr?.code === "23505") {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const { shipment: shipmentStatus, terminal } = mapStatus(rawStatus);

  // 2. Update the shipment (never regress out of a delivered state).
  await admin
    .from("shipments")
    .update({ status: shipmentStatus, raw_status: rawStatus })
    .eq("id", shipment.id)
    .neq("status", "delivered");

  // 3. Roll the order status up from ALL its shipments.
  await rollUpOrderStatus(admin, shipment.order_id, terminal);

  return NextResponse.json({ received: true });
}

/**
 * Recomputes the order's status from its shipments:
 *   - all shipments delivered          -> delivered
 *   - all shipments rto/cancelled       -> cancelled
 *   - any picked_up/in_transit/ofd/...  -> shipped
 * Guarded so a delivered order is never regressed.
 */
async function rollUpOrderStatus(
  admin: NonNullable<ReturnType<typeof createServiceClient>>,
  orderId: string,
  terminal: "delivered" | "cancelled" | null
) {
  const { data: shipments } = await admin
    .from("shipments")
    .select("status")
    .eq("order_id", orderId);

  if (!shipments || shipments.length === 0) return;

  const statuses = shipments.map((s) => s.status as string);
  const allDelivered = statuses.every((s) => s === "delivered");
  const allClosed = statuses.every((s) => s === "delivered" || s === "rto" || s === "cancelled");
  const anyMoving = statuses.some((s) =>
    ["picked_up", "in_transit", "ofd"].includes(s)
  );

  let next: string | null = null;
  if (allDelivered) next = "delivered";
  else if (allClosed && terminal === "cancelled") next = "cancelled";
  else if (anyMoving) next = "shipped";

  if (!next) return;

  await admin
    .from("orders")
    .update({ status: next })
    .eq("id", orderId)
    .neq("status", "delivered"); // never regress a delivered order
}
