"use client";

import { useState } from "react";
import CheckoutHeader from "../CheckoutHeader";
import CheckoutStepper from "../CheckoutStepper";
import OrderSummary from "../OrderSummary";
import TrustFeatures from "../TrustFeatures";
import PaymentMethod from "./PaymentMethod";
import PlaceOrderButton from "./PlaceOrderButton";
import { useAppSelector } from "@/store/hooks";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay",
  );

  const items = useAppSelector((state) => state.cart.items);

  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <CheckoutHeader
          title="Payment"
          subtitle="Choose your payment option and place your order securely."
          backHref="/checkout"
          backLabel="Back to Delivery"
        />

        <CheckoutStepper currentStep={2} />

        <div
          className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]"
          style={{ marginTop: "40px" }}
        >
          <div className="flex flex-col gap-6">
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            <PlaceOrderButton paymentMethod={paymentMethod} />
          </div>

          <div className="flex flex-col gap-6">
            <OrderSummary items={items} />
            <TrustFeatures />
          </div>
        </div>
      </div>
    </section>
  );
}
