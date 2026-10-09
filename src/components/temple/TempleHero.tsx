"use client";

import Image from "next/image";
import { MapPin, CalendarDays, Clock3, Flower2 } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface TempleHeroProps {
  loading: boolean;
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

const templeInfo = {
  deity: "Shreenathji",
  established: "1672",
  timings: "5:30 AM - 9:00 PM",
};

export default function TempleHero({ temple, loading }: TempleHeroProps) {
  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-transparent">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D8C7A6] border-t-[#0F5C66]" />

          <h3 className="font-cormorant mt-6 text-3xl font-semibold text-[#0F5C66]">
            Loading Temple
          </h3>

          <p className="mt-2 text-sm text-[#6B7280]">
            Please wait while we prepare your spiritual journey...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-transparent pt-6 pb-6 lg:pt-8 lg:pb-10">
      {/* Back to Temples Button */}
      <div className="mb-6 px-4 lg:px-0">
        <Link
          href="/temples"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#C18426] bg-[#F8F2E8]/80 px-4 transition-all hover:bg-[#F3E5D0] shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 text-[#0F5C66]" />
          <span className="font-cormorant text-lg font-medium text-[#0F5C66]">
            Back to Temples
          </span>
        </Link>
      </div>

      {/* ================= MOBILE / TABLET (< lg) ================= */}
      <div className="block lg:hidden">
        <div className="mx-auto flex max-w-lg flex-col items-center px-4">
          {/* Temple Frame */}
          <div className="relative h-[360px] w-[300px] sm:h-[420px] sm:w-[350px]">
            <div className="absolute top-[90px] left-1/2 z-10 h-[190px] w-[190px] -translate-x-1/2 overflow-hidden rounded-t-[120px] sm:top-[105px] sm:h-[220px] sm:w-[225px] sm:rounded-t-[140px]">
              <Image
                src={temple.image_url}
                alt={temple.name}
                fill
                priority
                unoptimized
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
          <div className="mt-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#C18426]" />
            <span className="font-cormorant text-[18px] font-medium text-[#554B44]">
              {temple.location}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant mt-2 text-center text-[36px] sm:text-[44px] leading-tight font-bold text-[#0F5C66]">
            {temple.name}
          </h1>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px w-12 bg-[#D4B06A]" />
            <Image src="/images/lotus.png" alt="" width={30} height={30} />
            <div className="h-px w-12 bg-[#D4B06A]" />
          </div>

          {/* Description */}
          <p className="line-clamp-4 text-center text-[15px] leading-relaxed text-[#3D352F]">
            {temple.description}
          </p>

          {/* Stats on Mobile */}
          <div className="mt-6 grid w-full grid-cols-3 divide-x divide-[#D8A65A]/70 border-t border-b border-[#D8A65A]/40 py-4">
            <div className="flex flex-col items-center px-1 text-center">
              <Image
                src="/images/flower-icon.svg"
                alt="Deity"
                width={22}
                height={22}
                className="h-5 w-5 shrink-0 object-contain"
              />
              <span className="font-cormorant mt-1 text-[13px] text-[#6E675F]">
                Deity
              </span>
              <span className="font-inter text-[13px] font-bold text-[#3D352F] truncate max-w-full">
                {templeInfo.deity}
              </span>
            </div>

            <div className="flex flex-col items-center px-1 text-center">
              <Image
                src="/images/calendar-icon.svg"
                alt="Calendar"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0 object-contain"
              />
              <span className="font-cormorant mt-1 text-[13px] text-[#6E675F]">
                Established
              </span>
              <span className="font-inter text-[13px] font-bold text-[#3D352F]">
                {templeInfo.established}
              </span>
            </div>

            <div className="flex flex-col items-center px-1 text-center">
              <Image
                src="/images/clock-icon.svg"
                alt="Clock"
                width={22}
                height={22}
                className="h-5 w-5 shrink-0 object-contain"
              />
              <span className="font-cormorant mt-1 text-[13px] text-[#6E675F]">
                Timings
              </span>
              <span className="font-inter text-[12px] font-bold text-[#3D352F]">
                {templeInfo.timings}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP (lg+) ================= */}
      <div className="hidden lg:block relative">
        {/* Subtle Temple outline background watermark */}
        <Image
          src="/images2/temple-outline_2.png"
          alt=""
          width={360}
          height={360}
          priority
          className="pointer-events-none absolute -top-12 -right-10 z-0 h-[360px] w-[360px] object-contain opacity-[0.14]"
        />

        <div className="relative z-10 flex items-center justify-between gap-10">
          {/* LEFT: Arch Frame */}
          <div className="w-[460px] shrink-0">
            <div className="relative h-[520px] w-[440px]">
              {/* Temple Image */}
              <div className="absolute top-[130px] left-1/2 z-10 h-[280px] w-[285px] -translate-x-1/2 overflow-hidden rounded-t-[170px]">
                <Image
                  src={temple.image_url}
                  alt={temple.name}
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center"
                />
              </div>

              {/* Gold Arch Frame Overlay */}
              <Image
                src="/images2/temple-arch-frame.png"
                alt=""
                fill
                priority
                className="pointer-events-none absolute inset-0 z-20 object-contain"
              />
            </div>
          </div>

          {/* RIGHT: Temple Info */}
          <div className="flex-1 max-w-[620px]">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#C18426]" />
              <span className="font-cormorant text-[20px] font-semibold text-[#554B44]">
                {temple.location}
              </span>
            </div>

            {/* Temple Name */}
            <h1 className="font-cormorant mt-2 text-[56px] leading-[1.05] font-bold text-[#0F5C66]">
              {temple.name}
            </h1>

            {/* Lotus Divider */}
            <div className="my-4 flex items-center gap-3">
              <div className="h-px w-16 bg-[#D4B06A]" />
              <Image
                src="/images/lotus.png"
                alt=""
                width={34}
                height={34}
                className="shrink-0"
              />
              <div className="h-px w-16 bg-[#D4B06A]" />
            </div>

            {/* Description */}
            <p className="text-[15px] leading-relaxed text-[#3D352F] line-clamp-5">
              {temple.description}
            </p>

            {/* Stats Row */}
            <div className="mt-8 flex items-center divide-x divide-[#D8A65A]/70 border-t border-[#D8A65A]/40 pt-6">
              {/* Deity */}
              <div className="flex items-center gap-3 pr-8">
                <Image
                  src="/images/flower-icon.svg"
                  alt="Deity"
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 object-contain"
                />
                <div>
                  <p className="font-cormorant text-[15px] leading-tight text-[#6E675F]">
                    Deity
                  </p>
                  <p className="font-inter text-[16px] font-bold text-[#3D352F]">
                    {templeInfo.deity}
                  </p>
                </div>
              </div>

              {/* Established */}
              <div className="flex items-center gap-3 px-8">
                <Image
                  src="/images/calendar-icon.svg"
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="h-6 w-6 shrink-0 object-contain"
                />
                <div>
                  <p className="font-cormorant text-[15px] leading-tight text-[#6E675F]">
                    Established
                  </p>
                  <p className="font-inter text-[16px] font-bold text-[#3D352F]">
                    {templeInfo.established}
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-center gap-3 pl-8">
                <Image
                  src="/images/clock-icon.svg"
                  alt="Clock"
                  width={26}
                  height={26}
                  className="h-6 w-6 shrink-0 object-contain"
                />
                <div>
                  <p className="font-cormorant text-[15px] leading-tight text-[#6E675F]">
                    Timings
                  </p>
                  <p className="font-inter text-[16px] font-bold text-[#3D352F]">
                    {templeInfo.timings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
