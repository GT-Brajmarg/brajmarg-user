"use client";

import Image from "next/image";
import { Bell, CalendarDays, Clock3, Sparkles } from "lucide-react";

type TempleSelectionHeroProps = {
  currentStep?: number;
  totalSteps?: number;
};

export default function TempleSelectionHero({
  currentStep = 1,
  totalSteps = 4,
}: TempleSelectionHeroProps) {
  return (
    <section className="relative h-[550px] overflow-hidden">
      {/* Background */}
      <Image
        src="/images/subscribe-temple-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{
          objectPosition: "center top",
        }}
      />

      {/* Overlay */}

      {/* Content */}
      <div className="relative z-10 flex min-h-[420px] items-center px-10 py-10 md:px-14">
        <div
          className="max-w-[620px] md:translate-x-[200px]"
          style={{ marginLeft: "60px", marginTop: "50px" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur">
            <Bell size={22} className="text-[#C37000]" />

            <span className="font-cormorant text-[22px] font-bold tracking-[0.25em] text-[#C37000] uppercase">
              Welcome to Brajmarg Alerts
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-cormorant mt-6 text-[55px] leading-[1.05] font-bold text-[#3D352F]"
            style={{ marginTop: "10px" }}
          >
            Choose Your
            <br />
            <span className="text-[#0B6670]" style={{ marginTop: "10px" }}>
              Sacred Temples
            </span>
          </h1>

          {/* Divider */}
          <div
            className="mt-5 flex items-center gap-3"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <div className="h-px w-16 bg-[#D8B06E]" />

            <Image src="/images/lotus.png" alt="" width={48} height={48} />

            <div className="h-px w-16 bg-[#D8B06E]" />
          </div>

          {/* Description */}
          <p
            className="font-cormorant mt-5 max-w-[430px] text-[18px] leading-relaxed font-semibold text-[#3D352F]"
            style={{ marginTop: "10px" }}
          >
            Receive timely updates about temple darshan, aartis, festivals, seva
            availability, prasad dispatches and personalized alerts from your
            favourite temples.
          </p>

          {/* Step */}
          <div className="mt-8">
            {/* Step */}
            <div className="flex items-center gap-2">
              <Image
                src="/images/lotus-1.svg"
                alt=""
                width={38}
                height={38}
                className="object-contain"
                style={{ marginTop: "20px" }}
              />

              <p className="font-cormorant text-[20px] font-semibold text-[#C37000]">
                Step {currentStep} of {totalSteps}
              </p>
            </div>

            {/* Current Step */}
            <div className="mt-1 flex items-center gap-2">
              {/* Invisible spacer to align with the text above */}

              <p
                className="font-cormorant text-[22px] font-semibold text-[#0B6670]"
                style={{ marginLeft: "42px", marginTop: "-20px" }}
              >
                Select Temples
              </p>
            </div>

            {/* Progress */}
            <div
              className="mt-4 flex items-center"
              style={{ marginTop: "10px" }}
            >
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`h-[28px] w-[28px] rounded-full border ${
                      index + 1 === currentStep
                        ? "border-[#C37000] bg-[#C37000]/80"
                        : "border-[#C37000] bg-[#C37000]/20"
                    }`}
                  />

                  {index < totalSteps - 1 && (
                    <div className="mx-2 h-[1px] w-8 bg-[#D7B06B]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
