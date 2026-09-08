import SubscribeHero from "@/components/subscribe-alerts/SubscribeHero";
import AlertCategories from "@/components/subscribe-alerts/AlertCategories";
import SubscriptionPlans from "@/components/subscribe-alerts/SubscriptionPlans";
import HowAlertsWork from "@/components/subscribe-alerts/HowSevaWorks";
import Image from "next/image";

export default function SubscribeAlertsPage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#F8F2E8]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Paper Texture */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />

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

      <div className="relative z-10 w-full">
        <SubscribeHero />
      </div>

      {/* Foreground */}
      <div className="relative z-10 mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          {/* Hero */}
          <AlertCategories />
          <SubscriptionPlans />
          <HowAlertsWork />
          {/* Why Subscribe */}
        </div>
      </div>
    </main>
  );
}
