import Link from "next/link";
import type { Temple } from "@/types/database";
import { slugify } from "@/lib/slug";

export default function TempleCard({ temple }: { temple: Temple }) {
  const href = temple.is_coming_soon ? "#" : `/temple/${slugify(temple.name)}`;

  return (
    <Link
      href={href}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-brand-gold/15 bg-card-bg shadow-devotional transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/30 hover:shadow-devotional-lg ${
        temple.is_coming_soon ? "pointer-events-none opacity-70" : ""
      }`}
    >
      {/* Image — fixed 4:3 ratio so every card frames identically
          regardless of the source photo's dimensions. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        {temple.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={temple.image_url}
            alt={temple.name}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-gold-soft via-surface-soft to-amber-100 flex items-center justify-center">
            <span className="text-4xl text-brand-gold/40">॥</span>
          </div>
        )}

        {/* Coming Soon badge */}
        {temple.is_coming_soon && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-semibold text-white shadow">
            Coming Soon
          </span>
        )}
      </div>

      {/* Caption bar */}
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className="font-serif text-lg font-bold leading-tight text-gray-900 truncate">
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
          <span className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-brand-red px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-brand-red-dark">
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
