"use client";

import { Star } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import BirthdayBlessingCard from "./BirthdayBlessingCard";
import AnniversaryBlessingCard from "./AnniversaryBlessingCard";
import HowItWorksCard from "./HowItWorksCard";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ActivateBenefitsCard() {
  return (
    <section className="rounded-[16px] border border-[#C37000] bg-[#C37000]/4 p-5">
      {/* Header */}

      <div
        className="mb-5 flex items-start gap-3"
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "20px" }}
      >
        <Star
          size={18}
          className="mt-1 fill-[#F5C35A] text-[#D18418]"
          strokeWidth={1.8}
          style={{ marginTop: "10px" }}
        />

        <div>
          <h2
            className={`${cormorantInfant.className} text-[32px] leading-none font-bold text-[#0F5C66]`}
          >
            Activate Your Exclusive Yearly Benefits
          </h2>

          <p
            className="font-inter mt-1 text-[13px] leading-[1px] text-[#3D352F]"
            style={{ marginTop: "10px" }}
          >
            Add a few details to make your experience more personal and
            meaningful.
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
