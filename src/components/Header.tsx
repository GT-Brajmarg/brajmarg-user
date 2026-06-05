import Link from "next/link";
import CartLinkWithBadge from "@/components/CartLinkWithBadge";
import AuthLink from "@/components/AuthLink";
import HeaderNav from "@/components/HeaderNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-header-bg border-b border-gray-200">
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brajmarg_header_logo.png"
              alt="Brajmarg"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-brand-red">Brajmarg</span>
          </Link>

          {/* Primary nav */}
          <HeaderNav />

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/shop"
              className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-gold hover:text-white hover:shadow-md"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>

              <span>Shop</span>
            </Link>
            <CartLinkWithBadge />
            <AuthLink />
          </div>
        </div>
      </div>
    </header>
  );
}
