"use client";

import { CheckCircle2, Star } from "lucide-react";
import { Cormorant_Infant, Inter } from "next/font/google";
import Image from "next/image";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

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
  "Festival Day Fast Access",
  "Priority Prasad Booking",
  "10% Discount on Yatra Packages",
  "Birthday & Anniversary Blessings",
  "Special Member Offers & Discounts",
];

export default function MembershipBenefitsCard() {
  return (
    <section
      className="rounded-[16px] border border-[#C37000] bg-[#C37000]/4 p-5"
      style={{ marginTop: "20px" }}
    >
      <h2
        className={`${cormorantInfant.className} mb-5 text-center text-[28px] font-bold text-[#0F5C66]`}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        Included in Your Yearly Membership
      </h2>

      <div
        className="grid grid-cols-2 gap-4"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Monthly */}

        <div className="rounded-xl border border-[#C37000] p-4">
          <h3
            className={`${cormorantInfant.className} mb-3 text-[22px] font-bold text-[#0F5C66]`}
            style={{ marginLeft: "10px" }}
          >
            All Monthly Alert Benefits
          </h3>

          <div className="space-y-2" style={{ marginLeft: "10px" }}>
            {monthlyBenefits.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Image
                  src="/images/star-1.svg"
                  alt="Star"
                  width={14}
                  height={14}
                  className="mt-1 shrink-0"
                  style={{ marginTop: "2px" }}
                />

                <span
                  className={`${inter.className} text-[14px] leading-5 text-[#3D352F]`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Yearly */}

        <div className="rounded-xl border border-[#C37000] p-4">
          <h3
            className={`${cormorantInfant.className} mb-3 text-[22px] font-bold text-[#C37000]`}
            style={{ marginLeft: "10px" }}
          >
            Your Yearly Benefits (Exclusive)
          </h3>

          <div className="space-y-2" style={{ marginLeft: "10px" }}>
            {yearlyBenefits.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Image
                  src="/images/gold-star.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mt-0.5 shrink-0"
                />

                <span
                  className={`${inter.className} text-[14px] leading-5 text-[#3D352F]`}
                >
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
