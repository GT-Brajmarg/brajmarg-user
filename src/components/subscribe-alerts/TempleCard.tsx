"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, MapPin } from "lucide-react";

export interface TempleCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  selected?: boolean;
  tags?: string[];
  onSelect?: (id: string) => void;
}

export default function TempleCard({
  id,
  name,
  location,
  image,
  selected = false,
  tags = [],
  onSelect,
}: TempleCardProps) {
  const [imgSrc, setImgSrc] = useState(image || "/images2/default.png");
  return (
    <div
      className={`group relative overflow-hidden rounded-[16px] border-[2px] p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        selected
          ? "border-[#0F5C66] bg-[#0F5C66]/10"
          : "border-[#C37000] bg-[#C37000]/10 hover:border-[#C37000]"
      }`}
    >
      {/* Selection Circle */}
      <button
        onClick={() => onSelect?.(id)}
        className={`absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full border transition ${
          selected ? "border-[#0B6670] bg-[#0B6670]" : "border-[#D8B06B]"
        }`}
      >
        {selected && <Check size={14} strokeWidth={3} className="text-white" />}
      </button>

      <div className="flex gap-3">
        {/* Temple Image */}
        <div
          className="relative h-[122px] w-[92px] flex-shrink-0 overflow-hidden rounded-xl"
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            marginBottom: "10px",
          }}
        >
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            onError={() => setImgSrc("/images2/default.png")}
          />
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col">
          <h3
            className="font-cormorant text-[24px] leading-tight font-bold text-[#0F5C66]"
            style={{ marginTop: "20px" }}
          >
            {name}
          </h3>

          <div
            className="mt-2 flex items-center gap-1 text-[#8C6D3B]"
            style={{ marginTop: "10px" }}
          >
            <MapPin size={16} />
            <span className="font-cormorant text-[16px] font-bold text-[#3D352F]">
              {location}
            </span>
          </div>

          {/* Tags */}
          <div
            className="mt-auto flex flex-wrap gap-2 pt-4"
            style={{ marginTop: "10px" }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-3 py-1 transition-all duration-300 ${
                  selected
                    ? "border-[#0F5C66] bg-[#0F5C66] text-[#F8F2E8]"
                    : "border-[#D8B06B] bg-[#F7E5C7] text-[#8B6320]"
                }`}
              >
                <span
                  className="font-cormorant text-[13px] font-semibold"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  {tag}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
