"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <section className="mt-10" style={{ marginBottom: "40px" }}>
      <div className="rounded-[18px] border border-[#C37000] bg-[#C37000]/4 px-6 py-5">
        <div
          className="grid grid-cols-2 gap-4"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          {/* Back */}
          <button
            disabled={backDisabled}
            onClick={() =>
              onBack
                ? onBack()
                : router.push(`/subscribe-alerts/temples?plan=${plan}`)
            }
            className="flex h-[52px] w-[550px] items-center justify-center rounded-[8px] border border-[#0F5C66] bg-transparent px-6 text-[#0F5C66] transition hover:bg-[#F8F2E8] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ marginLeft: "20px" }}
          >
            <ArrowLeft className="mr-auto h-5 w-5" />

            <span
              className={`${cormorantInfant.className} text-[24px] font-semibold`}
            >
              Back
            </span>

            <span className="w-5" />
          </button>

          {/* Continue */}
          <button
            disabled={continueDisabled}
            onClick={() =>
              onContinue
                ? onContinue()
                : router.push(
                    `/subscribe-alerts/review-subscription?plan=${plan}`,
                  )
            }
            className="flex h-[52px] w-[550px] items-center justify-center rounded-[8px] bg-[#0F5C66] px-6 text-[#F9F3EA] transition hover:bg-[#0B4D56] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ marginLeft: "20px" }}
          >
            <span className="w-5" />

            <span
              className={`${cormorantInfant.className} text-[24px] font-semibold`}
            >
              Continue to Review
            </span>

            <ArrowRight className="ml-auto h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
