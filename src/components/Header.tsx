import Link from "next/link";
import CartLinkWithBadge from "@/components/CartLinkWithBadge";
import AuthLink from "@/components/AuthLink";

export default function Header() {
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
            <span className="text-xl font-bold text-brand-red">Brajmarg</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart — only shown when it has items */}
            <CartLinkWithBadge />

            {/* Account — Login text for guests, profile icon when signed in */}
            <AuthLink />
          </div>
        </div>
      </div>
    </header>
  );
}
