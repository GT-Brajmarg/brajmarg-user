import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-header-bg border-t border-amber-200/60 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo (footer PNG already includes the wordmark) */}
          <Link href="/" className="flex items-center" aria-label="Brajmarg home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brajmarg_footer_logo.png"
              alt="Brajmarg"
              className="h-28 w-auto"
            />
          </Link>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            &copy; {year} Brajmarg. Connecting Devotees.
          </p>
        </div>
      </div>
    </footer>
  );
}
