"use client";

import { X, Trash2, AlertTriangle } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { PaymentMethodItem } from "./AddPaymentModal";

interface RemovePaymentModalProps {
  isOpen: boolean;
  item: PaymentMethodItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemovePaymentModal({
  isOpen,
  item,
  onClose,
  onConfirm,
}: RemovePaymentModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] overflow-y-auto backdrop-blur-xs p-4 flex min-h-screen items-center justify-center animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[440px] my-auto rounded-[22px] sm:rounded-[24px] border border-[#DC2626]/40 bg-[#FFFDF9] p-5 sm:p-7 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A624E] hover:bg-[#F3E7D5] transition cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-[#DC2626]">
            <AlertTriangle size={30} strokeWidth={2.2} />
          </div>

          <div className="text-center">
            <h3
              className={`${cormorantInfant.className} text-[24px] sm:text-[26px] font-bold text-[#DC2626] leading-tight`}
            >
              Remove Payment Method?
            </h3>
            <p
              className={`${cormorantInfant.className} mt-2 text-[16px] text-[#634E3E] leading-relaxed`}
            >
              Are you sure you want to remove{" "}
              <strong className="text-[#2D241E]">{item.identifier}</strong>? You
              will need to re-enter your details for future quick bookings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className={`w-full sm:w-auto rounded-xl border border-[#C37000]/30 px-5 py-2.5 text-[15px] font-semibold text-[#5F4B38] hover:bg-[#FAF3E7] transition cursor-pointer ${cormorantInfant.className}`}
            >
              Keep Method
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm hover:bg-[#B91C1C] transition cursor-pointer ${cormorantInfant.className}`}
            >
              <Trash2 size={16} />
              <span>Yes, Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
