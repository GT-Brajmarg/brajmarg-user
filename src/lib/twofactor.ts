/**
 * 2Factor.in SMS OTP client (production phone verification).
 *
 * Flow:
 *   send()   -> 2Factor generates + SMSes the OTP, returns a session id.
 *   verify() -> we pass the session id + the user's code back to 2Factor.
 *
 * 2Factor owns OTP generation/validation; Supabase is NOT used to send
 * or verify the SMS code. After verify() succeeds, the caller mints a
 * Supabase session for the (now phone-verified) user.
 *
 * Env: TWOFACTOR_API_KEY  (server-only — never expose to the client).
 *
 * Docs: https://2factor.in/API/DOCS/SMS_OTP.html
 */

const BASE = "https://2factor.in/API/V1";

export function isTwoFactorConfigured(): boolean {
  return Boolean((process.env.TWOFACTOR_API_KEY ?? "").trim());
}

function getKey(): string {
  const key = (process.env.TWOFACTOR_API_KEY ?? "").trim();
  if (!key) {
    throw new Error(
      "SMS OTP is not configured (TWOFACTOR_API_KEY is missing)."
    );
  }
  return key;
}

type TwoFactorResponse = { Status?: string; Details?: string };

/**
 * Sends an OTP via 2Factor AUTOGEN. Returns the session id which MUST
 * be carried through to verify(). The OTP itself is never returned to
 * us — 2Factor generates and SMSes it directly.
 */
export async function sendOtp(
  phone: string
): Promise<{ ok: true; sessionId: string } | { ok: false; error: string }> {
  const key = getKey();
  // 2Factor accepts E.164; strip nothing — pass the +91… number as-is.
  const url = `${BASE}/${key}/SMS/${encodeURIComponent(phone)}/AUTOGEN`;

  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    const body = (await res.json().catch(() => ({}))) as TwoFactorResponse;

    if (res.ok && body.Status === "Success" && body.Details) {
      return { ok: true, sessionId: body.Details };
    }
    return {
      ok: false,
      error: body.Details || "Could not send the OTP. Please try again.",
    };
  } catch {
    return { ok: false, error: "Could not reach the OTP service." };
  }
}

/**
 * Verifies the user-entered OTP against the session id from sendOtp.
 * 2Factor returns Status "Success" + Details "OTP Matched" on success.
 */
export async function verifyOtp(
  sessionId: string,
  otp: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = getKey();
  const url = `${BASE}/${key}/SMS/VERIFY/${encodeURIComponent(
    sessionId
  )}/${encodeURIComponent(otp)}`;

  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    const body = (await res.json().catch(() => ({}))) as TwoFactorResponse;

    if (res.ok && body.Status === "Success") {
      return { ok: true };
    }
    // 2Factor returns Status "Error" with Details like "OTP Mismatch"
    // or "OTP Expired".
    return {
      ok: false,
      error:
        body.Details === "OTP Mismatch"
          ? "Incorrect OTP. Please try again."
          : body.Details === "OTP Expired"
            ? "This OTP has expired. Please request a new one."
            : body.Details || "OTP verification failed.",
    };
  } catch {
    return { ok: false, error: "Could not reach the OTP service." };
  }
}
