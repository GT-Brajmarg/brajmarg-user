import type { Metadata } from "next";
import SubscribeHero from "@/components/subscribe-alerts/SubscribeHero";
import AlertCategories from "@/components/subscribe-alerts/AlertCategories";
import SubscriptionPlans from "@/components/subscribe-alerts/SubscriptionPlans";
import HowAlertsWork from "@/components/subscribe-alerts/HowSevaWorks";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Daily Darshan Alerts",
  description: "Receive sacred daily darshan and festival alerts from Braj temples directly on WhatsApp.",
};

export default function SubscribeAlertsPage() {
  return (
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

        {/* Lite Lotus BG — desktop only */}
        <div className="hidden lg:block pointer-events-none absolute top-[490px] inset-0 z-0 overflow-hidden">
          <Image
            src="/images/lite-lotus-bg.png"
            alt=""
            width={1500}
            height={100}
            className="object-cover opacity-70"
          />
        </div>

        {/* Decorative Mandalas */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[380px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[1500px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[2650px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        <SubscribeHero />

        <div className="relative z-10 mx-auto flex justify-center">
          <div className="w-full max-w-[1200px] px-4 py-10">
            <AlertCategories />
            <SubscriptionPlans />
            <HowAlertsWork />
          </div>
        </div>
      </div>
    </main>
  );
}
