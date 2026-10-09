"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Step = {
  title: string;
  description: string;
  image: string;
};

const steps: Step[] = [
  {
    image: "/images/choose-plan.svg",
    title: "Choose a Plan",
    description: "Pick the plan that suits you best.",
  },
  {
    image: "/images/select-temples.svg",
    title: "Select Your Temples",
    description: "Follow one or more temples of your choice.",
  },
  {
    image: "/images/customize-alerts.svg",
    title: "Customize Alerts",
    description: "Choose what updates and how you want to receive them.",
  },
  {
    image: "/images/receive-updates.svg",
    title: "Receive Updates",
    description: "Get timely alerts wherever you are, always.",
  },
];

export default function HowAlertsWork() {
  return (
    <section className="py-16" style={{ marginBottom: "30px" }}>
      {/* Heading */}
      <div
        className="mb-14 flex items-center justify-center gap-3"
        style={{ marginTop: "40px", marginBottom: "20px" }}
      >
        <Image src="/images/lotus.png" alt="" width={42} height={42} />

        <h2 className="font-cormorant text-[38px] font-semibold text-[#0B6670]">
          How It Works
        </h2>

        <Image src="/images/lotus.png" alt="" width={42} height={42} />
      </div>

      {/* Steps */}
      <div className="mx-auto flex max-w-[1150px] items-start justify-between">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-1 items-start justify-center"
          >
            <div className="flex flex-col items-center text-center">
              {/* Circle */}
              <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full border-[2px] border-[#C37000] bg-[#C37000]/20">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-cormorant mt-5 text-[24px] font-semibold text-[#0F5C66]">
                {step.title}
              </h3>

              {/* Divider */}

              {/* Description */}
              <p className="font-cormorant max-w-[170px] text-[16px] leading-[1.35] text-[#3D352F]">
                {step.description}
              </p>
            </div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div
                className="mt-[42px] flex w-[70px] items-center justify-center"
                style={{ marginTop: "50px", marginLeft: "10px" }}
              >
                <Image
                  src="/images/arrow-right.svg"
                  alt=""
                  width={42}
                  height={18}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
