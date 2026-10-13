"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import SelectDateModal from "./SelectDateModal";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  fetchAvailableDates,
  setSelectedDate,
} from "@/store/slices/sevaPageSlice";

export default function OfferDateSelector() {
  const dispatch = useAppDispatch();

  const { dates, selectedDate } = useAppSelector((state) => state.sevaPage);

  useEffect(() => {
    dispatch(fetchAvailableDates());
  }, [dispatch]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });

  const formatDate = (date: string) => {
    const d = new Date(date);

    return {
      date: d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),

      day: d.toLocaleDateString("en-IN", {
        weekday: "short",
      }),
    };
  };

  return (
    <section className="relative min-h-[190px] md:min-h-[230px] overflow-hidden rounded-[18px] sm:rounded-[22px] md:rounded-[24px] border-[2px] md:border-[3px] border-[#C37000] bg-transparent p-3.5 sm:p-5 md:p-8">
      <div className="mb-4 sm:mb-6 md:mb-8 flex items-center justify-between gap-2">
        <div
          className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 md:ml-[30px] md:mt-[10px]"
        >
          <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#D18418] shrink-0" />

          <h3 className="font-cormorant text-[18px] sm:text-[22px] md:text-[28px] font-semibold text-[#0B6670] whitespace-nowrap">
            Offer Seva On
          </h3>
        </div>

        <button
          onClick={() => setOpenCalendar(true)}
          className="font-cormorant flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-[#D89A3D] px-2.5 py-1.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-[13px] sm:text-[16px] md:text-[19px] text-[#0B6670] shrink-0 whitespace-nowrap md:mr-[30px] md:mt-[10px]"
        >
          <CalendarDays
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#D18418] shrink-0 md:ml-[10px]"
          />

          <span className="md:mr-[10px]">Select Any Date</span>
        </button>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2.5 sm:gap-3.5 md:gap-5 overflow-x-auto scroll-smooth py-1 mx-7 sm:mx-9 md:mx-0 md:ml-[115px] md:mr-[80px] md:mt-[20px]"
        >
          {dates.map((item) => {
            const formatted = formatDate(item.available_date);

            return (
              <button
                key={item.id}
                onClick={() =>
                  dispatch(
                    setSelectedDate(
                      selectedDate === item.available_date
                        ? null
                        : item.available_date,
                    ),
                  )
                }
                className={`min-h-[100px] min-w-[85px] sm:min-w-[100px] md:min-h-[125px] md:min-w-[110px] shrink-0 rounded-xl border-[0.5px] p-2 sm:p-2.5 md:p-3 text-center transition-all duration-300 ${selectedDate === item.available_date
                  ? "border-[#0F5C66] bg-[#0F5C66] text-[#EFDEC7]"
                  : "border-[#C37000] bg-[#EFDEC7]/40 text-[#C37000]"
                  }`}
              >
                <p className="font-inter text-[15px] sm:text-[17px] md:text-[20px] font-bold leading-tight">
                  {formatted.date}
                </p>

                <p className="font-cormorant text-[14px] sm:text-[16px] md:text-[20px] leading-tight mt-0.5">
                  {formatted.day}
                </p>

                <div
                  className="mx-auto w-[36px] sm:w-[45px] md:w-[55px] border-t border-[#EAD8BF] my-1 md:my-0 md:ml-[18px] md:mt-[5px]"
                />

                <p className="font-cormorant text-[14px] sm:text-[16px] md:text-[20px] text-[#3D352F] leading-none">
                  -
                </p>
              </button>
            );
          })}
        </div>

        <button
          onClick={scrollLeft}
          className="absolute top-1/2 left-0 z-10 flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#C37000] bg-[#F7F0E5] md:bg-[#C37000]/20 shadow-sm md:shadow-none md:left-0 md:ml-[40px] md:-translate-x-1/2 transition-colors hover:bg-[#F3DFC2]"
          aria-label="Previous date"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-[#0F5C66]" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute top-1/2 right-0 z-10 flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#C37000] bg-[#F7F0E5] md:bg-[#C37000]/20 shadow-sm md:shadow-none md:right-0 md:mr-[50px] md:translate-x-1/2 transition-colors hover:bg-[#F3DFC2]"
          aria-label="Next date"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#0F5C66]" />
        </button>
      </div>
      <SelectDateModal
        open={openCalendar}
        onClose={() => setOpenCalendar(false)}
      />
    </section>
  );
}
