"use client";

import Image from "next/image";
import { Clock3, ChevronRight, ChevronLeft } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTempleSevas } from "@/store/slices/sevaSlice";
import Link from "next/link";

interface TempleSevasProps {
  templeId: string;

  templeSlug: string;
}

export default function TempleSevas({
  templeId,
  templeSlug,
}: TempleSevasProps) {
  const dispatch = useAppDispatch();

  const { sevas, loading } = useAppSelector((state) => state.sevas);

  useEffect(() => {
    if (templeId) {
      dispatch(fetchTempleSevas(templeId));
    }
  }, [dispatch, templeId]);
  // const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="relative z-20 -translate-y-4 overflow-hidden rounded-[22px] border-[2px] border-[#C37000] bg-transparent p-4 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        // style={{
        //   backgroundImage:
        //     "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
        //   backgroundSize: "22px 22px",
        // }}
      />

      <div className="relative">
        {/* Header */}
        <div className="my-4 flex flex-col items-center justify-center text-center md:flex-row md:gap-3">
          <div
            className="flex items-center justify-center gap-2"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            <Image src="/images/lotus.png" alt="" width={40} height={40} />

            <h2 className="font-cormorant text-[24px] leading-tight font-semibold text-[#0B6670] md:text-[28px]">
              Seva at <br className="md:hidden" />
              ShreenathJi Temple
            </h2>

            <Image src="/images/lotus.png" alt="" width={30} height={30} />
          </div>
        </div>

        {/* Cards */}
        <div
          className="relative"
          style={{
            marginBottom: "20px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <div

          // className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth pb-2"
          // style={{ marginLeft: "-20px" }}
          >
            <div
              className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth pb-2"
              style={{ marginLeft: "40px", marginRight: "40px" }}
            >
              {visibleSevas.map((seva) => (
                <div
                  key={seva.id}
                  className="group relative min-w-[195px] overflow-hidden rounded-[18px] border border-[#C37000] bg-transparent shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Decorative Pattern */}
                  <div
                    className="absolute right-0 bottom-0 left-0 h-[45px] opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
                      backgroundSize: "12px 12px",
                    }}
                  />

                  {/* Image */}
                  <div className="relative h-[105px] overflow-hidden">
                    <Image
                      src={seva.image_url || "/images2/default.png"}
                      alt={seva.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Seva Icon */}
                    {/* <div className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md">
                    🪔
                  </div> */}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-2.5">
                    <div className="flex h-[78px] flex-col justify-between">
                      <div
                        className="flex items-start justify-between gap-2"
                        style={{ marginTop: "15px" }}
                      >
                        <h3 className="min-h-[28px] flex-1 text-[14px] leading-[1.2] font-medium text-[#24535D]">
                          {seva.name}
                        </h3>
                        <div className="border-l border-[#C37000]/60">
                          <span
                            className="shrink-0 text-[15px] font-bold text-[#D18400]"
                            style={{ marginLeft: "10px", marginRight: "5px" }}
                          >
                            ₹{seva.price}
                          </span>
                        </div>
                      </div>

                      {/* <div className="flex items-center gap-1 text-[10px] text-[#6A6259]">
                      <Clock3 size={10} />
                      <span>{seva.time}</span>
                    </div> */}
                    </div>

                    {seva.allow_direct_payment ? (
                      <Link
                        href={`/temples/${templeSlug}/sevas/${seva.id}`}
                        className="font-cormorant mt-2 flex h-[28px] w-full items-center justify-center rounded-[8px] bg-[#0B6670] text-[15px] font-medium !text-[#EFDEC7] hover:bg-[#09545b] hover:!text-[#EFDEC7]"
                      >
                        Book Seva
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="font-cormorant mt-2 h-[28px] w-full rounded-[8px] bg-gray-300 text-[15px] font-medium text-[#EFDEC7]"
                      >
                        Unavailable
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute top-1/2 left-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105"
            style={{ marginLeft: "6px" }}
          >
            <ChevronLeft size={18} className="text-[#0F5C66]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= sevas.length - visibleCount}
            className="absolute top-1/2 right-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105"
            style={{ marginRight: "6px" }}
          >
            <ChevronRight size={18} className="text-[#0F5C66]" />
          </button>
        </div>
      </div>
    </section>
  );
}
