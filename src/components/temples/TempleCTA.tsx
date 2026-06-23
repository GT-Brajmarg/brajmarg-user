"use client";

import Image from "next/image";
import Link from "next/link";

export default function TempleCTA() {
  return (
    <section className="mx-auto mt-16 max-w-[1180px]">
      <div className="flex h-[120px] items-center justify-between rounded-[18px] border border-[#D49A2A] bg-[#F8F1E6] px-12">
        {/* Left */}
        <div className="flex items-center gap-5">
          <Image
            src="/images/temple-icon-orange.png"
            alt=""
            width={202}
            height={202}
            className="object-contain"
          />

          <div>
            <h3 className="font-cormorant text-[28px] leading-none font-semibold text-[#0D6B73]">
              Can’t find your Temple ?
            </h3>

            <p className="mt-2 text-[15px] leading-[24px] text-[#5F5140]">
              Request us to add a temple and help others to connect with divine
              places.
            </p>
          </div>
        </div>

        {/* Right */}
        <Link
          href="/request-temple"
          className="flex h-[42px] min-w-[185px] items-center justify-center rounded-[8px] bg-[#0D6B73] px-6 font-medium text-[#EFDEC7] text-white transition hover:bg-[#0A5960]"
          style={{ marginRight: "50px" }}
        >
          Request a Temple →
        </Link>
      </div>
    </section>
  );
}
