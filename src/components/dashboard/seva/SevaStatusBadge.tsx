"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  status: "upcoming" | "completed" | "cancelled";
}

// const config = {
//   upcoming: {
//     bg: "bg-[#000080]/20",
//     text: "text-[#000080]",
//     icon: "/images/completed.svg",
//     label: "Completed",
//   },

//   completed: {
//     bg: "bg-[#159D4C]/20",
//     text: "text-[#1F9D43]",
//     icon: "/images/upcoming.svg",
//     label: "Upcoming",
//   },

//   cancelled: {
//     bg: "bg-[#D04B16]/20",
//     text: "text-[#E65A2D]",
//     icon: "/images/cancelled.svg",
//     label: "Cancelled",
//   },
// };

const config = {
  upcoming: {
    bg: "bg-[#159D4C]/20",
    text: "text-[#1F9D43]",
    icon: "/images/upcoming.svg",
    label: "Upcoming",
  },

  completed: {
    bg: "bg-[#000080]/20",
    text: "text-[#000080]",
    icon: "/images/completed.svg",
    label: "Completed",
  },

  cancelled: {
    bg: "bg-[#D04B16]/20",
    text: "text-[#E65A2D]",
    icon: "/images/cancelled.svg",
    label: "Cancelled",
  },
};

export default function SevaStatusBadge({ status }: Props) {
  const item = config[status];

  return (
    <div
      className={`flex items-center gap-2 rounded px-5 py-2 ${item.bg} ${item.text}`}
      style={{ marginRight: "20px", marginBottom: "20px" }}
    >
      <Image
        src={item.icon}
        alt={item.label}
        width={21}
        height={21}
        className="object-contain"
        style={{ marginLeft: "5px" }}
      />

      <span
        className={`${cormorantInfant.className} text-[18px] font-bold`}
        style={{ marginRight: "5px" }}
      >
        {item.label}
      </span>
    </div>
  );
}
