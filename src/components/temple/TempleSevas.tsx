"use client";

import Image from "next/image";
import { Clock3, ChevronRight, ChevronLeft } from "lucide-react";

import { useEffect, useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };
  return (
    <section className="relative overflow-hidden rounded-[22px] border border-[#D89A3D] bg-[#FBF6EE] p-4">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
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
        <div className="relative" style={{ marginBottom: "20px" }}>
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth pb-2"
          >
            {sevas.map((seva) => (
              <div
                key={seva.id}
                className="group relative min-w-[195px] overflow-hidden rounded-[18px] border border-[#D9B06C] bg-[#FFFDF8] shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1"
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
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="min-h-[28px] flex-1 text-[14px] leading-[1.2] font-medium text-[#24535D]">
                        {seva.name}
                      </h3>

                      <span className="shrink-0 text-[13px] font-bold text-[#D18400]">
                        ₹{seva.price}
                      </span>
                    </div>

                    {/* <div className="flex items-center gap-1 text-[10px] text-[#6A6259]">
                      <Clock3 size={10} />
                      <span>{seva.time}</span>
                    </div> */}
                  </div>

                  {seva.allow_direct_payment ? (
                    <Link
                      href={`/temples/${templeSlug}/sevas/${seva.id}`}
                      className="mt-2 flex h-[28px] w-full items-center justify-center rounded-[8px] bg-[#0B6670] text-[11px] font-medium !text-white hover:bg-[#09545b] hover:!text-white"
                    >
                      Book Seva
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="mt-2 h-[28px] w-full rounded-[8px] bg-gray-300 text-[11px] font-medium text-gray-600"
                    >
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Button */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105"
            style={{ marginLeft: "12px" }}
          >
            <ChevronLeft size={18} className="text-[#A06A15]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:scale-105"
            style={{ marginRight: "12px" }}
          >
            <ChevronRight size={18} className="text-[#A06A15]" />
          </button>
        </div>
      </div>
    </section>
  );
}
