"use client";

import Image from "next/image";
import {
  ArrowRight,
  Bus,
  UtensilsCrossed,
  Bed,
  Landmark,
  Headset,
  LucideIcon,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    image: "/images/comfortable-travel-1.svg",
    title: "Comfortable\nTravel",
    description: "Spacious vehicles\nfor a peaceful\njourney",
  },
  {
    image: "/images/satvik-meals-1.svg",
    title: "Satvik\nMeals",
    description: "Pure satvik food\narranged throughout\nthe yatra",
  },
  {
    image: "/images/peaceful-stay.svg",
    title: "Peaceful\nStay",
    description: "Clean, comfortable\n& hygienic\naccommodations",
  },
  {
    image: "/images/temple-darshan.svg",
    title: "Temple\nDarshan",
    description: "Planned darshan\nat revered\ntemples",
  },
  {
    image: "/images/experienced-assistance.svg",
    title: "Experienced\nAssistance",
    description: "Dedicated team\nwith you\nat every step",
  },
];

export default function WhyTravelWithUs() {
  return (
    <section
      className="relative py-16"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      {/* Heading */}

      <div className="mb-12 flex items-center justify-center gap-3">
        <Image src="/images/lotus.png" alt="" width={52} height={36} />

        <h2 className="font-cormorant text-[38px] font-semibold text-[#0B6670]">
          Your Journey, Taken Care Of
        </h2>

        <Image src="/images/lotus.png" alt="" width={52} height={36} />
      </div>

      {/* Features */}

      <div
        className="mx-auto flex max-w-[1220px] items-start justify-between"
        style={{ marginTop: "20px" }}
      >
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="flex flex-1 items-start justify-center"
          >
            <div className="flex flex-col items-center text-center">
              {/* Circle */}

              <div className="flex h-[128px] w-[128px] items-center justify-center rounded-full border-2 border-[#C37000] bg-[#C37000]/20 transition duration-300 hover:bg-[#FDF0DA]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>

              {/* Title */}

              <h3
                className="font-cormorant mt-5 text-[32px] leading-7 font-semibold whitespace-pre-line text-[#0F5C66]"
                style={{ marginTop: "20px" }}
              >
                {feature.title}
              </h3>

              {/* Description */}

              <p
                className="mt-2 text-[18px] leading-5 whitespace-pre-line text-[#3D352F]"
                style={{ marginTop: "20px" }}
              >
                {feature.description}
              </p>
            </div>

            {/* Arrow */}

            {index < features.length - 1 && (
              <div className="mt-[48px] flex w-[90px] items-center justify-center">
                <Image
                  src="/images/arrow-right.svg"
                  alt="Next"
                  width={42}
                  height={42}
                  className="object-contain"
                  style={{ marginTop: "40px" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
