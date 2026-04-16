"use client";

import { useMemo, useState } from "react";
import flags from "react-phone-number-input/flags";
import { detectMode, digitsOnly } from "@/lib/identifier";

/**
 * Unified login input — auto-detects mobile vs email.
 *
 *  - Empty / digits typed   -> phone mode (shows India flag + +91 prefix)
 *  - Letters or @ typed     -> email mode (shows envelope icon)
 *
 * Country is locked to India for now: this app currently targets
 * only Indian devotees. The country chip is rendered as a static
 * label (no dropdown).
 *
 * Two hidden form fields are submitted:
 *   - identifier      : final value (E.164 phone or trimmed email)
 *   - identifier_mode : "phone" | "email"
 */

const COUNTRY_CODE = "91";
const IndiaFlag = flags["IN"];

export default function IdentifierInput({
  autoFocus = false,
}: {
  autoFocus?: boolean;
}) {
  const [value, setValue] = useState("");

  const mode = useMemo(() => detectMode(value), [value]);

  // The value the server action will receive
  const submitValue = useMemo(() => {
    if (mode === "email") return value.trim();
    const digits = digitsOnly(value);
    if (!digits) return "";
    return `+${COUNTRY_CODE}${digits}`;
  }, [value, mode]);

  return (
    <div className="space-y-2">
      {/* Hidden form fields */}
      <input type="hidden" name="identifier" value={submitValue} />
      <input type="hidden" name="identifier_mode" value={mode} />

      {/* Visible input row */}
      <div className="flex items-center rounded-lg border border-gray-300 bg-white px-2 py-1 transition-colors focus-within:border-brand-red focus-within:ring-2 focus-within:ring-red-100">
        {mode === "phone" ? (
          <span
            className="flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-gray-700 mr-1 select-none"
            aria-label="India (+91)"
          >
            <span className="inline-flex h-4 w-6 overflow-hidden rounded-sm bg-gray-100">
              {IndiaFlag ? <IndiaFlag title="India" /> : null}
            </span>
            <span>+{COUNTRY_CODE}</span>
          </span>
        ) : (
          <span className="flex h-8 w-8 items-center justify-center text-gray-400 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
        )}

        <input
          type="text"
          inputMode={mode === "phone" ? "tel" : "email"}
          autoComplete={mode === "phone" ? "tel-national" : "email"}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Mobile number or email"
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none px-1 py-2"
        />
      </div>

      {/* Hint line */}
      <p className="text-xs text-gray-500 px-1">
        {mode === "phone"
          ? "We will send a 6-digit OTP to your mobile."
          : "We will send a 6-digit OTP to your email."}
      </p>
    </div>
  );
}
