"use client";

import Image from "next/image";
import BirthdayBlessingCard from "./BirthdayBlessingCard";
import AnniversaryBlessingCard from "./AnniversaryBlessingCard";
import HowItWorksCard from "./HowItWorksCard";

export default function ActivateBenefitsCard() {
  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#FAF4EB]/70 p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="mb-5 flex items-start gap-3 px-1">
        <Image
          src="/images/gold-star.svg"
          alt=""
          width={22}
          height={22}
          className="mt-1 shrink-0"
        />

        <div>
          <h2 className="font-cormorant text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#0F5C66] leading-tight">
            Activate Your Exclusive Yearly Benefits
          </h2>

          <p className="font-cormorant mt-1 text-[14px] sm:text-[15px] font-medium text-[#4A3E36]">
            Add a few details to make your experience more personal and meaningful.
          </p>
        </div>
      </div>

      {/* Birthday Blessings */}
      <BirthdayBlessingCard />

      {/* Anniversary Blessings */}
      <AnniversaryBlessingCard />

      {/* How It Works */}
      <HowItWorksCard />
    </section>
  );
}
