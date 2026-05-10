import { verifyOtp } from "../actions";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{
    phone?: string;
    email?: string;
    error?: string;
    next?: string;
  }>;
}) {
  const { phone, email, error, next } = await searchParams;
  const nextPath =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "";

  if (!phone && !email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f0ea]">
        <p>
          Invalid request.{" "}
          <a href="/login" className="text-brand-red underline">
            Go back to login
          </a>
        </p>
      </div>
    );
  }

  const channel: "phone" | "email" = phone ? "phone" : "email";
  const target = phone ?? email ?? "";
  const channelLabel = channel === "phone" ? "mobile" : "email";

  // Build the link back to /login that preserves `next`
  const backHref = nextPath
    ? `/login?next=${encodeURIComponent(nextPath)}`
    : "/login";

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
            Verify your {channelLabel}
          </h1>
          <p className="text-sm text-gray-500 text-center">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-gray-800">{target}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-5">
          {phone ? <input type="hidden" name="phone" value={phone} /> : null}
          {email ? <input type="hidden" name="email" value={email} /> : null}
          {nextPath ? (
            <input type="hidden" name="next" value={nextPath} />
          ) : null}

          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              placeholder="------"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-xl text-center tracking-[0.6em] font-bold outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
            />
          </div>

          <button
            formAction={verifyOtp}
            className="w-full rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark active:scale-[0.98] transition-all shadow-sm"
          >
            Verify &amp; Continue
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          <a href={backHref} className="text-brand-red hover:underline">
            ← Use a different {channelLabel}
          </a>
        </p>
      </div>
    </div>
  );
}
