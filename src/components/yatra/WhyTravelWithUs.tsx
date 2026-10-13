"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    image: "/images/comfortable-travel-1.svg",
    title: "Comfortable\nTravel",
    description: "Spacious vehicles\nfor a peaceful\njourney",
  },
  {
    image: "/images/satvik-meals-1.svg",
    title: "Satvik\nMeals",
    description: "Pure satvik food\narranged throughout\nthe yatra",
  },
  {
    image: "/images/peaceful-stay.svg",
    title: "Peaceful\nStay",
    description: "Clean, comfortable\n& hygienic\naccommodations",
  },
  {
    image: "/images/temple-darshan.svg",
    title: "Temple\nDarshan",
    description: "Planned darshan\nat revered\ntemples",
  },
  {
    image: "/images/experienced-assistance.svg",
    title: "Experienced\nAssistance",
    description: "Dedicated team\nwith you\nat every step",
  },
];

export default function WhyTravelWithUs() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({
      left: -220,
      behavior: "smooth",
    });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({
      left: 220,
      behavior: "smooth",
    });

  return (
    <section className="relative py-10 sm:py-14 md:py-16">
      {/* Heading */}
      <div className="mb-8 sm:mb-10 md:mb-12 flex items-center justify-center gap-2 sm:gap-3 px-2">
        <Image
          src="/images/lotus.png"
          alt=""
          width={52}
          height={36}
          className="h-6 w-9 sm:h-8 sm:w-11 md:h-9 md:w-13 object-contain shrink-0"
        />

        <h2 className="font-cormorant text-[22px] sm:text-[30px] md:text-[38px] font-semibold text-[#0B6670] text-center whitespace-nowrap">
          Your Journey, Taken Care Of
        </h2>

        <Image
          src="/images/lotus.png"
          alt=""
          width={52}
          height={36}
          className="h-6 w-9 sm:h-8 sm:w-11 md:h-9 md:w-13 object-contain shrink-0"
        />
      </div>

      {/* Desktop Features */}
      <div
        className="hidden lg:flex mx-auto max-w-[1220px] items-start justify-between"
        style={{ marginTop: "20px" }}
      >
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="flex flex-1 items-start justify-center"
          >
            <div className="flex flex-col items-center text-center">
              {/* Circle */}
              <div className="flex h-[128px] w-[128px] items-center justify-center rounded-full border-2 border-[#C37000] bg-[#C37000]/20 transition duration-300 hover:bg-[#FDF0DA]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3
                className="font-cormorant mt-5 text-[32px] leading-7 font-semibold whitespace-pre-line text-[#0F5C66]"
                style={{ marginTop: "20px" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="mt-2 text-[18px] leading-5 whitespace-pre-line text-[#3D352F]"
                style={{ marginTop: "20px" }}
              >
                {feature.description}
              </p>
            </div>

            {/* Arrow */}
            {index < features.length - 1 && (
              <div className="mt-[48px] flex w-[90px] items-center justify-center">
                <Image
                  src="/images/arrow-right.svg"
                  alt="Next"
                  width={42}
                  height={42}
                  className="object-contain"
                  style={{ marginTop: "40px" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile & Tablet Features Carousel */}
      <div className="relative lg:hidden px-1">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex items-start gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-8 py-2"
        >
          {features.map((feature, index) => (
            <div key={feature.title} className="flex items-start shrink-0">
              <div className="flex w-[140px] sm:w-[170px] shrink-0 snap-center flex-col items-center text-center">
                {/* Circle */}
                <div className="relative flex h-[84px] w-[84px] sm:h-[104px] sm:w-[104px] items-center justify-center rounded-full border-2 border-[#C37000] bg-[#C37000]/20 shadow-sm transition duration-300 hover:bg-[#FDF0DA]">
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0F5C66] text-[11px] font-bold text-[#EFDEC7]">
                    {index + 1}
                  </span>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="h-9 w-9 sm:h-11 sm:w-11 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="font-cormorant mt-2.5 sm:mt-3 text-[18px] sm:text-[22px] font-semibold text-[#0F5C66] leading-tight whitespace-pre-line">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-1 text-[13px] sm:text-[15px] leading-snug text-[#3D352F] font-medium whitespace-pre-line max-w-[140px] sm:max-w-[165px]">
                  {feature.description}
                </p>
              </div>

              {/* Arrow */}
              {index < features.length - 1 && (
                <div className="flex w-[24px] sm:w-[36px] shrink-0 items-center justify-center mt-[30px] sm:mt-[38px]">
                  <ArrowRight
                    size={20}
                    strokeWidth={2.2}
                    className="text-[#C37000]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute top-[38px] sm:top-[44px] left-0 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#C37000] bg-[#F7F0E5] shadow-sm transition-colors hover:bg-[#F3DFC2]"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-4 w-4 text-[#0F5C66]" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute top-[38px] sm:top-[44px] right-0 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#C37000] bg-[#F7F0E5] shadow-sm transition-colors hover:bg-[#F3DFC2]"
          aria-label="Next step"
        >
          <ChevronRight className="h-4 w-4 text-[#0F5C66]" />
        </button>
      </div>
    </section>
  );
}
