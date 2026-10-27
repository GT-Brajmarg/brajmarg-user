"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { showToast } from "@/lib/toast";
import { PaymentMethodItem } from "./AddPaymentModal";

interface EditPaymentModalProps {
  isOpen: boolean;
  item: PaymentMethodItem | null;
  onClose: () => void;
  onUpdate: (updated: PaymentMethodItem) => void;
}

export default function EditPaymentModal({
  isOpen,
  item,
  onClose,
  onUpdate,
}: EditPaymentModalProps) {
  const [expiry, setExpiry] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [expiryError, setExpiryError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setExpiry(item.expiry || "");
      setIsDefault(!!item.isDefault);
      setExpiryError(null);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleExpiryChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
    if (expiryError) setExpiryError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (item.type === "card") {
      if (!expiry.trim()) {
        setExpiryError("Expiry date is required");
        return;
      }
      if (expiry.length < 5) {
        setExpiryError("Please enter MM/YY format");
        return;
      }
      const [month] = expiry.split("/").map((v) => parseInt(v, 10));
      if (month < 1 || month > 12) {
        setExpiryError("Month must be 01 - 12");
        return;
      }
    }

    onUpdate({
      ...item,
      expiry: item.type === "card" ? expiry : undefined,
      isDefault,
    });
    showToast.success("Payment method updated successfully!");
    onClose();
  };

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
        className="relative w-full max-w-[460px] my-auto rounded-[22px] sm:rounded-[24px] border border-[#C37000]/40 bg-[#FFFDF9] p-5 sm:p-7 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A624E] hover:bg-[#F3E7D5] transition cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="pb-3 border-b border-[#C37000]/20">
          <h3
            className={`${cormorantInfant.className} text-[24px] sm:text-[26px] font-bold text-[#0F5C66]`}
          >
            Edit Payment Method
          </h3>
          <p
            className={`${cormorantInfant.className} text-[15px] text-[#634E3E] font-medium`}
          >
            {item.identifier}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
          {item.type === "card" && (
            <div>
              <label
                className={`${cormorantInfant.className} block text-[14px] font-bold uppercase tracking-wider text-[#634E3E]`}
              >
                Expiry Date
                <span className="text-[#DC2626] font-bold ml-1">*</span>
              </label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => handleExpiryChange(e.target.value)}
                placeholder="MM/YY"
                className={`${cormorantInfant.className} mt-1 w-full rounded-xl border ${
                  expiryError ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                } bg-transparent py-2.5 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none`}
              />
              {expiryError && (
                <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                  {expiryError}
                </p>
              )}
            </div>
          )}

          <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="h-4 w-4 rounded accent-[#0F5C66] cursor-pointer"
            />
            <span
              className={`${cormorantInfant.className} text-[15px] font-semibold text-[#2D241E]`}
            >
              Set as primary / default payment method
            </span>
          </label>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#C37000]/20">
            <button
              type="button"
              onClick={onClose}
              className={`rounded-xl border border-[#C37000]/30 px-4 py-2 text-[15px] font-semibold text-[#5F4B38] hover:bg-[#FAF3E7] transition cursor-pointer ${cormorantInfant.className}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`rounded-xl bg-gradient-to-r from-[#0F5C66] to-[#0A474E] px-6 py-2 text-[15px] font-semibold text-white shadow-sm hover:opacity-95 active:scale-98 transition cursor-pointer ${cormorantInfant.className}`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
