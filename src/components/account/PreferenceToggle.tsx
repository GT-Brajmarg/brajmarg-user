"use client";

import { useState, useTransition } from "react";
import { updatePreference } from "@/app/account/actions";

type Props = {
  pref: "email_notifications" | "wishlist_private";
  initial: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function PreferenceToggle({
  pref,
  initial,
  title,
  description,
  icon,
}: Props) {
  const [enabled, setEnabled] = useState(initial);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !enabled;
    setEnabled(next); // optimistic
    startTransition(async () => {
      const res = await updatePreference(pref, next);
      if (!res.ok) {
        // Roll back on error
        setEnabled(!next);
      }
    });
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-5 w-5 mt-0.5 items-center justify-center text-gray-500">
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
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        disabled={pending}
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          enabled ? "bg-brand-red" : "bg-gray-300"
        } ${pending ? "opacity-70" : ""}`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
