"use client";

import Image from "next/image";
import { Check, Calendar } from "lucide-react";
import { useState } from "react";

export default function BirthdayBlessingCard() {
  const [birthdayEnabled, setBirthdayEnabled] = useState(true);
  const [birthdayDate, setBirthdayDate] = useState("");

  return (
    <div className="rounded-[16px] border border-[#C37000] bg-[#FAF4EB]/60 p-4 sm:p-5 mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_275px] gap-4 sm:gap-5 items-stretch">
        {/* Left Section: Inputs & Details */}
        <div className="flex flex-col justify-between space-y-4">
          {/* Header Row: Circle icon + Title & Subtitle */}
          <div className="flex items-start gap-3.5">
            <div className="flex h-[58px] w-[58px] sm:h-[64px] sm:w-[64px] shrink-0 items-center justify-center rounded-full border border-[#C37000] bg-[#FAF4EB]">
              <Image
                src="/images/birthday-cake.svg"
                alt="Birthday"
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
              />
            </div>

            <div>
              <h3 className="font-cormorant text-[22px] sm:text-[24px] font-bold text-[#0F5C66] leading-tight">
                Birthday Blessings
              </h3>
              <p className="font-cormorant text-[14.5px] sm:text-[15.5px] font-medium text-[#4A3E36] leading-snug mt-1">
                Celebrate your special day with personalized seva and temple recommendations.
              </p>
            </div>
          </div>

          {/* Birthday Input */}
          <div>
            <label className="font-cormorant block text-[15px] font-bold text-[#3D352F] mb-1">
              Birthday
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Select your Birthday"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
                className="h-[38px] w-full rounded-[8px] border border-[#D8A762] bg-[#FAF4EB]/80 px-3 pr-10 text-[13.5px] text-[#2C241E] placeholder-[#8A7968] outline-none transition focus:border-[#C37000] focus:ring-1 focus:ring-[#C37000]/30"
              />
              <Calendar className="pointer-events-none absolute right-3 h-4 w-4 text-[#0F5C66]" />
            </div>
          </div>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setBirthdayEnabled(!birthdayEnabled)}
            className="flex h-[42px] w-full items-center gap-3 rounded-[10px] border border-[#0F5C66]/50 bg-[#0F5C66]/15 px-3.5 transition-colors hover:bg-[#0F5C66]/20 cursor-pointer"
          >
            {/* Toggle Track */}
            <div
              className={`relative h-[22px] w-[42px] shrink-0 rounded-full transition-colors ${
                birthdayEnabled ? "bg-[#0F5C66]" : "bg-[#B8C7C4]"
              }`}
            >
              <div
                className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-xs transition-all duration-200 ${
                  birthdayEnabled ? "left-[22px]" : "left-[3px]"
                }`}
              />
            </div>

            {/* Label */}
            <span className="font-cormorant text-[17px] sm:text-[18px] font-bold text-[#0F5C66]">
              Enable Birthday Blessings
            </span>
          </button>
        </div>

        {/* Right Section: Teal Benefits Box */}
        <div className="flex flex-col justify-center rounded-[14px] border border-[#0F5C66]/30 bg-[#CBDCD9]/60 p-4">
          <h4 className="font-cormorant text-[15px] sm:text-[16px] font-bold text-[#0F5C66] leading-snug">
            When your birthday approaches, BrajMarg will:
          </h4>

          <div className="mt-3 space-y-2.5">
            {[
              "Suggest sevas from your followed temples",
              "Recommend special prasad offerings",
              "Send reminders before your birthday",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#0F5C66] bg-transparent mt-0.5">
                  <Check className="h-2.5 w-2.5 text-[#0F5C66]" strokeWidth={3} />
                </div>
                <p className="text-[12px] sm:text-[12.5px] leading-tight text-[#2C241E] font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
