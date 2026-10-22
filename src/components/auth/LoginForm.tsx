"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Pencil, Mail } from "lucide-react";
import { cormorant } from "@/lib/fonts";
import {
  showToast,
  handleApiError,
  getErrorMessageFromStatus,
} from "@/lib/toast";

function IndiaFlag() {
  return (
    <svg
      viewBox="0 0 30 20"
      className="h-[15px] w-[23px] shrink-0 overflow-hidden rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
      aria-hidden="true"
    >
      <rect width="30" height="6.67" fill="#FF9933" />
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      <rect y="13.33" width="30" height="6.67" fill="#128807" />
      <circle cx="15" cy="10" r="2.35" fill="none" stroke="#000080" strokeWidth="0.5" />
      <circle cx="15" cy="10" r="0.65" fill="#000080" />
      <g stroke="#000080" strokeWidth="0.28">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="15"
            y1="7.65"
            x2="15"
            y2="12.35"
            transform={`rotate(${i * 15} 15 10)`}
          />
        ))}
      </g>
    </svg>
  );
}

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPhone = identifier.length > 0 && /^\d/.test(identifier);
  const isEmail = identifier.length > 0 && !/^\d/.test(identifier);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim());

  // 30 seconds countdown timer when OTP is sent
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpSent, timer]);

  const formattedIdentifier =
    isPhone && identifier.length === 10
      ? `+91 ${identifier.slice(0, 5)} ${identifier.slice(5)}`
      : isPhone
        ? `+91 ${identifier}`
        : identifier;

  const handleSendOtp = async () => {
    setError("");

    const value = identifier.trim();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^[6-9]\d{9}$/.test(value);

    if (!isEmail && !isPhone) {
      showToast.error("Please enter a valid email or mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMsg =
          result.message ||
          getErrorMessageFromStatus(response.status, "Unable to send OTP.");
        showToast.error(errorMsg);
        return;
      }

      setOtpSent(true);
      setTimer(30);
      showToast.success(result.message || "OTP sent successfully!");
    } catch (err) {
      const errorMsg = handleApiError(
        err,
        "Unable to send OTP. Please check your connection.",
      )
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (enteredOtp?: string) => {
    setError("");

    const otpValue = enteredOtp ?? otp.join("");

    if (otpValue.length !== 6) {
      const msg = "Please enter a valid 6-digit OTP."
      showToast.warning(msg);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          otp: otpValue,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMsg =
          result.message ||
          getErrorMessageFromStatus(response.status, "Invalid OTP.");
        showToast.error(errorMsg);
        return;
      }

      showToast.success(result.message || "Signed in successfully!");

      localStorage.setItem("brajmarg_temp_user", JSON.stringify(result.user));
      localStorage.setItem("brajmarg_is_logged_in", "true");

      const redirectPath =
        localStorage.getItem("brajmarg_login_redirect") || "/";

      localStorage.removeItem("brajmarg_login_redirect");

      window.location.assign(redirectPath);
    } catch (err) {
      const errorMsg = handleApiError(
        err,
        "Unable to login. Please try again.",
      );
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const otpValue = updatedOtp.join("");

    if (otpValue.length === 6 && !updatedOtp.includes("")) {
      handleVerifyOtp(otpValue);
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const updatedOtp = [...otp];

    pasted.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    if (pasted.length === 6) {
      handleVerifyOtp(updatedOtp.join(""));
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[390px]">
        {/* Heading */}
        {!otpSent ? (
          <>
            <h2
              className={`${cormorant.className} text-[28px] sm:text-[32px] leading-tight font-semibold text-[#0C6B73]`}
            >
              Welcome Back!
            </h2>

            <p className="mt-1.5 text-[13px] sm:text-[14px] text-[#6B5A49]">
              Enter your email or mobile number to receive an OTP
            </p>
          </>
        ) : (
          <>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1E293B] tracking-tight">
              Almost there!
            </h2>

            <div className="mt-2 text-[14px] sm:text-[15px] leading-relaxed text-[#475569]">
              <p>We&apos;ve sent a 6-digit OTP to</p>
              <div className="mt-0.5 flex items-center font-semibold text-[#1E293B]">
                <span>{formattedIdentifier}</span>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp(["", "", "", "", "", ""]);
                    setError("");
                  }}
                  className="ml-2 inline-flex items-center rounded-md p-1 text-[#64748B] transition-colors hover:bg-[#F3ECE0]/70 hover:text-[#0B6971] cursor-pointer"
                  title="Edit"
                  aria-label="Edit mobile number or email"
                >
                  <Pencil size={15} className="stroke-[2.2]" />
                </button>
              </div>
            </div>
          </>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (otpSent) {
              handleVerifyOtp();
            } else {
              handleSendOtp();
            }
          }}
          className="mt-6 space-y-4"
        >
          {/* Phone or Email Input (Step 1) */}
          {!otpSent && (
            <div>
              <label
                className={`${cormorant.className} mb-1.5 block text-[16px] sm:text-[17px] font-semibold text-[#4A3B2C]`}
              >
                {identifier.length === 0
                  ? "Email or Mobile Number"
                  : isPhone
                    ? "Mobile Number"
                    : "Email"}
              </label>

              <div className="flex h-[50px] sm:h-[52px] items-center overflow-hidden rounded-xl border border-[#DCC6A5] bg-[#FAF5EC] transition focus-within:border-[#0C6B73] focus-within:ring-1 focus-within:ring-[#0C6B73]/20">
                {isPhone ? (
                  <div className="flex h-full items-center gap-2 pl-3.5 pr-3 border-r border-[#E0D2BE] select-none shrink-0">
                    <IndiaFlag />
                    <span className="text-[15px] font-semibold text-[#3E3228]">+91</span>
                  </div>
                ) : isEmail ? (
                  <div className="flex h-full items-center pl-3.5 pr-3 border-r border-[#E0D2BE] select-none shrink-0 text-[#0C6B73]">
                    <Mail size={18} />
                  </div>
                ) : null}

                <input
                  type={isEmail ? "email" : isPhone ? "tel" : "text"}
                  inputMode={isPhone ? "numeric" : isEmail ? "email" : "text"}
                  placeholder={
                    identifier.length === 0
                      ? "Enter Email or Mobile Number"
                      : isPhone
                        ? "Enter Mobile Number"
                        : "Enter Email Address"
                  }
                  maxLength={isPhone ? 10 : undefined}
                  value={identifier}
                  onChange={(e) => {
                    const rawVal = e.target.value;
                    if (rawVal === "") {
                      setIdentifier("");
                      return;
                    }
                    // Check if phone mode or user typed/pasted number
                    const cleaned = rawVal.replace(/^\+91\s*/, "");
                    if (/^\d/.test(cleaned) || /^\d/.test(rawVal)) {
                      const digits = (rawVal.startsWith("+91") ? cleaned : rawVal)
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setIdentifier(digits);
                    } else {
                      setIdentifier(rawVal);
                    }
                  }}
                  className="flex-1 bg-transparent px-3.5 text-[14px] sm:text-[15px] text-[#2D241E] outline-none placeholder:text-[#9B8C7E]"
                />
              </div>


            </div>
          )}

          {/* OTP Input (Step 2) */}
          {otpSent && (
            <div className="space-y-4 pt-1">
              <div className="flex justify-between gap-2 sm:gap-2.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={handleOtpPaste}
                    className="h-[52px] w-[46px] sm:h-[56px] sm:w-[50px] rounded-xl sm:rounded-2xl border border-[#DCC6A5] bg-[#FAF5EC] text-center text-xl font-bold text-[#1E293B] shadow-xs transition outline-none focus:border-[#0B6971] focus:ring-2 focus:ring-[#0B6971]/20"
                  />
                ))}
              </div>

              {/* Timer / Resend */}
              <div className="text-center text-[13px] sm:text-[13.5px] text-[#64748B]">
                <span>Didn&apos;t receive the OTP? </span>
                {timer > 0 ? (
                  <span className="font-semibold text-[#0B6971]">
                    Resend in 00.{timer < 10 ? `0${timer}` : timer}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      setOtp(["", "", "", "", "", ""]);
                      setTimer(30);
                      await handleSendOtp();
                    }}
                    disabled={loading}
                    className="font-semibold text-[#0B6971] hover:underline cursor-pointer disabled:opacity-60"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}



          {/* Step 1: Send OTP Button */}
          {!otpSent && (
            <button
              type="submit"
              disabled={loading}
              className="group flex h-[50px] sm:h-[52px] w-full items-center justify-center rounded-xl bg-[#0B6971] text-white transition hover:bg-[#095A61] disabled:cursor-not-allowed disabled:opacity-70 mt-4"
            >
              <span className={`${cormorant.className} text-[19px] sm:text-[20px] font-semibold tracking-wide`}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </span>

              {!loading && (
                <ArrowRight
                  size={18}
                  className="ml-2.5 transition group-hover:translate-x-1"
                />
              )}
            </button>
          )}

          {/* Step 2: Verify OTP Button */}
          {otpSent && (
            <button
              type="submit"
              disabled={loading}
              className="group flex h-[50px] sm:h-[52px] w-full items-center justify-center rounded-xl bg-[#0B6971] text-white transition hover:bg-[#095A61] disabled:cursor-not-allowed disabled:opacity-70 mt-4 shadow-xs"
            >
              <span className={`${cormorant.className} text-[19px] sm:text-[20px] font-semibold tracking-wide`}>
                {loading ? "Verifying..." : "Verify OTP"}
              </span>

              {!loading && (
                <ArrowRight
                  size={18}
                  className="ml-2.5 transition group-hover:translate-x-1"
                />
              )}
            </button>
          )}
        </form>

        {/* Divider & Social Login */}
        {/* {!otpSent && (
          <>
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#DDCCB4]" />
              <span className="text-[12px] sm:text-[13px] text-[#8A7864] whitespace-nowrap">
                or continue with
              </span>
              <div className="h-px flex-1 bg-[#DDCCB4]" />
            </div>

            <div className="w-full">
              <button
                type="button"
                className="flex h-[46px] sm:h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-[#DCC6A5] bg-[#FFF8EF] shadow-xs transition hover:bg-white hover:border-[#CDB38E]"
              >
                <span className="text-[14px] font-medium text-[#44382C]">Google</span>
              </button>
            </div>
          </>
        )} */}

        {/* Terms */}
        {otpSent && (
          <p className="mt-4 sm:mt-5 text-center text-[11px] sm:text-[11.5px] leading-relaxed text-[#8B7A66]">
            By continuing, you agree to{" "}
            <span className="text-[#5F4A2D]">Brajmarg&apos;s</span>{" "}
            <Link
              href="/terms"
              style={{ color: "#2563EB", textDecoration: "underline" }}
              className="font-medium !text-blue-600 !underline underline-offset-2 transition-colors hover:!text-blue-700"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              style={{ color: "#2563EB", textDecoration: "underline" }}
              className="font-medium !text-blue-600 !underline underline-offset-2 transition-colors hover:!text-blue-700"
            >
              Privacy Policy
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
