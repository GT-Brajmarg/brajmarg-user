"use client";

import Image from "next/image";
import { Clock3, ChevronDown, ChevronRight, CalendarDays } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTempleTimings } from "@/store/slices/templeTimingsSlice";
import { useEffect, useState } from "react";

export default function DarshanTimings() {
  const dispatch = useAppDispatch();

  const { timings, loading } = useAppSelector((state) => state.templeTimings);

  const today = new Date();

  const [selectedDay, setSelectedDay] = useState(String(today.getDay()));

  const selectedDayTimings = timings.filter(
    (timing) => timing.day_of_week === selectedDay,
  );

  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(() => {
    const now = new Date();

    return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setCurrentTimeInSeconds(
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds(),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);

    return hours * 3600 + minutes * 60 + seconds;
  };

  const isToday = selectedDay === String(today.getDay());

  const currentDarshan = isToday
    ? selectedDayTimings.find((timing) => {
        const start = timeToSeconds(timing.opening_time);
        const end = timeToSeconds(timing.closing_time);

        return currentTimeInSeconds >= start && currentTimeInSeconds <= end;
      }) || null
    : null;

  const nextDarshan = isToday
    ? selectedDayTimings
        .filter(
          (timing) => timeToSeconds(timing.opening_time) > currentTimeInSeconds,
        )
        .sort(
          (a, b) =>
            timeToSeconds(a.opening_time) - timeToSeconds(b.opening_time),
        )[0] || null
    : selectedDayTimings.sort(
        (a, b) => timeToSeconds(a.opening_time) - timeToSeconds(b.opening_time),
      )[0] || null;

  //   const activeDarshan = currentDarshan || nextDarshan;

  const lastDarshan =
    selectedDayTimings.length > 0
      ? selectedDayTimings.reduce((latest, current) =>
          timeToSeconds(current.closing_time) >
          timeToSeconds(latest.closing_time)
            ? current
            : latest,
        )
      : null;
  const allDarshansCompleted =
    isToday &&
    lastDarshan !== null &&
    currentTimeInSeconds > timeToSeconds(lastDarshan.closing_time);

  // let hours = 0;
  // let minutes = 0;
  // let seconds = 0;

  // if (nextDarshan) {
  //   const startSeconds = timeToSeconds(nextDarshan.opening_time);

  //   const remainingSeconds = startSeconds - currentTimeInSeconds;

  //   hours = Math.floor(remainingSeconds / 3600);

  //   minutes = Math.floor((remainingSeconds % 3600) / 60);

  //   seconds = remainingSeconds % 60;
  // }
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() + index);

    return {
      label: date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "short",
      }),
      value: String(date.getDay()),
      date, // <-- keep the actual Date object
    };
  });

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (nextDarshan) {
    const now = new Date();

    if (isToday) {
      const startSeconds = timeToSeconds(nextDarshan.opening_time);
      const remainingSeconds = Math.max(0, startSeconds - currentTimeInSeconds);

      hours = Math.floor(remainingSeconds / 3600);
      minutes = Math.floor((remainingSeconds % 3600) / 60);
      seconds = remainingSeconds % 60;
    } else {
      // Find the actual selected date
      const selectedDate = weekDates.find(
        (day) => day.value === selectedDay,
      )?.date;

      if (selectedDate) {
        const target = new Date(selectedDate);

        const [h, m, s] = nextDarshan.opening_time.split(":").map(Number);

        target.setHours(h, m, s, 0);

        const remainingSeconds = Math.max(
          0,
          Math.floor((target.getTime() - now.getTime()) / 1000),
        );

        hours = Math.floor(remainingSeconds / 3600);
        minutes = Math.floor((remainingSeconds % 3600) / 60);
        seconds = remainingSeconds % 60;
      }
    }
  }

  const showCompleted =
    isToday && selectedDayTimings.length > 0 && !currentDarshan && !nextDarshan;

  const selectedDateLabel =
    weekDates.find((day) => day.value === selectedDay)?.label ?? "";
  const selectedDayName =
    weekDates.find((day) => day.value === selectedDay)?.label.split(",")[0] ??
    "";

  // console.log({
  //   isToday,
  //   currentTimeInSeconds,
  //   currentTime: new Date().toLocaleTimeString(),
  //   allDarshansCompleted,
  //   nextDarshan,
  //   selectedDayTimings,
  //   lastDarshan,
  //   lastClosingTime: lastDarshan?.closing_time,
  // });

  // console.table(
  //   selectedDayTimings.map((t) => ({
  //     label: t.label,
  //     opening: t.opening_time,
  //     closing: t.closing_time,
  //   })),
  // );
  return (
    <section className="relative w-full overflow-hidden rounded-[24px] border-[2px] border-[#C37000] bg-transparent shadow-[0_20px_50px_rgba(126,83,26,0.18),0_6px_14px_rgba(126,83,26,0.1)]">
      <div className="hidden lg:block">
        <div className="relative p-6">
          {/* Header Bar */}
          <div className="grid grid-cols-[220px_1fr_220px] items-center">
            {/* Date Selector */}
            <div>
              <div className="relative w-[210px]">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute top-1/2 left-3.5 z-10 -translate-y-1/2 text-[#0F5C66]"
                />

                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="font-cormorant h-[42px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#C37000] bg-[#EFDEC7]/40 pr-9 pl-10 text-[16px] font-bold text-[#0F5C66] shadow-sm transition outline-none focus:border-[#C9821E] focus:ring-2 focus:ring-[#F3D7A7]"
                >
                  {weekDates.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#0F5C66]"
                />
              </div>
            </div>

            {/* Title */}
            <div className="flex items-center justify-center gap-3">
              <Image src="/images/lotus.png" alt="" width={38} height={38} />

              <h2 className="font-cormorant text-[30px] font-bold text-[#0B6670]">
                Darshan Timings
              </h2>

              <Image src="/images/lotus.png" alt="" width={38} height={38} />
            </div>

            {/* Placeholder for symmetry */}
            <div />
          </div>

          {/* Timings Row + Next Darshan */}
          <div className="mt-6 grid grid-cols-[1fr_230px] items-center gap-4">
            {/* Timings List */}
            <div className="flex items-center divide-x divide-[#C37000]/50 py-2">
              {selectedDayTimings.map((timing) => {
                const isActive = currentDarshan?.id === timing.id;

                return (
                  <div
                    key={timing.id}
                    className="flex flex-1 items-center justify-center px-1"
                  >
                    {isActive ? (
                      <div className="relative flex h-[78px] w-full max-w-[95px] flex-col items-center justify-center rounded-[12px] border border-[#C37000] bg-[#EFDEC7]/30 py-1 shadow-sm">
                        <p className="font-cormorant text-center text-[13px] leading-tight font-semibold text-[#C37000] line-clamp-2 px-1">
                          {timing.label}
                        </p>

                        <p className="mt-0.5 text-[14px] font-bold text-[#C37000]">
                          {timing.opening_time}
                        </p>

                        <div className="absolute -bottom-[9px] rounded-full bg-[#D18400] px-2.5 py-[1px] text-[8px] font-bold tracking-wider text-white shadow-xs">
                          ONGOING
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center px-1">
                        <p className="font-cormorant text-center text-[13px] leading-tight font-medium text-[#4D433B] line-clamp-2 min-h-[32px] flex items-center justify-center">
                          {timing.label}
                        </p>

                        <p className="mt-1 text-[14px] font-bold text-[#4D433B]">
                          {timing.opening_time}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next Darshan Card */}
            <div className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[18px] border border-[#C37000] bg-[#EFDEC7]/40 p-3.5 shadow-xs text-center">
                <p className="font-cormorant text-[14px] font-semibold text-[#C37000]">
                  Next Darshan
                </p>

                <h3 className="font-cormorant mt-1 text-[19px] leading-tight font-bold text-[#3D352F] line-clamp-1">
                  {allDarshansCompleted
                    ? "All Darshans Completed"
                    : nextDarshan?.label || "No Upcoming Darshan"}
                </h3>

                <p className="font-cormorant mt-0.5 text-[11px] text-[#6E675F]">
                  {allDarshansCompleted
                    ? "Today's Schedule Finished"
                    : "Starts In"}
                </p>

                {!allDarshansCompleted && (
                  <div className="my-1.5 flex items-center justify-center gap-1.5">
                    <div className="text-center">
                      <div className="text-[17px] font-bold text-[#C37000] leading-none">
                        {String(hours).padStart(2, "0")}
                      </div>
                      <div className="text-[8px] font-medium text-[#6E675F] mt-0.5">HRS</div>
                    </div>

                    <span className="text-[16px] font-bold text-[#C37000] leading-none -mt-2">
                      :
                    </span>

                    <div className="text-center">
                      <div className="text-[17px] font-bold text-[#C37000] leading-none">
                        {String(minutes).padStart(2, "0")}
                      </div>
                      <div className="text-[8px] font-medium text-[#6E675F] mt-0.5">MINS</div>
                    </div>

                    <span className="text-[16px] font-bold text-[#C37000] leading-none -mt-2">
                      :
                    </span>

                    <div className="text-center">
                      <div className="text-[17px] font-bold text-[#C37000] leading-none">
                        {String(seconds).padStart(2, "0")}
                      </div>
                      <div className="text-[8px] font-medium text-[#6E675F] mt-0.5">SECS</div>
                    </div>
                  </div>
                )}

                <div className="mt-1 flex items-center justify-center gap-1 border-t border-[#C37000]/40 pt-1.5 text-[11px] text-[#6E675F]">
                  <Image
                    src="/images/calendar-icon.svg"
                    alt="Calendar"
                    width={11}
                    height={11}
                    className="h-3 w-3 shrink-0 object-contain opacity-70"
                  />
                  <span className="font-medium truncate">
                    {allDarshansCompleted && isToday
                      ? "Today's schedule finished"
                      : `${isToday ? "Today" : selectedDayName} • ${
                          nextDarshan?.opening_time || ""
                        }`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <div
          className="relative overflow-hidden rounded-[28px] bg-transparent p-5"
          // style={{ marginTop: "50px" }}
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            // style={{
            //   backgroundImage:
            //     "radial-gradient(circle,#D89A3D 1px,transparent 1px)",
            //   backgroundSize: "18px 18px",
            // }}
          />

          <div className="relative">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-5 text-center">
                <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
                  Today&apos;s Darshan
                </h2>

                <p className="mt-1 text-xs text-[#8B7D6A]">
                  Select a day to view the schedule
                </p>
              </div>

              {/* Day Selector */}

              <div className="relative mb-6" style={{ marginTop: "10px" }}>
                {/* <CalendarDays
                    size={18}
                    className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#C18426]"
                  /> */}

                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-[#E8DAC6] bg-transparent px-4 pr-10 text-[15px] font-medium shadow-sm"
                  style={{ color: "#0B6670" }}
                >
                  {weekDates.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>

                {/* <ChevronDown
                  size={18}
                  className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-[#C18426]"
                /> */}
              </div>
            </div>

            {/* Timings */}

            <div className="space-y-4">
              {selectedDayTimings.map((timing) => {
                const isActive = currentDarshan?.id === timing.id;

                return (
                  <div
                    key={timing.id}
                    className={`group relative min-h-[75px] overflow-hidden rounded-[22px] border transition-all duration-300 ${
                      isActive
                        ? "border-[#D89A3D] bg-gradient-to-r from-[#FFF8ED] to-white shadow-[0_10px_30px_rgba(216,154,61,0.18)]"
                        : "border-[#EFE7DB] bg-transparent shadow-[0_3px_12px_rgba(0,0,0,0.05)]"
                    }`}
                  >
                    {/* Active Gold Line */}

                    {isActive && (
                      <div className="absolute top-0 left-0 h-full w-[5px] bg-transparent" />
                    )}

                    <div className="p-5">
                      {/* Top */}

                      <div className="p-5">
                        {isActive && (
                          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-transparent px-3 py-1">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#0B8A4A]" />
                            <span className="text-[11px] font-semibold tracking-wider text-[#0B8A4A] uppercase">
                              Live Darshan
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-4">
                          {/* Left */}
                          <h3
                            className="text-[20px] leading-none text-[#40352D]"
                            style={{
                              fontFamily:
                                "'Noto Serif Devanagari', 'Cormorant Garamond', serif",
                              marginLeft: "10px",
                              marginTop: "5px",
                            }}
                          >
                            {timing.label}
                          </h3>

                          {/* Right */}
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] tracking-[2px] text-[#A58E73] uppercase">
                              Starts
                            </span>

                            <span
                              className="text-[17px] font-semibold text-[#0B6670]"
                              style={{ marginRight: "20px" }}
                            >
                              {timing.opening_time}
                            </span>

                            {/* <ChevronRight
                              size={20}
                              className="ml-2 text-[#C7B49A]"
                            /> */}
                          </div>
                        </div>
                      </div>

                      {/* Bottom */}

                      {/* <div className="text-right">
                          <p className="text-[11px] tracking-[2px] text-[#A58E73] uppercase">
                            Ends
                          </p>

                          <p className="text-[15px] font-semibold text-[#7B6957]">
                            {timing.closing_time}
                          </p>
                        </div> */}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Darshan */}

            <div className="mt-8 overflow-hidden rounded-[30px] border border-[#EFD4A7] bg-transparent p-6 shadow-lg">
              <p className="text-center text-[12px] font-medium tracking-[2px] text-[#C18426] uppercase">
                Next Darshan
              </p>

              <h3 className="font-cormorant mt-2 text-center text-[34px] leading-none font-semibold text-[#4D433B]">
                {allDarshansCompleted
                  ? "Completed"
                  : nextDarshan?.label || "No Upcoming"}
              </h3>

              {!allDarshansCompleted && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  {/* Hours */}

                  <div className="w-[74px] rounded-2xl bg-white py-3 shadow">
                    <div className="text-center text-[30px] font-bold text-[#D18400]">
                      {String(hours).padStart(2, "0")}
                    </div>

                    <div className="text-center text-[10px] tracking-widest text-[#8B7D6A]">
                      HRS
                    </div>
                  </div>

                  <div className="text-[28px] font-bold text-[#D18400]">:</div>

                  {/* Minutes */}

                  <div className="w-[74px] rounded-2xl bg-white py-3 shadow">
                    <div className="text-center text-[30px] font-bold text-[#D18400]">
                      {String(minutes).padStart(2, "0")}
                    </div>

                    <div className="text-center text-[10px] tracking-widest text-[#8B7D6A]">
                      MIN
                    </div>
                  </div>

                  <div className="text-[28px] font-bold text-[#D18400]">:</div>

                  {/* Seconds */}

                  <div className="w-[74px] rounded-2xl bg-white py-3 shadow">
                    <div className="text-center text-[30px] font-bold text-[#D18400]">
                      {String(seconds).padStart(2, "0")}
                    </div>

                    <div className="text-center text-[10px] tracking-widest text-[#8B7D6A]">
                      SEC
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-2 rounded-full bg-transparent px-5 py-2 shadow-sm">
                  <Clock3 size={14} className="text-[#D89A3D]" />
                  <span className="text-[12px] font-medium text-[#6E675F]">
                    {allDarshansCompleted && isToday
                      ? "Today's schedule finished"
                      : `${selectedDateLabel} • ${nextDarshan?.opening_time || ""}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
