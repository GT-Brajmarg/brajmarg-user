import Link from "next/link";
import type { TempleWithStatus } from "@/types/database";
import { slugify } from "@/lib/slug";

export default function TempleCard({ temple }: { temple: TempleWithStatus }) {
  const href = temple.is_coming_soon ? "#" : `/temple/${slugify(temple.name)}`;

  return (
    <Link
      href={href}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-brand-gold/15 bg-card-bg shadow-devotional transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-devotional-lg ${
        temple.is_coming_soon ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        {temple.image_url ? (
          <img
            src={temple.image_url}
            alt={temple.name}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-gold-soft via-surface-soft to-amber-100">
            <span className="text-4xl text-brand-gold/40">॥</span>
          </div>
        )}

        {/* Dark gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Coming Soon */}
        {temple.is_coming_soon && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Coming Soon
          </span>
        )}

        {/* Current Event */}
        {temple.currentEvent && (
          <div className="absolute bottom-3 left-3 right-3 z-20">
            <div className="rounded-xl border border-emerald-400/20 bg-black/45 px-3 py-2 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                    Live Now
                  </span>
                </div>
              </div>

              <p className="mt-1 text-sm font-semibold text-white line-clamp-1">
                {temple.currentEvent.label ?? "Darshan"}
              </p>

              {temple.currentEvent.remainingTime && (
                <p className="mt-1 text-xs font-medium text-emerald-200">
                  ⏳ Ends in {temple.currentEvent.remainingTime}
                </p>
              )}
            </div>
          </div>
        )}

        {!temple.currentEvent &&
          !temple.upcomingEvent &&
          temple.allEventsFinishedToday && (
            <div className="absolute bottom-3 left-3 right-3 z-20">
              <div className="rounded-xl border border-blue-400/20 bg-black/45 px-3 py-2 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                    Day Complete
                  </span>

                  <span className="text-lg">🌙</span>
                </div>

                <p className="mt-1 text-sm font-semibold text-white">
                  Today's Darshans Completed
                </p>

                <p className="mt-1 text-xs text-blue-200">
                  Please visit tomorrow
                </p>
              </div>
            </div>
          )}

        {/* Upcoming Event */}
        {!temple.currentEvent && temple.upcomingEvent && (
          <div className="absolute bottom-3 left-3 right-3 z-20">
            <div className="rounded-xl border border-amber-400/20 bg-black/45 px-3 py-2 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                  Next Darshan
                </span>

                <svg
                  className="h-4 w-4 text-amber-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <p className="mt-1 text-sm font-semibold text-white line-clamp-1">
                {temple.upcomingEvent.label ?? "Darshan"}
              </p>

              {temple.upcomingEvent.remainingTime && (
                <p className="mt-1 text-xs font-medium text-amber-200">
                  ⏰ Starts in {temple.upcomingEvent.remainingTime}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-lg font-bold leading-tight text-gray-900">
            {temple.name}
          </h3>

          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-500">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-brand-gold"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
            </svg>

            <span className="truncate">{temple.location}</span>
          </p>
        </div>

        {!temple.is_coming_soon && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-brand-red px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-brand-red-dark">
            Visit
            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </span>
        )}
      </div>
    </Link>
  );
}
