"use client";

import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTempleOfferings } from "@/store/slices/offeringSlice";
import { fetchTempleFrames } from "@/store/slices/frameSlice";
import { fetchTempleCloths } from "@/store/slices/clothSlice";
import Link from "next/link";

// interface TempleOfferingsProps {
//   templeId: string;
// }

interface TempleOfferingsProps {
  templeSlug: string;
}

export default function TempleOfferings({ templeSlug }: TempleOfferingsProps) {
  const dispatch = useAppDispatch();

  const { items: frames } = useAppSelector((state) => state.frames);

  const { items: cloths } = useAppSelector((state) => state.cloths);

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 4;

  const visibleOfferings = offerings.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(
        prev + visibleCount,
        Math.max(offerings.length - visibleCount, 0),
      ),
    );
  };

  return (
    <section className="relative w-full overflow-hidden rounded-[24px] border-[2px] border-[#C37000] bg-transparent p-5 sm:p-6 shadow-[0_20px_50px_rgba(126,83,26,0.18),0_6px_14px_rgba(126,83,26,0.1)]">
      <div className="relative">
        {/* Header */}
        <div className="my-3 flex items-center justify-center gap-3 text-center">
          <Image src="/images/lotus.png" alt="" width={38} height={38} />

          <h2 className="font-cormorant text-[28px] font-bold text-[#0B6670]">
            Take Home Divine Blessings
          </h2>

          <Image src="/images/lotus.png" alt="" width={38} height={38} />
        </div>

        {/* Cards Carousel */}
        <div className="relative mt-5 px-1 sm:px-6">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2">
            {visibleOfferings.map((item) => (
              <div
                key={item.id}
                className="group relative flex w-[260px] min-w-[260px] flex-shrink-0 snap-start items-center gap-3 rounded-[16px] border border-[#C37000] bg-transparent p-3 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-[95px] w-[80px] flex-shrink-0 overflow-hidden rounded-[10px]">
                  <Image
                    src={item.image_url || "/images2/default.png"}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <h3 className="font-cormorant text-[16px] font-bold text-[#24535D] line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-[16px] font-bold text-[#D18400]">
                    ₹{item.price}
                  </p>

                  <Link
                    href={
                      item.type === "frame"
                        ? `/temples/${templeSlug}/frames/${item.id}`
                        : `/temples/${templeSlug}/cloth/${item.id}`
                    }
                    className="mt-2"
                  >
                    <button
                      className="font-cormorant flex h-[28px] w-[95px] items-center justify-center rounded-[8px] bg-[#0B6670] text-[14px] font-semibold text-[#EFDEC7] transition-all hover:bg-[#084F57] cursor-pointer"
                      disabled={!item.in_stock || !item.allow_direct_payment}
                    >
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Prev Button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105 md:flex"
            >
              <ChevronLeft size={20} className="text-[#0F5C66]" />
            </button>
          )}

          {/* Navigation Next Button */}
          {currentIndex < offerings.length - visibleCount && (
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105 md:flex"
            >
              <ChevronRight size={20} className="text-[#0F5C66]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
