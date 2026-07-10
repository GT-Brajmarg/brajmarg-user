"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart, CheckCircle2, Check } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import LoginModal from "@/components/auth/LoginModal";

interface BookingSummaryProps {
  frame: {
    id: string | number;
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
  const [loginOpen, setLoginOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [cartMessage, setCartMessage] = useState(false);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("brajmarg_is_logged_in") === "true";

    if (!isLoggedIn) {
      // Save this exact frame page so the user returns here after login.
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
    <section className="relative mt-10 overflow-hidden rounded-[24px] border border-[#D89A3D] bg-transparent px-7 py-6 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        {/* LEFT */}

        <div className="flex items-center gap-6">
          <div
            className="relative h-[150px] w-[180px] shrink-0"
            style={{ marginLeft: "40px" }}
          >
            <div className="absolute inset-0">
              {/* Cloth photo */}
              <div className="absolute top-1/2 left-1/2 z-10 h-[118px] w-[132px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px]">
                <Image
                  src={frame.image_url || "/images2/default.png"}
                  alt={frame.name}
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
              className="flex h-[45px] w-[150px] items-center justify-between rounded-xl border border-[#E5C48A] bg-transparent px-4"
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
            <div className="relative inline-flex">
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
                      {frame.name} has been added successfully.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex h-[56px] cursor-pointer items-center gap-3 rounded-xl bg-[#0B6670] px-8 text-[24px] text-[#EFDEC7] shadow-[0_8px_18px_rgba(11,102,112,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#09565D] hover:shadow-[0_12px_24px_rgba(11,102,112,0.28)] active:translate-y-0 active:scale-[0.98]"
                style={{ marginBottom: "20px", marginRight: "-20px" }}
              >
                <ShoppingCart
                  size={22}
                  className="ml-[10px]"
                  style={{ marginLeft: "10px" }}
                />

                <span
                  className="font-cormorant"
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
