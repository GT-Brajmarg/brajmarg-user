"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setLanguage } from "@/store/slices/subscriptionSlice";
import { cormorant } from "@/lib/fonts";

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
  }, [dispatch, selected]);

  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#FAF3E8]/80 p-4 sm:p-5 shadow-xs">
      {/* Heading */}
      <h2 className={`${cormorant.className} text-[18px] sm:text-[20px] font-bold text-[#0F5C66] leading-tight`}>
        Choose your preferred language
      </h2>

      {/* Options */}
      <div className="mt-3.5 grid grid-cols-3 gap-2.5">
        {languages.map((item) => {
          const active = selected === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelected(item.id);
                dispatch(setLanguage(item.title));
              }}
              className={`relative flex flex-col items-center justify-center rounded-[12px] border p-2.5 sm:p-3 transition-all duration-200 cursor-pointer ${
                active
                  ? "border-[#0F5C66] bg-[#F5ECE1]/40 shadow-xs"
                  : "border-[#D9B67A] bg-transparent hover:border-[#C37000]"
              }`}
            >
              {/* Checkbox */}
              <div
                className={`absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-[3px] border transition-colors ${
                  active ? "border-[#0F5C66] bg-[#0F5C66]" : "border-[#D9B67A] bg-transparent"
                }`}
              >
                {active && (
                  <Check size={11} strokeWidth={3} className="text-white" />
                )}
              </div>

              {/* Icon */}
              <div className="my-1 flex h-10 w-10 items-center justify-center">
                <Image src={item.image} alt={item.title} width={38} height={38} className="object-contain" />
              </div>

              {/* Label */}
              <span className={`${cormorant.className} mt-1 text-[15px] sm:text-[16px] font-semibold text-[#2C241E]`}>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

