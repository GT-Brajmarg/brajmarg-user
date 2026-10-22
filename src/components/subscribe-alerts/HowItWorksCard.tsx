"use client";

import Image from "next/image";

export default function HowItWorksCard() {
  return (
    <div className="rounded-[16px] border border-[#C37000] bg-[#FAF4EB]/60 p-4 sm:p-5">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Lotus Icon */}
        <div className="shrink-0">
          <Image
            src="/images/lotus_bright.png"
            alt="Lotus"
            width={48}
            height={48}
            className="h-10 w-auto sm:h-12 object-contain"
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="font-cormorant text-[20px] sm:text-[23px] font-bold text-[#C37000]">
            How It Works ?
          </h3>

          <p className="font-cormorant mt-1 text-[14.5px] sm:text-[15.5px] font-medium leading-relaxed text-[#4A3E36]">
            We will send timely reminders and personalized suggestions based on
            the temples you follow. You can book sevas or order prasad easily
            from the suggestions we share with you.
          </p>
        </div>
      </div>
    </div>
  );
}
