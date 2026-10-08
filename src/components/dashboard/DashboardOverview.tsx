"use client";

import { Package, HeartHandshake, Map, Crown } from "lucide-react";
import OverviewCard from "./OverviewCard";

const overview = [
  {
    icon: "/images/orders-icon.svg",
    title: "Orders",
    value: "2 Active",
    subtitle: "View details in My Orders",
    iconBg: "#FBE7C5",
  },
  {
    icon: "/images/seva-icon.svg",
    title: "Sevas",
    value: "1 Upcoming",
    subtitle: "Next Tomorrow",
    iconBg: "#F4E6FF",
  },
  {
    icon: "/images/yatra-icon.svg",
    title: "Yatras",
    value: "No Upcoming",
    subtitle: "Plan your next journey",
    iconBg: "#DDF6F6",
  },
  {
    icon: "/images/subscription-icon.svg",
    title: "Subscription",
    value: "Yearly Active",
    subtitle: "Renews on 9 Jul 2027",
    iconBg: "#FBE7C5",
  },
];
export default function DashboardOverview() {
  return (
    <section style={{ marginTop: "30px" }}>
      <h2 className="font-cormorant text-[20px] font-bold text-[#0F5C66]">
        Account Overview
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {overview.map((item) => (
          <OverviewCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
