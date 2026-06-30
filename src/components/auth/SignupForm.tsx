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

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div
      className="mx-auto w-full max-w-[430px] lg:translate-x-[40px]"
      style={{ paddingInline: "20px" }}
    >
      {/* Heading */}
      <h2
        className={`${cormorant.className} text-[30px] leading-none font-semibold text-[#0C6B73]`}
      >
        Create Account
      </h2>

      <p className="mt-2 text-[14px] text-[#6B5A49]">
        Join Brajmarg and begin your spiritual journey.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-4"
        style={{ marginTop: "20px" }}
      >
        {/* Name */}
        <div>
          <label className="mb-2 block text-[13px] font-medium text-[#5D4E3F]">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter Full Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="h-[52px] w-full rounded-xl border border-[#DCC6A5] bg-[#FBF5EA] px-4 text-[14px] outline-none placeholder:pl-1 placeholder:text-[#A59684] focus:border-[#0B6971]"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-2 block text-[13px] font-medium text-[#5D4E3F]">
            Mobile Number
          </label>

          <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCC6A5] bg-[#FBF5EA]">
            <div className="flex w-[82px] items-center justify-center gap-2 border-r border-[#E6D7BF]">
              <span className="text-sm font-medium">+91</span>
            </div>

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="flex-1 bg-transparent px-4 text-[14px] outline-none placeholder:pl-1 placeholder:text-[#A59684]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-[13px] font-medium text-[#5D4E3F]">
            Password
          </label>

          <div className="flex h-[52px] items-center rounded-xl border border-[#DCC6A5] bg-[#FBF5EA] px-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:pl-1 placeholder:text-[#A59684]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-[13px] font-medium text-[#5D4E3F]">
            Confirm Password
          </label>

          <div className="flex h-[52px] items-center rounded-xl border border-[#DCC6A5] bg-[#FBF5EA] px-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:pl-1 placeholder:text-[#A59684]"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <label
          className="mt-2 flex cursor-pointer items-start gap-3"
          style={{ marginTop: "10px" }}
        >
          <input
            type="checkbox"
            className="mt-1 accent-[#0B6971]"
            style={{ marginTop: "4px" }}
          />

          <span className="text-[12px] leading-5 text-[#6D5A47]">
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-[#0B6971]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-[#0B6971]">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Button */}
        <button
          type="submit"
          className="group mt-2 flex h-[54px] w-full items-center justify-center rounded-xl bg-[#0B6971] text-white transition hover:bg-[#095A61]"
          style={{ marginTop: "10px" }}
        >
          <span className={`${cormorant.className} text-[20px]`}>
            Create Account
          </span>

          <ArrowRight
            size={18}
            className="ml-3 transition group-hover:translate-x-1"
          />
        </button>
      </form>

      {/* Divider */}
      <div
        className="my-7 flex items-center gap-4"
        style={{ marginTop: "5px", marginBottom: "5px" }}
      >
        <div className="h-px flex-1 bg-[#DDCCB4]" />

        <span className="text-[13px] text-[#8A7864]">or continue with</span>

        <div className="h-px flex-1 bg-[#DDCCB4]" />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-4">
        <button
          className="flex h-[50px] items-center justify-center gap-3 rounded-xl border border-[#DCC6A5] bg-[#FFF8EF] transition hover:bg-white"
          type="button"
        >
          {/* <Image src="/images/google.png" alt="Google" width={20} height={20} /> */}

          <span className="text-[14px] font-medium">Google</span>
        </button>

        <button
          className="flex h-[50px] items-center justify-center gap-3 rounded-xl border border-[#DCC6A5] bg-[#FFF8EF] transition hover:bg-white"
          type="button"
        >
          {/* <Image src="/images/apple.png" alt="Apple" width={18} height={22} /> */}

          <span className="text-[14px] font-medium">Apple</span>
        </button>
      </div>

      {/* Footer */}
      <p
        className="mt-7 text-center text-[12px] text-[#7E6E5C]"
        style={{ marginTop: "10px" }}
      >
        Already have an account?{" "}
        <span className="cursor-pointer font-semibold text-[#0B6971] hover:underline">
          Login
        </span>
      </p>
    </div>
  );
}
