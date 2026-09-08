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

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-[1240px] items-center px-7 py-12 md:px-12">
        <div className="max-w-[650px] md:translate-x-[200px]">
          {/* Breadcrumb */}

          <div className="flex items-center gap-2 pt-6">
            <Link
              href="/yatra"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#C18426] bg-transparent px-5 transition hover:bg-[#FCF5E9]"
            >
              <ArrowLeft
                className="h-5 w-5 text-[#0F5C66]"
                style={{ marginLeft: "5px" }}
              />

              <span
                className="font-cormorant text-[22px] leading-none text-[#0F5C66]"
                style={{ marginRight: "5px" }}
              >
                Back to Yatra
              </span>
            </Link>

            <span className="text-[20px] text-[#A8854E]">/</span>

            <span className="font-cormorant text-[22px] text-[#2F241B]">
              Braj Yatra
            </span>

            <span className="text-[20px] text-[#A8854E]">/</span>

            <span className="font-cormorant text-[22px] text-[#2F241B]">
              Yatra Details
            </span>
          </div>

          {/* Title */}

          <h1
            className="font-cormorant text-[62px] leading-none font-bold text-[#0F5C66]"
            style={{ marginTop: "40px" }}
          >
            Braj Yatra
          </h1>

          <h2 className="font-cormorant mt-2 text-[40px] font-bold text-[#C37000]">
            Mathura to Vrindavan
          </h2>

          {/* Stats */}

          <div
            className={`${cormorantInfant.className} mt-5 flex flex-wrap items-center text-[16px] font-bold text-[#3D352F]/86`}
          >
            <div
              className="flex items-center gap-2 pr-5"
              style={{ marginRight: "10px" }}
            >
              <Image
                src="/images/calendar-4.svg"
                alt="Duration"
                width={20}
                height={20}
              />
              <span>9 Days / 8 Nights</span>
            </div>
            <div className="mx-4 h-5 w-px bg-[#D4A04B]" />

            <div
              className="ml-5 flex items-center gap-2 pr-5"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <Image
                src="/images/travellers.svg"
                alt="Travellers"
                width={20}
                height={20}
              />
              <span>17 Travellers</span>
            </div>
            <div className="mx-4 h-5 w-px bg-[#D4A04B]" />

            <div
              className="ml-5 flex items-center gap-2"
              style={{ marginLeft: "10px" }}
            >
              <Image
                src="/images/bus.svg"
                alt="Round Trip"
                width={20}
                height={20}
              />
              <span>1300 km Round Trip</span>
            </div>
          </div>

          {/* Description */}

          <p
            className="font-cormorant mt-5 max-w-[520px] text-[21px] leading-7 font-semibold text-[#3D352F]"
            style={{ marginTop: "20px" }}
          >
            Embark on a divine journey from the sacred abode of Shri Nathdwara
            to the land of Shri Krishna's leelas in Vrindavan. Experience
            devotion, comfort and memories to cherish forever.
          </p>

          {/* Highlights */}

          <div className="mt-8 flex items-center" style={{ marginTop: "20px" }}>
            {highlights.map((item, index) => (
              <Fragment key={item.title}>
                <div
                  className="flex flex-col items-center px-5 text-center"
                  style={{ marginLeft: "30px", marginRight: "30px" }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={44}
                    height={44}
                  />

                  <span
                    className="font-cormorant mt-2 text-[20px] leading-5 font-bold whitespace-pre-line text-[#0F5C66]"
                    style={{ marginTop: "10px" }}
                  >
                    {item.title}
                  </span>
                </div>

                {index !== highlights.length - 1 && (
                  <div className="mx-2 h-12 w-px bg-[#C37000]" />
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
