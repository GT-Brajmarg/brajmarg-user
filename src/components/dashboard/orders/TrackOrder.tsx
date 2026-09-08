"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface TrackingStep {
  title: string;
  date: string;
  completed: boolean;
}

const steps = [
  {
    title: "Order Placed",
    date: "24 June 2026, 12:15 PM",
    status: "completed",
    icon: "/images/check.svg",
  },
  {
    title: "Order Packed",
    date: "24 June 2026, 05:45 PM",
    status: "current",
    icon: "/images/package.svg",
  },
  {
    title: "Shipped",
    date: "Expected June 31",
    status: "pending",
    icon: "/images/truck-1.svg",
  },
  {
    title: "Out for delivery",
    date: "Expected July 2",
    status: "pending",
    icon: "/images/delivery.svg",
  },
  {
    title: "Delivery",
    date: "Expected July 2",
    status: "pending",
    icon: "/images/delivered-1.svg",
  },
];

export default function TrackOrder() {
  return (
    <>
      <div
        className="relative mb-5 overflow-hidden rounded-[18px] border border-[#0F5C66] bg-[#0F5C66]/10 px-6 py-5"
        style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}
      >
        <Image
          src="/images/package-box.svg"
          alt=""
          width={85}
          height={69}
          className="absolute top-1/2 left-6 -translate-y-1/2"
        />

        <div className="ml-16" style={{ marginLeft: "150px" }}>
          <h3
            className={`${cormorantInfant.className} text-[20px] font-bold text-[#1E8C43]`}
          >
            Your order is on the way!
          </h3>

          <p
            className={`${cormorantInfant.className} text-[18px] leading-7 font-bold text-[#5F4B38]`}
          >
            We are preparing your order with
            <br />
            devotion and it will reach you soon.
          </p>
        </div>

        <Image
          src="/images/temple-outline-1.svg"
          alt=""
          width={160}
          height={90}
          className="absolute right-4 bottom-0"
        />
      </div>
      <section
        className="mt-6 rounded-[22px] border border-[#C37000]/64 p-8"
        style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}
      >
        <h2
          className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
          style={{ marginTop: "10px", marginLeft: "20px" }}
        >
          Order Tracking
        </h2>

        <div className="mt-8" style={{ marginTop: "10px", marginLeft: "20px" }}>
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex items-start gap-5 pb-12 last:pb-0"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              {/* Timeline */}
              <div className="relative flex w-[52px] justify-center">
                {index !== steps.length - 1 && (
                  <div className="absolute top-[44px] h-[72px] border-l border-dotted border-[#B8A68F]" />
                )}

                <div
                  className={`relative z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full border ${
                    step.status === "completed"
                      ? "border-[#0F7683] bg-[#D9EFF2]"
                      : step.status === "current"
                        ? "border-[#D98A11] bg-[#FFE8C5]"
                        : "border-[#B8AEA2] bg-[#DDD5C9]"
                  }`}
                >
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={22}
                    height={22}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="pt-[2px]">
                <h3
                  className={`${cormorantInfant.className} text-[20px] font-semibold text-[#3E2C1E]`}
                >
                  {step.title}
                </h3>

                <p className="mt-1 text-[15px] leading-none text-[#5F4B38]">
                  {step.date}
                </p>
              </div>
            </div>
          ))}
          <div
            className="mt-10 rounded-[18px] border border-[#D88C1A]"
            style={{
              marginLeft: "20px",
              marginRight: "40px",
              marginBottom: "20px",
            }}
          >
            <div
              className="grid grid-cols-3 divide-x divide-[#C37000]/24"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="py-5 text-center">
                <p
                  className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
                >
                  Estimated Delivery
                </p>

                <div className="mt-2 flex justify-center gap-2">
                  <Image
                    src="/images/calendar-1.svg"
                    alt=""
                    width={16}
                    height={16}
                  />

                  <span
                    className={`${cormorantInfant.className} text-[14px] font-bold text-[#3D352F]`}
                  >
                    2 July 2026
                  </span>
                </div>
              </div>

              <div className="py-5 text-center">
                <p
                  className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
                >
                  Courier Partner
                </p>

                <div className="mt-2 flex justify-center gap-2">
                  <Image
                    src="/images/truck-2.svg"
                    alt=""
                    width={16}
                    height={16}
                  />

                  <span
                    className={`${cormorantInfant.className} text-[14px] font-bold text-[#3D352F]`}
                  >
                    Delhivery
                  </span>
                </div>
              </div>

              <div className="py-5 text-center">
                <p
                  className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
                >
                  Tracking ID
                </p>

                <div className="mt-2 flex justify-center gap-2">
                  <Image
                    src="/images/id-card.svg"
                    alt=""
                    width={16}
                    height={16}
                  />

                  <span
                    className={`${cormorantInfant.className} text-[14px] font-bold text-[#3D352F]`}
                  >
                    DLY1265783546
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
