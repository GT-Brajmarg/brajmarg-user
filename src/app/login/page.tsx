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
    <div className="flex min-h-screen items-center justify-center bg-[#f5f0ea] py-10 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-2 mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brajmarg_header_logo.png"
            alt="Brajmarg"
            className="h-14 w-auto"
          />
          <h1 className="text-2xl font-bold text-gray-900 font-serif">
            Welcome to Brajmarg
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Sign in or create your account using your mobile or email
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-5">
          {nextPath ? (
            <input type="hidden" name="next" value={nextPath} />
          ) : null}

          <IdentifierInput autoFocus />

          <button
            formAction={sendOtp}
            className="w-full rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
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
    </div>
  );
}
