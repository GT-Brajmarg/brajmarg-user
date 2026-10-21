import { Suspense } from "react";
import Image from "next/image";

import BookingFlow from "@/components/yatra/booking/BookingFlow";

interface BookYatraPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookYatraPage({ params }: BookYatraPageProps) {
  const { slug } = await params;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F7F0E5]">
      {/* ── Background layers ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
      </div>

      {/* ── Page Content ── */}
      <div className="relative z-10 flex w-full justify-center px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-[1200px]">
          <Suspense fallback={null}>
            <BookingFlow slug={slug} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
