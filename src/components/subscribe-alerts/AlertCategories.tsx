"use client";

import Image from "next/image";

const alertCategories = [
  {
    title: "Temple Updates",
    description: "Darshan timings, aarti schedules, temple notices and more.",
    image: "/images/alert-temple.svg",
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
    <section className="relative px-4 py-8 md:px-8">
      {/* Heading */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <Image src="/images/lotus_bright.png" alt="" width={48} height={48} />
        <h2 className="font-cormorant text-[36px] font-bold text-[#0F5C66] md:text-[42px]">
          Get Notified About
        </h2>
        <Image src="/images/lotus_bright.png" alt="" width={48} height={48} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {alertCategories.map((item) => (
          <div
            key={item.title}
            className="group flex flex-col items-center rounded-[20px] border border-[#C37000]/60 bg-[#EFDEC7]/20 px-4 py-6 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="font-cormorant mt-4 text-center text-[18px] font-bold leading-tight text-[#3D352F] md:text-[20px]">
              {item.title}
            </h3>

            {/* Divider */}
            <div className="my-2 flex justify-center">
              <Image
                src="/images/lotus-divider-1.svg"
                alt=""
                width={100}
                height={12}
              />
            </div>

            {/* Description */}
            <p className="font-cormorant text-center text-[14px] font-semibold leading-[1.45] text-[#3D352F] md:text-[15px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
