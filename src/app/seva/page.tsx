import Image from "next/image";

import SevaHero from "@/components/seva/page/SevaHero";
import SevaFilters from "@/components/seva/page/SevaFilters";
import FeaturedSevas from "@/components/seva/page/FeaturedSevas";
import HowSevaWorks from "@/components/seva/page/HowSevaWorks";
// import SevaDateSection from "@/components/seva/SevaDateSection";
// import SevaTypeSection from "@/components/seva/SevaTypeSection";
// import FeaturedSevas from "@/components/seva/FeaturedSevas";

export default function SevaPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F8F2E8]">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Paper Texture */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />

        {/* Mandala behind Date Selection */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[620px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />

        {/* Mandala behind Seva Types */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[1200px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
        />

        {/* Mandala behind Featured Sevas */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[1850px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
        />

        {/* Bottom Mandala */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute bottom-[-250px] left-1/2 w-[750px] max-w-none -translate-x-1/2 opacity-[0.035] md:w-[900px]"
        />
      </div>

      {/* Hero */}
      <div className="relative z-10 w-full">
        <SevaHero />
      </div>

      {/* Content */}
      <section className="relative z-10 py-10">
        <div className="relative z-10 flex w-full justify-center px-5 sm:px-8 lg:px-12">
          <div className="w-full max-w-[1200px] space-y-8">
            <SevaFilters />
            <FeaturedSevas />
            <HowSevaWorks />
            {/* <SevaDateSection />
            <SevaTypeSection />
            <FeaturedSevas /> */}
          </div>
        </div>
      </section>
    </main>
  );
}
