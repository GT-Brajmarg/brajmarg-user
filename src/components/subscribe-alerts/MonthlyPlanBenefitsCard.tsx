"use client";

import Image from "next/image";
import { Cormorant_Infant, Inter } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const benefits = [
  {
    icon: "/images/real-time-notification.svg",
    title: "Real-time Notifications",
    description:
      "Get instant alerts for Darshan timings, Aarti, festivals, seva openings and more.",
  },
  {
    icon: "/images/all-alert-categories.svg",
    title: "All Alert Categories",
    description: "Stay updated on all the categories you selected.",
  },
  {
    icon: "/images/temple-updates.svg",
    title: "Temple Updates",
    description:
      "Important announcements and updates from your selected temples.",
  },
  {
    icon: "/images/seva-prasad.svg",
    title: "Seva & Prasad Updates",
    description: "Know when seva bookings are open and prasad is dispatched.",
  },
  {
    icon: "/images/preferences.svg",
    title: "Customizable Preferences",
    description:
      "Manage your language, delivery method and alert frequency anytime.",
  },
];

export default function MonthlyPlanBenefitsCard() {
  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#C37000]/4 p-5">
      {/* Header */}

      <div
        className="mb-6 flex flex-col items-center"
        style={{ marginTop: "20px" }}
      >
        <Image src="/images/lotus.png" alt="Lotus" width={65} height={56} />

        <h2
          className={`${cormorantInfant.className} mt-2 text-center text-[30px] font-semibold text-[#0F5C66]`}
        >
          What you get with Monthly Plan
        </h2>
      </div>

      {/* Benefits */}

      <div
        className="space-y-4"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex gap-5 rounded-[16px] border border-[#C37000] p-5"
            style={{ marginTop: "10px" }}
          >
            {/* Icon */}

            <div
              className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border border-[#C37000]"
              style={{
                marginTop: "10px",
                marginLeft: "20px",
                marginBottom: "10px",
              }}
            >
              <Image
                src={benefit.icon}
                alt={benefit.title}
                width={45}
                height={45}
              />
            </div>

            {/* Text */}

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h3
                className={`${cormorantInfant.className} text-[28px] leading-none font-bold text-[#3D352F]`}
              >
                {benefit.title}
              </h3>

              <p
                className={`${cormorantInfant.className} mt-2 text-[22px] leading-6 font-bold text-[#3D352F]`}
                style={{ marginTop: "10px" }}
              >
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade */}

      <div
        className="mt-5 rounded-[16px] border border-[#C37000] bg-[#C37000]/10 p-5"
        style={{
          marginTop: "10px",
          marginLeft: "20px",
          marginBottom: "20px",
          marginRight: "20px",
        }}
      >
        <div className="flex items-center gap-5">
          <Image
            src="/images/lotus.png"
            alt="Lotus"
            width={82}
            height={71}
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />

          <h3
            className={`${cormorantInfant.className} text-[28px] leading-[1.3] font-bold text-[#0F5C66]`}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Upgrade to Yearly Plan anytime to unlock exclusive benefits and save
            more.
          </h3>
        </div>
      </div>
    </section>
  );
}
