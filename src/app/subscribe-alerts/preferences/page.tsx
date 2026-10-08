"use client";

import Image from "next/image";

import AlertPreferenceHero from "@/components/subscribe-alerts/AlertPreferenceHero";
import UpdateTypes from "@/components/subscribe-alerts/UpdateTypes";
import FrequencySelector from "@/components/subscribe-alerts/FrequencySelector";
import LanguageSelector from "@/components/subscribe-alerts/LanguageSelector";
import NotificationMethod from "@/components/subscribe-alerts/NotificationMethod";
import SubscriptionSummary from "@/components/subscribe-alerts/SubscriptionSummary";
import PreferenceFooter from "@/components/subscribe-alerts/PreferenceFooter";

export default function SubscribePreferencePage() {
  return (
    <main className="relative overflow-hidden bg-[#F8F2E8]">
      {/* ================= Background ================= */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />

        {/* Mandalas */}

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[650px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[1750px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
        />
      </div>

      {/* ================= Hero ================= */}

      <div className="relative z-10">
        <AlertPreferenceHero />
      </div>

      {/* ================= Page ================= */}

      <div className="relative z-10 mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          <div
            className="grid grid-cols-12 gap-6"
            style={{ marginTop: "40px" }}
          >
            {/* ================= Left ================= */}

            <div className="col-span-8 space-y-6">
              {/* Update Types */}

              <UpdateTypes />

              {/* Frequency + Language */}

              <div
                className="grid grid-cols-2 gap-6"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <FrequencySelector />

                <div className="grid h-full grid-rows-2 gap-4">
                  <LanguageSelector />

                  <NotificationMethod />
                </div>
              </div>
            </div>

            {/* ================= Right ================= */}

            <div className="col-span-4">
              <div className="sticky top-28">
                <SubscriptionSummary />
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="mt-8">
            <PreferenceFooter />
          </div>
        </div>
      </div>
    </main>
  );
}
