"use client";

import { cormorantInfant } from "@/lib/fonts";

const itinerary = [
  {
    day: "Day 1",
    title: "Nathdwara → Vrindavan",
    description:
      "Shrinathji Darshan • Departure to Vrindavan • En-route sightseeing • Evening Aarti • Dinner • Stay in Vrindavan",
  },
  {
    day: "Day 2",
    title: "Vrindavan Darshan",
    description:
      "Morning darshan at Banke Bihari Temple • Prem Mandir Visit • ISKCON Temple • Yamuna Aarti at Kesi Ghat • Dinner • Stay in Vrindavan",
  },
  {
    day: "Day 3",
    title: "Gokul & Barsana",
    description:
      "Gokul Nath Temple • Raman Reti • Barsana (Radha Rani Temple) • Local sightseeing • Dinner • Stay in Vrindavan",
  },
  {
    day: "Day 4",
    title: "Govardhan & Nandgaon",
    description:
      "Govardhan Parikrama • Mansi Ganga • Nandgaon Visit • Return to Vrindavan • Dinner • Stay in Vrindavan",
  },
  {
    day: "Day 5",
    title: "Vrindavan Local Exploration",
    description:
      "Seva Kunj • Rang Mahal • Local Braj Temples & Markets • Evening Aarti • Dinner • Stay in Vrindavan",
  },
];

export default function DayWiseItinerary() {
  return (
    <section className="rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/20 p-3.5 sm:p-5 md:p-6 mt-5">
      <h2 className="font-cormorant text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#0F5C66] px-1 sm:px-2">
        Day-wise Itinerary
      </h2>

      <div className="mt-3 sm:mt-4 divide-y divide-[#E7D6B5]">
        {itinerary.map((item) => (
          <div
            key={item.day}
            className="grid grid-cols-[55px_1fr] sm:grid-cols-[70px_1fr] gap-2.5 sm:gap-4 py-3.5 sm:py-4 px-1 sm:px-2"
          >
            <div
              className={`${cormorantInfant.className} text-[16px] sm:text-[18px] font-bold text-[#C37000]`}
            >
              {item.day}
            </div>

            <div>
              <h3
                className={`${cormorantInfant.className} text-[16px] sm:text-[18px] font-bold text-[#3F3125] leading-snug`}
              >
                {item.title}
              </h3>

              <p
                className={`${cormorantInfant.className} mt-1 text-[14px] sm:text-[15px] leading-relaxed font-semibold text-[#5F5347]`}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
