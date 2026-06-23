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
    dispatch(fetchLiveDarshan());

    const interval = setInterval(() => {
      dispatch(tickCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

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
      <div className="relative z-10 mx-auto min-h-screen max-w-[1448px] px-4 min-[2184px]:ml-[400px] md:px-8">
        <div
          data-testid="left-content"
          className="absolute top-[80px] left-1/2 flex w-[90%] max-w-[470px] -translate-x-1/2 flex-col gap-7 md:top-[90px] md:w-[470px] xl:top-[72px] xl:left-[130px] xl:w-[470px] xl:translate-x-0"
        >
          <h1 className="font-cormorant text-center text-[42px] leading-[0.98] font-bold text-[#2E241D] md:text-[52px] xl:text-left xl:text-[62px] xl:leading-none">
            Stay Connected to
            <br />
            Your Temple,
            <br />
            <span className="text-[#0B7285]">Wherever You Are.</span>
          </h1>

          <p className="mt-6 w-full text-[20px] leading-[1.45] font-medium text-[#3D352F] md:mt-8 md:w-[430px] xl:mt-56">
            Receive temple prasad, book yatra services, participate in seva and
            stay connected with live temple updates.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 xl:justify-start">
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
          className="absolute top-[500px] left-1/2 h-[522px] w-[95%] max-w-[491px] -translate-x-1/2 rounded-[24px] bg-[#EFDEC7] md:top-[560px] md:w-[491px] xl:top-[72px] xl:right-[78px] xl:left-auto xl:w-[491px] xl:translate-x-0"
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
          <p className="absolute top-[238px] left-1/2 -translate-x-1/2 text-[16px] font-semibold text-[#443B33]">
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
    </section>
  );
}
