"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, ShoppingCart, Check } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
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
    image_url?: string;
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

  const formattedDateText = (() => {
    if (!selectedDate) return "";
    try {
      const d = new Date(selectedDate);
      if (isNaN(d.getTime())) return selectedDate;
      const day = d.getDate();
      const month = d.toLocaleString("en-IN", { month: "long" });
      const year = d.getFullYear();
      let timeStr = "";
      if (selectedTime) {
        if (selectedTime.includes(":")) {
          const t = new Date(`1970-01-01T${selectedTime}`);
          if (!isNaN(t.getTime())) {
            timeStr = `, ${t.toLocaleTimeString("en-IN", {
              hour: "numeric",
              minute: "2-digit",
            })}`;
          } else {
            timeStr = `, ${selectedTime}`;
          }
        } else {
          timeStr = `, ${selectedTime}`;
        }
      }
      return `${day} ${month} ${year}${timeStr}`;
    } catch {
      return selectedDate;
    }
  })();

  return (
    <>
      <section className="relative mt-6 sm:mt-8 overflow-hidden rounded-[20px] sm:rounded-[24px] border-[2px] border-[#C37000] bg-[#EFDEC7]/30 p-4 sm:p-5 md:p-6 shadow-[0_8px_25px_rgba(126,83,26,0.10)]">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT: Thumbnail & Details */}
          <div className="flex w-full items-center gap-4 sm:gap-6 lg:w-auto">
            {/* Framed Thumbnail */}
            <div className="relative w-[90px] sm:w-[105px] aspect-[1862/1756] shrink-0">
              <div className="absolute top-[11.5%] left-[8%] h-[78%] w-[84%] overflow-hidden rounded-[8px] z-0">
                <Image
                  src={seva.image_url || "/images2/default.png"}
                  alt={seva.name}
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
              <h2 className="font-cormorant text-[24px] sm:text-[28px] font-bold leading-tight text-[#0B6670]">
                {seva.name}
              </h2>

              <p className="font-cormorant mt-0.5 text-[17px] sm:text-[19px] font-medium text-[#3D352F]">
                {temple.name}, {temple.location}
              </p>

              {formattedDateText && (
                <div className="mt-2 flex items-center gap-2 text-[#C37000]">
                  <CalendarDays size={18} className="shrink-0 text-[#C37000]" />
                  <span className="font-cormorant text-[16px] sm:text-[18px] font-semibold text-[#C37000]">
                    {formattedDateText}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Price & Button */}
          <div className="flex w-full items-center justify-between gap-5 sm:gap-6 lg:w-auto lg:justify-end">
            <div className="hidden h-14 w-px bg-[#D89A3D]/50 lg:block" />

            <div className="text-left lg:text-right">
              <p className="font-cormorant text-[13.5px] sm:text-[14.5px] font-medium text-[#6B5A4B]">
                Seva Amount
              </p>
              <h3 className="font-cormorant text-[28px] sm:text-[34px] font-bold leading-none text-[#0B6670] mt-0.5">
                ₹ {seva.price}
              </h3>
            </div>

            <div className="relative inline-flex shrink-0">
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
                className="flex h-11 sm:h-12 items-center gap-2.5 rounded-[12px] bg-[#0B6670] px-6 sm:px-8 font-cormorant text-[18px] sm:text-[20px] font-semibold text-[#EFDEC7] shadow-sm transition hover:bg-[#084F57] cursor-pointer"
              >
                <ShoppingCart size={19} className="shrink-0" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
