"use client";

import { Info, Phone } from "lucide-react";

export default function ImportantNotes() {
  const notes = [
    "Cancellation & refund available within 12 hours of booking.",
    "Please ensure correct details before proceeding.",
    "Photos & Videos will be shared within 24–48 hours after seva.",
  ];

  return (
    <section className="relative mt-6 sm:mt-8 overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#0B6670]/60 bg-[#0B6670]/12 p-5 sm:p-7 md:p-8 shadow-sm">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Left Notes */}
        <div className="flex-1">
          <h2 className="font-cormorant text-[24px] sm:text-[28px] font-semibold text-[#0B6670]">
            Important Notes
          </h2>

          <div className="mt-4 space-y-3">
            {notes.map((note) => (
              <div key={note} className="flex items-start gap-2.5">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-[#C37000]"
                  strokeWidth={2}
                />
                <p className="font-cormorant text-[15px] sm:text-[16px] leading-relaxed text-[#3D352F]">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Need Help Box */}
        <div className="w-full rounded-[16px] border border-[#0B6670]/50 bg-transparent p-5 sm:p-6 lg:w-[320px] shrink-0">
          <h3 className="font-cormorant text-[22px] sm:text-[24px] font-semibold text-[#0B6670]">
            Need Help?
          </h3>

          <p className="font-cormorant mt-1 text-[14px] sm:text-[15px] leading-snug text-[#4F4941]">
            Our support team is here to assist you.
          </p>

          <a
            href="tel:+917896512657"
            className="mt-4 inline-flex items-center gap-2.5 text-[#0B6670] transition hover:text-[#084F57]"
          >
            <Phone size={18} strokeWidth={2.2} className="rotate-12" />
            <span className="font-cormorant text-[18px] sm:text-[20px] font-bold tracking-wide">
              +91 78965 12657
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
