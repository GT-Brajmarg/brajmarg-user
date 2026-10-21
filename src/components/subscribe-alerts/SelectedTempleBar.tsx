"use client";

import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { cormorant } from "@/lib/fonts";

interface Temple {
  id: string;
  name: string;
}

interface SelectedTempleBarProps {
  temples: Temple[];
  onRemove: (id: string) => void;
  onContinue: () => void;
}

export default function SelectedTempleBar({
  temples,
  onRemove,
  onContinue,
}: SelectedTempleBarProps) {
  return (
    <div className="w-full rounded-[16px] sm:rounded-[18px] border-[1.5px] border-[#D18418] bg-[#F7F0E5]/80 backdrop-blur-xs px-4 sm:px-6 py-3.5 sm:py-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)] mb-8 sm:mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-5">
        {/* Left: Lotus + Count & Description */}
        <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
          <Image
            src="/images/lotus.png"
            alt=""
            width={44}
            height={36}
            className="h-8 w-auto sm:h-9 object-contain shrink-0"
          />

          <div className="flex flex-col">
            <h3
              className={`${cormorant.className} text-[20px] sm:text-[22px] font-semibold text-[#2C241E] leading-tight`}
            >
              {temples.length} Temple{temples.length > 1 ? "s" : ""} Selected
            </h3>

            <p
              className={`${cormorant.className} text-[13px] sm:text-[14px] text-[#635345] leading-tight mt-0.5`}
            >
              You can add more temples later if you wish.
            </p>
          </div>
        </div>

        {/* Middle: Selected Temple Tags (3 cards per row, wrapping) */}
        <div className="flex-1 flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 max-w-[460px] w-full max-h-[148px] overflow-y-auto pr-1">
            {temples.map((temple) => (
              <div
                key={temple.id}
                className="flex items-center justify-between gap-1.5 rounded-[8px] border border-[#82A39D] bg-[#B8CBC7]/70 px-2.5 py-1.5 min-h-[42px] transition hover:bg-[#B0C5C1]/80"
              >
                <span
                  className={`${cormorant.className} text-[13.5px] sm:text-[14px] font-semibold leading-[1.15] text-[#0D5D63] text-left line-clamp-2 flex-1`}
                  title={temple.name}
                >
                  {temple.name}
                </span>

                <button
                  type="button"
                  onClick={() => onRemove(temple.id)}
                  className="text-[#0D5D63] hover:text-[#094146] transition p-0.5 rounded cursor-pointer shrink-0"
                  aria-label={`Remove ${temple.name}`}
                >
                  <X size={14} strokeWidth={2.2} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Continue Button */}
        <button
          type="button"
          onClick={onContinue}
          className="flex h-[42px] sm:h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#0B6670] hover:bg-[#08525A] px-6 sm:px-7 transition-colors shadow-xs shrink-0 cursor-pointer self-stretch sm:self-auto"
        >
          <span
            className={`${cormorant.className} text-[17px] sm:text-[18px] font-semibold text-white tracking-wide`}
          >
            Continue
          </span>

          <ArrowRight
            size={16}
            strokeWidth={2.2}
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
}

