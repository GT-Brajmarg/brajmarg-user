"use client";

import Link from "next/link";
import {
  Check,
  Copy,
  Download,
  Gem,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import CheckoutHeader from "../CheckoutHeader";
import OrderSummary from "../OrderSummary";
import TrustFeatures from "../TrustFeatures";
import type { CheckoutProps } from "../types";
import Image from "next/image";

type OrderConfirmationPageProps = CheckoutProps & {
  orderId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  paymentMethod?: string;
};

export default function OrderConfirmationPage({
  items,
  orderId = "BM2502267894",
  customerName = "Rahul Sharma",
  customerEmail = "rahul.sharma@email.com",
  customerPhone = "+91 98765 43210",
  paymentMethod = "Razorpay",
}: OrderConfirmationPageProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = 49;
  const handling = 49;
  const discount = 300;
  const total = subtotal + shipping + handling - discount;

  const copyOrderId = async () => {
    await navigator.clipboard.writeText(orderId);
  };

  return (
    <section className="relative overflow-hidden bg-[#FBF5EB]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.055]">
        {/* <div
          className="h-full w-full bg-center bg-repeat"
          style={{
            backgroundImage: "url('/images/mandala-pattern.svg')",
            backgroundSize: "650px",
          }}
        /> */}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        {/* <CheckoutHeader
          title=""
          subtitle=""
          backHref="/"
          backLabel="Back to Home"
        /> */}

        <div className="mx-auto">
          {/* Confirmation hero */}
          <section className="relative overflow-hidden rounded-[22px] px-6 py-8 text-center">
            <div className="absolute top-5 left-4 hidden opacity-80 md:block">
              <img
                src="/images/radha-krishna.png"
                alt=""
                className="h-[250px] w-[250px] object-contain"
              />
            </div>

            <div className="absolute top-1 right-8 hidden opacity-70 md:block">
              <img
                src="/images/temple-bell.png"
                alt=""
                className="h-[185px] w-[150px] object-contain"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <p
                className="font-cormorant mt-10 text-[17px] text-[#503A27]"
                style={{ marginTop: "40px" }}
              >
                Jai Shri Radhe! 🙏
              </p>

              <h1 className="font-cormorant mt-1 text-[34px] leading-none font-semibold text-[#0B6670]">
                Your Order is Confirmed!
              </h1>

              <p className="font-cormorant mt-2 text-[15px] text-[#5E4A35]">
                Thank you for your order. Your devotion is with us.
              </p>

              <div
                className="mt-3 flex w-full items-center justify-center gap-3"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <div className="h-px w-16 bg-[#D7B06B]" />

                <Image
                  src="/images/lotus.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-[22px] w-[30px] object-contain"
                />

                <div className="h-px w-16 bg-[#D7B06B]" />
              </div>

              <div className="mt-5 flex w-full max-w-[280px] flex-col items-center rounded-[10px] border border-[#D79A43] bg-[#FFF2DB] px-4 py-3 text-center">
                <p className="font-cormorant text-[14px] text-[#5E4A35]">
                  Order ID
                </p>

                <div className="flex items-center justify-center gap-2">
                  <p className="font-cormorant text-[18px] font-semibold text-[#0B6670]">
                    {orderId}
                  </p>

                  <button
                    type="button"
                    onClick={copyOrderId}
                    aria-label="Copy order ID"
                    className="flex h-6 w-6 shrink-0 items-center justify-center text-[#0B6670]"
                  >
                    <Copy size={15} />
                  </button>
                </div>

                <p className="font-cormorant mt-1 text-[11px] text-[#6C543C]">
                  Placed on 24 June 2026, 12:15 PM
                </p>
              </div>

              <p
                className="font-cormorant mt-4 text-[12px] text-[#5E4A35]"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                We&apos;ve sent the order details to {customerEmail} and{" "}
                {customerPhone}
              </p>
            </div>
          </section>

          <section className="mt-4 grid overflow-hidden rounded-[12px] bg-[#0B6670] text-white sm:grid-cols-4">
            <StatusItem
              icon={<Gem size={25} />}
              title="Your devotion is our priority."
              description="We are preparing your order with care and blessings."
              large
            />
            <StatusItem
              icon={<ShieldCheck size={22} />}
              title="Authentic"
              description="from Temples"
            />
            <StatusItem
              icon={<PackageCheck size={22} />}
              title="Packed"
              description="with Care"
            />
            <StatusItem
              icon={<Truck size={22} />}
              title="Delivered"
              description="with Blessings"
            />
          </section>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
            {/* Order Summary */}
            <div
              className="rounded-[16px] bg-[#FFF9F0] p-1 shadow-[0_8px_22px_rgba(173,111,30,0.10)]"
              style={{ marginTop: "20px", marginBottom: "10px" }}
            >
              <OrderSummary items={items} showCoupon={false} />
              <button
                type="button"
                className="font-cormorant flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#0B6670] px-4 text-[16px] font-semibold text-white transition hover:bg-[#084F57]"
                style={{ marginTop: "10px" }}
              >
                <Download size={15} />
                Download Invoice
              </button>

              {/* <div className="mx-5 mb-4 flex justify-end"></div> */}
            </div>

            {/* Details */}
            <div className="space-y-3" style={{ marginTop: "20px" }}>
              <InfoCard
                icon={<MapPin size={19} />}
                title="Delivery Address"
                content={
                  <>
                    <p>123, Govardhan Marg,</p>
                    <p>Vaishali Nagar,</p>
                    <p>Jaipur, Rajasthan - 403450</p>
                    <p>+91 76583 56789</p>
                  </>
                }
              />

              <InfoCard
                icon={<Check size={19} />}
                title="Payment Details"
                content={
                  <>
                    <p>Paid using {paymentMethod}</p>
                    <p className="font-cormorant text-[24px] font-semibold text-[#0B6670]">
                      ₹{total}
                    </p>
                  </>
                }
              />

              <InfoCard
                icon={<Gem size={19} />}
                title="A small note of gratitude"
                content={
                  <p style={{ fontSize: "14px" }}>
                    Every order you place supports temple seva, preserves our
                    spiritual heritage and helps spread devotion.
                    <br />
                    Thank you for being a part of Brajmarg. 🙏
                  </p>
                }
              />

              <div className="rounded-[14px] border border-[#D79A43] bg-[#FFF9F0] p-4">
                <h3
                  className="font-cormorant text-[18px] font-semibold text-[#0B6670]"
                  style={{ marginLeft: "20px", marginTop: "10px" }}
                >
                  Want to track your order?
                </h3>

                <p
                  className="font-cormorant mt-1 text-[15px] leading-tight text-[#5E4A35]"
                  style={{ marginLeft: "20px" }}
                >
                  View live order status, seva bookings, and delivery progress
                  from your account dashboard.
                </p>

                <div
                  className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <Link
                    href="/orders"
                    className="font-cormorant flex h-[50px] w-full items-center justify-center rounded-md border border-[#0B6670] px-4 text-[16px] font-semibold text-[#0B6670] transition hover:bg-[#EAF5F0]"
                  >
                    Track Order
                  </Link>

                  <Link
                    href="/shop"
                    className="font-cormorant flex h-[50px] w-full items-center justify-center gap-2 rounded-md bg-[#0B6670] px-4 text-[16px] font-semibold text-white transition hover:bg-[#084F57]"
                  >
                    Continue Shopping
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom blessing */}
          <section
            className="mt-[60px] grid min-h-[88px] grid-cols-[130px_1fr_130px] items-center overflow-hidden rounded-[14px] border border-[#E4C58C] bg-[#FCE8C6] text-center"
            style={{ marginBottom: "20px", marginTop: "60px" }}
          >
            <div className="flex h-full items-end justify-center px-6">
              <Image
                src="/images/temple-blessing.png"
                alt=""
                width={155}
                height={120}
                className="h-[100px] w-auto object-contain object-bottom"
              />
            </div>

            <div className="text-central px-5 py-3">
              <p className="font-cormorant text-[14px] leading-tight text-[#0B6670]">
                May this order bring happiness and
                <br />
                blessings to you and your family.
              </p>

              <p
                className="font-cormorant mt-1 text-[20px] leading-none font-semibold text-[#0B6670]"
                style={{ marginTop: "10px" }}
              >
                Radhe Radhe! 🌸
              </p>
            </div>

            <div className="flex h-full items-center justify-center px-3">
              <Image
                src="/images/diya-blessing.png"
                alt=""
                width={105}
                height={70}
                className="h-[100px] w-auto object-contain"
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function StatusItem({
  icon,
  title,
  description,
  large = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  large?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 ${
        large ? "sm:col-span-1" : ""
      }`}
      style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "40px" }}
    >
      <div className="shrink-0 text-[#F6C15B]">{icon}</div>

      <div>
        <p className="font-cormorant text-[13px] font-semibold">{title}</p>
        <p className="font-cormorant text-[10px] leading-tight text-[#E3F1EB]">
          {description}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <section
      className="rounded-[14px] border border-[#D79A43] bg-[#FFF9F0] p-4"
      style={{ marginBottom: "20px" }}
    >
      <h3
        className="font-cormorant flex items-center gap-2 text-[18px] font-semibold text-[#0B6670]"
        style={{ marginLeft: "10px", marginTop: "10px" }}
      >
        <span className="text-[#C67A00]">{icon}</span>
        {title}
      </h3>

      <div
        className="font-cormorant mt-2 text-[13px] leading-tight text-[#5E4A35]"
        style={{ marginLeft: "40px", marginBottom: "10px" }}
      >
        {content}
      </div>
    </section>
  );
}
