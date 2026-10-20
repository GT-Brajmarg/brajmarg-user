"use client";

import { CircleCheck } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";

interface Props {
  pkg: {
    id: number;
    name: string;
    subtitle: string;
    price: number;
    popular: boolean;
    features: string[];
  };
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function PackageCard({ pkg, isSelected = false, onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      className={`relative flex h-full flex-col justify-between rounded-[20px] bg-[#0F5C66]/5 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
        isSelected
          ? "border-2 border-[#0F5C66] shadow-[0_8px_24px_rgba(15,92,102,0.18)]"
          : "border border-[#0F5C66]"
      }`}
    >
      <div>
        <h3 className="font-cormorant text-[28px] font-bold text-[#0F5C66] leading-tight">
          {pkg.name}
        </h3>
        <p className="font-cormorant text-[17px] font-bold text-[#C37000] mt-0.5">
          {pkg.subtitle}
        </p>

        <div className="mt-2.5 flex items-baseline gap-1">
          <span className="font-cormorant text-[32px] font-bold text-[#0F5C66]">
            ₹{pkg.price.toLocaleString()}
          </span>
          <span className="font-cormorant text-[15px] font-bold text-[#3D352F]">
            /person
          </span>
        </div>

        <div className="mt-3.5 space-y-2">
          {pkg.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <CircleCheck size={16} className="shrink-0 text-[#C37000]" />
              <span className="font-cormorant text-[16px] font-medium text-[#3D352F]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        className={`font-cormorant mt-6 w-full rounded-xl border py-2 text-[22px] font-bold transition-all cursor-pointer ${
          isSelected
            ? "border-[#0F5C66] bg-[#0F5C66] text-[#EFDEC7] hover:bg-[#0c4b52]"
            : "border-[#0F5C66] bg-[#EFDEC7]/60 text-[#0F5C66] hover:bg-[#0F5C66] hover:text-[#EFDEC7]"
        }`}
      >
        Select Package
      </button>
    </div>
  );
}
