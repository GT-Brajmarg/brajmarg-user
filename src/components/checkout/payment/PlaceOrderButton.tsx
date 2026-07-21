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
    <section
      className="mt-5 overflow-hidden rounded-2xl border border-[#C37000] bg-[#C37000]/4 p-5"
      style={{ marginBottom: "30px" }}
    >
      <button
        type="button"
        onClick={handlePlaceOrder}
        className="font-cormorant flex h-[54px] w-[720px] items-center justify-center gap-3 rounded-[8px] bg-[#0B6670] text-[18px] font-bold text-[#EFDEC7] transition hover:bg-[#084F57]"
        style={{
          marginLeft: "30px",
          marginTop: "20px",
          marginRight: "20px, ",
          marginBottom: "20px",
        }}
      >
        Place Order
        <ArrowRight size={20} />
      </button>
    </section>
  );
}
