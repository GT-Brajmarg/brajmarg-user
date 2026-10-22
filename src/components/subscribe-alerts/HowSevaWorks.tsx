"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Step = {
  title: string;
  description: string;
  image: string;
};

const steps: Step[] = [
  {
    image: "/images/choose-plan.svg",
    title: "Choose a Plan",
    description: "Pick the plan that suits you best.",
  },
  {
    image: "/images/select-temples.svg",
    title: "Select Your Temples",
    description: "Follow one or more temples of your choice.",
  },
  {
    image: "/images/customize-alerts.svg",
    title: "Customize Alerts",
    description: "Choose what updates and how you want to receive them.",
  },
  {
    image: "/images/receive-updates.svg",
    title: "Receive Updates",
    description: "Get timely alerts wherever you are, always.",
  },
];

export default function HowAlertsWork() {
  return (
    <section className="py-8 md:py-14">
      {/* Heading */}
      <div className="mb-8 md:mb-12 flex items-center justify-center gap-2 sm:gap-3">
        <Image
          src="/images/lotus_bright.png"
          alt=""
          width={40}
          height={40}
          className="h-7 w-7 sm:h-9 sm:w-9 object-contain"
        />

        <h2 className="font-cormorant text-[28px] sm:text-[34px] md:text-[38px] font-semibold text-[#0B6670] text-center">
          How It Works
        </h2>

        <Image
          src="/images/lotus_bright.png"
          alt=""
          width={40}
          height={40}
          className="h-7 w-7 sm:h-9 sm:w-9 object-contain"
        />
      </div>

      {/* Desktop / Tablet Steps (Horizontal Flow) */}
      <div className="hidden md:flex mx-auto max-w-[1150px] items-start justify-between px-2">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-1 items-start justify-center"
          >
            <div className="flex flex-col items-center text-center">
              {/* Circle */}
              <div className="flex h-[80px] w-[80px] lg:h-[90px] lg:w-[90px] items-center justify-center rounded-full border-[2px] border-[#C37000] bg-[#C37000]/20">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={42}
                  height={42}
                  className="h-9 w-9 lg:h-[42px] lg:w-[42px] object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-cormorant mt-4 lg:mt-5 text-[20px] lg:text-[24px] font-semibold text-[#0F5C66]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-cormorant max-w-[170px] text-[14px] lg:text-[16px] leading-[1.35] text-[#3D352F]">
                {step.description}
              </p>
            </div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="mt-[36px] lg:mt-[46px] flex w-[32px] md:w-[45px] lg:w-[70px] shrink-0 items-center justify-center">
                <Image
                  src="/images/arrow-right.svg"
                  alt=""
                  width={42}
                  height={18}
                  className="w-6 lg:w-[42px] object-contain"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Steps Grid (2x2 layout, fully visible and responsive) */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-2 md:hidden">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-col items-center text-center"
          >
            {/* Circle with Step Number */}
            <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border-[2px] border-[#C37000] bg-[#C37000]/20 shadow-xs">
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0F5C66] text-[11px] font-bold text-[#EFDEC7]">
                {index + 1}
              </span>
              <Image
                src={step.image}
                alt={step.title}
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="font-cormorant mt-3 text-[18px] sm:text-[20px] font-semibold text-[#0F5C66] leading-tight">
              {step.title}
            </h3>

            {/* Description */}
            <p className="font-cormorant mt-1 max-w-[145px] text-[13px] sm:text-[14px] leading-snug text-[#3D352F]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
