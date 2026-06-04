import Razorpay from "razorpay";

/**
 * Lazy Razorpay client.
 *
 * The SDK validates its credentials in the constructor and throws synchronously
 * if either `key_id` or `key_secret` is missing. If we instantiated at module
 * load time, `next build`'s page-data collection would import this module and
 * crash on any environment where the env vars aren't set (e.g. CI build steps
 * that don't carry production secrets).
 *
 * Instead, construct it on first use at request time and memoise. Server
 * actions / route handlers can call `getRazorpay()` and get a working client;
 * the build never touches the constructor.
 */
let cached: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (cached) return cached;

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay is not configured: set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment.",
    );
  }

  cached = new Razorpay({ key_id, key_secret });
  return cached;
}
