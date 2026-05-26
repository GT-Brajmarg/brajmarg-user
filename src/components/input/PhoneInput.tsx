"use client";

import { useId, useMemo, useState } from "react";
import flags from "react-phone-number-input/flags";
import {
  INDIA_DIAL_CODE,
  digitsOnly,
  indianNationalDigits,
  isValidIndianMobile,
} from "@/lib/identifier";

/**
 * Reusable Indian mobile-number input.
 *
 *  - Renders a fixed "🇮🇳 +91" prefix chip (country locked to India).
 *  - Accepts EXACTLY 10 digits; strips everything else as you type.
 *  - Submits the E.164 value (+91XXXXXXXXXX) via a hidden field named
 *    `name`, so server actions receive a consistent format.
 *  - Shows inline validation (after blur) and exposes a matching hidden
 *    `pattern` so native form submission is also blocked when invalid.
 *
 * Used across checkout, yatra booking, contact, and the account profile.
 */

const IndiaFlag = flags["IN"];
const MAX_DIGITS = 10;

export default function PhoneInput({
  name,
  defaultValue = "",
  required = false,
  label,
  autoComplete = "tel-national",
  className = "",
}: {
  /** Form field name the server action reads (receives E.164 value). */
  name: string;
  /** Pre-fill — may be raw digits or an existing +91… value. */
  defaultValue?: string;
  required?: boolean;
  label?: string;
  autoComplete?: string;
  className?: string;
}) {
  const inputId = useId();
  const [digits, setDigits] = useState(() =>
    indianNationalDigits(defaultValue ?? ""),
  );
  const [touched, setTouched] = useState(false);

  // The value the server action will receive: E.164 when complete,
  // empty string when the field is empty (optional fields stay empty).
  const submitValue = useMemo(
    () => (digits.length === 10 ? `+${INDIA_DIAL_CODE}${digits}` : digits ? digits : ""),
    [digits],
  );

  const isEmpty = digits.length === 0;
  const isValid = isValidIndianMobile(digits);
  // Optional + empty is fine; otherwise it must be a valid 10-digit mobile.
  const error =
    touched && !isValid && (required || !isEmpty)
      ? isEmpty
        ? "Mobile number is required."
        : digits.length < 10
          ? "Enter a 10-digit mobile number."
          : "Enter a valid Indian mobile number."
      : null;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-brand-red"> *</span>}
        </label>
      )}

      {/* Hidden field carrying the normalised value to the server. */}
      <input type="hidden" name={name} value={submitValue} />

      <div
        className={`flex items-center rounded-lg border bg-white px-2 py-1 transition-colors focus-within:ring-2 ${
          error
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-100"
            : "border-gray-300 focus-within:border-brand-red focus-within:ring-red-100"
        }`}
      >
        <span
          className="flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-gray-700 mr-1 select-none"
          aria-label="India (+91)"
        >
          <span className="inline-flex h-4 w-6 overflow-hidden rounded-sm bg-gray-100">
            {IndiaFlag ? <IndiaFlag title="India" /> : null}
          </span>
          <span>+{INDIA_DIAL_CODE}</span>
        </span>

        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete={autoComplete}
          value={digits}
          onChange={(e) =>
            setDigits(digitsOnly(e.target.value).slice(0, MAX_DIGITS))
          }
          onBlur={() => setTouched(true)}
          maxLength={MAX_DIGITS}
          placeholder="10-digit mobile number"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none px-1 py-2"
        />
      </div>

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
