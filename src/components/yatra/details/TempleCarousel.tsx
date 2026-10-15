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
    <section className="rounded-[18px] border border-[#C37000] bg-[#EFDEC7]/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2
          className="font-cormorant text-[30px] font-bold text-[#0F5C66]"
          style={{ marginLeft: "10px" }}
        >
          Temples Covered
        </h2>
      </div>

      <div className="relative">
        {/* Left Arrow Button - only shown when scrolled */}
        {hasScrolled && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#C98C3D] bg-[#EFDEC7]/85 text-[#0F5C66] shadow-md backdrop-blur-sm transition-all hover:bg-[#EFDEC7]"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#C98C3D] bg-[#EFDEC7]/85 text-[#0F5C66] shadow-md backdrop-blur-sm transition-all hover:bg-[#EFDEC7]"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={slider}
          onScroll={handleScroll}
          className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth"
          style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "8px", marginTop: "4px" }}
        >
          {temples.map((temple) => (
            <div
              key={temple.id}
              className="min-w-[125px] flex-shrink-0 overflow-hidden rounded-xl bg-[#C37000]/20"
            >
              <div className="relative h-[92px]">
                <Image
                  src={temple.image}
                  alt={temple.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-2">
                <h3 className="font-cormorant line-clamp-2 text-center text-[16px] font-bold text-[#0F5C66]">
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
