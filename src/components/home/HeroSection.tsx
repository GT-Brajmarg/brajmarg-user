"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { tickCountdown, fetchLiveDarshan } from "@/store/slices/heroSlice";
import { Calendar, HandHelping } from "lucide-react";

export default function HeroSection() {
  const dispatch = useAppDispatch();
  const { darshan, loading } = useAppSelector((state) => state.hero);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tickCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (
      darshan.hours === 0 &&
      darshan.minutes === 0 &&
      darshan.seconds === 0 &&
      darshan.label
    ) {
      const timer = setTimeout(() => {
        dispatch(fetchLiveDarshan());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    darshan.hours,
    darshan.minutes,
    darshan.seconds,
    darshan.label,
    dispatch,
  ]);

  const pad = (n: number) => String(n).padStart(2, "0");

  if (loading) return null;

  return (
    <section className="relative min-h-0 overflow-hidden pb-12 xl:h-[720px] xl:min-h-0 xl:pb-0">
      {/* Background */}
      <Image
        src="/images2/image 53.png"
        alt="Temple"
        fill
        priority
        className="object-cover"
      />

      {/* Golden Overlay */}
      <div
        style={{ paddingLeft: "16px", paddingRight: "16px", width: "100%", boxSizing: "border-box" }}
        className="relative z-10 w-full md:px-8"
      >
        {/* Mobile + Tablet Layout */}
        <div
          style={{ width: "100%", boxSizing: "border-box", paddingTop: "84px", paddingBottom: "48px" }}
          className="flex flex-col items-center xl:hidden"
        >
          {/* Hero Heading & CTAs */}
          <div className="w-full max-w-[480px] text-center -mt-6">
            <h1
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              className="text-[34px] sm:text-[46px] leading-[1.12] font-bold text-[#2E241D]"
            >
              Stay Connected to
              <br />
              Your Temple,
              <br />
              <span className="text-[#0B7285]">Wherever You Are.</span>
            </h1>

            <p
              style={{ fontFamily: "var(--font-cormorant), serif", marginTop: "12px", marginBottom: "16px" }}
              className="mx-auto max-w-[360px] text-[15px] sm:text-[17px] leading-[1.45] text-[#4A3F35]"
            >
              Receive temple prasad, book yatra services, participate in seva and stay connected with live temple updates.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                width: "100%",
                maxWidth: "320px",
                margin: "0 auto 24px auto",
              }}
            >
              <Link
                href="/shop"
                style={{
                  color: "#EFDEC7",
                  fontFamily: "var(--font-cormorant), serif",
                  backgroundColor: "#005D63",
                  boxShadow: "0 3px 12px rgba(0,93,99,0.25)",
                  flex: 1,
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  borderRadius: "10px",
                  fontSize: "17px",
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <span>Browse Shop</span>
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M1 7H19M13 1L19 7L13 13"
                    stroke="#EFDEC7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/yatra"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--font-cormorant), serif",
                  backgroundColor: "#C77B00",
                  boxShadow: "0 3px 12px rgba(199,123,0,0.25)",
                  flex: 1,
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  fontSize: "17px",
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Book Yatra
              </Link>
            </div>
          </div>

          {/* Live Darshan Card (Mobile Responsive Flex Layout) */}
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              boxSizing: "border-box",
            }}
          >
            <div
              data-testid="darshan-card"
              style={{
                width: "100%",
                borderRadius: "22px",
                backgroundColor: "#EFDEC7",
                border: "1px solid #D9C4AA",
                boxShadow: "0 10px 30px rgba(78, 56, 32, 0.14)",
                padding: "18px 18px 20px 18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxSizing: "border-box",
              }}
            >
              {/* Card Header: Live Darshan Update + LIVE Badge */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#C77700",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontFamily: "var(--font-cormorant), serif",
                  }}
                >
                  LIVE DARSHAN UPDATE
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    borderRadius: "999px",
                    border: "1.5px solid #005D63",
                    padding: "2px 9px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#005D63",
                    backgroundColor: "rgba(0,93,99,0.06)",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#005D63",
                    }}
                  />
                  LIVE
                </div>
              </div>

              {/* Lotus Icon */}
              <div style={{ marginTop: "4px", marginBottom: "6px" }}>
                <Image
                  src="/images/lotus.png"
                  alt="lotus"
                  width={46}
                  height={46}
                />
              </div>

              {/* Next Darshan Decorative Line */}
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <div style={{ height: "1px", flex: 1, backgroundColor: "#D1A455" }} />
                <span
                  style={{
                    fontSize: "15px",
                    color: "#5E4E3F",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-cormorant), serif",
                  }}
                >
                  Next Darshan
                </span>
                <div style={{ height: "1px", flex: 1, backgroundColor: "#D1A455" }} />
              </div>

              {/* Temple Name & Location */}
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#005D63",
                  textAlign: "center",
                  margin: "0 0 2px 0",
                  fontFamily: "var(--font-cormorant), serif",
                  lineHeight: 1.15,
                }}
              >
                {darshan.templeName}
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "#5E4E3F",
                  textAlign: "center",
                  margin: "0 0 12px 0",
                  fontFamily: "var(--font-cormorant), serif",
                }}
              >
                {darshan.location}
              </p>

              {/* Aarti Sub-banner */}
              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid #D4BC99",
                  borderBottom: "1px solid #D4BC99",
                  padding: "6px 0",
                  textAlign: "center",
                  marginBottom: "12px",
                  backgroundColor: "rgba(212, 188, 153, 0.2)",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#443B33",
                    margin: 0,
                    fontFamily: "var(--font-cormorant), serif",
                  }}
                >
                  {darshan.label}
                </p>
              </div>

              {/* Countdown Timer */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  marginBottom: "12px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    className="font-cormorant-infant"
                    style={{
                      fontSize: "40px",
                      lineHeight: 1,
                      color: "#005D63",
                      fontWeight: 700,
                    }}
                  >
                    {pad(darshan.hours)}
                  </div>
                  <div style={{ fontSize: "10px", color: "#7C7063", fontWeight: 700, letterSpacing: "0.06em", marginTop: "3px" }}>
                    HOURS
                  </div>
                </div>

                <div
                  className="font-cormorant-infant"
                  style={{ fontSize: "32px", color: "#005D63", fontWeight: 700, paddingBottom: "10px" }}
                >
                  :
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    className="font-cormorant-infant"
                    style={{
                      fontSize: "40px",
                      lineHeight: 1,
                      color: "#005D63",
                      fontWeight: 700,
                    }}
                  >
                    {pad(darshan.minutes)}
                  </div>
                  <div style={{ fontSize: "10px", color: "#7C7063", fontWeight: 700, letterSpacing: "0.06em", marginTop: "3px" }}>
                    MINUTES
                  </div>
                </div>

                <div
                  className="font-cormorant-infant"
                  style={{ fontSize: "32px", color: "#005D63", fontWeight: 700, paddingBottom: "10px" }}
                >
                  :
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    className="font-cormorant-infant"
                    style={{
                      fontSize: "40px",
                      lineHeight: 1,
                      color: "#005D63",
                      fontWeight: 700,
                    }}
                  >
                    {pad(darshan.seconds)}
                  </div>
                  <div style={{ fontSize: "10px", color: "#7C7063", fontWeight: 700, letterSpacing: "0.06em", marginTop: "3px" }}>
                    SECONDS
                  </div>
                </div>
              </div>

              {/* Info Bar: Darshan Type & Today */}
              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid #D4BC99",
                  paddingTop: "10px",
                  marginBottom: "14px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1px 1fr",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#D1A455",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <HandHelping size={14} color="#2E241D" />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "10px", color: "#7C7063", margin: 0 }}>Darshan Type</p>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#3D352F", margin: 0 }}>
                      {darshan.label.split("/").pop()?.replace(/\s*Begins In$/, "").trim()}
                    </p>
                  </div>
                </div>

                <div style={{ height: "30px", width: "1px", backgroundColor: "rgba(212,154,42,0.4)" }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#D1A455",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Calendar size={14} color="#2E241D" />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "10px", color: "#7C7063", margin: 0 }}>Today</p>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#3D352F", margin: 0 }}>
                      {darshan.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* View All Button */}
              <Link
                href="/darshan"
                style={{
                  width: "100%",
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "#005D63",
                  color: "#EFDEC7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(0,93,99,0.25)",
                  fontFamily: "var(--font-cormorant), serif",
                }}
              >
                <span>View All Darshan Timings</span>
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M1 7H19M13 1L19 7L13 13"
                    stroke="#EFDEC7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden h-[700px] items-center justify-center gap-70 xl:flex">
          <div
            data-testid="left-content"
            // className="absolute top-[80px] left-1/2 z-20 flex w-[90%] max-w-[470px] -translate-x-1/2 flex-col gap-7 md:top-[90px] md:w-[470px] xl:top-[100px] xl:left-[130px] xl:w-[470px] xl:translate-x-0"
            className="w-[535px] -mt-20 "
          >
            <h1 className="font-cormorant text-center text-[36px] leading-[0.98] font-bold text-[#2E241D] md:text-[46px] xl:text-left xl:text-[56px] xl:leading-[1.20]">
              Stay Connected to
              <br />
              Your Temple,
              <br />
              <span className="text-[#0B7285]">Wherever You Are.</span>
            </h1>

            <p
              className="mt-8 w-full text-[20px] leading-[1.45] font-medium text-[#3D352F] md:w-[430px]"
              style={{ marginTop: "10px" }}
            >
              Receive temple prasad, book yatra services, participate in seva
              and stay connected with live temple updates.
            </p>
            <div
              className="mt-6 flex flex-wrap justify-center gap-4 xl:justify-start"
              style={{ marginTop: "15px" }}
            >
              <Link
                href="/shop"
                style={{ color: "#EFDEC7" }}
                className="font-cormorant flex h-12 w-[165px] items-center justify-center gap-[10px] rounded-[10px] bg-[#0B7285] text-[20px]"
              >
                <span>Browse Shop</span>
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
                    stroke="#EFDEC7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href="/yatra"
                style={{ color: "#EFDEC7" }}
                className="font-cormorant flex h-12 w-[125px] items-center justify-center rounded-[10px] bg-[#C77B00] text-[20px] font-medium text-[#F8F2E8]"
              >
                Book Yatra
              </Link>
            </div>
          </div>

          {/* DARSHAN CARD */}
          {/* DARSHAN CARD */}
          <div
            data-testid="darshan-card"
            // className="absolute relative top-[500px] left-1/2 h-[522px] w-[95%] max-w-[491px] -translate-x-1/2 rounded-[24px] bg-[#EFDEC7] md:top-[560px] md:w-[491px] xl:top-[72px] xl:left-[calc(100%-571px)] xl:translate-x-0"
            className="relative h-[502px] w-[491px] rounded-[24px] bg-[#EFDEC7] top-2"
          >
            {/* Header */}
            <h3 className="absolute top-[18px] left-[24px] text-[16px] font-bold text-[#C77700] uppercase">
              LIVE DARSHAN UPDATE
            </h3>

            <div className="absolute top-[18px] right-[22px] flex h-[24px] items-center gap-1 rounded-full border border-[#0B7285] px-[10px] text-[13px] font-semibold text-[#0B7285]">
              <span
                className="h-[5px] w-[5px] rounded-full bg-[#0B7285]"
                style={{ marginLeft: "5px" }}
              />
              <span style={{ marginRight: "5px" }}>LIVE</span>
            </div>

            {/* Lotus */}
            <Image
              src="/images/lotus.png"
              alt="lotus"
              width={58}
              height={58}
              className="absolute top-[58px] left-1/2 -translate-x-1/2"
            />

            {/* Next Darshan */}
            <div className="absolute top-[105px] left-1/2 flex -translate-x-1/2 items-center gap-[10px]">
              <div className="h-px w-[55px] bg-[#D1A455]" />
              <p className="font-cormorant text-[16px] text-[#5E4E3F]">
                Next Darshan
              </p>
              <div className="h-px w-[55px] bg-[#D1A455]" />
            </div>

            {/* Temple Name */}
            <h2 className="font-cormorant absolute top-[140px] left-1/2 w-full -translate-x-1/2 text-center text-[28px] font-bold text-[#0B7285]">
              {darshan.templeName}
            </h2>

            {/* Location */}
            <p className="font-cormorant absolute top-[190px] left-1/2 w-full -translate-x-1/2 text-center text-[16px] text-[#5E4E3F]">
              {darshan.location}
            </p>

            {/* Divider */}
            <div className="absolute top-[228px] left-0 h-px w-full bg-[#D4BC99]" />

            {/* Label */}
            <p className="absolute top-[240px] left-1/2 w-[85%] -translate-x-1/2 text-center text-[15px] leading-[1.4] font-semibold text-[#443B33] sm:text-[16px]">
              {darshan.label}
            </p>

            <div className="absolute top-[278px] left-0 h-px w-full bg-[#D4BC99]" />

            {/* Hours */}
            <div className="absolute top-[295px] left-[70px] text-center">
              <div className="font-cormorant-infant text-[50px] leading-none text-[#0B7285]">
                {pad(darshan.hours)}
              </div>
              <div className="mt-1 text-[11px] text-[#7C7063] uppercase">
                HOURS
              </div>
            </div>

            {/* Colon 1 */}
            <div className="font-cormorant-infant absolute top-[305px] left-[165px] text-[50px] text-[#0B7285]">
              :
            </div>

            {/* Minutes */}
            <div className="absolute top-[295px] left-[205px] text-center">
              <div className="font-cormorant-infant text-[50px] leading-none text-[#0B7285]">
                {pad(darshan.minutes)}
              </div>
              <div className="mt-1 text-[11px] text-[#7C7063] uppercase">
                MINUTES
              </div>
            </div>

            {/* Colon 2 */}
            <div className="font-cormorant-infant absolute top-[305px] left-[310px] text-[50px] text-[#0B7285]">
              :
            </div>

            {/* Seconds */}
            <div className="absolute top-[295px] left-[350px] text-center">
              <div className="font-cormorant-infant text-[50px] leading-none text-[#0B7285]">
                {pad(darshan.seconds)}
              </div>
              <div className="mt-1 text-[11px] text-[#7C7063] uppercase">
                SECONDS
              </div>
            </div>

            {/* Footer Divider */}
            <div className="absolute top-[390px] left-0 h-px w-full bg-[#D4BC99]" />

            {/* Darshan Type */}
            <div className="absolute top-[410px] left-[80px] flex items-center gap-3">
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#D1A455]">
                <HandHelping size={16} />
              </div>

              <div>
                <p className="text-[11px] text-[#7C7063]">Darshan Type</p>
                <p className="text-[15px] font-semibold text-[#3D352F]">
                  {darshan.label
                    .split("/")
                    .pop()
                    ?.replace(/\s*Begins In$/, "")
                    .trim()}
                </p>
              </div>
            </div>
            <div className="absolute top-[408px] left-1/2 h-[42px] w-px -translate-x-1/2 bg-[#D49A2A]/40" />

            {/* Today */}
            <div className="absolute top-[410px] right-[80px] flex items-center gap-3">
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#D1A455]">
                <Calendar size={16} />
              </div>

              <div>
                <p className="text-[11px] text-[#7C7063]">Today</p>
                <p className="text-[15px] font-semibold text-[#3D352F]">
                  {darshan.date}
                </p>
              </div>
            </div>

            {/* Button */}
            <Link
              href="/darshan"
              className="font-cormorant absolute bottom-[8px] left-1/2 flex h-[35px] w-[250px] -translate-x-1/2 items-center justify-center gap-2 rounded-[10px] bg-[#0B7285] text-[15px] font-semibold text-[#F8F2E8]"
              style={{ color: "#EFDEC7" }}
            >
              <span>View All Darshan Timings</span>
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
                  stroke="#EFDEC7"
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
