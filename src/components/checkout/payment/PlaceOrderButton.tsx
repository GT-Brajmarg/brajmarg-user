"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { loadRazorpay } from "@/lib/loadRazorpay";

type PlaceOrderButtonProps = {
  paymentMethod: "razorpay" | "cod";
  amount: number;
};

export default function PlaceOrderButton({
  paymentMethod,
  amount,
}: PlaceOrderButtonProps) {
  const router = useRouter();

  const handleRazorpayPayment = async () => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Unable to load Razorpay");
      return;
    }

    // TODO: Replace with your actual order total

    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount, // ← Uses the prop passed from PaymentPage
      }),
    });

    const data = await response.json();

    if (!data.success) {
      alert("Unable to create Razorpay order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: data.order.amount,

      currency: data.order.currency,

      name: "Brajmarg",

      description: "Temple Booking",

      order_id: data.order.id,

      handler: async function (response: any) {
        const verify = await fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const result = await verify.json();

        if (result.success) {
          router.push("/checkout/confirmation");
        } else {
          alert("Payment verification failed");
        }
      },

      theme: {
        color: "#C37000",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === "razorpay") {
      await handleRazorpayPayment();
      return;
    }

    // COD Flow
    router.push("/checkout/confirmation");
  };

  return (
    <section
      className="mt-5 overflow-hidden rounded-2xl border border-[#C37000] bg-[#C37000]/4 p-5"
      style={{ marginBottom: "30px" }}
    >
      <button
        type="button"
        onClick={handlePlaceOrder}
        className="font-cormorant flex h-[54px] w-[720px] items-center justify-center gap-3 rounded-[8px] bg-[#0B6670] text-[18px] font-bold text-[#EFDEC7] transition hover:bg-[#084F57]"
        style={{
          marginLeft: "30px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Place Order
        <ArrowRight size={20} />
      </button>
    </section>
  );
}
