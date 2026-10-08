"use client";

import Image from "next/image";
import { CalendarDays, Check, Star } from "lucide-react";
import { useState } from "react";
import { Cormorant_Infant, Inter } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

export default function BirthdayBlessingCard() {
  const [birthdayEnabled, setBirthdayEnabled] = useState(true);
  return (
    <div
      className="rounded-[14px] border border-[#C37000] p-4"
      style={{ marginLeft: "20px", marginRight: "20px", marginBottom: "10px" }}
    >
      <div className="grid grid-cols-[70px_1fr_220px] gap-4">
        {/* Icon */}

        <div
          className="flex h-[75px] w-[75px] items-center justify-center rounded-full border border-[#C37000]"
          style={{ marginTop: "20px", marginLeft: "10px" }}
        >
          <Image
            src="/images/birthday-cake.svg"
            alt="Birthday"
            width={40}
            height={40}
          />
        </div>

        {/* Content */}

        <div style={{ marginLeft: "10px", marginTop: "10px" }}>
          <h3
            className={`${cormorantInfant.className} text-[26px] font-bold text-[#0F5C66]`}
          >
            Birthday Blessings
          </h3>

          <p
            className={`${cormorantInfant.className} mt-1 text-[18px] leading-4 font-bold text-[#3D352F]`}
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            Celebrate your special day with personalized seva and temple
            recommendations.
          </p>

          {/* Date */}

          <div className="relative mt-3" style={{ marginTop: "5px" }}>
            <h3
              className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
            >
              Birthday
            </h3>
            <input
              placeholder="Select your Birthday"
              style={{ paddingLeft: "10px" }}
              className={`${inter.className} h-[36px] w-full rounded-md border border-[#D89A3D] px-3 pr-10 text-[13px] outline-none`}
            />

            <Image
              src="/images/date.svg"
              alt="Date"
              width={16}
              height={16}
              className="absolute top-12 right-3 -translate-y-1/2"
            />
          </div>

          {/* Toggle */}

          <button
            type="button"
            onClick={() => setBirthdayEnabled(!birthdayEnabled)}
            style={{ marginTop: "10px", marginBottom: "20px" }}
            className="mt-3 flex h-[42px] w-full items-center rounded-[10px] border border-[#0F5C66] bg-[#0F5C66]/20 px-3 transition-all"
          >
            {/* Toggle */}
            <div
              className={`relative h-6 w-12 rounded-full transition-all ${
                birthdayEnabled ? "bg-[#0F5C66]" : "bg-[#B8C7C4]"
              }`}
              style={{ marginLeft: "10px" }}
            >
              <div
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                  birthdayEnabled ? "left-7" : "left-1"
                }`}
              />
            </div>

            {/* Label */}
            <span
              className={`${cormorantInfant.className} ml-3 text-[20px] text-[#0F5C66]`}
              style={{ marginLeft: "10px" }}
            >
              Enable Birthday Blessings
            </span>
          </button>
        </div>

        {/* Benefits */}

        <div
          className="rounded-xl border border-[#0F5C66] bg-[#0F5C66]/20 p-3"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            marginRight: "20px",
          }}
        >
          <h4
            className={`${cormorantInfant.className} text-[18px] font-bold text-[#0F5C66]`}
            style={{ marginTop: "5px", marginLeft: "10px" }}
          >
            When your birthday approaches, BrajMarg will:
          </h4>

          <div
            className="mt-3 space-y-2"
            style={{
              marginLeft: "10px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            {[
              "Suggest sevas from your followed temples",
              "Recommend special prasad offerings",
              "Send reminders before your birthday",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Image
                  src="/images/star-1.svg"
                  alt="Star"
                  width={12}
                  height={12}
                  className="mt-1 shrink-0"
                  style={{ marginTop: "2px" }}
                />

                <p
                  className={`${inter.className} text-[12px] leading-4 text-[#3D352F]`}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
