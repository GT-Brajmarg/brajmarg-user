"use client";

import { CircleAlert, PhoneCall } from "lucide-react";
import Image from "next/image";

export default function ImportantNotes() {
  const notes = [
    "Cancellation & refund available within 12 hours of booking.",
    "Please ensure correct details before proceeding.",
    "Photos & Videos will be shared within 24–48 hours after seva.",
  ];

  return (
    <section className="relative mt-14 overflow-hidden rounded-[26px] border-[2px] border-[#0F5C66] bg-[#0F5C66]/20 px-10 py-8 shadow-[0_24px_60px_rgba(11,102,112,0.22),0_8px_18px_rgba(11,102,112,0.12)]">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(12,107,115,0.18),transparent_65%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(12,107,115,0.06),transparent_50%)]" /> */}
      <div
        className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_290px]"
        style={{ marginBottom: "20px" }}
      >
        {/* Left */}
        <div>
          <h2
            className="font-cormorant mb-6 text-[25px] leading-none font-semibold text-[#0B6670]"
            style={{ marginLeft: "20px", marginTop: "10px" }}
          >
            Important Notes
          </h2>

          <div className="space-y-5" style={{ marginTop: "10px" }}>
            {notes.map((note) => (
              <div key={note} className="flex items-start gap-3">
                <CircleAlert
                  size={16}
                  strokeWidth={2}
                  className="mt-[3px] shrink-0 text-[#D89A3D]"
                  style={{ marginTop: "5px", marginLeft: "20px" }}
                />

                <p className="text-[18px] leading-[1.45] text-[#4F4941]">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div
          className="rounded-[18px] border border-[#0B6670]/70 bg-[#0F5C66]/10 px-8 py-7"
          style={{ marginRight: "50px", marginTop: "20px" }}
        >
          <h3
            className="font-cormorant text-[28px] leading-none font-semibold text-[#0B6670]"
            style={{ marginLeft: "5px", marginTop: "5px" }}
          >
            Need Help?
          </h3>

          <p
            className="mt-2 text-[13px] leading-6 text-[#0F5C66]"
            style={{ marginLeft: "5px" }}
          >
            Our support team is here to assist you.
          </p>

          <a
            href="tel:+917896512657"
            className="mt-7 inline-flex items-center gap-3 text-[#0B6670]"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <Image
              src="/images/phone-call-icon.svg" // replace with your image path
              alt="Phone Call"
              width={18}
              height={18}
              className="ml-[5px] h-[18px] w-[18px] shrink-0 object-contain"
              style={{ marginLeft: "10px" }}
            />

            <span className="text-[20px] font-semibold tracking-wide text-[#0F5C66]">
              +91 78965 12657
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
