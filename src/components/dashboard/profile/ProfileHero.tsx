"use client";

import Image from "next/image";
import { cormorantInfant } from "@/lib/fonts";

export default function ProfileHero() {
  return (
    <section className="relative pb-5">
      {/* Temple Illustration */}
      <Image
        src="/images/temple-outline.svg"
        alt=""
        width={448}
        height={200}
        priority
        className="pointer-events-none absolute right-0 bottom-0 opacity-40 md:opacity-100"
      />

      <div className="relative z-10" style={{ marginTop: "20px" }}>
        <h1
          className={`${cormorantInfant.className} text-[32px] leading-none font-bold text-[#0F5C66]`}
        >
          My Profile
        </h1>

        {/* Lotus Divider */}
        <div
          className="mt-4 flex items-center"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
             <Image
            src="/images/group_lotus.png"
            alt=""
            width={180}
            height={50}
            className="mx-3"
            style={{ marginLeft: "1px" }}
          />
        </div>

        <p
          className={`${cormorantInfant.className} mt-3 max-w-sm text-[18px] sm:text-[20px] leading-relaxed font-bold text-[#3D352F]`}
        >
          View and manage your personal details, contact information, and saved address.
        </p>
      </div>
    </section>
  );
}
