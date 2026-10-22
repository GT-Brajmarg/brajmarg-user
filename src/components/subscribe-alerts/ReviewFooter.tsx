"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const plan = searchParams.get("plan") ?? "yearly";

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push(`/subscribe-alerts/preferences?plan=${plan}`);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      router.push(`/subscribe-alerts/payment?plan=${plan}`);
    }
  };

  return (
    <footer className="mt-8 mb-6">
      <div className="rounded-[18px] border border-[#C37000] bg-[#FAF4EB]/70 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Notice Box */}
          <div className="flex items-center gap-4 rounded-[12px] border border-[#C37000]/70 bg-[#EFDEC7]/60 px-4 py-3 flex-1 w-full lg:w-auto">
            <Image
              src="/images/lotus_bright.png"
              alt=""
              width={48}
              height={48}
              className="h-9 w-auto shrink-0 object-contain"
            />
            <p className="font-cormorant text-[15.5px] sm:text-[17px] font-bold text-[#0F5C66] leading-snug">
              You can go back and edit your choices before confirming your subscription.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 w-full lg:w-auto">
            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              disabled={backDisabled}
              className="flex h-[46px] sm:h-[50px] shrink-0 items-center justify-center gap-1.5 sm:gap-2 rounded-[10px] border border-[#0F5C66] bg-transparent px-3.5 sm:px-8 font-cormorant text-[15px] sm:text-[18px] font-bold text-[#0F5C66] transition hover:bg-[#0F5C66]/10 disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft size={16} strokeWidth={2} className="sm:h-[18px] sm:w-[18px]" />
              <span>Back</span>
            </button>

            {/* Continue to Payment Button */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={continueDisabled}
              className="flex h-[46px] sm:h-[50px] flex-1 lg:flex-initial items-center justify-center gap-1.5 sm:gap-2.5 rounded-[10px] bg-[#0F5C66] px-3.5 sm:px-8 font-cormorant text-[15px] sm:text-[18px] font-bold text-[#EFDEC7] transition hover:bg-[#0B4D56] disabled:opacity-50 cursor-pointer shadow-md whitespace-nowrap"
            >
              <span>Continue to Payment</span>
              <ArrowRight size={16} strokeWidth={2} className="sm:h-[18px] sm:w-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
