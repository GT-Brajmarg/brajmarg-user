"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { setFrequency } from "@/store/slices/subscriptionSlice";

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
    <section className="rounded-[18px] border border-[#C37000] bg-[#C370000A]/4 p-5">
      {/* Heading */}

      <h2
        className="font-cormorant text-[24px] font-semibold text-[#0F5C66]"
        style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }}
      >
        How often would you like to receive updates?
      </h2>

      {/* Options */}

      <div
        className="mt-5 space-y-3"
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "20px",
        }}
      >
        {frequencies.map((item) => {
          const active = selected === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setSelected(item.id);
                dispatch(setFrequency(item.title));
              }}
              className={`relative flex w-full items-center gap-4 rounded-[12px] border p-4 text-left transition-all duration-300 ${
                active
                  ? "border-[#0F5C66]"
                  : "border-[#D7B06B] hover:border-[#C37000]"
              }`}
              style={{ marginTop: "10px" }}
            >
              {/* Icon */}

              <Image
                src={item.image}
                alt={item.title}
                width={38}
                height={38}
                style={{ marginLeft: "10px" }}
              />

              {/* Text */}

              <div className="flex-1">
                <h3
                  className="font-cormorant text-[19px] font-semibold text-[#3D352F]"
                  style={{ marginTop: "10px" }}
                >
                  {item.title}
                </h3>

                <p
                  className="font-cormorant mt-1 text-[14px] leading-4 text-[#6B5C4D]"
                  style={{ marginBottom: "10px" }}
                >
                  {item.description}
                </p>
              </div>

              {/* Checkbox */}

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-sm border ${
                  active ? "border-[#0F5C66] bg-[#0F5C66]" : "border-[#D7B06B]"
                }`}
                style={{ marginRight: "10px" }}
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
