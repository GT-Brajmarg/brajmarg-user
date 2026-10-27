import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import SupportScreen from "@/components/dashboard/settings/SupportScreen";
import { cormorantInfant } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Help & Support | Devotee Care",
  description:
    "Devotee Care desk for Brajmarg - assistance with orders, holy prasad delivery, seva bookings, yatra pilgrimages, payments and refunds.",
};

export default function SupportPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F9F2E8]">
      {/* Background paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />

        {/* Subtle decorative mandala */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[60px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation Breadcrumbs / Back links */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#C37000]/25">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={`inline-flex items-center gap-1.5 rounded-lg border border-[#C37000]/30 bg-[#FFFDF9]/80 px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#0F5C66] hover:bg-[#FAF3E7] hover:border-[#C37000] transition ${cormorantInfant.className}`}
            >
              <Home size={15} />
              <span>Home</span>
            </Link>

            <span className="text-[#C37000]/50">/</span>

            <Link
              href="/profile/settings"
              className={`inline-flex items-center gap-1.5 rounded-lg border border-[#C37000]/30 bg-[#FFFDF9]/80 px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#0F5C66] hover:bg-[#FAF3E7] hover:border-[#C37000] transition ${cormorantInfant.className}`}
            >
              <ArrowLeft size={15} />
              <span>Back to Settings</span>
            </Link>
          </div>

        </div>

        {/* Support Screen Component */}
        <SupportScreen showBackButton={false} />
      </div>
    </main>
  );
}
