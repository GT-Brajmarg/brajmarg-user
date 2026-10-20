"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Copy,
  Check,
  Bus,
  Landmark,
  UtensilsCrossed,
  Calendar,
  Users,
  User,
  Phone,
  Mail,
  CalendarDays,
  Info,
  CheckCircle2,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { showToast } from "@/lib/toast";
import { restorePageScroll } from "@/lib/payments/razorpay";

interface YatraConfirmationStepProps {
  slug?: string;
  contactData: {
    name: string;
    phone: string;
    email: string;
    aadhaar: string;
    address: string;
  };
  travelDate: string;
  travellerCount: number;
  travellerNames: string[];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function YatraConfirmationStep({
  slug = "braj-yatra",
  contactData,
  travelDate,
  travellerCount = 2,
  travellerNames = [],
}: YatraConfirmationStepProps) {
  const [copied, setCopied] = useState(false);
  const bookingId = "YTB789456123";

  useEffect(() => {
    restorePageScroll();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const handleCopyId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(bookingId);
      setCopied(true);
      showToast.success("Booking ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Format Travel Dates
  const getFormattedDates = () => {
    if (!travelDate) {
      return {
        single: "20 July 2026",
        range: "20 July 2026 to 28 July 2026",
      };
    }

    try {
      const parts = travelDate.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);

        const start = new Date(year, month, day);
        const end = new Date(year, month, day + 8);

        const startStr = `${start.getDate()} ${MONTH_NAMES[start.getMonth()]} ${start.getFullYear()}`;
        const endStr = `${end.getDate()} ${MONTH_NAMES[end.getMonth()]} ${end.getFullYear()}`;

        return {
          single: startStr,
          range: `${startStr} to ${endStr}`,
        };
      }
    } catch {
      // Fallback
    }

    return {
      single: "20 July 2026",
      range: "20 July 2026 to 28 July 2026",
    };
  };

  const dates = getFormattedDates();

  const displayName = contactData.name?.trim() || "Rahul Sharma";
  const displayPhone = contactData.phone?.trim() || "98765 43210";
  const displayEmail = contactData.email?.trim() || "rahul.sharma@gmail.com";
  const defaultTravellerNames = ["Arjun Sharma", "Neha Sharma"];

  const importantChecklist = [
    "A confirmation email has been sent to your email ID",
    "Please carry a valid ID proof during the journey.",
    "You will receive updates on your travel details.",
    "For any changes or queries, contact our support team.",
    "Our team will contact you closer to your travel date.",
  ];

  return (
    <div className="relative w-full">
      {/* ════════ Top Hero Section with Lord Krishna & Bells ════════ */}
      <div className="relative w-full pt-8 pb-4 text-center">
        {/* Lord Krishna Image (Top Left) */}
        <div className="hidden sm:block absolute left-0 top-0 w-[140px] md:w-[170px] lg:w-[200px] pointer-events-none drop-shadow-md">
          <Image
            src="/images/krisha.png"
            alt="Lord Krishna"
            width={200}
            height={260}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Temple Bells Image (Top Right) */}
        <div className="hidden sm:block absolute right-2 top-0 w-[110px] md:w-[130px] lg:w-[150px] pointer-events-none opacity-90">
          <Image
            src="/images/temple-bell.png"
            alt="Temple Bells"
            width={150}
            height={180}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Center Text */}
        <div className="max-w-[650px] mx-auto px-4">
          <p className="font-cormorant text-[18px] sm:text-[20px] font-bold text-[#3D352F] leading-tight">
            Jai Shri Radhe! 🙏
          </p>

          <h1 className="font-cormorant text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#0F5C66] leading-tight mt-1">
            Your Yatra is Confirmed!
          </h1>

          <p className="font-cormorant text-[16px] sm:text-[18px] font-bold text-[#3D352F]/75 leading-tight mt-2">
            Thank you for joining Brajmarg Alerts. Your devotion is with us.
          </p>

          {/* Ornamental Divider */}
          <div className="flex justify-center my-3">
            <Image
              src="/images/brajmarg-divider.png"
              alt=""
              width={160}
              height={24}
              className="object-contain opacity-85"
            />
          </div>

          {/* Booking ID Badge Card */}
          <div className="inline-block rounded-[12px] border border-[#C37000]/50 bg-[rgba(239,222,199,0.7)] px-7 py-3 shadow-sm mt-1">
            <p className="font-cormorant text-[13px] sm:text-[14px] font-bold text-[#0F5C66] leading-tight">
              Booking ID
            </p>

            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#3D352F] tracking-wide">
                {bookingId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                title="Copy Booking ID"
                className="text-[#0F5C66] transition hover:opacity-75 active:scale-95 cursor-pointer"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <p className="font-cormorant text-[12px] sm:text-[13px] font-bold text-[#3D352F]/75 mt-1">
              Booked on{" "}
              <span className="text-[#0F5C66] underline decoration-[#0F5C66]/50">
                09 July 2026, 12:15 PM
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ════════ Teal Features Bar ════════ */}
      <div className="mt-6 rounded-[14px] bg-[#0F5C66] px-6 py-4.5 text-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-center">
          {/* Feature 1 */}
          <div className="flex items-center gap-3.5">
            <Bus size={32} className="text-[#F9A825] shrink-0" />
            <div>
              <h4 className="font-cormorant text-[17px] font-bold text-white leading-tight">
                Comfortable Journey
              </h4>
              <p className="font-cormorant text-[13px] font-bold text-white/80 leading-snug mt-0.5">
                Travel in comfortable vehicles with experienced drivers.
              </p>
            </div>
          </div>

          {/* Feature 2 (with left border on md) */}
          <div className="flex items-center gap-3.5 md:border-l md:border-white/20 md:pl-5">
            <Landmark size={32} className="text-[#F9A825] shrink-0" />
            <div>
              <h4 className="font-cormorant text-[17px] font-bold text-white leading-tight">
                Spiritual Experience
              </h4>
              <p className="font-cormorant text-[13px] font-bold text-white/80 leading-snug mt-0.5">
                Carefully curated yatra itinerary for a divine and fulfilling experience.
              </p>
            </div>
          </div>

          {/* Feature 3 (with left border on md) */}
          <div className="flex items-center gap-3.5 md:border-l md:border-white/20 md:pl-5">
            <UtensilsCrossed size={30} className="text-[#F9A825] shrink-0" />
            <div>
              <h4 className="font-cormorant text-[17px] font-bold text-white leading-tight">
                Satvik Meals
              </h4>
              <p className="font-cormorant text-[13px] font-bold text-white/80 leading-snug mt-0.5">
                Enjoy hygienic and satvik meals throughout your yatra.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ Row: Yatra Summary + Traveller & Contact Details ════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 items-stretch">
        {/* ── Left Card: Yatra Summary ── */}
        <div className="rounded-[16px] border border-[#C37000]/60 bg-[rgba(239,222,199,0.4)] p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3.5">
            <Landmark size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
            <h3 className="font-cormorant text-[20px] font-bold text-[#0F5C66] leading-tight">
              Yatra Summary
            </h3>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative h-[95px] w-[130px] shrink-0 overflow-hidden rounded-[12px] shadow-sm">
              <Image
                src="/images/braj_white.png"
                alt="Braj Yatra"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-cormorant text-[22px] font-bold text-[#0F5C66] leading-tight">
                Braj Yatra
              </h4>
              <p className="font-cormorant text-[15px] font-bold text-[#C37000] italic leading-tight mt-0.5">
                Nathdwara to Vrindavaan
              </p>

              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#3D352F]">
                  <Calendar size={13} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                  <span>{dates.range}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#3D352F]">
                  <Users size={13} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                  <span>
                    {travellerCount} {travellerCount === 1 ? "Traveller" : "Travellers"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#3D352F]">
                  <Bus size={13} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                  <span>17-seater Urbania</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Card: Traveller & Contact Details ── */}
        <div className="rounded-[16px] border border-[#C37000]/60 bg-[rgba(239,222,199,0.4)] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3.5">
            <User size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
            <h3 className="font-cormorant text-[20px] font-bold text-[#0F5C66] leading-tight">
              Traveller &amp; Contact Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Details (Left Sub-column) */}
            <div className="space-y-2">
              <div>
                <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
                  Booking Contact
                </p>
                <p className="font-cormorant text-[16px] font-bold text-[#3D352F] leading-tight mt-0.5">
                  {displayName}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <Phone size={14} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                <span className="font-cormorant text-[15px] font-bold text-[#3D352F]">
                  +91 {displayPhone}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={14} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                <span className="font-cormorant text-[15px] font-bold text-[#3D352F] break-all">
                  {displayEmail}
                </span>
              </div>
            </div>

            {/* Travellers List (Right Sub-column with left divider) */}
            <div className="sm:border-l sm:border-[#C37000]/30 sm:pl-4 space-y-2">
              {Array.from({ length: travellerCount }).map((_, i) => {
                const name =
                  travellerNames[i]?.trim() ||
                  defaultTravellerNames[i] ||
                  `Traveller ${i + 1}`;

                return (
                  <div key={i}>
                    <p className="font-cormorant text-[13px] font-bold text-[#C37000] leading-tight">
                      Traveller {i + 1}
                    </p>
                    <p className="font-cormorant text-[16px] font-bold text-[#3D352F] leading-tight mt-0.5">
                      {name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ════════ Card: Travel Details ════════ */}
      <div className="rounded-[16px] border border-[#C37000]/60 bg-[rgba(239,222,199,0.4)] p-5 mt-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3.5">
          <CalendarDays size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
          <h3 className="font-cormorant text-[20px] font-bold text-[#0F5C66] leading-tight">
            Travel Details
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-12">
          <div>
            <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
              Travel Date
            </p>
            <p className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#3D352F] leading-tight mt-0.5">
              {dates.single}
            </p>
          </div>

          <div className="hidden sm:block h-[34px] w-px bg-[#C37000]/40" />

          <div>
            <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
              Duration
            </p>
            <p className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#3D352F] leading-tight mt-0.5">
              9 Days/8 Nights
            </p>
          </div>

          <div className="hidden sm:block h-[34px] w-px bg-[#C37000]/40" />

          <div>
            <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
              Number of Travellers
            </p>
            <p className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#3D352F] leading-tight mt-0.5">
              {travellerCount} {travellerCount === 1 ? "Traveller" : "Travellers"}
            </p>
          </div>
        </div>
      </div>

      {/* ════════ Card: Important Information + Need Help ════════ */}
      <div className="rounded-[16px] border border-[#C37000]/60 bg-[rgba(239,222,199,0.4)] p-5 sm:p-6 mt-5 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Checklist */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3.5">
              <Info size={18} strokeWidth={2.4} className="text-[#C37000] shrink-0" />
              <h3 className="font-cormorant text-[20px] font-bold text-[#0F5C66] leading-tight">
                Important Information
              </h3>
            </div>

            <div className="space-y-2">
              {importantChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2
                    size={16}
                    strokeWidth={2.4}
                    className="text-[#0F5C66] shrink-0"
                  />
                  <span className="font-cormorant text-[14px] sm:text-[15px] font-bold text-[#3D352F]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Need Help Card */}
          <div className="lg:col-span-4 rounded-[14px] border border-[#C37000]/60 bg-[rgba(239,222,199,0.5)] p-5 text-center flex flex-col items-center justify-center">
            <Headphones size={32} strokeWidth={2} className="text-[#C37000] mb-1" />
            <h4 className="font-cormorant text-[19px] font-bold text-[#C37000] leading-tight">
              Need Help?
            </h4>
            <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight mt-0.5">
              We are here for you.
            </p>

            <button
              type="button"
              onClick={() => showToast.info("Support contact: +91 98765 43210")}
              className="font-cormorant rounded-[8px] border border-[#C37000] bg-transparent px-5 py-2 mt-3.5 text-[15px] font-bold text-[#C37000] transition hover:bg-[#C37000]/10 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Contact Support</span>
              <Phone size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ════════ Bottom Blessing Card & Action Buttons ════════ */}
      <div className="mt-5 mb-12 rounded-[16px] border border-[#C37000]/60 bg-[rgba(239,222,199,0.4)] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
        {/* Left: Diya with flowers + Blessing text */}
        <div className="flex items-center gap-4">
          <div className="relative h-[65px] w-[95px] shrink-0">
            <Image
              src="/images/diya-blessing.png"
              alt="Diya Blessing"
              fill
              className="object-contain"
            />
          </div>

          <div>
            <p className="font-cormorant text-[15px] sm:text-[16px] font-bold text-[#3D352F] leading-tight">
              May your spiritual journey be filled with peace, devotion, and divine blessings.
            </p>
            <p className="font-cormorant text-[18px] sm:text-[20px] font-bold text-[#0F5C66] leading-tight mt-1">
              Radhe Radhe! 🌸
            </p>
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <Link
            href="/"
            className="font-cormorant flex h-[46px] w-full sm:w-auto items-center justify-center rounded-[10px] border border-[#0F5C66] bg-transparent px-6 text-[17px] font-bold text-[#0F5C66] transition hover:bg-[#0F5C66]/10 active:scale-95 cursor-pointer"
          >
            Back to Home
          </Link>

          <Link
            href="/profile/yatras"
            className="font-cormorant flex h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] bg-[#0F5C66] px-6 text-[17px] font-bold text-[#EFDEC7] transition hover:bg-[#0A4E57] active:scale-95 cursor-pointer shadow-[0_4px_16px_rgba(15,92,102,0.2)]"
          >
            <span>View My Yatra Bookings</span>
            <ArrowRight size={18} strokeWidth={2.2} className="shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
