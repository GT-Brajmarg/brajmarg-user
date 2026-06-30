"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface BookingSummaryProps {
  frame: {
    name: string;
    image_url: string;
  };

  temple: {
    name: string;
    location: string;
  };

  selectedSize?: string;
  selectedMaterial?: string;

  finalPrice: number;
}

export default function BookingSummary({
  frame,
  temple,
  selectedSize = "",
  selectedMaterial = "",
  finalPrice,
}: BookingSummaryProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="mt-10 rounded-[24px] border border-[#D89A3D] bg-[#FCF8F1] px-7 py-6">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        {/* LEFT */}

        <div className="flex items-center gap-6">
          <div
            className="relative h-[90px] w-[120px] shrink-0"
            style={{ marginLeft: "40px" }}
          >
            <Image
              src={frame.image_url}
              alt={frame.name}
              fill
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
              {frame.name}
            </h2>

            <p className="font-cormorant mt-2 text-[20px] text-[#4F4941]">
              {temple?.name}, {temple?.location}
            </p>

            <p className="mt-3 text-[18px] text-[#4F4941]">
              Size -
              <span className="font-semibold text-[#D18400]">
                {" "}
                {selectedSize}
              </span>
              {" | "}
              <span className="font-semibold text-[#D18400]">
                {selectedMaterial}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="flex items-center gap-10"
          style={{ marginRight: "80px" }}
        >
          <div className="hidden h-20 w-px bg-[#D89A3D] lg:block" />

          <div>
            <p className="text-[16px] text-[#5C564F]">Price</p>

            <h3 className="mt-1 text-[40px] leading-none font-bold text-[#0B6670]">
              ₹ {finalPrice * quantity}
            </h3>
          </div>

          <div className="flex flex-col items-end gap-4">
            {/* Quantity */}

            <div
              className="flex h-[45px] w-[150px] items-center justify-between rounded-xl border border-[#E5C48A] bg-[#FFF9EF] px-4"
              style={{ marginTop: "20px" }}
            >
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus size={20} className="text-[#D89A3D]" />
              </button>

              <span className="text-[30px] font-semibold">{quantity}</span>

              <button onClick={() => setQuantity((q) => q + 1)}>
                <Plus size={20} className="text-[#0B6670]" />
              </button>
            </div>

            {/* Button */}

            <button
              className="flex h-[56px] items-center gap-3 rounded-xl bg-[#0B6670] px-8 text-[24px] font-semibold text-white transition hover:bg-[#09565D]"
              style={{ marginBottom: "20px", marginRight: "-20px" }}
            >
              <ShoppingCart size={22} style={{ marginLeft: "10px" }} />
              <span style={{ marginRight: "10px" }}>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
