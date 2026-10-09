"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, ShoppingCart, Check } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
// import { store } from "@/store/store";
import LoginModal from "@/components/auth/LoginModal";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface BookingSummaryProps {
  seva: {
    id: string | number;
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
  selectedDate = "",
  selectedTime = "",
}: BookingSummaryProps) {
  const dispatch = useAppDispatch();

  const [loginOpen, setLoginOpen] = useState(false);
  const [cartMessage, setCartMessage] = useState(false);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("brajmarg_is_logged_in") === "true";

    if (!isLoggedIn) {
      const currentPage = `${window.location.pathname}${window.location.search}`;

      localStorage.setItem("brajmarg_login_redirect", currentPage);

      setLoginOpen(true);
      return;
    }

    dispatch(
      addToCart({
        id: seva.id,
        type: "SEVA",
        title: seva.name,
        price: seva.price,
        quantity: 1,
        image: seva.image_url || "/images2/default.png",
        temple: `${temple.name}, ${temple.location}`,
        date: `${selectedDate}, ${selectedTime}`,
        selectedDate,
        selectedSlot: selectedTime,
      }),
    );
    setCartMessage(true);

    window.setTimeout(() => {
      setCartMessage(false);
    }, 2800);
  };

  return (
    <>
      <section className="relative mt-14 overflow-hidden rounded-[26px] border-[2px] border-[#C37000] bg-transparent px-8 py-6 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
        <div
          className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
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
                    src={seva.image_url || "/images2/default.png"}
                    alt={seva.name}
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

            <div style={{ marginLeft: "10px" }}>
              <h2 className="font-cormorant text-[26px] leading-none font-semibold text-[#0B6670]">
                {seva.name}
              </h2>

              <p
                className={`${cormorantInfant.className} text-[20px] leading-5 font-bold text-[#3D352F]`}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                {temple.name}, {temple.location}
              </p>

              <div className="mt-4 flex items-center gap-3 text-[#C37000]">
                <CalendarDays size={20} />
                <span className="text-[20px] font-semibold">
                  {selectedDate}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1">
            <div className="hidden h-20 w-px bg-[#D89A3D] lg:block" />

            <div style={{ marginRight: "50px" }}>
              <p
                className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
              >
                Seva Amount
              </p>

              <h3 className="mt-1 text-[35px] leading-none font-bold text-[#0B6670]">
                ₹{seva.price}
              </h3>
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
                      {seva.name} has been added successfully.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex h-[56px] cursor-pointer items-center gap-3 rounded-xl bg-[#0B6670] px-8 text-[24px] text-[#EFDEC7] transition hover:bg-[#09565D]"
                style={{ marginRight: "20px" }}
              >
                <ShoppingCart size={22} style={{ marginLeft: "10px" }} />

                <span
                  style={{ marginRight: "10px", fontFamily: "font-cormorant" }}
                >
                  Add to Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
