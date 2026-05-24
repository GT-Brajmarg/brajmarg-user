"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/yatra", label: "Yatra" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function HeaderNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav
        aria-label="Primary"
        className="hidden md:flex items-center gap-8"
      >
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors ${
                active
                  ? "text-brand-red"
                  : "text-gray-700 hover:text-brand-red"
              }`}
            >
              {link.label}
              {active && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 hover:text-brand-red hover:bg-gray-100 transition"
      >
        {open ? (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden absolute left-0 right-0 top-16 z-40 bg-header-bg border-b border-gray-200 shadow-sm animate-[slideUp_0.18s_ease-out]"
          onClick={() => setOpen(false)}
        >
          <nav
            aria-label="Mobile"
            className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-3 text-sm font-medium border-l-2 ${
                    active
                      ? "text-brand-red border-brand-red bg-red-50/50"
                      : "text-gray-700 border-transparent hover:text-brand-red hover:border-brand-red/40"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
