"use client";

import { CheckCircle2, Star, Plus } from "lucide-react";

const monthlyBenefits = [
  "Aarti & Pooja Reminders",
  "Festival & Ekadashi Alerts",
  "Seva Availability Updates",
  "Prasad Dispatch Updates",
  "Yatra Updates",
  "Personalized Alert Preferences",
];

const yearlyBenefits = [
  "Priority Seva Booking",
  "Festival Day Early Access",
  "Priority Prasad Booking",
  "10% Discount on Yatra Packages",
  "Birthday & Anniversary Blessings",
  "Special Member Offers & Discounts",
];

export default function MembershipBenefitsCard() {
  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#FAF4EB]/70 p-5 sm:p-6 shadow-xs">
      <h2 className="font-cormorant mb-5 text-center text-[24px] sm:text-[28px] font-bold text-[#0F5C66]">
        Included in Your Yearly Membership
      </h2>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Central Plus Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex h-8 w-8 items-center justify-center rounded-full border border-[#C37000] bg-[#FAF4EB] shadow-xs">
          <Plus size={16} strokeWidth={2.5} className="text-[#C37000]" />
        </div>

        {/* Monthly Benefits Box */}
        <div className="rounded-[14px] border border-[#C37000] bg-[#FAF4EB]/80 p-4 sm:p-5">
          <h3 className="font-cormorant mb-3 text-[19px] sm:text-[21px] font-bold text-[#0F5C66]">
            All Monthly Alert Benefits
          </h3>

          <div className="space-y-2.5">
            {monthlyBenefits.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#0F5C66] shrink-0" strokeWidth={2} />
                <span className="text-[13.5px] sm:text-[14px] font-medium text-[#2C241E]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Yearly Benefits Box */}
        <div className="rounded-[14px] border border-[#C37000] bg-[#FAF4EB]/80 p-4 sm:p-5">
          <h3 className="font-cormorant mb-3 text-[19px] sm:text-[21px] font-bold text-[#C37000]">
            Your Yearly Benefits (Exclusive)
          </h3>

          <div className="space-y-2.5">
            {yearlyBenefits.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <Star size={15} className="text-[#C37000] fill-[#C37000]/15 shrink-0" strokeWidth={1.8} />
                <span className="text-[13.5px] sm:text-[14px] font-medium text-[#2C241E]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
