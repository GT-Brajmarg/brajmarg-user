"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPinned } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";

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
    <Link href={`/yatra/${yatra.slug}`} className="block h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-[#C37000]/16 border border-[#C37000]/30 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <div className="relative h-[200px] w-full overflow-hidden rounded-t-[20px] shrink-0 bg-[#E8DAC5]">
          <Image
            src={yatra.image}
            alt={yatra.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            <h3 className="font-cormorant text-[20px] font-bold text-[#0F5C66] leading-tight">
              {yatra.title}
            </h3>

            <p
              className={`${cormorantInfant.className} mt-1 text-[16px] font-bold text-[#3D352F] leading-tight`}
            >
              {yatra.location}
            </p>

            {/* Details */}
            <div
              className={`${cormorantInfant.className} mt-3 space-y-1 text-[13px] font-bold text-[#3D352F]/86`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/images/map-pin.svg"
                  alt="Location"
                  width={16}
                  height={16}
                  className="shrink-0"
                />
                <span className="truncate">{yatra.temples} Covered Temples</span>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src="/images/calendar-3.svg"
                  alt="Calendar"
                  width={16}
                  height={16}
                  className="shrink-0"
                />
                <span className="truncate">
                  {yatra.days} Days | {yatra.nights} Nights
                </span>
              </div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="mt-4 flex items-center justify-between gap-2 pt-1">
            <div className="flex items-baseline gap-1 whitespace-nowrap">
              <p
                className={`${cormorantInfant.className} text-[14px] font-bold text-[#3D352F]`}
              >
                From
              </p>
              <span
                className={`${cormorantInfant.className} text-[18px] font-bold text-[#0F5C66]`}
              >
                ₹&nbsp;{yatra.price.toLocaleString()}
              </span>
              <span
                className={`${cormorantInfant.className} text-[14px] font-bold text-[#3D352F]`}
              >
                /person
              </span>
            </div>

            {/* Arrow */}
            <div
              className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-[#C37000] bg-[#C37000]/20 text-[#8D5A11] transition-all duration-300 group-hover:bg-[#C37000] group-hover:text-white"
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
