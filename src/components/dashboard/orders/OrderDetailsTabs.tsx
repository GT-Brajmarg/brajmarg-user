"use client";

import { useState } from "react";
import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  defaultTab?: "details" | "tracking";
  onChange?: (tab: "details" | "tracking") => void;
}

export default function OrderDetailsTabs({
  defaultTab = "details",
  onChange,
}: Props) {
  const [activeTab, setActiveTab] = useState<"details" | "tracking">(
    defaultTab,
  );

  const handleTab = (tab: "details" | "tracking") => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <div className="mt-6">
      <div className="flex border-b border-[#E6C8A2]">
        {/* Order Details */}

        <button
          onClick={() => handleTab("details")}
          className="relative flex h-[52px] flex-1 items-center justify-center gap-2"
        >
          <Image
            src="/images/order-details.svg"
            alt=""
            width={28}
            height={28}
          />

          <span
            className={`${cormorantInfant.className} text-[24px] ${
              activeTab === "details"
                ? "font-semibold text-[#C37000]"
                : "text-[#4B392A]"
            }`}
          >
            Order Details
          </span>

          {activeTab === "details" && (
            <span className="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-full bg-[#C37000]" />
          )}
        </button>

        {/* Track Order */}

        <button
          onClick={() => handleTab("tracking")}
          className="relative flex h-[52px] flex-1 items-center justify-center gap-2"
        >
          <Image src="/images/track-order.svg" alt="" width={28} height={28} />

          <span
            className={`${cormorantInfant.className} text-[24px] ${
              activeTab === "tracking"
                ? "font-semibold text-[#C37000]"
                : "text-[#4B392A]"
            }`}
          >
            Track Order
          </span>

          {activeTab === "tracking" && (
            <span className="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-full bg-[#C37000]" />
          )}
        </button>
      </div>
    </div>
  );
}
