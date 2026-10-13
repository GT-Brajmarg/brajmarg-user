"use client";

import Image from "next/image";

const trustItems = [
  {
    image: "/images/temple-verified.svg",
    title: "Temple Verified",
    subtitle: "All temples & sevas are verified & authentic",
  },
  {
    image: "/images/spiritual-assurance.svg",
    title: "Spiritual Assurance",
    subtitle: "Every seva is performed with devotion and purity",
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
    <section className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] overflow-hidden bg-[#F8F2E8]">
      {/* Background Image */}
      <Image
        src="/images/hero-seva-temple.png"
        alt="Temple"
        fill
        priority
        className="object-cover opacity-90"
        style={{
          objectPosition: "95% 50%",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] max-w-[1240px] flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10 lg:py-14">
        {/* Top Text Content */}
        <div className="w-full max-w-[600px]">
          {/* Main Title */}
          <h1 className="font-cormorant text-[33px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.12] text-[#0B6670]">
            Offer Seva,
            <br />
            Receive Divine Blessings
          </h1>

          {/* Lotus Divider */}
          <div className="my-2.5 sm:my-3.5 flex items-center gap-2">
            <div className="h-[1px] w-10 sm:w-16 bg-[#C98C3D]/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C98C3D]" />
            <Image
              src="/images/lotus.png"
              alt=""
              width={34}
              height={24}
              className="object-contain"
            />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C98C3D]" />
            <div className="h-[1px] w-10 sm:w-16 bg-[#C98C3D]/70" />
          </div>

          {/* Subtitle / Description */}
          <p className="font-cormorant text-[15px] sm:text-[18px] lg:text-[19px] leading-[1.35] text-[#3D352F]">
            Book authentic temple sevas from trusted temples across India and
            invite divine blessings into your life.
          </p>
        </div>

        {/* Glassmorphism Trust Badges Bar */}
        <div
          className="glass-card mt-5 sm:mt-7 w-full max-w-[920px] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:px-4 lg:py-3 transition-all"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)",
            backdropFilter: "blur(3px) saturate(120%)",
            WebkitBackdropFilter: "blur(3px) saturate(120%)",
            border: "0.6px solid rgba(255, 255, 255, 0.65)",
            boxShadow:
              "0 4px 20px 0 rgba(160, 100, 20, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.75)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-3 lg:gap-4">
            {trustItems.map(({ image, title, subtitle }) => (
              <div
                key={title}
                className="flex items-start sm:items-center gap-2 sm:gap-2.5 md:gap-3 py-1 px-1"
              >
                <div className="shrink-0 mt-0.5 sm:mt-0">
                  <Image
                    src={image}
                    alt={title}
                    width={34}
                    height={34}
                    className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                  />
                </div>

                <div>
                  <h4 className="font-cormorant text-[13px] sm:text-[14.5px] lg:text-[15.5px] font-bold text-[#3B2813] leading-tight">
                    {title}
                  </h4>

                  <p className="font-cormorant mt-0.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] leading-[1.25] text-[#6E5942]">
                    {subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
