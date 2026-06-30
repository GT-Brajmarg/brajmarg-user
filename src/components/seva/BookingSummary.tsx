"use client";

import Image from "next/image";
import { CalendarDays, ShoppingCart } from "lucide-react";

interface BookingSummaryProps {
  seva: {
    name: string;
    image_url: string;
    price: number;
  };
  temple: {
    name: string;
    location: string;
  };
  selectedDate?: string;
  selectedTime?: string;
}

export default function BookingSummary({
  seva,
  temple,
  selectedDate = "22 June 2026",
  selectedTime = "1:00 PM",
}: BookingSummaryProps) {
  return (
    <section className="relative mt-14 overflow-hidden rounded-[26px] border border-[#D89A3D] bg-[#FCF8F1] px-8 py-6">
      {/* Background Glow */}
      {/* <div className="absolute top-1/2 -left-24 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-[#0B6670]/10 blur-[90px]" /> */}

      <div
        className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-6">
          {/* Image */}
          <div
            className="relative h-[95px] w-[120px] shrink-0"
            style={{ marginLeft: "50px" }}
          >
            <Image
              src={seva.image_url}
              alt={seva.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Info */}
          <div style={{ marginLeft: "10px" }}>
            <h2 className="font-cormorant text-[30px] leading-none font-semibold text-[#0B6670]">
              {seva.name}
            </h2>

            <p className="font-cormorant mt-2 text-[22px] text-[#4F4941]">
              {temple.name}, {temple.location}
            </p>

            <div className="mt-4 flex items-center gap-3 text-[#D89A3D]">
              <CalendarDays size={20} />

              <span className="text-[18px] font-semibold">
                {selectedDate}, {selectedTime}
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-10">
          {/* Divider */}
          <div className="hidden h-20 w-px bg-[#D89A3D] lg:block" />

          {/* Price */}
          <div style={{ marginRight: "80px" }}>
            <p className="text-[16px] text-[#5C564F]">Seva Amount</p>

            <h3 className="mt-1 text-[35px] leading-none font-bold text-[#0B6670]">
              ₹ {seva.price}
            </h3>
          </div>

          {/* Button */}
          <button
            className="flex h-14 items-center gap-3 rounded-xl bg-[#0B6670] px-8 text-[22px] font-semibold text-white transition hover:bg-[#09565D]"
            style={{ marginRight: "40px" }}
          >
            <ShoppingCart
              size={22}
              style={{ marginLeft: "10PX", marginRight: "10px" }}
            />
            <p style={{ marginRight: "20px" }}>Add to Cart</p>
          </button>
        </div>
      </div>
    </section>
  );
}
