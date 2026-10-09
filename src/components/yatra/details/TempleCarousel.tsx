"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

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
  const slider = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    slider.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/60 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2
          className="font-cormorant text-[30px] font-bold text-[#0F5C66]"
          style={{ marginLeft: "20px" }}
        >
          Temples Covered
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
        style={{ marginLeft: "20px", marginBottom: "20px", marginTop: "10px" }}
      >
        {temples.slice(0, 5).map((temple) => (
          <div
            key={temple.id}
            className="min-w-[145px] overflow-hidden rounded-xl bg-[#C37000]/20"
          >
            <div className="relative h-[110px]">
              <Image
                src={temple.image}
                alt={temple.name}
                fill
                className="object-cover"
              />
            </div>

            <div
              className="p-3"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <h3 className="font-cormorant line-clamp-2 text-center text-[18px] font-bold text-[#0F5C66]">
                {temple.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
