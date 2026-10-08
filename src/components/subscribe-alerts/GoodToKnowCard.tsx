"use client";

import { Info, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Cormorant_Infant, Inter } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const notes = [
  "You can change these preferences anytime from your dashboard.",
  "You will continue to receive alerts as per your selected preferences.",
  "Cancel anytime. No hidden charges.",
];

export default function GoodToKnowCard() {
  return (
    <section
      className="rounded-[16px] border border-[#C37000] bg-[#C37000]/10 p-5"
      style={{ marginTop: "20px" }}
    >
      <div
        className="mb-4 flex items-center gap-2"
        style={{ marginLeft: "10px" }}
      >
        <Info size={18} className="text-[#0F5C66]" />

        <h2
          className={`${cormorantInfant.className} text-[28px] font-bold text-[#0F5C66]`}
        >
          Good to Know
        </h2>
      </div>

      <div
        className="space-y-3"
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      >
        {notes.map((item) => (
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
    </section>
  );
}
