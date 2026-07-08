"use client";

import {
  Circle,
  CreditCard,
  Earth,
  HandCoins,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

type PaymentMethodProps = {
  paymentMethod: "razorpay" | "cod";
  setPaymentMethod: (method: "razorpay" | "cod") => void;
};

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodProps) {
  return (
    <section className="min-h-[660px] rounded-[18px] border border-[#D79A43] bg-[#FFF9F0] p-5 shadow-[0_8px_22px_rgba(173,111,30,0.10)]">
      <h2
        className="font-cormorant flex items-center gap-2 text-[25px] font-semibold text-[#0B6670]"
        style={{ marginLeft: "20px", marginTop: "10px" }}
      >
        <WalletCards size={21} className="text-[#C67A00]" />
        Payment Method
      </h2>

      {/* Online Payment */}
      <div
        className="mt-5 rounded-[12px] border border-[#E5C58D] bg-[#FFF7E9] p-4"
        style={{ marginLeft: "20px", marginRight: "20px", marginTop: "10px" }}
      >
        <div className="flex items-center gap-2" style={{ marginTop: "5px" }}>
          <Earth
            size={14}
            className="text-[#0B6670]"
            style={{ marginLeft: "10px" }}
          />

          <div>
            <p className="font-cormorant text-[17px] font-semibold text-[#0B6670]">
              Online Payment
            </p>

            <p className="font-cormorant text-[12px] text-[#6C543C]">
              Pay securely using Razorpay
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaymentMethod("razorpay")}
          className={`mt-4 ml-5 flex w-[calc(100%-40px)] items-center justify-between overflow-hidden rounded-[10px] border p-4 text-left transition ${
            paymentMethod === "razorpay"
              ? "border-[#D79A43] bg-[#FFFDF8]"
              : "border-[#E8CDA6] bg-[#FFF9F0]"
          }`}
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full border border-[#D18416]"
              style={{
                marginLeft: "10px",
              }}
            >
              {paymentMethod === "razorpay" && (
                <span className="h-2.5 w-2.5 rounded-full bg-[#D18416]" />
              )}
            </span>

            <div>
              <p
                className="font-cormorant text-[16px] font-semibold text-[#0B6670]"
                style={{
                  marginTop: "5px",
                }}
              >
                Razorpay
              </p>

              <p
                className="font-cormorant text-[11px] text-[#6C543C]"
                style={{
                  marginBottom: "5px",
                }}
              >
                UPI, Net Banking, Credit/Debit Card, Wallets and more
              </p>
            </div>
          </div>

          <span
            className="font-serif text-[20px] font-bold text-[#155BB5] italic"
            style={{
              marginRight: "20px",
            }}
          >
            Razorpay
          </span>
        </button>

        <div
          className="mt-4 flex gap-3 rounded-[9px] border border-[#9AC5B9] bg-[#EAF5F0] p-4"
          style={{
            marginTop: "5px",
            marginRight: "20px",
            marginLeft: "20px",
            marginBottom: "10px",
          }}
        >
          <ShieldCheck
            size={20}
            className="shrink-0 text-[#0B6670]"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />

          <p
            className="font-cormorant text-[13px] leading-tight text-[#0B6670]"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            You will be redirected to Razorpay&apos;s secure payment gateway to
            complete your payment.
          </p>
        </div>
      </div>

      {/* Offline Payment */}
      <div
        className="mt-4 rounded-[12px] border border-[#E5C58D] bg-[#FFF7E9] p-4"
        style={{ marginLeft: "20px", marginRight: "20px", marginTop: "10px" }}
      >
        <div className="flex items-center gap-2" style={{ marginTop: "5px" }}>
          <CreditCard
            size={14}
            className="text-[#0B6670]"
            style={{ marginLeft: "10px" }}
          />

          <div>
            <p className="font-cormorant text-[17px] font-semibold text-[#0B6670]">
              Offline Payment
            </p>

            <p className="font-cormorant text-[12px] text-[#6C543C]">
              Pay when your order is delivered
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaymentMethod("cod")}
          className={`mt-4 ml-5 flex w-[calc(100%-40px)] items-center justify-between overflow-hidden rounded-[10px] border p-4 text-left transition ${
            paymentMethod === "cod"
              ? "border-[#D79A43] bg-[#FFFDF8]"
              : "border-[#E8CDA6] bg-[#FFF9F0]"
          }`}
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full border border-[#D18416]"
              style={{
                marginLeft: "10px",
              }}
            >
              {paymentMethod === "cod" && (
                <span className="h-2.5 w-2.5 rounded-full bg-[#D18416]" />
              )}
            </span>

            <div>
              <p
                className="font-cormorant text-[16px] font-semibold text-[#0B6670]"
                style={{
                  marginTop: "5px",
                }}
              >
                Cash on Delivery (COD)
              </p>

              <p
                className="font-cormorant text-[11px] text-[#6C543C]"
                style={{
                  marginBottom: "5px",
                }}
              >
                Pay in cash when your order is delivered
              </p>
            </div>
          </div>

          <HandCoins
            size={25}
            className="text-[#0B6670]"
            style={{
              marginRight: "20px",
            }}
          />
        </button>
      </div>

      {/* Secure note */}
      <div
        className="mt-28 flex items-center gap-3 rounded-[9px] border border-[#D79A43] bg-[#FCE8C6] p-4"
        style={{
          marginTop: "10px",
          marginRight: "20px",
          marginLeft: "20px",
          marginBottom: "10px",
        }}
      >
        <ShieldCheck
          size={22}
          className="shrink-0 text-[#0B6670]"
          style={{
            marginLeft: "10px",
            marginTop: "10px",
          }}
        />

        <p
          className="font-cormorant text-[16px] text-[#0B6670]"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Your payments are 100% safe and secure
        </p>
      </div>
    </section>
  );
}
