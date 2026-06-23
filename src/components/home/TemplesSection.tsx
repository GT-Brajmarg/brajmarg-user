"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemples } from "@/store/slices/templesSlice";
import styles from "./TemplesSection.module.css";

export default function TemplesSection() {
  const dispatch = useAppDispatch();

  const { temples, loading, error } = useAppSelector((state) => state.temples);

  useEffect(() => {
    dispatch(fetchTemples());
  }, [dispatch]);

  if (loading) {
    return <div>Loading temples...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  // console.log("Temples State:", temples);
  // console.log("Loading:", loading);
  // console.log("Error:", error);
  return (
    <section className="relative mt-16 bg-[#F8F2E8] pt-8 pb-20 md:mt-32 md:pt-12 md:pb-32">
      {/* Background Mandala */}
      <div className="relative min-h-[120px] pb-[80px] md:min-h-[150px] md:pb-[60px]">
        {/* Centered Title */}
        <div className="flex translate-y-4 flex-col items-center px-4 text-center md:translate-y-10">
          <div className="flex items-center">
            <Image
              src="/images/lotus.png"
              alt=""
              width={44}
              height={44}
              className="h-6 w-6 md:h-11 md:w-11"
            />

            <h2 className="font-cormorant text-[22px] leading-tight font-semibold text-[#0C6D72] sm:text-[26px] md:text-[38px]">
              Explore Sacred Temples
            </h2>

            <Image
              src="/images/lotus.png"
              alt=""
              width={44}
              height={44}
              className="h-6 w-6 md:h-11 md:w-11"
            />
          </div>

          <p className="font-cormorant mt-2 px-4 text-center text-[16px] text-[#6C5E4B] md:text-[20px]">
            Search and discover temples across India
          </p>
        </div>

        {/* Independent Button */}
        {/* Desktop Button */}
        <div className="absolute top-1/2 right-[80px] hidden -translate-y-1/2 md:block">
          <Link
            href="/temples"
            className="flex h-[47px] w-[212px] items-center justify-center rounded-[14px] border-2 border-[#0C6D72]"
          >
            <span className="font-cormorant text-[#0F5C66]">
              View All Temples →
            </span>
          </Link>
        </div>
      </div>

      {/* ── Temple Cards Grid ── */}
      <div className="-mt-[80px] flex justify-center">
        <div className="grid grid-cols-1 gap-y-15 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {temples.map((temple) => (
            <div
              key={temple.id}
              className={`relative mx-auto h-[420px] w-[290px] transition-all duration-300 hover:-translate-y-2 ${
                temple.is_coming_soon ? "opacity-40 grayscale-[20%]" : ""
              }`}
              // className="relative mx-auto h-[420px] w-[290px]"
              // style={{
              //   border: "4px solid red",
              //   zIndex: 9999,
              // }}
            >
              {/* ── Scroll Frame Overlay wrapping the entire card ── */}
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

              {/* ── Card Inner Content ── */}
              <div className="relative z-10 h-full w-full overflow-visible">
                {/* Image Area with Arch mask */}
                {/* Badge */}
                <span
                  className={`absolute top-[90px] z-50 inline-flex h-[30px] items-center rounded-full px-[20px] text-[12px] font-bold text-white shadow-sm ${
                    temple.is_coming_soon
                      ? "w-[95px] bg-[#D8A24A]"
                      : "w-[42px] bg-[#15A44D]"
                  }`}
                  style={{ marginLeft: "60px" }}
                >
                  {!temple.is_coming_soon && (
                    <span className="mr-[6px] h-[8px] w-[8px] rounded-full bg-white" />
                  )}

                  {temple.is_coming_soon ? "COMING SOON" : "LIVE"}
                </span>

                <div
                  className="s absolute left-1/2 h-[180px] w-[200px] -translate-x-1/2"
                  style={{ top: "40px" }}
                >
                  <div className="relative h-full w-full">
                    <div className="absolute top-[-45px] left-1/2 h-[280px] w-[280px] -translate-x-1/2">
                      {/* Temple Image */}
                      <div className="absolute top-[48px] left-[62px] z-10 h-[170px] w-[155px] overflow-hidden rounded-t-[999px]">
                        <Image
                          src={temple.image_url || ""}
                          alt={temple.name}
                          fill
                          className="object-cover object-center"
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

                {/* Card Body text and CTA */}
                <div className="relative z-30">
                  <h3
                    className="font-cormorant absolute left-1/2 w-[90%] -translate-x-1/2 text-center text-[16px] font-semibold text-[#0D5560]"
                    style={{ top: "275px" }}
                  >
                    {temple.name}
                  </h3>

                  <div
                    className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1"
                    style={{ top: "300px" }}
                  >
                    <svg
                      className="h-3.5 w-3.5 flex-shrink-0 text-[#c8860a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      style={{
                        width: "12px",
                        height: "12px",
                        color: "#c8860a",
                      }}
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
                    <span className="font-cormorant text-[12px] font-medium text-[#7A6A55]">
                      {temple.location}
                    </span>
                  </div>

                  <Link
                    href={`/temples/${temple.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]/g, "")}`}
                    className="font-cormorant absolute left-1/2 flex h-[26px] w-[125px] -translate-x-1/2 items-center justify-center rounded-full border border-[#D7B36A] bg-[#2B8182] text-[18px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all hover:bg-[#236f70]"
                    style={{ top: "322px" }}
                  >
                    {/* Left ornament */}
                    <span className="absolute -left-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                    {/* Inner border */}
                    <span className="pointer-events-none absolute inset-[2px] rounded-full border border-[#E8D4A3]" />
                    Visit Temple
                    {/* Right ornament */}
                    <span className="absolute -right-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
