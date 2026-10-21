"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setFrequency } from "@/store/slices/subscriptionSlice";
import { cormorant } from "@/lib/fonts";

const frequencies = [
  {
    id: "every",
    title: "Every Update",
    description: "One summary of all updates every day",
    image: "/images/every-update.svg",
  },
  {
    id: "important",
    title: "Important Only",
    description: "Only important alerts and announcements",
    image: "/images/important.svg",
  },
  {
    id: "daily",
    title: "Daily Summary",
    description: "One summary of all updates once a day",
    image: "/images/daily-summary.svg",
  },
];

export default function FrequencySelector() {
  const [selected, setSelected] = useState("every");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFrequency(frequencies[0].title));
  }, [dispatch]);

  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#FAF3E8]/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Heading */}
      <h2 className={`${cormorant.className} text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight`}>
        How often would you like to receive updates?
      </h2>

      {/* Options */}
      <div className="mt-4 space-y-2.5">
        {frequencies.map((item) => {
          const active = selected === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelected(item.id);
                dispatch(setFrequency(item.title));
              }}
              className={`flex w-full items-center gap-3.5 rounded-[12px] border p-3 sm:p-3.5 text-left transition-all duration-200 cursor-pointer ${active
                  ? "border-[#0F5C66] bg-[#F5ECE1]/40 shadow-xs"
                  : "border-[#D9B67A] bg-transparent hover:border-[#C37000]"
                }`}
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className={`${cormorant.className} text-[17px] sm:text-[18px] font-semibold text-[#2C241E] leading-tight`}>
                  {item.title}
                </h3>

                <p className={`${cormorant.className} mt-0.5 text-[12.5px] sm:text-[13px] leading-tight text-[#6B5C4D]`}>
                  {item.description}
                </p>
              </div>

              {/* Checkbox */}
              <div
                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${active ? "border-[#0F5C66] bg-[#0F5C66]" : "border-[#D9B67A] bg-transparent"
                  }`}
              >
                {active && (
                  <Check size={12} strokeWidth={3} className="text-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

