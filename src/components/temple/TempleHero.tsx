"use client";

import Image from "next/image";
import { MapPin, CalendarDays, Clock3, Flower2 } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface TempleHeroProps {
  temple: {
    id: string;
    name: string;
    location: string;
    description: string;
    image_url: string;
    deity: string;
    established_year: string;
    opening_time: string;
    closing_time: string;
  };
}

export default function TempleHero({ temple }: TempleHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F8F2E8] py-0">
      {/* Background Mandala */}
      <div className="absolute bottom-[-280px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-[#D9C7A3]/20" />
      <Link
        href="/temples"
        className="absolute top-6 left-20 z-30 hidden h-[42px] items-center gap-2 rounded-[8px] border border-[#C18426] bg-transparent px-4 md:flex"
      >
        <ArrowLeft size={16} strokeWidth={1.8} className="text-[#1F3A44]" />

        <span className="font-cormorant text-[18px] leading-none font-medium text-[#1F3A44]">
          Back to Temples
        </span>
      </Link>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid min-h-[720px] items-start gap-16 lg:grid-cols-[620px_1fr]">
          {/* LEFT IMAGE SECTION */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative h-[620px] w-[540px]"
              style={{ marginLeft: "120px" }}
            >
              <div className="absolute top-[155px] left-1/2 z-10 h-[340px] w-[350px] -translate-x-1/2 overflow-hidden rounded-t-[190px]">
                <Image
                  src={temple.image_url}
                  alt={temple.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              <Image
                src="/images2/temple-arch-frame.png"
                alt=""
                fill
                priority
                className="relative z-20 object-contain"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative flex h-full flex-col justify-center pt-[40px] lg:pt-[80px]">
            <Image
              src="/images2/temple-outline.png"
              alt=""
              width={260}
              height={260}
              className="absolute top-0 right-0 hidden opacity-[0.06] lg:block"
            />

            {/* Location */}
            <div className="mb-9 flex items-center gap-2">
              <MapPin size={18} strokeWidth={1.5} className="text-[#C18426]" />
              <span className="font-cormorant text-[20px] text-[#4D433B]">
                {temple.location}
              </span>
            </div>

            {/* Temple Name */}
            <h1
              className="font-cormorant max-w-[700px] text-[50px] leading-[0.95] font-semibold text-[#0B6670]"
              style={{ marginTop: "20px" }}
            >
              {temple.name}
            </h1>

            {/* Divider */}
            <div
              className="mt-6 mb-8 flex items-center gap-3"
              style={{ marginTop: "10px" }}
            >
              <div className="h-px w-16 bg-[#D4B06A]" />
              <Image src="/images/lotus.png" alt="" width={40} height={40} />
              <div className="h-px w-16 bg-[#D4B06A]" />
            </div>

            {/* Description */}
            <p
              className="line-clamp-6 max-w-[720px] text-[18px] leading-[1.75] text-[#4F4941]"
              style={{ marginTop: "20px" }}
            >
              {temple.description}
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-start border-t border-[#E4D7BE] pt-6">
              {/* Deity */}
              {/* <div>
                <Flower2 size={18} className="mb-2 text-[#C18426]" />
                <p className="text-sm text-[#8B7D6A]">Deity</p>
                <h3 className="font-cormorant text-[32px] font-semibold text-[#433E37]">
                  {temple.deity}
                </h3>
              </div> */}

              {/* <div className="mx-8 h-[60px] w-px bg-[#E4D7BE]" /> */}

              {/* Established */}
              {/* <div>
                <CalendarDays size={18} className="mb-2 text-[#C18426]" />
                <p className="text-sm text-[#8B7D6A]">Established</p>
                <h3 className="font-cormorant text-[32px] font-semibold text-[#433E37]">
                  {temple.established_year}
                </h3>
              </div> */}

              {/* <div className="mx-8 h-[60px] w-px bg-[#E4D7BE]" /> */}

              {/* Timings */}
              {/* <div>
                <Clock3 size={18} className="mb-2 text-[#C18426]" />
                <p className="text-sm text-[#8B7D6A]">Timings</p>
                <h3 className="font-cormorant text-[32px] font-semibold text-[#433E37]">
                  {temple.opening_time} - {temple.closing_time}
                </h3>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
