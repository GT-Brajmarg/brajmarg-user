"use client";

import Image from "next/image";
import { CalendarDays, Trash2 } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { CartItemType } from "../../types/types";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  return (
    <div className="flex gap-5 border-b border-[#E7D4B4] py-6 last:border-none">
      <Image
        src={item.image}
        alt={item.title}
        width={145}
        height={145}
        className="rounded-xl object-cover"
      />

      <div
        className="flex flex-1 justify-between"
        style={{ marginLeft: "20px" }}
      >
        <div>
          <span
            className="rounded bg-[#D79B32] px-3 py-2 text-[12px] font-semibold text-white"
            // style={{ width: "40px" }}
          >
            {item.type}
          </span>

          <h3
            className="font-cormorant mt-2 text-[25px] font-semibold text-[#0B6670]"
            style={{ marginTop: "5px" }}
          >
            {item.title}
          </h3>

          <p className="font-semibold text-[#574C42]">{item.temple}</p>

          {item.date && (
            <div
              className="mt-2 flex items-center gap-2 text-[#C67A00]"
              style={{ marginTop: "5px" }}
            >
              <CalendarDays size={16} />
              <span>{item.date}</span>
            </div>
          )}

          {item.extra && <p className="mt-2 text-[#574C42]">{item.extra}</p>}

          <h4
            className="mt-3 text-3xl text-[#0B6670]"
            style={{ marginBottom: "10px" }}
          >
            ₹ {item.price}
          </h4>
        </div>

        <div className="flex flex-col items-end justify-between">
          <Trash2
            className="cursor-pointer text-[#0B6670]"
            size={18}
            style={{ marginTop: "10px", marginRight: "20px" }}
          />
          <div style={{ marginBottom: "50px", marginRight: "20px" }}>
            <QuantitySelector
              quantity={item.quantity}
              onDecrease={() => {}}
              onIncrease={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
