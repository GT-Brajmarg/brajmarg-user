"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ReviewFooterProps {
  onBack?: () => void;
  onContinue?: () => void;
  backDisabled?: boolean;
  continueDisabled?: boolean;
}

export default function ReviewFooter({
  onBack,
  onContinue,
  backDisabled = false,
  continueDisabled = false,
}: ReviewFooterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") ?? "monthly";
  return (
    <section className="mt-8" style={{ marginBottom: "20px" }}>
      <div className="rounded-[14px] border border-[#C37000] bg-[#C37000]/4 p-4">
        <div className="grid grid-cols-[1.3fr_1fr_1.35fr] gap-4">
          {/* Info */}

          <div
            className="flex items-center gap-3 rounded-[10px] border border-[#C37000] bg-[#C37000]/10 px-4 py-3"
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "20px",
            }}
          >
            <Image
              src="/images/lotus.png"
              alt=""
              width={68}
              height={59}
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "20px",
              }}
            />

            <p
              className={`${cormorantInfant.className} text-[18px] leading-[1.2] font-bold text-[#0F5C66]`}
            >
              You can go back and edit your choices before confirming your
              subscription.
            </p>
          </div>

          {/* Back */}

          <button
            onClick={() =>
              onBack
                ? onBack()
                : router.push(`/subscribe-alerts/preferences?plan=${plan}`)
            }
            disabled={backDisabled}
            className="flex h-[66px] items-center justify-center rounded-[8px] border border-[#0F5C66] bg-transparent px-5 text-[#0F5C66] transition hover:bg-[#F8F2E8] disabled:opacity-50"
            style={{ marginTop: "20px" }}
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
            onClick={() =>
              onContinue
                ? onContinue()
                : router.push(`/subscribe-alerts/payment?plan=${plan}`)
            }
            disabled={continueDisabled}
            className="flex h-[66px] items-center justify-center rounded-[8px] bg-[#0F5C66] px-5 text-[#EFDEC7] transition hover:bg-[#0B4D56] disabled:opacity-50"
            style={{ marginTop: "20px", marginRight: "20px" }}
          >
            <span className="w-5" />

            <span
              className={`${cormorantInfant.className} text-[24px] font-semibold`}
            >
              Continue to Payment
            </span>

            <ArrowRight className="ml-auto h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
