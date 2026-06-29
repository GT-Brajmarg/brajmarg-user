"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemples } from "@/store/slices/templesSlice";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { styleText } from "util";

interface RelatedTemplesProps {
  currentTempleId: string;
}

export default function RelatedTemples({
  currentTempleId,
}: RelatedTemplesProps) {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { temples, loading, error } = useAppSelector((state) => state.temples);

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
  useEffect(() => {
    dispatch(fetchTemples());
  }, [dispatch]);
  //   console.log("Current Temple ID:", currentTempleId);
  //   console.log("All Temples:", temples);

  //   console.log(
  //     temples.map((t) => ({
  //       name: t.name,
  //       is_coming_soon: t.is_coming_soon,
  //       type: typeof t.is_coming_soon,
  //     })),
  //   );

  const relatedTemples = temples
    .filter((temple) => temple.id !== currentTempleId)
    .slice(0, 4);

  //   console.log("Related Temples:", relatedTemples);
  //   console.log("Related Temples:", relatedTemples);

  if (loading) {
    return <div>Loading related temples...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!relatedTemples.length) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="mb-8 flex items-center justify-center gap-3">
        <Image src="/images/lotus.png" alt="" width={42} height={42} />

        <h2 className="font-cormorant text-[38px] font-semibold text-[#0B6670]">
          You May Also Like
        </h2>

        <Image src="/images/lotus.png" alt="" width={42} height={42} />
      </div>
      <div className="lg:hidden">
        <div ref={scrollRef} className="flex flex-col items-center gap-2">
          {relatedTemples.map((temple) => (
            <div
              key={temple.id}
              className={`relative h-[360px] w-[220px] ${
                temple.is_coming_soon ? "opacity-50" : ""
              }`}
            >
              {/* Scroll Frame */}
              <div className="absolute inset-0">
                <Image
                  src="/images2/image 45.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Badge */}
              <span
                className={`absolute top-[65px] left-[25px] z-50 inline-flex h-[26px] items-center rounded-full px-3 text-[10px] font-bold text-white ${
                  temple.is_coming_soon ? "bg-[#D8A24A]" : "bg-[#15A44D]"
                }`}
              >
                {!temple.is_coming_soon && (
                  <span className="mr-1 h-[6px] w-[6px] rounded-full bg-white" />
                )}
                {temple.is_coming_soon ? "COMING SOON" : "LIVE"}
              </span>

              {/* Temple Image */}
              <div
                className="absolute left-1/2 h-[145px] w-[165px] -translate-x-1/2"
                style={{ top: "35px" }}
              >
                <div className="relative h-full w-full">
                  <div className="absolute top-[-20px] left-1/2 h-[225px] w-[225px] -translate-x-1/2">
                    {/* Temple Image */}
                    <div
                      className="absolute top-[47px] left-1/2 z-10 h-[132px] w-[124px] -translate-x-1/2 overflow-hidden rounded-t-[64px]"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 85% 18%, 100% 42%, 100% 100%, 0% 100%, 0% 42%, 15% 18%)",
                      }}
                    >
                      <Image
                        src={temple.image_url || ""}
                        alt={temple.name}
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: "center center",
                          transform: "scale(1)",
                        }}
                      />
                    </div>

                    {/* Gold Frame */}
                    <Image
                      src="/images2/temple-arch-frame.png"
                      alt=""
                      fill
                      className="pointer-events-none absolute inset-0 z-20 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Temple Name */}
              <h3
                className="font-cormorant absolute top-[220px] left-1/2 w-[85%] -translate-x-1/2 text-center text-[15px] font-semibold text-[#0D5560]"
                style={{ marginTop: "-10px" }}
              >
                {temple.name}
              </h3>

              {/* Location */}
              <div
                className="absolute top-[255px] left-1/2 flex -translate-x-1/2 items-center gap-1"
                style={{ marginTop: "-12px" }}
              >
                <svg
                  className="h-3 w-3 text-[#C8860A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <span className="font-cormorant block max-w-[140px] truncate text-[11px] text-[#7A6A55]">
                  {temple.location}
                </span>
              </div>

              {/* Button */}
              {temple.is_coming_soon ? (
                <button
                  disabled
                  className="font-cormorant absolute top-[285px] left-1/2 flex h-[24px] w-[110px] -translate-x-1/2 cursor-not-allowed items-center justify-center rounded-full border border-[#D7B36A] bg-gray-400 text-[15px] font-semibold text-white"
                  style={{ marginTop: "-11px" }}
                >
                  Coming Soon
                </button>
              ) : (
                <Link
                  href={`/temples/${temple.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "")}`}
                  className="font-cormorant absolute top-[285px] left-1/2 flex h-[24px] w-[110px] -translate-x-1/2 items-center justify-center rounded-full border border-[#D7B36A] bg-[#2B8182] text-[15px] font-semibold text-white"
                  style={{ marginTop: "-11px" }}
                >
                  Visit Temple
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="relative">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-8 overflow-x-auto scroll-smooth px-2"
          >
            {relatedTemples.map((temple) => (
              <div
                key={temple.id}
                className={`relative mx-auto h-[420px] w-[260px] transition-all duration-300 hover:-translate-y-2 ${
                  temple.is_coming_soon ? "opacity-40 grayscale-[20%]" : ""
                }`}
                style={{ marginLeft: "15px" }}
              >
                {/* Scroll Frame */}
                <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                  <div className="relative h-[420px] w-[260px]">
                    <Image
                      src="/images2/image 45.png"
                      alt=""
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Badge */}
                <span
                  className={`absolute top-[75px] left-[30px] z-50 inline-flex h-[30px] items-center rounded-full px-[20px] text-[12px] font-bold text-white shadow-sm ${
                    temple.is_coming_soon
                      ? "w-[95px] bg-[#D8A24A]"
                      : "w-[42px] bg-[#15A44D]"
                  }`}
                >
                  {!temple.is_coming_soon && (
                    <span className="mr-[6px] h-[8px] w-[8px] rounded-full bg-white" />
                  )}
                  {temple.is_coming_soon ? "COMING SOON" : "LIVE"}
                </span>

                {/* Temple Image */}
                <div className="absolute top-[40px] left-1/2 h-[180px] w-[200px] -translate-x-1/2">
                  <div className="relative h-full w-full">
                    <div className="absolute top-[-25px] left-1/2 h-[280px] w-[280px] -translate-x-1/2">
                      <div
                        className="absolute top-[58px] left-1/2 z-10 h-[165px] w-[155px] -translate-x-1/2 overflow-hidden rounded-t-[80px]"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 85% 18%, 100% 42%, 100% 100%, 0% 100%, 0% 42%, 15% 18%)",
                        }}
                      >
                        <Image
                          src={temple.image_url || ""}
                          alt={temple.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <Image
                        src="/images2/temple-arch-frame.png"
                        alt=""
                        fill
                        className="pointer-events-none absolute inset-0 z-20 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-cormorant absolute top-[255px] left-1/2 w-[90%] -translate-x-1/2 text-center text-[16px] font-semibold text-[#0D5560]">
                  {temple.name}
                </h3>

                {/* Location */}
                <div className="absolute top-[285px] left-1/2 flex -translate-x-1/2 items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c8860a"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>

                  <span className="font-cormorant block max-w-[140px] truncate text-[12px] text-[#7A6A55]">
                    {temple.location}
                  </span>
                </div>

                {/* Button */}
                {temple.is_coming_soon ? (
                  <button
                    disabled
                    className="font-cormorant absolute top-[315px] left-1/2 flex h-[26px] w-[125px] -translate-x-1/2 cursor-not-allowed items-center justify-center rounded-full border border-[#D7B36A] bg-gray-400 text-[18px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                  >
                    <span className="absolute -left-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                    <span className="pointer-events-none absolute inset-[2px] rounded-full border border-[#E8D4A3]" />
                    Coming Soon
                    <span className="absolute -right-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                  </button>
                ) : (
                  <Link
                    href={`/temples/${temple.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]/g, "")}`}
                    className="font-cormorant absolute top-[315px] left-1/2 flex h-[26px] w-[125px] -translate-x-1/2 items-center justify-center rounded-full border border-[#D7B36A] bg-[#2B8182] text-[18px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all hover:bg-[#236f70]"
                  >
                    <span className="absolute -left-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                    <span className="pointer-events-none absolute inset-[2px] rounded-full border border-[#E8D4A3]" />
                    Visit Temple
                    <span className="absolute -right-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-[-18px] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105"
          >
            <ChevronLeft size={20} className="text-[#A06A15]" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-[-18px] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105"
          >
            <ChevronRight size={20} className="text-[#A06A15]" />
          </button>
        </div>
      </div>
    </section>
  );
}
