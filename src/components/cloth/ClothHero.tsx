"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

const clothDescription =
  "A sacred poshak cloth offered with devotion at the lotus feet of Shreenathji. Crafted with traditional detailing, it is ideal for seva, home temples, and auspicious occasions.";

export default function ClothHero({ templeSlug, temple, cloth }: Props) {
  return (
    <section className="relative w-full bg-transparent pt-6 sm:pt-8 md:pt-10">
      {/* ================= Breadcrumb ================= */}
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
        <Link
          href={`/temples/${templeSlug}`}
          className="inline-flex h-9 sm:h-10 items-center gap-2 rounded-lg border border-[#C18426] bg-transparent px-3.5 sm:px-4 transition hover:bg-[#FCF5E9]"
        >
          <ArrowLeft className="h-4 w-4 text-[#0F5C66]" />
          <span className="font-cormorant text-[17px] sm:text-[19px] font-semibold leading-none text-[#0F5C66]">
            Back to Temples
          </span>
        </Link>

        <span className="text-[18px] text-[#A8854E]">/</span>

        <span className="font-cormorant text-[18px] sm:text-[20px] font-medium text-[#2F241B]">
          {temple.name}, {temple.location}
        </span>

        <span className="text-[18px] text-[#A8854E]">/</span>

        <span className="font-cormorant text-[18px] sm:text-[20px] font-medium text-[#2F241B]">
          Product Details
        </span>
      </div>

      {/* ================= Hero Content ================= */}
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[480px_1fr] lg:gap-10 xl:gap-12">
        {/* ================= Left Image ================= */}
        <div className="relative mx-auto lg:mx-0 w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] aspect-[1862/1756]">
          {/* Photo layer — placed strictly inside the inner decorative frame opening */}
          <div className="absolute top-[11.5%] left-[8%] h-[78%] w-[84%] overflow-hidden rounded-[18px] sm:rounded-[24px] z-0">
            <Image
              src={cloth.image_url || "/images2/default.png"}
              alt={cloth.name}
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Frame overlay */}
          <Image
            src="/images/frame_1.png"
            alt=""
            fill
            priority
            className="pointer-events-none z-10 object-contain brightness-[1.15] contrast-[1.1] drop-shadow-[0_0_1px_rgba(90,55,15,0.75)] drop-shadow-[0_1px_3px_rgba(130,80,20,0.3)]"
          />
        </div>

        {/* ================= Right Content ================= */}
        <div className="flex flex-col">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D89A3D] bg-transparent px-3.5 py-1">
            <Image
              src="/images/temple-blessed.svg"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4 shrink-0 object-contain"
            />
            <span className="font-cormorant text-[16px] sm:text-[17px] font-medium leading-none text-[#5B4631]">
              Temple Blessing
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant mt-3 text-[34px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.05] tracking-[-0.01em] text-[#0B6670]">
            {cloth.name}
          </h1>

          {/* Temple */}
          <p
            className={`${cormorantInfant.className} mt-2 text-[18px] sm:text-[22px] font-bold text-[#3D352F]`}
          >
            {temple.name}, {temple.location}
          </p>
          {/* Description */}
          <p className="font-cormorant mt-3 max-w-[580px] text-[15px] sm:text-[16px] leading-relaxed text-[#3D352F]">
            {clothDescription}
          </p>
          {/* ================= Features ================= */}
          <div
            className="mt-10 grid grid-cols-4 border-[#E7D3AF] pt-7"
            style={{ marginTop: "20px" }}
          >
            {/* Feature 1 */}
            <div className="flex flex-col items-center px-5 text-center">
              <Image
                src="/images/star.svg"
                alt="Handcrafted"
                width={22}
                height={22}
                className="mb-2 h-5 w-5 sm:h-6 sm:w-6 object-contain"
              />
              <p
                className={`${cormorantInfant.className} text-[15px] leading-5 font-bold text-[#3D352F]`}
              >
                Offered in
                <br />
                daily Bhog
              </p>
            </div>

            {/* Divider + Feature 3 */}
            <div className="relative flex flex-col items-center px-1 sm:px-2 text-center before:absolute before:top-1 before:left-0 before:h-12 before:w-px before:bg-[#E7D3AF]">
              <Image
                src="/images/temple-blessed.svg"
                alt="Temple Blessed"
                width={22}
                height={22}
                className="mb-2 h-5 w-5 sm:h-6 sm:w-6 object-contain"
              />
              <p
                className={`${cormorantInfant.className} text-[13px] sm:text-[15px] leading-tight font-semibold text-[#3D352F]`}
              >
                Temple
                <br />
                authentic
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
                Pure and
                <br />
                Traditional
              </p>
            </div>

            {/* Divider */}
            <div className="font-cormorant relative flex flex-col items-center px-5 text-center before:absolute before:top-2 before:left-0 before:h-14 before:w-px before:bg-[#E7D3AF]">
              <ShieldCheck
                className="mb-2 text-[#D89A3D]"
                size={22}
                strokeWidth={1.8}
              />
              <p
                className={`${cormorantInfant.className} text-[13px] sm:text-[15px] leading-tight font-semibold text-[#3D352F]`}
              >
                Securely
                <br />
                packaged
              </p>
            </div>
          </div>
          {/* Part 2 continues with the price card */}
          {/* ================= Price Card ================= */}
          <div
            className="mt-10 h-[50px] max-w-[520px] rounded-[20px] border border-[#D89A3D] bg-[#EFDEC7]/40 px-7 py-5 shadow-[0_8px_25px_rgba(216,154,61,0.08)]"
            style={{ marginTop: "40px" }}
          >
            <div
              className="mt-2 flex items-end gap-3"
              style={{
                marginLeft: "20px",
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
          {cloth.image_url ? (
            <Image
              src={cloth.image_url}
              alt={cloth.name}
              fill
              className="object-contain"
            />
          ) : null}
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
    </section >
  );
}
