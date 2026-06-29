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
    <section className="relative overflow-hidden bg-[#F8F2E8] pt-28">
      {/* Mandala */}
      {/* <div className="absolute bottom-[-260px] left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full border border-[#D9C7A3]/20" /> */}

      {/* Temple outline */}
      {/* <Image
        src="/images2/temple-outline_1.png"
        alt=""
        width={320}
        height={320}
        className="absolute top-[120px] right-[120px] opacity-[0.05]"
      /> */}

      {/* Back Button */}
      {/* <div className="flex w-full px-12">
        <div className="flex w-fit">
          <Link
            href="/temples"
            className="mb-14 inline-flex h-11 items-center gap-2 rounded-lg border border-[#C18426] px-5"
          >
            <ArrowLeft className="h-4 w-4 text-[#1F3A44]" />
            <span className="font-cormorant text-xl text-[#1F3A44]">
              Back to Temples
            </span>
          </Link>
        </div>
      </div> */}

      <Link
        href="/temples"
        className="absolute top-5 left-4 z-20 inline-flex h-10 items-center gap-2 rounded-lg border border-[#C18426] bg-[#F8F2E8] px-4 lg:hidden"
      >
        <ArrowLeft className="h-4 w-4 text-[#1F3A44]" />
        <span className="font-cormorant text-lg text-[#1F3A44]">Back</span>
      </Link>

      {/* ================= MOBILE ================= */}
      <div className="block pt-14 lg:hidden">
        <div className="mx-auto flex max-w-sm flex-col items-center px-6">
          {/* Temple Frame */}
          <div className="relative h-[390px] w-[330px]">
            <div className="absolute top-[100px] left-1/2 z-10 h-[205px] w-[210px] -translate-x-1/2 overflow-hidden rounded-t-[130px]">
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
              className="pointer-events-none absolute inset-0 z-20 object-contain"
            />
          </div>

          {/* Location */}
          <div className="mt-8 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#C18426]" />
            <span className="font-cormorant text-[18px] text-[#554B44]">
              {temple.location}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant mt-3 text-center text-[36px] leading-[1.05] font-semibold text-[#0B6670]">
            {temple.name}
          </h1>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px w-10 bg-[#D4B06A]" />
            <Image src="/images/lotus.png" alt="" width={28} height={28} />
            <div className="h-px w-10 bg-[#D4B06A]" />
          </div>

          {/* Description */}
          <p className="line-clamp-5 text-center text-[15px] leading-7 text-[#4F4941]">
            {temple.description}
          </p>
        </div>
      </div>

      <div className="hidden lg:block">
        <Link
          href="/temples"
          className="absolute top-8 left-20 z-20 inline-flex h-11 items-center gap-2 rounded-lg border border-[#C18426] px-5"
        >
          <ArrowLeft className="h-4 w-4 text-[#1F3A44]" />
          <span className="font-cormorant text-xl text-[#1F3A44]">
            Back to Temples
          </span>
        </Link>
        <div className="flex min-h-[720px] w-full justify-center px-12">
          {/* <div className="flex w-full px-12">
          <div className="flex w-fit">
            <Link
              href="/temples"
              className="mb-14 inline-flex h-11 items-center gap-2 rounded-lg border border-[#C18426] px-5"
            >
              <ArrowLeft className="h-4 w-4 text-[#1F3A44]" />
              <span className="font-cormorant text-xl text-[#1F3A44]">
                Back to Temples
              </span>
            </Link>
          </div>
        </div> */}
          <div className="flex w-fit items-center gap-24">
            {/* LEFT */}
            <div className="w-[520px] shrink-0">
              <div className="relative h-[560px] w-[480px]">
                {/* Temple Image */}
                <div className="absolute top-[140px] left-1/2 z-10 h-[300px] w-[310px] -translate-x-1/2 overflow-hidden rounded-t-[180px]">
                  <Image
                    src={temple.image_url}
                    alt={temple.name}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>

                {/* Frame */}
                <Image
                  src="/images2/temple-arch-frame.png"
                  alt=""
                  fill
                  priority
                  className="pointer-events-none absolute inset-0 z-20 object-contain"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative w-[620px] shrink-0">
              <Image
                src="/images2/temple-outline_1.png"
                alt=""
                width={280}
                height={280}
                className="absolute top-16 right-0 hidden opacity-[0.05] lg:block"
              />

              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#C18426]" />
                <span className="font-cormorant text-[22px] text-[#554B44]">
                  {temple.location}
                </span>
              </div>

              <h1
                className="font-cormorant text-[58px] leading-[0.95] font-semibold text-[#0B6670]"
                style={{ marginBottom: "10px", marginTop: "10px" }}
              >
                {temple.name}
              </h1>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px w-16 bg-[#D4B06A]" />
                <Image src="/images/lotus.png" alt="" width={36} height={36} />
                <div className="h-px w-16 bg-[#D4B06A]" />
              </div>

              <p
                className="line-clamp-6 max-w-[560px] text-[18px] leading-8 text-[#4F4941]"
                style={{ marginTop: "10px" }}
              >
                {temple.description}
              </p>

              <div className="mt-8 border-t border-[#E4D7BE] pt-6">
                {/* Stats */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
