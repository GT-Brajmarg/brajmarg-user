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
      className="relative min-h-[190px] md:min-h-[230px] overflow-hidden rounded-[18px] sm:rounded-[20px] md:rounded-[22px] border-[2px] md:border-[3px] border-[#C37000] bg-[#EFDEC7]/20 p-3.5 sm:p-5 md:p-6 shadow-[0_12px_35px_rgba(126,83,26,0.10)]"
      style={{ marginTop: "20px" }}
    >
      <div className="relative">
        {/* Header */}
        <div
          className="mb-4 sm:mb-5 md:mb-7 flex items-center gap-2 sm:gap-2.5 md:gap-3 md:ml-[30px] md:mt-[10px]"
        >
          <HandHelping className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#D18418] shrink-0" strokeWidth={2} />

          <h2 className="font-cormorant text-[18px] sm:text-[22px] md:text-[28px] font-semibold text-[#0B6670] whitespace-nowrap">
            Choose Seva Type
          </h2>
        </div>

        {/* Cards */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-2.5 sm:gap-3.5 md:gap-5 overflow-x-auto scroll-smooth pb-2 mx-7 sm:mx-9 md:mx-0 md:ml-[80px] md:mr-[80px] md:mt-[20px]"
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
                className={`group flex min-h-[105px] min-w-[100px] sm:min-w-[115px] md:min-w-[130px] md:min-h-[130px] shrink-0 flex-col items-center rounded-[14px] md:rounded-[16px] p-2.5 sm:p-3 md:p-4 transition-all duration-300 ${selectedSevaType === item.name
                  ? "border-[3px] md:border-[4px] border-[#0F5C66] bg-[#C37000]/10"
                  : "border border-[#C37000] bg-[#EFDEC7]/20"
                  }`}
              >
                <div
                  className="relative h-[44px] w-[44px] sm:h-[52px] sm:w-[52px] md:h-[60px] md:w-[60px] mt-1 sm:mt-2 md:mt-[15px] mb-1 sm:mb-2 md:mb-[10px]"
                >
                  <Image
                    src={sevaTypeImages[item.name] ?? "/images/other.png"}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <span className="font-cormorant mt-1.5 sm:mt-2 md:mt-4 text-[15px] sm:text-[17px] md:text-[20px] font-medium text-[#46392E]">
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 z-10 flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#C37000] bg-[#F7F0E5] md:bg-[#C37000]/20 shadow-sm md:shadow-none md:left-0 md:ml-[40px] md:-translate-x-1/2 transition-colors hover:bg-[#F3DFC2]"
            aria-label="Previous seva type"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-[#0F5C66]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 z-10 flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#C37000] bg-[#F7F0E5] md:bg-[#C37000]/20 shadow-sm md:shadow-none md:right-0 md:mr-[50px] md:translate-x-1/2 transition-colors hover:bg-[#F3DFC2]"
            aria-label="Next seva type"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#0F5C66]" />
          </button>
        </div>
      </div>
    </section>
  );
}
