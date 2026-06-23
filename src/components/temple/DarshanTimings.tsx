"use client";

import Image from "next/image";
import { CalendarDays, Clock3, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTempleTimings } from "@/store/slices/templeTimingsSlice";
import { useEffect, useState } from "react";

interface DarshanTimingsProps {
  templeId: string;
}

export default function DarshanTimings({ templeId }: DarshanTimingsProps) {
  const dispatch = useAppDispatch();
  //   const { darshan } = useAppSelector((state) => state.hero);
  const { timings, loading } = useAppSelector((state) => state.templeTimings);

  useEffect(() => {
    if (templeId) {
      dispatch(fetchTempleTimings(templeId));
    }
  }, [dispatch, templeId]);

  const todayDay = String(new Date().getDay());

  const todayTimings = timings.filter(
    (timing) => timing.day_of_week === todayDay,
  );
  //   console.log("Today Day:", todayDay);
  //   console.log("All timings:", timings);
  //   console.log("Today timings:", todayTimings);
  //   console.log("DARSHAN OBJECT", darshan);
  //   console.log("DARSHAN TIMINGS", darshan?.timings);

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

  const currentDarshan =
    todayTimings.find((timing) => {
      const start = timeToSeconds(timing.opening_time);
      const end = timeToSeconds(timing.closing_time);

      return currentTimeInSeconds >= start && currentTimeInSeconds <= end;
    }) || null;

  const nextDarshan =
    todayTimings.find((timing) => {
      const start = timeToSeconds(timing.opening_time);

      return start > currentTimeInSeconds;
    }) || null;

  //   const activeDarshan = currentDarshan || nextDarshan;

  const allDarshansCompleted =
    todayTimings.length > 0 &&
    currentTimeInSeconds >
      timeToSeconds(todayTimings[todayTimings.length - 1].closing_time);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (nextDarshan) {
    const startSeconds = timeToSeconds(nextDarshan.opening_time);

    const remainingSeconds = startSeconds - currentTimeInSeconds;

    hours = Math.floor(remainingSeconds / 3600);

    minutes = Math.floor((remainingSeconds % 3600) / 60);

    seconds = remainingSeconds % 60;
  }

  const today = new Date();

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() - today.getDay() + index);

    return {
      label: date.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      value: date.toISOString(),
    };
  });

  if (loading) {
    return (
      <div className="rounded-[20px] border border-[#D89A3D] bg-[#FBF6EE] p-6">
        Loading...
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[#D89A3D] bg-[#FBF6EE]">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div
          className="grid grid-cols-[220px_1fr_220px] items-start px-4 pt-3"
          style={{ marginLeft: "20px", marginTop: "30px" }}
        >
          {/* Date */}
          <div>
            <div className="relative w-[220px]">
              {/* <CalendarDays
                size={15}
                className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-[#0B6670]"
                style={{ marginLeft: "20px" }}
              /> */}

              <select
                className="h-[40px] w-full appearance-none rounded-[10px] border border-[#D89A3D] bg-white pr-10 pl-10 text-[15px] font-medium text-[#0B6670] outline-none"
                // style={{ marginLeft: "20px" }}
              >
                {weekDates.map((date) => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>

              {/* <ChevronDown
                size={14}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#0B6670]"
              /> */}
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center gap-3">
            <Image src="/images/lotus.png" alt="" width={42} height={42} />

            <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
              Darshan Timings
            </h2>

            <Image src="/images/lotus.png" alt="" width={42} height={42} />
          </div>

          {/* Next Darshan */}
        </div>

        {/* Timings Row */}
        <div className="mt-3 grid grid-cols-[1fr_190px] items-stretch px-3 pb-3">
          <div className="mt-3 flex items-center px-3 pb-3">
            {todayTimings.map((timing) => {
              const isActive = currentDarshan?.id === timing.id;

              return (
                <div
                  key={timing.id}
                  className={`flex flex-1 items-center justify-center ${
                    !isActive ? "border-r border-[#E6D9C5] last:border-r-0" : ""
                  }`}
                >
                  {isActive ? (
                    <div className="relative flex h-[72px] w-[78px] flex-col items-center justify-center rounded-[12px] border border-[#D89A3D] bg-[#FFF8ED]">
                      <p className="font-cormorant text-center text-[13px] leading-[1.1] text-[#B87418]">
                        {timing.label}
                      </p>

                      <p className="mt-1 text-[14px] font-semibold text-[#D18400]">
                        {timing.opening_time}
                      </p>

                      <div className="absolute -bottom-[9px] rounded-full bg-[#D18400] px-2 py-[1px] text-[8px] font-semibold text-white">
                        ONGOING
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-cormorant mx-auto max-w-[90px] text-center text-[14px] leading-[1.1] break-words text-[#4D433B]">
                        {timing.label}
                      </p>

                      <p className="mt-1 text-[15px] font-semibold text-[#4D433B]">
                        {timing.opening_time}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="pl-4"
            style={{ marginRight: "20px", marginBottom: "30px" }}
          >
            <div className="h-full rounded-[18px] border border-[#D89A3D] bg-[#F9F2E7] px-4 py-3">
              <p className="text-center text-[13px] text-[#C18426]">
                Next Darshan
              </p>

              <h3 className="font-cormorant text-center text-[24px] leading-[1.05] font-semibold text-[#4D433B]">
                {allDarshansCompleted
                  ? "All Darshans Completed"
                  : nextDarshan?.label || "No Upcoming Darshan"}
              </h3>

              <p className="mt-1 text-center text-[12px] text-[#8B7D6A]">
                {allDarshansCompleted
                  ? "Today's Schedule Finished"
                  : "Starts In"}
              </p>

              {!allDarshansCompleted && (
                <div className="mt-1 flex items-center justify-center gap-1">
                  <div className="text-center">
                    <div className="text-[18px] font-bold text-[#D18400]">
                      {String(hours).padStart(2, "0")}
                    </div>
                    <div className="text-[8px] text-[#8B7D6A]">HRS</div>
                  </div>

                  <span className="text-[18px] font-bold text-[#D18400]">
                    :
                  </span>

                  <div className="text-center">
                    <div className="text-[18px] font-bold text-[#D18400]">
                      {String(minutes).padStart(2, "0")}
                    </div>
                    <div className="text-[8px] text-[#8B7D6A]">MINS</div>
                  </div>

                  <span className="text-[18px] font-bold text-[#D18400]">
                    :
                  </span>

                  <div className="text-center">
                    <div className="text-[18px] font-bold text-[#D18400]">
                      {String(seconds).padStart(2, "0")}
                    </div>
                    <div className="text-[8px] text-[#8B7D6A]">SECS</div>
                  </div>
                </div>
              )}

              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#6F675F]">
                <Clock3 size={10} />
                <span>
                  {allDarshansCompleted
                    ? "Please check tomorrow's timings"
                    : `Today • ${nextDarshan?.opening_time}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
