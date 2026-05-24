import { NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/utils/supabase/admin";
import { createPrepaidShipmentForOrderId } from "@/lib/shipping/fulfillment";

/**
 * Razorpay webhook — authoritative reconciliation path.
 *
 * Client-side verifyRazorpayPayment can be lost (closed tab, network
 * drop) after a real payment. Razorpay also POSTs the outcome here,
 * so the order is reconciled even when the browser never returns.
 *
 * Configure in the Razorpay dashboard:
 *   URL:    https://<host>/api/razorpay/webhook
 *   Secret: RAZORPAY_WEBHOOK_SECRET
 *   Events: payment.captured, payment.failed
 */

// Razorpay sends raw JSON; the signature is over the exact bytes, so
// the body must be read as text (no framework body parsing).
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("Razorpay webhook: RAZORPAY_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  // Constant-time compare; bail before parsing untrusted input.
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (
    sigBuf.length !== expBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expBuf)
  ) {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const payment = (
    (event?.payload as Record<string, unknown> | undefined)?.payment as
      | Record<string, unknown>
      | undefined
  )?.entity as Record<string, unknown> | undefined;
  const dbOrderId: string | undefined = (
    payment?.notes as Record<string, unknown> | undefined
  )?.db_order_id as string | undefined;
  const razorpayOrderId: string | undefined = payment?.order_id as string | undefined;
  const paymentId: string | undefined = payment?.id as string | undefined;

  if (!dbOrderId && !razorpayOrderId) {
    // Nothing to reconcile (e.g. an event we don't care about). Ack so
    // Razorpay stops retrying.
    return NextResponse.json({ received: true });
  }

  const admin = createServiceClient();
  if (!admin) {
    // 500 so Razorpay retries once the key is configured.
    console.error("Razorpay webhook: service client unavailable");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  // Which column identifies the order: prefer the db id from notes,
  // else reconcile by Razorpay order id.
  const matchCol = dbOrderId ? "id" : "razorpay_order_id";
  const matchVal = (dbOrderId ?? razorpayOrderId) as string;

  if (event.event === "payment.captured") {
    // Idempotent: only promote a still-pending order. `.select()` tells us
    // whether THIS call did the promotion (vs a verify/webhook race), so
    // only the winner creates the shipment — no double-shipping.
    const { data: promoted, error } = await admin
      .from("orders")
      .update({
        payment_status: "paid",
        status: "confirmed",
        payment_id: paymentId,
        razorpay_order_id: razorpayOrderId,
      })
      .eq(matchCol, matchVal)
      .eq("payment_status", "pending")
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Razorpay webhook captured update error:", error);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }

    // Fulfillment fallback: if the browser never returned to
    // verifyRazorpayPayment, the shipment is created here instead.
    if (promoted?.id) {
      await createPrepaidShipmentForOrderId(admin, promoted.id as string);
    }
  } else if (event.event === "payment.failed") {
    // Never downgrade an order that was already paid.
    const { error } = await admin
      .from("orders")
      .update({ payment_status: "failed", payment_id: paymentId })
      .eq(matchCol, matchVal)
      .eq("payment_status", "pending");

    if (error) {
      console.error("Razorpay webhook failed update error:", error);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
