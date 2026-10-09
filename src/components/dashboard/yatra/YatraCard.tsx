"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Cormorant_Infant } from "next/font/google";

import SevaStatusBadge from "../seva/SevaStatusBadge";
import YatraDetailsModal from "./YatraDetailsModal";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  bookingId: string;
  yatra: string;
  destinations: string;
  dates: string;
  status: "upcoming" | "completed" | "cancelled";
}

export default function YatraCard({
  bookingId,
  yatra,
  destinations,
  dates,
  status,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-[22px] border border-[#C37000]/64 p-5"
        style={{ marginBottom: "20px" }}
      >
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-5">
            {/* Image Grid */}
            <div
              className="grid h-[110px] w-[110px] grid-cols-2 overflow-hidden rounded-2xl border border-[#D9B382]"
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {[
                "/images2/default.png",
                "/images2/default.png",
                "/images2/default.png",
                "/images2/default.png",
              ].map((src) => (
                <div key={src} className="relative">
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h3
                className={`${cormorantInfant.className} text-[22px] font-bold text-[#0F5C66]`}
              >
                {yatra}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/location.svg"
                    alt=""
                    width={18}
                    height={18}
                  />

                  <p
                    className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]/85`}
                  >
                    {destinations}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Image
                    src="/images/calendar-1.svg"
                    alt=""
                    width={18}
                    height={18}
                  />

                  <p
                    className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]/85`}
                  >
                    {dates}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Image
                    src="/images/ticket.svg"
                    alt=""
                    width={18}
                    height={18}
                  />

                  <p
                    className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]/85`}
                  >
                    Booking ID: {bookingId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end justify-between">
            <SevaStatusBadge status={status} />

            <button
              onClick={() => setOpen(true)}
              className="mt-10 flex items-center gap-2 rounded-[8px] border border-[#C37000] px-6 py-3 text-[#C37000] transition hover:bg-[#FFF3E0]"
              style={{
                marginRight: "20px",
                marginTop: "20px",
              }}
            >
              <span
                className={`${cormorantInfant.className} text-[20px] font-bold`}
                style={{ marginLeft: "10px" }}
              >
                View Yatra
              </span>

              <ArrowRight size={18} style={{ marginRight: "10px" }} />
            </button>
          </div>
        </div>
      </div>

      <YatraDetailsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
