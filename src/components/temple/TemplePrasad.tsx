"use client";

import Image from "next/image";
import {
  ChevronRight,
  Package,
  Gift,
  Truck,
  Clock3,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemplePrasad } from "@/store/slices/prasadSlice";
import Link from "next/link";

interface TemplePrasadProps {
  templeSlug: string;
}

export default function TemplePrasad({ templeSlug }: TemplePrasadProps) {
  const dispatch = useAppDispatch();

  const { items, loading } = useAppSelector((state) => state.prasad);

  // useEffect(() => {
  //   if (templeId) {
  //     dispatch(fetchTemplePrasad(templeId));
  //   }
  // }, [dispatch, templeId]);
  // const scrollRef = useRef<HTMLDivElement>(null);

  // const scrollRight = () => {
  //   scrollRef.current?.scrollBy({
  //     left: 400,
  //     behavior: "smooth",
  //   });
  // };

  // const scrollLeft = () => {
  //   scrollRef.current?.scrollBy({
  //     left: -320,
  //     behavior: "smooth",
  //   });
  // };

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 4;

  const visibleItems = items.slice(currentIndex, currentIndex + visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + visibleCount, Math.max(items.length - visibleCount, 0)),
    );
  };
  return (
    <section className="relative z-20 -translate-y-6 overflow-hidden rounded-[22px] border-[2px] border-[#C37000] bg-transparent p-4 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.06]" />

      <div className="relative">
        {/* Heading */}
        <div className="my-4 flex flex-col items-center justify-center text-center md:flex-row md:gap-3">
          <div
            className="flex items-center justify-center gap-2"
            style={{ marginBottom: "10px", marginTop: "10px" }}
          >
            <Image src="/images/lotus.png" alt="" width={40} height={40} />

            <h2 className="font-cormorant text-[24px] leading-tight font-semibold text-[#0B6670] md:text-[28px]">
              Prasad from
              <br className="md:hidden" /> ShreenathJi Temple
            </h2>

            <Image src="/images/lotus.png" alt="" width={40} height={40} />
          </div>
        </div>

        <div
          className="grid gap-6 lg:grid-cols-[1fr_260px]"
          style={{ marginBottom: "15px" }}
        >
          {/* Cards */}
          <div className="relative min-w-0" style={{ marginLeft: "14px" }}>
            <div
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 md:ml-10 md:gap-3"
              style={{
                marginLeft:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? "0px"
                    : "40px",
                marginRight:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? "10px"
                    : "0px",
              }}
            >
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative min-w-[195px] overflow-hidden rounded-[18px] border border-[#C37000] bg-transparent shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300"
                >
                  {/* Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    // style={{
                    //   backgroundImage:
                    //     "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
                    //   backgroundSize: "12px 12px",
                    // }}
                  />

                  {/* Image */}
                  <div className="relative h-[105px] overflow-hidden">
                    <Image
                      src={item.image_url || "/images2/default.png"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex min-h-[110px] flex-col">
                    {/* Name */}
                    <h3
                      className="line-clamp-2 h-[32px] text-center leading-[1.2] font-medium text-[#24535D] text-[16x]"
                      style={{ marginTop: "14px" }}
                    >
                      {item.name}
                    </h3>

                    {/* Price */}
                    <p
                      className="mt-2 text-center text-[18px] font-bold text-[#D18400]"
                      style={{ marginBottom: "10px", marginTop: "-2px" }}
                    >
                      ₹{item.price}
                    </p>

                    {/* Button */}
                    {item.in_stock && item.allow_direct_payment ? (
                      <Link
                        href={`/temples/${templeSlug}/prasad/${item.id}`}
                        className="mt-auto"
                        // style={{ marginBottom: "-20px" }}
                      >
                        <button
                          className="font-cormorant flex h-[28px] w-[120px] items-center justify-center rounded-[8px] bg-[#0B6670] text-[15px] font-medium text-[#EFDEC7] transition hover:bg-[#084F57]"
                          style={{ marginLeft: "40px", marginBottom: "10px" }}
                        >
                          Order Now
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="font-cormorant mt-auto flex h-[28px] w-[120px] items-center justify-center rounded-[8px] bg-gray-300 text-[15px] font-medium text-[#EFDEC7]"
                        style={{ marginLeft: "40px", marginBottom: "10px" }}
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-[-12px] z-20 flex hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105 md:flex"
                style={{ marginLeft: "6px" }}
              >
                <ChevronLeft size={18} className="text-[#0F5C66]" />
              </button>
            )}

            {/* Right Arrow */}
            {currentIndex < items.length - visibleCount && (
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-[-12px] z-20 flex hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105 md:flex"
              >
                <ChevronRight size={18} className="text-[#0F5C66]" />
              </button>
            )}
          </div>

          {/* Benefits */}
          <div className="flex flex-col items-center justify-center gap-4 bg-transparent md:items-start">
            <div className="flex items-center justify-center gap-3 text-center text-[#5B524A] md:justify-start md:text-left">
              <Gift size={18} className="shrink-0 text-[#D18400]" />
              <span className="font-cormorant text-[16px]">
                Prepared with devotion in Temple
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 text-center text-[#5B524A] md:justify-start md:text-left">
              <Package size={18} className="shrink-0 text-[#D18400]" />
              <span className="font-cormorant text-[16px]">
                Fresh & Hygienically packed
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 text-center text-[#5B524A] md:justify-start md:text-left">
              <Truck size={18} className="shrink-0 text-[#D18400]" />
              <span className="font-cormorant text-[16px]">
                Delivered across India
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 text-center text-[#5B524A] md:justify-start md:text-left">
              <Clock3 size={18} className="shrink-0 text-[#D18400]" />
              <span className="font-cormorant text-[16px]">
                Delivery in 3-5 working days
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
