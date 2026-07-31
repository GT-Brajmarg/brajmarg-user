"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import PaymentHero from "@/components/subscribe-alerts/PaymentHero";
import SubscriptionSummary from "@/components/subscribe-alerts/SubscriptionSummary";
import GoodToKnowCard from "@/components/subscribe-alerts/GoodToKnowCard";
import BillDetailsCard from "@/components/subscribe-alerts/BillDetailsCard";
import PaymentDetailsCard from "@/components/subscribe-alerts/PaymentDetailsCard";
import PaymentFooter from "@/components/subscribe-alerts/PaymentFooter";
import { startRazorpayPayment } from "@/lib/payments/razorpay";

export default function SubscribePaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") ?? "yearly";

  const amount = plan === "yearly" ? 799 : 99;

  const handleProceed = async () => {
    try {
      await startRazorpayPayment({
        amount,
        name: "Brajmarg",
        description: `Subscribe Alerts (${plan})`,
        onSuccess: () => {
          router.push(`/subscribe-alerts/payment-success?plan=${plan}`);
        },
      });
    } catch (error) {
      console.error(error);
      alert("Unable to start payment");
    }
  };

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
        <PaymentHero />
      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          <div
            className="grid grid-cols-12 gap-6"
            style={{ marginTop: "40px" }}
          >
            {/* Left */}

            <div className="col-span-4">
              <div className="sticky top-28">
                <SubscriptionSummary />
              </div>
            </div>

            {/* Right */}

            <div className="col-span-8 space-y-6">
              <PaymentDetailsCard />

              <BillDetailsCard />

              <GoodToKnowCard />
            </div>
          </div>

          <div
            className="mt-8"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            <PaymentFooter amount={amount} onProceed={handleProceed} />
          </div>
        </div>
      </div>
    </main>
  );
}
