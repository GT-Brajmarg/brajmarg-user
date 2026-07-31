"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { setNotificationMethod } from "@/store/slices/subscriptionSlice";

const methods = [
  {
    id: "whatsapp",
    title: "Whatsapp",
    image: "/images/whatsapp.svg",
  },
  {
    id: "email",
    title: "Email",
    image: "/images/email.svg",
  },
  {
    id: "sms",
    title: "SMS",
    image: "/images/sms.svg",
  },
];

export default function NotificationMethod() {
  const [selected, setSelected] = useState("whatsapp");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setNotificationMethod(
        methods.find((method) => method.id === selected)?.title ?? "",
      ),
    );
  }, [dispatch]);

  return (
    <section className="rounded-[18px] border border-[#C37000] bg-[#C37000]/4 p-5">
      {/* Heading */}

      <h2
        className="font-cormorant text-[24px] leading-tight font-semibold text-[#0F5C66]"
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Choose how you want to receive notifications
      </h2>

      {/* Options */}

      <div
        className="mt-5 grid grid-cols-3 gap-3"
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "20px",
        }}
      >
        {methods.map((method) => {
          const active = selected === method.id;

          return (
            <button
              key={method.id}
              onClick={() => {
                setSelected(method.id);
                dispatch(setNotificationMethod(method.title));
              }}
              className={`relative flex flex-col items-center rounded-[12px] border p-4 transition-all duration-300 ${
                active
                  ? "border-[#0F5C66]"
                  : "border-[#D7B06B] hover:border-[#C37000]"
              }`}
              style={{ marginTop: "10px" }}
            >
              {/* Checkbox */}

              <div
                className={`absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-sm border ${
                  active ? "border-[#0F5C66] bg-[#0F5C66]" : "border-[#D7B06B]"
                }`}
              >
                {active && (
                  <Check size={12} strokeWidth={3} className="text-white" />
                )}
              </div>

              {/* Icon */}

              <Image
                src={method.image}
                alt={method.title}
                width={34}
                height={34}
                className="object-contain"
                style={{ marginTop: "10px" }}
              />

              {/* Label */}

              <span className="font-cormorant mt-3 text-[18px] font-semibold text-[#3D352F]">
                {method.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
