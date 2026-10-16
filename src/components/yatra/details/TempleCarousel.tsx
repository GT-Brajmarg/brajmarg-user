"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

const temples = [
  {
    id: 1,
    name: "Shreenathji Temple",
    image: "/images2/default.png",
  },
  {
    id: 2,
    name: "Banke Bihari Temple",
    image: "/images2/default.png",
  },
  {
    id: 3,
    name: "Prem Mandir",
    image: "/images2/default.png",
  },
  {
    id: 4,
    name: "ISKCON Temple",
    image: "/images2/default.png",
  },
  {
    id: 5,
    name: "Govardhan",
    image: "/images2/default.png",
  },
  {
    id: 6,
    name: "Barsana",
    image: "/images2/default.png",
  },
];

export default function TempleCarousel() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const slider = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    slider.current?.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
    if (direction === "right") {
      setHasScrolled(true);
    }
  };

  const handleScroll = () => {
    if (slider.current) {
      setHasScrolled(slider.current.scrollLeft > 10);
    }
  };

  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#EFDEC7]/50 p-3.5 sm:p-4">
      <div className="mb-2.5 sm:mb-3 flex items-center justify-between px-1 sm:px-2">
        <h2 className="font-cormorant text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#0F5C66]">
          Temples Covered
        </h2>
      </div>

      <div className="relative">
        {/* Left Arrow Button - only shown when scrolled */}
        {hasScrolled && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#C98C3D] bg-[#EFDEC7]/90 text-[#0F5C66] shadow-md backdrop-blur-sm transition-all hover:bg-[#EFDEC7]"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 z-10 flex h-8 w-8 sm:h-9 sm:w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#C98C3D] bg-[#EFDEC7]/90 text-[#0F5C66] shadow-md backdrop-blur-sm transition-all hover:bg-[#EFDEC7]"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={slider}
          onScroll={handleScroll}
          className="scrollbar-hide flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth px-1 py-1"
        >
          {temples.map((temple) => (
            <div
              key={temple.id}
              className="min-w-[130px] sm:min-w-[145px] flex-shrink-0 overflow-hidden rounded-xl border border-[#C37000]/25 bg-[#F9F3EA] shadow-xs transition hover:shadow-md"
            >
              <div className="relative h-[95px] sm:h-[105px] w-full overflow-hidden bg-[#EFDEC7]/60">
                <Image
                  src={temple.image}
                  alt={temple.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 130px, 150px"
                />
              </div>

              <div className="p-2 sm:p-2.5">
                <h3 className="font-cormorant line-clamp-2 text-center text-[15px] sm:text-[16px] font-bold text-[#0F5C66] leading-tight">
                  {temple.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
