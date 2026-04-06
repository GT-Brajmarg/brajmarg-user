import { verifyOtp } from "../actions";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string; error?: string }>;
}) {
  const { phone, error } = await searchParams;

  if (!phone) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f0ea]">
        <p>
          Invalid request.{" "}
          <a href="/login" className="text-red-600 underline">
            Go back to login
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f0ea]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-sm text-gray-500">
            Enter the OTP sent to {phone}
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form className="space-y-5">
          <input type="hidden" name="phone" value={phone} />

          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit OTP"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-center tracking-widest outline-none"
            />
          </div>

          <button
            formAction={verifyOtp}
            className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            Verify & Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          <a href="/login" className="text-red-600 underline">
            Change number
          </a>
        </p>
      </div>
    </div>
  );
}
