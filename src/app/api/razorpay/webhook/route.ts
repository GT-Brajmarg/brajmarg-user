import { NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/utils/supabase/admin";

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

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const payment = event?.payload?.payment?.entity;
  const dbOrderId: string | undefined = payment?.notes?.db_order_id;
  const razorpayOrderId: string | undefined = payment?.order_id;
  const paymentId: string | undefined = payment?.id;

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

  const matchOrder = (q: any) =>
    dbOrderId ? q.eq("id", dbOrderId) : q.eq("razorpay_order_id", razorpayOrderId);

  if (event.event === "payment.captured") {
    // Idempotent: only promote a still-pending order.
    const { error } = await matchOrder(
      admin
        .from("orders")
        .update({
          payment_status: "paid",
          status: "confirmed",
          payment_id: paymentId,
          razorpay_order_id: razorpayOrderId,
        })
    ).eq("payment_status", "pending");

    if (error) {
      console.error("Razorpay webhook captured update error:", error);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }
  } else if (event.event === "payment.failed") {
    // Never downgrade an order that was already paid.
    const { error } = await matchOrder(
      admin
        .from("orders")
        .update({ payment_status: "failed", payment_id: paymentId })
    ).eq("payment_status", "pending");

    if (error) {
      console.error("Razorpay webhook failed update error:", error);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
