"use client";

import Image from "next/image";
import { Bell } from "lucide-react";

type AlertPreferenceHeroProps = {
  currentStep?: number;
  totalSteps?: number;
};

export default function AlertPreferenceHero({
  currentStep = 2,
  totalSteps = 4,
}: AlertPreferenceHeroProps) {
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

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] items-center px-8">
        <div
          className="max-w-[520px] md:translate-x-[170px]"
          style={{ marginLeft: "60px", marginTop: "50px" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur">
            <Bell size={20} className="text-[#C37000]" />

            <span className="font-cormorant text-[20px] font-bold tracking-[0.22em] text-[#C37000] uppercase">
              Welcome to Brajmarg Alerts
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-cormorant mt-4 text-[54px] leading-[1.08] font-bold text-[#3D352F]"
            style={{ marginTop: "20px" }}
          >
            Customize Your
            <br />
            <span className="text-[#0B6670]" style={{ marginTop: "10px" }}>
              Alert Preferences
            </span>
          </h1>

          {/* Divider */}
          <div
            className="mt-2 flex items-center gap-3"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <div className="h-px w-16 bg-[#D7B06B]" />

            <Image src="/images/lotus.png" alt="" width={48} height={48} />

            <div className="h-px w-16 bg-[#D7B06B]" />
          </div>

          {/* Description */}
          <p
            className="font-cormorant max-w-[430px] text-[18px] leading-relaxed font-semibold text-[#3D352F]"
            style={{ marginTop: "10px" }}
          >
            Choose how and when you would like to receive updates from your
            selected temples.
            <br />
            You can edit these anytime from your dashboard.
          </p>

          {/* Step */}
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <Image
                src="/images/lotus-1.svg"
                alt=""
                width={38}
                height={38}
                style={{ marginTop: "20px" }}
              />

              <p className="font-cormorant text-[20px] font-semibold text-[#C37000]">
                Step {currentStep} of {totalSteps}
              </p>
            </div>

            <div className="mt-1 flex items-center gap-2">
              <p
                className="font-cormorant text-[22px] font-semibold text-[#0B6670]"
                style={{ marginLeft: "42px", marginTop: "-20px" }}
              >
                Alert Preferences
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
