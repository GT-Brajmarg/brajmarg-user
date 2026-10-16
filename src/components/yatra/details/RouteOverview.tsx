"use client";

import Image from "next/image";

export default function RouteOverview() {
  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#EFDEC7]/50 p-3.5 sm:p-4">
      <h2 className="font-cormorant text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#0F5C66] px-1 sm:px-2">
        Yatra Route
      </h2>

      <div className="mt-4 px-1 sm:px-2">
        {/* Circles & Connecting Route */}
        <div className="flex items-center justify-between">
          {/* Start Circle (Nathdwara) */}
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#C37000] shadow-sm bg-[#C37000]/20">
            <Image
              src="/images/temple_shreenathji.png"
              alt="Nathdwara"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          {/* Route with Dots and Bus Icon */}
          <div className="mx-2 flex flex-1 items-center sm:mx-3">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0 rounded-full bg-[#C37000]" />
            <div className="flex-1 border-t-2 border-dotted border-[#C98C3D]" />
            <div className="mx-1.5 sm:mx-2 flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#C98C3D] bg-[#C37000] shadow-xs">
              <Image src="/images/bus-1.svg" alt="Bus" width={14} height={14} className="sm:h-4 sm:w-4" />
            </div>
            <div className="flex-1 border-t-2 border-dotted border-[#C98C3D]" />
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0 rounded-full bg-[#C37000]" />
          </div>

          {/* Destination Circle (Vrindavan) */}
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#C37000] shadow-sm bg-[#C37000]/20">
            <Image
              src="/images/temple_banke_bihari.png"
              alt="Vrindavan"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        </div>

        {/* City Labels */}
        <div className="mt-2.5 sm:mt-3 flex justify-between">
          <div className="flex w-16 flex-col items-center text-center">
            <h3 className="font-cormorant text-[16px] sm:text-[18px] font-bold text-[#0F5C66] leading-tight">
              Nathdwara
            </h3>
            <p className="font-cormorant text-[13px] sm:text-[14px] font-bold text-[#3D352F] leading-tight">
              Start City
            </p>
          </div>

          <div className="flex w-16 flex-col items-center text-center">
            <h3 className="font-cormorant text-[16px] sm:text-[18px] font-bold text-[#0F5C66] leading-tight">
              Vrindavan
            </h3>
            <p className="font-cormorant text-[13px] sm:text-[14px] font-bold text-[#3D352F] leading-tight">
              Destination
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
