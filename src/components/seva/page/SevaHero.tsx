"use client";

import Image from "next/image";
import { ShieldCheck, BadgeCheck, Lock, ScrollText } from "lucide-react";

const trustItems = [
  {
    image: "/images/temple-verified.svg",
    title: "Temple Verified",
    subtitle: "All temple & seva are verified & authentic",
  },
  {
    image: "/images/spiritual-assurance.svg",
    title: "Spiritual Assurance",
    subtitle: "Every seva is performed with devotion & purity",
  },
  {
    image: "/images/secure-booking.svg",
    title: "Secure Booking",
    subtitle: "100% secure payments & instant confirmation",
  },
  {
    image: "/images/transparent-process.svg",
    title: "Transparent Process",
    subtitle: "Complete details of your seva, always",
  },
];

export default function SevaHero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-[#F8F2E8]">
      <Image
        src="/images/hero-seva-temple.png"
        alt="Temple"
        fill
        priority
        // sizes="100vw"
        className="object-cover opacity-90"
        style={{
          objectPosition: "95% 50%",
        }}
      />
      {/* Background */}

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-[1240px] items-center px-7 py-12 md:px-12">
        <div className="max-w-[650px] md:translate-x-[200px]">
          {/* Left */}

          <h1 className="font-cormorant text-[52px] leading-[1.15] font-bold text-[#0B6670]">
            Offer Seva,
            <br />
            Receive Divine Blessings
          </h1>

          {/* Lotus Divider */}
          <div
            className="mt-6 flex items-center gap-3"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <div className="h-px w-16 bg-[#C98C3D]" />

            <Image src="/images/lotus.png" alt="" width={50} height={50} />

            <div className="h-px w-16 bg-[#C98C3D]" />
          </div>

          <p className="font-cormorant mt-6 max-w-[470px] text-[20px] leading-8 text-[#3D352F]">
            Book authentic temple sevas from trusted temples across India and
            invite divine blessings into your life.
          </p>

          {/* Trust Items */}
          <div
            className="mt-8 overflow-hidden rounded-xl border border-white bg-[#EFDEC7]/20 backdrop-blur-sm"
            style={{ marginTop: "20px", width: "900px" }}
          >
            <div
              className="grid grid-cols-2 lg:grid-cols-4"
              //   style={{ marginLeft: "10px" }}
            >
              {trustItems.map(({ image, title, subtitle }, index) => (
                <div
                  key={title}
                  className={`flex items-center gap-6 px-10 py-8 ${
                    index !== trustItems.length - 1 ? "" : ""
                  }`}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Image
                    src={image}
                    alt={title}
                    width={40}
                    height={40}
                    className="object-contain"
                    style={{ marginLeft: "10px" }}
                  />

                  <div>
                    <h4 className="font-cormorant text-[18px] leading-none font-semibold text-[#5A3B16]">
                      {title}
                    </h4>

                    <p
                      className="font-cormorant mt-1 text-[15px] leading-[1.25] text-[#5F4B35]"
                      style={{ marginTop: "5px" }}
                    >
                      {subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        {/* <div className="relative hidden lg:block">
          <Image
            src="/images/hero-seva-temple.png"
            alt="Temple"
            width={520}
            height={460}
            priority
            className="w-full object-contain"
          />
        </div> */}
      </div>

      {/* Bottom Fade */}
      {/* <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-[#F8F2E8] to-transparent" /> */}
    </section>
  );
}
