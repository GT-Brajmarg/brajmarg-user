import Image from "next/image";

import YatraHero from "@/components/yatra/details/YatraHero";
import RouteOverview from "@/components/yatra/details/RouteOverview";
import TempleCarousel from "@/components/yatra/details/TempleCarousel";
import DayWiseItinerary from "@/components/yatra/details/DayWiseItinerary";
import PlacesAlongJourney from "@/components/yatra/details/PlacesAlongJourney";
import PackageSelection from "@/components/yatra/details/PackageSelection";
import IncludedSection from "@/components/yatra/details/IncludedSection";
import CustomizationSection from "@/components/yatra/details/CustomizationSection";
import StickyBookingBar from "@/components/yatra/details/StickyBookingBar";
// import RouteOverview from "@/components/yatra/details/RouteOverview";
// import TempleCarousel from "@/components/yatra/details/TempleCarousel";
// import DayWiseItinerary from "@/components/yatra/details/DayWiseItinerary";
// import PlacesAlongJourney from "@/components/yatra/details/PlacesAlongJourney";
// import PackageSelection from "@/components/yatra/details/PackageSelection";
// import IncludedSection from "@/components/yatra/details/IncludedSection";
// import CustomizationSection from "@/components/yatra/details/CustomizationSection";
// import StickyBookingBar from "@/components/yatra/details/StickyBookingBar";

export default function YatraDetailsPage() {
  return (
    <>
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

          {/* Hero Mandala */}
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[320px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
          />

          {/* Temple Carousel */}
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[1100px] left-1/2 w-[950px] -translate-x-1/2 opacity-[0.04] md:w-[1100px]"
          />

          {/* Itinerary */}
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[2000px] left-1/2 w-[950px] -translate-x-1/2 opacity-[0.04] md:w-[1100px]"
          />

          {/* Packages */}
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[3050px] left-1/2 w-[950px] -translate-x-1/2 opacity-[0.04] md:w-[1100px]"
          />

          {/* Bottom */}
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={900}
            height={900}
            className="absolute bottom-[-250px] left-1/2 w-[750px] -translate-x-1/2 opacity-[0.035] md:w-[900px]"
          />
        </div>

        {/* Page Content */}
        <div className="relative z-10">
          <YatraHero />

          <section className="py-8">
            <div className="relative z-10 flex w-full justify-center px-5 sm:px-8 lg:px-12">
              <div className="w-full max-w-[1200px] space-y-8">
                <div
                  className="grid grid-cols-[320px_1fr] gap-5"
                  style={{ marginTop: "-30px" }}
                >
                  <RouteOverview />
                  <TempleCarousel />
                </div>
                <DayWiseItinerary />
                <PlacesAlongJourney />
                <PackageSelection />

                <div
                  className="grid gap-5 lg:grid-cols-[2fr_1fr]"
                  style={{ marginTop: "20px" }}
                >
                  <IncludedSection />
                  <CustomizationSection />
                </div>
                <StickyBookingBar />
                {/* <RouteOverview />

              <TempleCarousel />

              <DayWiseItinerary />

              <PlacesAlongJourney />

              <PackageSelection /> */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
                  {/* <IncludedSection />

                <CustomizationSection /> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      {/* <StickyBookingBar /> */}
    </>
  );
}
