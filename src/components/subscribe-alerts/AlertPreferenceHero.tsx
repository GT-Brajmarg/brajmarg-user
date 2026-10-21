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
    <section className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] w-full overflow-hidden flex items-center">
      {/* Background */}
      <Image
        src="/images/subscribe-temple-hero.png"
        alt="Alert Preferences"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[75%_center] sm:object-[70%_center] md:object-center"
      />

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-[1360px] px-6 sm:px-10 md:px-14 lg:px-10 py-10 sm:py-14">
        <div className="max-w-[560px] lg:max-w-[600px] flex flex-col justify-center">
          {/* Badge */}
          <div className="flex items-center gap-2 text-[#C37000]">
            <Bell size={18} className="shrink-0 fill-[#C37000]/20" strokeWidth={2.2} />

            <span className="font-cormorant text-[17px] sm:text-[19px] md:text-[20px] font-bold tracking-[0.16em] uppercase">
              Welcome to Brajmarg Alerts
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant mt-2.5 sm:mt-3 text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px] leading-[1.05] font-bold text-[#2C241E]">
            Customize Your
            <br />
            <span className="text-[#0B6670]">Alert Preferences</span>
          </h1>

          {/* Divider */}
          <div className="mt-3.5 sm:mt-4 flex items-center gap-2.5">
            <div className="h-[1.5px] w-12 sm:w-16 bg-[#D8B06E]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#D8B06E]" />
            <Image
              src="/images/lotus.png"
              alt=""
              width={34}
              height={34}
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
            />
            <div className="h-1.5 w-1.5 rounded-full bg-[#D8B06E]" />
            <div className="h-[1.5px] w-12 sm:w-16 bg-[#D8B06E]" />
          </div>

          {/* Description */}
          <p className="font-cormorant mt-3.5 sm:mt-4 max-w-[460px] text-[16px] sm:text-[17px] md:text-[18px] leading-[1.38] font-semibold text-[#3D352F]">
            Choose how and when you would like to receive updates from your selected temples.
            <br />
            You can change these anytime from your dashboard.
          </p>

          {/* Step Indicator */}
          <div className="mt-5 sm:mt-6">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/lotus-1.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain shrink-0"
              />

              <div className="flex flex-col">
                <span className="font-cormorant text-[15px] sm:text-[16px] font-semibold leading-tight text-[#C37000]">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="font-cormorant text-[18px] sm:text-[20px] font-bold leading-tight text-[#0B6670]">
                  Alert Preferences
                </span>
              </div>
            </div>

            {/* Progress Circles */}
            <div className="mt-3.5 flex items-center">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`h-[22px] w-[22px] sm:h-[24px] sm:w-[24px] rounded-full border-[1.5px] border-[#C37000] transition-colors ${index + 1 <= currentStep
                        ? "bg-[#C37000]"
                        : "bg-[#F7E7CE]/60"
                      }`}
                  />

                  {index < totalSteps - 1 && (
                    <div className="h-[1.5px] w-6 sm:w-8 md:w-9 bg-[#D7B06B]" />
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

