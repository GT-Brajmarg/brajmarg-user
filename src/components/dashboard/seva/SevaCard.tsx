"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import { useState } from "react";
import SevaStatusBadge from "./SevaStatusBadge";
import SevaDetailsModal from "./SevaDetailsModal";
// import SevaDetailsModal from "./SevaDetailsModal";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  image: string;
  bookingId: string;
  seva: string;
  temple: string;
  date: string;
  amount: number;
  status: "upcoming" | "completed" | "cancelled";
}

export default function SevaCard({
  image,
  bookingId,
  seva,
  temple,
  date,
  amount,
  status,
}: Props) {
  const [showSevaDetails, setShowSevaDetails] = useState(false);

  return (
    <>
      <div
        className="rounded-[22px] border border-[#C37000]/64 p-5"
        style={{ marginBottom: "20px" }}
      >
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-5">
            <div
              className="relative h-[110px] w-[110px] overflow-hidden rounded-xl border border-[#D9B382]"
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Image
                src={"/images2/default.png"}
                alt={seva}
                fill
                className="object-cover"
              />
            </div>

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h3
                className={`${cormorantInfant.className} text-[22px] font-bold text-[#0F5C66]`}
              >
                {seva}
              </h3>

              <div className="space-y-2">
                {/* Temple */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/temple.svg"
                    alt="Temple"
                    width={18}
                    height={18}
                  />
                  <p
                    className={`${cormorantInfant.className} mt-1 text-[20px] font-bold text-[#3D352F]/84`}
                  >
                    {temple}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/calendar-1.svg"
                    alt="Date"
                    width={18}
                    height={18}
                  />
                  <p
                    className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]/84`}
                  >
                    {date}
                  </p>
                </div>

                {/* Booking ID */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/ticket.svg"
                    alt="Booking ID"
                    width={18}
                    height={18}
                  />
                  <p
                    className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]/84`}
                  >
                    Booking ID: {bookingId}
                  </p>
                </div>
              </div>

              {/* <p className="mt-3 text-[16px] font-semibold text-[#3D352F]">
                Amount Paid : ₹ {amount}
              </p> */}
            </div>
          </div>

          {/* Right */}
          <div className="flex h-full flex-col items-end justify-between">
            <SevaStatusBadge status={status} />

            <button
              onClick={() => setShowSevaDetails(true)}
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
                View Seva
              </span>

              <ArrowRight size={18} style={{ marginRight: "10px" }} />
            </button>
          </div>
        </div>
      </div>

      <SevaDetailsModal
        open={showSevaDetails}
        onClose={() => setShowSevaDetails(false)}
        seva={{
          image,
          bookingId,
          seva,
          temple,
          date,
          amount,
          status,
        }}
      />
    </>
  );
}
