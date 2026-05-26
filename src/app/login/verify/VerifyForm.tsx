"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { resendOtp, verifyOtp } from "../actions";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 15;

type Props = {
  phone?: string;
  email?: string;
  sid?: string; // 2Factor session id (phone logins only)
  next?: string;
  channelLabel: string; // "mobile" | "email"
  initialError?: string;
};

export default function VerifyForm({
  phone,
  email,
  sid,
  next,
  channelLabel,
  initialError,
}: Props) {
  const [digits, setDigits] = useState<string[]>(() =>
    Array(OTP_LENGTH).fill("")
  );
  // Held in state so a resend (which mints a NEW 2Factor session) can
  // swap in the fresh session id without a full page reload.
  const [sessionId, setSessionId] = useState<string | undefined>(sid);
  const [error, setError] = useState<string | undefined>(initialError);
  const [resendInfo, setResendInfo] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isResending, startResend] = useTransition();

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const autoSubmittedRef = useRef(false);

  // Focus first box on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Resend countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [secondsLeft]);

  const otp = digits.join("");
  const otpFilled = digits.every((d) => d !== "");

  // Auto-submit once every box is filled (only once per fill)
  useEffect(() => {
    if (otpFilled && !autoSubmittedRef.current) {
      autoSubmittedRef.current = true;
      // Slight delay so the last keystroke gets painted before the
      // form action navigates away.
      const id = window.setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 60);
      return () => window.clearTimeout(id);
    }
    if (!otpFilled) {
      autoSubmittedRef.current = false;
    }
  }, [otpFilled]);

  function setDigitAt(index: number, value: string) {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setError(undefined);
  }

  function handleChange(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const raw = e.target.value;
    // Only digits allowed; if user pastes more than 1 char, treat as paste.
    const onlyDigits = raw.replace(/\D/g, "");

    if (onlyDigits.length === 0) {
      setDigitAt(index, "");
      return;
    }

    if (onlyDigits.length === 1) {
      setDigitAt(index, onlyDigits);
      // Move to next box
      if (index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      return;
    }

    // Pasted multiple chars — distribute across boxes from current index
    const chars = onlyDigits.slice(0, OTP_LENGTH - index).split("");
    setDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < chars.length; i++) {
        next[index + i] = chars[i];
      }
      return next;
    });
    const lastFilled = Math.min(index + chars.length, OTP_LENGTH - 1);
    inputsRef.current[lastFilled]?.focus();
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        setDigitAt(index, "");
        return;
      }
      // Empty — move focus back
      if (index > 0) {
        e.preventDefault();
        inputsRef.current[index - 1]?.focus();
        setDigitAt(index - 1, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    e.preventDefault();
    const chars = text.slice(0, OTP_LENGTH - index).split("");
    setDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < chars.length; i++) {
        next[index + i] = chars[i];
      }
      return next;
    });
    const lastFilled = Math.min(index + chars.length, OTP_LENGTH - 1);
    inputsRef.current[lastFilled]?.focus();
  }

  function handleResend() {
    if (secondsLeft > 0 || isResending) return;
    setError(undefined);
    setResendInfo(null);
    startResend(async () => {
      const res = await resendOtp({ phone, email });
      if (res.ok) {
        // 2Factor issues a new session on resend — use it for verify.
        if (res.sessionId) setSessionId(res.sessionId);
        setResendInfo(`A new code was sent to your ${channelLabel}.`);
        setDigits(Array(OTP_LENGTH).fill(""));
        autoSubmittedRef.current = false;
        inputsRef.current[0]?.focus();
        setSecondsLeft(RESEND_SECONDS);
      } else {
        setError(res.error ?? "Could not resend OTP. Please try again.");
      }
    });
  }

  return (
    <form ref={formRef} action={verifyOtp} className="space-y-6">
      {phone ? <input type="hidden" name="phone" value={phone} /> : null}
      {email ? <input type="hidden" name="email" value={email} /> : null}
      {sessionId ? (
        <input type="hidden" name="sid" value={sessionId} />
      ) : null}
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <input type="hidden" name="otp" value={otp} />

      {/* Banners */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2"
        >
          <svg className="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {resendInfo && !error && (
        <div
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-start gap-2"
        >
          <svg className="h-4 w-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{resendInfo}</span>
        </div>
      )}

      {/* OTP boxes */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3 text-center">
          Enter the {OTP_LENGTH}-digit code
        </label>
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={(e) => handlePaste(i, e)}
              onFocus={(e) => e.target.select()}
              aria-label={`Digit ${i + 1}`}
              className={`h-12 w-10 sm:h-14 sm:w-12 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 bg-white text-gray-900 outline-none transition-all ${
                d
                  ? "border-brand-red shadow-sm"
                  : "border-gray-200 focus:border-brand-red focus:ring-4 focus:ring-red-100"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!otpFilled}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3.5 text-sm font-semibold text-white hover:bg-brand-red-dark disabled:bg-brand-red/50 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        Verify &amp; Continue
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
        </svg>
      </button>

      {/* Resend */}
      <div className="text-center text-sm">
        <span className="text-gray-500">Didn&apos;t receive the code? </span>
        {secondsLeft > 0 ? (
          <span className="text-gray-400">
            Resend in <span className="font-semibold text-gray-600">{secondsLeft}s</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="font-semibold text-brand-red hover:underline disabled:opacity-60 disabled:cursor-wait"
          >
            {isResending ? "Sending…" : "Resend OTP"}
          </button>
        )}
      </div>
    </form>
  );
}
