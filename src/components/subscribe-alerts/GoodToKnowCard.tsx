"use client";

import { Info, CheckCircle2 } from "lucide-react";

const notes = [
  "You can change these preferences anytime from your dashboard.",
  "You will continue to receive alerts as per your selected preferences.",
  "Cancel anytime. No hidden charges.",
];

export default function GoodToKnowCard() {
  return (
    <section className="rounded-[16px] border border-[#C37000] bg-[#FAF4EB]/70 p-5 shadow-xs">
      {/* Header */}
      <div className="mb-3.5 flex items-center gap-2.5">
        <Info size={19} className="text-[#0F5C66] shrink-0" strokeWidth={2} />
        <h2 className="font-cormorant text-[22px] sm:text-[24px] font-bold text-[#0F5C66]">
          Good to Know
        </h2>
      </div>

      {/* Notes List */}
      <div className="space-y-2.5">
        {notes.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-[#0F5C66] shrink-0 mt-0.5" strokeWidth={2} />
            <span className="text-[13.5px] sm:text-[14px] font-medium text-[#2C241E] leading-normal">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
