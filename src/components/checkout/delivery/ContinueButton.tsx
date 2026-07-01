import { ArrowRight } from "lucide-react";

export default function ContinueButton() {
  return (
    <button className="font-cormorant mt-5 flex h-[54px] w-full items-center justify-center rounded-xl bg-[#0B6670] text-[22px] font-semibold text-white transition hover:bg-[#084C54]">
      Continue to Payment
      <ArrowRight className="ml-3 h-5 w-5" />
    </button>
  );
}
