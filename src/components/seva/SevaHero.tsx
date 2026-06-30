"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Handshake,
} from "lucide-react";

interface Temple {
  id: string;
  name: string;
  location: string;
}

interface Seva {
  id: string;
  name: string;
  image_url: string;
  details: string;
  price: number;
}

interface Props {
  templeSlug: string;
  temple: Temple;
  seva: Seva;
}

export default function SevaHero({ templeSlug, temple, seva }: Props) {
  return (
    <section className="relative h-[650px] overflow-hidden bg-[#F8F2E8] pt-20">
      {/* ================= Breadcrumb ================= */}
      <div
        className="flex items-center gap-2 pt-6"
        style={{ marginTop: "40px" }}
      >
        <Link
          href={`/temples/${templeSlug}`}
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#C18426] bg-transparent px-5 transition hover:bg-[#FCF5E9]"
        >
          <ArrowLeft className="h-4 w-4 text-[#1F3A44]" />

          <span className="font-cormorant text-[22px] leading-none text-[#1F3A44]">
            Back to Temples
          </span>
        </Link>

        <span className="text-[20px] text-[#A8854E]">/</span>

        <span className="font-cormorant text-[22px] text-[#2F241B]">
          {temple.name}, {temple.location}
        </span>

        <span className="text-[20px] text-[#A8854E]">/</span>

        <span className="font-cormorant text-[22px] text-[#2F241B]">
          Seva Details
        </span>
      </div>

      {/* ================= Hero ================= */}
      <div className="hidden lg:block">
        <div className="flex min-h-[680px] w-full justify-center">
          <div className="flex w-fit items-center gap-24">
            {/* ================= Left Image ================= */}
            <div className="relative h-[450px] w-[620px]">
              <div
                className="absolute inset-0 -translate-y-8"
                style={{ marginTop: "-40px" }}
              >
                <div className="absolute top-1/2 left-1/2 z-10 h-[200px] w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
                  <Image
                    src={seva.image_url || "/images2/default.png"}
                    alt={seva.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <Image
                  src="/images/frame.png"
                  alt=""
                  fill
                  className="pointer-events-none z-20 object-contain"
                />
              </div>
            </div>

            {/* ================= Right Content ================= */}
            <div className="relative min-h-[560px] shrink-0">
              {/* Badge */}

              <div
                className="mb-5 inline-flex h-8 w-fit items-center gap-2 rounded-full border border-[#D89A3D] bg-[#FCF6EA] px-3.5"
                // style={{ marginTop: "30px" }}
              >
                <Handshake
                  size={15}
                  strokeWidth={1.8}
                  className="text-[#0B6670]"
                />

                <span className="font-cormorant text-[18px] leading-none text-[#5B4631]">
                  Temple Seva
                </span>
              </div>
              {/* Heading */}
              <h1
                className="font-cormorant text-[32px] leading-[0.95] font-semibold tracking-[-0.02em] text-[#0B6670]"
                style={{ marginTop: "20px" }}
              >
                {seva.name}
              </h1>
              {/* Temple */}
              <p
                className="font-cormorant mt-4 text-[24px] font-medium text-[#4B392B]"
                style={{ marginTop: "20px" }}
              >
                {temple.name}, {temple.location}
              </p>
              {/* Description */}
              <p
                className="font-cormorant mt-7 max-w-[560px] text-[18px] leading-8 text-[#5D534B]"
                style={{ marginTop: "20px" }}
              >
                {seva.details}
              </p>
              {/* ================= Features ================= */}
              <div
                className="mt-10 grid grid-cols-4 border-[#E7D3AF] pt-7"
                style={{ marginTop: "20px" }}
              >
                {/* Feature 1 */}
                <div className="flex flex-col items-center px-5 text-center">
                  <HandHeart
                    className="mb-3 text-[#D89A3D]"
                    size={24}
                    strokeWidth={1.8}
                  />

                  <p className="font-cormorant text-[15px] leading-5 text-[#5B5146]">
                    Devotional
                    <br />
                    offerings from
                    <br />
                    anywhere
                  </p>
                </div>

                {/* Divider */}
                <div className="relative flex flex-col items-center px-5 text-center before:absolute before:top-2 before:left-0 before:h-14 before:w-px before:bg-[#E7D3AF]">
                  <Sparkles
                    className="mb-3 text-[#D89A3D]"
                    size={24}
                    strokeWidth={1.8}
                  />

                  <p className="font-cormorant text-[15px] leading-5 text-[#5B5146]">
                    Blessings for
                    <br />
                    Prosperity &
                    <br />
                    Well-being
                  </p>
                </div>

                {/* Divider */}
                <div className="relative flex flex-col items-center px-5 text-center before:absolute before:top-2 before:left-0 before:h-14 before:w-px before:bg-[#E7D3AF]">
                  <Camera
                    className="mb-3 text-[#D89A3D]"
                    size={24}
                    strokeWidth={1.8}
                  />

                  <p className="font-cormorant text-[15px] leading-5 text-[#5B5146]">
                    Recorded &
                    <br />
                    shared with
                    <br />
                    Devotee
                  </p>
                </div>

                {/* Divider */}
                <div className="font-cormorant relative flex flex-col items-center px-5 text-center before:absolute before:top-2 before:left-0 before:h-14 before:w-px before:bg-[#E7D3AF]">
                  <ShieldCheck
                    className="mb-3 text-[#D89A3D]"
                    size={24}
                    strokeWidth={1.8}
                  />

                  <p className="text-[15px] leading-5 text-[#5B5146]">
                    100%
                    <br />
                    Secured &
                    <br />
                    Verified
                  </p>
                </div>
              </div>
              {/* Part 2 continues with the price card */}
              {/* ================= Price Card ================= */}
              <div
                className="mt-10 max-w-[520px] rounded-[20px] border border-[#D89A3D] bg-white/90 px-7 py-5 shadow-[0_8px_25px_rgba(216,154,61,0.08)]"
                style={{ marginTop: "40px" }}
              >
                <p
                  className="text-[14px] font-medium text-[#75624C]"
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                >
                  Seva Amount
                </p>

                <div
                  className="mt-2 flex items-end gap-3"
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  <span className="text-[40px] leading-none font-semibold text-[#0B6670]">
                    ₹{seva.price}
                  </span>

                  <span className="mb-2 text-[14px] text-[#7A6A58]">
                    Including Taxes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Mobile Layout ================= */}
          <div className="mt-10 flex flex-col lg:hidden">
            <div className="relative mx-auto h-[340px] w-[340px]">
              <Image
                src={seva.image_url}
                alt={seva.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D89A3D] bg-[#FFF7EA] px-4 py-1">
                <Sparkles size={15} className="text-[#0B6670]" />
                <span className="text-sm font-medium text-[#5D4B33]">
                  Temple Seva
                </span>
              </div>

              <h1 className="font-cormorant text-[46px] leading-none font-semibold text-[#0B6670]">
                {seva.name}
              </h1>

              <p className="mt-3 text-lg text-[#4B392B]">
                {temple.name}, {temple.location}
              </p>

              <p className="mt-5 text-[15px] leading-7 text-[#5D534B]">
                {seva.details}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-y-8">
                <div className="text-center">
                  <HandHeart
                    className="mx-auto mb-2 text-[#D89A3D]"
                    size={22}
                  />

                  <p className="text-sm text-[#5B5146]">
                    Devotional
                    <br />
                    Offerings
                  </p>
                </div>

                <div className="text-center">
                  <Sparkles className="mx-auto mb-2 text-[#D89A3D]" size={22} />

                  <p className="text-sm text-[#5B5146]">
                    Blessings &
                    <br />
                    Prosperity
                  </p>
                </div>

                <div className="text-center">
                  <Camera className="mx-auto mb-2 text-[#D89A3D]" size={22} />

                  <p className="text-sm text-[#5B5146]">
                    Recorded
                    <br />
                    Seva
                  </p>
                </div>

                <div className="text-center">
                  <ShieldCheck
                    className="mx-auto mb-2 text-[#D89A3D]"
                    size={22}
                  />

                  <p className="text-sm text-[#5B5146]">
                    Verified
                    <br />
                    Temple
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[#D89A3D] bg-white p-5">
                <p className="text-sm text-[#75624C]">Seva Amount</p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="font-cormorant text-5xl font-semibold text-[#0B6670]">
                    ₹{seva.price}
                  </span>

                  <span className="mb-1 text-sm text-[#7A6A58]">
                    Including Taxes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
