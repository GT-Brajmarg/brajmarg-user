"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { Cormorant_Infant } from "next/font/google";
import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  image: string;
  orderId: string;
  temple: string;
  date: string;
  items: number;
  amount: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
}

export default function OrderCard({
  image,
  orderId,
  temple,
  date,
  items,
  amount,
  status,
}: Props) {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  return (
    <div
      className="rounded-[22px] border border-[#C37000]/64 p-5"
      style={{ marginBottom: "20px" }}
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-5">
          <div
            className="relative h-[110px] w-[110px] overflow-hidden rounded-xl border border-[#D9B382]"
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Image
              src={"/images2/default.png"}
              alt={temple}
              fill
              className="object-cover"
            />
          </div>

          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <h3
              className={`${cormorantInfant.className} text-[22px] font-bold text-[#0F5C66]`}
            >
              Order ID : {orderId}
            </h3>

            <p
              className={`${cormorantInfant.className} mt-1 text-[20px] font-bold text-[#3D352F]/86`}
            >
              {temple}
            </p>

            <p
              className={`${cormorantInfant.className} mt-1 text-[20px] font-bold text-[#3D352F]/86`}
            >
              {date} , {items} Items
            </p>

            <p className="mt-3 text-[16px] font-semibold text-[#3D352F]">
              Total amount: ₹ {amount}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex h-full flex-col items-end justify-between">
          <OrderStatusBadge status={status} />

          <button
            onClick={() => setShowOrderDetails(true)}
            className="mt-10 flex items-center gap-2 rounded-[8px] border border-[#C37000] px-6 py-3 text-[18px] text-[#C37000] transition hover:bg-[#FFF3E0]"
            style={{ marginRight: "20px", marginTop: "20px" }}
          >
            <p
              className={`${cormorantInfant.className} mt-1 text-[20px] font-bold text-[#C37000]`}
              style={{ marginLeft: "10px" }}
            >
              View Order
            </p>
            <ArrowRight size={18} style={{ marginRight: "10px" }} />
          </button>
        </div>
      </div>
      <OrderDetailsModal
        open={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
      />
    </div>
  );
}
