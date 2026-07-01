"use client";

import Image from "next/image";
import { Package, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface BookingSummaryProps {
  prasad: {
    name: string;
    image_url: string;
  };

  temple: {
    name: string;
    location: string;
  };

  selectedQuantity?: string;

  finalPrice: number;
}

export default function BookingSummary({
  prasad,
  temple,
  selectedQuantity = "",
  finalPrice,
}: BookingSummaryProps) {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };
  return (
    <section className="relative mt-14 overflow-hidden rounded-[26px] border border-[#D89A3D] bg-[#FCF8F1] px-8 py-6">
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
              src={prasad.image_url}
              alt={prasad.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Info */}
          <div style={{ marginLeft: "10px" }}>
            <h2 className="font-cormorant text-[30px] leading-none font-semibold text-[#0B6670]">
              {prasad.name}
            </h2>

            <p className="font-cormorant mt-2 text-[22px] text-[#4F4941]">
              {temple?.name}, {temple?.location}
            </p>

            <div className="mt-4 flex items-center gap-3 text-[#D89A3D]">
              <Package size={20} />

              <span className="text-[18px] font-semibold">
                Pack Size: {selectedQuantity}
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div
          className="flex items-center gap-8"
          style={{ marginRight: "50px" }}
        >
          {/* Divider */}
          <div className="hidden h-20 w-px bg-[#D89A3D] lg:block" />

          {/* Price */}
          <div>
            <p className="text-[16px] text-[#5C564F]">Price</p>

            <h3 className="mt-1 text-[30px] leading-none font-bold text-[#0B6670]">
              ₹ {finalPrice * quantity}
            </h3>
          </div>

          {/* Quantity + Button */}
          <div className="flex flex-col items-end gap-4">
            {/* Quantity Selector */}
            <div className="flex h-[45px] overflow-hidden rounded-xl border border-[#E5C48A] bg-white">
              <button
                onClick={decrease}
                className="flex w-14 items-center justify-center text-[#D89A3D] transition hover:bg-[#F7E9CF]"
              >
                <Minus size={18} />
              </button>

              <div className="flex w-16 items-center justify-center border-x border-[#E5C48A] text-[28px] font-semibold text-[#1F1F1F]">
                {quantity}
              </div>

              <button
                onClick={increase}
                className="flex w-14 items-center justify-center text-[#0B6670] transition hover:bg-[#EEF7F7]"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              className="flex h-14 items-center gap-3 rounded-xl bg-[#0B6670] px-8 text-[22px] font-semibold text-white transition hover:bg-[#09565D]"
              style={{ width: "180px" }}
            >
              <ShoppingCart size={22} style={{ marginLeft: "10px" }} />

              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
