"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      phone,
      password,
    });
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

        <p className="mt-2 text-[14px] text-[#6B5A49]">
          Login to your account to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
          style={{ marginTop: "20px" }}
        >
          {/* Phone */}
          <div>
            <label className="mb-2 block text-[13px] font-medium text-[#5D4E3F]">
              Mobile Number
            </label>

            <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCC6A5] bg-[#FBF5EA]">
              <div className="flex w-[82px] items-center justify-center gap-2 border-r border-[#E6D7BF]">
                {/* <Image
                  src="/images/india.png"
                  alt="India"
                  width={22}
                  height={16}
                /> */}

                <span className="text-sm font-medium">+91</span>
              </div>

              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-[14px] outline-none placeholder:pl-1 placeholder:text-[#A59684]"
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginTop: "8px" }}>
            <label className="mb-2 block text-[13px] font-medium text-[#5D4E3F]">
              Password
            </label>

            <div className="flex h-[52px] items-center rounded-xl border border-[#DCC6A5] bg-[#FBF5EA] px-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-[14px] outline-none placeholder:pl-1 placeholder:text-[#A59684]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#6B5A49]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="mt-2 flex justify-end" style={{ marginTop: "8px" }}>
              <Link
                href="/forgot-password"
                className="text-[12px] text-[#C37000]/60 transition hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="group flex h-[54px] w-full items-center justify-center rounded-xl bg-[#0B6971] text-white transition hover:bg-[#095A61]"
            style={{ marginTop: "20px" }}
          >
            <span className={`${cormorant.className} text-[20px]`}>Login</span>

            <ArrowRight
              size={18}
              className="ml-3 transition group-hover:translate-x-1"
            />
          </button>
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
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex h-[50px] items-center justify-center gap-3 rounded-xl border border-[#DCC6A5] bg-[#FFF8EF] transition hover:bg-white"
          >
            {/* <Image
              src="/images/google.png"
              alt="Google"
              width={20}
              height={20}
            /> */}

            <span className="text-[14px] font-medium text-[#333]">Google</span>
          </button>

          <button
            type="button"
            className="flex h-[50px] items-center justify-center gap-3 rounded-xl border border-[#DCC6A5] bg-[#FFF8EF] transition hover:bg-white"
          >
            {/* <Image src="/images/apple.png" alt="Apple" width={18} height={22} /> */}

            <span className="text-[14px] font-medium text-[#333]">Apple</span>
          </button>
        </div>

        {/* Terms */}
        <p
          className="mt-8 text-center text-[11px] leading-5 text-[#8B7A66]"
          style={{ marginTop: "10px" }}
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
