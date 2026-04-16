"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "brajmarg:onboarded:v1";

type Step = {
  title: string;
  body: string;
  image: string;
  cta?: string;
};

const STEPS: Step[] = [
  {
    title: "Welcome to Brajmarg",
    body: "A digital bridge between you and India's most sacred temples. Begin your devotional journey from the heart.",
    image: "/brajmarg_footer_logo.png",
  },
  {
    title: "Explore Sacred Temples",
    body: "Discover temples, their daily darshan timings, festivals and special darshans — all in one place.",
    image: "/illustrations/onboard-2-temples.svg",
  },
  {
    title: "Order Blessed Prasad",
    body: "Receive prasad, deity poshak and devotional frames — sanctified at the temple, delivered to your doorstep.",
    image: "/illustrations/onboard-3-prasad.svg",
  },
  {
    title: "Sponsor Seva from Anywhere",
    body: "Book Rajbhog, Phool Bangla, Aarti and other sevas. Your offerings will be performed in person on your behalf.",
    image: "/illustrations/onboard-4-blessing.svg",
    cta: "Begin Your Journey",
  },
];

export default function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  // Check localStorage on mount, show after a small delay
  useEffect(() => {
    setMounted(true);
    let timer: number | null = null;
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        timer = window.setTimeout(() => setOpen(true), 800);
      }
    } catch {
      // localStorage might be unavailable in privacy mode — fail silent
    }
    return () => {
      if (timer != null) window.clearTimeout(timer);
    };
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Handle Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const finish = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 280);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else finish();
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!mounted || !open) return null;

  const cur = STEPS[step]!;
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm ${
        closing ? "animate-[fadeOut_280ms_ease-in_forwards]" : "animate-[fadeIn_320ms_ease-out]"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboard-title"
    >
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-3xl bg-card-bg shadow-2xl border border-amber-100 ${
          closing ? "animate-[scaleOut_280ms_ease-in_forwards]" : "animate-[scaleIn_420ms_cubic-bezier(0.34,1.56,0.64,1)]"
        }`}
      >
        {/* Skip button */}
        <button
          type="button"
          onClick={finish}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-brand-red hover:bg-white shadow-sm"
        >
          Skip
        </button>

        {/* Illustration */}
        <div
          key={`img-${step}`}
          className="aspect-[4/3] w-full bg-amber-50 animate-[fadeIn_400ms_ease-out] flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cur.image}
            alt=""
            className={`h-full w-full ${step === 0 ? "object-contain p-8" : "object-cover"}`}
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 text-center">
          <h2
            id="onboard-title"
            key={`title-${step}`}
            className="text-2xl font-bold text-gray-900 font-serif animate-[slideUp_400ms_ease-out]"
          >
            {cur.title}
          </h2>
          <p
            key={`body-${step}`}
            className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto animate-[slideUp_500ms_ease-out]"
          >
            {cur.body}
          </p>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-8 bg-brand-red"
                    : i < step
                    ? "w-2 bg-brand-red/60"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={prev}
              disabled={isFirst}
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-brand-red disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={next}
              className="flex-1 rounded-xl bg-brand-red text-white text-sm font-semibold px-5 py-3 shadow-md hover:bg-brand-red-dark active:scale-[0.98] transition-all"
            >
              {isLast ? cur.cta ?? "Get Started" : "Continue"}
            </button>
          </div>
        </div>

        {/* Decorative bottom bar */}
        <div className="h-1 bg-gradient-to-r from-amber-300 via-brand-red to-amber-300" />
      </div>
    </div>
  );
}
