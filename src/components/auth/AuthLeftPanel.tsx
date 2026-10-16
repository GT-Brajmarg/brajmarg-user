"use client";

import Image from "next/image";
import {
  Bell,
  IndianRupee,
  CreditCard,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const FEATURES = [
  {
    icon: Bell,
    title: "Notifications",
    subtitle: "Alerts",
  },
  {
    icon: IndianRupee,
    title: "Pricing",
    subtitle: "Details",
  },
  {
    icon: CreditCard,
    title: "Secure",
    subtitle: "Payments",
  },
  {
    icon: ShieldCheck,
    title: "Temple",
    subtitle: "Updates",
  },
  {
    icon: Users,
    title: "Devotee",
    subtitle: "Support",
  },
];

export default function AuthLeftPanel() {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden border-r border-[#E6D3B5] bg-[#F4E6CD]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,.35), transparent 40%),
          radial-gradient(circle at 100% 100%, rgba(214,171,93,.12), transparent 45%),
          url('/images/paper-texture.png')
        `,
        backgroundSize: "cover",
      }}
    >
      {/* Decorative Glow */}
      <div className="absolute -top-20 -left-10 h-60 w-60 rounded-full bg-[#D9A95E]/15 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#0D6971]/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-6 pt-7 pb-0">
        {/* Lotus */}
        <Image
          src="/images/yellow-dark.png"
          alt="Lotus"
          width={42}
          height={42}
          className="object-contain"
        />

        {/* Heading */}
        <p className="mt-2 text-[16px] text-[#6C5A45]">Welcome to</p>

        <h1
          className={`${cormorant.className} text-[46px] xl:text-[50px] leading-tight font-semibold text-[#0C6971]`}
        >
          Brajmarg
        </h1>

        <div className="my-2 h-[24px] w-[170px]">
          <Image
            src="/images/brajmarg-divider.png"
            alt="Divider"
            width={950}
            height={50}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Description */}
        <p
          className={`${cormorant.className} mt-1 max-w-[270px] text-center text-[16px] xl:text-[17px] leading-relaxed text-[#6C5A45]`}
        >
          Login or Sign Up to book sevas,
          <br />
          order prasad and experience
          <br />
          divine blessings.
        </p>

        {/* Temple Illustration */}
        <div className="relative mt-auto flex h-[200px] xl:h-[230px] w-full items-end justify-center">
          <Image
            src="/images/login-temple.png"
            alt="Temple"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div className="relative z-10 border-t border-[#E6D3B5] bg-[#F7EAD5]/95 px-3 py-3 backdrop-blur-sm">
        <div className="flex items-start justify-between">
          {FEATURES.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex flex-1 flex-col items-center text-center px-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9B67A] bg-[#FFF7EB] shadow-xs">
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className="text-[#D08A2F]"
                  />
                </div>

                <span className="mt-1.5 text-[10px] leading-tight font-medium text-[#6B5946]">
                  {item.title}
                </span>

                <span className="text-[9.5px] leading-tight text-[#8A7864]">
                  {item.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
