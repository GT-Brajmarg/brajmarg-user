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
