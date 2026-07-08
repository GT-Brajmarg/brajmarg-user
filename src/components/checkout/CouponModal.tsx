"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, TicketPercent, X } from "lucide-react";

type Coupon = {
  code: string;
  discountLabel: string;
  description: string;
  details: string[];
  badge?: string;
};

const COUPONS: Coupon[] = [
  {
    code: "BRAJMARG30",
    discountLabel: "₹ 300\nOFF",
    description: "Get ₹300 off on orders above ₹2000",
    badge: "BEST VALUE",
    details: [
      "Valid on all orders",
      "Minimum order value: ₹2000",
      "Max discount: ₹300",
      "Valid till 31 Dec 2026",
      "Not valid on gift items",
    ],
  },
  {
    code: "SEVA150",
    discountLabel: "₹ 150\nOFF",
    description: "Get ₹150 off on orders above ₹1000",
    details: ["Valid on seva bookings", "Minimum order value: ₹1000"],
  },
  {
    code: "PRASAD10",
    discountLabel: "10 %\nOFF",
    description: "Get 10% off up to ₹500 on prasad orders",
    details: ["Valid on prasad orders", "Maximum discount: ₹500"],
  },
];

type CouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (couponCode: string) => void;
};

export default function CouponModal({
  isOpen,
  onClose,
  onApplyCoupon,
}: CouponModalProps) {
  const [couponCode, setCouponCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [expandedCoupon, setExpandedCoupon] = useState<string | null>(
    "BRAJMARG30",
  );

  if (!isOpen) return null;

  const applyCoupon = (code?: string) => {
    const finalCode = code || couponCode.trim().toUpperCase();

    if (!finalCode) return;

    onApplyCoupon(finalCode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#201A14]/70 px-4 py-6 backdrop-blur-[2px]">
      <div className="relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-[18px] border border-[#D79A43] bg-[#FFF9F0] p-5 shadow-[0_20px_60px_rgba(38,25,12,0.35)] sm:p-7">
        {/* <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "url('/images/mandala-pattern.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "230px",
          }}
        /> */}

        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close coupon popup"
            className="absolute top-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-[#D79A43] bg-[#FFF8ED] text-[#5E4A35] transition hover:bg-[#F7E5C8]"
            style={{ marginTop: "20px", marginRight: "20px" }}
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D79A43] bg-[#FFF2DB] text-[#C67A00]"
              style={{ marginTop: "40px" }}
            >
              <TicketPercent size={22} strokeWidth={1.7} />
            </div>

            <h2
              className="font-cormorant mt-3 text-[28px] leading-none font-semibold text-[#0B6670]"
              style={{ marginTop: "10px" }}
            >
              Available Coupons
            </h2>

            <p
              className="font-cormorant mt-1 text-[15px] text-[#5E4A35]"
              style={{ marginBottom: "20px" }}
            >
              Save more on your seva and prasad orders
            </p>
          </div>

          <div
            className="mt-5 flex h-12 items-center overflow-hidden rounded-[9px] border border-[#D79A43] bg-[#FFFDF8]"
            style={{ marginLeft: "40px", marginRight: "40px" }}
          >
            <input
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              placeholder="Enter Coupon Code"
              className="font-cormorant h-full min-w-0 flex-1 bg-transparent px-4 text-[16px] uppercase outline-none placeholder:text-[#806A55]"
            />

            <button
              type="button"
              onClick={() => applyCoupon()}
              className="font-cormorant mr-1 rounded-[7px] border border-[#0B6670] bg-[#DCEEEA] px-4 py-1.5 text-[16px] font-semibold text-[#0B6670] transition hover:bg-[#C7E4DE]"
              style={{ marginRight: "10px" }}
            >
              Apply
            </button>
          </div>

          <div
            className="my-5 flex items-center gap-3"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <div className="h-px flex-1 bg-[#D79A43]/70" />
            <span className="text-[16px] text-[#5E4A35]">OR</span>
            <div className="h-px flex-1 bg-[#D79A43]/70" />
          </div>

          <div className="space-y-3">
            {COUPONS.map((coupon) => {
              const isExpanded = expandedCoupon === coupon.code;
              const isSelected = selectedCoupon === coupon.code;

              return (
                <div
                  key={coupon.code}
                  className="overflow-hidden rounded-[10px] border border-[#D79A43] bg-[#FFF7E9]"
                  style={{
                    marginLeft: "40px",
                    marginRight: "40px",
                    marginTop: "10px",
                    marginBottom: "40px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCoupon(coupon.code);
                      setExpandedCoupon(isExpanded ? null : coupon.code);
                    }}
                    className="flex w-full items-stretch text-left"
                  >
                    <div className="flex w-[112px] shrink-0 items-center justify-center border-r border-b border-[#D79A43] bg-[#FBE8C5] px-3 text-center text-[20px] leading-tight font-semibold whitespace-pre-line text-[#0B6670]">
                      {coupon.discountLabel}
                    </div>

                    <div className="min-w-0 flex-1 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <h3
                          className="font-cormorant text-[16px] leading-none font-semibold text-[#0B6670]"
                          style={{ marginTop: "10px", marginLeft: "10px" }}
                        >
                          {coupon.code}
                        </h3>

                        {coupon.badge && (
                          <span
                            className="rounded-full bg-[#F7D48D] px-2 py-0.5 text-[9px] font-bold text-[#A76000]"
                            style={{ marginTop: "10px" }}
                          >
                            {coupon.badge}
                          </span>
                        )}
                      </div>

                      <p
                        className="mt-2 text-[11px] leading-tight text-[#5E4A35]"
                        style={{ marginLeft: "10px", marginTop: "5px" }}
                      >
                        {coupon.description}
                      </p>

                      <span
                        className="font-cormorant mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0B6670]"
                        style={{ marginLeft: "10px" }}
                      >
                        View Details
                        <ChevronDown
                          size={14}
                          className={`transition ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </div>

                    <div
                      className="flex w-12 items-start justify-center pt-5"
                      style={{ marginTop: "20px" }}
                    >
                      <span
                        className={`h-6 w-6 rounded-full border-2 ${
                          isSelected
                            ? "border-[#0B6670] bg-[#0B6670] shadow-[inset_0_0_0_4px_#FFF7E9]"
                            : "border-[#D79A43]"
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className="mx-4 mb-4 rounded-[9px] border border-[#D79A43] bg-[#FBE8C5] px-4 py-3"
                      style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <ul className="space-y-1.5">
                        {coupon.details.map((detail) => (
                          <li
                            key={detail}
                            className="font-cormorant flex items-center gap-2 text-[13px] text-[#503A27]"
                          >
                            <CheckCircle2
                              size={15}
                              className="shrink-0 text-[#C67A00]"
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      {/* <button
                        type="button"
                        onClick={() => applyCoupon(coupon.code)}
                        className="font-cormorant mt-3 w-full rounded-[7px] bg-[#0B6670] py-2 text-[15px] font-semibold text-white transition hover:bg-[#084E56]"
                      >
                        Apply {coupon.code}
                      </button> */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
