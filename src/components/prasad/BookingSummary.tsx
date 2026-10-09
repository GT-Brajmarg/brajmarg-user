"use client";

import Image from "next/image";
import { Package, ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import LoginModal from "@/components/auth/LoginModal";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface BookingSummaryProps {
  prasad: {
    id: string | number;
    name: string;
    image_url: string;
    price?: number;
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
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartMessage, setCartMessage] = useState(false);

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("brajmarg_is_logged_in") === "true";

    if (!isLoggedIn) {
      // Saves the exact current prasad page so login returns here.
      localStorage.setItem(
        "brajmarg_login_redirect",
        `${window.location.pathname}${window.location.search}`,
      );

      setLoginOpen(true);
      return;
    }

    dispatch(
      addToCart({
        id: prasad.id,
        type: "PRASAD",
        title: prasad.name,
        price: finalPrice,
        quantity,
        image: prasad.image_url || "/images2/default.png",
        temple: `${temple.name}, ${temple.location}`,
        extra: `Pack Size: ${selectedQuantity}`,
        variant: selectedQuantity,
      }),
    );
    setCartMessage(true);

    setTimeout(() => {
      setCartMessage(false);
    }, 2500);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };
  return (
    <section className="relative mt-14 overflow-hidden rounded-[26px] border-[2px] border-[#C37000] bg-transparent px-8 py-6 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
      <div
        className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-6">
          {/* Image */}
          <div
            className="relative h-[150px] w-[180px] shrink-0"
            style={{ marginLeft: "40px" }}
          >
            <div className="absolute inset-0">
              {/* Cloth photo */}
              <div className="absolute top-1/2 left-1/2 z-10 h-[118px] w-[132px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px]">
                <Image
                  src={prasad.image_url || "/images2/default.png"}
                  alt={prasad.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Frame overlay */}
              <Image
                src="/images/frame_1.png"
                alt=""
                fill
                className="pointer-events-none z-20 object-contain"
              />
            </div>
          </div>

          {/* Info */}
          <div style={{ marginLeft: "10px" }}>
            <h2 className="font-cormorant text-[30px] leading-none font-semibold text-[#0B6670]">
              {prasad.name}
            </h2>

            <p
              className={`${cormorantInfant.className} mt-2 text-[22px] font-bold text-[#3D352F]`}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {temple?.name}, {temple?.location}
            </p>

            <div className="mt-4 flex items-center gap-3 text-[#D89A3D]">
              <Package size={20} />

              <span
                className={`${cormorantInfant.className} text-[25px] font-semibold`}
              >
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
            <p
              className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
            >
              Price
            </p>

            <h3 className="mt-1 text-[30px] leading-none font-bold text-[#0B6670]">
              ₹ {finalPrice * quantity}
            </h3>
          </div>

          {/* Quantity + Button */}
          <div className="flex flex-col items-end gap-4">
            {/* Quantity Selector */}
            <div className="flex h-[45px] overflow-hidden rounded-xl border border-[#E5C48A] bg-transparent">
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
            {/* <button
              onClick={handleAddToCart}
              className="s flex h-14 items-center gap-3 rounded-xl bg-[#0B6670] px-8 text-[22px] text-white transition hover:bg-[#09565D]"
              style={{ width: "180px" }}
            >
              <ShoppingCart
                size={22}
                style={{ marginLeft: "15px", color: "#EFDEC7" }}
              />

              <span style={{ color: "#EFDEC7", fontFamily: "font-cormorant" }}>
                Add to Cart
              </span>
            </button> */}
            <div className="relative">
              {cartMessage && (
                <div className="animate-in fade-in slide-in-from-bottom-3 fixed right-6 bottom-6 z-[100] flex min-w-[290px] items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.16)] duration-300">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B6670]">
                    <Check size={17} strokeWidth={3} className="text-white" />
                  </div>

                  <div>
                    <p className="text-[14px] font-semibold text-[#111111]">
                      Added to cart
                    </p>

                    <p className="mt-0.5 text-[12px] text-[#6B7280]">
                      {prasad.name} has been added successfully.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex h-[56px] cursor-pointer items-center gap-3 rounded-xl bg-[#0B6670] px-8 text-[24px] text-[#EFDEC7] transition hover:bg-[#09565D]"
                style={{ marginBottom: "20px" }}
              >
                <ShoppingCart size={22} style={{ marginLeft: "10px" }} />

                <span
                  className={`${cormorantInfant.className} text-[25px] font-bold`}
                  style={{ marginRight: "10px" }}
                >
                  Add to Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
