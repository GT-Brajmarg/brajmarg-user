"use client";

import Image from "next/image";
import { Bell, CalendarDays, Clock3, Sparkles } from "lucide-react";

export default function SubscribeHero() {
  return (
    <section className="relative min-h-[460px] sm:min-h-[500px] md:h-[580px] lg:h-[609px] overflow-hidden">
      {/* Desktop Background: Full banner with phone & cards on right */}
      <div className="hidden lg:block absolute inset-0">
        <Image
          src="/images/subscribe-alerts.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Mobile & Tablet Background: Left serene sky only (right phone & cards are scaled off-screen) */}
      <div className="block lg:hidden absolute inset-0 overflow-hidden">
        <Image
          src="/images/subscribe-alerts.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-left"
          style={{
            transform: "scale(1.35)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[460px] sm:min-h-[500px] md:min-h-[580px] lg:min-h-[609px] items-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-[480px] lg:max-w-[520px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C37000]/40 bg-[#EFDEC7]/80 px-3.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm shadow-xs">
            <Bell size={18} className="text-[#C37000] shrink-0 sm:h-5 sm:w-5" />

            <span className="font-cormorant text-[14px] sm:text-[17px] md:text-[19px] font-bold tracking-[0.18em] sm:tracking-[0.25em] text-[#C37000] uppercase">
              Subscribe Alerts
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant mt-3 sm:mt-5 text-[32px] sm:text-[40px] md:text-[46px] lg:text-[54px] font-bold text-[#3D352F] leading-[1.12]">
            Timely Updates.
            <br />
            Deeper <span className="text-[#0B6670]">Connection.</span>
          </h1>

          {/* Lotus Divider */}
          <div className="my-2.5 sm:my-4 flex items-center gap-2.5 sm:gap-3">
            <div className="h-px w-10 sm:w-16 bg-[#D7B06B]" />
            <Image
              src="/images/lotus_bright.png"
              alt=""
              width={40}
              height={40}
              className="h-7 w-7 sm:h-9 sm:w-9 object-contain"
            />
            <div className="h-px w-10 sm:w-16 bg-[#D7B06B]" />
          </div>

          {/* Description */}
          <p className="font-cormorant max-w-[420px] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-relaxed font-semibold text-[#3D352F]">
            Receive timely updates about temple darshan, aartis, festivals, seva
            availability, prasad dispatches, yatra announcements and
            more—personalized for you.
          </p>
        </div>
      </div>
    </section>
  );
}
