"use client";

import { LucideIcon } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import Image from "next/image";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
  iconBg: string;
}

export default function OverviewCard({
  icon,
  title,
  value,
  subtitle,
  iconBg,
}: Props) {
  return (
    <div className="rounded-[20px] border border-[#C37000]/50 bg-[#EFDEC7]/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-full"
        style={{
          backgroundColor: iconBg,
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: iconBg }}
        >
          <Image
            src={icon}
            alt={title}
            width={25}
            height={25}
            className="object-contain"
          />
        </div>
      </div>

      <p
        className={`${cormorantInfant.className} mt-4 text-[16px] font-bold text-[#3D352F]`}
        style={{ marginLeft: "10px", marginTop: "5px" }}
      >
        {title}
      </p>

      <h3
        className={`${cormorantInfant.className} mt-1 text-[28px] leading-none font-bold text-[#0F5C66]`}
        style={{ marginLeft: "10px", marginTop: "5px" }}
      >
        {value}
      </h3>

      <p
        className={`${cormorantInfant.className} mt-4 text-[14px] text-[#3D352F]`}
        style={{ marginLeft: "10px", marginTop: "5px", marginBottom: "10px" }}
      >
        {subtitle}
      </p>
    </div>
  );
}
