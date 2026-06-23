"use client";

import Image from "next/image";
import { Navigation } from "lucide-react";

const nearbyPlaces = [
  { name: "Haldighati", distance: "17-20 Km" },
  { name: "Dwarkadheesh Temple", distance: "15-18 Km" },
  { name: "Shri Eklingji Prabhu Temple", distance: "25-30 Km" },
  { name: "Charbhuja Temple", distance: "29-35 Km" },
  { name: "Kumbhalgarh Fort", distance: "45 Km" },
  { name: "Udaipur", distance: "45 Km" },
];

export default function TempleLocation() {
  return (
    <section className="relative overflow-hidden rounded-[18px] border border-[#D89A3D] bg-[#FBF6EE]">
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/mandala-pattern.png')",
          backgroundSize: "280px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative flex h-[170px]">
        {/* LEFT */}
        <div className="flex w-[300px] items-center justify-center border-r border-[#D89A3D] px-6">
          <div className="w-full max-w-[220px]">
            <h3 className="font-cormorant text-[28px] leading-none font-semibold text-[#0B6670]">
              Temple Location
            </h3>

            <div
              className="mt-3 text-[14px] leading-[1.5] text-[#4D433B]"
              style={{ marginTop: "5px" }}
            >
              <p>Shrinathji Temple</p>
              <p>NH 8, Shiv Nagar,</p>
              <p>Nathdwara, Rajasthan</p>
              <p>313301</p>
            </div>

            <button
              className="mt-6 flex h-[34px] items-center gap-2 rounded-[8px] border border-[#0B6670] bg-white px-3 text-[13px] font-medium text-[#0B6670] hover:bg-[#F5EEE2]"
              style={{ marginTop: "10px" }}
            >
              Open in Google Maps
              <Navigation size={14} />
            </button>
          </div>
        </div>

        {/* MAP */}
        <div className="relative flex-1 border-r border-[#D89A3D]">
          <Image
            src="/images/location-map.jpg"
            alt="Temple Location"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT */}
        <div className="flex w-[300px] items-center justify-center px-6">
          <div className="w-full max-w-[230px]">
            <h3 className="font-cormorant text-[28px] leading-none font-semibold text-[#0B6670]">
              Nearby Places
            </h3>

            <div className="mt-3 space-y-1">
              {nearbyPlaces.map((place) => (
                <div
                  key={place.name}
                  className="flex justify-between text-[13px] text-[#4D433B]"
                >
                  <span>{place.name}</span>
                  <span className="text-[#7A6E5F]">~{place.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
