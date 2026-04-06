import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  

  return (
    <footer className="bg-footer-bg text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="#c41e1e"
                className="w-4 h-4"
              >
                <rect x="8" y="4" width="8" height="16" rx="1" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">Brajmarg</span>
          </Link>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; {year} Brajmarg. Connecting Devotees.
          </p>
        </div>
      </div>
    </footer>
  );
}
