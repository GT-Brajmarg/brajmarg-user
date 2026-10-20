"use client";

import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface BookingHeroProps {
  title?: string;
  subtitle?: string;
}

export default function BookingHero({
  title = "Book Your Yatra",
  subtitle = "Fill in your details to confirm your sacred journey",
}: BookingHeroProps) {
  return (
    <section className="relative w-full overflow-hidden pt-10 pb-6 sm:pt-12 sm:pb-7">
      {/* Temple Outline — decorative top-right */}
      <Image
        src="/images/hero-temple-outline-1.png"
        alt=""
        width={420}
        height={180}
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 opacity-60 hidden sm:block"
      />

      <div className="relative z-10">
        <h1
          className={`${cormorant.className} text-[32px] sm:text-[42px] lg:text-[50px] leading-none font-bold text-[#0F5C66]`}
        >
          {title}
        </h1>

        <p
          className={`${cormorant.className} mt-2 text-[18px] sm:text-[22px] font-bold text-[#3D352F]`}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
