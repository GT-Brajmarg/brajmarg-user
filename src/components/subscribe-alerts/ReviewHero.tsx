"use client";

import Image from "next/image";
import { Bell } from "lucide-react";

type ReviewHeroProps = {
  currentStep?: number;
  totalSteps?: number;
};

export default function ReviewHero({
  currentStep = 3,
  totalSteps = 4,
}: ReviewHeroProps) {
  return (
    <section className="relative min-h-[480px] sm:min-h-[520px] md:h-[550px] overflow-hidden">
      {/* Background Banner */}
      <Image
        src="/images/subscribe-temple-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right md:object-center"
      />

      {/* Mobile/Tablet Readability Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#F8F2E8]/95 via-[#F8F2E8]/80 to-[#F8F2E8]/20 md:from-[#F8F2E8]/90 md:via-[#F8F2E8]/50 md:to-transparent lg:hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full min-h-[480px] sm:min-h-[520px] md:min-h-[550px] max-w-[1420px] items-center px-6 sm:px-10 md:px-14 lg:px-16">
        <div className="max-w-[500px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2">
            <Bell size={18} className="text-[#C37000] shrink-0" />
            <span className="font-cormorant text-[14px] sm:text-[17px] md:text-[19px] font-bold tracking-[0.22em] text-[#C37000] uppercase">
              Welcome to Brajmarg Alerts
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant mt-2 sm:mt-3 text-[36px] sm:text-[44px] md:text-[52px] font-bold text-[#3D352F] leading-[1.08]">
            Review Your
            <br />
            <span className="text-[#0F5C66]">Subscription</span>
          </h1>

          {/* Divider */}
          <div className="my-3 sm:my-4 flex items-center">
            <Image
              src="/images/group_lotus.png"
              alt=""
              width={288}
              height={56}
              className="h-7 sm:h-8 w-auto object-contain"
              priority
            />
          </div>

          {/* Description */}
          <p className="font-cormorant max-w-[440px] text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed font-semibold text-[#3D352F]">
            Almost there!
            <br />
            Review your choices before you complete your subscription.
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
                  Review &amp; Confirm
                </span>
              </div>
            </div>

            {/* Progress Circles */}
            <div className="mt-3.5 flex items-center">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`h-[22px] w-[22px] sm:h-[24px] sm:w-[24px] rounded-full border-[1.5px] border-[#C37000] transition-colors ${
                      index + 1 <= currentStep
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
