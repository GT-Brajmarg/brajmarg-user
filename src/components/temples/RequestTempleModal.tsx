"use client";

import {
  X,
  UploadCloud,
  User,
  Search,
  ShieldCheck,
  Heart,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getTempleRequestAccessOptions,
  submitTempleRequest,
  resetTempleRequest,
} from "@/store/slices/requestTempleSlice";
import { showToast, handleApiError } from "@/lib/toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  temple_name?: string;
  city?: string;
  state?: string;
  address?: string;
  requester_name?: string;
  requester_email?: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const DEFAULT_ACCESS_OPTIONS = [
  "Prasad",
  "Seva Booking",
  "Darshan Updates",
  "Puja / Havan",
  "Temple Yatra",
  "Frames & Photos",
  "Poshak / Temple items",
];

const NEXT_STEPS = [
  {
    icon: Search,
    title: "Our team reviews your request",
  },
  {
    icon: ShieldCheck,
    title: "Temple authenticity is verified",
  },
  {
    icon: Heart,
    title: "Approved temples are added to Brajmarg",
  },
  {
    icon: Mail,
    title: "You'll receive an update via email",
  },
];

export default function RequestTempleModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const dispatch = useAppDispatch();
  const { accessOptions, submitting, success } = useAppSelector(
    (state) => state.requestTemple,
  );

  const initialForm = {
    temple_name: "",
    city: "",
    state: "",
    address: "",
    requester_name: "",
    requester_email: "",
    requested_access: [] as string[],
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.style.touchAction = "";
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      dispatch(getTempleRequestAccessOptions());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (success) {
      setForm(initialForm);
      setFileName("");
      setSubmitted(false);
      setErrors({});
      dispatch(resetTempleRequest());
      onClose();
    }
  }, [success, dispatch, onClose]);

  const validateField = (
    field: keyof FormErrors,
    value: string,
  ): string | undefined => {
    if (field === "temple_name" && !value.trim()) {
      return "Temple name is required";
    }
    if (field === "city" && !value.trim()) {
      return "City / Town is required";
    }
    if (field === "state" && (!value || value === "Select State")) {
      return "Please select a state";
    }
    if (field === "address" && !value.trim()) {
      return "Full temple address is required";
    }
    if (field === "requester_name" && !value.trim()) {
      return "Full name is required";
    }
    if (field === "requester_email") {
      if (!value.trim()) return "Email address is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return "Enter a valid email address";
      }
    }
    return undefined;
  };

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (submitted) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field as keyof FormErrors, value),
      }));
    }
  };

  const toggleAccess = (option: string) => {
    setForm((prev) => ({
      ...prev,
      requested_access: prev.requested_access.includes(option)
        ? prev.requested_access.filter((item) => item !== option)
        : [...prev.requested_access, option],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast.error("File size must be under 5MB");
        return;
      }
      setFileName(file.name);
      showToast.success("Image attached: " + file.name);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    const validationErrors: FormErrors = {
      temple_name: validateField("temple_name", form.temple_name),
      city: validateField("city", form.city),
      state: validateField("state", form.state),
      address: validateField("address", form.address),
      requester_name: validateField("requester_name", form.requester_name),
      requester_email: validateField("requester_email", form.requester_email),
    };

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) {
      showToast.error("Please fill all required fields correctly");
      return;
    }

    try {
      const res = await dispatch(submitTempleRequest(form)).unwrap();
      const message =
        typeof res === "object" && res !== null && "message" in res
          ? String((res as Record<string, unknown>).message)
          : "Temple request submitted successfully.";
      showToast.success(message);
      setForm(initialForm);
      setFileName("");
      setSubmitted(false);
      setErrors({});
      onClose();
    } catch (err) {
      handleApiError(err, "Failed to submit temple request.");
    }
  };

  if (!open || !mounted) return null;

  const displayOptions =
    accessOptions && accessOptions.length > 0
      ? accessOptions.map((opt) => opt.name)
      : DEFAULT_ACCESS_OPTIONS;

  // Exact styles and colors from the target design image
  const inputBase =
    "font-cormorant w-full h-[44px] sm:h-[46px] px-3.5 rounded-[10px] border text-[16px] sm:text-[17px] font-semibold text-[#3D352F] placeholder:text-[#7A6E5E]/60 placeholder:font-normal focus:outline-none transition bg-[#EFE3CF]/50 focus:bg-[#EFE3CF]/80";

  const inputNormal = `${inputBase} border-[rgba(195,112,0,0.45)] focus:border-[#C37000]`;
  const inputError = `${inputBase} border-[#D04B16] focus:border-[#D04B16]`;

  const labelClass =
    "font-cormorant text-[15px] sm:text-[16px] font-bold text-[#3D352F] mb-1 block leading-tight";

  const errorClass = "font-cormorant text-[13px] font-bold text-[#D04B16] mt-1";

  return createPortal(
    <div className="request-modal-scroll fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4 md:p-6 backdrop-blur-md">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card (Exact parchment background, border, and proportions) */}
      <div
        className="relative z-10 my-auto w-full max-w-[980px] overflow-hidden rounded-[20px] border border-[#DEBE94]/80 shadow-[0_30px_90px_rgba(0,0,0,0.4)]"
        style={{
          backgroundColor: "#F4EBDC",
          overscrollBehavior: "contain",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper texture overlay for authentic parchment look */}
        <Image
          src="/images/paper-texture.png"
          alt=""
          fill
          priority
          aria-hidden
          className="pointer-events-none object-cover opacity-45 mix-blend-multiply"
        />

        {/* Circular close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close request temple modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-[#4A3E31]/30 bg-white/20 text-[#4A3E31] transition hover:bg-white/40 hover:rotate-90 hover:scale-105"
        >
          <X size={16} strokeWidth={2.4} />
        </button>

        {/* Scrollable Container with thin custom scrollbar matching modal bg */}
        <div className="request-modal-scroll relative z-10 max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-7">
          {/* ═════════ Header ═════════ */}
          <div className="relative mb-5 pr-10 sm:pr-0">
            {/* Temple sketch illustration on top-right */}
            <div className="pointer-events-none absolute -top-5 right-4 hidden h-[155px] w-[340px] sm:block opacity-90">
              <Image
                src="/images/temple-banner-1.png"
                alt=""
                fill
                priority
                className="object-contain object-right-top"
              />
            </div>

            {/* Title */}
            <h1 className="font-cormorant text-[32px] sm:text-[40px] font-bold leading-tight text-[#0E5C66]">
              Request a Temple
            </h1>

            {/* Lotus Divider */}
            <div className="my-2 flex items-center gap-2">
              <div className="flex items-center">
                <span className="h-[1.5px] w-10 sm:w-16 bg-[#8B5A1D]" />
                <span className="h-[6px] w-[6px] rounded-full bg-[#8B5A1D]" />
              </div>
              <Image
                src="/images/lotus_bright.png"
                alt=""
                width={40}
                height={30}
                className="h-6 w-10 object-contain"
              />
              <div className="flex items-center">
                <span className="h-[6px] w-[6px] rounded-full bg-[#8B5A1D]" />
                <span className="h-[1.5px] w-10 sm:w-16 bg-[#8B5A1D]" />
              </div>
            </div>

            {/* Subtitle */}
            <p className="font-cormorant max-w-[380px] text-[14px] sm:text-[16px] font-medium leading-snug text-[#4A3E31]">
              Can&apos;t find your temple in the list?
              <br />
              Share the details and we&apos;ll review it for addition to Brajmarg
            </p>
          </div>

          {/* ═════════ Main Form Card (Rectangle 78) ═════════ */}
          <div
            className="rounded-[20px] border border-[rgba(195,112,0,0.45)] p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-xs"
            style={{ backgroundColor: "rgba(239, 222, 199, 0.45)" }}
          >
            {/* ── 1. Temple Details ── */}
            <div>
              <div className="mb-3.5 flex items-center gap-2">
                <Image
                  src="/images/temple-icon.png"
                  alt=""
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <h2 className="font-cormorant text-[22px] sm:text-[24px] font-bold text-[#0E5C66]">
                  Temple Details
                </h2>
              </div>

              {/* Row 1: Temple Name | City / Town | State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {/* Temple Name */}
                <div>
                  <label className={labelClass}>
                    Temple Name <span className="text-[#D04B16]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.temple_name}
                    onChange={(e) =>
                      handleInputChange("temple_name", e.target.value)
                    }
                    placeholder="Enter Temple Name"
                    className={
                      submitted && errors.temple_name ? inputError : inputNormal
                    }
                  />
                  {submitted && errors.temple_name && (
                    <p className={errorClass}>{errors.temple_name}</p>
                  )}
                </div>

                {/* City / Town */}
                <div>
                  <label className={labelClass}>
                    City / Town <span className="text-[#D04B16]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter City"
                    className={
                      submitted && errors.city ? inputError : inputNormal
                    }
                  />
                  {submitted && errors.city && (
                    <p className={errorClass}>{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className={labelClass}>
                    State <span className="text-[#D04B16]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className={`${submitted && errors.state ? inputError : inputNormal
                        } appearance-none pr-10 cursor-pointer`}
                      style={{
                        color: form.state ? "#0E5C66" : "rgba(122,110,94,0.7)",
                      }}
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {INDIAN_STATES.map((state) => (
                        <option
                          key={state}
                          value={state}
                          className="font-sans font-medium text-[14px] text-[#0E5C66] bg-[#EFDEC7]"
                        >
                          {state}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[#0E5C66]"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {submitted && errors.state && (
                    <p className={errorClass}>{errors.state}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Full Temple Address */}
              <div className="mt-3.5">
                <label className={labelClass}>
                  Full Temple Address <span className="text-[#D04B16]">*</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={form.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Enter complete address of the temple"
                    className={`${submitted && errors.address ? inputError : inputNormal
                      } min-h-[80px] py-2.5 pb-6 resize-none`}
                  />
                  <span className="font-cormorant pointer-events-none absolute right-3 bottom-2 text-[12px] text-[#7A6E5E]">
                    {form.address.length}/300
                  </span>
                </div>
                {submitted && errors.address && (
                  <p className={errorClass}>{errors.address}</p>
                )}
              </div>
            </div>

            {/* ── 2. Access Options & Upload Section ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-5 sm:gap-6 pt-1">
              {/* Left Column: What would you like to access from this temple? */}
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <User
                    size={20}
                    strokeWidth={2.2}
                    className="text-[#C37000] shrink-0"
                  />
                  <h3 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0E5C66] leading-tight">
                    What would you like to access from this temple?
                  </h3>
                </div>
                <p className="font-cormorant text-[13px] text-[#5A4D3E] mb-2.5">
                  (Select all that apply)
                </p>

                {/* Checkbox Pills */}
                <div className="flex flex-wrap gap-2">
                  {displayOptions.map((option) => {
                    const checked = form.requested_access.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleAccess(option)}
                        className={`font-cormorant flex items-center gap-2 rounded-[10px] border px-3 py-1.5 text-[15px] sm:text-[16px] font-semibold transition cursor-pointer ${checked
                            ? "border-[#C37000] bg-[#F5E6CC] text-[#2A2015] shadow-2xs"
                            : "border-[rgba(195,112,0,0.45)] bg-[rgba(239,222,199,0.3)] text-[#2A2015] hover:bg-white/40"
                          }`}
                      >
                        <span
                          className={`flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-2 border-[#C37000] ${checked ? "bg-[#C37000] text-white" : "bg-transparent"
                            }`}
                        >
                          {checked && (
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 4L4 7L10 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Upload Image & Tip */}
              <div className="space-y-3">
                <label className={labelClass}>
                  Upload Temple Image (Optional)
                </label>

                {/* Upload Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-[72px] items-center justify-center gap-3 rounded-[10px] border border-[rgba(195,112,0,0.45)] bg-[rgba(239,222,199,0.35)] px-4 text-center cursor-pointer transition hover:bg-[rgba(239,222,199,0.55)] hover:border-[#C37000]"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <UploadCloud
                    size={24}
                    strokeWidth={2}
                    className="text-[#0E5C66] shrink-0"
                  />
                  <div className="text-left sm:text-center">
                    <p className="font-cormorant text-[15px] sm:text-[16px] font-bold text-[#0E5C66] leading-tight">
                      {fileName || "Click to upload or drag and drop"}
                    </p>
                    <p className="font-cormorant text-[11px] text-[#7A6E5E]">
                      PNG, JPG upto 5MB
                    </p>
                  </div>
                </div>

                {/* Tip Box */}
                <div
                  className="flex items-center gap-2.5 rounded-[10px] border border-[rgba(195,112,0,0.45)] p-2.5 sm:p-3"
                  style={{ backgroundColor: "rgba(195, 112, 0, 0.12)" }}
                >
                  <Image
                    src="/images/temple-icon-1.png"
                    alt=""
                    width={34}
                    height={34}
                    className="shrink-0 object-contain"
                  />
                  <div>
                    <h4 className="font-cormorant text-[16px] font-bold text-[#0E5C66] leading-tight">
                      Tip
                    </h4>
                    <p className="font-cormorant text-[12px] sm:text-[13px] font-medium leading-snug text-[#5A4D3E]">
                      Clear images of the temple, deity or entrance help us review faster.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 3. Your Details ── */}
            <div className="pt-1">
              <div className="flex items-center gap-2 mb-0.5">
                <User
                  size={20}
                  strokeWidth={2.2}
                  className="text-[#C37000] shrink-0"
                />
                <h3 className="font-cormorant text-[22px] sm:text-[24px] font-bold text-[#0E5C66]">
                  Your Details
                </h3>
              </div>
              <p className="font-cormorant text-[13px] text-[#5A4D3E] mb-2.5">
                We&apos;ll only use these details to update you regarding this temple request.
              </p>

              {/* Row: Full Name | Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-[#D04B16]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.requester_name}
                    onChange={(e) =>
                      handleInputChange("requester_name", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={
                      submitted && errors.requester_name
                        ? inputError
                        : inputNormal
                    }
                  />
                  {submitted && errors.requester_name && (
                    <p className={errorClass}>{errors.requester_name}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Email Address <span className="text-[#D04B16]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.requester_email}
                    onChange={(e) =>
                      handleInputChange("requester_email", e.target.value)
                    }
                    placeholder="Enter your email address"
                    className={
                      submitted && errors.requester_email
                        ? inputError
                        : inputNormal
                    }
                  />
                  {submitted && errors.requester_email && (
                    <p className={errorClass}>{errors.requester_email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ═════════ What Happens Next? Banner ═════════ */}
          <div
            className="mt-4 rounded-[18px] border-2 border-[#C37000] p-3.5 sm:p-4.5"
            style={{ backgroundColor: "rgba(195, 112, 0, 0.18)" }}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Left: Temple Icon & Heading */}
              <div className="flex items-center gap-2.5 shrink-0 md:border-r md:border-[#C37000]/40 md:pr-4">
                <Image
                  src="/images/temple-icon-1.png"
                  alt=""
                  width={36}
                  height={36}
                  className="shrink-0 object-contain"
                />
                <h3 className="font-cormorant text-[18px] sm:text-[20px] font-bold text-[#0E5C66] whitespace-nowrap">
                  What Happens Next?
                </h3>
              </div>

              {/* Right: 4 Steps */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 flex-1">
                {NEXT_STEPS.map(({ icon: Icon, title }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center text-center px-1"
                  >
                    <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full text-[#C37000]">
                      <Icon size={22} strokeWidth={2.2} />
                    </div>
                    <p className="font-cormorant text-[13px] font-semibold leading-tight text-[#3D352F]">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═════════ Footer Buttons ═════════ */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3.5 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="font-cormorant flex h-[44px] w-full sm:w-[220px] items-center justify-center rounded-[10px] border border-[#0E5C66] bg-transparent text-[18px] font-bold text-[#0E5C66] transition hover:bg-[#0E5C66]/10"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="font-cormorant flex h-[44px] w-full sm:w-[240px] items-center justify-center gap-2 rounded-[10px] bg-[#0E5C66] text-[18px] font-bold text-white shadow-sm transition hover:bg-[#0B4A52] disabled:opacity-50"
            >
              <span>{submitting ? "Submitting..." : "Submit Request"}</span>
              <ArrowRight size={17} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
