"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const places = [
  {
    id: 1,
    name: "Govardhan Hill",
    subtitle: "Sacred Hill",
    image: "/images2/default.png",
  },
  {
    id: 2,
    name: "Yamuna Ghat",
    subtitle: "Holy River Bank",
    image: "/images2/default.png",
  },
  {
    id: 3,
    name: "Kusum Lake",
    subtitle: "Sacred Lake",
    image: "/images2/default.png",
  },
  {
    id: 4,
    name: "Nidhi Van",
    subtitle: "Divine Forest",
    image: "/images2/default.png",
  },
  {
    id: 5,
    name: "Prem Mandir",
    subtitle: "Temple",
    image: "/images2/default.png",
  },
  {
    id: 6,
    name: "Kesi Ghat",
    subtitle: "Holy Ghat",
    image: "/images2/default.png",
  },
];

export default function PlacesAlongJourney() {
  const slider = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    slider.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/20 p-5"
      style={{ marginTop: "20px" }}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2
          className="font-cormorant text-[30px] font-bold text-[#0F5C66]"
          style={{ marginLeft: "20px" }}
        >
          Places Along Your Journey
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C98C3D] text-[#C37000]"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C98C3D] text-[#C37000]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={slider}
        className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        {places.map((place) => (
          <div
            key={place.id}
            className="min-w-[180px] overflow-hidden rounded-xl bg-[#C37000]/20 shadow-sm"
          >
            <div className="relative h-[120px]">
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="px-3 py-4 text-center">
              <h3
                className="font-cormorant text-[16px] font-bold text-[#0F5C66]"
                style={{ marginTop: "10px" }}
              >
                {place.name}
              </h3>

              <p
                className="font-cormorant text-[16px] font-bold text-[#3D352F]"
                style={{ marginBottom: "10px" }}
              >
                {place.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
