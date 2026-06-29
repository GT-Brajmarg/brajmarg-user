"use client";

import Image from "next/image";

export default function HomePageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F2E8]">
      {/* Background Mandala */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          priority
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Lotus */}
        <div className="animate-pulse">
          <Image
            src="/images/lotus.png"
            alt="Loading"
            width={70}
            height={70}
            priority
          />
        </div>

        {/* Spinner Ring */}
        <div className="absolute top-[-12px]">
          <div className="h-[94px] w-[94px] animate-spin rounded-full border-2 border-[#D7B36A] border-t-transparent" />
        </div>

        {/* Brand */}
        <h2 className="font-cormorant mt-10 text-[38px] font-bold text-[#0C6D72]">
          Brajmarg
        </h2>

        <p className="mt-2 text-[15px] text-[#6C5E4B]">
          Connecting you to sacred temples...
        </p>

        {/* Progress Dots */}
        <div className="mt-6 flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#0C6D72]" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#0C6D72]"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#0C6D72]"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );
}
