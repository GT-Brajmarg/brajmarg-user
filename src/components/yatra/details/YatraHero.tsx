"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Users, Bus } from "lucide-react";
import { Fragment } from "react";

import { Cormorant_Infant } from "next/font/google";

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const highlights = [
  {
    image: "/images/comfortable-travel-1.svg",
    title: "Comfortable\nTravel",
  },
  {
    image: "/images/satvik-meals-1.svg",
    title: "Satvik\nMeals",
  },
  {
    image: "/images/peaceful-stay.svg",
    title: "Peaceful\nStay",
  },
  {
    image: "/images/temple-darshan.svg",
    title: "Temple\nDarshan",
  },
];

export default function YatraHero() {
  return (
    <section className="relative min-h-[480px] sm:min-h-[520px] md:min-h-[560px] overflow-hidden bg-[#F8F2E8]">
      {/* Background Image */}
      <Image
        src="/images/hero-yatra-temple.png"
        alt="Braj Yatra"
        fill
        priority
        className="object-cover object-right md:object-center"
      />

      {/* Gradient Overlay for Legibility on Mobile & Tablet */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F2E8]/95 via-[#F8F2E8]/80 to-[#F8F2E8]/95 md:bg-gradient-to-r md:from-[#F8F2E8]/95 md:via-[#F8F2E8]/70 md:to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-start px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10">
        <div className="w-full max-w-[540px]">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Link
              href="/yatra"
              className="inline-flex h-8 sm:h-9 items-center gap-1.5 rounded-lg border border-[#C18426] bg-transparent px-3 transition hover:bg-[#FCF5E9]"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-[#0F5C66]" />
              <span className="font-cormorant text-[16px] sm:text-[18px] leading-none text-[#0F5C66]">
                Back to Yatra
              </span>
            </Link>

            <span className="text-[16px] text-[#A8854E]">/</span>

            <span className="font-cormorant text-[16px] sm:text-[18px] text-[#2F241B]">
              Braj Yatra
            </span>

            <span className="text-[16px] text-[#A8854E]">/</span>

            <span className="font-cormorant text-[17px] sm:text-[19px] text-[#2F241B]">
              Yatra Details
            </span>
          </div>

          {/* Title */}
          <h1 className="font-cormorant mt-5 sm:mt-7 text-[36px] sm:text-[42px] md:text-[48px] leading-tight font-bold text-[#0F5C66]">
            Braj Yatra
          </h1>

          <h2 className="font-cormorant mt-0.5 text-[24px] sm:text-[28px] md:text-[33px] font-bold text-[#C37000]">
            Mathura to Vrindavan
          </h2>

          {/* Stats */}
          <div
            className={`${cormorantInfant.className} mt-3 sm:mt-4 flex flex-wrap items-center gap-y-1.5 text-[14px] sm:text-[15px] font-bold text-[#3D352F]`}
          >
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/calendar-4.svg"
                alt="Duration"
                width={16}
                height={16}
                className="shrink-0"
              />
              <span>9 Days/8 Night</span>
            </div>

            <div className="mx-2 sm:mx-3 h-3.5 w-px bg-[#D4A04B]" />

            <div className="flex items-center gap-1.5">
              <Image
                src="/images/travellers.svg"
                alt="Travellers"
                width={16}
                height={16}
                className="shrink-0"
              />
              <span>17 Travellers</span>
            </div>

            <div className="mx-2 sm:mx-3 h-3.5 w-px bg-[#D4A04B]" />

            <div className="flex items-center gap-1.5">
              <Image
                src="/images/bus.svg"
                alt="Round Trip"
                width={16}
                height={16}
                className="shrink-0"
              />
              <span>1300 km Round Trip</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-cormorant mt-3 sm:mt-4 max-w-[460px] text-[16px] sm:text-[18px] md:text-[19px] leading-snug sm:leading-6 font-semibold text-[#3D352F]">
            Embark on a divine journey from the sacred abode of Shri Nathdwara
            to the land of Shri Krishna&apos;s leelas in Vrindavan. Experience
            devotion, comfort and memories to cherish forever.
          </p>

          {/* Highlights */}
          <div className="mt-5 sm:mt-6 grid grid-cols-4 items-start gap-1 sm:gap-2 max-w-[480px]">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="relative flex flex-col items-center px-1 sm:px-2 text-center"
              >
                <div className="relative h-8 w-8 sm:h-10 sm:w-10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-cormorant mt-1 sm:mt-1.5 text-[12px] sm:text-[14px] md:text-[16px] leading-[1.2] font-bold whitespace-pre-line text-[#0F5C66]">
                  {item.title}
                </span>

                {index !== highlights.length - 1 && (
                  <div className="absolute right-0 top-3 h-7 w-px bg-[#C37000]/40 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
