/**
 * Fulfillment orchestrator: turns a confirmed order into Shiprocket
 * shipment(s) and persists them into the `shipments` table.
 *
 * Called after payment is settled:
 *   - Razorpay: from verifyRazorpayPayment (payment_type 'Prepaid')
 *   - COD:      from placeOrder            (payment_type 'COD')
 *
 * Design rules:
 *   - Best-effort: a shipment failure must NOT fail the order. The order
 *     stays at `confirmed` and Admin can retry (manual "Create Shipment").
 *     We never throw back into the payment flow.
 *   - Multi-pickup ready: items are grouped by pickup (temple -> tag),
 *     so a mixed cart becomes one shipment per pickup.
 *   - Cheapest serviceable courier is chosen per shipment; for COD we
 *     only consider COD-capable couriers.
 *   - All writes use the service-role client (shipments has no write RLS).
 *
 * Server-only.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { shiprocket, pickCheapestServiceable } from "./shiprocket";
import { groupByPickup, type RoutableItem } from "./resolve-pickup";
import type { PaymentType } from "./types";

type OrderForShipment = {
  id: string;
  order_number: string;
  total_amount: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
};

/**
 * Creates shipment(s) for an order. Returns the number of shipments
 * created. Swallows errors (logs them) so the caller's payment flow is
 * never broken — un-shipped orders are visible in Admin for retry.
 */
export async function createShipmentsForOrder(
  admin: SupabaseClient,
  order: OrderForShipment,
  items: RoutableItem[],
  paymentType: PaymentType
): Promise<{ created: number; failed: number }> {
  let created = 0;
  let failed = 0;

  if (!order.shipping_pincode) {
    console.error(`[fulfillment] order ${order.order_number} has no pincode; skipping.`);
    return { created: 0, failed: 1 };
  }

  let groups;
  try {
    groups = await groupByPickup(admin, items);
  } catch (e) {
    console.error(`[fulfillment] pickup grouping failed for ${order.order_number}:`, e);
    return { created: 0, failed: 1 };
  }

  for (const group of groups) {
    try {
      const subTotal = group.items.reduce(
        (sum, it) => sum + it.item_price * it.quantity,
        0
      );
      const codAmount = paymentType === "COD" ? subTotal : 0;

      // Pick cheapest serviceable courier (COD-capable when COD).
      const couriers = await shiprocket.checkServiceability({
        pickupPincode: group.pickupPincode,
        deliveryPincode: order.shipping_pincode!,
        cod: paymentType === "COD",
        weight: 0.5, // TODO: sum real per-SKU weights once stored
      });
      const courier = pickCheapestServiceable(couriers, paymentType === "COD");

      if (!courier) {
        console.error(
          `[fulfillment] no serviceable courier for ${order.order_number} ` +
            `(${group.pickupPincode}->${order.shipping_pincode}, cod=${paymentType === "COD"}).`
        );
        failed++;
        continue;
      }

      const result = await shiprocket.createShipment({
        orderNumber: order.order_number,
        pickupTag: group.pickupTag,
        paymentType,
        subTotal,
        codAmount,
        courierId: courier.courierId,
        customer: {
          name: order.customer_name,
          phone: order.customer_phone,
          email: order.customer_email,
          addressLine1: order.shipping_address_line1 ?? "",
          addressLine2: order.shipping_address_line2,
          city: order.shipping_city ?? "",
          state: order.shipping_state ?? "",
          pincode: order.shipping_pincode!,
        },
        items: group.items.map((it) => ({
          name: it.item_name,
          sku: it.item_id,
          units: it.quantity,
          sellingPrice: it.item_price,
        })),
      });

      const { error: insErr } = await admin.from("shipments").insert({
        order_id: order.id,
        provider: result.provider,
        pickup_tag: group.pickupTag,
        sr_order_id: result.srOrderId,
        shipment_id: result.shipmentId,
        awb_code: result.awbCode,
        courier_name: result.courierName ?? courier.courierName,
        tracking_url: result.trackingUrl,
        delivery_pin: result.deliveryPin,
        payment_type: paymentType,
        cod_amount: codAmount,
        status: "created",
        estimated_delivery: result.estimatedDelivery,
      });

      if (insErr) {
        console.error(`[fulfillment] shipments insert failed for ${order.order_number}:`, insErr);
        failed++;
        continue;
      }
      created++;
    } catch (e) {
      console.error(`[fulfillment] shipment create failed for ${order.order_number}:`, e);
      failed++;
    }
  }

  // Move the order to `processing` only if at least one shipment was made.
  if (created > 0) {
    await admin
      .from("orders")
      .update({ status: "processing" })
      .eq("id", order.id)
      .eq("status", "confirmed");
  }

  return { created, failed };
}

/**
 * Loads a paid order + its items from the DB and creates shipment(s).
 * Used for the Razorpay paths (verify action AND webhook fallback),
 * where the cart is already gone so items come from order_items
 * (which carry temple_id for routing).
 *
 * Idempotent at the call site: callers must only invoke this for the
 * call that actually promoted the order to paid, so it never double-ships.
 */
export async function createPrepaidShipmentForOrderId(
  admin: SupabaseClient,
  dbOrderId: string
): Promise<void> {
  // Skip if shipments already exist for this order (extra safety).
  const { count } = await admin
    .from("shipments")
    .select("id", { count: "exact", head: true })
    .eq("order_id", dbOrderId);
  if ((count ?? 0) > 0) return;

  const { data: order } = await admin
    .from("orders")
    .select(
      "id, order_number, total_amount, customer_name, customer_phone, customer_email, " +
        "shipping_address_line1, shipping_address_line2, shipping_city, shipping_state, shipping_pincode"
    )
    .eq("id", dbOrderId)
    .single();
  if (!order) return;

  const { data: items } = await admin
    .from("order_items")
    .select("item_id, item_name, item_price, quantity, temple_id")
    .eq("order_id", dbOrderId);

  const routable: RoutableItem[] = (items ?? []).map((it) => ({
    item_id: it.item_id as string,
    item_name: it.item_name as string,
    item_price: Number(it.item_price),
    quantity: it.quantity as number,
    temple_id: (it.temple_id as string | null) ?? null,
  }));
  if (routable.length === 0) return;

  await createShipmentsForOrder(
    admin,
    order as unknown as OrderForShipment,
    routable,
    "Prepaid"
  );
}
