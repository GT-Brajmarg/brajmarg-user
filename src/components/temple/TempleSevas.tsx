"use client";

import Image from "next/image";
import { Clock3, ChevronRight, ChevronLeft } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTempleSevas } from "@/store/slices/sevaSlice";
import Link from "next/link";

interface TempleSevasProps {
  templeSlug: string;
}

export default function TempleSevas({ templeSlug }: TempleSevasProps) {
  const dispatch = useAppDispatch();

  const { sevas, loading } = useAppSelector((state) => state.sevas);

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 5;

  const visibleSevas = sevas.slice(currentIndex, currentIndex + visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(sevas.length - visibleCount, 0)),
    );
  };

  return (
    <section className="relative w-full overflow-hidden rounded-[24px] border-[2px] border-[#C37000] bg-transparent p-5 sm:p-6 shadow-[0_20px_50px_rgba(126,83,26,0.18),0_6px_14px_rgba(126,83,26,0.1)]">
      <div className="relative">
        {/* Header */}
        <div className="my-3 flex items-center justify-center gap-3 text-center">
          <Image src="/images/lotus.png" alt="" width={38} height={38} />

          <h2 className="font-cormorant text-[28px] font-bold text-[#0B6670]">
            Seva at ShreenathJi Temple
          </h2>

          <Image src="/images/lotus.png" alt="" width={38} height={38} />
        </div>

        {/* Cards Carousel Container */}
        <div className="relative mt-5 px-1 sm:px-2">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pr-12">
            {visibleSevas.map((seva) => (
              <div
                key={seva.id}
                className="group relative w-[275px] min-w-[275px] flex-shrink-0 snap-start overflow-hidden rounded-[16px] border border-[#C37000] bg-transparent p-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-[135px] w-full overflow-hidden rounded-[12px]">
                  <Image
                    src={seva.image_url || "/images2/default.png"}
                    alt={seva.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col pt-3 pb-1 px-1">
                  {/* Name & Price */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#C37000]/30 pb-2">
                    <h3 className="font-cormorant flex-1 text-[17px] font-bold text-[#24535D] line-clamp-1">
                      {seva.name}
                    </h3>
                    <div className="border-l border-[#C37000]/40 pl-2.5">
                      <span className="shrink-0 text-[17px] font-bold text-[#D18400]">
                        ₹{seva.price}
                      </span>
                    </div>
                  </div>


                  {/* Button */}
                  {seva.allow_direct_payment ? (
                    <Link
                      href={`/temples/${templeSlug}/sevas/${seva.id}`}
                      className="font-cormorant mt-3 flex h-[34px] w-full items-center justify-center rounded-[8px] bg-[#0B6670] text-[16px] font-semibold text-[#EFDEC7] transition-all hover:bg-[#084F57]"
                    >
                      Book Seva
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="font-cormorant mt-3 flex h-[34px] w-full cursor-not-allowed items-center justify-center rounded-[8px] bg-gray-300 text-[15px] font-medium text-gray-500"
                    >
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Prev Button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105"
            >
              <ChevronLeft size={18} className="text-[#0F5C66]" />
            </button>
          )}

          {/* Navigation Next Button */}
          {currentIndex < sevas.length - visibleCount && (
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-[-10px] z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105"
            >
              <ChevronRight size={18} className="text-[#0F5C66]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
