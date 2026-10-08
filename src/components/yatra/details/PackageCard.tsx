"use client";

import { CircleCheck } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  pkg: {
    id: number;
    name: string;
    subtitle: string;
    price: number;
    popular: boolean;
    features: string[];
  };
}

export default function PackageCard({ pkg }: Props) {
  return (
    <div
      className={`relative rounded-[20px] border-[#0F5C66] bg-[#0F5C66]/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        pkg.popular
          ? "border-4 border-[#0F5C66] shadow-lg"
          : "border-2 border-[#0F5C66]"
      }`}
    >
      <h3
        className="font-cormorant text-[32px] font-bold text-[#0F5C66]"
        style={{ marginLeft: "10px" }}
      >
        {pkg.name}
      </h3>
      <p
        className="font-cormorant text-[24px] font-bold text-[#C37000]"
        style={{ marginLeft: "10px" }}
      >
        {pkg.subtitle}
      </p>
      <div className="mt-5 flex items-end" style={{ marginLeft: "10px" }}>
        <span
          className={`${cormorantInfant.className} text-[36px] font-bold text-[#0F5C66]`}
        >
          ₹{pkg.price.toLocaleString()}
        </span>

        <span
          className={`${cormorantInfant.className} mb-2 ml-1 text-[20px] font-bold text-[#3D352F]`}
        >
          /person
        </span>
      </div>
      <div
        className="mt-6 space-y-4"
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10PX" }}
      >
        {pkg.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <CircleCheck size={20} className="mt-1 shrink-0 text-[#C37000]" />

            <span className={`text-[16px] text-[#3D352F]`}>{feature}</span>
          </div>
        ))}
      </div>
      <button
        className={`${cormorantInfant.className} mt-8 h-[50px] w-[330PX] rounded-xl border py-3 text-[28px] font-bold transition-all ${
          pkg.popular
            ? "border-[#0F5C66] bg-[#0F5C66] text-[#EFDEC7] hover:bg-[#0c4b52]"
            : "border-[#0F5C66] bg-transparent text-[#0F5C66] hover:bg-[#0F5C66] hover:text-white"
        }`}
        style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "25px" }}
      >
        Select Package
      </button>
    </div>
  );
}
