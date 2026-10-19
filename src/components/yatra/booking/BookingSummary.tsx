"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Clock, Bus, Users } from "lucide-react";

const PACKAGE_DATA: Record<string, { name: string; price: number }> = {
  basic: { name: "Basic Package", price: 2499 },
  standard: { name: "Standard Package", price: 3999 },
  premium: { name: "Premium Package", price: 5999 },
};

export default function BookingSummary() {
  const searchParams = useSearchParams();
  const pkgParam = searchParams.get("package")?.toLowerCase() || "standard";
  const pkgInfo = PACKAGE_DATA[pkgParam] || PACKAGE_DATA.standard;

  return (
    <section className="w-full px-5 sm:px-6 py-4 sm:py-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
        {/* ── Left: Image + Info ── */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Temple Image */}
          <div className="relative h-[90px] w-[130px] shrink-0 overflow-hidden rounded-[12px] shadow-sm">
            <Image
              src="/images/braj_white.png"
              alt="Braj Yatra Temple"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center min-w-0">
            <h2 className="font-cormorant text-[24px] sm:text-[28px] font-bold leading-tight text-[#0F5C66]">
              Braj Yatra
            </h2>
            <h3 className="font-cormorant text-[18px] sm:text-[22px] font-bold leading-tight text-[#C37000] mt-0.5">
              Nathdwara to Vrindavaan
            </h3>

            {/* Stats — single line with | separators */}
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              <div className="flex items-center gap-1.5">
                <Clock size={15} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                <span className="font-cormorant text-[14px] sm:text-[15px] font-bold text-[#3D352F]">
                  9 Days/8 Night
                </span>
              </div>

              <span className="text-[#C37000]/60 font-bold">|</span>

              <div className="flex items-center gap-1.5">
                <Bus size={15} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                <span className="font-cormorant text-[14px] sm:text-[15px] font-bold text-[#3D352F]">
                  17-seater Urbania
                </span>
              </div>

              <span className="text-[#C37000]/60 font-bold">|</span>

              <div className="flex items-center gap-1.5">
                <Users size={15} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                <span className="font-cormorant text-[14px] sm:text-[15px] font-bold text-[#3D352F]">
                  6 Seats Left
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Vertical Divider ── */}
        <div className="hidden sm:block h-[80px] w-px bg-[#C37000]/40 shrink-0" />

        {/* ── Right: Package + Price ── */}
        <div className="flex flex-col items-start sm:items-start shrink-0 pl-0 sm:pl-2">
          <p className="font-cormorant text-[13px] sm:text-[14px] font-bold text-[#3D352F]/70 leading-tight">
            Selected Package
          </p>
          <h4 className="font-cormorant text-[20px] sm:text-[24px] font-bold text-[#C37000] leading-tight mt-0.5">
            {pkgInfo.name}
          </h4>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-cormorant text-[32px] sm:text-[36px] font-bold text-[#C37000] leading-none">
              ₹{pkgInfo.price.toLocaleString()}
            </span>
            <span className="font-cormorant text-[14px] sm:text-[16px] font-bold text-[#3D352F] leading-none">
              /person
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
