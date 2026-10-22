"use client";

import { useState } from "react";
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

interface PackageSelectionProps {
  slug?: string;
}

export default function PackageSelection({ slug = "braj-yatra" }: PackageSelectionProps) {
  return (
    <section className="py-4">
      <div className="mb-6 flex items-center justify-center gap-3">
        <Image src="/images/lotus_bright.png" alt="" width={48} height={48} className="h-9 w-9 object-contain" />

        <h2 className="font-cormorant text-[32px] sm:text-[36px] font-bold text-[#0F5C66]">
          Choose Your Package
        </h2>

        <Image src="/images/lotus_bright.png" alt="" width={48} height={48} className="h-9 w-9 object-contain" />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            slug={slug}
          />
        ))}
      </div>
    </section>
  );
}

