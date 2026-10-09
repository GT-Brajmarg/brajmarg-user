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
    <section className="relative overflow-hidden bg-[#F8F2E8] pt-8 pb-20 md:pt-12 md:pb-32">
      {/* lite-lotus-bg full section background */}
      <div className="pointer-events-none absolute top-[-60px] inset-0 z-0 overflow-hidden">
        <Image
          src="/images/lite-lotus-bg.png"
          alt=""
          // fill
          width={1500}
          height={100}
          className="object-cover opacity-60"
        />
      </div>
      <div className="relative z-10">
        {/* Background Mandala */}
        <div className={`${styles.sectionHeading} relative z-20`}>
          {/* Centered Title */}
          <div className={`${styles.headingContent} flex flex-col items-center px-4 text-center`}>
            <div className="flex items-center gap-2">
              <Image src="/images/lotus.png" alt="" width={54} height={36} />

              <h2 className="font-cormorant text-[20px] leading-tight font-semibold text-[#0C6D72] sm:text-[26px] md:text-[34px]">
                Explore Sacred Temples
              </h2>

              <Image src="/images/lotus.png" alt="" width={54} height={36} />
            </div>

            <p className="font-cormorant mt-2 px-4 text-center text-[14px] text-[#3D352F] md:text-[18px]">
              Search and discover temples across India
            </p>
          </div>

          {/* Independent Button */}
          {/* Desktop & Tablet Button */}
          <div className={styles.viewAll}>
            <Link
              href="/temples"
              className="flex h-[47px] w-[212px] items-center justify-center gap-2 rounded-[14px] border-2 border-[#0C6D72]"
            >
              <span className="font-cormorant text-[#0F5C66] font-medium text-[16px]">
                View All Temples
              </span>
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M1 7H19M13 1L19 7L13 13"
                  stroke="#0F5C66"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Temple Cards Grid ── */}
        <div className={styles.cardsViewport}>
          <div className={styles.cardsGrid}>
            {temples.map((temple) => (
              <div
                key={temple.id}
                className={`relative mx-auto -mb-4 h-[420px] w-[260px] transition-all duration-300 hover:-translate-y-2 ${temple.is_coming_soon ? "opacity-65 grayscale-[20%]" : ""
                  }`}
                // className="relative mx-auto h-[420px] w-[290px]"
                // style={{
                //   border: "4px solid red",
                //   zIndex: 9999,
                // }}
                style={{ marginBottom: "0px" }}
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
                  {/* Badge */}
                  {temple.is_coming_soon ? (
                    <span className="absolute top-[68px] left-[188px] z-30 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-[#D8A24A] px-3 py-[3px] text-[10px] font-bold tracking-wider text-white shadow-sm whitespace-nowrap">
                      COMING SOON
                    </span>
                  ) : (
                    <span className="absolute top-[69px] left-[35px] z-30 inline-flex items-center gap-1.5 rounded-full bg-[#15A44D] px-2.5 py-[3px] text-[11px] font-bold tracking-wider text-white shadow-sm whitespace-nowrap">
                      <span className="h-[7px] w-[7px] flex-shrink-0 rounded-full bg-white" />
                      <span>LIVE</span>
                    </span>
                  )}

                  <div
                    className="s absolute left-1/2 h-[180px] w-[200px] -translate-x-1/2"
                    style={{ top: "40px" }}
                  >
                    <div className="relative h-full w-full">
                      <div className="absolute top-[-25px] left-1/2 h-[280px] w-[280px] -translate-x-1/2">
                        {/* Temple Image */}
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
                            unoptimized
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

                  {/* Card Body text and CTA */}
                  <div className="relative z-30">
                    <h3
                      className="font-cormorant absolute left-1/2 w-[90%] -translate-x-1/2 text-center text-[16px] font-semibold text-[#0D5560]"
                      style={{ top: "255px" }}
                    >
                      {temple.name}
                    </h3>

                    <div
                      className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1"
                      style={{ top: "285px" }}
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
                      <span className="font-cormorant block max-w-[140px] truncate text-[12px] text-[#7A6A55]">
                        {temple.location}
                      </span>
                    </div>

                    {temple.is_coming_soon ? (
                      <button
                        disabled
                        className="font-cormorant absolute left-1/2 flex h-[26px] w-[125px] -translate-x-1/2 cursor-not-allowed items-center justify-center rounded-full border border-[#D7B36A] bg-gray-400 text-[18px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                        style={{ top: "315px" }}
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
                        className="font-cormorant absolute left-1/2 flex h-[26px] w-[125px] -translate-x-1/2 items-center justify-center rounded-full border border-[#D7B36A] bg-[#2B8182]/80 text-[18px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all hover:bg-[#236f70]"
                        style={{ top: "315px", color: "#EFDEC7" }}
                      >
                        <span className="absolute -left-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                        <span
                          className="pointer-events-none absolute inset-[2px] rounded-full border border-[#E8D4A3] text-[#EFDEC7]"
                          style={{ color: "#EFDEC7" }}
                        />
                        Visit Temple
                        <span className="absolute -right-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-2">
            {temples.slice(0, 4).map((temple) => (
              <div
                key={temple.id}
                className={`relative h-[360px] w-[220px] ${temple.is_coming_soon ? "opacity-65" : ""
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
                  className={`absolute top-[65px] left-[25px] z-50 inline-flex h-[26px] items-center rounded-full px-3 text-[10px] font-bold text-white ${temple.is_coming_soon ? "bg-[#D8A24A]" : "bg-[#15A44D]"
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
                          unoptimized
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
          <div className="mt-8 flex justify-center">
            <Link
              href="/temples"
              className="font-cormorant flex h-[42px] w-[180px] items-center justify-center gap-2 rounded-[12px] border-2 border-[#0C6D72] text-[16px] font-semibold text-[#0C6D72]"
              style={{ marginBottom: "40px", marginTop: "20px" }}
            >
              <span>View All Temples</span>
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M1 7H19M13 1L19 7L13 13"
                  stroke="#0C6D72"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
