import { ArrowRight } from "lucide-react";

export default function CheckoutButton() {
  return (
    <button className="font-cormorant mt-10 flex h-16 w-full items-center justify-center gap-3 rounded-xl bg-[#0B6670] text-3xl font-semibold text-white transition hover:bg-[#09545B]">
      Proceed to Checkout
      <ArrowRight size={28} />
    </button>
  );
}
