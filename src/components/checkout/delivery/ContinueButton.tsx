"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContinueToPaymentButton() {
  const router = useRouter();

  const handleContinueToPayment = () => {
    router.push("/payment");
  };

  return (
    <button
      type="button"
      onClick={handleContinueToPayment}
      className="font-cormorant mt-5 flex h-[54px] w-full items-center justify-center rounded-xl bg-[#0B6670] text-[22px] font-semibold text-[#EFDEC7] transition hover:bg-[#084C54]"
    >
      Continue to Payment
      <ArrowRight className="ml-3 h-5 w-5" />
    </button>
  );
}
