"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";

const sevaDetails =
  "Offered during the afternoon Rajbhog, this seva includes bhog, vastra, and special prayers for the well-being and prosperity of you and your family.";

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
          Seva Details
        </span>
      </div>

      {/* ================= Hero Content ================= */}
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[480px_1fr] lg:gap-10 xl:gap-12">
        {/* ================= Left Image ================= */}
        <div className="relative mx-auto lg:mx-0 w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] aspect-[1862/1756]">
          {/* Photo layer — fills the inner frame completely matching reference */}
          <div className="absolute top-[4%] bottom-[4%] left-[4.5%] right-[4.5%] overflow-hidden rounded-[36px] sm:rounded-[48px] lg:rounded-[56px] z-10">
            <Image
              src={seva.image_url || "/images2/default.png"}
              alt={seva.name}
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
            className="pointer-events-none z-20 object-contain"
          />
        </div>

        {/* ================= Right Content ================= */}
        <div className="flex flex-col">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D89A3D] bg-transparent px-3.5 py-1">
            <Image
              src="/images/handshake-icon.svg"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4 shrink-0 object-contain"
            />
            <span className="font-cormorant text-[16px] sm:text-[17px] font-medium leading-none text-[#5B4631]">
              Temple Seva
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant mt-3 text-[34px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.05] tracking-[-0.01em] text-[#0B6670]">
            {seva.name}
          </h1>

          {/* Temple */}
          <p
            className={`${cormorantInfant.className} mt-2 text-[18px] sm:text-[22px] font-bold text-[#3D352F]`}
          >
            {temple.name}, {temple.location}
          </p>

          {/* Description */}
          <p className="font-cormorant mt-3 max-w-[580px] text-[15px] sm:text-[16px] leading-relaxed text-[#3D352F]">
            {sevaDetails}
          </p>

          {/* ================= Features Bar ================= */}
          <div className="mt-6 sm:mt-8 grid grid-cols-4 items-center border-[#E7D3AF] py-1">
            {/* Feature 1 */}
            <div className="flex flex-col items-center px-1 sm:px-2 text-center">
              <Image
                src="/images/hand-heart-icon.svg"
                alt="Hand Heart"
                width={24}
                height={24}
                className="mb-2 h-5 w-5 sm:h-6 sm:w-6 object-contain"
              />
              <p
                className={`${cormorantInfant.className} text-[13px] sm:text-[15px] leading-tight font-semibold text-[#3D352F]`}
              >
                Devotional
                <br />
                offerings
              </p>
            </div>

            {/* Divider + Feature 2 */}
            <div className="relative flex flex-col items-center px-1 sm:px-2 text-center before:absolute before:top-1 before:left-0 before:h-12 before:w-px before:bg-[#E7D3AF]">
              <Image
                src="/images/sparkles-icon.svg"
                alt="Sparkles"
                width={22}
                height={22}
                className="mb-2 h-5 w-5 sm:h-6 sm:w-6 object-contain"
              />
              <p
                className={`${cormorantInfant.className} text-[13px] sm:text-[15px] leading-tight font-semibold text-[#3D352F]`}
              >
                Blessings for
                <br />
                Prosperity
              </p>
            </div>

            {/* Divider + Feature 3 */}
            <div className="relative flex flex-col items-center px-1 sm:px-2 text-center before:absolute before:top-1 before:left-0 before:h-12 before:w-px before:bg-[#E7D3AF]">
              <Image
                src="/images/camera-icon.svg"
                alt="Camera"
                width={22}
                height={22}
                className="mb-2 h-5 w-5 sm:h-6 sm:w-6 object-contain"
              />
              <p
                className={`${cormorantInfant.className} text-[13px] sm:text-[15px] leading-tight font-semibold text-[#3D352F]`}
              >
                Recorded &
                <br />
                shared
              </p>
            </div>

            {/* Divider + Feature 4 */}
            <div className="relative flex flex-col items-center px-1 sm:px-2 text-center before:absolute before:top-1 before:left-0 before:h-12 before:w-px before:bg-[#E7D3AF]">
              <ShieldCheck
                className="mb-2 text-[#D89A3D]"
                size={22}
                strokeWidth={1.8}
              />
              <p
                className={`${cormorantInfant.className} text-[13px] sm:text-[15px] leading-tight font-semibold text-[#3D352F]`}
              >
                100% Secured
                <br />
                & Verified
              </p>
            </div>
          </div>

          {/* ================= Price Card ================= */}
          <div className="mt-6 sm:mt-8 w-full max-w-[560px] rounded-[18px] border border-[#C18426] bg-[#EFDEC7]/40 px-5 sm:px-7 py-3 sm:py-3.5 shadow-sm">
            <p className="font-cormorant text-[14px] font-semibold text-[#75624C]">
              Seva Amount
            </p>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-cormorant text-[32px] sm:text-[38px] font-bold leading-none text-[#0B6670]">
                ₹{seva.price}
              </span>
              <span className="font-cormorant text-[14px] font-medium text-[#7A6A58]">
                Including Taxes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
