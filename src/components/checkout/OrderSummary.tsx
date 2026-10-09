"use client";

import { useEffect, useState } from "react";
import CouponModal from "./CouponModal";
import { CartItemType } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { applyCoupon, removeCoupon } from "@/store/slices/cartSlice";

type OrderSummaryProps = {
  items?: CartItemType[];
  showCoupon?: boolean;
};

type CouponRule = {
  code: string;
  minOrder: number;
  discountType: "flat" | "percentage";
  discountValue: number;
  maxDiscount?: number;
  validFor?: "ALL" | "SEVA" | "PRASAD";
};

const COUPON_RULES: CouponRule[] = [
  {
    code: "BRAJMARG30",
    minOrder: 2000,
    discountType: "flat",
    discountValue: 300,
    validFor: "ALL",
  },
  {
    code: "SEVA150",
    minOrder: 1000,
    discountType: "flat",
    discountValue: 150,
    validFor: "SEVA",
  },
  {
    code: "PRASAD10",
    minOrder: 0,
    discountType: "percentage",
    discountValue: 10,
    maxDiscount: 500,
    validFor: "PRASAD",
  },
];

export default function OrderSummary({
  items = [],
  showCoupon = true,
}: OrderSummaryProps) {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  //   const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);

  const dispatch = useAppDispatch();

  const appliedCoupon = useAppSelector((state) => state.cart.appliedCoupon);

  useEffect(() => {
    setCouponInput(appliedCoupon ?? "");
  }, [appliedCoupon]);

  const totalQuantity = items.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0,
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  const shipping = items.length > 0 ? 49 : 0;
  const handling = items.length > 0 ? 49 : 0;
  const total = Math.max(0, subtotal + shipping + handling - discount);

  const handleApplyCoupon = (couponCode: string) => {
    const normalizedCode = couponCode.trim().toUpperCase();

    const coupon = COUPON_RULES.find((rule) => rule.code === normalizedCode);

    if (!coupon) {
      dispatch(removeCoupon());
      setDiscount(0);
      setCouponError("Invalid coupon code.");
      return;
    }

    if (subtotal < coupon.minOrder) {
      dispatch(removeCoupon());
      setDiscount(0);
      setCouponError(
        `This coupon requires a minimum order of ₹${coupon.minOrder}.`,
      );
      return;
    }

    const hasEligibleItem =
      coupon.validFor === "ALL" ||
      items.some((item) => item.type === coupon.validFor);

    if (!hasEligibleItem) {
      dispatch(removeCoupon());
      setDiscount(0);
      setCouponError(
        `${coupon.code} is valid only for ${coupon.validFor?.toLowerCase()} items.`,
      );
      return;
    }

    const eligibleSubtotal =
      coupon.validFor === "ALL"
        ? subtotal
        : items
            .filter((item) => item.type === coupon.validFor)
            .reduce(
              (sum, item) =>
                sum + Number(item.price || 0) * Number(item.quantity || 1),
              0,
            );

    let calculatedDiscount = 0;

    if (coupon.discountType === "flat") {
      calculatedDiscount = coupon.discountValue;
    } else {
      calculatedDiscount = (eligibleSubtotal * coupon.discountValue) / 100;

      if (coupon.maxDiscount) {
        calculatedDiscount = Math.min(calculatedDiscount, coupon.maxDiscount);
      }
    }

    calculatedDiscount = Math.min(calculatedDiscount, subtotal);

    dispatch(applyCoupon(coupon.code));
    setDiscount(calculatedDiscount);
    setCouponError("");
    setCouponInput(coupon.code);
    setIsCouponModalOpen(false);
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponInput("");
    setCouponError("");
    setDiscount(0);
  };

  return (
    <aside className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] border border-[#C37000] bg-[#C37000]/4 p-5 shadow-[0_8px_22px_rgba(173,111,30,0.10)]">
      <div className="relative flex h-full flex-col">
        <h2
          className="font-cormorant text-[26px] leading-none font-semibold text-[#0B6670]"
          style={{ marginLeft: "20px", marginTop: "10px" }}
        >
          Order Summary
        </h2>

        <p
          className="font-cormorant mt-1 text-[16px] text-[#5E4A35]"
          style={{ marginLeft: "20px" }}
        >
          {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
        </p>

        <div className="cart-items-scroll mt-4 h-[315px] space-y-3 overflow-y-auto pr-2">
          {items.length === 0 ? (
            <p
              className="font-cormorant py-8 text-center text-[16px] text-[#6C543C]"
              style={{ marginLeft: "20px", marginRight: "20px" }}
            >
              Your cart is empty.
            </p>
          ) : (
            items.map((item, index) => {
              const itemMeta = item.date || item.extra || "";
              const isSeva = item.type === "SEVA";

              return (
                <div
                  key={`${item.id}-${item.selectedDate ?? ""}-${item.selectedSlot ?? ""}-${item.variant ?? ""}-${index}`}
                  className="flex gap-3 border-b border-[#E8CDA6] pb-3 last:border-none"
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div className="relative h-[80px] w-[80px] shrink-0">
                    {/* Product image inside the frame */}
                    <div className="absolute inset-[6px] overflow-hidden rounded-[5px]">
                      <img
                        src={item.image || "/images2/default.png"}
                        alt={item.title || "Cart item"}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Frame overlay */}
                    <img
                      src="/images/frame_1.png"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-cormorant text-[16px] leading-tight text-[#0B6670]">
                      {item.title}
                    </h3>

                    {item.temple && (
                      <p className="font-cormorant mt-1 text-[12px] text-[#3D352F]">
                        {item.temple}
                      </p>
                    )}

                    {itemMeta && (
                      <p
                        className={`mt-1 text-[10px] ${
                          isSeva ? "text-[#C67A00]" : "text-[#6C543C]"
                        }`}
                      >
                        {isSeva ? "▣ " : ""}
                        {itemMeta}
                      </p>
                    )}

                    <p className="mt-1 text-[16px] font-semibold text-[#0B6670]">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span className="mt-1 flex h-6 min-w-6 items-center justify-center rounded border border-[#D79A43] bg-transparent px-1 text-[12px] text-[#5E4A35]">
                    {item.quantity}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-auto border-t border-dashed border-[#C37000] pt-4">
          <div
            className="font-cormorant pt-3 text-[15px] text-[#3D352F]"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <div className="flex justify-between" style={{ marginTop: "10px" }}>
              <span>
                Subtotal ({totalQuantity}{" "}
                {totalQuantity === 1 ? "Item" : "Items"})
              </span>
              <span className="text-[16px]">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-1 flex justify-between">
              <span>Shipping (Standard Delivery)</span>
              <span className="text-[16px]">₹{shipping}</span>
            </div>

            <div
              className="mt-1 flex justify-between"
              style={{ marginBottom: "10px" }}
            >
              <span>Packaging & Handling</span>
              <span>₹{handling}</span>
            </div>
            {discount > 0 && (
              <div
                className="mt-1 flex justify-between text-[#0B6670]"
                style={{ marginBottom: "10px" }}
              >
                <span>
                  Coupon Discount{" "}
                  <span className="font-semibold">({appliedCoupon})</span>
                </span>

                <span>-₹{discount.toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>

          {showCoupon && items.length > 0 && (
            <div className="my-4 border-y border-dashed border-[#C37000] py-3">
              <div
                className="flex h-10 items-center gap-2 rounded-md border border-[#E1B66F] bg-transparent px-2"
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  marginRight: "20px",
                  marginLeft: "20px",
                }}
              >
                {appliedCoupon ? (
                  <>
                    <span
                      className="text-[#C67A00]"
                      style={{ marginLeft: "5px" }}
                    >
                      {" "}
                      %{" "}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="font-cormorant truncate text-[14px] font-semibold text-[#0B6670]">
                        {appliedCoupon} Applied
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCouponModalOpen(true)}
                      className="font-cormorant shrink-0 text-[13px] font-semibold text-[#0B6670] underline underline-offset-2"
                    >
                      Change
                    </button>

                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="font-cormorant shrink-0 rounded border border-[#B84B3A] px-2 py-1 text-[12px] font-semibold text-[#B84B3A] transition hover:bg-[#FCE2DD]"
                      style={{ marginRight: "10px" }}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      className="text-[#C67A00]"
                      style={{ marginLeft: "5px" }}
                    >
                      %
                    </span>

                    <input
                      value={couponInput}
                      onChange={(event) => {
                        setCouponInput(event.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      placeholder="Apply Coupon Code"
                      className="font-cormorant min-w-0 flex-1 bg-transparent text-[14px] uppercase outline-none placeholder:text-[#806A55]"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        if (couponInput.trim()) {
                          handleApplyCoupon(couponInput);
                          return;
                        }

                        setIsCouponModalOpen(true);
                      }}
                      className="font-cormorant rounded border border-[#0B6670] bg-[#DCEEEA] px-3 py-1 text-[14px] font-semibold text-[#0B6670]"
                      style={{ marginRight: "10px" }}
                    >
                      Apply
                    </button>
                  </>
                )}
              </div>

              {couponError && (
                <p
                  className="mt-2 text-center text-[12px] text-red-600"
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                >
                  {couponError}
                </p>
              )}
            </div>
          )}

          <div className="flex items-end justify-between">
            <div
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <p className="font-cormorant text-[14px] text-[#3D352F]">
                Total Amount
              </p>

              <p className="text-[20px] leading-none font-semibold text-[#0B6670]">
                ₹{total.toLocaleString("en-IN")}
              </p>
            </div>

            <p
              className="font-cormorant mb-1 text-[10px] text-[#5E4A35]"
              style={{ marginRight: "20px", marginBottom: "9px" }}
            >
              (Inclusive of all Taxes)
            </p>
          </div>
        </div>
      </div>

      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onApplyCoupon={handleApplyCoupon}
      />
    </aside>
  );
}
