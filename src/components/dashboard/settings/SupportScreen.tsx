"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  HeartHandshake,
  Map,
  CreditCard,
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  Check,
} from "lucide-react";
import { cormorantInfant } from "@/lib/fonts";
import { showToast } from "@/lib/toast";

interface SupportScreenProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

const SUPPORT_CATEGORIES = [
  {
    id: "orders",
    title: "Orders & Prasad",
    desc: "Delivery, missing items or order issues",
    icon: Package,
    color: "#C37000",
  },
  {
    id: "sevas",
    title: "Seva Bookings",
    desc: "Booking confirmation or seva-related queries",
    icon: HeartHandshake,
    color: "#0F5C66",
  },
  {
    id: "yatras",
    title: "Yatra Bookings",
    desc: "Travel dates, itinerary or package issues",
    icon: Map,
    color: "#8B5CF6",
  },
  {
    id: "payments",
    title: "Payments & Refunds",
    desc: "Payment failures, refunds or billing questions",
    icon: CreditCard,
    color: "#16A34A",
  },
];

interface SupportFormErrors {
  fullName?: string;
  contact?: string;
  message?: string;
}

export default function SupportScreen({
  onBack,
  showBackButton = true,
}: SupportScreenProps) {
  const [selectedTopic, setSelectedTopic] = useState("Orders & Prasad");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<SupportFormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: SupportFormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    if (!contact.trim()) {
      newErrors.contact = "Please enter your mobile number or email";
    }

    if (!message.trim()) {
      newErrors.message = "Please describe your query or issue";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setErrors({});
      showToast.success("Query submitted successfully! Our Devotee Care team will respond within 24 hours.");
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div>
        {showBackButton && (
          onBack ? (
            <button
              type="button"
              onClick={onBack}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold text-[#0F5C66] hover:bg-[#0F5C66]/10 transition cursor-pointer ${cormorantInfant.className}`}
            >
              <ArrowLeft size={16} />
              <span>Back to Settings</span>
            </button>
          ) : (
            <Link
              href="/profile/settings"
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold text-[#0F5C66] hover:bg-[#0F5C66]/10 transition cursor-pointer ${cormorantInfant.className}`}
            >
              <ArrowLeft size={16} />
              <span>Back to Settings</span>
            </Link>
          )
        )}

        <h1
          className={`${cormorantInfant.className} mt-3 text-[28px] sm:text-[34px] font-bold text-[#0F5C66]`}
        >
          Help & Support
        </h1>
        <p
          className={`${cormorantInfant.className} text-[16px] sm:text-[18px] text-[#634E3E] font-medium`}
        >
          How can we help you? Select a topic below or reach out to our dedicated devotee care team.
        </p>
      </div>

      {/* 4 Category Cards */}
      <div>
        <h2
          className={`${cormorantInfant.className} mb-3 text-[20px] sm:text-[22px] font-bold text-[#2D241E]`}
        >
          Select Query Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {SUPPORT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedTopic === cat.title;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedTopic(cat.title)}
                className={`flex items-center justify-between gap-3.5 rounded-[18px] border p-4 text-left transition cursor-pointer ${isSelected
                  ? "border-2 border-[#D8A35D] bg-[#FFFDF9]/80 shadow-xl"
                  : "border-[#C37000]/30 hover:bg-[#FAF3E7]/80"
                  }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`${cormorantInfant.className} text-[19px] sm:text-[20px] font-bold text-[#2D241E] leading-tight`}
                    >
                      {cat.title}
                    </h3>
                    <p
                      className={`${cormorantInfant.className} mt-1 text-[14px] text-[#7A6A5C] leading-snug`}
                    >
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Right rounded circle with tick symbol when selected */}
                <div
                  className={`ml-2 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border transition ${isSelected
                    ? "border-[#0F5C66] bg-[#0F5C66] text-white"
                    : "border-[#C37000]/40 bg-transparent text-transparent"
                    }`}
                >
                  {isSelected && <Check size={13} strokeWidth={2.5} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Direct Contact Details */}
      <div
        id="contact"
        className="scroll-mt-24 rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40  p-5 sm:p-6 shadow-sm"
      >
        <h3
          className={`${cormorantInfant.className} text-[20px] sm:text-[22px] font-bold text-[#0F5C66] mb-3`}
        >
          Direct Devotee Care Channels
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          <div className="flex items-center gap-3 rounded-xl border border-[#C37000]/20 bg-[#FAF3E7]/50 p-3">
            <Phone size={18} className="text-[#0F5C66] shrink-0" />
            <div>
              <p className={`${cormorantInfant.className} text-[13px] font-bold text-[#8A715E] uppercase`}>
                Phone / WhatsApp
              </p>
              <p className={`${cormorantInfant.className} text-[16px] font-bold text-[#2D241E]`}>
                +91 88388 46835
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#C37000]/20 bg-[#FAF3E7]/50 p-3">
            <Mail size={18} className="text-[#0F5C66] shrink-0" />
            <div>
              <p className={`${cormorantInfant.className} text-[13px] font-bold text-[#8A715E] uppercase`}>
                Email Support
              </p>
              <p className={`${cormorantInfant.className} text-[15px] font-bold text-[#2D241E] truncate`}>
                support@brajmarg.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#C37000]/20 bg-[#FAF3E7]/50 p-3">
            <Clock size={18} className="text-[#0F5C66] shrink-0" />
            <div>
              <p className={`${cormorantInfant.className} text-[13px] font-bold text-[#8A715E] uppercase`}>
                Working Hours
              </p>
              <p className={`${cormorantInfant.className} text-[15px] font-bold text-[#2D241E]`}>
                6:00 AM - 9:00 PM IST
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#C37000]/20 bg-[#FAF3E7]/50 p-3">
            <MapPin size={18} className="text-[#0F5C66] shrink-0" />
            <div>
              <p className={`${cormorantInfant.className} text-[13px] font-bold text-[#8A715E] uppercase`}>
                Spiritual Center
              </p>
              <p className={`${cormorantInfant.className} text-[15px] font-bold text-[#2D241E] truncate`}>
                Vrindavan, Mathura (UP)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit a Query Form */}
      <div className="rounded-[20px] sm:rounded-[22px] border border-[#C37000]/40  p-5 sm:p-7 shadow-sm">
        <h3
          className={`${cormorantInfant.className} text-[22px] sm:text-[24px] font-bold text-[#0F5C66] pb-3 border-b border-[#C37000]/20`}
        >
          Submit a Query
        </h3>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F4EA] text-[#137333]">
              <CheckCircle2 size={32} />
            </div>
            <h4 className={`${cormorantInfant.className} text-[22px] font-bold text-[#2D241E]`}>
              Thank You! Your query has been logged.
            </h4>
            <p className={`${cormorantInfant.className} text-[16px] text-[#7A6A5C] max-w-md mx-auto`}>
              Our sevayat support desk has received your ticket regarding <strong>{selectedTopic}</strong> and
              will reach out to you within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage("");
                setBookingId("");
                setFullName("");
                setContact("");
                setErrors({});
              }}
              className={`mt-2 rounded-xl border border-[#C37000] px-5 py-2 text-[16px] font-semibold text-[#C37000] hover:bg-[#C37000]/10 transition ${cormorantInfant.className}`}
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Selected Topic */}
              <div>
                <label className={`${cormorantInfant.className} block text-[15px] font-bold uppercase tracking-wider text-[#634E3E]`}>
                  Selected Topic
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedTopic}
                  className={`${cormorantInfant.className} mt-1 w-full rounded-xl border border-[#C37000]/30 py-2.5 px-3.5 text-[16px] font-bold text-[#0F5C66] outline-none cursor-default`}
                />
              </div>

              {/* Order / Booking ID */}
              <div>
                <label className={`${cormorantInfant.className} block text-[15px] font-bold uppercase tracking-wider text-[#634E3E]`}>
                  Order / Booking ID (Optional)
                </label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="e.g. BM2502267894"
                  className={`${cormorantInfant.className} mt-1 w-full rounded-xl border border-[#C37000]/40 bg-transparent py-2.5 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none focus:ring-1 focus:ring-[#C37000]`}
                />
              </div>

              {/* Full Name */}
              <div>
                <label className={`${cormorantInfant.className} block text-[15px] font-bold uppercase tracking-wider text-[#634E3E]`}>
                  Your Name <span className="text-[#DC2626] font-bold ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }
                  }}
                  placeholder="Enter your full name"
                  className={`${cormorantInfant.className} mt-1 w-full rounded-xl border ${errors.fullName ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                    } bg-transparent py-2.5 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none`}
                />
                {errors.fullName && (
                  <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <label className={`${cormorantInfant.className} block text-[15px] font-bold uppercase tracking-wider text-[#634E3E]`}>
                  Mobile Number / Email <span className="text-[#DC2626] font-bold ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (errors.contact) {
                      setErrors((prev) => ({ ...prev, contact: undefined }));
                    }
                  }}
                  placeholder="Phone or email to reach you"
                  className={`${cormorantInfant.className} mt-1 w-full rounded-xl border ${errors.contact ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                    } bg-transparent py-2.5 px-3.5 text-[16px] font-semibold text-[#3D352F] outline-none`}
                />
                {errors.contact && (
                  <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                    {errors.contact}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className={`${cormorantInfant.className} block text-[15px] font-bold uppercase tracking-wider text-[#634E3E]`}>
                Describe your query or issue <span className="text-[#DC2626] font-bold ml-1">*</span>
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                placeholder="Please describe how we can assist you with your order, seva booking, or yatra..."
                className={`${cormorantInfant.className} mt-1 w-full rounded-xl border ${errors.message ? "border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]" : "border-[#C37000]/40 focus:ring-1 focus:ring-[#C37000]"
                  } bg-transparent p-3 text-[16px] leading-relaxed font-semibold text-[#3D352F] outline-none`}
              />
              {errors.message && (
                <p className={`${cormorantInfant.className} mt-1 text-[13px] font-bold text-[#DC2626]`}>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F5C66] to-[#0A474E] px-7 py-2.5 text-[16px] font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-98 cursor-pointer ${cormorantInfant.className}`}
              >
                <Send size={16} />
                <span>{isSubmitting ? "Submitting..." : "Submit Query"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
