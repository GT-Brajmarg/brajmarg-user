"use client";

import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

function ShieldBanIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D08A2F"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11.5" r="4.2" strokeWidth="1.5" />
      <line x1="9" y1="8.5" x2="15" y2="14.5" strokeWidth="1.5" />
    </svg>
  );
}

function ClearPricingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D08A2F"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M10 2.5c0-.8.9-1.5 2-1.5s2 .7 2 1.5c0 1-1.2 1.8-2 2.5" />
      <path d="M7 8l3.5-3.5h3L17 8v11.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5V8z" />
      <circle cx="12" cy="7.5" r="0.9" fill="#D08A2F" />
      <path d="M10 11.5h4M10 13.2h4M10 11.5c1.2 0 1.8.6 1.8 1.4 0 1-.8 1.4-1.8 1.4l2.4 2.7" strokeWidth="1.5" />
      <line x1="9.8" y1="18.2" x2="14.2" y2="18.2" strokeWidth="1.5" />
    </svg>
  );
}

function SecurePaymentsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D08A2F"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V6.5a4 4 0 0 1 8 0V10" />
      <path d="M12 17.5s2.2-.9 2.2-2.2v-1.8l-2.2-.7-2.2.7v1.8c0 1.3 2.2 2.2 2.2 2.2z" strokeWidth="1.5" />
      <path d="M11.2 15l.6.6 1.2-1.2" strokeWidth="1.5" />
    </svg>
  );
}

function TimelyUpdatesIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D08A2F"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
      <line x1="12" y1="3" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="21" />
      <line x1="3" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="21" y2="12" />
    </svg>
  );
}

function DevoteeFirstIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D08A2F"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="6.5" r="3.2" />
      <path d="M5.5 20c.3-3.2 3-5.2 6.5-5.2s6.2 2 6.5 5.2" />
      <path d="M12 18.2c-.8-.8-2-.5-2 .6 0 1.2 2 2.7 2 2.7s2-1.5 2-2.7c0-1.1-1.2-1.4-2-.6z" strokeWidth="1.4" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: ShieldBanIcon,
    title: "No Hidden",
    subtitle: "Charges",
  },
  {
    icon: ClearPricingIcon,
    title: "Clear",
    subtitle: "Pricing",
  },
  {
    icon: SecurePaymentsIcon,
    title: "Secure",
    subtitle: "Payments",
  },
  {
    icon: TimelyUpdatesIcon,
    title: "Timely",
    subtitle: "Updates",
  },
  {
    icon: DevoteeFirstIcon,
    title: "Devotee First",
    subtitle: "Uproach",
  },
];

export default function AuthLeftPanel() {
  return (
    <div
      className="relative flex h-full flex-col justify-between overflow-hidden border-r border-[#E6D3B5] bg-[#F4E6CD]"
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
      <div className="absolute -top-20 -left-10 h-60 w-60 rounded-full bg-[#D9A95E]/15 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#0D6971]/10 blur-3xl pointer-events-none" />

      {/* Top Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-7 text-center">
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
          className={`${cormorant.className} mt-1 max-w-[270px] text-center text-[13px] xl:text-[15px] leading-[1.4] text-[#6C5A45]`}
        >
          Login or Sign Up to book sevas,
          <br />
          order prasad and experience
          <br />
          divine blessings.
        </p>
      </div>

      {/* Temple Illustration - 100% full width edge-to-edge */}
      <div className="relative z-10 w-full h-[255px] xl:h-[285px] my-auto overflow-hidden">
        <Image
          src="/images/login-temple.png"
          alt="Temple"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Bottom Feature Badges - No separate background bar */}
      <div className="relative z-10 w-full px-3 pb-6 pt-1">
        <div className="flex items-start justify-between">
          {FEATURES.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex flex-1 flex-col items-center text-center px-0.5"
              >
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#D9B67A] bg-[#FFF8EE]/60 shadow-xs">
                  <Icon />
                </div>

                <div className="mt-1.5 flex flex-col items-center">
                  <span className="text-[10px] leading-[1.15] font-semibold text-[#0C6971]">
                    {item.title}
                  </span>
                  <span className="text-[10px] leading-[1.15] font-semibold text-[#0C6971]">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
