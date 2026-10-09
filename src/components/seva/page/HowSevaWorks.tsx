"use client";

import Image from "next/image";
import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  HandHelping,
  LucideIcon,
  ArrowRight,
  HandHeart,
  HeartHandshake,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
};

const steps: Step[] = [
  {
    icon: CalendarDays,
    title: "Choose Seva",
    description: "Select the seva you wish to offer",
  },
  {
    icon: ClipboardList,
    title: "Provide Details",
    description: "Enter your name, gotra and preferred date",
  },
  {
    icon: CreditCard,
    title: "Make Payment",
    description: "Complete secure payment online",
  },
  {
    icon: HandHelping,
    title: "Seva Performed",
    description: "Our priests perform your seva in the temple",
  },
  {
    icon: HeartHandshake,
    title: "Receive Blessings",
    description: "Receive prasad and updates of your seva",
  },
];
export default function HowSevaWorks() {
  return (
    <section
      className="py-14"
      style={{ marginTop: "60px", marginBottom: "40px" }}
    >
      {/* Heading */}

      <div
        className="mb-12 flex items-center justify-center gap-3"
        style={{ marginBottom: "20px" }}
      >
        <Image src="/images/lotus.png" alt="" width={54} height={36} />

        <h2 className="font-cormorant text-[36px] font-semibold text-[#0F5C66]">
          How Seva Works
        </h2>

        <Image src="/images/lotus.png" alt="" width={54} height={36} />
      </div>

      {/* Steps */}

      <div className="mx-auto flex max-w-[1180px] items-start justify-between">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-1 items-start justify-center"
          >
            <div className="flex flex-col items-center text-center">
              {/* Circle */}

              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-[#C37000] bg-[#C37000]/20">
                {step.image ? (
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={55}
                    height={55}
                  />
                ) : step.icon ? (
                  <step.icon
                    className="h-14 w-14 text-[#0F5C66]"
                    strokeWidth={2}
                  />
                ) : null}
              </div>

              {/* Title */}

              <h3 className="font-cormorant mt-5 text-[22px] font-semibold text-[#0F5C66]">
                {step.title}
              </h3>

              {/* Description */}

              <p
                className="mt-2 max-w-[180px] text-[16px] leading-5 text-[#3D352F]"
                style={{ fontWeight: "500" }}
              >
                {step.description}
              </p>
            </div>

            {/* Arrow */}

            {index < steps.length - 1 && (
              <div
                className="mt-[48px] flex w-[90px] items-center justify-center"
                style={{ marginTop: "40px" }}
              >
                <ArrowRight
                  size={44}
                  strokeWidth={2.5}
                  className="text-[#C37000]"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
