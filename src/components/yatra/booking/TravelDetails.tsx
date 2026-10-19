"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Users } from "lucide-react";

interface TravelDetailsProps {
  travellerCount?: number;
  submitted?: boolean;
  onChange?: (data: { travelDate: string; travellers: number }) => void;
}

const TRAVELLER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function TravelDetails({
  travellerCount = 2,
  submitted = false,
  onChange,
}: TravelDetailsProps) {
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState(travellerCount);
  const [touchedDate, setTouchedDate] = useState(false);
  const [dateError, setDateError] = useState<string | undefined>();

  const validateDate = (val: string) => {
    if (!val) return "Travel date is required";
    return undefined;
  };

  const handleDateChange = (val: string) => {
    setTravelDate(val);
    if (touchedDate) {
      setDateError(validateDate(val));
    }
    onChange?.({ travelDate: val, travellers });
  };

  const handleDateBlur = () => {
    setTouchedDate(true);
    setDateError(validateDate(travelDate));
  };

  // When parent submits, force-show the date error
  useEffect(() => {
    if (submitted) {
      setTouchedDate(true);
      setDateError(validateDate(travelDate));
    }
  }, [submitted, travelDate]);

  const handleTravellerChange = (count: number) => {
    setTravellers(count);
    onChange?.({ travelDate, travellers: count });
  };

  const inputBase =
    "font-cormorant w-full h-[44px] rounded-[8px] border text-[16px] font-bold text-[#3D352F] placeholder:text-[#3D352F]/40 placeholder:font-bold focus:outline-none transition bg-transparent";

  const labelClass =
    "font-cormorant text-[14px] font-bold text-[#3D352F] leading-tight mb-1 block";

  return (
    <section className="w-full px-5 sm:px-6 py-5 sm:py-6 border-t border-[#C37000]/25">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
        <h2 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight">
          Travel Details
        </h2>
      </div>

      {/* Row: Travel Date | Number of Travellers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Travel Date */}
        <div>
          <label className={labelClass}>
            Travel Date <span className="text-[#D04B16]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#C37000]/70">
              <CalendarDays size={16} strokeWidth={2.2} />
            </span>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => handleDateChange(e.target.value)}
              onBlur={handleDateBlur}
              className={`${inputBase} pl-9 pr-3 cursor-pointer ${
                touchedDate && dateError
                  ? "border-[#D04B16] focus:border-[#D04B16]"
                  : "border-[#C37000]/50 focus:border-[#C37000]"
              }`}
              style={{ colorScheme: "light", backgroundColor: "transparent" }}
            />
          </div>
          {touchedDate && dateError && (
            <p className="font-cormorant text-[13px] font-bold text-[#D04B16] mt-0.5">
              {dateError}
            </p>
          )}
        </div>

        {/* Number of Travellers */}
        <div>
          <label className={labelClass}>
            Number of Travellers <span className="text-[#D04B16]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#C37000]/70">
              <Users size={16} strokeWidth={2.2} />
            </span>
            <select
              value={travellers}
              onChange={(e) => handleTravellerChange(Number(e.target.value))}
              className={`${inputBase} pl-9 pr-8 border-[#C37000]/50 focus:border-[#C37000] appearance-none cursor-pointer`}
              style={{ backgroundColor: "transparent" }}
            >
              {TRAVELLER_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Traveller" : "Travellers"}
                </option>
              ))}
            </select>
            {/* Custom down arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C37000]">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="#C37000"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

