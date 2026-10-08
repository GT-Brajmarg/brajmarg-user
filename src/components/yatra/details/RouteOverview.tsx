"use client";

import Image from "next/image";

export default function RouteOverview() {
  return (
    <section className="rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/60 p-5">
      <h2
        className="font-cormorant text-[30px] font-bold text-[#0F5C66]"
        style={{ marginLeft: "10px" }}
      >
        Yatra Route
      </h2>

      <div
        className="mt-8 flex items-center justify-between"
        style={{ marginTop: "30px", marginLeft: "10px", marginRight: "10px" }}
      >
        {/* Start */}

        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C37000]">
            <div className="h-7 w-7 rounded-full bg-[#C37000]" />
          </div>

          <h3 className="font-cormorant mt-4 text-[20px] font-bold text-[#0F5C66]">
            Nathdwara
          </h3>

          <p className="font-cormorant text-[16px] font-bold text-[#3D352F]">
            Start City
          </p>
        </div>

        {/* Route */}

        <div
          className="mx-5 flex flex-1 items-center"
          style={{ marginTop: "-50px" }}
        >
          <div
            className="h-[2px] flex-1"
            style={{
              background:
                "repeating-linear-gradient(to right, #C98C3D 0 6px, transparent 6px 10px)",
            }}
          />

          <div className="mx-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#C98C3D] bg-[#C37000]">
            <Image src="/images/bus-1.svg" alt="" width={16} height={16} />
          </div>

          <div
            className="h-[2px] flex-1"
            style={{
              background:
                "repeating-linear-gradient(to right, #C98C3D 0 6px, transparent 6px 10px)",
            }}
          />
        </div>

        {/* Destination */}

        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C37000]">
            <div className="h-7 w-7 rounded-full bg-[#C37000]" />
          </div>

          <h3 className="font-cormorant mt-4 text-[20px] font-bold text-[#0F5C66]">
            Vrindavan
          </h3>

          <p className="font-cormorant text-[16px] font-bold text-[#3D352F]">
            Destination
          </p>
        </div>
      </div>
    </section>
  );
}
