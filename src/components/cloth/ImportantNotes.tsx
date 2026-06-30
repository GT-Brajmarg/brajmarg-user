"use client";

import { CircleAlert, PhoneCall } from "lucide-react";

export default function ImportantNotes() {
  const notes = [
    "Cancellation & refund available within 12 hours of booking.",
    "Please ensure correct details before proceeding.",
    "Photos & Videos will be shared within 24–48 hours after seva.",
  ];

  return (
    <section className="relative mt-14 overflow-hidden rounded-[26px] border border-[#0B6670] bg-[#FCF8F1] px-10 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(12,107,115,0.18),transparent_65%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(12,107,115,0.06),transparent_50%)]" />
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
          className="rounded-[18px] border border-[#0B6670]/70 bg-[#FCF8F1] px-8 py-7"
          style={{ marginRight: "50px", marginTop: "20px" }}
        >
          <h3
            className="font-cormorant text-[28px] leading-none font-semibold text-[#0B6670]"
            style={{ marginLeft: "5px", marginTop: "5px" }}
          >
            Need Help?
          </h3>

          <p
            className="mt-2 text-[12px] leading-6 text-[#5C5A55]"
            style={{ marginLeft: "5px" }}
          >
            Our support team is here to assist you.
          </p>

          <a
            href="tel:+917896512657"
            className="mt-7 inline-flex items-center gap-3 text-[#0B6670]"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <PhoneCall
              size={18}
              strokeWidth={2.2}
              style={{ marginLeft: "5px" }}
            />

            <span className="text-[20px] font-semibold tracking-wide">
              +91 78965 12657
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
