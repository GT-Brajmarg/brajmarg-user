"use client";

import Image from "next/image";
import { X, Check, Bell } from "lucide-react";
import { cormorant } from "@/lib/fonts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeSelectedTemple } from "@/store/slices/subscriptionSlice";

const ALERT_TITLES: Record<string, string> = {
  darshan: "Darshan Timings",
  festival: "Festival Alerts",
  aarti: "Aarti Reminders",
  yatra: "Yatra Updates",
  prasad: "Prasad Dispatch",
  seva: "Seva Availability",
};

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

  const allTemples = useAppSelector((state) => state.temples.temples);
  const dispatch = useAppDispatch();

  const isYearly = selectedPlan === "yearly";

  const getTempleLocation = (name: string) => {
    const found = allTemples.find((t) => t.name.toLowerCase() === name.toLowerCase());
    return found?.location || "";
  };

  return (
    <aside className="rounded-[18px] border border-[#C37000] bg-[#FAF3E8]/80 p-5 sm:p-4 shadow-xs">
      {/* Header */}
      <div className="flex flex-col items-center">
        <Image
          src="/images/lotus_bright.png"
          alt="Lotus"
          width={48}
          height={48}
          className="h-10 w-auto object-contain"
        />

        <h2 className={`${cormorant.className} text-center text-[23px] sm:text-[25px] font-bold text-[#0F5C66] mt-1`}>
          Your Subscription Summary
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        {/* Plan Row */}
        <div className="flex items-center justify-between border-b border-dashed border-[#D4B276]/70 pb-3.5">
          <div>
            <p className="font-cormorant text-[14px] text-[#6B5C4D]">
              Plan
            </p>
            <p className="font-cormorant text-[18px] font-bold text-[#2C241E] leading-tight">
              {isYearly ? "Yearly Alerts" : "Monthly Alerts"}
            </p>
          </div>

          <span className="font-cormorant text-[19px] font-bold text-[#C37000]">
            ₹ {isYearly ? 799 : 99}{" "}
            <span className="text-[14px] font-normal text-[#6B5C4D]">
              / {isYearly ? "year" : "month"}
            </span>
          </span>
        </div>

        {/* Billing Row */}
        <div className="flex items-center justify-between border-b border-dashed border-[#D4B276]/70 pb-3.5">
          <div>
            <p className="font-cormorant text-[14px] text-[#6B5C4D]">
              Billing
            </p>
            <p className="font-cormorant text-[17px] font-bold text-[#2C241E] leading-tight">
              {isYearly ? "Yearly" : "Monthly"}
            </p>
          </div>

          <span className="font-cormorant text-[12.5px] font-medium text-[#7A6A55]">
            Next renewal on 9 July 2027
          </span>
        </div>

        {/* Selected Temples */}
        <div className="border-b border-dashed border-[#D4B276]/70 pb-3.5">
          <h4 className="font-cormorant text-[17px] font-bold text-[#0F5C66]">
            Selected Temples ({selectedTemples.length})
          </h4>

          <div className="mt-2.5 space-y-2.5">
            {selectedTemples.map((temple) => {
              const location = getTempleLocation(temple);

              return (
                <div key={temple} className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-cormorant text-[15.5px] font-semibold text-[#2C241E] leading-tight">
                      {temple}
                      {location ? `, ${location}` : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch(removeSelectedTemple(temple))}
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5B876]/30 text-[#4A2F16] transition hover:bg-[#D4A35B] hover:text-white cursor-pointer"
                    aria-label={`Remove ${temple}`}
                  >
                    <X size={11} strokeWidth={2.5} />
                  </button>
                </div>
              );
            })}

            {selectedTemples.length === 0 && (
              <p className="font-cormorant text-[14px] text-[#8C7A68] italic">
                No temples selected yet
              </p>
            )}
          </div>
        </div>

        {/* Selected Alerts */}
        <div className="border-b border-dashed border-[#D4B276]/70 pb-3.5">
          <h4 className="font-cormorant text-[17px] font-bold text-[#0F5C66]">
            Selected Alerts ({updateTypes.length})
          </h4>

          <div className="mt-2 space-y-2">
            {updateTypes.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#0F5C66] bg-transparent">
                  <Check className="h-2.5 w-2.5 text-[#0F5C66]" strokeWidth={3} />
                </div>

                <span className="font-cormorant text-[15px] font-medium text-[#2C241E] leading-tight">
                  {ALERT_TITLES[item] || item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Method */}
        <div className="border-b border-dashed border-[#D4B276]/70 pb-3.5">
          <h4 className="font-cormorant text-[17px] font-bold text-[#0F5C66]">
            Notification Method
          </h4>

          <div className="mt-2 flex items-center gap-2">
            <Image
              src="/images/whatsapp.svg"
              alt=""
              width={18}
              height={18}
              className="object-contain"
            />
            <span className="font-cormorant text-[15.5px] font-medium text-[#2C241E]">
              {notificationMethod || "Whatsapp"}
            </span>
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="border-b border-dashed border-[#D4B276]/70 pb-3.5">
          <h4 className="font-cormorant text-[17px] font-bold text-[#0F5C66]">
            Notification Frequency
          </h4>

          <div className="mt-2 flex items-center gap-2">
            <Bell size={16} className="text-[#C37000]" />
            <span className="font-cormorant text-[15.5px] font-medium text-[#2C241E]">
              {frequency || "Every Update"}
            </span>
          </div>
        </div>

        {/* Language */}
        <div className="pb-1">
          <h4 className="font-cormorant text-[17px] font-bold text-[#0F5C66]">
            Language
          </h4>

          <div className="mt-2 flex items-center gap-2">
            <Image
              src="/images/language-both.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-cormorant text-[15.5px] font-medium text-[#2C241E]">
              {language === "Both" ? "Both English and Hindi" : language || "Both English and Hindi"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

