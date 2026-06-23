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
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemplePrasad } from "@/store/slices/prasadSlice";

interface TemplePrasadProps {
  templeId: string;
}

export default function TemplePrasad({ templeId }: TemplePrasadProps) {
  const dispatch = useAppDispatch();

  const { items, loading } = useAppSelector((state) => state.prasad);

  useEffect(() => {
    if (templeId) {
      dispatch(fetchTemplePrasad(templeId));
    }
  }, [dispatch, templeId]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };
  return (
    <section className="relative overflow-hidden rounded-[22px] border border-[#D89A3D] bg-[#FBF6EE] p-4">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative">
        {/* Heading */}
        <div
          className="mb-4 flex items-center justify-center gap-3"
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          <Image src="/images/lotus.png" alt="" width={48} height={48} />

          <h2 className="font-cormorant text-[28px] font-semibold text-[#0B6670]">
            Prasad from ShreenathJi Temple
          </h2>

          <Image src="/images/lotus.png" alt="" width={48} height={48} />
        </div>

        <div
          className="grid gap-6 lg:grid-cols-[1fr_260px]"
          style={{ marginBottom: "15px" }}
        >
          {/* Cards */}
          <div className="relative min-w-0">
            <div
              ref={scrollRef}
              className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth pb-2"
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative min-w-[195px] overflow-hidden rounded-[18px] border border-[#D9B06C] bg-[#FFFDF8] shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
                      backgroundSize: "12px 12px",
                    }}
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
                  <div className="relative z-10 flex min-h-[110px] flex-col p-2.5">
                    {/* Name */}
                    <h3 className="line-clamp-2 h-[38px] text-center text-[14px] leading-[1.2] font-medium text-[#24535D]">
                      {item.name}
                    </h3>

                    {/* Price */}
                    <p className="mt-2 text-center text-[14px] font-bold text-[#D18400]">
                      ₹{item.price}
                    </p>

                    {/* Button */}
                    <button
                      disabled={!item.in_stock || !item.allow_direct_payment}
                      className="mt-auto flex h-[32px] w-full items-center justify-center rounded-[8px] bg-[#0B6670] text-[12px] font-medium text-white transition hover:bg-[#084F57]"
                    >
                      {item.in_stock ? "Order Now" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 left-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105"
            >
              <ChevronLeft size={18} className="text-[#A06A15]" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute top-1/2 right-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105"
            >
              <ChevronRight size={18} className="text-[#A06A15]" />
            </button>
          </div>

          {/* Benefits */}
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3 text-[#5B524A]">
              <Gift size={18} className="text-[#D18400]" />
              <span className="text-[14px]">
                Prepared with devotion in Temple
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#5B524A]">
              <Package size={18} className="text-[#D18400]" />
              <span className="text-[14px]">Fresh & Hygienically packed</span>
            </div>

            <div className="flex items-center gap-3 text-[#5B524A]">
              <Truck size={18} className="text-[#D18400]" />
              <span className="text-[14px]">Delivered across India</span>
            </div>

            <div className="flex items-center gap-3 text-[#5B524A]">
              <Clock3 size={18} className="text-[#D18400]" />
              <span className="text-[14px]">Delivery in 3-5 working days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
