"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const SOCIALS = [
  {
    href: "https://facebook.com/brajmarg",
    label: "Facebook",
    icon: (
      <path d="M14 13.5h2.5l1-4H14V7.5c0-1.03.5-2 2-2h1.5v-3.4c-.32-.04-1.55-.1-2.85-.1C11.93 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    ),
  },
  {
    href: "https://twitter.com/brajmarg",
    label: "Twitter",
    icon: (
      <path d="M17.53 3h3.04l-6.64 7.59L22 21h-6.13l-4.8-6.27L5.57 21H2.52l7.1-8.12L2 3h6.27l4.34 5.74L17.53 3zm-1.07 16.18h1.69L7.62 4.72H5.81l10.65 14.46z" />
    ),
  },
  {
    href: "https://instagram.com/brajmarg",
    label: "Instagram",
    icon: (
      <>
        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.5-.1-4.7-.1z" />
        <path d="M12 7.4a4.6 4.6 0 100 9.2 4.6 4.6 0 000-9.2zm0 7.6a3 3 0 110-6 3 3 0 010 6z" />
        <circle cx="17" cy="7" r="1.1" />
      </>
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();
  // Hide footer on the login flow (login + verify)
  if (pathname?.startsWith("/login")) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#CD0000] text-[#EFEDE6] mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 items-start">
          {/* Brand */}
          <div className="md:col-span-4 lg:col-span-4 md:pr-6 flex md:items-center justify-center md:justify-start">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Brajmarg home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brajmarg_footer_logo.png"
                alt="Brajmarg"
                className="h-28 w-auto"
              />
            </Link>
          </div>

          {/* Quick links — two-column sub-grid, with white vertical separators */}
          <div className="md:col-span-5 lg:col-span-5 md:px-6 md:border-l md:border-r md:border-[#EFEDE6]/40">
            <h3 className="text-base font-semibold tracking-wide">
              Quick Links
            </h3>
            <span className="block mt-1 h-0.5 w-10 bg-[#EFEDE6]/70 rounded" />
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {QUICK_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href} label={l.label} />
              ))}
              {LEGAL_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href} label={l.label} />
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-3 lg:col-span-3 md:pl-6">
            <h3 className="text-base font-semibold tracking-wide">Follow Us</h3>
            <span className="block mt-1 h-0.5 w-10 bg-[#EFEDE6]/70 rounded" />
            <ul className="mt-3 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-[1.5px] ring-[#EFEDE6] text-[#EFEDE6] hover:bg-[#EFEDE6] hover:text-[#CD0000] transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-[20px] w-[20px]"
                      aria-hidden="true"
                    >
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-5 pt-3 border-t border-[#EFEDE6]/25 text-center">
          <p className="text-xs sm:text-sm text-[#EFEDE6]/85">
            &copy; {year} Brajmarg. Connecting Devotees.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm text-[#EFEDE6]/90 hover:text-white transition-colors w-fit"
    >
      <svg
        className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      </svg>
      {label}
    </Link>
  );
}
