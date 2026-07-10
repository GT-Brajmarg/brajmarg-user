"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type PlaceOrderButtonProps = {
  paymentMethod: "razorpay" | "cod";
};

export default function PlaceOrderButton({
  paymentMethod,
}: PlaceOrderButtonProps) {
  const router = useRouter();

  const handlePlaceOrder = () => {
    console.log(`Order confirmed using ${paymentMethod}`);

    router.push("/checkout/confirmation");
  };

  return (
    <div className="rounded-[18px] bg-[#FFF9F0] p-4 shadow-[0_8px_22px_rgba(173,111,30,0.10)]">
      <button
        type="button"
        onClick={handlePlaceOrder}
        className="font-cormorant flex h-[54px] w-full items-center justify-center gap-3 rounded-[8px] bg-[#0B6670] text-[18px] font-semibold text-[#EFDEC7] text-white transition hover:bg-[#084F57]"
      >
        Place Order
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
