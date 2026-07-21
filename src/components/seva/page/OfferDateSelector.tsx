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
    <section className="relative min-h-[230px] overflow-hidden rounded-[24px] border-[3px] border-[#C37000] bg-transparent p-8">
      <div className="mb-8 flex items-center justify-between">
        <div
          className="flex items-center gap-3"
          style={{ marginLeft: "30px", marginTop: "10px" }}
        >
          <CalendarDays className="h-7 w-7 text-[#D18418]" />

          <h3 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
            Offer Seva On
          </h3>
        </div>

        <button
          onClick={() => setOpenCalendar(true)}
          className="font-cormorant flex items-center gap-2 rounded-xl border border-[#D89A3D] px-5 py-3 text-[22px] text-[#0B6670]"
          style={{ marginRight: "30px", marginTop: "10px" }}
        >
          <CalendarDays
            className="h-6 w-6 text-[#D18418]"
            style={{ marginLeft: "10px" }}
          />

          <span style={{ marginRight: "10px" }}>Select Any Date</span>
        </button>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth"
          style={{
            marginLeft: "80px",
            marginRight: "80px",
            marginTop: "20px",
          }}
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
                className={`min-h-[125px] min-w-[110px] rounded-xl border-[0.5px] p-4 text-center transition-all duration-300 ${
                  selectedDate === item.available_date
                    ? "border-[#0F5C66] bg-[#0F5C66] text-[#EFDEC7]"
                    : "border-[#C37000] bg-[#EFDEC7]/40 text-[#C37000]"
                }`}
              >
                <p className="font-inter text-[24px] font-bold">
                  {formatted.date}
                </p>

                <p className="font-cormorant text-[24px]">{formatted.day}</p>

                <div
                  className="mx-auto my-2 w-[55px] border-t border-[#EAD8BF]"
                  style={{ marginLeft: "25px", marginTop: "5px" }}
                />

                <p className="font-cormorant mt-1 text-[20px] text-[#3D352F]">
                  -
                </p>
              </button>
            );
          })}
        </div>

        <button
          onClick={scrollLeft}
          className="absolute top-1/2 left-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C37000] bg-[#C37000]/20"
          style={{ marginLeft: "40px" }}
        >
          <ChevronLeft className="text-[#0F5C66]" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute top-1/2 right-0 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C37000] bg-[#C37000]/20"
          style={{ marginRight: "50px" }}
        >
          <ChevronRight className="text-[#0F5C66]" />
        </button>
      </div>
      <SelectDateModal
        open={openCalendar}
        onClose={() => setOpenCalendar(false)}
      />
    </section>
  );
}
