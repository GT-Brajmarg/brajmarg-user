"use client";

import Image from "next/image";
import { CalendarDays, Trash2 } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { CartItemType } from "../../types/types";
import { useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const dispatch = useAppDispatch();

  const cartKey = {
    id: item.id,
    selectedDate: item.selectedDate,
    selectedSlot: item.selectedSlot,
    variant: item.variant,
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(cartKey));
      return;
    }

    dispatch(
      updateQuantity({
        ...cartKey,
        quantity: item.quantity - 1,
      }),
    );
  };

  const handleIncrease = () => {
    dispatch(
      updateQuantity({
        ...cartKey,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCart(cartKey));
  };
  return (
    <div className="flex gap-5 border-b border-[#E7D4B4] py-6 last:border-none">
      <div
        className="relative h-[145px] w-[140px] shrink-0"
        style={{ marginLeft: "20px", marginTop: "20px" }}
      >
        <div className="absolute inset-[12px] overflow-hidden rounded-lg">
          <Image
            src={item.image || "/images/default-product.png"}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <Image
          src="/images/frame.png"
          alt="Frame"
          fill
          className="pointer-events-none object-contain"
        />
      </div>
      <div
        className="flex flex-1 justify-between"
        style={{ marginLeft: "20px" }}
      >
        <div style={{ marginTop: "10px" }}>
          <span
            className="font-cormorant rounded bg-[#C37000]/80 px-3 py-2 text-[14px] font-semibold text-white"
            // style={{ marginTop: "20px" }}
          >
            <span style={{ marginLeft: "5px", marginRight: "5px" }}>
              {item.type}
            </span>
          </span>

          <h3
            className="font-cormorant mt-2 text-[22px] font-semibold text-[#0B6670]"
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
            className="mt-3 text-3xl text-[#0F5C66]"
            style={{ marginBottom: "10px", fontWeight: "600" }}
          >
            ₹ {item.price}
          </h4>
        </div>

        <div className="flex flex-col items-end justify-between">
          <button
            type="button"
            onClick={handleRemove}
            className="cursor-pointer text-[#0B6670] transition hover:text-[#A45A43]"
            style={{ marginTop: "20px", marginRight: "20px" }}
            aria-label={`Remove ${item.title} from cart`}
          >
            <Trash2 size={18} />
          </button>
          <div style={{ marginBottom: "50px", marginRight: "20px" }}>
            <QuantitySelector
              quantity={item.quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
