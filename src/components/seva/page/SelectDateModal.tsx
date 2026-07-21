"use client";

import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedDate } from "@/store/slices/sevaPageSlice";

import { Cormorant_Infant } from "next/font/google";

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  open: boolean;
  onClose: () => void;
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SelectDateModal({ open, onClose }: Props) {
  const dispatch = useAppDispatch();

  const { dates, selectedDate } = useAppSelector((state) => state.sevaPage);

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (dates.length > 0) {
      return new Date(dates[0].available_date);
    }

    return new Date();
  });

  const formatISODate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (dates.length > 0) {
      setCurrentMonth(new Date(dates[0].available_date));
    }
  }, [dates]);

  const calendar = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startOffset = (firstDay.getDay() + 6) % 7;

    const days: (Date | null)[] = [];

    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  }, [currentMonth]);

  const weeks = [];

  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }

  const availableDates = useMemo(() => {
    return new Set(dates.map((d) => d.available_date));
  }, [dates]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[560px] overflow-hidden rounded-[22px] border border-[#D89A3D] bg-[#F8EEDC] shadow-2xl">
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          className="pointer-events-none object-cover opacity-60"
        />

        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-1 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#D8B67A] bg-[#F7EAD4]/90 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-[#F3DFC2]"
          >
            <X size={18} className="text-[#8C6A45]" strokeWidth={2.2} />
          </button>

          {/* Heading */}

          <h2
            className={`${cormorantInfant.className} text-[28px] font-bold text-[#0F5C66]`}
            style={{ marginLeft: "30px", marginTop: "10px" }}
          >
            Select Date
          </h2>

          <div
            className="rounded-xl border border-[#D89A3D] p-4"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              className="mb-6 flex items-center justify-between"
              style={{ marginTop: "5px" }}
            >
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                      1,
                    ),
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C37000] bg-[#C37000]/20"
                style={{ marginLeft: "10px" }}
              >
                <ChevronLeft className="text-[#0F5C66]" />
              </button>

              <h3
                className={`${cormorantInfant.className} text-[28px] font-bold text-[#0F5C66]`}
              >
                {currentMonth.toLocaleString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      1,
                    ),
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C37000] bg-[#C37000]/20"
                style={{ marginRight: "10px" }}
              >
                <ChevronRight className="text-[#0F5C66]" />
              </button>
            </div>

            <div style={{ marginTop: "10px" }}>
              <div className="grid grid-cols-7 text-center">
                {weekDays.map((day) => (
                  <p
                    key={day}
                    className={`${cormorantInfant.className} text-[16px] font-bold text-[#0F5C66]`}
                  >
                    {day}
                  </p>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-3 h-px w-full bg-[#C37000] opacity-50" />
            </div>

            <div className="space-y-0">
              <div className="space-y-0">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex}>
                    <div className="grid grid-cols-7 text-center">
                      {week.map((date, index) => {
                        if (!date) {
                          return <div key={index} className="h-[72px]" />;
                        }

                        const iso = formatISODate(date);

                        const available = availableDates.has(iso);

                        const active = selectedDate === iso;

                        return (
                          <button
                            key={iso}
                            disabled={!available}
                            onClick={() => {
                              dispatch(setSelectedDate(iso));
                              onClose();
                            }}
                            className={`flex h-[72px] flex-col items-center justify-center rounded-lg transition-all duration-200 ${
                              active
                                ? "bg-[#0B6670] text-[#EFDEC7]"
                                : available
                                  ? "text-[#0B6670] hover:bg-[#EAD6B4]"
                                  : "cursor-not-allowed text-[#C8C8C8]"
                            }`}
                          >
                            <span
                              className={`${cormorantInfant.className} text-[20px] leading-none font-bold`}
                            >
                              {date.getDate()}
                            </span>

                            <span className="mt-1 text-[10px]">
                              {available ? "Available" : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {weekIndex !== weeks.length - 1 && (
                      <div className="my-2 h-px w-full bg-[#C37000]/35" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
