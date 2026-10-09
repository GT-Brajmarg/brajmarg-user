"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContinueToPaymentButton() {
  const router = useRouter();

  const handleContinueToPayment = () => {
    router.push("/payment");
  };

  return (
    <section
      className="mt-5 overflow-hidden rounded-2xl border border-[#C37000] bg-[#C37000]/4 p-5"
      style={{ marginBottom: "30px" }}
    >
      <button
        type="button"
        onClick={handleContinueToPayment}
        className="font-cormorant mt-5 flex h-[54px] w-[720px] items-center justify-center rounded-xl bg-[#0B6670] text-[22px] font-semibold text-[#EFDEC7] transition hover:bg-[#084C54]"
        style={{
          marginLeft: "30px",
          marginTop: "20px",
          marginRight: "20px, ",
          marginBottom: "20px",
        }}
      >
        Continue to Payment
        <ArrowRight className="ml-3 h-5 w-5" />
      </button>
    </section>
  );
}
