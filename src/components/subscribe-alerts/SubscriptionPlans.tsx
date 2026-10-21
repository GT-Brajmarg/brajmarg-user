"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setLoginModalOpen } from "@/store/slices/navSlice";

const plans = [
  {
    id: "monthly",
    title: "Monthly Alerts",
    image: "/images/monthly-alert.svg",
    price: "₹99",
    duration: "/month",
    saveBadge: null,
    button: "Subscribe Monthly",
    highlight: false,
    features: [
      "Festival & Ekadashi reminders",
      "Temple darshan timing alerts",
      "WhatsApp notifications",
      "Upcoming events calendar",
      "Weekly prasad availability alerts",
    ],
  },
  {
    id: "yearly",
    title: "Yearly Alerts",
    image: "/images/yearly-alert.svg",
    price: "₹799",
    duration: "/month",
    saveBadge: "Save ₹389",
    button: "Subscribe Yearly",
    highlight: true,
    features: [
      "Everything in Monthly Plan",
      "Exclusive festival updates",
      "Early access to seva bookings",
      "Exclusive yatra discounts (10%)",
      "Birthday & anniversary puja reminders",
      "Priority WhatsApp support",
    ],
  },
];

export default function SubscriptionPlans() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubscribe = (planId: string) => {
    const isLoggedIn = localStorage.getItem("brajmarg_is_logged_in") === "true";

    if (!isLoggedIn) {
      localStorage.setItem(
        "brajmarg_login_redirect",
        `/subscribe-alerts/temples?plan=${planId}`,
      );
      dispatch(setLoginModalOpen(true));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("open_login_modal"));
      }
      return;
    }

    router.push(`/subscribe-alerts/temples?plan=${planId}`);
  };

  return (
    <section className="relative px-4 pt-8 pb-0 md:px-8">
      {/* Heading */}
      <div className="mb-10 flex items-center justify-center gap-4">
        <Image src="/images/lotus.png" alt="" width={54} height={36} />
        <h2 className="font-cormorant text-[36px] font-bold text-[#0F5C66] md:text-[42px]">
          Simple &amp; Affordable Plans
        </h2>
        <Image src="/images/lotus.png" alt="" width={54} height={36} />
      </div>

      {/* Plan Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-[24px] border p-6 md:p-8 ${plan.highlight
              ? "border-[#D18418] bg-[#3D352F]/10"
              : "border-[#D8C4A8] bg-[#3D352F]/10"
              }`}
          >
            {/* Best Value Badge */}
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D18418] px-5 py-1 text-[12px] font-semibold text-white shadow-md">
                Best Value
              </div>
            )}

            {/* Header: icon + title */}
            <div className="flex items-center gap-3">
              <Image src={plan.image} alt={plan.title} width={28} height={28} />
              <h3
                className={`font-cormorant text-[28px] font-bold md:text-[32px] ${plan.highlight ? "text-[#C37000]" : "text-[#0F5C66]"
                  }`}
              >
                {plan.title}
              </h3>
            </div>

            {/* Price row */}
            <div className="mt-2 flex items-end gap-2">
              <span className="font-cormorant text-[64px] font-bold leading-none text-[#000000] md:text-[72px]">
                {plan.price}
              </span>
              <span className="font-cormorant mb-2 text-[18px] text-[#000000]">
                {plan.duration}
              </span>
              {plan.saveBadge && (
                <span className="font-cormorant mb-2 ml-3 text-[18px] text-[#0F5C66]">
                  {plan.saveBadge}
                </span>
              )}
            </div>

            {/* Features */}
            <div className="mt-4 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Image
                    src={
                      plan.highlight
                        ? "/images/check-circle-orange.svg"
                        : "/images/check-circle-blue.svg"
                    }
                    alt=""
                    width={22}
                    height={22}
                  />
                  <span
                    className={`font-cormorant text-[18px] md:text-[20px] ${plan.highlight ? "text-[#C37000]" : "text-[#0B6670]"
                      }`}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`font-cormorant h-[52px] w-full max-w-[500px] rounded-lg text-[20px] font-semibold text-[#EFDEC7] transition ${plan.highlight
                  ? "bg-[#D18418] hover:bg-[#BC7400]"
                  : "bg-[#0B6670] hover:bg-[#084E55]"
                  }`}
              >
                {plan.button} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
