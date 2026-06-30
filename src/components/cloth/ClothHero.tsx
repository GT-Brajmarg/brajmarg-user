"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Gift,
  Package,
  Truck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Cloth {
  id: string;
  name: string;
  image_url: string;
  description: string;
}
interface Temple {
  id: string;
  name: string;
  location: string;
}

interface Props {
  templeSlug: string;
  temple: Temple;
  cloth: Cloth;
}

export default function FrameHero({ templeSlug, temple, cloth }: Props) {
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
          Product Details
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
                <div className="absolute top-1/2 left-1/2 z-10 h-[450px] w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                  <Image
                    src={cloth.image_url || "/images2/default.png"}
                    alt={cloth.name}
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
                <Gift
                  size={15}
                  strokeWidth={1.8}
                  className="text-[#0B6670]"
                  style={{ marginLeft: "10px" }}
                />

                <span
                  className="font-cormorant text-[18px] leading-none text-[#5B4631]"
                  style={{ width: "120px" }}
                >
                  Temple Blessing
                </span>
              </div>
              {/* Heading */}
              <h1
                className="font-cormorant text-[52px] leading-[0.95] font-semibold tracking-[-0.02em] text-[#0B6670]"
                style={{ marginTop: "20px" }}
              >
                {cloth.name}
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
                {cloth.description}
              </p>
              {/* ================= Features ================= */}
              <div
                className="mt-10 grid grid-cols-4 border-[#E7D3AF] pt-7"
                style={{ marginTop: "20px" }}
              >
                {/* Feature 1 */}
                <div className="flex flex-col items-center px-5 text-center">
                  <Gift
                    className="mb-3 text-[#D89A3D]"
                    size={24}
                    strokeWidth={1.8}
                  />

                  <p className="font-cormorant text-[15px] leading-5 text-[#5B5146]">
                    Offered in
                    <br />
                    daily Bhog
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
                    Temple
                    <br />
                    authentic
                  </p>
                </div>

                {/* Divider */}
                <div className="relative flex flex-col items-center px-5 text-center before:absolute before:top-2 before:left-0 before:h-14 before:w-px before:bg-[#E7D3AF]">
                  <Package
                    className="mb-3 text-[#D89A3D]"
                    size={24}
                    strokeWidth={1.8}
                  />

                  <p className="font-cormorant text-[15px] leading-5 text-[#5B5146]">
                    Pure and
                    <br />
                    Traditional
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
                    Securely
                    <br />
                    Packaged
                  </p>
                </div>
              </div>
              {/* Part 2 continues with the price card */}
              {/* ================= Price Card ================= */}
              <div
                className="mt-10 h-[50px] max-w-[520px] rounded-[20px] border border-[#D89A3D] bg-white/90 px-7 py-5 shadow-[0_8px_25px_rgba(216,154,61,0.08)]"
                style={{ marginTop: "40px" }}
              >
                <div
                  className="mt-2 flex items-end gap-3"
                  style={{
                    marginLeft: "10px",
                    marginBottom: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                  }}
                >
                  <p className="text-lg font-semibold text-[#0B6670]">
                    Choose your preferred size and material to see the price.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Mobile Layout ================= */}
          <div className="mt-10 flex flex-col lg:hidden">
            <div className="relative mx-auto h-[340px] w-[340px]">
              <Image
                src={cloth.image_url}
                alt={cloth.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D89A3D] bg-[#FFF7EA] px-4 py-1">
                <Sparkles size={15} className="text-[#0B6670]" />
                <span className="text-sm font-medium text-[#5D4B33]">
                  Temple Prasad
                </span>
              </div>

              <h1 className="font-cormorant text-[46px] leading-none font-semibold text-[#0B6670]">
                {cloth.name}
              </h1>

              <p className="mt-3 text-lg text-[#4B392B]">
                {temple.name}, {temple.location}
              </p>

              <p className="mt-5 text-[15px] leading-7 text-[#5D534B]">
                {cloth.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-y-8">
                <div className="text-center">
                  <Gift className="mx-auto mb-2 text-[#D89A3D]" size={22} />

                  <p className="text-sm text-[#5B5146]">
                    Offered in
                    <br />
                    daily Bhog
                  </p>
                </div>

                <div className="text-center">
                  <Sparkles className="mx-auto mb-2 text-[#D89A3D]" size={22} />

                  <p className="text-sm text-[#5B5146]">
                    Temple
                    <br />
                    Authentic
                  </p>
                </div>

                <div className="text-center">
                  <Sparkles className="mx-auto mb-2 text-[#D89A3D]" size={22} />

                  <p className="text-sm text-[#5B5146]">
                    Pure and
                    <br />
                    Traditional
                  </p>
                </div>

                <div className="text-center">
                  <ShieldCheck
                    className="mx-auto mb-2 text-[#D89A3D]"
                    size={22}
                  />

                  <p className="text-sm text-[#5B5146]">
                    Securely
                    <br />
                    Packaged
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[#D89A3D] bg-white p-5">
                <p className="text-sm text-[#75624C]">Prasad Price</p>

                <div className="mt-2 flex items-end gap-2">
                  <p className="text-lg font-semibold text-[#0B6670]">
                    Choose your preferred size and material to see the price.
                  </p>

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
