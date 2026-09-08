"use client";

import Image from "next/image";
import {
  Bell,
  CalendarDays,
  HandCoins,
  ShoppingBag,
  Bus,
  Landmark,
} from "lucide-react";

const alertCategories = [
  {
    title: "Temple Updates",
    description: "Darshan timings, aarti schedules, temple notices and more.",
    image: "/images/alert-temple.svg",
    active: true,
  },
  {
    title: "Festival Alerts",
    description:
      "Never miss Ekadashi, Janmashtami, Holi or special celebrations.",
    image: "/images/alert-festival.svg",
  },
  {
    title: "Seva & Prasad",
    description:
      "Know when seva slots open and prasad is available for booking.",
    image: "/images/alert-seva.svg",
  },
  {
    title: "Yatra Updates",
    description:
      "Receive updates on yatra bookings, schedule changes and reminders.",
    image: "/images/alert-yatra.svg",
  },
  {
    title: "Shop Updates",
    description:
      "Be the first to know about new arrivals, offers and festival collections.",
    image: "/images/alert-shop.svg",
  },
  {
    title: "Personalized Alerts",
    description: "Choose the temples and alerts that matter most to you.",
    image: "/images/alert-personalized.svg",
  },
];

export default function AlertCategories() {
  return (
    <section className="relative">
      {/* Heading */}
      <div
        className="mb-10 flex items-center justify-center gap-4"
        style={{ marginTop: "30px", marginBottom: "20px" }}
      >
        <Image src="/images/lotus.png" alt="" width={54} height={36} />

        <h2 className="font-cormorant text-[42px] font-bold text-[#0F5C66]">
          Get Notified About
        </h2>

        <Image src="/images/lotus.png" alt="" width={54} height={36} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
        {alertCategories.map((item) => (
          <div
            key={item.title}
            className={`group flex flex-col items-center rounded-[20px] border bg-[#EFDEC7]/20 p-6 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              item.active
                ? "border-[#C37000]/60 shadow-md"
                : "border-[#C37000]/60 hover:border-[#C37000]"
            }`}
          >
            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={72}
                height={72}
                className="object-contain"
                style={{ marginTop: "20px" }}
              />
            </div>

            {/* Title */}
            <h3
              className="font-cormorant mt-5 text-center text-[22px] leading-tight font-bold text-[#3D352F]"
              style={{ marginTop: "20px" }}
            >
              {item.title}
            </h3>

            {/* Divider */}
            <div
              className="my-3 flex justify-center"
              style={{ marginTop: "10px" }}
            >
              <Image
                src="/images/lotus-divider-1.svg"
                alt=""
                width={121}
                height={12}
              />
            </div>

            {/* Description */}
            <p
              className="font-cormorant text-center text-[16px] leading-[1.45] font-semibold text-[#3D352F]"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
