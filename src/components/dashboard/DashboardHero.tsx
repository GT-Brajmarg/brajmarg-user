"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DashboardHero() {
  return (
    <section className="w-full pt-2">
      <div className="relative overflow-hidden rounded-[24px] border border-[#C37000] bg-[#C37000]/10 px-8 py-8 shadow-sm">
        <Image
          src="/images/temple-outline.svg"
          alt=""
          width={420}
          height={180}
          className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2"
        />

        {/* <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={520}
          height={520}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        /> */}

        <div
          className="relative z-10 max-w-lg"
          style={{
            marginTop: "10px",
            marginLeft: "30px",
            marginBottom: "10px",
          }}
        >
          <h1
            className={`${cormorantInfant.className} text-[25px] font-bold text-[#0F5C66]`}
          >
            Jai Shri Radhe! 🌸
          </h1>

          <p
            className={`${cormorantInfant.className} mt-3 text-[16px] leading-7 font-bold text-[#0F5C66]`}
          >
            Welcome back. May your day be filled with peace, devotion,
            <br />
            and divine blessings.
          </p>
        </div>
      </div>
    </section>
  );
}
