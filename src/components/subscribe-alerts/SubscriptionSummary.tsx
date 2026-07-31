"use client";

import Image from "next/image";
import { X, Check } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeSelectedTemple } from "@/store/slices/subscriptionSlice";

export default function SubscriptionSummary() {
  const {
    selectedPlan,
    selectedTemples,
    updateTypes,
    notificationMethod,
    frequency,
    language,
    plans,
  } = useAppSelector((state) => state.subscriptions);

  const dispatch = useAppDispatch();

  const currentPlan = plans.find((plan) => plan.name === selectedPlan);

  return (
    <aside className="min-h-[840px] overflow-hidden rounded-[18px] border border-[#C37000] bg-[#C37000]/4 p-6 shadow-sm">
      {/* Heading */}

      <div className="flex flex-col items-center" style={{ marginTop: "20px" }}>
        <Image
          src="/images/lotus.png"
          alt="Lotus"
          width={65}
          height={56}
          className="mb-2"
        />

        <h2
          className={`${cormorantInfant.className} text-center text-[28px] font-bold text-[#0F5C66]`}
        >
          Subscription Summary
        </h2>
      </div>

      <div className="mt-6 space-y-6">
        {/* Plan */}

        <SummaryItem title="">
          <div
            className="flex w-[360px] items-center justify-between border-b border-dashed border-[#C37000] pb-2"
            style={{ marginLeft: "10px", marginRight: "20px" }}
          >
            <div>
              <p
                className={`${cormorantInfant.className} text-[22px] font-semibold text-[#3D352F]`}
              >
                Plan
              </p>
              <p
                className={`${cormorantInfant.className} text-[16px] text-[#7B5B3A]`}
              >
                {selectedPlan}
              </p>
            </div>
            <span
              className={`${cormorantInfant.className} text-[22px] font-semibold text-[#C37000]`}
            >
              ₹ {selectedPlan === "yearly" ? 799 : 99}{" "}
              <span className="text-[16px] font-normal">
                / {selectedPlan === "yearly" ? "year" : "month"}
              </span>
            </span>
          </div>
        </SummaryItem>
        {/* Temples */}

        <SummaryItem title={`Selected Temples (${selectedTemples.length}) `}>
          <div
            className="border-b border-dashed border-[#E7C9A3] pb-3"
            style={{
              marginLeft: "10px",
              marginRight: "20px",
              marginBottom: "2px",
            }}
          >
            {selectedTemples.map((temple, index) => (
              <div
                key={temple}
                className={`flex items-center justify-between ${
                  index !== selectedTemples.length - 1 ? "mb-3" : ""
                }`}
              >
                <div>
                  <p
                    className={`${cormorantInfant.className} text-[20px] leading-[1.2] font-bold text-[#4A2F16]`}
                  >
                    {temple}
                  </p>
                  {/* <p
                    className={`${cormorantInfant.className} text-[18px] font-bold text-[#8A7256]`}
                  >
                  {temp}
                  </p> */}
                </div>

                <button
                  type="button"
                  onClick={() => dispatch(removeSelectedTemple(temple))}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8C48A] text-[#3D2A16] transition hover:bg-[#DDB26C]"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </SummaryItem>

        {/* Alerts */}

        <SummaryItem title={`Selected Alerts (${updateTypes.length})`}>
          <div
            className="border-b border-dashed border-[#E7C9A3] pb-4"
            style={{
              marginLeft: "10px",
              marginRight: "20px",
            }}
          >
            {updateTypes.map((item, index) => (
              <div
                key={item}
                className={`flex items-center gap-2 ${
                  index !== updateTypes.length - 1 ? "mb-2" : ""
                }`}
                style={{ marginTop: "4px" }}
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#0F5C66]">
                  <Check className="h-3 w-3 text-[#0F5C66]" strokeWidth={2.5} />
                </div>

                <span
                  className={`text-[16px] leading-none text-[#3D352F]`}
                  style={{ fontWeight: "300" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </SummaryItem>

        {/* Method */}

        <SummaryItem title="Notification Method">
          <div
            className="border-b border-dashed border-[#E7C9A3] pb-3"
            style={{
              marginLeft: "10px",
              marginRight: "20px",
            }}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/images/whatsapp.svg"
                alt="WhatsApp"
                width={24}
                height={24}
              />

              <span
                className={`${cormorantInfant.className} text-[20px] font-medium text-[#4A2F16]`}
              >
                {notificationMethod}
              </span>
            </div>
          </div>
        </SummaryItem>
        {/* Frequency */}
        {/* Frequency */}
        <SummaryItem title="Frequency">
          <div
            className="border-b border-dashed border-[#E7C9A3] pb-3"
            style={{
              marginLeft: "10px",
              marginRight: "20px",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D18418]" />

              <span
                className={`${cormorantInfant.className} text-[20px] text-[#4A2F16]`}
              >
                {frequency}
              </span>
            </div>
          </div>
        </SummaryItem>

        {/* Language */}
        <SummaryItem title="Language">
          <div className="pb-3">
            <div
              className="flex items-center gap-2"
              style={{
                marginLeft: "10px",
                marginRight: "20px",
              }}
            >
              <Image
                src="/images/language-both.png"
                alt="Language"
                width={34}
                height={34}
              />

              <span
                className={`${cormorantInfant.className} text-[20px] text-[#4A2F16]`}
              >
                {language}
              </span>
            </div>
          </div>
        </SummaryItem>
      </div>
    </aside>
  );
}

/* ---------- Components ---------- */

function SummaryItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4
        className="font-cormorant text-[20px] font-semibold text-[#0F5C66]"
        style={{ marginLeft: "10px", marginTop: "10px" }}
      >
        {title}
      </h4>

      <div className="mt-3" style={{ marginBottom: "5px" }}>
        {children}
      </div>
    </div>
  );
}

function Tag({
  children,
  removable = false,
  color = "gold",
}: {
  children: React.ReactNode;
  removable?: boolean;
  color?: "gold" | "orange" | "blue";
}) {
  const styles = {
    gold: "bg-[#F7E5C7] border-[#D7B06B] text-[#7C5B29]",
    orange: "bg-[#FFF2DE] border-[#C37000] text-[#C37000]",
    blue: "bg-[#E8F5F6] border-[#0F5C66] text-[#0F5C66]",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 ${styles[color]}`}
    >
      <span className="font-cormorant text-[16px]">{children}</span>

      {removable && (
        <button>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
