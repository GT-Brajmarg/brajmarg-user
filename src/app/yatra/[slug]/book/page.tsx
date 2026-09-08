import Image from "next/image";

import BookingHero from "@/components/yatra/booking/BookingHero";
import BookingSummary from "@/components/yatra/booking/BookingSummary";
// import ContactDetails from "@/components/yatra/booking/ContactDetails";
// import TravelDetails from "@/components/yatra/booking/TravelDetails";
// import TravellerDetails from "@/components/yatra/booking/TravellerDetails";
// import ImportantNotice from "@/components/yatra/booking/ImportantNotice";
// import BookingFooter from "@/components/yatra/booking/BookingFooter";

export default function BookYatraPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          className="object-cover opacity-[0.42]"
        />

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

      <div className="relative z-10 flex w-full justify-center px-5 sm:px-8 lg:px-12">
        <div className="w-full max-w-[1200px] space-y-8">
          <BookingHero />

          <div className="mt-6 rounded-[20px] border border-[#C37000] bg-[#FFF9F1]/80">
            <BookingSummary />

            {/* <ContactDetails />

          <TravelDetails />

          <TravellerDetails />

          <ImportantNotice />

          <BookingFooter /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
