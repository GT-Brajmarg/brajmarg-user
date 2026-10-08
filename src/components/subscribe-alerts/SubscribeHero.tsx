"use client";

import Image from "next/image";
import { Bell, CalendarDays, Clock3, Sparkles } from "lucide-react";

export default function SubscribeHero() {
  return (
    <section className="relative h-[609px] overflow-hidden">
      {/* Hero Banner */}
      <Image
        src="/images/subscribe-alerts.png"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{
          objectPosition: "center top",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] items-center px-8">
        <div
          className="max-w-[520px] md:translate-x-[170px]"
          style={{ marginLeft: "50px" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur">
            <Bell size={22} className="text-[#C37000]" />

            <span className="font-cormorant text-[22px] font-bold tracking-[0.25em] text-[#C37000] uppercase">
              Subscribe Alerts
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-cormorant mt-6 text-[55px] leading-[1.08] font-bold text-[#3D352F] md:text-[56px]"
            style={{ marginTop: "10px" }}
          >
            Timely Updates.
            <br />
            Deeper <span className="text-[#0B6670]">Connection.</span>
          </h1>

          <div
            className="mt-2 flex items-center gap-3"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <div className="h-px w-16 bg-[#D7B06B]" />

            <Image src="/images/lotus.png" alt="" width={48} height={48} />

            <div className="h-px w-16 bg-[#D7B06B]" />
          </div>

          {/* Description */}
          <p
            className="font-cormorant mt-5 max-w-[430px] text-[18px] leading-relaxed font-semibold text-[#3D352F]"
            style={{ marginTop: "10px" }}
          >
            Receive timely updates about temple darshan, aartis, festivals, seva
            availability, prasad dispatches, yatra announcements and
            more-personalized for you.
          </p>

          {/* CTA */}

          {/* Features */}
          <div
            className="mt-8 flex flex-wrap gap-x-5 gap-y-4"
            style={{ marginTop: "30px" }}
          >
            {/* {alertItems.map(({ image, top, bottom }) => (
              <div key={top} className="flex items-center gap-2">
                <Image
                  src={image}
                  alt={top}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />

                <p className="font-cormorant text-[15px] leading-[1.15] text-[#3D352F]">
                  {top}
                  <br />
                  {bottom}
                </p>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
