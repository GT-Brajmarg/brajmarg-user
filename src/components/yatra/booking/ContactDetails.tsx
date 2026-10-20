"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  aadhaar?: string;
  address?: string;
}

interface ContactDetailsProps {
  submitted?: boolean;
  initialData?: {
    name: string;
    phone: string;
    email: string;
    aadhaar: string;
    address: string;
  };
  onChange?: (data: {
    name: string;
    phone: string;
    email: string;
    aadhaar: string;
    address: string;
  }) => void;
}

/* ── Indian Flag SVG (avoids emoji rendering issues) ── */
function IndiaFlag() {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 rounded-[2px]"
    >
      <rect width="22" height="5" fill="#FF9933" />
      <rect y="5" width="22" height="5" fill="#FFFFFF" />
      <rect y="10" width="22" height="5" fill="#138808" />
      {/* Ashoka Chakra */}
      <circle cx="11" cy="7.5" r="2" stroke="#000080" strokeWidth="0.6" fill="none" />
      <line x1="11" y1="5.6" x2="11" y2="9.4" stroke="#000080" strokeWidth="0.5" />
      <line x1="9.1" y1="7.5" x2="12.9" y2="7.5" stroke="#000080" strokeWidth="0.5" />
      <line x1="9.73" y1="6.13" x2="12.27" y2="8.87" stroke="#000080" strokeWidth="0.5" />
      <line x1="12.27" y1="6.13" x2="9.73" y2="8.87" stroke="#000080" strokeWidth="0.5" />
    </svg>
  );
}

const inputBase =
  "font-cormorant w-full h-[44px] px-3 rounded-[8px] border text-[16px] font-bold text-[#3D352F] placeholder:text-[#3D352F]/40 placeholder:font-bold focus:outline-none transition bg-transparent";

const inputNormal = `${inputBase} border-[#C37000]/50 focus:border-[#C37000]`;
const inputError = `${inputBase} border-[#D04B16] focus:border-[#D04B16]`;

const labelClass =
  "font-cormorant text-[14px] font-bold text-[#3D352F] leading-tight mb-1 block";

const errorClass = "font-cormorant text-[13px] font-bold text-[#D04B16] mt-0.5";

export default function ContactDetails({
  submitted = false,
  initialData,
  onChange,
}: ContactDetailsProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [aadhaar, setAadhaar] = useState(initialData?.aadhaar || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (field: string, value: string): string | undefined => {
    if (field === "name" && !value.trim()) return "Full name is required";
    if (field === "phone") {
      if (!value.trim()) return "Mobile number is required";
      if (!/^\d{10}$/.test(value.replace(/\s/g, "")))
        return "Enter a valid 10-digit number";
    }
    if (field === "email") {
      const trimmed = value.trim();
      if (trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return "Enter a valid email address";
      }
      return undefined;
    }
    if (field === "aadhaar") {
      if (!value.trim()) return "Aadhaar number is required";
      if (!/^\d{12}$/.test(value.replace(/\s/g, "")))
        return "Enter a valid 12-digit Aadhaar number";
    }
    if (field === "address" && !value.trim()) return "Address is required";
    return undefined;
  };

  useEffect(() => {
    if (submitted) {
      setErrors({
        name: validate("name", name),
        phone: validate("phone", phone),
        email: validate("email", email),
        aadhaar: validate("aadhaar", aadhaar),
        address: validate("address", address),
      });
    }
  }, [submitted, name, phone, email, aadhaar, address]);

  const notify = (vals: {
    name: string; phone: string; email: string; aadhaar: string; address: string;
  }) => onChange?.(vals);

  return (
    <section className="w-full px-5 sm:px-6 py-5 sm:py-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <User size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
        <h2 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight">
          Booking Contact Details
        </h2>
      </div>

      {/* Row 1: Full Name | Mobile Number | Email */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Full Name */}
        <div>
          <label className={labelClass}>
            Full Name <span className="text-[#D04B16]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => {
              const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setName(val);
              if (submitted)
                setErrors((p) => ({ ...p, name: validate("name", val) }));
              notify({ name: val, phone, email, aadhaar, address });
            }}
            className={submitted && errors.name ? inputError : inputNormal}
            style={{ backgroundColor: "transparent" }}
          />
          {submitted && errors.name && (
            <p className={errorClass}>{errors.name}</p>
          )}
        </div>

        {/* Mobile Number with Indian flag */}
        <div>
          <label className={labelClass}>
            Mobile Number <span className="text-[#D04B16]">*</span>
          </label>
          <div
            className={`flex h-[44px] overflow-hidden rounded-[8px] border bg-transparent transition ${
              submitted && errors.phone
                ? "border-[#D04B16]"
                : "border-[#C37000]/50 focus-within:border-[#C37000]"
            }`}
            style={{ backgroundColor: "transparent" }}
          >
            {/* Country prefix */}
            <div className="flex shrink-0 items-center gap-1.5 border-r border-[#C37000]/40 bg-transparent px-2.5">
              <IndiaFlag />
              <span className="font-cormorant text-[15px] font-bold text-[#3D352F] whitespace-nowrap">
                +91
              </span>
            </div>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val);
                if (submitted)
                  setErrors((p) => ({ ...p, phone: validate("phone", val) }));
                notify({ name, phone: val, email, aadhaar, address });
              }}
              className="font-cormorant min-w-0 flex-1 bg-transparent px-3 text-[16px] font-bold text-[#3D352F] placeholder:text-[#3D352F]/40 placeholder:font-bold focus:outline-none"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
          {submitted && errors.phone && (
            <p className={errorClass}>{errors.phone}</p>
          )}
        </div>

        {/* Email (Optional) */}
        <div>
          <label className={labelClass}>Email Address (Optional)</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              const val = e.target.value;
              setEmail(val);
              if (submitted)
                setErrors((p) => ({ ...p, email: validate("email", val) }));
              notify({ name, phone, email: val, aadhaar, address });
            }}
            className={submitted && errors.email ? inputError : inputNormal}
            style={{ backgroundColor: "transparent" }}
          />
          {submitted && errors.email && (
            <p className={errorClass}>{errors.email}</p>
          )}
        </div>
      </div>

      {/* Row 2: Aadhaar Number | Address */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Aadhaar Number */}
        <div>
          <label className={labelClass}>
            Aadhaar Number <span className="text-[#D04B16]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter 12 digit Aadhaar number"
            maxLength={12}
            value={aadhaar}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setAadhaar(val);
              if (submitted)
                setErrors((p) => ({ ...p, aadhaar: validate("aadhaar", val) }));
              notify({ name, phone, email, aadhaar: val, address });
            }}
            className={submitted && errors.aadhaar ? inputError : inputNormal}
            style={{ backgroundColor: "transparent" }}
          />
          {submitted && errors.aadhaar && (
            <p className={errorClass}>{errors.aadhaar}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className={labelClass}>
            Address <span className="text-[#D04B16]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter complete address"
            value={address}
            onChange={(e) => {
              const val = e.target.value;
              setAddress(val);
              if (submitted)
                setErrors((p) => ({
                  ...p,
                  address: validate("address", val),
                }));
              notify({ name, phone, email, aadhaar, address: val });
            }}
            className={submitted && errors.address ? inputError : inputNormal}
            style={{ backgroundColor: "transparent" }}
          />
          {submitted && errors.address && (
            <p className={errorClass}>{errors.address}</p>
          )}
        </div>
      </div>
    </section>
  );
}
