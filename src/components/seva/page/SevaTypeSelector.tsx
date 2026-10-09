"use client";

import Image from "next/image";
import { HandHelping, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  fetchSevaTypes,
  setSelectedSevaType,
} from "@/store/slices/sevaPageSlice";

const sevaTypeImages: Record<string, string> = {
  Abhishek: "/images/abhishek.png",
  Havan: "/images/havan.png",
  Bhog: "/images/bhog.png",
  Aarti: "/images/aarti.png",
  "Deep Daan": "/images/deep-daan.png",
  "Shayan Seva": "/images/shayan-seva.png",
  Archana: "/images/archana.png",
  Other: "/images/other.png",
};
export default function SevaTypeSelector() {
  const dispatch = useAppDispatch();

  const { sevaTypes, selectedSevaType } = useAppSelector(
    (state) => state.sevaPage,
  );

  useEffect(() => {
    dispatch(fetchSevaTypes());
  }, [dispatch]);

  console.log("Seva Types:", sevaTypes);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative min-h-[230px] overflow-hidden rounded-[22px] border-[3px] border-[#C37000] bg-[#EFDEC7]/20 p-6 shadow-[0_12px_35px_rgba(126,83,26,0.10)]"
      style={{ marginTop: "20px" }}
    >
      <div className="relative">
        {/* Header */}
        <div
          className="mb-7 flex items-center gap-3"
          style={{ marginLeft: "30px", marginTop: "10px" }}
        >
          <HandHelping className="h-7 w-7 text-[#D18418]" strokeWidth={2} />

          <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
            Choose Seva Type
          </h2>
        </div>

        {/* Cards */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth pb-2"
            style={{
              marginLeft: "80px",
              marginRight: "80px",
              marginTop: "20px",
            }}
          >
            {sevaTypes.map((item) => (
              <button
                key={item.name}
                onClick={() =>
                  dispatch(
                    setSelectedSevaType(
                      selectedSevaType === item.name ? null : item.name,
                    ),
                  )
                }
                className={`group flex min-h-[130px] min-w-[130px] flex-col items-center rounded-[16px] p-4 transition-all duration-300 ${
                  selectedSevaType === item.name
                    ? "border-[4px] border-[#0F5C66] bg-[#C37000]/10"
                    : "border border-[#C37000] bg-[#EFDEC7]/20"
                }`}
              >
                <div
                  className="relative h-[60px] w-[60px]"
                  style={{ marginTop: "15px", marginBottom: "10px" }}
                >
                  <Image
                    src={sevaTypeImages[item.name] ?? "/images/other.png"}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <span className="font-cormorant mt-4 text-[20px] font-medium text-[#46392E]">
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C37000] bg-[#C37000]/20"
            style={{ marginLeft: "40px" }}
          >
            <ChevronLeft className="text-[#0F5C66]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C37000] bg-[#C37000]/20"
            style={{ marginRight: "50px" }}
          >
            <ChevronRight className="text-[#0F5C66]" />
          </button>
        </div>
      </div>
    </section>
  );
}
