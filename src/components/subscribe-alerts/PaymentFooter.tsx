"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { startRazorpayPayment } from "@/lib/payments/razorpay";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface PaymentFooterProps {
  amount: number;
  onBack?: () => void;
  onProceed?: () => void;
  backDisabled?: boolean;
  proceedDisabled?: boolean;
}

export default function PaymentFooter({
  amount,
  onBack,
  onProceed,
  backDisabled = false,
  proceedDisabled = false,
}: PaymentFooterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") ?? "monthly";

  return (
    <section className="mt-8 mb-10" style={{ marginBottom: "20px" }}>
      <div className="rounded-[18px] border border-[#C37000] bg-[#C37000]/4 p-4">
        <div className="grid grid-cols-[1.2fr_1fr_1.2fr] items-center gap-4">
          {/* Info */}

          <div
            className="flex items-center gap-3 rounded-[12px] border border-[#C37000] bg-[#C37000]/10 px-4 py-3"
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "20px",
            }}
          >
            <Image
              src="/images/lotus.png"
              alt="Lotus"
              width={68}
              height={59}
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "20px",
              }}
            />

            <p
              className={`${cormorantInfant.className} text-[18px] leading-[1.2] text-[#7A5A2B]`}
            >
              You can go back and edit your choices before confirming your
              subscription.
            </p>
          </div>

          {/* Back */}

          <button
            disabled={backDisabled}
            onClick={() =>
              onBack
                ? onBack()
                : router.push(
                    `/subscribe-alerts/review-subscription?plan=${plan}`,
                  )
            }
            className="flex h-[66px] items-center justify-center rounded-[8px] border border-[#0F5C66] bg-transparent px-6 text-[#0F5C66] transition hover:bg-[#F8F2E8] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ marginTop: "5px" }}
          >
            <ArrowLeft className="mr-auto h-5 w-5" />

            <span
              className={`${cormorantInfant.className} text-[24px] font-semibold`}
            >
              Back
            </span>

            <span className="w-5" />
          </button>

          {/* Proceed */}

          <button
            disabled={proceedDisabled}
            onClick={onProceed}
            className="flex h-[66px] items-center justify-center rounded-[8px] bg-[#0F5C66] px-6 text-[#EFDEC7] transition hover:bg-[#0B4D56] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ marginTop: "5px", marginRight: "20px" }}
          >
            <span className="w-5" />

            <span
              className={`${cormorantInfant.className} text-[24px] font-semibold`}
            >
              Proceed to Payment
            </span>

            <ArrowRight className="ml-auto h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
