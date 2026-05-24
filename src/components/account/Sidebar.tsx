"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

const NAV = [
  {
    href: "/account",
    label: "Profile",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 1116 0" />
      </>
    ),
  },
  {
    href: "/account/transactions",
    label: "Transactions",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
  },
  {
    href: "/account/orders",
    label: "My Orders",
    icon: (
      <>
        <path d="M6 2l1.5 4M18 2l-1.5 4" />
        <path d="M3 6h18l-2 13a2 2 0 01-2 2H7a2 2 0 01-2-2L3 6z" />
      </>
    ),
  },
  {
    href: "/account/bookings",
    label: "My Bookings",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
];

type Props = {
  fullName: string;
  email: string | null;
};

export default function AccountSidebar({ fullName, email }: Props) {
  const pathname = usePathname() ?? "";

  function isActive(href: string) {
    if (href === "/account") return pathname === "/account";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const initials =
    fullName
      ?.trim()
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-5rem)] flex flex-col rounded-2xl bg-card-bg border border-gray-200 lg:border-0 lg:bg-transparent">
      {/* Header */}
      <div className="px-5 pt-6 pb-5 text-center border-b border-gray-200/70">
        <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-500 text-xl font-bold">
          {initials}
        </div>
        <p className="mt-3 text-base font-bold text-gray-900">{fullName}</p>
        <p className="mt-0.5 text-xs text-gray-500 break-all">
          {email || "—"}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-red-50 text-brand-red"
                  : "text-gray-700 hover:bg-gray-50 hover:text-brand-red"
              }`}
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center ${
                  active ? "text-brand-red" : "text-gray-400 group-hover:text-brand-red"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {item.icon}
                </svg>
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <form action={logout} className="px-3 pb-5 pt-2 border-t border-gray-200/70">
        <button
          type="submit"
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-red hover:bg-red-50 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Logout
        </button>
      </form>
    </aside>
  );
}
