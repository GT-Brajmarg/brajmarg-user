import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Brajmarg is a devotional platform dedicated to bringing temples, sacred services, and spiritual experiences closer to every devotee.",
};

export default function AboutPage() {
  return (
    <div className="relative w-full bg-[#F7F0E5] text-[#3D352F] overflow-x-clip">
      {/* ── Background paper texture across the whole page ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-34 mix-blend-multiply"
      >
        <Image
          src="/images/paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO
          Full bright warm golden temple & clouds
          Clean, bright, luminous layout matching reference image
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] flex items-center overflow-hidden">
        {/* Hero image background - bright and natural */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/aboutUs_hero.png"
            alt="Connecting Devotees to the Divine - Ancient Temple Palace"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right md:object-center brightness-[1.03]"
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-0 py-12 sm:py-16 md:py-20 flex items-center">
          <div className="max-w-[480px]">
            {/* Tagline */}
            <p className="font-cormorant text-[14px] sm:text-[15px] md:text-[16px] font-bold text-[#C37000] tracking-[0.14em] uppercase">
              ABOUT US
            </p>

            {/* Main Headline */}
            <h1 className="font-cormorant text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-bold text-[#0F5C66] leading-[1.08] mt-2 mb-3 sm:mb-4">
              Connecting Devotees
              <br />
              to the Divine
            </h1>

            {/* Lotus Divider */}
            <div className="flex items-center gap-2.5 my-3 sm:my-4">
              <div className="w-12 sm:w-16 h-[1.5px] bg-[#C37000]/70" />
              {/* Dot SVG */}
              <svg
                width="7"
                height="7"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M11.25 22.5C14.2337 22.5 17.0952 21.3147 19.205 19.205C21.3147 17.0952 22.5 14.2337 22.5 11.25C22.5 8.26631 21.3147 5.40483 19.205 3.29505C17.0952 1.18526 14.2337 0 11.25 0C8.26632 0 5.40483 1.18526 3.29505 3.29505C1.18527 5.40483 0 8.26631 0 11.25C0 14.2337 1.18527 17.0952 3.29505 19.205C5.40483 21.3147 8.26632 22.5 11.25 22.5Z"
                  fill="#C37000"
                />
              </svg>

              {/* Center Lotus Icon */}
              <svg
                width="24"
                height="20"
                viewBox="0 0 47 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
              </svg>

              {/* Dot SVG */}
              <svg
                width="7"
                height="7"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M11.25 22.5C14.2337 22.5 17.0952 21.3147 19.205 19.205C21.3147 17.0952 22.5 14.2337 22.5 11.25C22.5 8.26631 21.3147 5.40483 19.205 3.29505C17.0952 1.18526 14.2337 0 11.25 0C8.26632 0 5.40483 1.18526 3.29505 3.29505C1.18527 5.40483 0 8.26631 0 11.25C0 14.2337 1.18527 17.0952 3.29505 19.205C5.40483 21.3147 8.26632 22.5 11.25 22.5Z"
                  fill="#C37000"
                />
              </svg>
              <div className="w-12 sm:w-16 h-[1.5px] bg-[#C37000]/70" />
            </div>

            {/* Paragraph Description: 5 clean lines matching reference */}
            <p className="font-cormorant text-[16px] sm:text-[17px] font-medium text-white md:text-[#3D352F]/90 leading-[1.6] mt-3 sm:mt-4">
              Brajmarg is a devotional platform dedicated to bringing temples,
              sacred services, and spiritual experiences closer to every
              devotee. With faith at our heart and authenticity in our
              offerings, we walk with you on your spiritual journey.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: OUR STORY & WHAT WE BRING (Image 3)
          - temple-bell.png hanging flush from top edge of section
          - our_story_temple.png anchored on left, baseline resting flush above What We Bring box
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full border-t border-[#C37000]/30 pt-8 sm:pt-12 pb-12 sm:pb-16 overflow-hidden">
        {/* Lite Lotus BG — desktop only */}
        <div className="hidden lg:block pointer-events-none absolute top-[-60px] inset-0 z-0 overflow-hidden">
          <Image
            src="/images/lite-lotus-bg.png"
            alt=""
            width={1500}
            height={100}
            className="object-cover opacity-70"
          />
        </div>

        {/* Subtle Central Mandala Background */}
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[700px] md:w-[900px] pointer-events-none opacity-[0.055] -z-10">
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={900}
            height={900}
            className="w-full h-auto"
          />
        </div>

        {/* Right Hanging Brass Bells (temple-bell.png) - chains hanging flush from very top border */}
        <div className="hidden md:block absolute right-6 sm:right-10 md:right-14 lg:right-20 xl:right-28 top-0 w-[130px] sm:w-[150px] md:w-[170px] lg:w-[195px] xl:w-[215px] pointer-events-none select-none z-10">
          <Image
            src="/images/temple-bell.png"
            alt="Temple Bells"
            width={215}
            height={322}
            className="w-full h-auto object-contain object-top"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative w-full max-w-[1240px] mx-auto px-5 sm:px-8">
          {/* ── Sub-block 1: Our Story with Left Temple ── */}
          <div className="relative w-full min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex items-center justify-center py-4 sm:py-6">
            {/* Left Temple (our_story_temple.png) - resting flush on the bottom baseline right above What We Bring */}
            <div className="hidden md:block absolute left-[-14%]  bottom-0 w-[280px] md:w-[330px] lg:w-[380px] xl:w-[420px] pointer-events-none select-none z-0">
              <Image
                src="/images/our_story_temple.png"
                alt="Temple Sketch"
                width={420}
                height={314}
                className="w-full h-auto object-contain object-left-bottom drop-shadow-sm"
                priority
              />
            </div>

            {/* Centered Story Content */}
            <div className="relative z-10 max-w-[620px] mx-auto text-center px-4">
              {/* Heading with Flanking Lotus Flowers */}
              <div className="flex items-center justify-center gap-3">
                <span className="text-[#C37000] inline-flex items-center">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 47 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                  </svg>
                </span>

                <h2 className="font-cormorant text-[32px] sm:text-[38px] md:text-[42px] font-bold text-[#0F5C66] leading-tight">
                  Our Story
                </h2>

                <span className="text-[#C37000] inline-flex items-center">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 47 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                  </svg>
                </span>
              </div>

              {/* Story Paragraph: exact 5-line flow */}
              <p className="font-cormorant text-[15px] sm:text-[16px] md:text-[17px] font-medium text-[#3D352F]/90 leading-[1.65] mt-4">
                Brajmarg was born from a simple thought—devotion should be easy,
                meaningful, and accessible to all. We connect you with trusted
                temples, authentic sevas, sacred offerings, and uplifting yatras,
                all in one place. Our mission is to preserve our spiritual heritage
                and make every devotee&apos;s journey more devoted, convenient, and
                trustworthy.
              </p>
            </div>
          </div>

          {/* ── Sub-block 2: What We Bring to Devotees (Bordered Box with 4 Cards) ── */}
          <div className="relative w-full mt-4 sm:mt-6">
            <div className="rounded-[22px] border border-[#C37000]/50 bg-[rgba(239,222,199,0.35)] p-6 sm:p-8 md:p-10 shadow-sm backdrop-blur-[2px]">
              {/* Inner Header with Lotus */}
              <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10 text-center">
                <span className="text-[#C37000] inline-flex items-center">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 47 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                  </svg>
                </span>

                <h3 className="font-cormorant text-[28px] sm:text-[34px] md:text-[38px] font-bold text-[#0F5C66] leading-tight">
                  What We Bring to Devotees
                </h3>

                <span className="text-[#C37000] inline-flex items-center">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 47 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                    <path
                      d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#C37000"
                    />
                  </svg>
                </span>
              </div>

              {/* 4 Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {/* Card 1: Temple Connections */}
                <div className="rounded-[16px] border border-[#C37000]/40 bg-[rgba(239,222,199,0.7)] p-6 text-center flex flex-col items-center justify-start shadow-sm transition hover:-translate-y-1 hover:shadow-md duration-200">
                  <div className="h-[72px] flex items-center justify-center mb-3 text-[#C37000]">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.7809 45.7733H14V56.5418M18.7809 45.7733H53.512M18.7809 45.7733V39.9584H26.9429M53.512 45.7733H58V56.5418M53.512 45.7733V39.9584H44.6842M58 56.5418H14M58 56.5418V68.9324H14V56.5418M23.2632 33.216V28.4385H48.7368V33.216M37.7565 33.6027H52.2105V39.4177H43.6768M25.5789 23.7155H46.4211V28.4049H25.5789V23.7155ZM28.0013 19.0098H44.0288V23.6992H28.0013V19.0098Z"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#C37000"
                      />
                      <path
                        d="M23.6248 44.8384L36.0733 32.3887L48.523 44.8384M28.4579 39.4171H20.4707V33.6021H34.2925M42.37 68.9307H29.6331V60.8254H42.37V68.9307Z"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#C37000"
                      />
                      <path
                        d="M33.7556 68.9316V60.8263H38.3872V68.9316M51.0522 65.4579H48.7364V60.8263M22.1049 52.7211H19.7891V50.4053M52.2101 52.7211H49.8943V50.4053M44.6838 52.7211H42.368V50.4053M37.1575 52.7211H34.8417V50.4053M29.6312 52.7211H27.3154V50.4053M23.2627 65.4579H20.947V60.8263"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#C37000"
                      />
                      <path
                        d="M41.8622 9.78947C41.8622 12.9869 39.2701 15.5789 36.0727 15.5789C32.8752 15.5789 30.2832 12.9869 30.2832 9.78947C30.2832 6.59204 32.8752 4 36.0727 4C39.2701 4 41.8622 6.59204 41.8622 9.78947Z"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#C37000"
                      />
                      <path
                        d="M36.0723 15.9121V18.6748"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#C37000"
                      />
                    </svg>
                  </div>

                  <h4 className="font-cormorant text-[19px] sm:text-[20px] font-bold text-[#3D352F] leading-tight">
                    Temple Connections
                  </h4>

                  <div className="w-10 h-[1.5px] bg-[#C37000]/50 my-2" />

                  <p className="font-cormorant text-[13.5px] sm:text-[14px] font-medium text-[#3D352F]/80 leading-[1.5]">
                    Explore and connect with sacred temples across India, all
                    curated for you.
                  </p>
                </div>

                {/* Card 2: Authentic Seva */}
                <div className="rounded-[16px] border border-[#C37000]/40 bg-[rgba(239,222,199,0.7)] p-6 text-center flex flex-col items-center justify-start shadow-sm transition hover:-translate-y-1 hover:shadow-md duration-200">
                  <div className="h-[72px] flex items-center justify-center mb-3 text-[#C37000]">
                    <svg
                      width="66"
                      height="66"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="diyaDotsMask">
                        <rect width="100" height="100" fill="white" />
                        <circle cx="23.48" cy="69.22" r="1.5" fill="black" />
                        <circle cx="20.08" cy="65.41" r="1.5" fill="black" />
                        <circle cx="17.47" cy="61.03" r="1.5" fill="black" />
                        <circle cx="15.75" cy="56.24" r="1.5" fill="black" />
                        <circle cx="14.99" cy="51.19" r="1.5" fill="black" />
                        <circle cx="15.22" cy="46.03" r="1.5" fill="black" />
                        <circle cx="16.45" cy="40.94" r="1.5" fill="black" />
                        <circle cx="18.64" cy="36.08" r="1.5" fill="black" />
                        <circle cx="21.73" cy="31.62" r="1.5" fill="black" />
                        <circle cx="25.63" cy="27.70" r="1.5" fill="black" />
                        <circle cx="30.22" cy="24.47" r="1.5" fill="black" />
                        <circle cx="45.00" cy="24.00" r="1.5" fill="black" />
                        <circle cx="53.00" cy="28.00" r="1.5" fill="black" />
                        <circle cx="61.00" cy="34.00" r="1.5" fill="black" />
                        <circle cx="68.00" cy="41.00" r="1.5" fill="black" />
                        <circle cx="74.00" cy="47.00" r="1.5" fill="black" />
                        <circle cx="45.00" cy="69.50" r="1.5" fill="black" />
                        <circle cx="54.00" cy="66.00" r="1.5" fill="black" />
                        <circle cx="63.00" cy="62.00" r="1.5" fill="black" />
                        <circle cx="72.00" cy="57.50" r="1.5" fill="black" />
                        <circle cx="80.00" cy="53.50" r="1.5" fill="black" />
                      </mask>

                      {/* Vector 3: Lower Crescent Base (left 6.48%, right 17.19%, top 60.41%, bottom 9.37%) */}
                      <path
                        d="M 6.48 64 C 12 78, 28 90.63, 54 89 C 66 87.5, 76 80, 82.81 68 C 75 77, 63 83, 50 83.5 C 28 84.5, 14 76, 6.48 64 Z"
                        fill="#C37000"
                      />

                      {/* Vector 2: Main Diya Body (left 6.25%, right 6.15%, top 15.62%, bottom 21.87%) with masked dots */}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M 36.38 15.62 C 18 15.62, 6.25 29.5, 6.25 46.88 C 6.25 64.2, 18 78.13, 36.38 78.13 C 53.5 78.13, 70 69, 93.85 52 C 84 57, 76 56, 75 48 C 73 39, 63 31, 53 23 C 45 17.5, 41 15.62, 36.38 15.62 Z M 36.38 25 C 42 25, 48 29, 56 35 C 64 42, 70 48, 73 49 C 66 54, 53 68.7, 36.38 68.7 C 24.3 68.7, 15.5 58.9, 15.5 46.88 C 15.5 34.8, 24.3 25, 36.38 25 Z"
                        fill="#C37000"
                        mask="url(#diyaDotsMask)"
                      />

                      {/* Vector 4: Inner Solid Circle (oil reservoir) (left 20.75%, right 48%, top 31.25%, bottom 37.5%) */}
                      <circle cx="36.38" cy="46.88" r="15.625" fill="#C37000" />

                      {/* Wick connecting spout to flame */}
                      <path
                        d="M 74 54 C 80 54, 84 50, 85 45"
                        stroke="#C37000"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      />

                      {/* Vector 1: Flame (left 66.8%, right 6.12%, top 12.5%, bottom 51.17%) */}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M 86 12.5 C 79 19, 74 26, 74 33 C 74 41, 79 48.83, 86 48.83 C 91.5 48.83, 93.88 42, 93.88 34.5 C 93.88 27.5, 91.5 19, 86 12.5 Z M 85 24 C 81.5 28, 80 31.5, 80 35 C 80 39, 82.5 42, 85.5 42 C 88.5 42, 90.5 39, 90.5 35 C 90.5 31.5, 88.5 28, 85 24 Z"
                        fill="#C37000"
                      />
                    </svg>
                  </div>

                  <h4 className="font-cormorant text-[19px] sm:text-[20px] font-bold text-[#3D352F] leading-tight">
                    Authentic Seva
                  </h4>

                  <div className="w-10 h-[1.5px] bg-[#C37000]/50 my-2" />

                  <p className="font-cormorant text-[13.5px] sm:text-[14px] font-medium text-[#3D352F]/80 leading-[1.5]">
                    Book temple sevas with complete transparency and devotion.
                  </p>
                </div>

                {/* Card 3: Sacred Offerings */}
                <div className="rounded-[16px] border border-[#C37000]/40 bg-[rgba(239,222,199,0.7)] p-6 text-center flex flex-col items-center justify-start shadow-sm transition hover:-translate-y-1 hover:shadow-md duration-200">
                  <div className="h-[72px] flex items-center justify-center mb-3 text-[#C37000]">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36 24H12C11.2044 24 10.4413 24.3161 9.87868 24.8787C9.31607 25.4413 9 26.2044 9 27V33C9 33.7956 9.31607 34.5587 9.87868 35.1213C10.4413 35.6839 11.2044 36 12 36H36M36 24H60C60.7957 24 61.5587 24.3161 62.1213 24.8787C62.6839 25.4413 63 26.2044 63 27V33C63 33.7956 62.6839 34.5587 62.1213 35.1213C61.5587 35.6839 60.7957 36 60 36H36M36 24V36M36 36V63"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#C37000"
                      />
                      <path
                        d="M57 35.9998V56.9998C57 58.5911 56.3679 60.1173 55.2426 61.2425C54.1174 62.3677 52.5913 62.9998 51 62.9998H21C19.4087 62.9998 17.8826 62.3677 16.7574 61.2425C15.6321 60.1173 15 58.5911 15 56.9998V35.9998M22.5 23.9998C20.5109 23.9998 18.6032 23.2097 17.1967 21.8031C15.7902 20.3966 15 18.489 15 16.4998C15 14.5107 15.7902 12.6031 17.1967 11.1965C18.6032 9.79002 20.5109 8.99985 22.5 8.99985C25.3941 8.94942 28.2301 10.3536 30.6382 13.0293C33.0463 15.705 34.9148 19.5281 36 23.9998C37.0852 19.5281 38.9537 15.705 41.3618 13.0293C43.7699 10.3536 46.6059 8.94942 49.5 8.99985C51.4891 8.99985 53.3968 9.79002 54.8033 11.1965C56.2098 12.6031 57 14.5107 57 16.4998C57 18.489 56.2098 20.3966 54.8033 21.8031C53.3968 23.2097 51.4891 23.9998 49.5 23.9998"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#C37000"
                      />
                    </svg>
                  </div>

                  <h4 className="font-cormorant text-[19px] sm:text-[20px] font-bold text-[#3D352F] leading-tight">
                    Sacred Offerings
                  </h4>

                  <div className="w-10 h-[1.5px] bg-[#C37000]/50 my-2" />

                  <p className="font-cormorant text-[13.5px] sm:text-[14px] font-medium text-[#3D352F]/80 leading-[1.5]">
                    Shop genuine prasad, puja essentials, and more with trust and
                    care.
                  </p>
                </div>

                {/* Card 4: Thoughtful Yatras */}
                <div className="rounded-[16px] border border-[#C37000]/40 bg-[rgba(239,222,199,0.7)] p-6 text-center flex flex-col items-center justify-start shadow-sm transition hover:-translate-y-1 hover:shadow-md duration-200">
                  <div className="h-[72px] flex items-center justify-center mb-3 text-[#C37000]">
                    <svg
                      width="56"
                      height="50"
                      viewBox="0 0 60 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 54V42H24V54H18ZM18 33V21H24V33H18ZM18 12V0H24V12H18ZM0 54L7.5 0H13.5L6 54H0ZM44.889 53.775C44.613 53.625 44.4 53.4 44.25 53.1L43.95 52.425C42.8 50.025 41.2 47.962 39.15 46.236C37.1 44.51 35.35 42.548 33.9 40.35C33.05 39.05 32.425 37.675 32.025 36.225C31.625 34.775 31.425 33.3 31.425 31.8C31.425 27.9 32.85 24.638 35.7 22.014C38.55 19.39 41.95 18.077 45.9 18.075C49.8 18.075 53.125 19.475 55.875 22.275C58.625 25.075 60 28.45 60 32.4C60 33.85 59.8 35.25 59.4 36.6C59 37.95 58.4 39.2 57.6 40.35C56.15 42.55 54.387 44.513 52.311 46.239C50.235 47.965 48.648 50.027 47.55 52.425L47.25 53.1C47.1 53.4 46.887 53.625 46.611 53.775C46.335 53.925 46.048 54 45.75 54C45.452 54 45.167 53.925 44.889 53.775ZM49.986 36.489C51.162 35.313 51.75 33.9 51.75 32.25C51.75 30.6 51.163 29.188 49.989 28.014C48.815 26.84 47.402 26.252 45.75 26.25C44.098 26.248 42.686 26.836 41.514 28.014C40.342 29.192 39.754 30.604 39.75 32.25C39.746 33.896 40.334 35.309 41.514 36.489C42.694 37.669 44.106 38.256 45.75 38.25C47.394 38.244 48.804 37.657 49.986 36.489ZM31.05 18.075L28.5 0H34.5L36.45 14.025C35.45 14.575 34.5 15.175 33.6 15.825C32.7 16.475 31.85 17.225 31.05 18.075Z"
                        fill="#C37000"
                      />
                    </svg>
                  </div>

                  <h4 className="font-cormorant text-[19px] sm:text-[20px] font-bold text-[#3D352F] leading-tight">
                    Thoughtful Yatras
                  </h4>

                  <div className="w-10 h-[1.5px] bg-[#C37000]/50 my-2" />

                  <p className="font-cormorant text-[13.5px] sm:text-[14px] font-medium text-[#3D352F]/80 leading-[1.5]">
                    Embark on divine journeys designed to uplift your spirit and
                    soul.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: OUR PROMISE (Image 2)
          Left: /images/left_lotus.png (pinned to far left edge, vertically centered)
          Right: /images/right_lotus.png (pinned to far right edge, vertically centered)
          Center: Circular mandala background & 4 Promise items with 3 discrete vertical dividers
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 w-full border-y border-[#C37000]/40 py-12 sm:py-16 md:py-20 overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "#EFE0C0" }}
      >
        {/* Lite Lotus BG — desktop only */}
        <div className="hidden lg:block pointer-events-none absolute top-[-60px] inset-0 z-0 overflow-hidden">
          <Image
            src="/images/lite-lotus-bg.png"
            alt=""
            width={1500}
            height={100}
            className="object-cover opacity-70"
          />
        </div>

        {/* Left Lotus (Half Mandala) pinned flush to far left edge, vertically centered */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[150px] sm:w-[180px] md:w-[210px] lg:w-[230px] xl:w-[250px] pointer-events-none select-none z-10">
          <Image
            src="/images/left_lotus.png"
            alt="Sacred Left Lotus"
            width={250}
            height={450}
            className="w-full h-auto object-contain object-left"
          />
        </div>

        {/* Right Lotus (Half Mandala) pinned flush to far right edge, vertically centered */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[150px] sm:w-[180px] md:w-[210px] lg:w-[230px] xl:w-[250px] pointer-events-none select-none z-10">
          <Image
            src="/images/right_lotus.png"
            alt="Sacred Right Lotus"
            width={250}
            height={450}
            className="w-full h-auto object-contain object-right"
          />
        </div>

        {/* Central Circular Mandala Background behind items - subtle golden watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[680px] pointer-events-none opacity-[0.13] select-none z-10">
          <Image
            src="/images/lite-lotus-bg.png"
            alt=""
            width={680}
            height={680}
            className="w-full h-auto"
          />
        </div>

        {/* Content: Header + 4 Promise Columns */}
        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-5 sm:px-8">
          {/* Header with Lotus */}
          <div className="flex items-center justify-center gap-3 mb-10 sm:mb-12 text-center">
            <span className="text-[#C37000] inline-flex items-center">
              <svg
                width="22"
                height="18"
                viewBox="0 0 47 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
              </svg>
            </span>

            <h2 className="font-cormorant text-[32px] sm:text-[38px] md:text-[44px] font-bold text-[#0F5C66] leading-tight">
              Our Promise
            </h2>

            <span className="text-[#C37000] inline-flex items-center">
              <svg
                width="22"
                height="18"
                viewBox="0 0 47 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
                <path
                  d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#C37000"
                />
              </svg>
            </span>
          </div>

          {/* 4 Promise Columns with 3 discrete vertical dividers */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
            {/* 1. Authenticity */}
            <div className="flex-1 flex flex-col items-center text-center px-4 sm:px-6">
              <div className="w-[74px] h-[74px] rounded-full border border-[#C37000] flex items-center justify-center text-[#C37000] transition-transform hover:scale-105 duration-200">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 3.71875L28.1562 7.96875V18.5938C28.1562 23.375 23.9062 28.1562 17 30.2812C10.0938 28.1562 5.84375 23.9062 5.84375 18.5938V7.96875L17 3.71875Z"
                    stroke="#C37000"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.2188 16.4688L15.4062 19.6562L21.7812 12.2188"
                    stroke="#C37000"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h4 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#3D352F] mt-4 mb-1.5">
                Authenticity
              </h4>

              <p className="font-cormorant text-[14px] sm:text-[15px] font-medium text-[#3D352F]/80 leading-[1.5] max-w-[220px]">
                Every temple, seva, and product is verified for authenticity.
              </p>
            </div>

            {/* Divider 1 */}
            <div className="hidden lg:block w-[1.5px] h-[120px] bg-[#C37000]/50 shrink-0 self-center" />

            {/* 2. Transparency */}
            <div className="flex-1 flex flex-col items-center text-center px-4 sm:px-6">
              <div className="w-[74px] h-[74px] rounded-full border border-[#C37000] flex items-center justify-center text-[#C37000] transition-transform hover:scale-105 duration-200">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.5 26C32.5 27.7239 31.8152 29.3772 30.5962 30.5962C29.3772 31.8152 27.7239 32.5 26 32.5C24.2761 32.5 22.6228 31.8152 21.4038 30.5962C20.1848 29.3772 19.5 27.7239 19.5 26C19.5 24.2761 20.1848 22.6228 21.4038 21.4038C22.6228 20.1848 24.2761 19.5 26 19.5C27.7239 19.5 29.3772 20.1848 30.5962 21.4038C31.8152 22.6228 32.5 24.2761 32.5 26Z"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M4.33398 26.0002C7.80065 17.1233 15.8953 10.8335 26.0006 10.8335C36.106 10.8335 44.2006 17.1233 47.6673 26.0002C44.2006 34.877 36.106 41.1668 26.0006 41.1668C15.8953 41.1668 7.80065 34.877 4.33398 26.0002Z"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                </svg>
              </div>

              <h4 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#3D352F] mt-4 mb-1.5">
                Transparency
              </h4>

              <p className="font-cormorant text-[14px] sm:text-[15px] font-medium text-[#3D352F]/80 leading-[1.5] max-w-[220px]">
                Clear information and honest practices at every step.
              </p>
            </div>

            {/* Divider 2 */}
            <div className="hidden lg:block w-[1.5px] h-[120px] bg-[#C37000]/50 shrink-0 self-center" />

            {/* 3. Trust */}
            <div className="flex-1 flex flex-col items-center text-center px-4 sm:px-6">
              <div className="w-[74px] h-[74px] rounded-full border border-[#C37000] flex items-center justify-center text-[#C37000] transition-transform hover:scale-105 duration-200">
                <svg
                  width="40"
                  height="36"
                  viewBox="0 0 48 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.6667 6.50004C34.6667 4.76671 33.995 3.13087 32.76 1.90671C31.5422 0.687371 29.89 0.00155577 28.1667 3.86502e-05C26.5525 3.86502e-05 25.025 0.585039 23.8333 1.65754C22.6452 0.585436 21.1003 -0.0055048 19.5 3.86502e-05C17.7667 3.86502e-05 16.1308 0.671706 14.9067 1.90671C13.6873 3.12452 13.0015 4.77671 13 6.50004C13 8.23337 13.6717 9.86921 14.9067 11.0934L22.685 18.8717C22.9992 19.1859 23.4217 19.3484 23.8333 19.3484C24.245 19.3484 24.6675 19.1859 24.9817 18.8717L32.76 11.0934C33.9842 9.86921 34.6667 8.23337 34.6667 6.50004ZM30.4633 8.79671L23.8333 15.4267L17.2033 8.79671C16.5937 8.1878 16.2508 7.3617 16.25 6.50004C16.25 5.63337 16.5858 4.82087 17.2033 4.20337C17.8208 3.58587 18.6333 3.25004 19.5 3.25004C20.3667 3.25004 21.1792 3.58587 21.7967 4.20337C22.0133 4.42004 22.2083 4.69087 22.3817 5.04837C22.517 5.31736 22.7244 5.54347 22.9807 5.70145C23.237 5.85944 23.5322 5.94311 23.8333 5.94311C24.1344 5.94311 24.4296 5.85944 24.686 5.70145C24.9423 5.54347 25.1497 5.31736 25.285 5.04837C25.4583 4.70171 25.6533 4.42004 25.87 4.20337C27.0942 2.97921 29.2392 2.97921 30.4633 4.20337C31.0808 4.82087 31.4167 5.63337 31.4167 6.50004C31.4167 7.36671 31.0808 8.1792 30.4633 8.79671ZM16.77 21.9592C16.0333 20.8542 14.8742 20.0959 13.5633 19.8792C12.2633 19.6517 10.8983 19.9875 9.8475 20.7784C9.78347 20.8262 9.724 20.8799 9.66983 20.9387L9.56583 21.0384L8.8725 12.7509C8.77377 11.6421 8.26488 10.6101 7.44539 9.85671C6.62591 9.10335 5.55481 8.68286 4.44167 8.67754C1.99333 8.67754 0 10.6709 0 13.1192V26.9642L6.5 38.8809V43.3442H9.75V38.0575L3.25 26.1409V13.13C3.26021 12.8285 3.38402 12.5419 3.59664 12.3278C3.80925 12.1137 4.09494 11.9878 4.39643 11.9755C4.69792 11.9632 4.99293 12.0652 5.22233 12.2613C5.45172 12.4573 5.59853 12.7328 5.63333 13.0325L6.5325 23.8334L12.155 32.8359L14.9067 31.1134L11.3967 25.5017C11.1834 25.1671 11.1051 24.7641 11.1775 24.374C11.2499 23.9839 11.4676 23.6358 11.7867 23.4C11.9588 23.2712 12.1555 23.1789 12.3646 23.1286C12.5736 23.0784 12.7908 23.0713 13.0027 23.1078C13.2146 23.1443 13.4168 23.2236 13.5971 23.3409C13.7773 23.4582 13.9317 23.611 14.0508 23.79L17.3767 28.7842C18.005 29.7159 18.2867 30.8534 18.1675 31.9692L17.3117 40.4842V43.355H20.5508V40.7334L21.3958 32.2942C21.581 30.4219 21.1142 28.543 20.0742 26.975L16.7483 21.9809L16.77 21.9592ZM38.7963 12.74C38.8936 11.6311 39.4017 10.5985 40.2211 9.84491C41.0404 9.09132 42.1118 8.67109 43.225 8.66671L43.2142 8.64504C45.6625 8.64504 47.6558 10.6384 47.6558 13.0867V26.9317L41.1558 38.8484V43.3117H37.9058V38.025L44.4058 26.1084V13.0975C44.3956 12.796 44.2718 12.5094 44.0592 12.2953C43.8466 12.0812 43.5609 11.9553 43.2594 11.943C42.9579 11.9307 42.6629 12.0327 42.4335 12.2288C42.2041 12.4248 42.0573 12.7003 42.0225 13L41.1233 23.8009L35.5008 32.8034L32.7492 31.0809L36.2592 25.4692C36.4724 25.1346 36.5507 24.7316 36.4783 24.3415C36.4059 23.9514 36.1882 23.6033 35.8692 23.3675C35.6979 23.2379 35.5018 23.145 35.293 23.0947C35.0842 23.0443 34.8673 23.0376 34.6558 23.075C34.443 23.11 34.2397 23.1887 34.0589 23.3061C33.878 23.4236 33.7235 23.5773 33.605 23.7575L30.2792 28.7517C29.6617 29.6834 29.38 30.8209 29.4883 31.9367L30.3442 40.6142V43.3225H27.0942V40.7009L26.2492 32.2617C26.064 30.3893 26.5308 28.5105 27.5708 26.9425L30.8967 21.9484C31.6333 20.8542 32.8033 20.0959 34.1033 19.8684C35.4033 19.6517 36.7575 19.9767 37.8192 20.7675C37.8769 20.8152 37.9333 20.8658 37.9882 20.9192L38.1008 21.0275L38.7963 12.74Z"
                    fill="#C37000"
                  />
                </svg>
              </div>

              <h4 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#3D352F] mt-4 mb-1.5">
                Trust
              </h4>

              <p className="font-cormorant text-[14px] sm:text-[15px] font-medium text-[#3D352F]/80 leading-[1.5] max-w-[220px]">
                A secure platform you can rely on, always.
              </p>
            </div>

            {/* Divider 3 */}
            <div className="hidden lg:block w-[1.5px] h-[120px] bg-[#C37000]/50 shrink-0 self-center" />

            {/* 4. Devotion */}
            <div className="flex-1 flex flex-col items-center text-center px-4 sm:px-6">
              <div className="w-[74px] h-[74px] rounded-full border border-[#C37000] flex items-center justify-center text-[#C37000] transition-transform hover:scale-105 duration-200">
                <svg
                  width="40"
                  height="34"
                  viewBox="0 0 47 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                </svg>
              </div>

              <h4 className="font-cormorant text-[20px] sm:text-[22px] font-bold text-[#3D352F] mt-4 mb-1.5">
                Devotion
              </h4>

              <p className="font-cormorant text-[14px] sm:text-[15px] font-medium text-[#3D352F]/80 leading-[1.5] max-w-[220px]">
                We respect your faith and enrich your spiritual experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: BOTTOM BANNER CARD (Bringing temples closer...)
          Using /images/glow_with_temple.png with Diya left, Temple right
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="relative w-full max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="rounded-[22px] border border-[#C37000]/60 bg-[rgba(239,222,199,0.55)] overflow-hidden relative p-8 sm:p-12 md:p-16 shadow-sm text-center flex flex-col items-center justify-center min-h-[200px] sm:min-h-[250px] md:min-h-[280px]">
            {/* Background Image: glow_with_temple.png */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <Image
                src="/images/glow_with_temple.png"
                alt="Sacred Temple & Diya"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-bottom opacity-95"
              />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 max-w-[760px] mx-auto px-4">
              <h3 className="font-cormorant text-[24px] sm:text-[32px] md:text-[38px] font-bold text-[#3D352F] leading-tight">
                Bringing temples closer,
                <br className="hidden sm:inline" /> wherever devotion finds you.
              </h3>

              {/* Lotus Divider */}
              <div className="flex items-center justify-center gap-2.5 my-3 sm:my-4">
                <div className="w-12 sm:w-16 h-[1.5px] bg-[#C37000]/70" />
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M11.25 22.5C14.2337 22.5 17.0952 21.3147 19.205 19.205C21.3147 17.0952 22.5 14.2337 22.5 11.25C22.5 8.26631 21.3147 5.40483 19.205 3.29505C17.0952 1.18526 14.2337 0 11.25 0C8.26632 0 5.40483 1.18526 3.29505 3.29505C1.18527 5.40483 0 8.26631 0 11.25C0 14.2337 1.18527 17.0952 3.29505 19.205C5.40483 21.3147 8.26632 22.5 11.25 22.5Z"
                    fill="#C37000"
                  />
                </svg>
                <svg
                  width="22"
                  height="18"
                  viewBox="0 0 47 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M23.1667 36.1667C23.1667 24.25 13.4167 14.5 1.5 14.5C1.5 26.4167 11.25 36.1667 23.1667 36.1667Z"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M18.1832 10.8168C14.2832 6.48343 9.94988 4.1001 9.94988 4.1001C9.94988 4.1001 8.21655 9.51677 8.86655 15.8001"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M29.666 20.7833V18.8333C29.666 9.3 23.166 1.5 23.166 1.5C23.166 1.5 16.666 9.3 16.666 18.8333V20.7833"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M37.4671 15.8001C38.1171 9.51677 36.3837 4.1001 36.3837 4.1001C36.3837 4.1001 32.0504 6.26677 28.1504 10.8168"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                  <path
                    d="M23.166 36.1667C35.0827 36.1667 44.8327 26.4167 44.8327 14.5C32.916 14.5 23.166 24.25 23.166 36.1667Z"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#C37000"
                  />
                </svg>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M11.25 22.5C14.2337 22.5 17.0952 21.3147 19.205 19.205C21.3147 17.0952 22.5 14.2337 22.5 11.25C22.5 8.26631 21.3147 5.40483 19.205 3.29505C17.0952 1.18526 14.2337 0 11.25 0C8.26632 0 5.40483 1.18526 3.29505 3.29505C1.18527 5.40483 0 8.26631 0 11.25C0 14.2337 1.18527 17.0952 3.29505 19.205C5.40483 21.3147 8.26632 22.5 11.25 22.5Z"
                    fill="#C37000"
                  />
                </svg>
                <div className="w-12 sm:w-16 h-[1.5px] bg-[#C37000]/70" />
              </div>

              {/* Radhe Radhe! */}
              <p className="font-cormorant text-[22px] sm:text-[28px] md:text-[32px] font-bold text-[#0F5C66] mt-2">
                Radhe Radhe! 🌸
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
