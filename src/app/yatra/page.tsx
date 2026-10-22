import Image from "next/image";

import type { Metadata } from "next";

import YatraHero from "@/components/yatra/YatraHero";
// import YatraFilters from "@/components/yatra/page/YatraFilters";
import FeaturedYatras from "@/components/yatra/FeaturedYatras";
import WhyTravelWithUs from "@/components/yatra/WhyTravelWithUs";
import YatraPageClient from "@/components/yatra/YatraPageClient";
// import WhyTravelWithUs from "@/components/yatra/page/WhyTravelWithUs";

export const metadata: Metadata = {
  title: "Yatra",
  description: "Curated pilgrimages and sacred spiritual yatras across Braj Bhoomi.",
};

export default function YatraPage() {
  return (
    <YatraPageClient>
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F7F0E5]">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Paper Texture */}
        <Image
          src="/images/paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="pointer-events-none object-cover opacity-34 mix-blend-multiply"
        />

        {/* Mandala Behind Filters */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[640px] left-1/2 w-[950px] -translate-x-1/2 opacity-[0.045]"
        />

        {/* Mandala Behind Cards */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[1500px] left-1/2 w-[1000px] -translate-x-1/2 opacity-[0.04]"
        />

        {/* Bottom Mandala */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute bottom-[-260px] left-1/2 w-[800px] -translate-x-1/2 opacity-[0.035]"
        />
      </div>

      {/* Hero */}
      <div className="relative z-10">
        <YatraHero />
      </div>

      {/* Content */}
      <section className="relative z-10 py-10">
        <div className="relative z-10 flex w-full justify-center px-5 sm:px-8 lg:px-12">
          <div className="w-full max-w-[1200px] space-y-8">
            {/* <YatraFilters /> */}
            <FeaturedYatras />
            <WhyTravelWithUs />
          </div>
        </div>
      </section>
    </main>
    </YatraPageClient>
  );
}
