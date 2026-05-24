import Link from "next/link";
import VerifyForm from "./VerifyForm";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{
    phone?: string;
    email?: string;
    sid?: string;
    error?: string;
    next?: string;
  }>;
}) {
  const { phone, email, sid, error, next } = await searchParams;
  const nextPath =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "";

  if (!phone && !email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f0ea] px-4">
        <p className="text-sm">
          Invalid request.{" "}
          <Link href="/login" className="text-brand-red underline">
            Go back to login
          </Link>
        </p>
      </div>
    );
  }

  const channel: "phone" | "email" = phone ? "phone" : "email";
  const target = phone ?? email ?? "";
  const channelLabel = channel === "phone" ? "mobile" : "email";

  // Mask the target for display (privacy)
  const masked =
    channel === "phone"
      ? maskPhone(target)
      : maskEmail(target);

  const backHref = nextPath
    ? `/login?next=${encodeURIComponent(nextPath)}`
    : "/login";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-4 py-10 overflow-hidden">
      {/* Decorative red dots */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_25%_30%,#c41e1e_2px,transparent_2px),radial-gradient(circle_at_75%_70%,#c41e1e_2px,transparent_2px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-brand-red mb-4">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-serif">
              Verify your {channelLabel}
            </h1>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-gray-800">{masked}</span>
            </p>
          </div>

          <div className="mt-6">
            <VerifyForm
              phone={phone}
              email={email}
              sid={sid}
              next={nextPath || undefined}
              channelLabel={channelLabel}
              initialError={error}
            />
          </div>

          <p className="mt-6 text-center text-sm">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 text-brand-red hover:underline"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
              Use a different {channelLabel}
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          Trouble signing in?{" "}
          <Link href="/contact" className="font-semibold text-brand-red hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}

function maskPhone(phone: string): string {
  // +919876543210 -> +91 ••• ••• 3210
  if (phone.length < 7) return phone;
  const last4 = phone.slice(-4);
  const cc = phone.startsWith("+") ? phone.slice(0, 3) : "";
  return `${cc} ••• ••• ${last4}`.trim();
}

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  if (user.length <= 2) return `${user[0] ?? ""}•@${domain}`;
  return `${user.slice(0, 2)}${"•".repeat(Math.min(user.length - 2, 5))}@${domain}`;
}
