"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowBigLeft, ArrowRight, Navigation } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTempleLocation } from "@/store/slices/templeLocationSlice";

// interface TempleLocationProps {
//   templeId: string;
// }

export default function TempleLocation() {
  const dispatch = useAppDispatch();

  const { location, nearbyPlaces, loading } = useAppSelector(
    (state) => state.templeLocation,
  );

  if (loading) {
    return null;
  }

  if (!location) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden rounded-[24px] border-[2px] border-[#C37000] bg-transparent shadow-[0_20px_50px_rgba(126,83,26,0.18),0_6px_14px_rgba(126,83,26,0.1)]">
      {/* ========================= Desktop ========================= */}
      <div className="relative hidden min-h-[280px] lg:grid lg:grid-cols-[280px_1fr_280px]">
        {/* LEFT: Address */}
        <div className="flex flex-col justify-center border-r border-[#D89A3D]/70 p-6">
          <h3 className="font-cormorant text-[26px] font-bold text-[#0B6670]">
            Temple Location
          </h3>

          <div className="mt-3 space-y-1 font-cormorant text-[16px] leading-[1.4] font-medium text-[#3D352F]">
            <p className="font-bold text-[#24535D]">{location.temple_name}</p>
            <p>{location.address_line_1}</p>
            {location.address_line_2 && <p>{location.address_line_2}</p>}
            <p>
              {location.city}, {location.state}
            </p>
            <p>{location.pincode}</p>
          </div>

          <a
            href={location.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant mt-4 inline-flex h-[34px] w-fit items-center gap-2 rounded-[8px] border border-[#0F5C66] bg-transparent px-3 text-[14px] font-semibold text-[#0F5C66] transition-all hover:bg-[#0F5C66] hover:text-[#EFDEC7]"
          >
            <span>Open in Google Maps</span>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>

        {/* MAP */}
        <div className="relative min-h-[280px] w-full overflow-hidden border-r border-[#D89A3D]/70">
          <iframe
            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=16&output=embed`}
            width="100%"
            height="100%"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* RIGHT: Nearby Places */}
        <div className="flex flex-col justify-center p-6">
          <h3 className="font-cormorant text-[26px] font-bold text-[#0B6670]">
            Nearby Places
          </h3>

          <div className="mt-3 space-y-2">
            {nearbyPlaces.slice(0, 6).map((place) => (
              <div
                key={place.id}
                className="flex items-center justify-between text-[13px] text-[#3D352F]"
              >
                <span className="font-cormorant text-[16px] font-semibold text-[#3D352F]">
                  {place.place_name}
                </span>
                <span className="font-inter text-[12px] font-bold text-[#C37000]">
                  ~{place.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================= Mobile ========================= */}
      <div className="relative flex flex-col lg:hidden">
        {/* Temple Location */}
        <div className="flex flex-col items-center border-b border-[#D89A3D]/70 p-5 text-center">
          <h3 className="font-cormorant text-[28px] font-bold text-[#0B6670]">
            Temple Location
          </h3>

          <div className="mt-3 space-y-1 font-cormorant text-[16px] leading-relaxed text-[#3D352F]">
            <p className="font-bold text-[#24535D]">{location.temple_name}</p>
            <p>{location.address_line_1}</p>
            {location.address_line_2 && <p>{location.address_line_2}</p>}
            <p>
              {location.city}, {location.state} {location.pincode}
            </p>
          </div>

          <a
            href={location.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#0F5C66] bg-transparent px-5 text-[15px] font-semibold text-[#0F5C66] transition hover:bg-[#F5EEE2]"
          >
            <span>Open in Google Maps</span>
            <Navigation size={16} />
          </a>
        </div>

        {/* Map */}
        <div className="relative h-[240px] w-full border-b border-[#D89A3D]/70">
          <iframe
            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=16&output=embed`}
            width="100%"
            height="100%"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Nearby Places */}
        <div className="p-5">
          <h3 className="font-cormorant text-center text-[28px] font-bold text-[#0B6670]">
            Nearby Places
          </h3>

          <div className="mt-4 space-y-2.5">
            {nearbyPlaces.map((place) => (
              <div
                key={place.id}
                className="flex items-center justify-between rounded-xl border border-[#D89A3D]/40 bg-transparent px-4 py-2.5"
              >
                <span className="font-cormorant text-[16px] font-semibold text-[#3D352F]">
                  {place.place_name}
                </span>

                <span className="rounded-full bg-[#EFDEC7]/60 px-3 py-0.5 text-[12px] font-bold text-[#C37000]">
                  ~{place.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
