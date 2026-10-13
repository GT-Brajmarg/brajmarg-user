"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  HandHelping,
  LucideIcon,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
};

const steps: Step[] = [
  {
    icon: CalendarDays,
    title: "Choose Seva",
    description: "Select the seva you wish to offer",
  },
  {
    icon: ClipboardList,
    title: "Provide Details",
    description: "Enter your name, gotra and preferred date",
  },
  {
    icon: CreditCard,
    title: "Make Payment",
    description: "Complete secure payment online",
  },
  {
    icon: HandHelping,
    title: "Seva Performed",
    description: "Our priests perform your seva in the temple",
  },
  {
    icon: HeartHandshake,
    title: "Receive Blessings",
    description: "Receive prasad and updates of your seva",
  },
];

export default function HowSevaWorks() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });

  return (
    <section className="mb-8 md:mb-10">
      {/* Heading */}
      <div className="mb-8 sm:mb-10 md:mb-12 flex items-center justify-center gap-2 sm:gap-3">
        <Image
          src="/images/lotus.png"
          alt=""
          width={54}
          height={36}
          className="h-6 w-9 sm:h-7 sm:w-11 md:h-9 md:w-14 object-contain"
        />

        <h2 className="font-cormorant text-[24px] sm:text-[30px] md:text-[36px] font-semibold text-[#0F5C66] text-center">
          How Seva Works
        </h2>

        <Image
          src="/images/lotus.png"
          alt=""
          width={54}
          height={36}
          className="h-6 w-9 sm:h-7 sm:w-11 md:h-9 md:w-14 object-contain"
        />
      </div>

      {/* Desktop Steps */}
      <div className="hidden md:flex mx-auto max-w-[1180px] items-start justify-between">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-1 items-start justify-center"
          >
            <div className="flex flex-col items-center text-center">
              {/* Circle */}
              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-[#C37000] bg-[#C37000]/20">
                {step.image ? (
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={55}
                    height={55}
                  />
                ) : step.icon ? (
                  <step.icon
                    className="h-14 w-14 text-[#0F5C66]"
                    strokeWidth={2}
                  />
                ) : null}
              </div>

              {/* Title */}
              <h3 className="font-cormorant mt-5 text-[22px] font-semibold text-[#0F5C66]">
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="mt-2 max-w-[180px] text-[16px] leading-5 text-[#3D352F]"
                style={{ fontWeight: "500" }}
              >
                {step.description}
              </p>
            </div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div
                className="mt-[48px] flex w-[90px] items-center justify-center"
                style={{ marginTop: "40px" }}
              >
                <ArrowRight
                  size={44}
                  strokeWidth={2.5}
                  className="text-[#C37000]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Steps Carousel */}
      <div className="relative md:hidden px-1">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex items-start gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-8 py-2"
        >
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-start shrink-0">
              <div className="flex w-[140px] sm:w-[165px] shrink-0 snap-center flex-col items-center text-center">
                {/* Circle */}
                <div className="relative flex h-[82px] w-[82px] sm:h-[94px] sm:w-[94px] items-center justify-center rounded-full border-2 border-[#C37000] bg-[#C37000]/20 shadow-sm">
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0F5C66] text-[11px] font-bold text-[#EFDEC7]">
                    {index + 1}
                  </span>
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={40}
                      height={40}
                    />
                  ) : step.icon ? (
                    <step.icon
                      className="h-10 w-10 sm:h-11 sm:w-11 text-[#0F5C66]"
                      strokeWidth={2}
                    />
                  ) : null}
                </div>

                {/* Title */}
                <h3 className="font-cormorant mt-2.5 text-[17px] sm:text-[19px] font-semibold text-[#0F5C66] leading-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-1 text-[13px] sm:text-[14px] leading-snug text-[#3D352F] font-medium max-w-[135px]">
                  {step.description}
                </p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="flex w-[24px] sm:w-[30px] shrink-0 items-center justify-center mt-[28px] sm:mt-[34px]">
                  <ArrowRight
                    size={18}
                    strokeWidth={2.2}
                    className="text-[#C37000]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute top-[38px] left-0 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#C37000] bg-[#F7F0E5] shadow-sm transition-colors hover:bg-[#F3DFC2]"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-4 w-4 text-[#0F5C66]" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute top-[38px] right-0 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#C37000] bg-[#F7F0E5] shadow-sm transition-colors hover:bg-[#F3DFC2]"
          aria-label="Next step"
        >
          <ChevronRight className="h-4 w-4 text-[#0F5C66]" />
        </button>
      </div>
    </section>
  );
}
