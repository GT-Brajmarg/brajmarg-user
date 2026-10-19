"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BookingFooterProps {
  slug?: string;
  onProceed?: () => void;
}

export default function BookingFooter({
  slug = "braj-yatra",
  onProceed,
}: BookingFooterProps) {
  return (
    <section className="w-full px-5 sm:px-6 py-5 border-t border-[#C37000]/25">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* ── Back to Yatra Details ── */}
        <Link
          href={`/yatra/${slug}`}
          className="font-cormorant flex h-[50px] w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] border border-[#0F5C66] bg-transparent px-6 text-[18px] font-bold text-[#0F5C66] transition hover:bg-[#EEF8F8] active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeft size={20} strokeWidth={2} className="shrink-0" />
          Back to Yatra Details
        </Link>

        {/* ── Proceed to Payment ── */}
        <button
          type="button"
          onClick={onProceed}
          className="font-cormorant flex h-[50px] w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] bg-[#0F5C66] px-6 text-[18px] font-bold text-[#EFDEC7] transition hover:bg-[#0A4E57] active:scale-[0.98] cursor-pointer shadow-[0_4px_16px_rgba(15,92,102,0.2)]"
        >
          Proceed to Payment
          <ArrowRight size={20} strokeWidth={2} className="shrink-0" />
        </button>
      </div>
    </section>
  );
}
