"use client";

import { useState, useRef, useId } from "react";
import Image from "next/image";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Pencil,
  Save,
  X,
  Camera,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { showToast } from "@/lib/toast";
import ProfileOtpModal, {
  OtpVerificationMode,
} from "./ProfileOtpModal";

export interface UserProfile {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  dateOfBirth: string; // YYYY-MM-DD
  photoUrl: string | null;
}

export const INITIAL_MOCK_PROFILE: UserProfile = {
  fullName: "Naga vishnu",
  mobile: "8838846835",
  email: "naga.vishnu@geloratech.com",
  address: "valluvar colony,madurai-625017",
  dateOfBirth: "1996-08-15",
  photoUrl: null,
};

function getInitials(name: string): string {
  if (!name || !name.trim()) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr || !dateStr.trim()) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function ProfileCard() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_MOCK_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<UserProfile>(INITIAL_MOCK_PROFILE);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Verification state tracking for Mobile & Email
  const [verifiedMobile, setVerifiedMobile] = useState<string>(
    INITIAL_MOCK_PROFILE.mobile
  );
  const [verifiedEmail, setVerifiedEmail] = useState<string>(
    INITIAL_MOCK_PROFILE.email
  );

  const isMobileVerified =
    Boolean(form.mobile.trim()) &&
    form.mobile.replace(/\D/g, "") === verifiedMobile.replace(/\D/g, "");

  const isEmailVerified =
    Boolean(form.email.trim()) &&
    form.email.trim().toLowerCase() === verifiedEmail.trim().toLowerCase();

  // OTP Modal state
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpMode, setOtpMode] = useState<OtpVerificationMode>("phone");

  // Track if any field in the profile has actually changed
  const isFormChanged =
    form.fullName.trim() !== profile.fullName.trim() ||
    form.mobile.trim() !== profile.mobile.trim() ||
    form.email.trim() !== profile.email.trim() ||
    form.address.trim() !== profile.address.trim() ||
    (form.dateOfBirth || "") !== (profile.dateOfBirth || "") ||
    form.photoUrl !== profile.photoUrl;

  const isSaveDisabled = !isFormChanged;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Unique accessible IDs for form fields
  const nameId = useId();
  const mobileId = useId();
  const emailId = useId();
  const dobId = useId();
  const addressId = useId();

  const handleEditClick = () => {
    setForm(profile);
    setVerifiedMobile(profile.mobile);
    setVerifiedEmail(profile.email);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setForm(profile);
    setVerifiedMobile(profile.mobile);
    setVerifiedEmail(profile.email);
    setErrors({});
    setIsEditing(false);
  };

  const handleVerifyMobileClick = () => {
    const err = validateField("mobile", form.mobile);
    if (err) {
      setErrors((prev) => ({ ...prev, mobile: err }));
      showToast.error(err);
      return;
    }
    setOtpMode("phone");
    setOtpModalOpen(true);
  };

  const handleVerifyEmailClick = () => {
    const err = validateField("email", form.email);
    if (err) {
      setErrors((prev) => ({ ...prev, email: err }));
      showToast.error(err);
      return;
    }
    setOtpMode("email");
    setOtpModalOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast.error("Please upload an image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast.error("Image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setForm((prev) => ({ ...prev, photoUrl: dataUrl }));
      showToast.success("Photo selected! Click 'Save Changes' to update.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setForm((prev) => ({ ...prev, photoUrl: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    showToast.info("Photo removed.");
  };

  // Field Validations according to field name
  const validateField = (name: keyof UserProfile, value: string): string => {
    const val = (value || "").trim();

    switch (name) {
      case "fullName":
        if (!val) return "Full Name is required.";
        if (val.length < 2) return "Full Name must be at least 2 characters.";
        if (!/^[a-zA-Z\s.'-]+$/.test(val)) {
          return "Full Name must contain only letters and spaces.";
        }
        return "";

      case "mobile":
        if (!val) return "Mobile Number is required.";
        const cleanMobile = val.replace(/\D/g, "");
        if (cleanMobile.length !== 10) {
          return "Mobile Number must be exactly 10 digits.";
        }
        if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
          return "Mobile Number must start with 6, 7, 8, or 9.";
        }
        return "";

      case "email":
        if (!val) return "Email Address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          return "Please enter a valid email address (e.g. name@domain.com).";
        }
        return "";

      case "address":
        // Saved Address is optional
        if (val && val.length < 5) {
          return "Saved Address must be at least 5 characters if provided.";
        }
        return "";

      case "dateOfBirth":
        if (val) {
          const selectedDate = new Date(val);
          const today = new Date();
          if (isNaN(selectedDate.getTime())) {
            return "Please enter a valid date.";
          }
          if (selectedDate > today) {
            return "Date of birth cannot be in the future.";
          }
          if (selectedDate.getFullYear() < 1900) {
            return "Please enter a valid birth year (after 1900).";
          }
        }
        return "";

      default:
        return "";
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameErr = validateField("fullName", form.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const mobileErr = validateField("mobile", form.mobile);
    if (mobileErr) newErrors.mobile = mobileErr;

    const emailErr = validateField("email", form.email);
    if (emailErr) newErrors.email = emailErr;

    const addrErr = validateField("address", form.address);
    if (addrErr) newErrors.address = addrErr;

    const dobErr = validateField("dateOfBirth", form.dateOfBirth);
    if (dobErr) newErrors.dateOfBirth = dobErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    let sanitized = value;
    if (field === "mobile") {
      sanitized = value.replace(/\D/g, "").slice(0, 10);
    }

    setForm((prev) => ({ ...prev, [field]: sanitized }));

    if (errors[field]) {
      const err = validateField(field, sanitized);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof UserProfile) => {
    const err = validateField(field, form[field] || "");
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSaveClick = () => {
    if (isSaveDisabled) return;

    if (!validateAll()) {
      showToast.error("Please resolve the validation errors before saving.");
      return;
    }

    if (!isMobileVerified) {
      showToast.error("Please verify your mobile number before saving.");
      setOtpMode("phone");
      setOtpModalOpen(true);
      return;
    }

    if (!isEmailVerified) {
      showToast.error("Please verify your email address before saving.");
      setOtpMode("email");
      setOtpModalOpen(true);
      return;
    }

    commitProfileSave(form);
    setVerifiedMobile(form.mobile.replace(/\D/g, ""));
    setVerifiedEmail(form.email.trim().toLowerCase());
    showToast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const commitProfileSave = (updated: UserProfile) => {
    setProfile(updated);
    setForm(updated);
  };

  const handleOtpSuccess = () => {
    if (otpMode === "phone") {
      setVerifiedMobile(form.mobile.replace(/\D/g, ""));
      setOtpModalOpen(false);
      showToast.success("Mobile number verified successfully!");
      return;
    }

    if (otpMode === "email") {
      setVerifiedEmail(form.email.trim().toLowerCase());
      setOtpModalOpen(false);
      showToast.success("Email address verified successfully!");
      return;
    }

    setVerifiedMobile(form.mobile.replace(/\D/g, ""));
    setVerifiedEmail(form.email.trim().toLowerCase());
    setOtpModalOpen(false);
    commitProfileSave(form);
    showToast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const getDisabledReason = (): string => {
    if (!isFormChanged) {
      return "No changes made yet. Modify your details to enable saving.";
    }
    if (!form.fullName.trim()) {
      return "Please enter your full name.";
    }
    if (errors.fullName) {
      return errors.fullName;
    }
    if (form.mobile && !isMobileVerified) {
      return "Please verify your updated mobile number with OTP.";
    }
    if (form.email && !isEmailVerified) {
      return "Please verify your updated email address with OTP.";
    }
    if (errors.email || errors.mobile || errors.dateOfBirth || errors.address) {
      return "Please resolve the validation errors above before saving.";
    }
    return "Please complete the required details to save changes.";
  };

  const currentDisplayPhoto = isEditing ? form.photoUrl : profile.photoUrl;
  const currentDisplayName = isEditing ? form.fullName : profile.fullName;
  const currentInitials = getInitials(currentDisplayName);

  // Today string for max DOB
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* Grouped Profile Card with transparent background matching other tabs */}
      <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/64 bg-transparent p-4 sm:p-6 md:p-8">
        {/* Header: Photo / Initials & Full Name & Edit Profile Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 sm:pb-6 border-b border-[#C37000]/30">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              {currentDisplayPhoto ? (
                <div className="relative h-18 w-18 sm:h-20 sm:w-20 md:h-22 md:w-22 overflow-hidden rounded-full border border-[#D9B382]">
                  <Image
                    src={currentDisplayPhoto}
                    alt={profile.fullName || "Profile"}
                    fill
                    sizes="88px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-18 w-18 sm:h-20 sm:w-20 md:h-22 md:w-22 items-center justify-center rounded-full border border-[#D9B382] bg-gradient-to-br from-[#0F5C66] to-[#083E45]">
                  {currentInitials ? (
                    <span
                      className={`${cormorantInfant.className} text-2xl sm:text-3xl font-bold tracking-widest text-[#FFF7E8]`}
                    >
                      {currentInitials}
                    </span>
                  ) : (
                    <User size={30} className="text-[#FFF7E8]" />
                  )}
                </div>
              )}

              {/* Edit Photo Icon Overlay (only when editing) */}
              {isEditing && (
                <div className="absolute -bottom-1 -right-1 flex gap-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F5C66] text-white shadow-md transition hover:bg-[#093D44]"
                    title="Upload photo"
                    aria-label="Upload photo"
                  >
                    <Camera size={13} />
                  </button>
                  {form.photoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B3261E] text-white shadow-md transition hover:bg-[#8C1D18]"
                      title="Remove photo"
                      aria-label="Remove photo"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {/* Name only */}
            <div>
              <h2
                className={`${cormorantInfant.className} text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#0F5C66] leading-tight`}
              >
                {profile.fullName?.trim() ? profile.fullName : ""}
              </h2>
            </div>
          </div>

          {/* Edit Profile Button (in view mode) */}
          {!isEditing && (
            <div>
              <button
                type="button"
                onClick={handleEditClick}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#C37000] bg-transparent px-5 py-2.5 text-[16px] font-semibold text-[#C37000] transition hover:bg-[#C37000]/10 active:scale-98 cursor-pointer ${cormorantInfant.className}`}
              >
                <Pencil size={15} />
                <span>Edit Profile</span>
              </button>
            </div>
          )}
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="pt-6 space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {/* Full Name */}
              <div className="rounded-[16px] border border-[#C37000]/30 bg-transparent p-4">
                <div className={`flex items-center gap-2 text-[14px] font-bold text-[#8A715E] uppercase tracking-wider ${cormorantInfant.className}`}>
                  <User size={15} className="text-[#0F5C66]" />
                  <span>Full Name</span>
                </div>
                <div
                  className={`${cormorantInfant.className} mt-2 text-[18px] sm:text-[20px] font-bold text-[#3D352F]`}
                >
                  {profile.fullName?.trim() ? profile.fullName : ""}
                </div>
              </div>

              {/* Mobile Number */}
              <div className="rounded-[16px] border border-[#C37000]/30 bg-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 text-[14px] font-bold text-[#8A715E] uppercase tracking-wider ${cormorantInfant.className}`}>
                    <Phone size={15} className="text-[#0F5C66]" />
                    <span>Mobile Number</span>
                  </div>
                  {profile.mobile?.trim() && (
                    <span className={`inline-flex items-center gap-1 text-[13px] font-bold text-[#137333] bg-[#E6F4EA] px-2.5 py-0.5 rounded-md border border-[#CEEAD6] ${cormorantInfant.className}`}>
                      <CheckCircle2 size={13} className="text-[#137333]" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <div
                  className={`${cormorantInfant.className} mt-2 text-[18px] sm:text-[20px] font-bold text-[#3D352F] tracking-wide`}
                >
                  {profile.mobile?.trim()
                    ? `+91 ${profile.mobile.slice(0, 5)} ${profile.mobile.slice(5)}`
                    : ""}
                </div>
              </div>

              {/* Email Address */}
              <div className="rounded-[16px] border border-[#C37000]/30 bg-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 text-[14px] font-bold text-[#8A715E] uppercase tracking-wider ${cormorantInfant.className}`}>
                    <Mail size={15} className="text-[#0F5C66]" />
                    <span>Email Address</span>
                  </div>
                  {profile.email?.trim() && (
                    <span className={`inline-flex items-center gap-1 text-[13px] font-bold text-[#137333] bg-[#E6F4EA] px-2.5 py-0.5 rounded-md border border-[#CEEAD6] ${cormorantInfant.className}`}>
                      <CheckCircle2 size={13} className="text-[#137333]" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <div
                  className={`${cormorantInfant.className} mt-2 text-[17px] sm:text-[19px] font-bold text-[#3D352F] break-all`}
                >
                  {profile.email?.trim() ? profile.email : ""}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="rounded-[16px] border border-[#C37000]/30 bg-transparent p-4">
                <div className={`flex items-center gap-2 text-[14px] font-bold text-[#8A715E] uppercase tracking-wider ${cormorantInfant.className}`}>
                  <Calendar size={15} className="text-[#0F5C66]" />
                  <span>Date of Birth</span>
                </div>
                <div
                  className={`${cormorantInfant.className} mt-2 text-[18px] sm:text-[20px] font-bold text-[#3D352F]`}
                >
                  {profile.dateOfBirth?.trim()
                    ? formatDateDisplay(profile.dateOfBirth)
                    : ""}
                </div>
              </div>
            </div>

            {/* Saved Delivery Address */}
            <div className="rounded-[16px] border border-[#C37000]/30 bg-transparent p-4 sm:p-5">
              <div className={`flex items-center gap-2 text-[14px] font-bold text-[#8A715E] uppercase tracking-wider ${cormorantInfant.className}`}>
                <MapPin size={15} className="text-[#0F5C66]" />
                <span>Saved Delivery Address</span>
              </div>
              <p
                className={`${cormorantInfant.className} mt-2 text-[18px] sm:text-[19px] leading-relaxed font-bold text-[#3D352F]`}
              >
                {profile.address?.trim() ? profile.address : ""}
              </p>
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <div className="pt-6 space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor={nameId}
                  className={`${cormorantInfant.className} block text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#634E3E]`}
                >
                  Full Name <span className="text-[#B3261E]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A715E]">
                    <User size={16} />
                  </div>
                  <input
                    id={nameId}
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    onBlur={() => handleBlur("fullName")}
                    placeholder="Enter full name"
                    className={`${cormorantInfant.className} w-full rounded-xl border bg-transparent py-2.5 pr-4 pl-10 text-[16px] sm:text-[17px] font-semibold text-[#3D352F] outline-none transition focus:ring-1 ${errors.fullName
                      ? "border-[#B3261E] focus:ring-[#B3261E]"
                      : "border-[#C37000]/50 focus:border-[#C37000] focus:ring-[#C37000]/30"
                      }`}
                  />
                </div>
                {errors.fullName && (
                  <p className={`${cormorantInfant.className} mt-1 flex items-center gap-1 text-[13px] font-semibold text-[#B3261E]`}>
                    <AlertCircle size={13} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile Number Field */}
              <div>
                <label
                  htmlFor={mobileId}
                  className={`${cormorantInfant.className} block text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#634E3E]`}
                >
                  Mobile Number <span className="text-[#B3261E]">*</span>
                </label>
                <div className="relative mt-1.5 flex items-center">
                  <div className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[14px] font-bold text-[#634E3E] ${cormorantInfant.className}`}>
                    <span>+91</span>
                  </div>
                  <input
                    id={mobileId}
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    onBlur={() => handleBlur("mobile")}
                    placeholder="10-digit mobile number"
                    className={`${cormorantInfant.className} w-full rounded-xl border bg-transparent py-2.5 pr-24 sm:pr-28 pl-11 sm:pl-12 text-[16px] sm:text-[17px] font-semibold text-[#3D352F] outline-none transition focus:ring-1 ${errors.mobile
                      ? "border-[#B3261E] focus:ring-[#B3261E]"
                      : "border-[#C37000]/50 focus:border-[#C37000] focus:ring-[#C37000]/30"
                      }`}
                  />
                  <div className="absolute right-2 inset-y-0 flex items-center">
                    {isMobileVerified ? (
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg bg-[#E6F4EA] px-2.5 py-1 text-[12px] font-bold text-[#137333] border border-[#CEEAD6] select-none ${cormorantInfant.className}`}
                        title="Mobile number verified"
                      >
                        <CheckCircle2 size={13} className="text-[#137333]" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleVerifyMobileClick}
                        className={`inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#0F5C66] to-[#0A474E] px-3 py-1 text-[13px] font-bold text-white shadow-xs transition hover:opacity-90 active:scale-95 cursor-pointer ${cormorantInfant.className}`}
                        title="Verify mobile number with OTP"
                      >
                        <span>Verify</span>
                      </button>
                    )}
                  </div>
                </div>
                {errors.mobile && (
                  <p className={`${cormorantInfant.className} mt-1 flex items-center gap-1 text-[13px] font-semibold text-[#B3261E]`}>
                    <AlertCircle size={13} />
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Email Address Field */}
              <div>
                <label
                  htmlFor={emailId}
                  className={`${cormorantInfant.className} block text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#634E3E]`}
                >
                  Email Address <span className="text-[#B3261E]">*</span>
                </label>
                <div className="relative mt-1.5 flex items-center">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A715E]">
                    <Mail size={16} />
                  </div>
                  <input
                    id={emailId}
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="Enter email address"
                    className={`${cormorantInfant.className} w-full rounded-xl border bg-transparent py-2.5 pr-24 sm:pr-28 pl-10 text-[16px] sm:text-[17px] font-semibold text-[#3D352F] outline-none transition focus:ring-1 ${errors.email
                      ? "border-[#B3261E] focus:ring-[#B3261E]"
                      : "border-[#C37000]/50 focus:border-[#C37000] focus:ring-[#C37000]/30"
                      }`}
                  />
                  <div className="absolute right-2 inset-y-0 flex items-center">
                    {isEmailVerified ? (
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg bg-[#E6F4EA] px-2.5 py-1 text-[12px] font-bold text-[#137333] border border-[#CEEAD6] select-none ${cormorantInfant.className}`}
                        title="Email address verified"
                      >
                        <CheckCircle2 size={13} className="text-[#137333]" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleVerifyEmailClick}
                        className={`inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#0F5C66] to-[#0A474E] px-3 py-1 text-[13px] font-bold text-white shadow-xs transition hover:opacity-90 active:scale-95 cursor-pointer ${cormorantInfant.className}`}
                        title="Verify email address with OTP"
                      >
                        <span>Verify</span>
                      </button>
                    )}
                  </div>
                </div>
                {errors.email && (
                  <p className={`${cormorantInfant.className} mt-1 flex items-center gap-1 text-[13px] font-semibold text-[#B3261E]`}>
                    <AlertCircle size={13} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div>
                <label
                  htmlFor={dobId}
                  className={`${cormorantInfant.className} block text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#634E3E]`}
                >
                  Date of Birth
                </label>
                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8A715E]">
                    <Calendar size={16} />
                  </div>
                  <input
                    id={dobId}
                    type="date"
                    max={todayStr}
                    value={form.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    onBlur={() => handleBlur("dateOfBirth")}
                    className={`${cormorantInfant.className} w-full rounded-xl border bg-transparent py-2.5 pr-4 pl-10 text-[16px] sm:text-[17px] font-semibold text-[#3D352F] outline-none transition focus:ring-1 ${errors.dateOfBirth
                      ? "border-[#B3261E] focus:ring-[#B3261E]"
                      : "border-[#C37000]/50 focus:border-[#C37000] focus:ring-[#C37000]/30"
                      }`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className={`${cormorantInfant.className} mt-1 flex items-center gap-1 text-[13px] font-semibold text-[#B3261E]`}>
                    <AlertCircle size={13} />
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>

            {/* Saved Address Field */}
            <div>
              <label
                htmlFor={addressId}
                className={`${cormorantInfant.className} block text-[15px] sm:text-[16px] font-bold uppercase tracking-wider text-[#634E3E]`}
              >
                Saved Delivery Address
              </label>
              <div className="relative mt-1.5">
                <textarea
                  id={addressId}
                  rows={3}
                  value={form.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  onBlur={() => handleBlur("address")}
                  placeholder="Enter house/flat no., street, city, state, and pincode"
                  className={`${cormorantInfant.className} w-full rounded-xl border bg-transparent p-3 text-[16px] sm:text-[17px] leading-relaxed font-semibold text-[#3D352F] outline-none transition focus:ring-1 ${errors.address
                    ? "border-[#B3261E] focus:ring-[#B3261E]"
                    : "border-[#C37000]/50 focus:border-[#C37000] focus:ring-[#C37000]/30"
                    }`}
                />
              </div>
              {errors.address && (
                <p className={`${cormorantInfant.className} mt-1 flex items-center gap-1 text-[13px] font-semibold text-[#B3261E]`}>
                  <AlertCircle size={13} />
                  {errors.address}
                </p>
              )}
            </div>

            {/* Edit Action Buttons: Save Changes & Cancel */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 border-t border-[#C37000]/30">
              <button
                type="button"
                onClick={handleCancelClick}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#C37000]/60 bg-transparent px-5 py-2.5 text-[16px] font-semibold text-[#66503E] transition hover:bg-[#C37000]/10 active:scale-98 cursor-pointer ${cormorantInfant.className}`}
              >
                <X size={16} />
                <span>Cancel</span>
              </button>

              <div
                className="relative group/save w-full sm:w-auto"
                title={isSaveDisabled ? getDisabledReason() : undefined}
              >
                <button
                  type="button"
                  onClick={handleSaveClick}
                  disabled={isSaveDisabled}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl px-6 py-2.5 text-[16px] font-semibold transition ${cormorantInfant.className} ${
                    isSaveDisabled
                      ? "cursor-not-allowed bg-[#BDB3A6]/35 text-[#7A6A5C]/60 shadow-none border border-[#C37000]/25"
                      : "bg-gradient-to-r from-[#0F5C66] to-[#0A474E] text-white shadow-sm hover:opacity-95 active:scale-98 cursor-pointer"
                  }`}
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>

                {/* Meaningful Tooltip when Disabled on hover */}
                {isSaveDisabled && (
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mb-2 hidden group-hover/save:flex items-center gap-1.5 rounded-lg bg-[#2D241E] px-3.5 py-1.5 text-xs text-[#FFF7ED] shadow-xl whitespace-nowrap z-30 transition-all border border-[#C37000]/30"
                  >
                    <AlertCircle size={13} className="text-[#E0A96D] shrink-0" />
                    <span className={`${cormorantInfant.className} text-[14px] font-medium`}>
                      {getDisabledReason()}
                    </span>
                    <div className="absolute top-full right-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#2D241E]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* OTP Verification Modal */}
      <ProfileOtpModal
        isOpen={otpModalOpen}
        mode={otpMode}
        newPhone={form.mobile}
        newEmail={form.email}
        onSuccess={handleOtpSuccess}
        onClose={() => setOtpModalOpen(false)}
      />
    </>
  );
}
