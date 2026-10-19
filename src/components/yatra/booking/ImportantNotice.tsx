"use client";

export default function ImportantNotice() {
  return (
    <section className="w-full px-5 sm:px-6 py-5 border-t border-[#C37000]/25">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-0 rounded-[10px] border border-[#C37000]/40 bg-[rgba(239,222,199,0.35)] overflow-hidden">
        {/* ── Left: Important Note ── */}
        <div className="flex items-start gap-3 flex-1 px-4 py-4">
          {/* Calendar-check icon */}
          <div className="shrink-0 mt-0.5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="6" width="24" height="20" rx="2" stroke="#D04B16" strokeWidth="2.2" />
              <line x1="10" y1="3" x2="10" y2="9" stroke="#D04B16" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="22" y1="3" x2="22" y2="9" stroke="#D04B16" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="4" y1="13" x2="28" y2="13" stroke="#D04B16" strokeWidth="2.2" />
              <path d="M11 21l3.5 3.5 7-7" stroke="#D04B16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div>
            <h3 className="font-cormorant text-[16px] font-bold text-[#D04B16] leading-tight">
              Important Note
            </h3>
            <p className="font-cormorant mt-1 text-[14px] sm:text-[15px] font-bold text-[#3D352F] leading-snug max-w-[300px]">
              Booking will be confirmed only after payment. Limited seats
              available. Please book early!
            </p>
          </div>
        </div>

        {/* ── Vertical Divider ── */}
        <div className="hidden sm:block w-px self-stretch bg-[#C37000]/30 shrink-0" />

        {/* ── Right: Secure Booking ── */}
        <div className="flex items-start gap-3 px-4 py-4 sm:min-w-[220px]">
          {/* Shield icon */}
          <div className="shrink-0 mt-0.5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4L4 9v8c0 6.63 5.14 12.84 12 14.66C22.86 29.84 28 23.63 28 17V9L16 4z"
                fill="#0F5C66"
                fillOpacity="0.12"
                stroke="#0F5C66"
                strokeWidth="2"
              />
              <path
                d="M11 16l3.5 3.5 6.5-6.5"
                stroke="#0F5C66"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-cormorant text-[16px] font-bold text-[#0F5C66] leading-tight">
              Secure Booking
            </h3>
            <p className="font-cormorant mt-1 text-[14px] sm:text-[15px] font-bold text-[#3D352F] leading-snug">
              Your information is safe with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
