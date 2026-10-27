"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2, X, ShieldAlert, Check } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { showToast } from "@/lib/toast";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleProceedToVerify = () => {
    setStep(2);
  };

  const handleFinalDelete = () => {
    if (confirmText.trim().toUpperCase() !== "DELETE") {
      showToast.error("Please type DELETE to confirm account deletion.");
      return;
    }

    setIsDeleting(true);
    setTimeout(() => {
      // Clear all user credentials from storage
      localStorage.removeItem("brajmarg_temp_user");
      localStorage.removeItem("brajmarg_is_logged_in");
      localStorage.removeItem("brajmarg_selected_language");
      window.dispatchEvent(new Event("storage"));

      showToast.success("Your Brajmarg account has been permanently deleted.");
      setIsDeleting(false);
      onClose();
      router.push("/");
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] overflow-y-auto backdrop-blur-xs p-4 flex min-h-screen items-center justify-center animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[460px] my-auto rounded-[22px] sm:rounded-[24px] border border-[#DC2626]/40 bg-[#FFFDF9] p-5 sm:p-7 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A624E] hover:bg-[#F3E7D5] transition cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* ══ POPUP 1: Delete Account Confirmation ══ */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-[#DC2626]">
              <AlertTriangle size={30} strokeWidth={2.2} />
            </div>

            <div className="text-center">
              <h3
                className={`${cormorantInfant.className} text-[24px] sm:text-[26px] font-bold text-[#DC2626] leading-tight`}
              >
                Delete Devotee Account?
              </h3>
              <p
                className={`${cormorantInfant.className} mt-1 text-[15px] sm:text-[16px] text-[#7A6A5C] leading-snug`}
              >
                This action is irreversible. Please read carefully before confirming.
              </p>
            </div>

            <div className="rounded-xl border border-[#DC2626]/20 bg-[#FEECEC]/40 p-4 space-y-2">
              <p className={`${cormorantInfant.className} text-[15px] text-[#5A3A35] leading-relaxed`}>
                Deleting your account will permanently remove:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-[14px] text-[#5A3A35]">
                <li className={cormorantInfant.className}>
                  Your devotional profile and family sankalp records
                </li>
                <li className={cormorantInfant.className}>
                  Upcoming and past temple seva booking records
                </li>
                <li className={cormorantInfant.className}>
                  Prasad delivery tracking and saved home addresses
                </li>
                <li className={cormorantInfant.className}>
                  Active yatra itineraries and daily darshan alerts
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className={`w-full sm:w-auto rounded-xl border border-[#C37000]/50 bg-transparent px-5 py-2.5 text-[16px] font-semibold text-[#66503E] transition hover:bg-[#C37000]/10 cursor-pointer ${cormorantInfant.className}`}
              >
                Keep My Account
              </button>

              <button
                type="button"
                onClick={handleProceedToVerify}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#DC2626] px-5 py-2.5 text-[16px] font-semibold text-white shadow-sm transition hover:bg-[#B91C1C] cursor-pointer ${cormorantInfant.className}`}
              >
                <Trash2 size={16} />
                <span>Continue</span>
              </button>
            </div>
          </div>
        )}

        {/* ══ POPUP 2: Verification Step ══ */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DC2626]/10 text-[#DC2626]">
              <ShieldAlert size={30} strokeWidth={2.2} />
            </div>

            <div className="text-center">
              <h3
                className={`${cormorantInfant.className} text-[24px] sm:text-[26px] font-bold text-[#2D241E] leading-tight`}
              >
                Final Verification
              </h3>
              <p
                className={`${cormorantInfant.className} mt-1 text-[15px] sm:text-[16px] text-[#7A6A5C] leading-snug`}
              >
                To confirm permanent deletion, type <strong>DELETE</strong> below.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <label
                htmlFor="confirm-delete-input"
                className={`${cormorantInfant.className} block text-[15px] font-bold text-[#634E3E] uppercase`}
              >
                Type confirmation word
              </label>
              <input
                id="confirm-delete-input"
                type="text"
                autoFocus
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className={`${cormorantInfant.className} w-full rounded-xl border border-[#DC2626]/50 bg-transparent p-3 text-[17px] font-bold tracking-widest text-[#DC2626] uppercase outline-none focus:ring-2 focus:ring-[#DC2626]/30 text-center`}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isDeleting}
                className={`w-full sm:w-auto rounded-xl border border-[#C37000]/50 bg-transparent px-5 py-2.5 text-[16px] font-semibold text-[#66503E] transition hover:bg-[#C37000]/10 cursor-pointer ${cormorantInfant.className}`}
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleFinalDelete}
                disabled={confirmText.trim().toUpperCase() !== "DELETE" || isDeleting}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-[16px] font-semibold text-white shadow-sm transition ${cormorantInfant.className} ${confirmText.trim().toUpperCase() === "DELETE" && !isDeleting
                  ? "bg-[#DC2626] hover:bg-[#B91C1C] cursor-pointer"
                  : "bg-[#DC2626]/40 cursor-not-allowed"
                  }`}
              >
                <Trash2 size={16} />
                <span>{isDeleting ? "Deleting..." : "Permanently Delete"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
