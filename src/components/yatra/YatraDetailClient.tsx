"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import type { YatraPackage } from "@/types/database";
import { formatInr, parseNumeric } from "@/lib/format";
import { formatTime, formatWeekdays, isGroupPackage } from "@/lib/yatra";
import { slugify } from "@/lib/slug";
import { ImageLightbox } from "@/components/temple/ImageLightbox";
import YatraBookingPanel from "@/components/yatra/YatraBookingPanel";

export type BookingPrefill = { name: string; email: string; phone: string };

/* ── Small presentational helpers ──────────────────────────────── */

function Fact({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-brand-gold/15 bg-card-bg p-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gold-soft text-brand-gold">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default function YatraDetailClient({
  pkg,
  seatsLeft = null,
  isLoggedIn = false,
  prefill = null,
}: {
  pkg: YatraPackage;
  seatsLeft?: number | null;
  isLoggedIn?: boolean;
  prefill?: BookingPrefill | null;
}) {
  const router = useRouter();
  const [lightbox, setLightbox] = useState(false);

  const goBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/yatra");
  }, [router]);

  // Return the user to this package's booking section after login.
  const loginHref = `/login?next=${encodeURIComponent(`/yatra/${slugify(pkg.name)}#book`)}`;

  const days = pkg.duration_days ?? 0;
  const nights = pkg.duration_nights ?? 0;
  const vehicle = pkg.vehicles;

  const isGroup = isGroupPackage(pkg);
  const soldOut = isGroup && seatsLeft != null && seatsLeft <= 0;
  const schedule = isGroup ? formatWeekdays(pkg.weekdays) : "";
  const depart = isGroup ? formatTime(pkg.departure_time) : "";
  const arrive = isGroup ? formatTime(pkg.arrival_time) : "";

  // Itinerary is a single free-text field; split into readable lines so
  // a "Day 1... Day 2..." entry reads as a clean timeline.
  const itineraryLines = useMemo(
    () =>
      (pkg.itinerary ?? "")
        .split(/\n|(?=Day\s*\d)/i)
        .map((l) => l.trim())
        .filter(Boolean),
    [pkg.itinerary]
  );

  const images = pkg.image_url ? [pkg.image_url] : [];

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:pb-10">
      {/* Back + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-red/30 bg-card-bg px-3.5 py-1.5 text-sm font-semibold text-brand-red transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
        >
          <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="shrink-0 hover:text-brand-red">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/yatra" className="shrink-0 hover:text-brand-red">Yatra</Link>
          <span className="text-gray-300">/</span>
          <span className="truncate font-medium text-gray-800">{pkg.name}</span>
        </nav>
      </div>

      <section className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        {/* Image */}
        <div className="animate-fade-up">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brand-gold/15 bg-surface-soft">
            {pkg.image_url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pkg.image_url}
                  alt={pkg.name}
                  className="h-full w-full object-cover object-top"
                />
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  aria-label="Zoom image"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-gray-700 shadow-md backdrop-blur transition hover:bg-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-gold-soft via-surface-soft to-amber-100">
                <span className="text-5xl text-brand-gold/40">॥</span>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
              <span className="h-px w-6 bg-brand-gold/50" />
              Brajmarg Yatra
            </span>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {pkg.name}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="h-4 w-4 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" />
              </svg>
              {pkg.from_location} → {pkg.to_location}
            </p>
          </div>

          {/* Booking-type + availability badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
                isGroup
                  ? "bg-sky-100 text-sky-800"
                  : "bg-emerald-100 text-emerald-800",
              ].join(" ")}
            >
              {isGroup ? "Seat Booking · Shared Yatra" : "Full Package · Vehicle Included"}
            </span>
            {isGroup && seatsLeft != null && (
              <span
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
                  soldOut
                    ? "bg-gray-200 text-gray-700"
                    : seatsLeft <= 3
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800",
                ].join(" ")}
              >
                {soldOut ? "Sold out" : `${seatsLeft} seats left`}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-brand-red">
              {formatInr(parseNumeric(pkg.price))}
            </span>
            {isGroup ? (
              <span className="text-sm text-gray-500">per seat</span>
            ) : (
              pkg.price_per_km != null && (
                <span className="text-sm text-gray-500">
                  + {formatInr(parseNumeric(pkg.price_per_km))}/km extra
                </span>
              )
            )}
          </div>

          {/* Fact grid */}
          <div className="grid grid-cols-2 gap-3">
            {(days || nights) && (
              <Fact
                icon="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                label="Duration"
                value={`${days} Days / ${nights} Nights`}
              />
            )}
            {pkg.distance_km != null && (
              <Fact
                icon="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4"
                label="Distance"
                value={`${pkg.distance_km} km`}
              />
            )}
            {vehicle?.name && (
              <Fact
                icon="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01"
                label="Vehicle"
                value={vehicle.name}
              />
            )}
            {vehicle?.seating_capacity != null && (
              <Fact
                icon="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z"
                label="Capacity"
                value={`${vehicle.seating_capacity} Seater${vehicle.is_ac ? " · AC" : ""}`}
              />
            )}
            {isGroup && schedule && (
              <Fact
                icon="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                label="Departs"
                value={depart ? `${schedule} · ${depart}` : schedule}
              />
            )}
            {isGroup && arrive && (
              <Fact
                icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                label="Returns by"
                value={arrive}
              />
            )}
          </div>

          {pkg.route_description && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide text-gray-700">
                Route
              </h2>
              <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {pkg.route_description.trim()}
              </p>
            </div>
          )}

          {/* Book CTA (desktop) — scrolls to the inline booking panel */}
          {soldOut ? (
            <span className="hidden w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-300 py-3.5 text-sm font-semibold text-white lg:flex">
              Sold out
            </span>
          ) : (
            <a
              href="#book"
              className="hidden w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-red-dark lg:flex"
            >
              Book this Yatra
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          )}
        </div>
      </section>

      {/* Inclusions / Exclusions */}
      {((pkg.inclusions?.length ?? 0) > 0 || (pkg.exclusions?.length ?? 0) > 0) && (
        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          {(pkg.inclusions?.length ?? 0) > 0 && (
            <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/40 p-5">
              <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-emerald-800">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-600 text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                What&apos;s Included
              </h2>
              <ul className="mt-4 space-y-2.5">
                {pkg.inclusions!.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(pkg.exclusions?.length ?? 0) > 0 && (
            <div className="rounded-2xl border border-rose-200/60 bg-rose-50/40 p-5">
              <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-rose-800">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                Not Included
              </h2>
              <ul className="mt-4 space-y-2.5">
                {pkg.exclusions!.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                    {exc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Itinerary timeline */}
      {itineraryLines.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-xl font-bold text-gray-900">Itinerary</h2>
          <ol className="mt-4 space-y-4 border-l-2 border-brand-gold/25 pl-5">
            {itineraryLines.map((line, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[27px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-brand-gold bg-background" />
                <p className="text-sm leading-relaxed text-gray-700">{line}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Vehicle features */}
      {vehicle?.features && vehicle.features.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-xl font-bold text-gray-900">
            Your Vehicle{vehicle.name ? ` — ${vehicle.name}` : ""}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {vehicle.features.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/20 bg-surface-soft px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                <svg className="h-3.5 w-3.5 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Inline booking flow — replaces the old modal. */}
      <section className="mt-12 scroll-mt-24">
        <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900">
          {isGroup ? "Reserve Your Seats" : "Book This Yatra"}
        </h2>
        <YatraBookingPanel
          pkg={pkg}
          seatsLeft={seatsLeft}
          isLoggedIn={isLoggedIn}
          prefill={prefill}
          loginHref={loginHref}
        />
      </section>

      {/* Sticky mobile CTA — scrolls to the booking section */}
      {!soldOut && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-gold/20 bg-card-bg/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(120,53,15,0.25)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-screen-sm items-center gap-3">
            <div className="shrink-0">
              <p className="text-[11px] text-gray-500">{isGroup ? "Per seat" : "From"}</p>
              <p className="text-lg font-bold leading-tight text-brand-red">
                {formatInr(parseNumeric(pkg.price))}
              </p>
            </div>
            <a
              href="#book"
              className="flex-1 rounded-xl bg-brand-red py-3 text-center text-sm font-semibold text-white"
            >
              Book this Yatra
            </a>
          </div>
        </div>
      )}

      {lightbox && images.length > 0 && (
        <ImageLightbox images={images} alt={pkg.name} onClose={() => setLightbox(false)} />
      )}
    </div>
  );
}
