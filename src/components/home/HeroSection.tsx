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
    <section className="relative min-h-[1300px] overflow-hidden md:min-h-[1400px] xl:h-[720px] xl:min-h-0">
      {/* Background */}
      <Image
        src="/images2/image 53.png"
        alt="Temple"
        fill
        priority
        className="object-cover"
      />

      {/* Golden Overlay */}
      <div className="relative z-10 w-full px-4 md:px-8">
        {/* Mobile + Tablet Layout */}
        <div className="pb- flex flex-col items-center px-4 pt-4 xl:hidden">
          <div
            className="w-full max-w-[500px] text-center"
            style={{ marginTop: "60px" }}
          >
            <h1
              className="font-cormorant text-[42px] leading-[0.95] font-bold text-[#2E241D] sm:text-[52px]"
              style={{ marginTop: "20px" }}
            >
              Stay Connected to
              <br />
              Your Temple,
              <br />
              <span className="text-[#0B7285]">Wherever You Are.</span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-[420px] text-[18px] leading-[1.5] text-[#3D352F]"
              style={{ marginTop: "20px" }}
            >
              Receive temple prasad, book yatra services, participate in seva
              and stay connected with live temple updates.
            </p>

            <div
              className="mt-8 flex flex-wrap justify-center gap-4"
              style={{ marginTop: "20px" }}
            >
              <Link
                href="/shop"
                className="font-cormorant flex h-12 w-[150px] items-center justify-center rounded-[10px] bg-[#0B7285] text-[20px] text-white"
              >
                Browse Shop →
              </Link>

              <Link
                href="/yatra"
                className="font-cormorant flex h-12 w-[125px] items-center justify-center rounded-[10px] bg-[#C77B00] text-[20px] text-white"
              >
                Book Yatra
              </Link>
            </div>
          </div>

          <div
            className="mt-24 w-full max-w-[491px]"
            style={{ marginTop: "80px" }}
          >
            <div
              data-testid="darshan-card"
              // className="absolute relative top-[500px] left-1/2 h-[522px] w-[95%] max-w-[491px] -translate-x-1/2 rounded-[24px] bg-[#EFDEC7] md:top-[560px] md:w-[491px] xl:top-[72px] xl:left-[calc(100%-571px)] xl:translate-x-0"
              className="relative h-[522px] w-full rounded-[24px] bg-[#EFDEC7] sm:max-w-[491px]"
            >
              {/* Header */}
              <h3 className="absolute top-[10px] left-[24px] text-[17px] font-bold text-[#C77700] uppercase">
                LIVE DARSHAN UPDATE
              </h3>

              <div className="absolute top-[18px] right-[22px] flex h-[24px] items-center gap-1 rounded-full border border-[#0B7285] px-[10px] text-[13px] font-semibold text-[#0B7285]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#0B7285]" />
                LIVE
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
              <div className="absolute top-[105px] left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-center gap-2">
                <div className="h-px flex-1 bg-[#D1A455]" />
                <p className="font-cormorant text-[16px] whitespace-nowrap text-[#5E4E3F] sm:text-[18px]">
                  Next Darshan
                </p>
                <div className="h-px flex-1 bg-[#D1A455]" />
              </div>

              {/* Temple Name */}
              <h2 className="font-cormorant absolute top-[145px] left-1/2 w-full -translate-x-1/2 text-center text-[30px] font-bold text-[#0B7285]">
                {darshan.templeName}
              </h2>

              {/* Location */}
              <p className="font-cormorant absolute top-[190px] left-1/2 w-full -translate-x-1/2 text-center text-[16px] text-[#5E4E3F]">
                {darshan.location}
              </p>

              {/* Divider */}
              <div className="absolute top-[228px] left-0 h-px w-full bg-[#D4BC99]" />

              {/* Label */}
              <p className="absolute top-[238px] left-1/2 w-[90%] -translate-x-1/2 text-center text-[15px] font-semibold text-[#443B33] sm:text-[16px]">
                {darshan.label}
              </p>
              <div className="absolute top-[278px] left-0 h-px w-full bg-[#D4BC99]" />

              {/* Hours */}
              <div className="absolute top-[295px] left-0 flex w-full items-start justify-center gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="font-cormorant-infant text-[48px] leading-none text-[#0B7285] sm:text-[58px]">
                    {pad(darshan.hours)}
                  </div>
                  <div className="mt-1 text-[10px] text-[#7C7063] uppercase sm:text-[11px]">
                    HOURS
                  </div>
                </div>

                <div className="font-cormorant-infant text-[40px] text-[#0B7285] sm:text-[50px]">
                  :
                </div>

                <div className="text-center">
                  <div className="font-cormorant-infant text-[48px] leading-none text-[#0B7285] sm:text-[58px]">
                    {pad(darshan.minutes)}
                  </div>
                  <div className="mt-1 text-[10px] text-[#7C7063] uppercase sm:text-[11px]">
                    MINUTES
                  </div>
                </div>

                <div className="font-cormorant-infant text-[40px] text-[#0B7285] sm:text-[50px]">
                  :
                </div>

                <div className="text-center">
                  <div className="font-cormorant-infant text-[48px] leading-none text-[#0B7285] sm:text-[58px]">
                    {pad(darshan.seconds)}
                  </div>
                  <div className="mt-1 text-[10px] text-[#7C7063] uppercase sm:text-[11px]">
                    SECONDS
                  </div>
                </div>
              </div>
              {/* Footer Divider */}
              <div className="absolute top-[390px] left-0 h-px w-full bg-[#D4BC99]" />

              {/* Darshan Type */}
              <div className="absolute top-[410px] left-[24px] flex items-center gap-3">
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#D1A455]">
                  <HandHelping size={16} />
                </div>

                <div>
                  <p className="text-[11px] text-[#7C7063]">Darshan Type</p>
                  <p className="text-[15px] font-semibold text-[#3D352F]">
                    Rajbhog
                  </p>
                </div>
              </div>

              {/* Today */}
              <div className="absolute top-[410px] right-[24px] flex items-center gap-3">
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
                className="font-cormorant absolute bottom-[12px] left-1/2 flex h-[40px] w-[260px] -translate-x-1/2 items-center justify-center gap-2 rounded-[10px] bg-[#0B7285] text-[18px] font-semibold text-[#F8F2E8]"
              >
                View All Darshan Timings
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden h-[720px] items-center justify-center gap-70 xl:flex">
          <div
            data-testid="left-content"
            // className="absolute top-[80px] left-1/2 z-20 flex w-[90%] max-w-[470px] -translate-x-1/2 flex-col gap-7 md:top-[90px] md:w-[470px] xl:top-[100px] xl:left-[130px] xl:w-[470px] xl:translate-x-0"
            className="w-[491px]"
          >
            <h1 className="font-cormorant text-center text-[42px] leading-[0.98] font-bold text-[#2E241D] md:text-[52px] xl:text-left xl:text-[62px] xl:leading-none">
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
                className="font-cormorant flex h-12 w-[150px] items-center justify-center gap-2 rounded-[10px] bg-[#0B7285] text-[20px]"
              >
                Browse Shop
                <span className="text-sm">→</span>
              </Link>

              <Link
                href="/yatra"
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
            className="relative h-[522px] w-[491px] rounded-[24px] bg-[#EFDEC7]"
          >
            {/* Header */}
            <h3 className="absolute top-[10px] left-[24px] text-[17px] font-bold text-[#C77700] uppercase">
              LIVE DARSHAN UPDATE
            </h3>

            <div className="absolute top-[18px] right-[22px] flex h-[24px] items-center gap-1 rounded-full border border-[#0B7285] px-[10px] text-[13px] font-semibold text-[#0B7285]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#0B7285]" />
              LIVE
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
              <p className="font-cormorant text-[18px] text-[#5E4E3F]">
                Next Darshan
              </p>
              <div className="h-px w-[55px] bg-[#D1A455]" />
            </div>

            {/* Temple Name */}
            <h2 className="font-cormorant absolute top-[145px] left-1/2 w-full -translate-x-1/2 text-center text-[30px] font-bold text-[#0B7285]">
              {darshan.templeName}
            </h2>

            {/* Location */}
            <p className="font-cormorant absolute top-[190px] left-1/2 w-full -translate-x-1/2 text-center text-[16px] text-[#5E4E3F]">
              {darshan.location}
            </p>

            {/* Divider */}
            <div className="absolute top-[228px] left-0 h-px w-full bg-[#D4BC99]" />

            {/* Label */}
            <p className="absolute top-[238px] left-1/2 w-[85%] -translate-x-1/2 text-center text-[15px] leading-[1.4] font-semibold text-[#443B33] sm:text-[16px]">
              {darshan.label}
            </p>

            <div className="absolute top-[278px] left-0 h-px w-full bg-[#D4BC99]" />

            {/* Hours */}
            <div className="absolute top-[295px] left-[70px] text-center">
              <div className="font-cormorant-infant text-[58px] leading-none text-[#0B7285]">
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
              <div className="font-cormorant-infant text-[58px] leading-none text-[#0B7285]">
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
              <div className="font-cormorant-infant text-[58px] leading-none text-[#0B7285]">
                {pad(darshan.seconds)}
              </div>
              <div className="mt-1 text-[11px] text-[#7C7063] uppercase">
                SECONDS
              </div>
            </div>

            {/* Footer Divider */}
            <div className="absolute top-[390px] left-0 h-px w-full bg-[#D4BC99]" />

            {/* Darshan Type */}
            <div className="absolute top-[410px] left-[24px] flex items-center gap-3">
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#D1A455]">
                <HandHelping size={16} />
              </div>

              <div>
                <p className="text-[11px] text-[#7C7063]">Darshan Type</p>
                <p className="text-[15px] font-semibold text-[#3D352F]">
                  Rajbhog
                </p>
              </div>
            </div>

            {/* Today */}
            <div className="absolute top-[410px] right-[24px] flex items-center gap-3">
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
              className="font-cormorant absolute bottom-[12px] left-1/2 flex h-[40px] w-[260px] -translate-x-1/2 items-center justify-center gap-2 rounded-[10px] bg-[#0B7285] text-[18px] font-semibold text-[#F8F2E8]"
            >
              View All Darshan Timings
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
