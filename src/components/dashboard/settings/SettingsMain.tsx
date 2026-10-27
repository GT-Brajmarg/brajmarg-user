"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Shield,
  LifeBuoy,
  User,
  ChevronDown,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";

interface SettingsMainProps {
  onNavigate: (view: "main" | "language" | "support") => void;
  onRequestDeleteAccount: () => void;
}

export default function SettingsMain({
  onNavigate,
  onRequestDeleteAccount,
}: SettingsMainProps) {
  const [currentLanguage, setCurrentLanguage] = useState("English (India)");

  useEffect(() => {
    const saved = localStorage.getItem("brajmarg_selected_language");
    if (saved) {
      setCurrentLanguage(saved);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1
          className={`${cormorantInfant.className} text-[28px] sm:text-[34px] font-bold text-[#0F5C66]`}
        >
          Settings
        </h1>
        <p
          className={`${cormorantInfant.className} text-[16px] sm:text-[18px] text-[#634E3E] font-medium`}
        >
          Manage your app preferences, legal documentation, support, and account security.
        </p>
      </div>

      <div className="space-y-5">
        {/* ══ 1. PREFERENCES ══ */}
        <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40  p-5 sm:p-6 shadow-sm">
          {/* Section Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-[#C37000]/20">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#0F5C66]/10 text-[#0F5C66]">
              <Globe size={22} strokeWidth={2} />
            </div>
            <h2
              className={`${cormorantInfant.className} text-[22px] sm:text-[24px] font-bold text-[#2D241E]`}
            >
              Preferences
            </h2>
          </div>

          {/* Preferences Body */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => onNavigate("language")}
              className="group flex w-full flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#C37000]/30 p-3.5 sm:p-4 text-left transition hover:border-[#C37000] hover:bg-[#FAF3E7] cursor-pointer"
            >
              <div className="space-y-1">
                <span
                  className={`${cormorantInfant.className} text-[15px] font-bold uppercase tracking-wider text-[#735A47]`}
                >
                  Language
                </span>
                <p
                  className={`${cormorantInfant.className} text-[17px] sm:text-[18px] font-bold text-[#0F5C66]`}
                >
                  Current: {currentLanguage}
                </p>
                <p
                  className={`${cormorantInfant.className} text-[14px] text-[#7A6A5C] font-medium`}
                >
                  Set your preferred language for the interface.
                </p>
              </div>

              <div className="mt-2.5 sm:mt-0 flex items-center gap-1.5 self-end sm:self-center rounded-lg bg-[#0F5C66]/10 px-3 py-1.5 text-xs font-semibold text-[#0F5C66] group-hover:bg-[#0F5C66] group-hover:text-white transition">
                <span className={`${cormorantInfant.className} text-[14px] font-bold`}>
                  Change
                </span>
                <ChevronDown size={14} className="group-hover:translate-y-0.5 transition" />
              </div>
            </button>
          </div>
        </div>

        {/* ══ 2. LEGAL ══ */}
        <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40 p-5 sm:p-6 shadow-sm">
          {/* Section Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-[#C37000]/20">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#0F5C66]/10 text-[#0F5C66]">
              <Shield size={22} strokeWidth={2} />
            </div>
            <h2
              className={`${cormorantInfant.className} text-[22px] sm:text-[24px] font-bold text-[#2D241E]`}
            >
              Legal
            </h2>
          </div>

          {/* Legal Rows - Direct links opening in a separate tab */}
          <div className="divide-y divide-[#C37000]/20 pt-2">
            {/* Privacy Policy */}
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3.5 px-2 rounded-xl transition hover:bg-[#FAF3E7]/50 cursor-pointer"
            >
              <div>
                <h3
                  className={`${cormorantInfant.className} text-[18px] sm:text-[20px] font-bold text-[#2D241E] group-hover:text-[#0F5C66] transition`}
                >
                  Privacy Policy
                </h3>
                <p
                  className={`${cormorantInfant.className} text-[14px] sm:text-[15px] text-[#7A6A5C] font-medium`}
                >
                  View our data and usage policies.
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-[#8A715E] group-hover:text-[#0F5C66] group-hover:translate-x-0.5 transition shrink-0"
              />
            </Link>

            {/* Terms and Conditions */}
            <Link
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3.5 px-2 rounded-xl transition hover:bg-[#FAF3E7]/50 cursor-pointer"
            >
              <div>
                <h3
                  className={`${cormorantInfant.className} text-[18px] sm:text-[20px] font-bold text-[#2D241E] group-hover:text-[#0F5C66] transition`}
                >
                  Terms and Conditions
                </h3>
                <p
                  className={`${cormorantInfant.className} text-[14px] sm:text-[15px] text-[#7A6A5C] font-medium`}
                >
                  Review the service agreement.
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-[#8A715E] group-hover:text-[#0F5C66] group-hover:translate-x-0.5 transition shrink-0"
              />
            </Link>
          </div>
        </div>

        {/* ══ 3. SUPPORT ══ */}
        <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40 p-5 sm:p-6 shadow-sm">
          {/* Section Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-[#C37000]/20">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#0F5C66]/10 text-[#0F5C66]">
              <LifeBuoy size={22} strokeWidth={2} />
            </div>
            <h2
              className={`${cormorantInfant.className} text-[22px] sm:text-[24px] font-bold text-[#2D241E]`}
            >
              Support
            </h2>
          </div>

          {/* Support Rows - Direct links opening in a separate tab */}
          <div className="divide-y divide-[#C37000]/20 pt-2">
            {/* Help & Support */}
            <Link
              href="/support"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3.5 px-2 rounded-xl transition hover:bg-[#FAF3E7]/50 cursor-pointer"
            >
              <div>
                <h3
                  className={`${cormorantInfant.className} text-[18px] sm:text-[20px] font-bold text-[#2D241E] group-hover:text-[#0F5C66] transition`}
                >
                  Help & Support
                </h3>
                <p
                  className={`${cormorantInfant.className} text-[14px] sm:text-[15px] text-[#7A6A5C] font-medium`}
                >
                  Visit our Help Center for guides and FAQs.
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-[#8A715E] group-hover:text-[#0F5C66] group-hover:translate-x-0.5 transition shrink-0"
              />
            </Link>

            {/* Contact Us */}
            <Link
              href="/support#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3.5 px-2 rounded-xl transition hover:bg-[#FAF3E7]/50 cursor-pointer"
            >
              <div>
                <h3
                  className={`${cormorantInfant.className} text-[18px] sm:text-[20px] font-bold text-[#2D241E] group-hover:text-[#0F5C66] transition`}
                >
                  Contact Us
                </h3>
                <p
                  className={`${cormorantInfant.className} text-[14px] sm:text-[15px] text-[#7A6A5C] font-medium`}
                >
                  Get in touch with our dedicated devotee care team.
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-[#8A715E] group-hover:text-[#0F5C66] group-hover:translate-x-0.5 transition shrink-0"
              />
            </Link>
          </div>
        </div>

        {/* ══ 4. ACCOUNT ══ */}
        <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40  p-5 sm:p-6 shadow-sm">
          {/* Section Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-[#C37000]/20">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#0F5C66]/10 text-[#0F5C66]">
              <User size={22} strokeWidth={2} />
            </div>
            <h2
              className={`${cormorantInfant.className} text-[22px] sm:text-[24px] font-bold text-[#2D241E]`}
            >
              Account
            </h2>
          </div>

          {/* Delete Account Row */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3
                className={`${cormorantInfant.className} text-[19px] sm:text-[21px] font-bold text-[#2D241E]`}
              >
                Delete Account
              </h3>
              <p
                className={`${cormorantInfant.className} text-[14px] sm:text-[15px] text-[#7A6A5C] font-medium`}
              >
                This action is final and cannot be undone.
              </p>
            </div>

            <button
              type="button"
              onClick={onRequestDeleteAccount}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border border-[#DC2626] bg-[#DC2626]/5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-[#DC2626] uppercase transition hover:bg-[#DC2626] hover:text-white active:scale-98 cursor-pointer shrink-0 ${cormorantInfant.className}`}
            >
              <Trash2 size={16} />
              <span>PERMANENTLY DELETE ACCOUNT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
