/**
 * Helpers for the unified login identifier (mobile OR email).
 *
 * The login form has a single input. Users can type either an
 * Indian mobile number or an email address — the UI auto-detects
 * which one and the server action routes to the right Supabase API.
 */

export type IdentifierMode = "phone" | "email";

/** Detect whether a value is being typed as an email or a phone. */
export function detectMode(value: string): IdentifierMode {
  if (!value) return "phone";
  // Anything that contains a letter or @ is treated as an email.
  // Phone-only chars are: digits, +, space, -, (, )
  return /[a-zA-Z@]/.test(value) ? "email" : "phone";
}

/** Strip a phone string down to digits only. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/**
 * Validate a phone number (E.164: + followed by 8–15 digits).
 * The country code is already prepended by IdentifierInput.
 */
export function isValidE164(value: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(value);
}

/* --------------------------------------------------------------- */
/*  Indian mobile number helpers (shared by all forms)             */
/* --------------------------------------------------------------- */

export const INDIA_DIAL_CODE = "91";

/**
 * True if `digits` is a valid 10-digit Indian mobile number.
 * Indian mobiles always start with 6, 7, 8, or 9.
 */
export function isValidIndianMobile(digits: string): boolean {
  return /^[6-9]\d{9}$/.test(digits);
}

/**
 * Normalise any user-entered phone value into E.164 (+91XXXXXXXXXX),
 * or null if it isn't a valid 10-digit Indian mobile. Accepts input
 * with or without a +91 / 91 / 0 prefix, spaces, or dashes.
 */
export function toIndianE164(value: string): string | null {
  let d = digitsOnly(value);
  // Drop a leading country code or trunk prefix if present.
  if (d.length === 12 && d.startsWith(INDIA_DIAL_CODE)) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  if (!isValidIndianMobile(d)) return null;
  return `+${INDIA_DIAL_CODE}${d}`;
}

/** Extract the bare 10-digit national number from any phone value. */
export function indianNationalDigits(value: string): string {
  let d = digitsOnly(value);
  if (d.length === 12 && d.startsWith(INDIA_DIAL_CODE)) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
}
