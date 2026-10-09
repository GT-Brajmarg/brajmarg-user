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

import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ingredients = [
  {
    name: "Pure Sugar Crystals",
    description:
      "Blessed Mishri Prasad offered at the lotus feet of Shreenathji. Made from pure sugar crystals and offered with devotion during daily bhog.",
  },
];

interface Prasad {
  id: string;
  name: string;
  image_url: string;
  ingredients: string;
  price: number;
}

interface Temple {
  id: string;
  name: string;
  location: string;
}

interface Props {
  templeSlug: string;
  temple: Temple;
  prasad: Prasad;
}

export default function PrasadHero({ templeSlug, temple, prasad }: Props) {
  return (
    <section className="bg-tranparent relative h-[650px] overflow-hidden pt-20">
      {/* ================= Breadcrumb ================= */}
      <div
        className="flex items-center gap-2 pt-6"
        style={{ marginTop: "40px" }}
      >
        <Link
          href={`/temples/${templeSlug}`}
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#C18426] bg-transparent px-5 transition hover:bg-[#FCF5E9]"
        >
          <ArrowLeft
            className="h-5 w-5 text-[#0F5C66]"
            style={{ marginLeft: "5px" }}
          />

          <span
            className="font-cormorant text-[22px] leading-none text-[#0F5C66]"
            style={{ marginRight: "5px" }}
          >
            Back to Temples
          </span>
        </Link>

        <span className="text-[20px] text-[#A8854E]">/</span>

        <span className="font-cormorant text-[22px] text-[#2F241B]">
          {temple.name}, {temple.location}
        </span>

        <span className="text-[20px] text-[#A8854E]">/</span>

        <span className="font-cormorant text-[22px] text-[#2F241B]">
          Prasad Details
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
                <div className="absolute top-1/2 left-1/2 z-10 h-[450px] w-[515px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[70px]">
                  <Image
                    src={prasad.image_url || "/images2/default.png"}
                    alt={prasad.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <Image
                  src="/images/frame_1.png"
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
                className="mb-5 inline-flex h-8 w-fit items-center gap-2 rounded-full border border-[#D89A3D] bg-transparent px-3.5"
                // style={{ marginTop: "30px" }}
              >
                <Image
                  src="/images/handshake-icon.svg" // replace with your image path
                  alt="Handshake"
                  width={15}
                  height={15}
                  className="ml-[10px] h-[20px] w-[20px] shrink-0 object-contain"
                  style={{ marginLeft: "10px" }}
                />

                <span
                  className="font-cormorant text-[18px] leading-none text-[#5B4631]"
                  style={{ width: "120px" }}
                >
                  Temple Prasad
                </span>
              </div>
              {/* Heading */}
              <h1
                className="font-cormorant text-[52px] leading-[0.95] font-semibold tracking-[-0.02em] text-[#0B6670]"
                style={{ marginTop: "20px" }}
              >
                {prasad.name}
              </h1>
              {/* Temple */}
              <p
                className={`${cormorantInfant.className} mt-4 text-[24px] font-bold text-[#3D352F]`}
                style={{ marginTop: "20px" }}
              >
                {temple.name}, {temple.location}
              </p>
              {/* Description */}
              <p
                className="font-inter mt-7 max-w-[560px] text-[16px] leading-8 text-[#3D352F]"
                style={{ marginTop: "20px" }}
              >
                {ingredients[0].description}
              </p>
              {/* ================= Features ================= */}
              <div
                className="mt-10 grid grid-cols-4 border-[#E7D3AF] pt-7"
                style={{ marginTop: "20px" }}
              >
                {/* Feature 1 */}
                <div className="flex flex-col items-center px-5 text-center">
                  <Image
                    src="/images/hand-heart-icon.svg" // replace with your image path
                    alt="Hand Heart"
                    width={24}
                    height={24}
                    className="mb-3 h-6 w-6 object-contain"
                  />
                  <p
                    className={`${cormorantInfant.className} text-[15px] leading-5 font-bold text-[#3D352F]`}
                  >
                    Offered in
                    <br />
                    daily Bhog
                  </p>
                </div>

                {/* Divider */}
                <div className="relative flex flex-col items-center px-5 text-center before:absolute before:top-2 before:left-0 before:h-14 before:w-px before:bg-[#E7D3AF]">
                  <Image
                    src="/images/sparkles-icon.svg" // replace with your image path
                    alt="Sparkles"
                    width={24}
                    height={24}
                    className="mb-3 h-6 w-6 object-contain"
                  />
                  <p
                    className={`${cormorantInfant.className} text-[15px] leading-5 font-bold text-[#3D352F]`}
                  >
                    Temple
                    <br />
                    authentic
                  </p>
                </div>

                {/* Divider */}
                <div className="relative flex flex-col items-center px-5 text-center before:absolute before:top-2 before:left-0 before:h-14 before:w-px before:bg-[#E7D3AF]">
                  <Image
                    src="/images/package-icon.svg" // replace with your image path
                    alt="Package"
                    width={24}
                    height={24}
                    className="mb-3 h-6 w-6 object-contain"
                  />

                  <p
                    className={`${cormorantInfant.className} text-[15px] leading-5 font-bold text-[#3D352F]`}
                  >
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

                  <p
                    className={`${cormorantInfant.className} text-[15px] leading-5 font-bold text-[#3D352F]`}
                  >
                    Securely
                    <br />
                    Packaged
                  </p>
                </div>
              </div>
              {/* Part 2 continues with the price card */}
              {/* ================= Price Card ================= */}
              <div
                className="mt-10 max-w-[520px] rounded-[20px] border border-[#D89A3D] bg-[#EFDEC7]/40 px-7 py-5 shadow-[0_8px_25px_rgba(216,154,61,0.08)]"
                style={{ marginTop: "40px" }}
              >
                <p
                  className={`${cormorantInfant.className} text-[14px] font-bold text-[#3D352F]`}
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                >
                  Prasad Amount
                </p>

                <div
                  className="mt-2 flex items-end gap-3"
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  <span className="text-[40px] leading-none font-semibold text-[#0B6670]">
                    ₹{prasad.price}
                  </span>

                  <span
                    className={`${cormorantInfant.className} mb-2 text-[14px] font-bold text-[#3D352F]`}
                  >
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
                src={prasad.image_url}
                alt={prasad.name}
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
                {prasad.name}
              </h1>

              <p className="mt-3 text-lg text-[#4B392B]">
                {temple.name}, {temple.location}
              </p>

              <p className="mt-5 text-[15px] leading-7 text-[#5D534B]">
                {prasad.ingredients}
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
                  <span className="font-cormorant text-5xl font-semibold text-[#0B6670]">
                    ₹{prasad.price}
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
