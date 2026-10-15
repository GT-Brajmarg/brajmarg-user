"use client";

import Image from "next/image";

export default function RouteOverview() {
  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#EFDEC7]/50 p-4">
      <h2
        className="font-cormorant text-[30px] font-bold text-[#0F5C66]"
        style={{ marginLeft: "10px" }}
      >
        Yatra Route
      </h2>

      <div
        className="mt-4"
        style={{ marginLeft: "8px", marginRight: "8px" }}
      >
        {/* Circles & Connecting Route */}
        <div className="flex items-center justify-between">
          {/* Start Circle */}
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#C37000]" />

          {/* Route with Dots and Bus Icon */}
          <div className="mx-2 flex flex-1 items-center sm:mx-3">
            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#C37000]" />
            <div className="flex-1 border-t-2 border-dotted border-[#C98C3D]" />
            <div className="mx-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#C98C3D] bg-[#C37000]">
              <Image src="/images/bus-1.svg" alt="Bus" width={16} height={16} />
            </div>
            <div className="flex-1 border-t-2 border-dotted border-[#C98C3D]" />
            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#C37000]" />
          </div>

          {/* Destination Circle */}
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#C37000]" />
        </div>

        {/* City Labels */}
        <div className="mt-3 flex justify-between">
          <div className="flex w-16 flex-col items-center">
            <h3 className="font-cormorant whitespace-nowrap text-[18px] font-bold text-[#0F5C66]">
              Nathdwara
            </h3>
            <p className="font-cormorant whitespace-nowrap text-[14px] font-bold text-[#3D352F]">
              Start City
            </p>
          </div>

          <div className="flex w-16 flex-col items-center">
            <h3 className="font-cormorant whitespace-nowrap text-[18px] font-bold text-[#0F5C66]">
              Vrindavan
            </h3>
            <p className="font-cormorant whitespace-nowrap text-[14px] font-bold text-[#3D352F]">
              Destination
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
