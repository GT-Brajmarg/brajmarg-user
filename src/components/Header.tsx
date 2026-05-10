import Link from "next/link";
import { logout } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import ProfileDropdown from "@/components/ProfileDropdown";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;

  let profile = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select(
        "full_name, phone, email, is_phone_verified, is_email_verified"
      )
      .eq("id", user.id)
      .single();

    profile = data;
  }

  return (
    <header className="sticky top-0 z-50 bg-header-bg border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brajmarg_header_logo.png"
              alt="Brajmarg"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-brand-red">
              Brajmarg
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:text-brand-red hover:bg-red-50 transition-colors"
                  aria-label="Cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.7}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2h12m-10 4a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm8 0a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5z"
                    />
                  </svg>
                </Link>

                {/* Profile */}
                <ProfileDropdown
                  fullName={profile?.full_name ?? null}
                  phone={profile?.phone ?? null}
                  email={profile?.email ?? null}
                  isPhoneVerified={
                    profile?.is_phone_verified ?? false
                  }
                  isEmailVerified={
                    profile?.is_email_verified ?? false
                  }
                />

                {/* Logout */}
                <form action={logout}>
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-gray-700 hover:text-brand-red hover:bg-red-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H9m0 0l3-3m-3 3l3 3"
                      />
                    </svg>

                    Logout
                  </button>
                </form>
              </>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
}