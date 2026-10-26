"use client";

import { ChevronDown } from "lucide-react";

interface DateSelectInputProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  maxYear?: number;
  minYear?: number;
  id?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseParts(value: string): { year: string; month: string; day: string } {
  if (!value || !value.trim()) return { year: "", month: "", day: "" };
  const parts = value.split("-");
  return {
    year: parts[0] || "",
    month: parts[1] || "",
    day: parts[2] || "",
  };
}

function daysInMonth(year: number, month: number): number {
  if (!year || !month) return 31;
  return new Date(year, month, 0).getDate();
}

export default function DateSelectInput({
  value,
  onChange,
  onBlur,
  hasError,
  maxYear,
  minYear = 1900,
  id,
}: DateSelectInputProps) {
  const currentYear = maxYear ?? new Date().getFullYear();
  const { year, month, day } = parseParts(value);

  const selectedYear = parseInt(year, 10);
  const selectedMonth = parseInt(month, 10);
  const selectedDay = parseInt(day, 10);

  const totalDays = daysInMonth(selectedYear, selectedMonth);

  const handleChange = (field: "year" | "month" | "day", newVal: string) => {
    const y = field === "year" ? newVal : year;
    const m = field === "month" ? newVal : month;
    let d = field === "day" ? newVal : day;

    // Clamp day if month/year change causes an invalid day
    if (y && m) {
      const maxDays = daysInMonth(parseInt(y, 10), parseInt(m, 10));
      if (d && parseInt(d, 10) > maxDays) {
        d = String(maxDays).padStart(2, "0");
      }
    }

    if (y && m && d) {
      const yStr = y.padStart(4, "0");
      const mStr = m.padStart(2, "0");
      const dStr = d.padStart(2, "0");
      onChange(`${yStr}-${mStr}-${dStr}`);
    } else {
      onChange("");
    }
  };

  const borderClass = hasError
    ? "border-[#B3261E] focus:ring-[#B3261E]"
    : "border-[#C37000]/50 focus:border-[#C37000] focus:ring-[#C37000]/30";

  const selectBase = `w-full appearance-none rounded-xl border bg-transparent py-2.5 pl-3 pr-8 text-[15px] text-[#3D352F] outline-none transition focus:ring-1 cursor-pointer ${borderClass}`;

  const years = Array.from(
    { length: currentYear - minYear + 1 },
    (_, i) => currentYear - i
  );

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div id={id} className="grid grid-cols-3 gap-2 sm:gap-2.5" onBlur={onBlur}>
      {/* Day */}
      <div className="relative">
        <select
          value={selectedDay || ""}
          onChange={(e) => handleChange("day", e.target.value)}
          className={selectBase}
          aria-label="Day"
        >
          <option value="" disabled>DD</option>
          {days.map((d) => (
            <option key={d} value={String(d).padStart(2, "0")}>
              {String(d).padStart(2, "0")}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[#8A715E]">
          <ChevronDown size={15} />
        </span>
      </div>

      {/* Month */}
      <div className="relative">
        <select
          value={selectedMonth || ""}
          onChange={(e) => handleChange("month", e.target.value)}
          className={selectBase}
          aria-label="Month"
        >
          <option value="" disabled>Month</option>
          {MONTHS.map((name, idx) => (
            <option key={name} value={String(idx + 1).padStart(2, "0")}>
              {name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[#8A715E]">
          <ChevronDown size={15} />
        </span>
      </div>

      {/* Year */}
      <div className="relative">
        <select
          value={selectedYear || ""}
          onChange={(e) => handleChange("year", e.target.value)}
          className={selectBase}
          aria-label="Year"
        >
          <option value="" disabled>YYYY</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[#8A715E]">
          <ChevronDown size={15} />
        </span>
      </div>
    </div>
  );
}

