"use client";

import Image from "next/image";
import PackageCard from "./PackageCard";

const packages = [
  {
    id: 1,
    name: "Basic",
    subtitle: "Essential & Value for Money",
    price: 2499,
    popular: false,
    features: [
      "AC Travel (17 Seater)",
      "Experienced Driver",
      "Toll, Parking & Fuel",
      "Water Bottles",
    ],
  },
  {
    id: 2,
    name: "Standard",
    subtitle: "Comfort & Convenience",
    price: 3999,
    popular: true,
    features: [
      "AC Travel (17 Seater)",
      "Satvik Meals (Breakfast, Lunch, Dinner)",
      "Comfortable Stay",
      "Toll, Parking & Fuel",
      "Water Bottles",
    ],
  },
  {
    id: 3,
    name: "Premium",
    subtitle: "Luxury & Divine Experience",
    price: 5999,
    popular: false,
    features: [
      "AC Travel (17 Seater)",
      "Satvik Meals (Premium)",
      "Premium Stay",
      "VIP Darshan (Wherever Available)",
      "Guided Temple Visits",
    ],
  },
];

export default function PackageSelection() {
  return (
    <section className="py-10" style={{ marginTop: "20px" }}>
      <div className="mb-10 flex items-center justify-center gap-3">
        <Image src="/images/lotus.png" alt="" width={48} height={48} />

        <h2 className="font-cormorant text-[36px] font-bold text-[#0F5C66]">
          Choose Your Package
        </h2>

        <Image src="/images/lotus.png" alt="" width={48} height={48} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3" style={{ marginTop: "20px" }}>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
