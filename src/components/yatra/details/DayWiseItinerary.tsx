"use client";

import { Cormorant_Infant } from "next/font/google";

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-infant",
});

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
    <section
      className="rounded-[18px] border-2 border-[#C37000] bg-[#EFDEC7]/20 p-5"
      style={{ marginTop: "20px" }}
    >
      <h2
        className="font-cormorant text-[32px] font-bold text-[#0F5C66]"
        style={{ marginLeft: "20px" }}
      >
        Day-wise Itinerary
      </h2>

      <div className="mt-4" style={{ marginTop: "10px", marginBottom: "10px" }}>
        {itinerary.map((item, index) => (
          <div
            key={item.day}
            className={`grid grid-cols-[70px_1fr] gap-4 py-4 ${
              index !== itinerary.length - 1 ? "border-b border-[#E7D6B5]" : ""
            }`}
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <div
              className={`${cormorantInfant.className} text-[20px] font-bold text-[#C37000]`}
            >
              {item.day}
            </div>

            <div>
              <h3
                className={`${cormorantInfant.className} text-[20px] font-bold text-[#3F3125]`}
              >
                {item.title}
              </h3>

              <p
                className={`${cormorantInfant.className} mt-1 text-[16px] leading-6 font-bold text-[#5F5347]`}
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
