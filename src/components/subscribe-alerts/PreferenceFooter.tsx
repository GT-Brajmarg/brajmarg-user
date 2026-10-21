"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { useRouter, useSearchParams } from "next/navigation";

interface PreferenceFooterProps {
  onBack?: () => void;
  onContinue?: () => void;
  backDisabled?: boolean;
  continueDisabled?: boolean;
}

export default function PreferenceFooter({
  onBack,
  onContinue,
  backDisabled = false,
  continueDisabled = false,
}: PreferenceFooterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "monthly";

  return (
    <section className="mb-10">
      <div className="rounded-[18px] border border-[#C37000] bg-[#FAF3E8]/80 px-5 py-4 sm:px-6 sm:py-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {/* Back */}
          <button
            disabled={backDisabled}
            onClick={() =>
              onBack
                ? onBack()
                : router.push(`/subscribe-alerts/temples?plan=${plan}`)
            }
            className="relative flex h-[50px] w-full items-center justify-center rounded-[10px] border border-[#0F5C66] bg-transparent text-[#0F5C66] transition hover:bg-[#EEE5D5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft className="absolute left-4 h-4 w-4" />
            <span className={`${cormorantInfant.className} text-[20px] font-semibold`}>
              Back
            </span>
          </button>

          {/* Continue */}
          <button
            disabled={continueDisabled}
            onClick={() =>
              onContinue
                ? onContinue()
                : router.push(`/subscribe-alerts/review-subscription?plan=${plan}`)
            }
            className="relative flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#0F5C66] text-[#F9F3EA] transition hover:bg-[#0B4D56] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={`${cormorantInfant.className} text-[20px] font-semibold`}>
              Continue to Review
            </span>
            <ArrowRight className="absolute right-4 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
