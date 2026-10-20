"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  User,
  SquarePen,
  Phone,
  Mail,
  CalendarDays,
  Calendar,
  Users,
  Bus,
  Banknote,
  Globe,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Ticket,
  Zap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { startRazorpayPayment, restorePageScroll } from "@/lib/payments/razorpay";
import { showToast } from "@/lib/toast";

interface ReviewPaymentStepProps {
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
  onBack: () => void;
  onEditContact: () => void;
  onEditTravel: () => void;
  onEditTravellers: () => void;
  onPaymentSuccess: () => void;
}

const PACKAGE_DATA: Record<string, { name: string; price: number }> = {
  basic: { name: "Basic Package", price: 2499 },
  standard: { name: "Standard Package", price: 3999 },
  premium: { name: "Premium Package", price: 5999 },
};

const PACKAGE_FEATURES = [
  "AC Travel (17 Seater)",
  "Satvik Meals (Breakfast, Lunch, Dinner)",
  "Comfortable Stay",
  "Toll, Parking & Fuel",
  "Water Bottles",
];

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

export default function ReviewPaymentStep({
  slug = "braj-yatra",
  contactData,
  travelDate,
  travellerCount,
  travellerNames,
  onBack,
  onEditContact,
  onEditTravel,
  onEditTravellers,
  onPaymentSuccess,
}: ReviewPaymentStepProps) {
  const searchParams = useSearchParams();
  const pkgParam = searchParams?.get("package")?.toLowerCase() || "standard";
  const pkgInfo = PACKAGE_DATA[pkgParam] || PACKAGE_DATA.standard;

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Format Aadhaar Masked: XXXX XXXX 1234
  const formatAadhaar = (num: string) => {
    const clean = (num || "").replace(/\D/g, "");
    if (clean.length >= 4) {
      return `XXXX XXXX ${clean.slice(-4)}`;
    }
    return "XXXX XXXX 1234";
  };

  // Pricing calculations
  const packageCost = pkgInfo.price * travellerCount;
  const taxes = 402;
  const subtotal = packageCost + taxes;
  const totalAmount = Math.max(0, subtotal - discount);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      showToast.error("Please enter a coupon code");
      return;
    }
    if (code === "BRAJ10" || code === "YATRA10") {
      const disc = Math.round(packageCost * 0.1);
      setDiscount(disc);
      showToast.success(`Coupon applied! You saved ₹${disc.toLocaleString()}`);
    } else {
      showToast.error("Invalid coupon code. Try BRAJ10");
    }
  };

  const handlePaySecurely = async () => {
    setIsProcessing(true);
    try {
      await startRazorpayPayment({
        amount: totalAmount,
        name: "Braj Yatra Booking",
        description: `${pkgInfo.name} - ${travellerCount} ${
          travellerCount === 1 ? "Traveller" : "Travellers"
        }`,
        onSuccess: () => {
          restorePageScroll();
          showToast.success("Booking confirmed successfully!");
          onPaymentSuccess();
        },
        // Only fires when user manually clicks Close/X on the Razorpay modal
        onDismiss: () => {
          restorePageScroll();
          onPaymentSuccess();
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const displayName = contactData.name?.trim() || "-";
  const displayPhone = contactData.phone?.trim() || "-";
  const displayEmail = contactData.email?.trim() || "-";
  const displayAddress =
    contactData.address?.trim() ||
    "123, Govind Marg, Nathdwara, Rajsamand, Rajasthan - 313301";

  // Traveller fallback names
  const defaultTravellerNames = ["Arjun Sharma", "Neha Sharma"];

  return (
    <div className="w-full">
      {/* ── Two Column Main Container ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ════════ LEFT COLUMN: Review Details + Payment Method ════════ */}
        <div className="lg:col-span-7 rounded-[20px] border-2 border-[#C37000] bg-[rgba(239,222,199,0.4)] shadow-[0_8px_32px_rgba(195,112,0,0.10)] p-5 sm:p-7">
          {/* ── Section 1: Booking Contact Details ── */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                <h2 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight">
                  Booking Contact Details
                </h2>
              </div>
              <button
                type="button"
                onClick={onEditContact}
                className="font-cormorant flex items-center gap-1.5 text-[15px] font-bold text-[#C37000] transition hover:opacity-80 active:scale-95 cursor-pointer"
              >
                <SquarePen size={15} strokeWidth={2.2} />
                <span>Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3.5">
              {/* Left Sub-column */}
              <div className="space-y-2">
                <div>
                  <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
                    Booking Contact
                  </p>
                  <p className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#3D352F] leading-tight mt-0.5">
                    {displayName}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
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

              {/* Right Sub-column */}
              <div className="space-y-2.5">
                <div>
                  <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
                    Aadhaar Number
                  </p>
                  <p className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#3D352F] leading-tight mt-0.5">
                    {formatAadhaar(contactData.aadhaar)}
                  </p>
                </div>

                <div>
                  <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
                    Address
                  </p>
                  <p className="font-cormorant text-[15px] sm:text-[16px] font-bold text-[#3D352F] leading-snug mt-0.5">
                    {displayAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dotted Divider */}
          <div className="border-t border-dashed border-[#C37000]/40 my-5" />

          {/* ── Section 2: Travel Details ── */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                <h2 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight">
                  Travel Details
                </h2>
              </div>
              <button
                type="button"
                onClick={onEditTravel}
                className="font-cormorant flex items-center gap-1.5 text-[15px] font-bold text-[#C37000] transition hover:opacity-80 active:scale-95 cursor-pointer"
              >
                <SquarePen size={15} strokeWidth={2.2} />
                <span>Edit</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8 mt-3.5">
              <div>
                <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
                  Travel Date
                </p>
                <p className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#3D352F] leading-tight mt-0.5">
                  {dates.single}
                </p>
              </div>

              <div className="hidden sm:block h-[34px] w-px bg-[#C37000]/30" />

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

          {/* Dotted Divider */}
          <div className="border-t border-dashed border-[#C37000]/40 my-5" />

          {/* ── Section 3: Traveller Details ── */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                <h2 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight">
                  Traveller Details
                </h2>
              </div>
              <button
                type="button"
                onClick={onEditTravellers}
                className="font-cormorant flex items-center gap-1.5 text-[15px] font-bold text-[#C37000] transition hover:opacity-80 active:scale-95 cursor-pointer"
              >
                <SquarePen size={15} strokeWidth={2.2} />
                <span>Edit</span>
              </button>
            </div>

            <div className="mt-3.5 space-y-2.5">
              {Array.from({ length: travellerCount }).map((_, index) => {
                const name =
                  travellerNames[index]?.trim() ||
                  defaultTravellerNames[index] ||
                  `Traveller ${index + 1}`;

                return (
                  <div key={index}>
                    <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
                      Traveller {index + 1}
                    </p>
                    <p className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#3D352F] leading-tight mt-0.5">
                      {name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dotted Divider */}
          <div className="border-t border-dashed border-[#C37000]/40 my-5" />

          {/* ── Section 4: Payment Method ── */}
          <div>
            <div className="flex items-center gap-2">
              <Banknote size={18} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
              <h2 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight">
                Payment Method
              </h2>
            </div>

            <div className="mt-3.5 rounded-[14px] border border-[#C37000]/40 bg-[rgba(247,240,229,0.3)] p-4 sm:p-5">
              {/* Online Payment Header */}
              <div className="flex items-start gap-2.5">
                <Globe size={18} strokeWidth={2.2} className="text-[#0F5C66] mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-cormorant text-[16px] sm:text-[17px] font-bold text-[#0F5C66] leading-tight">
                    Online Payment
                  </h3>
                  <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight mt-0.5">
                    Pay securely using Razorpay
                  </p>
                </div>
              </div>

              {/* Selectable Razorpay Box */}
              <div className="mt-3.5 flex items-center justify-between rounded-[10px] border border-[#C37000]/70 bg-transparent p-3.5 sm:p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#C37000]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#C37000]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-cormorant text-[16px] font-bold text-[#3D352F] leading-tight">
                      Razorpay
                    </p>
                    <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight mt-0.5">
                      UPI, Net Banking, Credit/Debit Card, Wallets and more
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 pl-3">
                  <Image
                    src="/images/razorpay-logo.png"
                    alt="Razorpay"
                    width={90}
                    height={22}
                    className="h-[20px] w-auto object-contain"
                  />
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#3D352F]/70">
                    <Lock size={10} className="text-[#3D352F]/70" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>

              {/* Redirect Notice Banner */}
              <div className="mt-3.5 flex items-center gap-2.5 rounded-[8px] border border-[#0F5C66]/30 bg-[#0F5C66]/10 px-3.5 py-2.5">
                <ShieldCheck size={20} strokeWidth={2.2} className="text-[#0F5C66] shrink-0" />
                <p className="font-cormorant text-[13px] sm:text-[14px] font-bold text-[#0F5C66] leading-snug">
                  You will be redirected to Razorpay&apos;s secure payment getaway to complete your payment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════ RIGHT COLUMN: Booking Summary + Trust Card ════════ */}
        <div className="lg:col-span-5 space-y-4">
          {/* ── Booking Summary Card ── */}
          <div className="rounded-[20px] border-2 border-[#C37000] bg-[rgba(239,222,199,0.4)] shadow-[0_8px_32px_rgba(195,112,0,0.10)] p-5 sm:p-6">
            <h2 className="font-cormorant text-[22px] sm:text-[24px] font-bold text-[#0F5C66] leading-tight">
              Booking Summary
            </h2>

            {/* Trip Info Header */}
            <div className="mt-4 flex items-start gap-3.5">
              <div className="relative h-[85px] w-[110px] shrink-0 overflow-hidden rounded-[10px] shadow-sm">
                <Image
                  src="/images/braj_white.png"
                  alt="Braj Yatra"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#0F5C66] leading-tight">
                  Braj Yatra
                </h3>
                <p className="font-cormorant text-[14px] sm:text-[15px] font-bold text-[#C37000] italic leading-tight mt-0.5">
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

            {/* Dotted Divider */}
            <div className="border-t border-dashed border-[#C37000]/40 my-4" />

            {/* Package Details */}
            <div>
              <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight">
                Package Details
              </p>

              <div className="flex items-baseline justify-between mt-1">
                <span className="font-cormorant text-[19px] sm:text-[21px] font-bold text-[#C37000] leading-tight">
                  {pkgInfo.name}
                </span>
                <span className="font-cormorant text-[22px] sm:text-[25px] font-bold text-[#C37000] leading-none">
                  ₹{pkgInfo.price.toLocaleString()}
                </span>
              </div>

              {/* Checklist */}
              <div className="mt-3 space-y-1.5">
                {PACKAGE_FEATURES.map((feat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 font-cormorant text-[14px] sm:text-[15px] font-bold text-[#3D352F]"
                  >
                    <CheckCircle2 size={15} strokeWidth={2.4} className="text-[#C37000] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dotted Divider */}
            <div className="border-t border-dashed border-[#C37000]/40 my-4" />

            {/* Price Breakdown */}
            <div>
              <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight mb-2">
                Price Breakdown
              </p>

              <div className="space-y-1.5 font-cormorant text-[15px] sm:text-[16px] font-bold text-[#3D352F]">
                <div className="flex items-center justify-between">
                  <span>
                    Package Cost ({travellerCount}{" "}
                    {travellerCount === 1 ? "Traveller" : "Travellers"})
                  </span>
                  <span>₹{packageCost.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Taxes &amp; Fees</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-[#0F5C66]">
                    <span>Coupon Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Apply Coupon Box */}
              <div className="mt-3.5 flex items-center justify-between rounded-[8px] border border-[#C37000]/60 bg-transparent p-1 pl-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Ticket size={16} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
                  <input
                    type="text"
                    placeholder="Apply Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="font-cormorant w-full bg-transparent text-[15px] font-bold text-[#3D352F] placeholder:text-[#3D352F]/40 placeholder:font-bold focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="font-cormorant shrink-0 rounded-[6px] border border-[#0F5C66]/50 bg-[#0F5C66]/20 px-3.5 py-1 text-[14px] font-bold text-[#0F5C66] transition hover:bg-[#0F5C66]/30 active:scale-95 cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Dotted Divider */}
            <div className="border-t border-dashed border-[#C37000]/40 my-4" />

            {/* Total Amount */}
            <div>
              <p className="font-cormorant text-[14px] font-bold text-[#3D352F]/75 leading-tight">
                Total Amount
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-cormorant text-[30px] sm:text-[34px] font-bold text-[#0F5C66] leading-none">
                  ₹{totalAmount.toLocaleString()}
                </span>
                <span className="font-cormorant text-[13px] sm:text-[14px] font-bold text-[#3D352F]/75">
                  (Inclusive of all Taxes)
                </span>
              </div>
            </div>
          </div>

          {/* ── Trust & Security Card ── */}
          <div className="rounded-[16px] border border-[#C37000]/50 bg-[rgba(239,222,199,0.3)] p-4 sm:p-5 space-y-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
              <div>
                <p className="font-cormorant text-[16px] font-bold text-[#0F5C66] leading-tight">
                  Secure Payments
                </p>
                <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight mt-0.5">
                  Your transactions are 100% safe and secure
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Zap size={22} strokeWidth={2.2} className="text-[#C37000] shrink-0" />
              <div>
                <p className="font-cormorant text-[16px] font-bold text-[#0F5C66] leading-tight">
                  Instant Confirmation
                </p>
                <p className="font-cormorant text-[13px] font-bold text-[#3D352F]/75 leading-tight mt-0.5">
                  Get booking details instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ BOTTOM ACTION BAR ════════ */}
      <div className="mt-6 mb-12 rounded-[16px] border border-[#C37000]/50 bg-[rgba(239,222,199,0.4)] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="font-cormorant flex h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] border border-[#0F5C66] bg-transparent px-6 text-[17px] sm:text-[18px] font-bold text-[#0F5C66] transition hover:bg-[#EEF8F8] active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeft size={18} strokeWidth={2.2} className="shrink-0" />
          <span>Back to Traveller Details</span>
        </button>

        <button
          type="button"
          onClick={handlePaySecurely}
          disabled={isProcessing}
          className="font-cormorant flex h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-[10px] bg-[#0F5C66] px-8 text-[17px] sm:text-[18px] font-bold text-[#EFDEC7] transition hover:bg-[#0A4E57] active:scale-[0.98] cursor-pointer shadow-[0_4px_16px_rgba(15,92,102,0.2)] disabled:opacity-60"
        >
          <span>{isProcessing ? "Processing..." : "Pay Securely"}</span>
          <ArrowRight size={18} strokeWidth={2.2} className="shrink-0" />
        </button>
      </div>
    </div>
  );
}
