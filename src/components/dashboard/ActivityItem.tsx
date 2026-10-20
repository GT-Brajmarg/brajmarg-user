"use client";

import Image from "next/image";
import { cormorantInfant } from "@/lib/fonts";

interface Props {
  title: string;
  date: string;
}

export default function ActivityItem({ title, date }: Props) {
  return (
    <div className="flex items-start justify-between gap-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/check-circle.svg"
          alt="Completed"
          width={22}
          height={22}
        />

        <p className="font-cormorant text-[20px] leading-none font-bold text-[#3D352F]">
          {title}
        </p>
      </div>

      {/* Right */}
      <span
        className={`${cormorantInfant.className} text-[20px] font-bold whitespace-nowrap text-[#62554C]`}
      >
        {date}
      </span>
    </div>
  );
}
