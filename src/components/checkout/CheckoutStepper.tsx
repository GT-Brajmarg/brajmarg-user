"use client";

import { Check } from "lucide-react";

interface Props {
  currentStep: number;
}

export default function CheckoutStepper({ currentStep }: Props) {
  return (
    <section className="mb-12 flex items-center justify-center">
      <div
        className="flex w-full max-w-xl items-center"
        style={{ marginTop: "20px" }}
      >
        {/* Step 1 */}
        <div
          className="flex items-center gap-2"
          //   style={{ marginRight: "10px" }}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
              currentStep >= 1
                ? "bg-[#0B6670] text-white"
                : "border border-[#D8D8D8] bg-white text-[#666]"
            }`}
          >
            {currentStep > 1 ? <Check size={18} /> : "1"}
          </div>

          <span
            className={`font-cormorant ${
              currentStep >= 1 ? "text-[#0B6670]" : "text-[#8B8B8B]"
            }`}
          >
            Delivery Details
          </span>
        </div>

        <div
          className={`mx-5 h-[2px] flex-1 ${
            currentStep > 1 ? "bg-[#0B6670]" : "bg-[#D6D6D6]"
          }`}
          style={{ marginLeft: "5px" }}
        />

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
              currentStep >= 2
                ? "bg-[#0B6670] text-white"
                : "bg-[#E5E5E5] text-[#666]"
            }`}
          >
            2
          </div>

          <span
            className={`font-cormorant ${
              currentStep >= 2 ? "text-[#0B6670]" : "text-[#8B8B8B]"
            }`}
          >
            Payment
          </span>
        </div>
      </div>
    </section>
  );
}
