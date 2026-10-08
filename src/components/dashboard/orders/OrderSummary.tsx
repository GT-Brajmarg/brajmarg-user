"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  placedAt: string;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  address: string;
  phone: string;
}

export default function OrderSummary({
  placedAt,
  paymentMethod,
  paymentStatus,
  address,
  phone,
}: Props) {
  return (
    <section
      className="mt-6 rounded-[22px] border border-[#C37000]/63 p-6"
      style={{ marginTop: "20px", marginLeft: "40px", marginRight: "40px" }}
    >
      <div className="grid grid-cols-2 gap-8">
        {/* Left */}

        <div className="pr-8">
          <h3
            className={`${cormorantInfant.className} mb-5 text-[20px] font-bold text-[#3D352F]`}
            style={{ marginLeft: "20px", marginTop: "10px" }}
          >
            Order Summary
          </h3>

          <div className="space-y-5 border-r border-[#E9D5BC]">
            {/* Order Placed */}

            <div
              className="flex gap-3"
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              <Image src="/images/calendar.svg" alt="" width={18} height={18} />

              <div>
                <p
                  className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
                >
                  Order Placed
                </p>

                <p className="mt-1 text-[12px] text-[#3D352F]/86">{placedAt}</p>
              </div>
            </div>

            {/* Payment */}

            <div
              className="flex gap-3"
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              <Image
                src="/images/payment-1.svg"
                alt=""
                width={18}
                height={18}
              />

              <div>
                <p
                  className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
                >
                  Payment Method
                </p>

                <p className="mt-1 text-[12px] text-[#3D352F]/86">
                  {paymentMethod}
                </p>
              </div>
            </div>

            {/* Status */}

            <div
              className="flex gap-3"
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              <Image
                src="/images/check-circle-1.svg"
                alt=""
                width={18}
                height={18}
              />

              <div style={{ marginBottom: "10px" }}>
                <p
                  className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
                >
                  Payment Status
                </p>

                <p
                  className={`mt-1 text-[12px] font-medium ${
                    paymentStatus === "Paid"
                      ? "text-[#138808]"
                      : paymentStatus === "Pending"
                        ? "text-[#C37000]"
                        : "text-[#D64D32]"
                  }`}
                >
                  {paymentStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="pl-2">
          <div
            className="flex gap-3"
            style={{ marginRight: "20px", marginTop: "50px" }}
          >
            <Image
              src="/images/location.svg"
              alt=""
              width={18}
              height={18}
              style={{ marginTop: "-70px" }}
            />

            <div>
              <h3
                className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
              >
                Delivery Address
              </h3>

              <p className="e mt-2 text-[12px] leading-7 text-[#3D352F]/86">
                {address}
              </p>

              <p className="mt-3 text-[12px] text-[#3D352F]/86">{phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
