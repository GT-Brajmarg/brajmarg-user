"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type AuthState = "loading" | "guest" | "authed";

/**
 * Header auth indicator.
 *  - Guest: shows a "Login" text link
 *  - Authed: shows a profile icon linking to /cart (account hub)
 *
 * Listens to Supabase auth state changes so it flips live after
 * OTP verification without a full page reload.
 */
export default function AuthLink() {
  const [state, setState] = useState<AuthState>("loading");

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    // Initial check
    supabase.auth.getSession().then(({ data }) => {
  if (cancelled) return;
  setState(data.session?.user ? "authed" : "guest");
});

    // Live updates
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(session?.user ? "authed" : "guest");
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Avoid hydration flicker — render an empty box of the
  // same height/width as the Login button to prevent shift.
  if (state === "loading") {
    return <span className="inline-block h-10 w-24" aria-hidden />;
  }

  if (state === "guest") {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-base font-semibold text-brand-red hover:bg-red-50 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
        Login
      </Link>
    );
  }

  // Authed — profile icon
  return (
    <Link
      href="/cart"
      className="p-2 text-gray-600 hover:text-brand-red transition-colors"
      aria-label="Account"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </Link>
  );
}
