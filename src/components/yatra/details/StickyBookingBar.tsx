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
    <div
      className="bottom-4 z-50 mx-auto mt-10 w-full max-w-[1240px] px-4"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <div className="flex items-center justify-between rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/20 px-8 py-4 shadow-xl backdrop-blur-md">
        {/* Left */}

        <div className="flex items-center gap-5">
          <Image
            src="/images/temple-darshan.svg"
            alt="Yatra"
            width={46}
            height={46}
            style={{ marginLeft: "20px" }}
          />

          <div>
            <h3
              className="font-cormorant text-[28px] leading-none font-bold text-[#0F5C66]"
              style={{ marginTop: "10px" }}
            >
              Braj Yatra
            </h3>

            <p
              className={`${cormorantInfant.className} mt-1 text-[18px] font-bold text-[#3D352F]`}
              style={{ marginBottom: "10px" }}
            >
              Nathdwara to Vrindavan
            </p>
          </div>
        </div>

        {/* Divider */}

        <div className="h-12 w-px bg-[#D4A04B]" />

        {/* Package */}

        <div>
          <p
            className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
          >
            Selected Package
          </p>

          <h4 className="font-cormorant text-[22px] font-bold text-[#C37000]">
            Standard Package
          </h4>
        </div>

        {/* Divider */}

        <div className="h-12 w-px bg-[#D4A04B]" />

        {/* Seats */}

        <div>
          <p
            className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
          >
            Seats Left
          </p>

          <h4 className="font-cormorant text-[22px] font-bold text-[#C37000]">
            6 Seats Left
          </h4>
        </div>

        {/* Divider */}

        <div className="h-12 w-px bg-[#D4A04B]" />

        {/* Price */}

        <div>
          <p
            className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
          >
            Price
          </p>

          <div className="flex items-end gap-1">
            <span
              className={`${cormorantInfant.className} text-[22px] font-bold text-[#C37000]`}
            >
              ₹3,999
            </span>

            <span
              className={`${cormorantInfant.className} mb-[4px] text-[16px] font-bold text-[#3D352F]`}
            >
              /person
            </span>
          </div>
        </div>

        {/* CTA */}

        <button
          className={`${cormorantInfant.className} flex items-center gap-3 rounded-xl bg-[#0F5C66] px-10 py-4 text-[24px] font-bold text-[#EFDEC7] transition hover:bg-[#0C4C54]`}
          style={{ marginRight: "20px" }}
        >
          <span
            style={{
              marginLeft: "10px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            Book This Yatra
          </span>

          <ArrowRight
            size={24}
            strokeWidth={2.3}
            style={{ marginRight: "10px" }}
          />
        </button>
      </div>
    </div>
  );
}
