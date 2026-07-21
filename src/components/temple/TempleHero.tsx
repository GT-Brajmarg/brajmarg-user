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
      <section className="flex min-h-[60vh] items-center justify-center bg-[#F8F2E8]">
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
    <section className="relative h-[600px] overflow-visible bg-transparent pt-28">
      <Link
        href="/temples"
        className="absolute top-5 left-4 z-20 inline-flex h-10 items-center gap-2 rounded-lg border border-[#C18426] bg-[#F8F2E8] px-4 lg:hidden"
      >
        <ArrowLeft className="h-4 w-4 text-[#1F3A44]" />
        <span
          className="font-cormorant text-lg text-[#1F3A44]"
          // style={{ marginLeft: "50px", marginTop: "20px" }}
        >
          Back
        </span>
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
          <p className="line-clamp-3 text-center text-[15px] leading-7 text-[#4F4941]">
            {temple.description}
          </p>
        </div>
      </div>

      <div className="hidden lg:block">
        <Link
          href="/temples"
          className="absolute top-8 left-20 z-20 inline-flex h-11 items-center gap-2 rounded-lg border border-[#C18426] px-5"
        >
          <ArrowLeft
            className="h-4 w-4 text-[#0F5C66]"
            style={{ marginLeft: "8px" }}
          />
          <span
            className="font-cormorant text-xl text-[#0F5C66]"
            style={{ marginRight: "8px" }}
          >
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
          <div className="flex w-fit items-center gap-5">
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
            <div className="relative w-[620px] shrink-0 overflow-visible">
              {/* Temple outline background */}
              {/* <Image
                src="/images2/temple-outline_2.png"
                alt=""
                width={420}
                height={420}
                className="pointer-events-none absolute -top-10 -right-24 z-0 hidden h-[420px] w-[420px] object-contain opacity-[0.10] lg:block"
              /> */}
              <Image
                src="/images2/temple-outline_2.png"
                alt=""
                width={320}
                height={320}
                priority
                className="pointer-events-none absolute top-[-180px] right-[-200px] z-[1] h-[320px] w-[320px] object-contain opacity-44"
              />

              <div className="relative z-10">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#C18426]" />
                  <span className="font-cormorant text-[22px] font-bold text-[#3D352F]">
                    {temple.location}
                  </span>
                </div>

                <h1
                  className="font-cormorant text-[58px] leading-[0.95] font-bold text-[#0F5C66]"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  {temple.name}
                </h1>

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px w-16 bg-[#D4B06A]" />
                  <Image
                    src="/images/lotus.png"
                    alt=""
                    width={36}
                    height={36}
                  />
                  <div className="h-px w-16 bg-[#D4B06A]" />
                </div>

                <p
                  className="line-clamp-4 max-w-[560px] text-[16px] leading-8 text-[#3D352F]"
                  style={{ marginTop: "10px", fontWeight: "500" }}
                >
                  {temple.description}
                </p>

                <div
                  className="grid grid-cols-[150px_170px_1fr]"
                  style={{ marginTop: "40px" }}
                >
                  {/* Deity */}
                  <div className="flex items-start gap-3 border-r border-[#D8A65A]/70 pr-12">
                    <Image
                      src="/images/flower-icon.svg" // change to your image path
                      alt="Deity"
                      width={28}
                      height={28}
                      className="mt-[5px] h-7 w-7 shrink-0 object-contain"
                    />

                    <div>
                      <p
                        className="font-cormorant text-[16px] leading-none text-[#3D352F]"
                        style={{ fontWeight: "400", marginTop: "-4px" }}
                      >
                        Deity
                      </p>
                      <p
                        className="font-inter mt-2 text-[18px] leading-none font-bold text-[#3D352F]"
                        style={{ marginTop: "2px" }}
                      >
                        {templeInfo.deity}
                      </p>
                    </div>
                  </div>

                  {/* Established */}
                  <div
                    className="flex items-start gap-3 border-r border-[#D8A65A]/70 px-9"
                    style={{ marginLeft: "15px" }}
                  >
                    <Image
                      src="/images/calendar-icon.svg" // replace with your image path
                      alt="Calendar"
                      width={24}
                      height={24}
                      className="mt-0.5 h-6 w-6 shrink-0 object-contain"
                    />

                    <div>
                      <p
                        className="font-cormorant text-[16px] leading-none text-[#3D352F]"
                        style={{ fontWeight: "400", marginTop: "-4px" }}
                      >
                        Established
                      </p>
                      <p
                        className="font-inter mt-2 text-[18px] leading-none font-bold text-[#3D352F]"
                        style={{ marginTop: "2px" }}
                      >
                        {templeInfo.established}
                      </p>
                    </div>
                  </div>

                  {/* Timings */}
                  <div
                    className="flex items-start gap-3 pl-9"
                    style={{ marginLeft: "15px" }}
                  >
                    <Image
                      src="/images/clock-icon.svg" // replace with your image path
                      alt="Clock"
                      width={28}
                      height={28}
                      className="mt-0.5 h-7 w-7 shrink-0 object-contain"
                    />

                    <div>
                      <p
                        className="font-cormorant text-[16px] leading-none text-[#3D352F]"
                        style={{ fontWeight: "400", marginTop: "-4px" }}
                      >
                        Timings
                      </p>
                      <p
                        className="font-inter mt-2 text-[18px] leading-none font-bold text-[#3D352F]"
                        style={{ marginTop: "2px" }}
                      >
                        {templeInfo.timings}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
