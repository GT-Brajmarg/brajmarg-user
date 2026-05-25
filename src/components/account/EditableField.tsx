"use client";

import { useState, useTransition } from "react";
import { updateProfileField } from "@/app/account/actions";
import {
  INDIA_DIAL_CODE,
  digitsOnly,
  indianNationalDigits,
} from "@/lib/identifier";

type Props = {
  field:
    | "full_name"
    | "email"
    | "phone"
    | "date_of_birth"
    | "address_line1"
    | "address_line2"
    | "city"
    | "state"
    | "pincode";
  label: string;
  value: string;
  type?: "text" | "email" | "tel" | "date";
  placeholder?: string;
  display?: string; // pretty form for display (falls back to value)
  icon: React.ReactNode;
  multiline?: boolean;
};

export default function EditableField({
  field,
  label,
  value,
  type = "text",
  placeholder,
  display,
  icon,
  multiline,
}: Props) {
  const isPhone = field === "phone";
  // For phone, the draft holds the 10 national digits; +91 is a fixed prefix.
  const toDraft = (v: string) => (isPhone ? indianNationalDigits(v) : v);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(() => toDraft(value));
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setError(null);
    startTransition(async () => {
      const res = await updateProfileField(field, draft);
      if (!res.ok) {
        setError(res.error ?? "Could not save.");
        return;
      }
      setEditing(false);
    });
  }

  function cancel() {
    setDraft(toDraft(value));
    setError(null);
    setEditing(false);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5">
      {/* Label + icon */}
      <div className="flex items-center gap-3 sm:w-44 shrink-0">
        <span className="inline-flex h-5 w-5 items-center justify-center text-gray-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            {icon}
          </svg>
        </span>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>

      {/* Value or input */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <div>
            {multiline ? (
              <textarea
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={placeholder}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
              />
            ) : isPhone ? (
              <div className="flex items-center rounded-lg border border-gray-300 bg-white px-2 py-1 transition-colors focus-within:border-brand-red focus-within:ring-2 focus-within:ring-red-100">
                <span className="px-2 py-1 text-sm font-medium text-gray-700 select-none mr-1">
                  +{INDIA_DIAL_CODE}
                </span>
                <input
                  autoFocus
                  type="text"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={draft}
                  onChange={(e) => setDraft(digitsOnly(e.target.value).slice(0, 10))}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") save();
                    if (e.key === "Escape") cancel();
                  }}
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none px-1 py-1"
                />
              </div>
            ) : (
              <input
                autoFocus
                type={type}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                  if (e.key === "Escape") cancel();
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
              />
            )}
            {error && (
              <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
          </div>
        ) : (
          <p
            className={`text-sm ${
              display || value ? "text-gray-900" : "text-gray-400 italic"
            } whitespace-pre-line`}
          >
            {display || value || `Add ${label.toLowerCase()}`}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {editing ? (
          <>
            <button
              type="button"
              onClick={cancel}
              disabled={pending}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={pending}
              className="rounded-lg bg-brand-red px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-red-dark transition-colors disabled:opacity-60 inline-flex items-center gap-1"
            >
              {pending ? (
                <>
                  <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="4" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Saving
                </>
              ) : (
                "Save"
              )}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              setDraft(toDraft(value));
              setEditing(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-brand-red hover:text-brand-red transition-colors"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
