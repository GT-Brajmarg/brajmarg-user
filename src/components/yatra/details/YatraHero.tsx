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
    <section className="relative min-h-[550px] overflow-hidden bg-[#F8F2E8]">
      {/* Background */}

      <Image
        src="/images/hero-yatra-temple.png"
        alt="Braj Yatra"
        fill
        priority
        className="object-cover"
        style={{
          objectPosition: "center",
        }}
      />

      {/* Overlay */}

      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-[1280px] items-start -pl-20 py-10  md:pr-7" >
        <div className="w-full max-w-[520px]">
          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Link
              href="/yatra"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#C18426] bg-transparent px-4 transition hover:bg-[#FCF5E9]"
            >
              <ArrowLeft className="h-4 w-4 text-[#0F5C66]" />
              <span className="font-cormorant text-[19px] leading-none text-[#0F5C66]">
                Back to Yatra
              </span>
            </Link>

            <span className="text-[18px] text-[#A8854E]">/</span>

            <span className="font-cormorant text-[19px] text-[#2F241B]">
              Braj Yatra
            </span>

            <span className="text-[18px] text-[#A8854E]">/</span>

            <span className="font-cormorant text-[20px] text-[#2F241B]">
              Yatra Details
            </span>
          </div>

          {/* Title */}

          <h1 className="font-cormorant mt-8 text-[48px] leading-none font-bold text-[#0F5C66]">
            Braj Yatra
          </h1>

          <h2 className="font-cormorant mt-1 text-[33px] font-bold text-[#C37000]">
            Mathura to Vrindavan
          </h2>

          {/* Stats */}

          <div
            className={`${cormorantInfant.className} mt-4 flex flex-wrap items-center gap-0 text-[15px] font-bold text-[#3D352F]`}
          >
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/calendar-4.svg"
                alt="Duration"
                width={18}
                height={18}
              />
              <span>9 Days/8 Night</span>
            </div>

            <div className="mx-3 h-4 w-px bg-[#D4A04B]" />

            <div className="flex items-center gap-1.5">
              <Image
                src="/images/travellers.svg"
                alt="Travellers"
                width={18}
                height={18}
              />
              <span>17 Travellers</span>
            </div>

            <div className="mx-3 h-4 w-px bg-[#D4A04B]" />

            <div className="flex items-center gap-1.5">
              <Image
                src="/images/bus.svg"
                alt="Round Trip"
                width={18}
                height={18}
              />
              <span>1300 km Round Trip</span>
            </div>
          </div>

          {/* Description */}

          <p className="font-cormorant mt-4 max-w-[460px] text-[19px] leading-6 font-semibold text-[#3D352F]">
            Embark on a divine journey from the sacred abode of Shri Nathdwara
            to the land of Shri Krishna&apos;s leelas in Vrindavan. Experience
            devotion, comfort and memories to cherish forever.
          </p>

          {/* Highlights */}

          <div className="mt-6 flex items-start">
            {highlights.map((item, index) => (
              <Fragment key={item.title}>
                <div className="flex flex-col items-center px-4 text-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={42}
                    height={42}
                  />
                  <span className="font-cormorant mt-2 text-[16px] leading-[1.3] font-bold whitespace-pre-line text-[#0F5C66]">
                    {item.title}
                  </span>
                </div>

                {index !== highlights.length - 1 && (
                  <div className="mx-1 mt-1 h-10 w-px self-center bg-[#C37000]" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
    </section>
  );
}
