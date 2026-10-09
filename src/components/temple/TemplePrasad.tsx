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

  const visibleCount = 3;

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
    <section className="relative w-full overflow-hidden rounded-[24px] border-[2px] border-[#C37000] bg-transparent p-5 sm:p-6 shadow-[0_20px_50px_rgba(126,83,26,0.18),0_6px_14px_rgba(126,83,26,0.1)]">
      <div className="relative">
        {/* Heading */}
        <div className="my-3 flex items-center justify-center gap-3 text-center">
          <Image src="/images/lotus.png" alt="" width={38} height={38} />

          <h2 className="font-cormorant text-[28px] font-bold text-[#0B6670]">
            Prasad from ShreenathJi Temple
          </h2>

          <Image src="/images/lotus.png" alt="" width={38} height={38} />
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* Cards Carousel */}
          <div className="relative min-w-0 flex-1">
            {/* Mobile: horizontal scroll; Desktop: 3-column grid */}
            <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex w-[75vw] max-w-[260px] flex-shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[18px] border border-[#C37000] bg-transparent shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-md lg:w-auto lg:max-w-none lg:flex-shrink"
                >
                  {/* Image */}
                  <div className="relative h-[140px] w-full overflow-hidden">
                    <Image
                      src={item.image_url || "/images2/default.png"}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-center p-3 text-center">
                    <h3 className="font-cormorant text-[17px] font-bold text-[#24535D] line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-[18px] font-bold text-[#D18400]">
                      ₹{item.price}
                    </p>

                    {item.in_stock && item.allow_direct_payment ? (
                      <Link
                        href={`/temples/${templeSlug}/prasad/${item.id}`}
                        className="mt-3 w-full"
                      >
                        <button className="font-cormorant h-[34px] w-full rounded-[8px] bg-[#0B6670] text-[16px] font-semibold text-[#EFDEC7] transition-all hover:bg-[#084F57] cursor-pointer">
                          Order Now
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="font-cormorant mt-3 h-[34px] w-full cursor-not-allowed rounded-[8px] bg-gray-300 text-[15px] font-medium text-gray-500"
                      >
                        Out of Stock
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
                className="absolute top-1/2 -left-4 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105"
              >
                <ChevronLeft size={18} className="text-[#0F5C66]" />
              </button>
            )}

            {/* Navigation Next Button */}
            {currentIndex < items.length - visibleCount && (
              <button
                onClick={handleNext}
                className="absolute top-1/2 -right-4 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105"
              >
                <ChevronRight size={18} className="text-[#0F5C66]" />
              </button>
            )}
          </div>

          {/* Benefits Column on Right */}
          <div className="flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-[#C37000]/30 pt-4 lg:pt-0 lg:pl-6 lg:w-[220px] lg:flex-shrink-0">
            <div className="flex items-center gap-3 text-[#5B524A]">
              <Gift size={20} className="shrink-0 text-[#D18400]" />
              <span className="font-cormorant text-[16px] font-medium">
                Prepared with devotion in Temple
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#5B524A]">
              <Package size={20} className="shrink-0 text-[#D18400]" />
              <span className="font-cormorant text-[16px] font-medium">
                Fresh &amp; Hygienically packed
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#5B524A]">
              <Truck size={20} className="shrink-0 text-[#D18400]" />
              <span className="font-cormorant text-[16px] font-medium">
                Delivered across India
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#5B524A]">
              <Clock3 size={20} className="shrink-0 text-[#D18400]" />
              <span className="font-cormorant text-[16px] font-medium">
                Delivery in 3 - 5 working days
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
