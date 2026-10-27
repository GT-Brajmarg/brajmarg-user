"use client";

import { Suspense } from "react";
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
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />

        {/* Lite Lotus BG — desktop only */}
        <div className="hidden lg:block pointer-events-none absolute top-[460px] inset-0 z-0 overflow-hidden">
          <Image
            src="/images/lite-lotus-bg.png"
            alt=""
            width={1500}
            height={100}
            className="object-cover opacity-70"
          />
        </div>
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

      {/* Hero */}
      <div className="relative z-10">
        <AlertPreferenceHero />
      </div>

      {/* Page Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Main Grid: stacks on mobile, side-by-side on lg+ */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-8">
            {/* Update Types */}
            <UpdateTypes />

            {/* Frequency + Language/Notification */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FrequencySelector />

              <div className="flex flex-col gap-4">
                <LanguageSelector />
                <NotificationMethod />
              </div>
            </div>
          </div>

          {/* Right Column — Subscription Summary */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SubscriptionSummary />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <Suspense fallback={null}>
            <PreferenceFooter />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
