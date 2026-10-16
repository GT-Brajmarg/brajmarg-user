"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const places = [
  {
    id: 1,
    name: "Govardhan Hill",
    subtitle: "Sacred Hill",
    image: "/images/temple_khatu_shyam.png",
  },
  {
    id: 2,
    name: "Yamuna Ghat",
    subtitle: "Holy River Bank",
    image: "/images/temple_yamuna_devi.png",
  },
  {
    id: 3,
    name: "Kusum Lake",
    subtitle: "Sacred Lake",
    image: "/images/hero-yatra-temple.png",
  },
  {
    id: 4,
    name: "Nidhi Van",
    subtitle: "Divine Forest",
    image: "/images/radha-krishna.png",
  },
  {
    id: 5,
    name: "Prem Mandir",
    subtitle: "Temple",
    image: "/images/temple_radha_rani.png",
  },
  {
    id: 6,
    name: "Kesi Ghat",
    subtitle: "Holy Ghat",
    image: "/images/temple_banke_bihari.png",
  },
];

export default function PlacesAlongJourney() {
  const slider = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    slider.current?.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/20 p-3.5 sm:p-5 mt-5">
      <div className="mb-4 sm:mb-5 flex items-center justify-between px-1 sm:px-2">
        <h2 className="font-cormorant text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#0F5C66]">
          Places Along Your Journey
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#C98C3D] text-[#C37000] hover:bg-[#EFDEC7]/50"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#C98C3D] text-[#C37000] hover:bg-[#EFDEC7]/50"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={slider}
        className="scrollbar-hide flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth px-1 py-1"
      >
        {places.map((place) => (
          <div
            key={place.id}
            className="min-w-[150px] sm:min-w-[180px] flex-shrink-0 overflow-hidden rounded-xl border border-[#C37000]/25 bg-[#F9F3EA] shadow-xs transition hover:shadow-md"
          >
            <div className="relative h-[110px] sm:h-[125px] w-full overflow-hidden bg-[#EFDEC7]/50">
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 150px, 180px"
              />
            </div>

            <div className="p-2.5 sm:p-3 text-center">
              <h3 className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#0F5C66] leading-tight">
                {place.name}
              </h3>

              <p className="font-cormorant text-[14px] font-bold text-[#3D352F] mt-0.5">
                {place.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
