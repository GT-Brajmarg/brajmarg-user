"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import ReviewHero from "@/components/subscribe-alerts/ReviewHero";
import SubscriptionSummary from "@/components/subscribe-alerts/SubscriptionSummary";
import ActivateBenefitsCard from "@/components/subscribe-alerts/ActivateBenefitsCard";
import MembershipBenefitsCard from "@/components/subscribe-alerts/MembershipBenefitsCard";
import GoodToKnowCard from "@/components/subscribe-alerts/GoodToKnowCard";
import ReviewFooter from "@/components/subscribe-alerts/ReviewFooter";
import MonthlyPlanBenefitsCard from "@/components/subscribe-alerts/MonthlyPlanBenefitsCard";

function ReviewSubscriptionContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "monthly";

  const isYearly = plan === "yearly"; // "monthly" | "yearly"
  return (
    <main className="relative overflow-hidden bg-[#F8F2E8]">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          className="object-cover opacity-[0.24]"
        />

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
          className="absolute top-[1800px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
        />
      </div>

      {/* Hero */}

      <div className="relative z-10">
        <ReviewHero />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex justify-center">
        <div className="w-full max-w-[1240px] px-4 sm:px-6 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Subscription Summary */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SubscriptionSummary />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8">
              {isYearly ? (
                <div className="space-y-6">
                  <ActivateBenefitsCard />
                  <MembershipBenefitsCard />
                  <GoodToKnowCard />
                </div>
              ) : (
                <div className="space-y-6">
                  <MonthlyPlanBenefitsCard />
                  <GoodToKnowCard />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <ReviewFooter />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SubscribeReviewPage() {
  return (
    <Suspense fallback={null}>
      <ReviewSubscriptionContent />
    </Suspense>
  );
}

