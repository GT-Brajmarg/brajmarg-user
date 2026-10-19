import { Suspense } from "react";
import Image from "next/image";

import BookingHero from "@/components/yatra/booking/BookingHero";
import BookingSummary from "@/components/yatra/booking/BookingSummary";
import BookingForm from "@/components/yatra/booking/BookingForm";

interface BookYatraPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookYatraPage({ params }: BookYatraPageProps) {
  const { slug } = await params;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F7F0E5]">
      {/* ── Background layers ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover opacity-34 mix-blend-multiply"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[320px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[1100px] left-1/2 w-[950px] -translate-x-1/2 opacity-[0.04] md:w-[1100px]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[2000px] left-1/2 w-[950px] -translate-x-1/2 opacity-[0.04] md:w-[1100px]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[3050px] left-1/2 w-[950px] -translate-x-1/2 opacity-[0.04] md:w-[1100px]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute bottom-[-250px] left-1/2 w-[750px] -translate-x-1/2 opacity-[0.035] md:w-[900px]"
        />
      </div>

      {/* ── Page Content ── */}
      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-[1200px]">
          {/* Hero Header */}
          <BookingHero />

          {/* ── Card 1: Booking Summary ── */}
          <div className="overflow-hidden rounded-[20px] border-2 border-[#C37000] bg-[rgba(239,222,199,0.4)] shadow-[0_8px_32px_rgba(195,112,0,0.10)]">
            <Suspense fallback={null}>
              <BookingSummary />
            </Suspense>
          </div>

          {/* ── Card 2: Interactive Booking Form ── */}
          <div className="mt-6 mb-12 overflow-hidden rounded-[20px] border-2 border-[#C37000] bg-[rgba(239,222,199,0.4)] shadow-[0_8px_32px_rgba(195,112,0,0.10)]">
            <BookingForm slug={slug} />
          </div>
        </div>
      </div>
    </main>
  );
}
