"use client";

import Image from "next/image";

const trustItems = [
  {
    image: "/images/yatra-organized.svg",
    title: "BrajMarg\nOrganized",
    subtitle: "Trusted & Verified\nJourneys",
  },
  {
    image: "/images/comfortable-travel.svg",
    title: "Comfortable\nTravel",
    subtitle: "Safe, Spacious\n& Reliable",
  },
  {
    image: "/images/satvik-meals.svg",
    title: "Satvik\nArrangements",
    subtitle: "Pure Food &\nPeaceful Stay",
  },
  {
    image: "/images/safe-journey.svg",
    title: "Safe\nJourney",
    subtitle: "Experienced Team\n& 24×7 Support",
  },
];

export default function YatraHero() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-[#F8F2E8]">
      {/* Background */}
      <Image
        src="/images/hero-yatra-temple.png"
        alt="Sacred Journey"
        fill
        priority
        className="object-cover opacity-90"
        style={{
          objectPosition: "95% 50%",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[500px] lg:min-h-[540px] max-w-[1240px] items-center px-6 sm:px-10 lg:px-14 py-10 lg:py-14">
        <div className="w-full max-w-[600px]">
          {/* Heading */}
          <h1 className="font-cormorant text-[38px] sm:text-[46px] lg:text-[52px] font-bold leading-[1.08] text-[#3B2813]">
            Begin Your
            <br />
            <span className="text-[#0B6670]">Sacred Journey</span>
          </h1>

          {/* Lotus Divider */}
          <div className="my-3 sm:my-3.5 flex items-center gap-2">
            <div className="h-[1px] w-12 sm:w-16 bg-[#C98C3D]/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C98C3D]" />
            <Image
              src="/images/lotus.png"
              alt=""
              width={34}
              height={24}
              className="object-contain"
            />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C98C3D]" />
            <div className="h-[1px] w-12 sm:w-16 bg-[#C98C3D]/70" />
          </div>

          {/* Description */}
          <p className="font-cormorant text-[16px] sm:text-[18px] lg:text-[19px] leading-[1.38] text-[#3D352F] max-w-[490px]">
            Travel with Brajmarg through thoughtfully planned pilgrimages to
            India's revered temples.
          </p>

          {/* Glassmorphism Feature Badges Bar */}
          <div
            className="glass-card mt-6 w-full max-w-[580px] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 transition-all"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "0.6px solid rgba(255, 255, 255, 0.65)",
              boxShadow:
                "0 4px 20px 0 rgba(160, 100, 20, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.75)",
            }}
          >
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 py-1 px-0.5">
              {trustItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center px-0.5 sm:px-1"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={34}
                    height={34}
                    className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                  />

                  <h4 className="font-cormorant mt-1.5 text-[12px] sm:text-[13.5px] lg:text-[14px] font-bold text-[#3B2813] leading-tight whitespace-pre-line">
                    {item.title}
                  </h4>

                  <p className="font-cormorant mt-1 text-[10px] sm:text-[10.5px] lg:text-[11px] leading-[1.25] text-[#6E5942] whitespace-pre-line">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
    </section>
  );
}
