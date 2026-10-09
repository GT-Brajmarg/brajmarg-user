// "use client";

// import { Clock3, Truck, PackageCheck, CircleX } from "lucide-react";

// interface Props {
//   status: "processing" | "shipped" | "delivered" | "cancelled";
// }

// const config = {
//   processing: {
//     bg: "bg-[#FFF3DD]",
//     text: "text-[#C37000]",
//     icon: Clock3,
//     label: "Processing",
//   },

//   shipped: {
//     bg: "bg-[#E9E3FF]",
//     text: "text-[#5A55E3]",
//     icon: Truck,
//     label: "Shipped",
//   },

//   delivered: {
//     bg: "bg-[#E5F8E8]",
//     text: "text-[#1F9D43]",
//     icon: PackageCheck,
//     label: "Delivered",
//   },

//   cancelled: {
//     bg: "bg-[#FFE8DF]",
//     text: "text-[#E65A2D]",
//     icon: CircleX,
//     label: "Cancelled",
//   },
// };

// export default function OrderStatusBadge({ status }: Props) {
//   const item = config[status];

//   const Icon = item.icon;

//   return (
//     <div
//       className={`flex items-center gap-2 rounded-lg px-5 py-2 ${item.bg} ${item.text}`}
//     >
//       <Icon size={16} />

//       <span>{item.label}</span>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  status: "processing" | "shipped" | "delivered" | "cancelled";
}

const config = {
  processing: {
    bg: "bg-[#C37000]/20",
    text: "text-[#C37000]",
    icon: "/images/processing.svg",
    label: "Processing",
  },

  shipped: {
    bg: "bg-[#000080]/20",
    text: "text-[#5A55E3]",
    icon: "/images/shipped.svg",
    label: "Shipped",
  },

  delivered: {
    bg: "bg-[#159D4C]/20",
    text: "text-[#1F9D43]",
    icon: "/images/delivered.svg",
    label: "Delivered",
  },

  cancelled: {
    bg: "bg-[#D04B16]/20",
    text: "text-[#E65A2D]",
    icon: "/images/cancelled.svg",
    label: "Cancelled",
  },
};

export default function OrderStatusBadge({ status }: Props) {
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
