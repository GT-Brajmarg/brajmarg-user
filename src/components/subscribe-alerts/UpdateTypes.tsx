"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Check, Bell } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setUpdateTypes } from "@/store/slices/subscriptionSlice";
import { cormorant } from "@/lib/fonts";

type UpdateType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const updateTypes: UpdateType[] = [
  {
    id: "darshan",
    title: "Darshan Timings",
    description: "Get notified about darshan timings and temple updates.",
    image: "/images/darshan.svg",
  },
  {
    id: "festival",
    title: "Festival Alerts",
    description:
      "Receive updates on Ekadashi, Janmashtami and other festivals.",
    image: "/images/festival.svg",
  },
  {
    id: "aarti",
    title: "Aarti Reminders",
    description: "Never miss aarti ceremonies and special prayers.",
    image: "/images/aarti.svg",
  },
  {
    id: "yatra",
    title: "Yatra Updates",
    description: "Stay informed about yatra schedules and announcements.",
    image: "/images/yatra.svg",
  },
  {
    id: "prasad",
    title: "Prasad Dispatch",
    description: "Get updates on prasad booking and dispatch status.",
    image: "/images/prasad.svg",
  },
  {
    id: "seva",
    title: "Seva Availability",
    description: "Know when seva bookings are available.",
    image: "/images/seva.svg",
  },
];

export default function UpdateTypes() {
  const [selected, setSelected] = useState<string[]>([
    "darshan",
    "festival",
    "aarti",
    "yatra",
    "seva",
  ]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUpdateTypes(selected));
  }, []);

  const toggle = (id: string) => {
    const updated = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    setSelected(updated);
    dispatch(setUpdateTypes(updated));
  };

  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#FAF3E8]/80 p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <Bell size={22} className="text-[#C37000] shrink-0" strokeWidth={2} />

        <h2 className={`${cormorant.className} text-[24px] sm:text-[26px] font-bold text-[#0F5C66] leading-tight`}>
          Types of Updates
        </h2>
      </div>

      <p className={`${cormorant.className} mt-1 text-[15px] sm:text-[16px] text-[#5C4C3E]`}>
        Choose the types of updates you want to receive.
      </p>

      {/* Cards Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {updateTypes.map((item) => {
          const active = selected.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`group relative flex flex-col items-center rounded-[12px] border p-4 text-center transition-all duration-200 cursor-pointer ${active
                ? "border-[#0F5C66] bg-[#F5ECE1]/40 shadow-xs"
                : "border-[#D9B67A] bg-transparent hover:border-[#C37000]"
                }`}
            >
              {/* Checkbox */}
              <div
                className={`absolute top-2.5 right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-[4px] border transition-colors ${active ? "border-[#0F5C66] bg-[#0F5C66]" : "border-[#D9B67A] bg-transparent"
                  }`}
              >
                {active && (
                  <Check size={12} strokeWidth={3} className="text-white" />
                )}
              </div>

              {/* Icon */}
              <div className="my-1.5 flex h-12 w-12 items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className={`${cormorant.className} mt-1.5 text-[17px] sm:text-[18px] font-semibold text-[#2C241E] leading-tight`}>
                {item.title}
              </h3>

              {/* Divider */}
              <div className="my-1.5 flex items-center justify-center gap-1.5 w-full">
                <div className="h-px w-6 bg-[#D8B06E]" />
                <div className="h-1 w-1 rounded-full bg-[#D8B06E]" />
                <div className="h-px w-6 bg-[#D8B06E]" />
              </div>

              {/* Description */}
              <p className={`${cormorant.className} text-[13px] sm:text-[13.5px] leading-snug text-[#6B5C4D]`}>
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

