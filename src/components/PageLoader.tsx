"use client";

import Image from "next/image";

interface PageLoaderProps {
  subtitle?: string;
}

export default function PageLoader({
  subtitle = "Connecting you to sacred temples...",
}: PageLoaderProps) {
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
          <div className="relative flex h-[94px] w-[94px] items-center justify-center">
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
            <div className="absolute inset-0">
              <div className="h-full w-full animate-spin rounded-full border-2 border-[#D7B36A] border-t-transparent" />
            </div>
          </div>

        {/* Brand */}
          <h2 className="font-cormorant mt-4 text-[38px] font-bold text-[#0C6D72]">
          Brajmarg
        </h2>

        <p className="mt-2 text-[15px] text-[#6C5E4B]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
