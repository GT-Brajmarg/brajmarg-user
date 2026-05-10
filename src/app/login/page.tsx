import Link from "next/link";
import { sendOtp } from "./actions";
import IdentifierInput from "@/components/login/IdentifierInput";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const nextPath =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-4 py-10 overflow-hidden">
      {/* Decorative red dots */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_25%_30%,#c41e1e_2px,transparent_2px),radial-gradient(circle_at_75%_70%,#c41e1e_2px,transparent_2px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
          <div className="flex flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brajmarg_header_logo.png"
              alt="Brajmarg"
              className="h-14 w-auto"
            />
            <h1 className="mt-3 text-2xl font-bold text-gray-900 font-serif">
              Welcome to Brajmarg
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in or create your account using your mobile or email
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2"
            >
              <svg className="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="mt-6 space-y-5">
            {nextPath ? (
              <input type="hidden" name="next" value={nextPath} />
            ) : null}

            <IdentifierInput autoFocus />

            <button
              formAction={sendOtp}
              className="w-full rounded-xl bg-brand-red px-4 py-3.5 text-sm font-semibold text-white hover:bg-brand-red-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Continue
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500 leading-relaxed">
            By continuing, you agree to Brajmarg&apos;s{" "}
            <Link
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-red hover:underline"
            >
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          Need help?{" "}
          <Link href="/contact" className="font-semibold text-brand-red hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
