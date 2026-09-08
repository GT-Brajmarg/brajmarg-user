"use client";

import Image from "next/image";

export default function BookingHero() {
  return (
    <section className="relative overflow-hidden py-6">
      {/* Temple Illustration */}

      <Image
        src="/images/hero-temple-outline-1.png"
        alt=""
        width={520}
        height={220}
        className="absolute top-0 right-2"
      />

      <div className="relative">
        <h1
          className="font-cormorant text-[52px] leading-none font-bold text-[#0F5C66]"
          style={{ marginTop: "60px" }}
        >
          Book Your Yatra
        </h1>

        <p
          className="font-cormorant mt-3 text-[22px] text-[#3D352F]"
          style={{ marginTop: "10px", marginBottom: "50px" }}
        >
          Fill in your details to confirm your booking
        </p>
      </div>
    </section>
  );
}
