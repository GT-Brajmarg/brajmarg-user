"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Mail } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import { useRouter } from "next/navigation";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function LoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPhone = /^\d*$/.test(identifier);
  const handleSendOtp = async () => {
    setError("");

    const value = identifier.trim();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^[6-9]\d{9}$/.test(value);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or mobile number.");
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
        setError(result.message || "Unable to send OTP.");
        return;
      }

      setOtpSent(true);
    } catch {
      setError("Unable to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (enteredOtp?: string) => {
    setError("");

    const otpValue = enteredOtp ?? otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter a valid OTP.");
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
        setError(result.message || "Invalid OTP.");
        return;
      }

      localStorage.setItem("brajmarg_temp_user", JSON.stringify(result.user));
      localStorage.setItem("brajmarg_is_logged_in", "true");

      const redirectPath =
        localStorage.getItem("brajmarg_login_redirect") || "/";

      localStorage.removeItem("brajmarg_login_redirect");

      window.location.assign(redirectPath);
    } catch {
      setError("Unable to login. Please try again.");
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
      <div
        className="mx-auto w-full max-w-[430px] lg:translate-x-[40px]"
        style={{ paddingInline: "20px" }}
      >
        {/* Heading */}
        <h2
          className={`${cormorant.className} text-[30px] leading-none font-semibold text-[#0C6B73]`}
        >
          Welcome Back!
        </h2>

        {/* <p className="mt-2 text-[14px] text-[#6B5A49]">
          Login to your account to continue
        </p> */}
        <p className="mt-2 text-[14px] text-[#6B5A49]">
          {otpSent
            ? `Enter the OTP sent to ${identifier}`
            : "Enter your email or mobile number to receive an OTP"}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (otpSent) {
              handleVerifyOtp();
            } else {
              handleSendOtp();
            }
          }}
          className="mt-8 space-y-5"
          style={{ marginTop: "20px" }}
        >
          {/* Phone */}
          <div>
            <label className="mb-2 block text-[13px] font-medium text-[#5D4E3F]">
              Email or Mobile Number
            </label>

            <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCC6A5] bg-[#FBF5EA]">
              {isPhone ? (
                <div className="flex w-[82px] items-center justify-center gap-2 border-r border-[#E6D7BF]">
                  <span className="text-sm font-medium">+91</span>
                </div>
              ) : (
                <div className="flex w-[82px] items-center justify-center border-r border-[#E6D7BF]">
                  <Mail size={18} className="text-[#6B5A49]" />
                </div>
              )}

              <input
                type="text"
                placeholder="Enter Email or Mobile Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{ paddingLeft: "10px" }}
                className="flex-1 bg-transparent px-4 text-[14px] outline-none placeholder:text-[#A59684]"
              />
            </div>
          </div>

          {otpSent && (
            <div style={{ marginTop: "8px" }}>
              <label className="mb-2 block text-[13px] font-medium text-[#5D4E3F]">
                OTP
              </label>

              <div className="flex justify-between gap-3">
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
                    className="h-14 w-12 rounded-xl border border-[#DCC6A5] bg-[#FBF5EA] text-center text-xl font-semibold transition outline-none focus:border-[#C37000] focus:ring-2 focus:ring-[#F6D9AA]"
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                className="mt-3 text-[13px] text-[#C37000] hover:underline"
              >
                Resend OTP
              </button>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-[12px] text-red-600">
              {error}
            </div>
          )}

          {/* Login */}
          {!otpSent && (
            <button
              type="submit"
              disabled={loading}
              className="group flex h-[54px] w-full items-center justify-center rounded-xl bg-[#0B6971] text-white transition hover:bg-[#095A61] disabled:cursor-not-allowed disabled:opacity-70"
              style={{ marginTop: "20px" }}
            >
              <span className={`${cormorant.className} text-[20px]`}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </span>

              {!loading && (
                <ArrowRight
                  size={18}
                  className="ml-3 transition group-hover:translate-x-1"
                />
              )}
            </button>
          )}
        </form>

        {/* Divider */}
        <div
          className="my-8 flex items-center gap-4"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <div className="h-px flex-1 bg-[#DDCCB4]" />

          <span className="text-[13px] text-[#8A7864]">or continue with</span>

          <div className="h-px flex-1 bg-[#DDCCB4]" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1">
          <button
            type="button"
            className="flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-[#DCC6A5] bg-[#FFF8EF] transition hover:bg-white"
          >
            {/* <Image
              src="/images/google.png"
              alt="Google"
              width={20}
              height={20}
            /> */}

            <span className="text-[14px] font-medium text-[#333]">Google</span>
          </button>

          {/* <button
            type="button"
            className="flex h-[50px] items-center justify-center gap-3 rounded-xl border border-[#DCC6A5] bg-[#FFF8EF] transition hover:bg-white"
          >
            <span className="text-[14px] font-medium text-[#333]">Apple</span>
          </button> */}
        </div>

        {/* Terms */}
        <p
          className="mt-8 text-center text-[11px] leading-5 text-[#8B7A66]"
          style={{ marginTop: "0px" }}
        >
          By continuing, you agree to{" "}
          <span className="font-medium text-[#5F4A2D]">Brajmarg's</span>{" "}
          <Link
            href="/terms"
            className="font-medium text-[#0C6B73] transition-colors hover:text-[#095A61] hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-[#0C6B73] transition-colors hover:text-[#095A61] hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
