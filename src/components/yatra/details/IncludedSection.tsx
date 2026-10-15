"use client";

import Image from "next/image";

const inclusions = [
  {
    image: "/images/transport.svg",
    title: "Premium Urbania",
    subtitle: "17 Seater",
  },
  {
    image: "/images/manager.svg",
    title: "Experienced",
    subtitle: "Driver",
  },
  {
    image: "/images/fuel.svg",
    title: "Fuel & Driver",
    subtitle: "Allowance",
  },
  {
    image: "/images/parking.svg",
    title: "Toll Tax, Parking",
    subtitle: "& Permits",
  },
  {
    image: "/images/water-bottle.svg",
    title: "Water",
    subtitle: "Bottles",
  },
  {
    image: "/images/first-aid.svg",
    title: "First Aid",
    subtitle: "Kit",
  },
  {
    image: "/images/music.svg",
    title: "Music System",
    subtitle: "& Charging Points",
  },
  {
    image: "/images/accommodation.svg",
    title: "Accommodation",
    subtitle: "(Triple/Quad Sharing)",
  },
  {
    image: "/images/meals-1.svg",
    title: "All Meals",
    subtitle: "(Veg)",
  },
];

export default function IncludedSection() {
  return (
    <section className="flex h-full flex-col justify-between rounded-[18px] border border-[#C37000] bg-[#EFDEC7]/40 p-5 sm:p-6">
      <h2 className="font-cormorant text-[28px] sm:text-[30px] font-bold text-[#0F5C66] mb-4">
        What's Included
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4 my-auto">
        {inclusions.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center">
              <Image src={item.image} alt={item.title} width={34} height={34} className="h-8 w-8 object-contain" />
            </div>

            <div>
              <h3 className="font-cormorant text-[16px] font-bold text-[#3D352F] leading-tight">
                {item.title}
              </h3>

              <p className="font-cormorant text-[14px] text-[#5D5044] leading-tight">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
