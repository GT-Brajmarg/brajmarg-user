"use client";

import Image from "next/image";
import { cormorantInfant } from "@/lib/fonts";

export default function ProfileHero() {
  return (
    <section className="relative pb-4 sm:pb-6">
      {/* Temple Illustration */}
      <Image
        src="/images/temple-outline.svg"
        alt=""
        width={448}
        height={200}
        priority
        className="pointer-events-none absolute right-0 bottom-0 opacity-20 sm:opacity-40 md:opacity-100 max-h-[130px] sm:max-h-[170px] md:max-h-[200px] w-auto object-contain"
      />

      <div className="relative z-10 pt-2 sm:pt-4">
        <h1
          className={`${cormorantInfant.className} text-[26px] sm:text-[30px] md:text-[34px] leading-tight font-bold text-[#0F5C66]`}
        >
          My Profile
        </h1>

        {/* Lotus Divider */}
        <div className="my-2.5 sm:my-3 flex items-center">
          <Image
            src="/images/group_lotus.png"
            alt=""
            width={180}
            height={50}
            className="h-auto w-[140px] sm:w-[170px] object-contain"
          />
        </div>

        <p
          className={`${cormorantInfant.className} max-w-xl text-[17px] sm:text-[19px] md:text-[20px] leading-relaxed font-semibold text-[#3D352F]`}
        >
          View and manage your personal details, contact information, and saved address.
        </p>
      </div>
    </section>
  );
}
