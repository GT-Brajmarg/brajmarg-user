"use client";

import ActivityItem from "./ActivityItem";

const activities = [
  {
    title: "Your Prasad has been shipped.",
    date: "15 July 2026, 10:30 AM",
  },
  {
    title: "Rajbhog Seva booked at Shri Banke Bihari Temple",
    date: "10 July 2026, 11:00 AM",
  },
  {
    title: "Birthday Blessings is enabled",
    date: "5 July 2026, 03:30 AM",
  },
  {
    title: "Your Order has been dispatched.",
    date: "24 June 2026, 10:30 AM",
  },
];

import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RecentActivity() {
  return (
    <section
      className="p-6"
      style={{ marginTop: "30px", marginBottom: "20px" }}
    >
      <h2
        className={`${cormorantInfant.className} text-[20px] font-bold text-[#0F5C66]`}
      >
        Recent Activity
      </h2>

      <div className="mt-5 space-y-5">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            title={activity.title}
            date={activity.date}
          />
        ))}
      </div>
    </section>
  );
}
