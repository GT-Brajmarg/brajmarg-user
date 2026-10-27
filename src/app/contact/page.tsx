"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";
import { cormorant, cormorantInfant } from "@/lib/fonts";
import { showToast } from "@/lib/toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  service: string;
  projectDetails: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  phoneNumber?: string;
  service?: string;
  projectDetails?: string;
  agreedToTerms?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    service: "",
    projectDetails: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      const cleanPhone = formData.phoneNumber.replace(/[\s-]/g, "");
      // India 10-digit phone number check
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phoneNumber = "Enter a valid 10-digit Indian phone number";
      }
    }

    if (!formData.service) {
      newErrors.service = "Please select a service or enquiry topic";
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = "Please describe your enquiry or requirement";
    } else if (formData.projectDetails.trim().length < 10) {
      newErrors.projectDetails = "Please provide at least 10 characters";
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast.success("Message sent successfully! Our devotee care team will connect with you soon.");
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+91",
      phoneNumber: "",
      service: "",
      projectDetails: "",
      agreedToTerms: false,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF4EA] text-[#2D241E]">
      {/* Subtle paper texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-25 mix-blend-multiply"
      >
        <Image
          src="/images/paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION 
      ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#082A2F] via-[#0A363D] to-[#0D444C] pt-12 sm:pt-16 md:pt-20 pb-28 sm:pb-32 lg:pb-36 text-white">
        {/* Subtle decorative glow & pattern */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C37000]/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#0F5C66]/40 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          {/* Main Headline */}
          <h1
            className={`${cormorant.className} text-[36px] sm:text-[46px] md:text-[56px] lg:text-[62px] font-bold leading-[1.12] tracking-tight`}
          >
            We&apos;re here to assist your{" "}
            <span className="bg-gradient-to-r from-[#D8A35D] via-[#F6C884] to-[#E59A32] bg-clip-text text-transparent font-extrabold">
              sacred journey.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`${cormorantInfant.className} mx-auto mt-4 max-w-2xl text-[17px] sm:text-[19px] md:text-[21px] font-medium text-[#E4D7C8] leading-relaxed`}
          >
            Have questions about temple darshan, seva booking, pilgrimage yatras, or holy prasad?
            Our devotee care team is dedicated to guiding you.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FLOATING CONTACT CARDS 
      ══════════════════════════════════════════════════════════ */}
      <section className="relative z-20 mx-auto max-w-[1140px] px-4 sm:px-6 -mt-16 sm:-mt-20 lg:-mt-22">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* CARD 1: CALL US */}
          <a
            href="tel:+918838846835"
            className="group flex items-center gap-4 rounded-[22px] border border-[#C37000]/25 bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(15,92,102,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,92,102,0.14)] hover:border-[#C37000]"
          >
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#0F5C66]/10 text-[#0F5C66] group-hover:bg-[#0F5C66] group-hover:text-white transition-all duration-300">
              <Phone size={22} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <span className="block text-[12px] font-bold tracking-wider text-[#8A715E] uppercase">
                CALL US
              </span>
              <span
                className={`${cormorantInfant.className} block text-[19px] sm:text-[21px] font-bold text-[#2D241E] group-hover:text-[#0F5C66] transition`}
              >
                +91 - 8838846835
              </span>
            </div>
          </a>

          {/* CARD 2: EMAIL US */}
          <a
            href="mailto:support@brajmarg.com"
            className="group flex items-center gap-4 rounded-[22px] border border-[#C37000]/25 bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(15,92,102,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,92,102,0.14)] hover:border-[#C37000]"
          >
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#0F5C66]/10 text-[#0F5C66] group-hover:bg-[#0F5C66] group-hover:text-white transition-all duration-300">
              <Mail size={22} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <span className="block text-[12px] font-bold tracking-wider text-[#8A715E] uppercase">
                EMAIL US
              </span>
              <span
                className={`${cormorantInfant.className} block text-[19px] sm:text-[21px] font-bold text-[#2D241E] group-hover:text-[#0F5C66] underline decoration-[#0F5C66]/30 group-hover:decoration-[#0F5C66] transition truncate`}
              >
                support@brajmarg.com
              </span>
            </div>
          </a>

          {/* CARD 3: BASED */}
          <div className="group flex items-center gap-4 rounded-[22px] border border-[#C37000]/25 bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(15,92,102,0.08)] sm:col-span-2 lg:col-span-1">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#0F5C66]/10 text-[#0F5C66]">
              <MapPin size={22} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <span className="block text-[12px] font-bold tracking-wider text-[#8A715E] uppercase">
                BASED
              </span>
              <span
                className={`${cormorantInfant.className} block text-[18px] sm:text-[20px] font-bold text-[#2D241E] leading-snug`}
              >
                Vrindavan, Mathura (UP)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT / FORM SECTION 
      ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto max-w-[1140px] px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ── LEFT COLUMN: Text info & context ── */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 lg:sticky lg:top-28">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C37000]/30 bg-[#FFF5E6] px-4 py-1.5 shadow-xs">
              <Sparkles size={14} className="text-[#C37000]" />
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#C37000]">
                DEVOTEE CARE &amp; GUIDANCE
              </span>
            </div>

            {/* Title */}
            <h2
              className={`${cormorant.className} text-[38px] sm:text-[46px] md:text-[52px] font-bold text-[#0F5C66] leading-[1.08]`}
            >
              How Can We Assist You?
            </h2>

            {/* Body Description */}
            <p
              className={`${cormorantInfant.className} text-[18px] sm:text-[20px] text-[#634E3E] font-medium leading-relaxed max-w-md`}
            >
              Share your thoughts, prayer requests, or pilgrimage plans with us.
              Whether you need guidance on sacred temple sevas, organizing a Braj yatra,
              or holy prasad delivery, our team is here to support every step of your devotional journey.
            </p>

            {/* Quick reassurance points */}
            <div className="pt-4 space-y-2.5">
              <div className="flex items-center gap-2.5 text-[#3D352F]">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F5C66]/10 text-[#0F5C66]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className={`${cormorantInfant.className} text-[16px] font-bold`}>
                  100% confidential and secure enquiry
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[#3D352F]">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F5C66]/10 text-[#0F5C66]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className={`${cormorantInfant.className} text-[16px] font-bold`}>
                  Dedicated devotee &amp; customer care team
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[#3D352F]">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F5C66]/10 text-[#0F5C66]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className={`${cormorantInfant.className} text-[16px] font-bold`}>
                  Prompt assistance for all pilgrims &amp; devotees
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Interactive Form  */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="rounded-[24px] border border-[#C37000]/30 bg-white p-8 sm:p-12 text-center shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F5C66]/10 text-[#0F5C66] mb-5">
                  <CheckCircle2 size={36} strokeWidth={2.2} />
                </div>
                <h3
                  className={`${cormorant.className} text-[28px] sm:text-[34px] font-bold text-[#0F5C66]`}
                >
                  Message Received!
                </h3>
                <p
                  className={`${cormorantInfant.className} mx-auto mt-2 max-w-md text-[17px] sm:text-[19px] text-[#634E3E] font-medium leading-relaxed`}
                >
                  Thank you for reaching out. Our team has received your inquiry
                  and will contact you via phone or email shortly.
                </p>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`inline-flex items-center gap-2 rounded-xl bg-[#0F5C66] px-6 py-2.5 text-[16px] font-bold text-white shadow-sm transition hover:bg-[#0A474E] cursor-pointer ${cormorantInfant.className}`}
                  >
                    <span>Send Another Message</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 sm:space-y-5"
              >
                {/* ── ROW 1: First Name & Last Name ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name * */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`w-full rounded-xl border ${errors.firstName
                          ? "border-[#DC2626] bg-[#FEF2F2] focus:ring-1 focus:ring-[#DC2626]"
                          : "border-[#D6C7B7] bg-[#EBE4D8]/60 focus:border-[#0F5C66] focus:bg-white focus:ring-2 focus:ring-[#0F5C66]/20"
                          } py-3.5 px-4 text-[15px] sm:text-[16px] text-[#2D241E] outline-none transition`}
                      />
                      {!formData.firstName && (
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] sm:text-[16px] text-[#8E7969] select-none">
                          First Name <span className="text-[#DC2626] font-bold">*</span>
                        </span>
                      )}
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-[13px] font-medium text-[#DC2626] pl-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="Last Name"
                      className="w-full rounded-xl border border-[#D6C7B7] bg-[#EBE4D8]/60 py-3.5 px-4 text-[15px] sm:text-[16px] text-[#2D241E] placeholder:text-[#8E7969] outline-none transition focus:border-[#0F5C66] focus:bg-white focus:ring-2 focus:ring-[#0F5C66]/20"
                    />
                  </div>
                </div>

                {/* ── ROW 2: Email Address * ── */}
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full rounded-xl border ${errors.email
                        ? "border-[#DC2626] bg-[#FEF2F2] focus:ring-1 focus:ring-[#DC2626]"
                        : "border-[#D6C7B7] bg-[#EBE4D8]/60 focus:border-[#0F5C66] focus:bg-white focus:ring-2 focus:ring-[#0F5C66]/20"
                        } py-3.5 px-4 text-[15px] sm:text-[16px] text-[#2D241E] outline-none transition`}
                    />
                    {!formData.email && (
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] sm:text-[16px] text-[#8E7969] select-none">
                        Email Address <span className="text-[#DC2626] font-bold">*</span>
                      </span>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-[13px] font-medium text-[#DC2626] pl-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* ── ROW 3: Phone Number * (India Code) & Select Service * ── */}
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                  {/* Phone with Country Code India */}
                  <div>
                    <div
                      className={`flex rounded-xl border ${errors.phoneNumber
                        ? "border-[#DC2626] bg-[#FEF2F2]"
                        : "border-[#D6C7B7] bg-[#EBE4D8]/60 focus-within:border-[#0F5C66] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0F5C66]/20"
                        } transition overflow-hidden`}
                    >
                      {/* India Country Code Badge */}
                      <div className="flex items-center gap-1.5 border-r border-[#D6C7B7] bg-[#DFD6C8] px-3 py-3.5 text-xs sm:text-sm font-bold text-[#2D241E] select-none shrink-0">
                        {/* India Flag */}
                        <span className="text-[18px] leading-none" role="img" aria-label="India flag">
                          🇮🇳
                        </span>
                        <span>+91</span>
                      </div>

                      {/* Phone Input */}
                      <div className="relative w-full">
                        <input
                          type="tel"
                          id="phoneNumber"
                          maxLength={10}
                          value={formData.phoneNumber}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, "");
                            handleInputChange("phoneNumber", digitsOnly);
                          }}
                          className="w-full bg-transparent py-3.5 px-3 text-[15px] sm:text-[16px] text-[#2D241E] outline-none"
                        />
                        {!formData.phoneNumber && (
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] sm:text-[16px] text-[#8E7969] select-none">
                            Phone Number <span className="text-[#DC2626] font-bold">*</span>
                          </span>
                        )}
                      </div>
                    </div>
                    {errors.phoneNumber && (
                      <p className="mt-1 text-[13px] font-medium text-[#DC2626] pl-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                </div>

                {/* ── ROW 4: Describe Your Enquiry * ── */}
                <div>
                  <div className="relative">
                    <textarea
                      id="projectDetails"
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) =>
                        handleInputChange("projectDetails", e.target.value)
                      }
                      className={`w-full rounded-xl border ${errors.projectDetails
                        ? "border-[#DC2626] bg-[#FEF2F2] focus:ring-1 focus:ring-[#DC2626]"
                        : "border-[#D6C7B7] bg-[#EBE4D8]/60 focus:border-[#0F5C66] focus:bg-white focus:ring-2 focus:ring-[#0F5C66]/20"
                        } p-4 text-[15px] sm:text-[16px] text-[#2D241E] outline-none transition resize-y`}
                    />
                    {!formData.projectDetails && (
                      <span className="pointer-events-none absolute left-4 top-4 text-[15px] sm:text-[16px] text-[#8E7969] select-none">
                        How can we assist you? Describe your enquiry or requirement <span className="text-[#DC2626] font-bold">*</span>
                      </span>
                    )}
                  </div>
                  {errors.projectDetails && (
                    <p className="mt-1 text-[13px] font-medium text-[#DC2626] pl-1">
                      {errors.projectDetails}
                    </p>
                  )}
                </div>

                {/* ── ROW 5: Consent Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) =>
                        handleInputChange("agreedToTerms", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 shrink-0 rounded border-[#D6C7B7] text-[#0F5C66] focus:ring-[#0F5C66] cursor-pointer"
                    />
                    <span className="text-[13px] sm:text-[14px] text-[#55473C] leading-snug">
                      I agree to be contacted regarding my enquiry and accept the{" "}
                      <Link
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0F5C66] font-semibold underline hover:text-[#0A474E]"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0F5C66] font-semibold underline hover:text-[#0A474E]"
                      >
                        Terms &amp; Conditions
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.agreedToTerms && (
                    <p className="mt-1 text-[13px] font-medium text-[#DC2626] pl-7">
                      {errors.agreedToTerms}
                    </p>
                  )}
                </div>

                {/* ── ROW 6: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0F5C66] to-[#0A474E] px-8 py-3.5 text-[17px] sm:text-[18px] font-bold text-white shadow-md transition-all duration-300 hover:opacity-95 hover:shadow-lg active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${cormorantInfant.className}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
