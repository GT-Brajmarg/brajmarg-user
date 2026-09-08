"use client";

import Image from "next/image";
import { CalendarDays, Bus, Users } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function BookingSummary() {
  return (
    <section className="overflow-hidden rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/40">
      <div className="grid lg:grid-cols-[1fr_260px]">
        {/* Left */}

        <div className="flex items-center gap-6 p-6">
          <div
            className="relative h-[200px] w-[260px] overflow-hidden rounded-xl"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "20px",
            }}
          >
            <Image
              src="/images2/default.png"
              alt="Braj Yatra"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-cormorant text-[48px] font-bold text-[#0F5C66]">
              Braj Yatra
            </h2>

            <h3
              className="font-cormorant text-[36px] font-bold text-[#C37000]"
              style={{ marginBottom: "20px" }}
            >
              Nathdwara to Vrindavan
            </h3>

            <div
              className={`${cormorantInfant.className} mt-5 flex flex-wrap items-center gap-4 text-[15px] text-[#5A4A39]`}
              style={{ marginBottom: "30px" }}
            >
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#C37000]" />

                <span>9 Days / 8 Nights</span>
              </div>

              <div className="h-4 w-px bg-[#D39A3E]" />

              <div className="flex items-center gap-2">
                <Bus size={16} className="text-[#C37000]" />

                <span>17-seater Urbania</span>
              </div>

              <div className="h-4 w-px bg-[#D39A3E]" />

              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#C37000]" />

                <span>6 Seats Left</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="border-l border-[#D8B67A] p-6">
          <p
            className={`${cormorantInfant.className} text-[18px] text-[#3D352F]`}
          >
            Selected Package
          </p>

          <h3 className="font-cormorant mt-2 text-[30px] font-semibold text-[#C37000]">
            Standard Package
          </h3>

          <div className="mt-5 flex items-end">
            <span className="font-cormorant text-[42px] font-semibold text-[#C37000]">
              ₹3,999
            </span>

            <span
              className={`${cormorantInfant.className} mb-[5px] ml-1 text-[18px] text-[#3D352F]`}
            >
              /person
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
