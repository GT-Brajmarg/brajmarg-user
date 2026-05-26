"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  fullName: string | null;
  phone: string | null;
  email: string | null;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
};

export default function ProfileDropdown({
  fullName,
  phone,
  email,
  isPhoneVerified,
  isEmailVerified,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initials =
    fullName
      ?.trim()
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Profile"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-white text-sm font-bold shadow-sm hover:opacity-90 transition-all"
      >
        {initials}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="bg-[#fdf7f3] px-5 py-4 border-b border-gray-100">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              My Account
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {fullName || "Devotee"}
            </p>
          </div>

          {/* Content */}
          <div className="px-5 py-4 space-y-4">
            {/* Email */}
            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Email
                </p>

                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isEmailVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isEmailVerified ? "Verified" : "Pending"}
                </span>
              </div>

              <p className="mt-1 text-sm font-medium text-gray-900 break-all">
                {email || "Not added"}
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Phone
                </p>

                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isPhoneVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isPhoneVerified ? "Verified" : "Pending"}
                </span>
              </div>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {phone || "Not added"}
              </p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors"
              >
                Manage Profile
              </Link>

              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                My Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}