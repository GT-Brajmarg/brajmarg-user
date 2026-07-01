"use client";

import CheckoutHeader from "./CheckoutHeader";
import CheckoutStepper from "./CheckoutStepper";
import ContinueButton from "./delivery/ContinueButton";
import DeliveryDetails from "./delivery/DeliveryDetails";
import DeliveryForm from "./delivery/DeliveryForm";
import DeliveryOptions from "./delivery/DeliveryOptions";
import { CheckoutProps } from "./types";

export default function CheckoutPage({ items }: CheckoutProps) {
  return (
    <section className="relative overflow-hidden bg-[#FBF5EB]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full bg-center bg-repeat"
          style={{
            backgroundImage: "url('/images/mandala-pattern.svg')",
            backgroundSize: "700px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <CheckoutHeader />

        {/* Stepper */}
        <CheckoutStepper currentStep={1} />

        {/* Main Layout */}
        <div
          className="grid gap-8 lg:grid-cols-[2fr_1fr]"
          style={{ marginTop: "40px" }}
        >
          {/* Left Side */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-dashed border-[#C67A00] bg-white/40 p-10">
              <h2 className="font-cormorant text-4xl text-[#0B6670]">
                <DeliveryDetails />
              </h2>
            </div>

            <div
              className="rounded-3xl border border-dashed border-[#C67A00] bg-white/40 p-10"
              style={{ marginTop: "10px" }}
            >
              <h2 className="font-cormorant text-4xl text-[#0B6670]">
                <DeliveryOptions />
              </h2>
            </div>

            <div
              className="rounded-3xl border border-dashed border-[#C67A00] bg-white/40 p-10"
              style={{ marginTop: "10px" }}
            >
              <ContinueButton />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-dashed border-[#C67A00] bg-white/40 p-10">
              <h2 className="font-cormorant text-4xl text-[#0B6670]">
                Order Summary
              </h2>

              <p className="mt-3">Total Items: {items.length}</p>
            </div>

            <div className="rounded-3xl border border-dashed border-[#C67A00] bg-white/40 p-10">
              Trust Features
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
