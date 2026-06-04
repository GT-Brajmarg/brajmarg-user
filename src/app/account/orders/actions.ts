"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/admin";
import { resolveRefund, parseTravelDate } from "@/lib/cancellation";

/**
 * User-requested cancellation of their own order.
 *
 * Sets status='cancelled' and records the computed refund tier in the
 * order notes. It does NOT call the Razorpay refund API — approved
 * refunds are processed by the admin team (5–7 business days), per the
 * Cancellation & Refund Policy. Already-cancelled or already-refunded
 * orders are no-ops.
 *
 * Writes go through the service-role client because `orders` has no
 * UPDATE RLS policy (same constraint as the payment flow). Ownership is
 * verified first against the user's session.
 */
export async function requestOrderCancellation(orderId: string) {
  if (!orderId) return { success: false, message: "Missing order." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Please log in." };

  // Verify ownership + current state via the user's RLS-scoped client.
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, user_id, status, payment_status, notes, created_at")
    .eq("id", orderId)
    .maybeSingle();

  if (error || !order) return { success: false, message: "Order not found." };
  if (order.user_id !== user.id)
    return { success: false, message: "Not your order." };
  if (order.status === "cancelled")
    return { success: false, message: "This order is already cancelled." };
  if (order.payment_status === "refunded")
    return { success: false, message: "This order was already refunded." };

  const refund = resolveRefund({
    pickupAt: parseTravelDate(order.notes),
    isPaid: order.payment_status === "paid",
  });

  const cancelNote = `Cancellation requested ${new Date().toISOString()} — ${refund.label}`;
  const newNotes = [order.notes, cancelNote].filter(Boolean).join("\n");

  const admin = createServiceClient();
  if (!admin) {
    return {
      success: false,
      message: "Cancellation is temporarily unavailable. Please contact support.",
    };
  }

  // Idempotent guard: only cancel an order that isn't already cancelled.
  const { error: updErr } = await admin
    .from("orders")
    .update({ status: "cancelled", notes: newNotes })
    .eq("id", orderId)
    .neq("status", "cancelled");

  if (updErr) {
    console.error("ORDER CANCEL ERROR:", updErr);
    return { success: false, message: "Could not cancel the order. Please try again." };
  }

  revalidatePath("/account/orders");
  return {
    success: true,
    message:
      refund.tier === "none"
        ? "Order cancelled. As per policy, no refund applies."
        : refund.tier === "half"
          ? "Order cancelled. A 50% refund will be processed in 5–7 business days."
          : order.payment_status === "paid"
            ? "Order cancelled. Your refund will be processed in 5–7 business days."
            : "Order cancelled.",
  };
}
