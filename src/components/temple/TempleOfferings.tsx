"use client";

import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTempleOfferings } from "@/store/slices/offeringSlice";
import { fetchTempleFrames } from "@/store/slices/frameSlice";
import { fetchTempleCloths } from "@/store/slices/clothSlice";
import Link from "next/link";

interface TempleOfferingsProps {
  templeId: string;
}

interface TempleOfferingsProps {
  templeId: string;
  templeSlug: string;
}

export default function TempleOfferings({
  templeId,
  templeSlug,
}: TempleOfferingsProps) {
  const dispatch = useAppDispatch();

  const { items: frames } = useAppSelector((state) => state.frames);

  const { items: cloths } = useAppSelector((state) => state.cloths);

  useEffect(() => {
    if (!templeId) return;

    dispatch(fetchTempleFrames(templeId));
    dispatch(fetchTempleCloths(templeId));
  }, [dispatch, templeId]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const offerings = [
    ...frames.map((item) => ({
      ...item,
      type: "frame",
    })),

    ...cloths.map((item) => ({
      ...item,
      type: "cloth",
    })),
  ];

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[#D89A3D] bg-[#FBF6EE] p-4 md:p-5">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div
          className="mb-4 flex items-center justify-center gap-3"
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          <Image src="/images/lotus.png" alt="" width={40} height={40} />

          <h2 className="font-cormorant text-center text-[24px] leading-tight font-semibold text-[#0B6670] md:text-[28px]">
            Take Home
            <br className="md:hidden" /> Divine Blessings
          </h2>

          <Image src="/images/lotus.png" alt="" width={40} height={40} />
        </div>
        {/* Cards */}
        <div className="relative min-w-0" style={{ marginBottom: "15px" }}>
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {offerings.map((item) => (
              <div
                key={item.id}
                className="group relative flex min-h-[160px] min-w-[250px] items-center gap-3 rounded-[18px] border border-[#E3C58A] bg-[#FFFDF8] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(217,176,108,0.15)]"
                style={{ marginBottom: "10px" }}
              >
                {/* Card Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
                    backgroundSize: "10px 10px",
                  }}
                />

                {/* Image */}
                <div
                  className="relative z-10 h-[100px] w-[85px] flex-shrink-0 overflow-hidden rounded-[10px] border border-[#D9B06C]"
                  style={{ marginLeft: "10px" }}
                >
                  <Image
                    src={item.image_url || "/images2/default.png"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-1 flex-col">
                  <h3 className="font-cormorant text-[16px] leading-[1.15] font-semibold text-[#24535D]">
                    {item.name}
                  </h3>

                  <p
                    className="mt-1 text-[16px] leading-none font-bold text-[#D18400]"
                    style={{ marginTop: "5px" }}
                  >
                    ₹{item.price}
                  </p>

                  <Link
                    href={
                      item.type === "frame"
                        ? `/temples/${templeSlug}/frames/${item.id}`
                        : `/temples/${templeSlug}/cloth/${item.id}`
                    }
                  >
                    <button
                      className="mt-3 h-[25px] w-[90px] rounded-[8px] bg-[#0B6670] text-[12px] font-medium text-white transition hover:bg-[#084F57]"
                      disabled={!item.in_stock || !item.allow_direct_payment}
                    >
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105"
            style={{ marginLeft: "12px" }}
          >
            <ChevronLeft size={18} className="text-[#A06A15]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105"
            style={{ marginRight: "12px" }}
          >
            <ChevronRight size={18} className="text-[#A06A15]" />
          </button>
        </div>
      </div>
    </section>
  );
}
