"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function StickyBookingBar() {
  return (
    <div className="z-50 mx-auto my-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-[#C37000] bg-[#EFDEC7]/50 px-6 py-3.5 shadow-lg backdrop-blur-md">
        {/* Left: Yatra info */}
        <div className="flex items-center gap-3.5">
          <Image
            src="/images/temple-darshan.svg"
            alt="Yatra"
            width={38}
            height={38}
            className="h-9 w-9 object-contain"
          />

          <div>
            <h3 className="font-cormorant text-[24px] font-bold text-[#0F5C66] leading-tight">
              Braj Yatra
            </h3>
            <p className="font-cormorant text-[15px] font-bold text-[#3D352F] leading-tight">
              Nathdwara to Vrindavan
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-9 w-px bg-[#D4A04B]/60" />

        {/* Package */}
        <div>
          <p className="font-cormorant text-[13px] font-medium text-[#3D352F] leading-tight">
            Selected Package
          </p>
          <h4 className="font-cormorant text-[18px] font-bold text-[#C37000] leading-tight">
            Standard Package
          </h4>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-9 w-px bg-[#D4A04B]/60" />

        {/* Seats */}
        <div>
          <p className="font-cormorant text-[13px] font-medium text-[#3D352F] leading-tight">
            Seats Left
          </p>
          <h4 className="font-cormorant text-[18px] font-bold text-[#C37000] leading-tight">
            6 Seats Left
          </h4>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-9 w-px bg-[#D4A04B]/60" />

        {/* Price */}
        <div>
          <p className="font-cormorant text-[13px] font-medium text-[#3D352F] leading-tight">
            Price
          </p>
          <div className="flex items-baseline gap-1 leading-tight">
            <span className="font-cormorant text-[20px] font-bold text-[#C37000]">
              ₹3,999
            </span>
            <span className="font-cormorant text-[13px] font-bold text-[#3D352F]">
              /person
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="font-cormorant flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#0F5C66] px-6 py-2.5 text-[18px] font-bold text-[#EFDEC7] transition hover:bg-[#0C4C54]">
          <span>Book This Yatra</span>
          <ArrowRight size={18} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
