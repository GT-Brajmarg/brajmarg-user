"use client";

import { useState } from "react";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  markRazorpayPaymentFailed,
} from "./actions";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayButton({
  total,
}: {
  total: number;
}) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);

    const form = document.getElementById(
      "checkout-form"
    ) as HTMLFormElement | null;

    if (!form) {
      alert("Checkout form not found.");
      setLoading(false);
      return;
    }

    // Trigger browser validation
    if (!form.reportValidity()) {
      setLoading(false);
      return;
    }

    // Step 1: create the DB order + Razorpay order. A failure here is
    // almost always a validation / connectivity issue, not a payment.
    let order: Awaited<ReturnType<typeof createRazorpayOrder>>;
    try {
      order = await createRazorpayOrder(new FormData(form));
    } catch (error) {
      console.error(error);
      alert(
        "Could not start checkout. Please review your details and try again."
      );
      setLoading(false);
      return;
    }

    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: order.name,
      order_id: order.orderId,
      prefill: order.prefill,

      // Step 2: payment succeeded on Razorpay — verify server-side.
      handler: async function (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) {
        try {
          await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            dbOrderId: order.dbOrderId,
          });
          window.location.href = "/cart?placed=success";
        } catch (error) {
          console.error(error);
          // Payment may have been captured; the webhook is the safety
          // net. Send the user somewhere they can see the real status.
          alert(
            "We received your payment but couldn't confirm it instantly. " +
              "If you were charged, your order will update shortly. " +
              "You can check Account → Transactions."
          );
          window.location.href = "/account/transactions";
        }
      },

      modal: {
        // User closed the modal without paying — mark the order failed
        // so it doesn't linger as `pending` on the transactions page.
        ondismiss: function () {
          markRazorpayPaymentFailed(order.dbOrderId).catch(console.error);
          setLoading(false);
        },
      },

      theme: {
        color: "#111111",
      },
    };

    const razorpay = new window.Razorpay(options);

    // Payment attempted but failed at Razorpay (declined card, etc.).
    razorpay.on("payment.failed", function (resp: any) {
      console.error("Razorpay payment.failed:", resp?.error);
      markRazorpayPaymentFailed(order.dbOrderId).catch(console.error);
      alert(
        resp?.error?.description ||
          "Payment failed. You have not been charged. Please try again."
      );
      setLoading(false);
    });

    razorpay.open();
  }

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={loading}
      className="w-full rounded-lg bg-brand-red text-white px-5 py-3 font-semibold disabled:opacity-60"
    >
      {loading ? "Processing..." : `Pay Online ₹${total}`}
    </button>
  );
}
