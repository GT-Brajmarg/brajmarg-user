"use client";
import { useState } from "react";
import CouponModal from "./CouponModal";

const ORDER_SUMMARY_ITEMS = [
  {
    id: "rajbhog-seva",
    name: "Rajbhog Seva",
    templeName: "Shreenathji Temple, Nathdwara",
    weight: "22 June 2026, 1:00 PM",
    price: 751,
    quantity: 1,
    image: "/images/rajbhog-seva.png",
    isDate: true,
  },
  {
    id: "mishri-prasad",
    name: "Mishri Prasad",
    templeName: "Shreenathji Temple, Nathdwara",
    weight: "250 gms",
    price: 251,
    quantity: 1,
    image: "/images/mishri-prasad.png",
  },
  {
    id: "shreenathji-pichwai-frame",
    name: "Shreenathji Pichwai Frame",
    templeName: "Shreenathji Temple, Nathdwara",
    weight: "12×16 inch • Teak wood finish",
    price: 2300,
    quantity: 1,
    image: "/images/shreenathji-pichwai-frame.png",
  },
];
type OrderSummaryProps = {
  items?: any[];
  showCoupon?: boolean;
};

export default function OrderSummary({
  items = [],
  showCoupon = true,
}: OrderSummaryProps) {
  const orderItems = ORDER_SUMMARY_ITEMS;
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = orderItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  const shipping = 49;
  const handling = 49;
  const total = subtotal + shipping + handling;

  return (
    <aside className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] border border-[#D79A43] bg-[#FFF9F0] p-5 shadow-[0_8px_22px_rgba(173,111,30,0.10)]">
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/mandala-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "250px",
        }}
      /> */}

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
          {orderItems.length} Items
        </p>

        {/* Products */}
        <div className="mt-4 space-y-3">
          {orderItems.map((item, index) => (
            <div
              key={item.id ?? index}
              className="flex gap-3 border-[#E8CDA6] pb-3 last:border-none"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-md border border-[#D79A43] bg-[#F4E5CF]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-cormorant text-[16px] leading-tight font-semibold text-[#0B6670]">
                  {item.name}
                </h3>

                <p className="font-cormorant mt-1 text-[11px] text-[#6C543C]">
                  {item.templeName}
                </p>

                <p
                  className={`font-cormorant mt-1 text-[12px] ${
                    item.isDate ? "text-[#C67A00]" : "text-[#6C543C]"
                  }`}
                >
                  {item.isDate ? "▣ " : ""}
                  {item.weight}
                </p>

                <p className="font-cormorant mt-1 text-[16px] font-semibold text-[#0B6670]">
                  ₹{item.price}
                </p>
              </div>

              <span className="font-cormorant mt-1 flex h-6 min-w-6 items-center justify-center rounded border border-[#D79A43] bg-[#FFF8ED] px-1 text-[12px] text-[#5E4A35]">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* This section stays at the bottom, making the card tall */}
        <div className="mt-auto pt-4">
          <div
            className="font-cormorant border-t border-[#D79A43]/60 pt-3 text-[14px] text-[#503A27]"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          >
            <div className="flex justify-between" style={{ marginTop: "10px" }}>
              <span>Subtotal ({items.length} Items)</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="mt-1 flex justify-between">
              <span>Shipping (Standard Delivery)</span>
              <span>₹{shipping}</span>
            </div>

            <div
              className="mt-1 flex justify-between"
              style={{ marginBottom: "10px" }}
            >
              <span>Packaging & Handling</span>
              <span>₹{handling}</span>
            </div>
          </div>
          {showCoupon && (
            <div className="my-4 border-y border-dashed border-[#D79A43] py-3">
              <div
                className="flex h-10 items-center gap-2 rounded-md border border-[#E1B66F] bg-[#FFF7E9] px-2"
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  marginRight: "20px",
                  marginLeft: "20px",
                }}
              >
                <span className="text-[#C67A00]">%</span>

                <input
                  placeholder="Apply Coupon Code"
                  className="font-cormorant min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#806A55]"
                />

                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(true)}
                  className="font-cormorant rounded border border-[#0B6670] bg-[#DCEEEA] px-3 py-1 text-[14px] font-semibold text-[#0B6670]"
                  style={{ marginRight: "10px" }}
                >
                  {appliedCoupon ? "Applied" : "Apply"}
                </button>
              </div>
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
              <p className="font-cormorant text-[12px] text-[#5E4A35]">
                Total Amount
              </p>

              <p className="text-[20px] leading-none font-semibold text-[#0B6670]">
                ₹{total}
              </p>
            </div>
            <p
              className="font-cormorant mb-1 text-[10px] text-[#5E4A35]"
              style={{ marginRight: "200px", marginBottom: "9px" }}
            >
              (Inclusive of all Taxes)
            </p>
          </div>
        </div>
      </div>
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onApplyCoupon={(couponCode) => {
          setAppliedCoupon(couponCode);
        }}
      />
    </aside>
  );
}
