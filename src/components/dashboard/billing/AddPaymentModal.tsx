"use client";

import { useState } from "react";
import { X, CreditCard, Smartphone } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { showToast } from "@/lib/toast";

export interface PaymentMethodItem {
  id: string;
  type: "card" | "upi" | "paypal";
  brand: string;
  identifier: string;
  expiry?: string;
  isDefault?: boolean;
}

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: PaymentMethodItem) => void;
}

interface FormErrors {
  cardHolder?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  upiId?: string;
}

export default function AddPaymentModal({
  isOpen,
  onClose,
  onAdd,
}: AddPaymentModalProps) {
  const [methodType, setMethodType] = useState<"card" | "upi">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [upiId, setUpiId] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  if (!isOpen) return null;

  const resetForm = () => {
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCardHolder("");
    setUpiId("");
    setSetAsDefault(false);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCardNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 16);
    const parts = cleaned.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(" "));
    if (errors.cardNumber) {
      setErrors((prev) => ({ ...prev, cardNumber: undefined }));
    }
  };

  const handleExpiryChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
    if (errors.expiry) {
      setErrors((prev) => ({ ...prev, expiry: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (methodType === "card") {
      // Cardholder validation
      if (!cardHolder.trim()) {
        newErrors.cardHolder = "Cardholder name is required";
      }

      // Card number validation
      const cleanNum = cardNumber.replace(/\s/g, "");
      if (!cleanNum) {
        newErrors.cardNumber = "Card number is required";
      } else if (cleanNum.length < 16) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      // Expiry validation
      if (!expiry.trim()) {
        newErrors.expiry = "Expiry date is required";
      } else if (expiry.length < 5) {
        newErrors.expiry = "Use MM/YY format";
      } else {
        const [month] = expiry.split("/").map((v) => parseInt(v, 10));
        if (month < 1 || month > 12) {
          newErrors.expiry = "Month must be 01 - 12";
        }
      }

      // CVV validation
      if (!cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (cvv.length < 3) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        showToast.error("Please fill in all required fields correctly.");
        return;
      }

      // Determine brand
      const brand = cleanNum.startsWith("4")
        ? "Visa"
        : cleanNum.startsWith("5")
        ? "Mastercard"
        : cleanNum.startsWith("6")
        ? "RuPay"
        : "Card";

      const newItem: PaymentMethodItem = {
        id: `pm_${Date.now()}`,
        type: "card",
        brand,
        identifier: `${brand} ending in ${cleanNum.slice(-4)}`,
        expiry,
        isDefault: setAsDefault,
      };

      onAdd(newItem);
      showToast.success("Card added successfully!");
      handleClose();
    } else {
      // UPI validation
      if (!upiId.trim()) {
        newErrors.upiId = "UPI ID is required";
      } else if (!upiId.includes("@") || upiId.startsWith("@") || upiId.endsWith("@")) {
        newErrors.upiId = "Please enter a valid UPI ID (e.g. name@okhdfcbank)";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        showToast.error("Please fill in all required fields correctly.");
        return;
      }

      const newItem: PaymentMethodItem = {
        id: `pm_${Date.now()}`,
        type: "upi",
        brand: "UPI",
        identifier: `UPI (${upiId.trim()})`,
        isDefault: setAsDefault,
      };

      onAdd(newItem);
      showToast.success("UPI ID added successfully!");
      handleClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] overflow-y-auto backdrop-blur-xs p-4 flex min-h-screen items-center justify-center animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-[500px] my-auto rounded-[22px] sm:rounded-[24px] border border-[#C37000]/40 bg-[#FFFDF9] p-5 sm:p-7 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A624E] hover:bg-[#F3E7D5] transition cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div className="pb-3 border-b border-[#C37000]/20">
          <h3
            className={`${cormorantInfant.className} text-[24px] sm:text-[26px] font-bold text-[#0F5C66]`}
          >
            Add New Payment Method
          </h3>
          <p
            className={`${cormorantInfant.className} text-[15px] text-[#634E3E] font-medium`}
          >
            Save card or UPI details for secure, 1-click seva & prasad bookings.
          </p>
        </div>

        {/* Type Toggle: Card vs UPI */}
        <div className="grid grid-cols-2 gap-2.5 mt-4 p-1 rounded-xl bg-[#FAF3E7] border border-[#C37000]/25">
          <button
            type="button"
            onClick={() => {
              setMethodType("card");
              setErrors({});
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition cursor-pointer ${
              methodType === "card"
                ? "bg-[#0F5C66] text-white shadow-xs"
                : "text-[#634E3E] hover:text-[#0F5C66]"
            } ${cormorantInfant.className}`}
          >
            <CreditCard size={16} />
            <span>Credit / Debit Card</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMethodType("upi");
              setErrors({});
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition cursor-pointer ${
              methodType === "upi"
                ? "bg-[#0F5C66] text-white shadow-xs"
                : "text-[#634E3E] hover:text-[#0F5C66]"
            } ${cormorantInfant.className}`}
          >
            <Smartphone size={16} />
            <span>UPI / Net Banking</span>
          </button>
        </div>

        {/* Form Body - with noValidate to disable default browser tooltip validation */}
        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          {methodType === "card" ? (
            <>
              {/* Cardholder Name */}
              <div>
                <label
                  className={`${cormorantInfant.className} block text-[14px] font-bold uppercase tracking-wider text-[#634E3E]`}
                >
                  Cardholder Name
                  <span className="text-[#DC2626] font-bold ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => {
                    setCardHolder(e.target.value);
                    if (errors.cardHolder) {
                      setErrors((prev) => ({ ...prev, cardHolder: undefined }));
                    }
                  }}
                  placeholder="Name as on card"
                  className={`${cormorantInfant.className} mt-1 w-full rounded-xl border ${
                    errors.cardHolder ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                  } bg-transparent py-2 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none`}
                />
                {errors.cardHolder && (
                  <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                    {errors.cardHolder}
                  </p>
                )}
              </div>

              {/* Card Number */}
              <div>
                <label
                  className={`${cormorantInfant.className} block text-[14px] font-bold uppercase tracking-wider text-[#634E3E]`}
                >
                  Card Number
                  <span className="text-[#DC2626] font-bold ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="4242 •••• •••• 4242"
                  className={`${cormorantInfant.className} mt-1 w-full rounded-xl border ${
                    errors.cardNumber ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                  } bg-transparent py-2 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none tracking-wider`}
                />
                {errors.cardNumber && (
                  <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry Date & CVV */}
              <div className="grid grid-cols-2 gap-3.5">
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
                      errors.expiry ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                    } bg-transparent py-2 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none`}
                  />
                  {errors.expiry && (
                    <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                      {errors.expiry}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`${cormorantInfant.className} block text-[14px] font-bold uppercase tracking-wider text-[#634E3E]`}
                  >
                    CVV
                    <span className="text-[#DC2626] font-bold ml-1">*</span>
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => {
                      setCvv(e.target.value.replace(/\D/g, ""));
                      if (errors.cvv) {
                        setErrors((prev) => ({ ...prev, cvv: undefined }));
                      }
                    }}
                    placeholder="•••"
                    className={`${cormorantInfant.className} mt-1 w-full rounded-xl border ${
                      errors.cvv ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                    } bg-transparent py-2 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none`}
                  />
                  {errors.cvv && (
                    <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div>
              <label
                className={`${cormorantInfant.className} block text-[14px] font-bold uppercase tracking-wider text-[#634E3E]`}
              >
                UPI ID (Virtual Payment Address)
                <span className="text-[#DC2626] font-bold ml-1">*</span>
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  if (errors.upiId) {
                    setErrors((prev) => ({ ...prev, upiId: undefined }));
                  }
                }}
                placeholder="devotee@okhdfcbank"
                className={`${cormorantInfant.className} mt-1 w-full rounded-xl border ${
                  errors.upiId ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                } bg-transparent py-2.5 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none`}
              />
              {errors.upiId ? (
                <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                  {errors.upiId}
                </p>
              ) : (
                <p
                  className={`${cormorantInfant.className} mt-1 text-[13px] text-[#7A6A5C]`}
                >
                  Supports Google Pay, PhonePe, Paytm, and BHIM UPI handles.
                </p>
              )}
            </div>
          )}

          {/* Set as Default Checkbox */}
          <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={setAsDefault}
              onChange={(e) => setSetAsDefault(e.target.checked)}
              className="h-4 w-4 rounded accent-[#0F5C66] cursor-pointer"
            />
            <span
              className={`${cormorantInfant.className} text-[15px] font-semibold text-[#2D241E]`}
            >
              Set as primary / default payment method
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#C37000]/20">
            <button
              type="button"
              onClick={handleClose}
              className={`rounded-xl border border-[#C37000]/30 px-4 py-2 text-[15px] font-semibold text-[#5F4B38] hover:bg-[#FAF3E7] transition cursor-pointer ${cormorantInfant.className}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`rounded-xl bg-gradient-to-r from-[#0F5C66] to-[#0A474E] px-6 py-2 text-[15px] font-semibold text-white shadow-sm hover:opacity-95 active:scale-98 transition cursor-pointer ${cormorantInfant.className}`}
            >
              Save Payment Method
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
