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
    <section className="rounded-[20px] border-2 border-[#C37000] bg-[#EFDEC7]/20 p-6">
      <h2
        className="font-cormorant text-[32px] font-bold text-[#0F5C66]"
        style={{ marginLeft: "20px" }}
      >
        What's Included
      </h2>

      <div
        className="mt-8 grid grid-cols-3 gap-y-8"
        style={{ marginLeft: "20px", marginBottom: "10px" }}
      >
        {inclusions.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <Image src={item.image} alt={item.title} width={42} height={42} />

            <div>
              <h3 className="font-cormorant text-[22px] font-semibold text-[#3D352F]">
                {item.title}
              </h3>

              <p className="font-cormorant text-[20px] leading-5 text-[#5D5044]">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
