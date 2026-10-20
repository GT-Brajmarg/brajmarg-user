"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import LoginModal from "@/components/auth/LoginModal";
import { cormorantInfant } from "@/lib/fonts";

interface BookingSummaryProps {
  frame: {
    id: string | number;
    name: string;
    image_url: string;
  };
  temple: {
    name: string;
    location: string;
    image_url?: string;
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
  const [loginOpen, setLoginOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [cartMessage, setCartMessage] = useState(false);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("brajmarg_is_logged_in") === "true";

    if (!isLoggedIn) {
      localStorage.setItem(
        "brajmarg_login_redirect",
        `${window.location.pathname}${window.location.search}`,
      );
      setLoginOpen(true);
      return;
    }

    dispatch(
      addToCart({
        id: frame.id,
        type: "FRAME",
        title: frame.name,
        price: finalPrice,
        quantity,
        image: frame.image_url || "/images2/default.png",
        temple: `${temple.name}, ${temple.location}`,
        extra: `Size: ${selectedSize} • Material: ${selectedMaterial}`,
        variant: `${selectedSize}-${selectedMaterial}`,
      }),
    );
    setCartMessage(true);

    setTimeout(() => {
      setCartMessage(false);
    }, 2500);
  };

  return (
    <section className="relative mt-6 sm:mt-8 overflow-hidden rounded-[20px] sm:rounded-[24px] border-[2px] border-[#C37000] bg-transparent p-4 sm:p-6 shadow-[0_8px_25px_rgba(126,83,26,0.10)]">
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        {/* LEFT: Frame Thumbnail & Details */}
        <div className="flex w-full items-center gap-4 sm:gap-6 lg:w-auto">
          {/* Framed Thumbnail */}
          <div className="relative w-[90px] sm:w-[105px] aspect-[1862/1756] shrink-0">
            <div className="absolute top-[11.5%] left-[8%] h-[78%] w-[84%] overflow-hidden rounded-[8px] z-0">
              <Image
                src={temple.image_url || frame.image_url || "/images2/default.png"}
                alt={frame.name}
                fill
                className="object-cover object-center"
              />
            </div>
            <Image
              src="/images/frame_1.png"
              alt=""
              fill
              className="pointer-events-none z-10 object-contain brightness-[1.15] contrast-[1.1] drop-shadow-[0_0_1px_rgba(90,55,15,0.75)] drop-shadow-[0_1px_2px_rgba(130,80,20,0.3)]"
            />
          </div>

          <div>
            <h2 className="font-cormorant text-[22px] sm:text-[26px] font-bold leading-tight text-[#0B6670]">
              {frame.name}
            </h2>

            <p
              className="font-cormorant mt-1 text-[18px] sm:text-[20px] font-bold text-[#3D352F]"
            >
              {temple?.name}, {temple?.location}
            </p>

            <p className="font-cormorant mt-1.5 text-[16px] sm:text-[17px] text-[#3D352F]">
              Size -{" "}
              <span className="font-semibold text-[#C37000]">
                {selectedSize}
              </span>
              {" | "}
              <span className="font-semibold text-[#C37000]">
                {selectedMaterial}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT: Price + Quantity + Add to Cart */}
        <div className="flex w-full flex-wrap items-center justify-between gap-4 sm:gap-6 lg:w-auto lg:justify-end">
          {/* Divider */}
          <div className="hidden h-14 w-px bg-[#D89A3D]/50 lg:block" />

          {/* Price */}
          <div className="min-w-[100px]">
            <p
              className="font-cormorant text-[16px] font-bold text-[#3D352F]"
            >
              Price
            </p>
            <h3 className="font-cormorant text-[30px] sm:text-[36px] font-bold leading-none text-[#0B6670]">
              ₹ {finalPrice * quantity}
            </h3>
          </div>

          {/* Quantity Stepper */}
          <div className="flex h-[42px] sm:h-[46px] w-[120px] sm:w-[130px] items-center justify-between rounded-xl border border-[#E5C48A] bg-transparent px-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="cursor-pointer text-[#D89A3D] transition hover:scale-110"
              aria-label="Decrease quantity"
            >
              <Minus size={18} />
            </button>

            <span className="font-cormorant text-[22px] sm:text-[24px] font-bold text-[#2F241B]">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="cursor-pointer text-[#0B6670] transition hover:scale-110"
              aria-label="Increase quantity"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="relative">
            {cartMessage && (
              <div className="animate-in fade-in slide-in-from-bottom-3 fixed right-6 bottom-6 z-[100] flex min-w-[280px] items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.16)] duration-300">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B6670]">
                  <Check size={17} strokeWidth={3} className="text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#111111]">
                    Added to cart
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#6B7280]">
                    {frame.name} has been added successfully.
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-[46px] sm:h-[50px] cursor-pointer items-center gap-2.5 rounded-xl bg-[#0B6670] px-6 sm:px-8 text-[18px] sm:text-[20px] font-medium text-[#EFDEC7] shadow-[0_6px_16px_rgba(11,102,112,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#084F57] hover:shadow-[0_10px_22px_rgba(11,102,112,0.25)] active:translate-y-0 active:scale-[0.98]"
            >
              <ShoppingCart size={20} />
              <span className="font-cormorant font-semibold tracking-wide">
                Add to Cart
              </span>
            </button>
          </div>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
