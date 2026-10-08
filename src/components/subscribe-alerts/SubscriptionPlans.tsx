"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/auth/LoginModal";
import { useState } from "react";

import { Check, BellRing } from "lucide-react";

const plans = [
  {
    id: "monthly",
    title: "Monthly Alerts",
    image: "/images/monthly-alert.svg",
    price: "₹99",
    duration: "/month",
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
  const [loginOpen, setLoginOpen] = useState(false);
  const handleSubscribe = (planId: string) => {
    const isLoggedIn = localStorage.getItem("brajmarg_is_logged_in") === "true";

    if (!isLoggedIn) {
      localStorage.setItem(
        "brajmarg_login_redirect",
        `/subscribe-alerts/temples?plan=${planId}`,
      );

      setLoginOpen(true);
      return;
    }

    router.push(`/subscribe-alerts/temples?plan=${planId}`);
  };
  return (
    <section className="relative py-6">
      {/* Heading */}
      <div
        className="mb-12 flex items-center justify-center gap-4"
        style={{ marginTop: "40px", marginBottom: "20px" }}
      >
        <Image src="/images/lotus.png" alt="" width={54} height={36} />

        <h2 className="font-cormorant text-[42px] font-bold text-[#0F5C66]">
          Simple & Affordable Plans
        </h2>

        <Image src="/images/lotus.png" alt="" width={54} height={36} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex min-h-[450px] flex-col rounded-[24px] border p-8 ${
              plan.highlight
                ? "border-[#D18418] bg-[#3D352F]/10"
                : "border-[#D8C4A8] bg-[#3D352F]/10"
            }`}
          >
            {/* Badge */}
            {plan.highlight && (
              <div className="absolute -top-3 right-70 rounded-full bg-[#D18418] px-4 py-1 text-xs font-semibold text-white shadow-md">
                <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                  Best Value
                </span>
              </div>
            )}

            {/* Header */}
            <div
              className="flex items-center gap-3"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              <Image src={plan.image} alt={plan.title} width={28} height={28} />

              <h3
                className={`font-cormorant text-[32px] font-bold ${
                  plan.highlight ? "text-[#C37000]" : "text-[#0F5C66]"
                }`}
              >
                {plan.title}
              </h3>
            </div>

            {/* Price */}
            <div
              className="flex items-end gap-2"
              style={{ marginLeft: "20px", marginTop: "-20px" }}
            >
              <span className="font-cormorant text-[60px] font-bold text-[#000000]">
                {plan.price}
              </span>

              <span className="font-cormorant mb-2 text-[18px] text-[#000000]">
                {plan.duration}
              </span>

              {plan.highlight && (
                <span className="font-cormorant mb-2 ml-4 text-[18px] text-[#0F5C66]">
                  Save ₹389
                </span>
              )}
            </div>

            {/* Features */}
            <div
              className="mt-8 flex-1 space-y-5"
              style={{ marginLeft: "10px", marginTop: "10px" }}
            >
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
                    className={`font-cormorant text-[22px] ${
                      plan.highlight ? "text-[#C37000]" : "text-[#0B6670]"
                    }`}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <div
              className="mt-auto flex justify-center"
              style={{ marginBottom: "20px" }}
            >
              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`font-cormorant h-[52px] w-full max-w-[500px] rounded-lg text-[20px] text-[#EFDEC7] transition ${
                  plan.highlight
                    ? "bg-[#D18418] hover:bg-[#BC7400]"
                    : "bg-[#0B6670] hover:bg-[#084E55]"
                }`}
              >
                {plan.button}
                <span className="ml-2" style={{ marginLeft: "10px" }}>
                  →
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
