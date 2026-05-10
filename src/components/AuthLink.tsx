import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function AuthLink() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center rounded-lg px-4 text-base font-semibold text-brand-red hover:bg-red-50"
      >
        Login
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className="p-2 text-gray-600 hover:text-brand-red"
      aria-label="Account"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
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