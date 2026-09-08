"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { setLanguage } from "@/store/slices/subscriptionSlice";
const languages = [
  {
    id: "english",
    title: "English",
    image: "/images/english-1.png",
  },
  {
    id: "hindi",
    title: "Hindi",
    image: "/images/hindi.png",
  },
  {
    id: "both",
    title: "Both",
    image: "/images/language-both.png",
  },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState("both");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setLanguage(languages.find((l) => l.id === selected)?.title ?? ""),
    );
  }, [dispatch]);

  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#C37000]/4 p-5">
      {/* Heading */}

      <h2
        className="font-cormorant text-[24px] leading-tight font-semibold text-[#0F5C66]"
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Choose your preferred language
      </h2>

      {/* Options */}

      <div
        className="mt-5 grid grid-cols-3 gap-3"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        {languages.map((item) => {
          const active = selected === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setSelected(item.id);
                dispatch(setLanguage(item.title));
              }}
              className={`relative flex flex-col items-center rounded-[12px] border p-4 transition-all duration-300 ${
                active
                  ? "border-[#0F5C66]"
                  : "border-[#D7B06B] hover:border-[#C37000]"
              }`}
              style={{ marginTop: "10px" }}
            >
              {/* Checkbox */}

              <div
                className={`absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm border ${
                  active ? "border-[#0F5C66] bg-[#0F5C66]" : "border-[#D7B06B]"
                }`}
              >
                {active && (
                  <Check size={12} strokeWidth={3} className="text-white" />
                )}
              </div>

              {/* Icon */}

              <Image src={item.image} alt={item.title} width={46} height={46} />

              {/* Label */}

              <span className="font-cormorant mt-3 text-[18px] font-semibold text-[#3D352F]">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
