"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { showToast } from "@/lib/toast";

interface LanguageScreenProps {
  onBack: () => void;
}

const SUPPORTED_LANGUAGES = [
  {
    id: "en",
    label: "English (India)",
    native: "English",
    description: "Standard English interface with transliterated mantras",
  },
  // {
  //   id: "hi",
  //   label: "हिन्दी (Hindi)",
  //   native: "हिन्दी",
  //   description: "पूर्ण हिन्दी इंटरफ़ेस और दैनिक दर्शन अपडेट",
  // }
];

export default function LanguageScreen({ onBack }: LanguageScreenProps) {
  const [selectedLang, setSelectedLang] = useState("English (India)");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("brajmarg_selected_language");
    if (saved) {
      setSelectedLang(saved);
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem("brajmarg_selected_language", selectedLang);
    setTimeout(() => {
      setIsSaving(false);
      showToast.success(`Language updated to ${selectedLang}`);
      onBack();
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold text-[#0F5C66] hover:bg-[#0F5C66]/10 transition cursor-pointer ${cormorantInfant.className}`}
        >
          <ArrowLeft size={16} />
          <span>Back to Settings</span>
        </button>

        <h1
          className={`${cormorantInfant.className} mt-3 text-[28px] sm:text-[34px] font-bold text-[#0F5C66]`}
        >
          Language Preferences
        </h1>
        <p
          className={`${cormorantInfant.className} text-[16px] sm:text-[18px] text-[#634E3E] font-medium`}
        >
          Select your preferred language for the Brajmarg platform, darshan notifications, and seva bookings.
        </p>
      </div>

      {/* Language Options Card */}
      <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40 p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#C37000]/20">
          <Globe size={18} className="text-[#0F5C66]" />
          <span
            className={`${cormorantInfant.className} text-[15px] font-bold uppercase tracking-wider text-[#735A47]`}
          >
            Available Supported Languages
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.label;
            return (
              <label
                key={lang.id}
                onClick={() => setSelectedLang(lang.label)}
                className={`flex items-start justify-between gap-4 rounded-xl border p-4 transition cursor-pointer ${isSelected
                  ? "border-[#D8A35D]  shadow-xs"
                  : "border-[#C37000]/25  hover:bg-[#FAF3E7]"
                  }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-1">
                    <input
                      type="radio"
                      name="app_language"
                      value={lang.label}
                      checked={isSelected}
                      onChange={() => setSelectedLang(lang.label)}
                      className="h-4 w-4 text-[#C37000] focus:ring-[#C37000]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`${cormorantInfant.className} text-[18px] sm:text-[20px] font-bold text-[#2D241E]`}
                      >
                        {lang.label}
                      </span>
                      {isSelected && (
                        <span
                          className={`${cormorantInfant.className} rounded-md bg-[#0F5C66]/10 px-2 py-0.5 text-xs font-bold text-[#0F5C66]`}
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <p
                      className={`${cormorantInfant.className} mt-0.5 text-[14px] text-[#7A6A5C]`}
                    >
                      {lang.description}
                    </p>
                  </div>
                </div>

                {/* <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${isSelected
                    ? "border-[#0F5C66] bg-[#0F5C66] text-white"
                    : "border-[#C37000]/30 bg-transparent text-transparent"
                    }`}
                >
                  <Check size={14} strokeWidth={2.5} />
                </div> */}
              </label>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#C37000]/20">
          <button
            type="button"
            onClick={onBack}
            className={`rounded-xl border border-[#C37000]/60 bg-transparent px-5 py-2.5 text-[16px] font-semibold text-[#66503E] transition hover:bg-[#C37000]/10 active:scale-98 cursor-pointer ${cormorantInfant.className}`}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F5C66] to-[#0A474E] px-6 py-2.5 text-[16px] font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-98 cursor-pointer ${cormorantInfant.className}`}
          >
            <span>{isSaving ? "Applying..." : "Save Preferences"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
