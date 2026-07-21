"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/store/hooks";

export default function CartSection() {
  const items = useAppSelector((state) => state.cart.items);

  if (items.length === 0) {
    return (
      <section className="py-10">
        <div className="mx-auto flex min-h-[360px] max-w-7xl flex-col items-center justify-center rounded-3xl border border-[#C37000] bg-[#C37000]/4 px-6 text-center">
          <ShoppingCart size={46} className="text-[#C67A00]" />

          <h2 className="font-cormorant mt-5 text-[32px] font-semibold text-[#0B6670]">
            Your Cart is Empty
          </h2>

          <p className="mt-2 max-w-md text-[14px] text-[#6B5A49]">
            Add seva, prasad, sacred frames, or other offerings to your cart.
          </p>

          <Link
            href="/shop"
            className="font-cormorant mt-6 flex h-[48px] items-center justify-center rounded-xl bg-[#0B6670] px-7 text-[19px] font-semibold transition hover:bg-[#095A61]"
            style={{ color: "#EFDEC7 !important", marginTop: "20px" }}
          >
            <span
              style={{
                color: "#EFDEC7 !important",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              Explore Shop
            </span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-[#C37000] bg-[#C37000]/4">
          <div className="flex items-center gap-3 border-b border-[#D79B32] p-6">
            <ShoppingCart
              className="text-[#C67A00]"
              style={{ marginLeft: "20px" }}
            />

            <h2
              className="font-cormorant text-2xl font-semibold text-[#0B6670]"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Items in your Cart ({items.length})
            </h2>
          </div>

          <div className="cart-items-scroll h-[560px] overflow-y-auto px-6 pr-3">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedDate ?? ""}-${item.selectedSlot ?? ""}-${item.variant ?? ""}`}
                item={item}
              />
            ))}
          </div>
        </div>

        <OrderSummary items={items} />
      </div>
    </section>
  );
}
