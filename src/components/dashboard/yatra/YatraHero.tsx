"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function YatraHero() {
  return (
    <section className="relative pb-5">
      {/* Temple Illustration */}
      <Image
        src="/images/temple-outline.svg"
        alt=""
        width={448}
        height={200}
        className="pointer-events-none absolute right-0 bottom-0 opacity-80"
      />

      {/* Hero Content */}
      <div className="relative z-10 mt-[30px]" style={{ marginTop: "30px" }}>
        <h1
          className={`${cormorantInfant.className} text-[30px] leading-none font-bold text-[#0F5C66]`}
        >
          My Yatras
        </h1>

        {/* Divider */}
        <div
          className="mt-[10px] mb-[10px] flex items-center"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <div className="h-[1px] w-[160px] bg-[#D8A96B]" />

          <Image
            src="/images/lotus.png"
            alt=""
            width={30}
            height={20}
            className="ml-[5px]"
            style={{ marginLeft: "5px" }}
          />
        </div>

        <p
          className={`${cormorantInfant.className} mt-6 max-w-xl text-[20px] leading-8 font-bold text-[#3D352F]`}
        >
          View and manage all your Yatra bookings in one place.
        </p>
      </div>
    </section>
  );
}
