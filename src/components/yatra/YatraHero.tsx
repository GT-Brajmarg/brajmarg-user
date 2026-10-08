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

      {/* Light Overlay */}

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-[1240px] items-center px-7 py-12 md:px-12">
        <div className="max-w-[650px] md:translate-x-[200px]">
          {/* Heading */}

          <h1 className="font-cormorant text-[52px] leading-[1.05] font-bold text-[#44301B]">
            Begin Your
            <br />
            <span className="text-[#0B6C73]">Sacred Journey</span>
          </h1>

          {/* Divider */}

          <div
            className="mt-5 flex items-center gap-3"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <div className="h-px w-14 bg-[#C98C3D]" />

            <Image src="/images/lotus.png" alt="" width={50} height={50} />

            <div className="h-px w-14 bg-[#C98C3D]" />
          </div>

          {/* Description */}

          <p className="font-cormorant mt-5 max-w-[470px] text-[22px] leading-8 text-[#4D433A]">
            Travel with BrajMarg through thoughtfully planned pilgrimages to
            India's revered temples.
          </p>

          {/* Features */}

          <div
            className="mt-8 overflow-hidden rounded-xl border border-white bg-[#EFDEC7]/20 backdrop-blur-sm"
            style={{ marginTop: "20px", width: "600px" }}
          >
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center"
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={52}
                    height={52}
                    className="mb-3"
                    style={{ marginLeft: "10px", marginBottom: "5PX" }}
                  />

                  <h4 className="font-cormorant text-[17px] leading-5 font-semibold whitespace-pre-line text-[#8D5A11]">
                    {item.title}
                  </h4>

                  <p
                    className="font-cormorant mt-2 text-[14px] leading-5 whitespace-pre-line text-[#6D5A44]"
                    style={{ marginTop: "5px" }}
                  >
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
