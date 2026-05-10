"use client";

import { useState } from "react";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
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
    try {
      setLoading(true);

      const form = document.getElementById(
        "checkout-form"
      ) as HTMLFormElement | null;

      if (!form) {
        alert("Checkout form not found.");
        return;
      }

      // Trigger browser validation
      const valid = form.reportValidity();

      if (!valid) {
        setLoading(false);
        return;
      }

      const formData = new FormData(form);

      const order =
        await createRazorpayOrder(formData);

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: order.name,
        order_id: order.orderId,

        prefill: order.prefill,

        handler: async function (
          response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }
        ) {
          await verifyRazorpayPayment({
            razorpay_order_id:
              response.razorpay_order_id,
            razorpay_payment_id:
              response.razorpay_payment_id,
            razorpay_signature:
              response.razorpay_signature,
            dbOrderId: order.dbOrderId,
          });

          window.location.href =
            "/cart?placed=success";
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#111111",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
      alert(
        "Please fill all required fields correctly."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={loading}
      className="w-full rounded-lg bg-brand-red text-white px-5 py-3 font-semibold disabled:opacity-60"
    >
      {loading
        ? "Processing..."
        : `Pay Online ₹${total}`}
    </button>
  );
}