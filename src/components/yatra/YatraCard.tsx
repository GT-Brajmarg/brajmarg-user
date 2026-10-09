"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPinned } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-infant",
});

interface Props {
  yatra: {
    id: number;
    slug: string;
    title: string;
    location: string;
    image: string;
    temples: number;
    days: number;
    nights: number;
    price: number;
  };
}

export default function YatraCard({ yatra }: Props) {
  return (
    <Link href={`/yatra/${yatra.slug}`} className="block">
      <div className="group overflow-hidden rounded-[22px] bg-[#C37000]/16 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}

        <div className="relative h-[220px] overflow-hidden rounded-t-[22px]">
          <Image
            src={yatra.image}
            alt={yatra.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}

        <div
          className="px-5 py-4"
          style={{ marginLeft: "10px", marginTop: "5px", marginBottom: "10px" }}
        >
          <h3 className="font-cormorant text-[22px] font-bold text-[#0F5C66]">
            {yatra.title}
          </h3>

          <p
            className={`${cormorantInfant.className} mt-1 text-[18px] font-bold text-[#3D352F]`}
          >
            {yatra.location}
          </p>

          {/* Details */}

          <div
            className={`${cormorantInfant.className} mt-3 space-y-1 text-[15px] font-bold text-[#3D352F]/86`}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/images/map-pin.svg" // or .png
                alt="Location"
                width={16}
                height={16}
              />
              <span>{yatra.temples} Covered Temples</span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/images/calendar-3.svg" // Update with your actual file path
                alt="Calendar"
                width={16}
                height={16}
              />
              <span>
                {yatra.days} Days | {yatra.nights} Nights
              </span>
            </div>
          </div>

          {/* Price */}

          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="flex items-end gap-1">
                <p
                  className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
                >
                  From
                </p>
                <span
                  className={`${cormorantInfant.className} text-[24px] font-bold text-[#0F5C66]`}
                >
                  ₹ {yatra.price.toLocaleString()}
                </span>

                <span
                  className={`${cormorantInfant.className} mb-[2px] text-[18px] font-bold text-[#3D352F]`}
                >
                  /person
                </span>
              </div>
            </div>

            {/* Arrow */}

            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C37000] bg-[#C37000]/20 text-[#C37000] transition-all duration-300 group-hover:bg-[#C37000] group-hover:text-white"
              style={{ marginRight: "10px" }}
            >
              <Image
                src="/images/arrow.svg"
                alt="Arrow Right"
                width={10}
                height={16}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
