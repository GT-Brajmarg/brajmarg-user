// "use client";

// import Image from "next/image";
// import { CalendarDays, Clock3, ChevronDown, ChevronRight } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { fetchTempleTimings } from "@/store/slices/templeTimingsSlice";
// import { useEffect, useState } from "react";
// import DarshanCardMobile from "./Darshancardmobile";

// interface DarshanTimingsProps {
//   templeId: string;
// }

// export default function DarshanTimings({ templeId }: DarshanTimingsProps) {
//   const dispatch = useAppDispatch();
//   const { darshan } = useAppSelector((state) => state.hero);
//   const { timings, loading } = useAppSelector((state) => state.templeTimings);

//   useEffect(() => {
//     if (templeId) {
//       dispatch(fetchTempleTimings(templeId));
//     }
//   }, [dispatch, templeId]);

//   const today = new Date();

//   const [selectedDay, setSelectedDay] = useState(String(today.getDay()));

//   const selectedDayTimings = timings.filter(
//     (timing) => timing.day_of_week === selectedDay,
//   );

//   const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(() => {
//     const now = new Date();

//     return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();

//       setCurrentTimeInSeconds(
//         now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds(),
//       );
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const timeToSeconds = (time: string) => {
//     const [hours, minutes, seconds] = time.split(":").map(Number);

//     return hours * 3600 + minutes * 60 + seconds;
//   };
//   const currentDarshan =
//     selectedDayTimings.find((timing) => {
//       const start = timeToSeconds(timing.opening_time);
//       const end = timeToSeconds(timing.closing_time);

//       return currentTimeInSeconds >= start && currentTimeInSeconds <= end;
//     }) || null;

//   const nextDarshan =
//     selectedDayTimings.find((timing) => {
//       const start = timeToSeconds(timing.opening_time);

//       return start > currentTimeInSeconds;
//     }) || null;

//   //   const activeDarshan = currentDarshan || nextDarshan;

//   const allDarshansCompleted =
//     selectedDayTimings.length > 0 &&
//     currentTimeInSeconds >
//       timeToSeconds(
//         selectedDayTimings[selectedDayTimings.length - 1].closing_time,
//       );

//   let hours = 0;
//   let minutes = 0;
//   let seconds = 0;

//   if (nextDarshan) {
//     const startSeconds = timeToSeconds(nextDarshan.opening_time);

//     const remainingSeconds = startSeconds - currentTimeInSeconds;

//     hours = Math.floor(remainingSeconds / 3600);

//     minutes = Math.floor((remainingSeconds % 3600) / 60);

//     seconds = remainingSeconds % 60;
//   }

//   const weekDates = Array.from({ length: 7 }, (_, index) => {
//     const date = new Date(today);

//     date.setDate(today.getDate() + index);

//     return {
//       label: date.toLocaleDateString("en-IN", {
//         weekday: "long",
//         day: "numeric",
//         month: "short",
//       }),
//       value: String(date.getDay()),
//     };
//   });

//   if (loading) {
//     return (
//       <div className="rounded-[20px] border border-[#D89A3D] bg-[#FBF6EE] p-6">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <section className="relative overflow-hidden rounded-[30px] border-[1.5px] border-[#D89A3D] bg-[#FBF8F2] shadow-[0_8px_25px_rgba(191,145,73,0.08)]">
//       <div className="hidden lg:block">
//         <div
//           className="absolute inset-0 opacity-[0.05]"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
//             backgroundSize: "22px 22px",
//           }}
//         />

//         <div className="relative">
//           {/* Header */}
//           <div
//             className="grid grid-cols-[220px_1fr_220px] items-start px-4 pt-3"
//             style={{ marginLeft: "20px", marginTop: "30px" }}
//           >
//             {/* Date */}
//             <div>
//               <div className="relative w-[240px]">
//                 {/* Calendar Icon */}
//                 {/* <CalendarDays
//                 size={18}
//                 className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-[#0B6670]"
//               /> */}

//                 <select
//                   value={selectedDay}
//                   onChange={(e) => setSelectedDay(e.target.value)}
//                   className="h-[45px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#D89A3D] bg-white pr-10 pl-12 text-[15px] font-medium text-[#0B6670] shadow-sm transition outline-none focus:border-[#C9821E] focus:ring-2 focus:ring-[#F3D7A7]"
//                 >
//                   {weekDates.map((day) => (
//                     <option key={day.value} value={day.value}>
//                       {day.label}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Dropdown Arrow */}
//                 <ChevronDown
//                   size={18}
//                   className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#0B6670]"
//                 />
//               </div>
//             </div>

//             {/* Title */}
//             <div className="flex items-center justify-center gap-3">
//               <Image src="/images/lotus.png" alt="" width={42} height={42} />

//               <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
//                 Darshan Timings
//               </h2>

//               <Image src="/images/lotus.png" alt="" width={42} height={42} />
//             </div>

//             {/* Next Darshan */}
//           </div>

//           {/* Timings Row */}
//           <div className="mt-6 grid grid-cols-[1fr_240px] items-stretch px-8 pb-8">
//             <div className="mt-4 flex items-center px-2">
//               {selectedDayTimings.map((timing) => {
//                 const isActive = currentDarshan?.id === timing.id;

//                 return (
//                   <div
//                     key={timing.id}
//                     className={`flex flex-1 items-center justify-center ${
//                       !isActive
//                         ? "border-r border-[#E6D9C5] last:border-r-0"
//                         : ""
//                     }`}
//                   >
//                     {isActive ? (
//                       <div className="relative flex h-[72px] w-[78px] flex-col items-center justify-center rounded-[12px] border border-[#D89A3D] bg-[#FFF8ED]">
//                         <p className="font-cormorant text-center text-[13px] leading-[1.1] text-[#B87418]">
//                           {timing.label}
//                         </p>

//                         <p className="mt-1 text-[14px] font-semibold text-[#D18400]">
//                           {timing.opening_time}
//                         </p>

//                         <div className="absolute -bottom-[9px] rounded-full bg-[#D18400] px-2 py-[1px] text-[8px] font-semibold text-white">
//                           ONGOING
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="text-center">
//                         <p className="font-cormorant mx-auto max-w-[90px] text-center text-[14px] leading-[1.1] break-words text-[#4D433B]">
//                           {timing.label}
//                         </p>

//                         <p className="mt-1 text-[15px] font-semibold text-[#4D433B]">
//                           {timing.opening_time}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             <div
//               className="pl-4"
//               style={{ marginRight: "20px", marginBottom: "30px" }}
//             >
//               <div className="h-full rounded-[18px] border border-[#D89A3D] bg-[#F9F2E7] px-4 py-3">
//                 <p className="text-center text-[13px] text-[#C18426]">
//                   Next Darshan
//                 </p>

//                 <h3 className="font-cormorant text-center text-[24px] leading-[1.05] font-semibold text-[#4D433B]">
//                   {allDarshansCompleted
//                     ? "All Darshans Completed"
//                     : nextDarshan?.label || "No Upcoming Darshan"}
//                 </h3>

//                 <p className="mt-1 text-center text-[12px] text-[#8B7D6A]">
//                   {allDarshansCompleted
//                     ? "Today's Schedule Finished"
//                     : "Starts In"}
//                 </p>

//                 {!allDarshansCompleted && (
//                   <div className="mt-1 flex items-center justify-center gap-1">
//                     <div className="text-center">
//                       <div className="text-[18px] font-bold text-[#D18400]">
//                         {String(hours).padStart(2, "0")}
//                       </div>
//                       <div className="text-[8px] text-[#8B7D6A]">HRS</div>
//                     </div>

//                     <span className="text-[18px] font-bold text-[#D18400]">
//                       :
//                     </span>

//                     <div className="text-center">
//                       <div className="text-[18px] font-bold text-[#D18400]">
//                         {String(minutes).padStart(2, "0")}
//                       </div>
//                       <div className="text-[8px] text-[#8B7D6A]">MINS</div>
//                     </div>

//                     <span className="text-[18px] font-bold text-[#D18400]">
//                       :
//                     </span>

//                     <div className="text-center">
//                       <div className="text-[18px] font-bold text-[#D18400]">
//                         {String(seconds).padStart(2, "0")}
//                       </div>
//                       <div className="text-[8px] text-[#8B7D6A]">SECS</div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#6F675F]">
//                   <Clock3 size={10} />
//                   <span>
//                     {allDarshansCompleted
//                       ? "Please check tomorrow's timings"
//                       : `Today • ${nextDarshan?.opening_time}`}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="block lg:hidden">
//         <div className="block lg:hidden">
//           <div className="relative overflow-hidden rounded-[28px] bg-[#FFFDF9] p-5">
//             {/* Background Pattern */}
//             <div
//               className="absolute inset-0 opacity-[0.04]"
//               style={{
//                 backgroundImage:
//                   "radial-gradient(circle,#D89A3D 1px,transparent 1px)",
//                 backgroundSize: "18px 18px",
//               }}
//             />

//             <div className="relative">
//               {/* Header */}
//               <div className="mb-6">
//                 <div className="mb-5 text-center">
//                   <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
//                     Today's Darshan
//                   </h2>

//                   <p className="mt-1 text-xs text-[#8B7D6A]">
//                     Select a day to view the schedule
//                   </p>
//                 </div>

//                 {/* Day Selector */}

//                 <div className="relative mb-6">
//                   {/* <CalendarDays
//                     size={18}
//                     className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#C18426]"
//                   /> */}

//                   <select
//                     value={selectedDay}
//                     onChange={(e) => setSelectedDay(e.target.value)}
//                     className="h-12 w-full rounded-2xl border border-[#E8DAC6] bg-white px-4 pr-10 text-[15px] font-medium shadow-sm"
//                   >
//                     {weekDates.map((day) => (
//                       <option key={day.value} value={day.value}>
//                         {day.label}
//                       </option>
//                     ))}
//                   </select>

//                   <ChevronDown
//                     size={18}
//                     className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-[#C18426]"
//                   />
//                 </div>
//               </div>

//               {/* Timings */}

//               <div className="space-y-4">
//                 {selectedDayTimings.map((timing) => {
//                   const isActive = currentDarshan?.id === timing.id;

//                   return (
//                     <div
//                       key={timing.id}
//                       className={`group relative overflow-hidden rounded-[22px] border transition-all duration-300 ${
//                         isActive
//                           ? "border-[#D89A3D] bg-gradient-to-r from-[#FFF8ED] to-white shadow-[0_10px_30px_rgba(216,154,61,0.18)]"
//                           : "border-[#EFE7DB] bg-white shadow-[0_3px_12px_rgba(0,0,0,0.05)]"
//                       }`}
//                     >
//                       {/* Active Gold Line */}

//                       {isActive && (
//                         <div className="absolute top-0 left-0 h-full w-[5px] bg-[#D89A3D]" />
//                       )}

//                       <div className="p-5">
//                         {/* Top */}

//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             {isActive && (
//                               <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0B8A4A]/10 px-3 py-1">
//                                 <span className="h-2 w-2 animate-pulse rounded-full bg-[#0B8A4A]" />

//                                 <span className="text-[11px] font-semibold tracking-wider text-[#0B8A4A] uppercase">
//                                   Live Darshan
//                                 </span>
//                               </div>
//                             )}

//                             <h3 className="font-cormorant text-[26px] leading-tight text-[#40352D]">
//                               {timing.label}
//                             </h3>
//                           </div>

//                           <ChevronRight
//                             size={20}
//                             className="mt-2 text-[#C7B49A]"
//                           />
//                         </div>

//                         {/* Bottom */}

//                         <div className="mt-5 flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF4E2]">
//                               <Clock3 size={18} className="text-[#D89A3D]" />
//                             </div>

//                             <div>
//                               <p className="text-[11px] tracking-[2px] text-[#A58E73] uppercase">
//                                 Starts
//                               </p>

//                               <p className="text-[17px] font-semibold text-[#0B6670]">
//                                 {timing.opening_time}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="text-right">
//                             <p className="text-[11px] tracking-[2px] text-[#A58E73] uppercase">
//                               Ends
//                             </p>

//                             <p className="text-[15px] font-semibold text-[#7B6957]">
//                               {timing.closing_time}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Next Darshan */}

//               <div className="mt-8 overflow-hidden rounded-[30px] border border-[#EFD4A7] bg-gradient-to-br from-[#FFF7EB] to-[#FDF1DD] p-6 shadow-lg">
//                 <p className="text-center text-[12px] font-medium tracking-[2px] text-[#C18426] uppercase">
//                   Next Darshan
//                 </p>

//                 <h3 className="font-cormorant mt-2 text-center text-[34px] leading-none font-semibold text-[#4D433B]">
//                   {allDarshansCompleted
//                     ? "Completed"
//                     : nextDarshan?.label || "No Upcoming"}
//                 </h3>

//                 {!allDarshansCompleted && (
//                   <div className="mt-6 flex items-center justify-center gap-3">
//                     {/* Hours */}

//                     <div className="w-[74px] rounded-2xl bg-white py-3 shadow">
//                       <div className="text-center text-[30px] font-bold text-[#D18400]">
//                         {String(hours).padStart(2, "0")}
//                       </div>

//                       <div className="text-center text-[10px] tracking-widest text-[#8B7D6A]">
//                         HRS
//                       </div>
//                     </div>

//                     <div className="text-[28px] font-bold text-[#D18400]">
//                       :
//                     </div>

//                     {/* Minutes */}

//                     <div className="w-[74px] rounded-2xl bg-white py-3 shadow">
//                       <div className="text-center text-[30px] font-bold text-[#D18400]">
//                         {String(minutes).padStart(2, "0")}
//                       </div>

//                       <div className="text-center text-[10px] tracking-widest text-[#8B7D6A]">
//                         MIN
//                       </div>
//                     </div>

//                     <div className="text-[28px] font-bold text-[#D18400]">
//                       :
//                     </div>

//                     {/* Seconds */}

//                     <div className="w-[74px] rounded-2xl bg-white py-3 shadow">
//                       <div className="text-center text-[30px] font-bold text-[#D18400]">
//                         {String(seconds).padStart(2, "0")}
//                       </div>

//                       <div className="text-center text-[10px] tracking-widest text-[#8B7D6A]">
//                         SEC
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="mt-6 flex justify-center">
//                   <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm">
//                     <Clock3 size={14} className="text-[#D89A3D]" />

//                     <span className="text-[12px] font-medium text-[#6E675F]">
//                       {allDarshansCompleted
//                         ? "Today's schedule finished"
//                         : `Today • ${nextDarshan?.opening_time}`}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import { Clock3, ChevronDown, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTempleTimings } from "@/store/slices/templeTimingsSlice";
import { useEffect, useState } from "react";

interface DarshanTimingsProps {
  templeId: string;
}

export default function DarshanTimings({ templeId }: DarshanTimingsProps) {
  const dispatch = useAppDispatch();
  const { darshan } = useAppSelector((state) => state.hero);
  const { timings, loading } = useAppSelector((state) => state.templeTimings);

  useEffect(() => {
    if (templeId) {
      dispatch(fetchTempleTimings(templeId));
    }
  }, [dispatch, templeId]);

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
  const currentDarshan =
    selectedDayTimings.find((timing) => {
      const start = timeToSeconds(timing.opening_time);
      const end = timeToSeconds(timing.closing_time);

      return currentTimeInSeconds >= start && currentTimeInSeconds <= end;
    }) || null;

  const nextDarshan =
    selectedDayTimings.find((timing) => {
      const start = timeToSeconds(timing.opening_time);

      return start > currentTimeInSeconds;
    }) || null;

  //   const activeDarshan = currentDarshan || nextDarshan;

  const allDarshansCompleted =
    selectedDayTimings.length > 0 &&
    currentTimeInSeconds >
      timeToSeconds(
        selectedDayTimings[selectedDayTimings.length - 1].closing_time,
      );

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
    <section className="relative overflow-hidden rounded-[30px] border-[1.5px] border-[#D89A3D] bg-[#FBF8F2] shadow-[0_8px_25px_rgba(191,145,73,0.08)]">
      <div className="hidden lg:block">
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
              <div className="relative w-[240px]">
                {/* Calendar Icon */}
                {/* <CalendarDays
                size={18}
                className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-[#0B6670]"
              /> */}

                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="h-[45px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#D89A3D] bg-white pr-10 pl-12 text-[15px] font-medium text-[#0B6670] shadow-sm transition outline-none focus:border-[#C9821E] focus:ring-2 focus:ring-[#F3D7A7]"
                >
                  {weekDates.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>

                {/* Dropdown Arrow */}
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#0B6670]"
                />
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
          <div className="mt-6 grid grid-cols-[1fr_240px] items-stretch px-8 pb-8">
            <div className="mt-4 flex items-center px-2">
              {selectedDayTimings.map((timing) => {
                const isActive = currentDarshan?.id === timing.id;

                return (
                  <div
                    key={timing.id}
                    className={`flex flex-1 items-center justify-center ${
                      !isActive
                        ? "border-r border-[#E6D9C5] last:border-r-0"
                        : ""
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
      </div>

      <div className="block lg:hidden">
        <div
          className="relative overflow-hidden rounded-[28px] bg-[#FFFDF9] p-5"
          style={{ marginTop: "10px" }}
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle,#D89A3D 1px,transparent 1px)",
              backgroundSize: "18px 18px",
            }}
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
                  className="h-12 w-full rounded-2xl border border-[#E8DAC6] bg-white px-4 pr-10 text-[15px] font-medium shadow-sm"
                >
                  {weekDates.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-[#C18426]"
                />
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
                        : "border-[#EFE7DB] bg-white shadow-[0_3px_12px_rgba(0,0,0,0.05)]"
                    }`}
                  >
                    {/* Active Gold Line */}

                    {isActive && (
                      <div className="absolute top-0 left-0 h-full w-[5px] bg-[#D89A3D]" />
                    )}

                    <div className="p-5">
                      {/* Top */}

                      <div className="p-5">
                        {isActive && (
                          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0B8A4A]/10 px-3 py-1">
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

            <div className="mt-8 overflow-hidden rounded-[30px] border border-[#EFD4A7] bg-gradient-to-br from-[#FFF7EB] to-[#FDF1DD] p-6 shadow-lg">
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
                <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm">
                  <Clock3 size={14} className="text-[#D89A3D]" />

                  <span className="text-[12px] font-medium text-[#6E675F]">
                    {allDarshansCompleted
                      ? "Today's schedule finished"
                      : `Today • ${nextDarshan?.opening_time}`}
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
