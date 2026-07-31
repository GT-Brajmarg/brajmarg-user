"use client";

import Image from "next/image";
import { Cormorant_Infant, Inter } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

export default function HowItWorksCard() {
  return (
    <div
      className="rounded-[14px] border border-[#C37000] bg-[#C37000]/10 p-5"
      style={{ marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}

        <Image
          src="/images/lotus.png"
          alt="Lotus"
          width={82}
          height={71}
          style={{ marginTop: "40px", marginLeft: "20px" }}
        />

        {/* Content */}

        <div>
          <h3
            className={`${cormorantInfant.className} text-[28px] font-bold text-[#C37000]`}
            style={{ marginTop: "10px" }}
          >
            How It Works ?
          </h3>

          <p
            className={`${cormorantInfant.className} mt-2 text-[20px] leading-6 font-bold text-[#3D352F]`}
            style={{ marginBottom: "10px" }}
          >
            We will send timely reminders and personalized suggestions based on
            the temples you follow. You can book sevas or order prasad easily
            from the suggestions we share with you.
          </p>
        </div>
      </div>
    </div>
  );
}
