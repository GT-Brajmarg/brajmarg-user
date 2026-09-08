"use client";

import Image from "next/image";
import { useState } from "react";
import { Cormorant_Infant, Inter } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

export default function PaymentDetailsCard() {
  const [selected, setSelected] = useState("razorpay");

  return (
    <section className="rounded-[16px] border border-[#C37000] bg-[#C37000]/4 p-5">
      {/* Header */}
      <div
        className="mb-5 flex items-center gap-2"
        style={{ marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}
      >
        <Image src="/images/payment.svg" alt="" width={36} height={36} />

        <h2
          className={`${cormorantInfant.className} text-[28px] font-semibold text-[#0F5C66]`}
        >
          Payment Details
        </h2>
      </div>

      {/* Online Payment */}
      <div
        className="mb-4 flex flex-col items-start gap-3 rounded-[16px] border border-[#C37000]"
        style={{
          marginLeft: "20px",
          marginTop: "10px",
          marginBottom: "10px",
          marginRight: "20px",
        }}
      >
        <div className="flex items-start gap-3">
          <Image
            src="/images/online-payment.svg"
            alt=""
            width={28}
            height={28}
            className="mt-1"
            style={{ marginLeft: "10px", marginTop: "20px" }}
          />

          <div style={{ marginTop: "10px" }}>
            <h3
              className={`${cormorantInfant.className} text-[28px] leading-none font-bold text-[#0F5C66]`}
            >
              Online Payment
            </h3>

            <p
              className={`${cormorantInfant.className} mt-1 text-[18px] text-[#3D352F]`}
            >
              Pay securely using Razorpay
            </p>
          </div>
        </div>
        <button
          onClick={() => setSelected("razorpay")}
          className="w-[710px] rounded-[14px] border border-[#C37000] p-5 text-left transition hover:bg-[#FDF6EC]"
          style={{ marginLeft: "20px" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              {/* Radio */}
              <div
                className={`mt-2 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selected === "razorpay"
                    ? "border-[#D18418]"
                    : "border-[#D89A3D]"
                }`}
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                {selected === "razorpay" && (
                  <div className="h-3 w-3 rounded-full bg-[#D18418]" />
                )}
              </div>

              {/* Text */}
              <div>
                <h3
                  className={`${cormorantInfant.className} text-[22px] font-bold text-[#0F5C66]`}
                >
                  Razorpay
                </h3>

                <p
                  className={`${cormorantInfant.className} mt-1 text-[18px] leading-6 text-[#3D352F]`}
                  style={{ marginBottom: "10px" }}
                >
                  UPI, Net Banking, Credit/Debit Card,
                  <br />
                  Wallets and more
                </p>
              </div>
            </div>

            <Image
              src="/images/razorpay-logo.png"
              alt="Razorpay"
              width={170}
              height={56}
              style={{ marginRight: "30px" }}
            />
          </div>
        </button>

        {/* Security */}
        <div
          className="mt-5 rounded-[14px] border border-[#0F5C66] bg-[#0F5C66]/10 px-5 py-4"
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          <div className="flex items-center gap-4">
            <Image
              src="/images/shield.svg"
              alt=""
              width={32}
              height={32}
              style={{ marginLeft: "20px" }}
            />

            <p
              className={`${cormorantInfant.className} text-[24px] leading-8 text-[#0F5C66]`}
            >
              You will be redirected to Razorpay's secure payment gateway to
              complete your payment.
            </p>
          </div>
        </div>
      </div>

      {/* Razorpay Card */}
    </section>
  );
}
