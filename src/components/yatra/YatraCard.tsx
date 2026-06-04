import Link from "next/link";
import type { YatraPackage } from "@/types/database";
import { formatInr, parseNumeric } from "@/lib/format";
import { slugify } from "@/lib/slug";
import {
  formatTime,
  formatWeekdays,
  isGroupPackage,
  type SeatInfo,
} from "@/lib/yatra";

/** Inclusion / feature pill shown in the card body (e.g. "AC", "Meals"). */
function FeatureChip({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand-gold/20 bg-surface-soft px-2.5 py-1 text-[11px] font-medium text-gray-600">
      <svg className="h-3.5 w-3.5 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {children}
    </span>
  );
}

/** One labelled fact in the bottom strip (Duration / Distance / Vehicle …). */
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
    <div className="flex items-center gap-2">
      <svg className="h-4 w-4 shrink-0 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-gray-400">{label}</p>
        <p className="truncate text-xs font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function ImagePlaceholder({ isGroup }: { isGroup: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-gold-soft via-surface-soft to-amber-100">
      <svg className="h-10 w-10 text-brand-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        {isGroup ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01" />
        )}
      </svg>
      <span className="text-2xl text-brand-gold/40">॥</span>
    </div>
  );
}

export default function YatraCard({
  pkg,
  seats = null,
}: {
  pkg: YatraPackage;
  seats?: SeatInfo | null;
}) {
  const href = `/yatra/${slugify(pkg.name)}`;
  const days = pkg.duration_days ?? 0;
  const nights = pkg.duration_nights ?? 0;
  const duration = days || nights ? `${days} Days / ${nights} Night${nights === 1 ? "" : "s"}` : "—";
  const vehicleName = pkg.vehicles?.name ?? pkg.vehicles?.vehicle_type ?? "—";
  const capacity = pkg.vehicles?.seating_capacity ?? null;
  const isAc = pkg.vehicles?.is_ac ?? false;

  const isGroup = isGroupPackage(pkg);
  const seatsLeft = seats?.left ?? null;
  const soldOut = isGroup && seatsLeft != null && seatsLeft <= 0;
  const lowSeats = isGroup && seatsLeft != null && seatsLeft > 0 && seatsLeft <= 3;

  const schedule = isGroup ? formatWeekdays(pkg.weekdays) : "";
  const depart = isGroup ? formatTime(pkg.departure_time) : "";

  const category = isGroup
    ? "Best for Solo Travelers"
    : capacity && capacity >= 5
      ? "Best for Families & Groups"
      : "Private Vehicle";

  // Feature chips: AC + a few inclusions, with a "+N More" overflow pill.
  const baseChips: { icon: string; label: string }[] = [];
  baseChips.push({
    icon: isGroup
      ? "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z"
      : "M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01",
    label: isGroup ? "Shared Vehicle" : "Private Vehicle",
  });
  if (isAc) baseChips.push({ icon: "M12 3v18m9-9H3", label: "AC" });
  const inclusionChips = (pkg.inclusions ?? []).slice(0, 2).map((inc) => ({
    icon: "M5 13l4 4L19 7",
    label: inc.length > 18 ? inc.slice(0, 17) + "…" : inc,
  }));
  const chips = [...baseChips, ...inclusionChips];
  const totalInclusions = (pkg.inclusions?.length ?? 0) + baseChips.length;
  const moreCount = Math.max(0, totalInclusions - chips.length);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-gold/15 bg-card-bg shadow-devotional transition-all duration-300 hover:border-brand-gold/30 hover:shadow-devotional-lg md:flex-row">
      {/* Image (left) */}
      <Link
        href={href}
        className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-soft md:aspect-auto md:w-72 lg:w-80"
      >
        {pkg.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pkg.image_url}
            alt={pkg.name}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder isGroup={isGroup} />
        )}
        {/* Booking-type badge (top-left over image) */}
        <span
          className={[
            "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm",
            isGroup ? "bg-sky-600/95" : "bg-emerald-700/95",
          ].join(" ")}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            {isGroup ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01" />
            )}
          </svg>
          <span className="flex flex-col leading-none">
            {isGroup ? "Seat Booking" : "Full Package"}
            <span className="mt-0.5 text-[9px] font-medium normal-case opacity-90">
              {isGroup ? "Shared Yatra" : "Vehicle Included"}
            </span>
          </span>
        </span>
        {isGroup && seatsLeft != null && (
          <span
            className={[
              "absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-sm",
              soldOut
                ? "bg-gray-800/90 text-white"
                : lowSeats
                  ? "bg-amber-500/95 text-white"
                  : "bg-white/95 text-emerald-700",
            ].join(" ")}
          >
            {soldOut ? "Sold out" : `${seatsLeft} seats left`}
          </span>
        )}
      </Link>

      {/* Center: details */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <Link href={href}>
            <h3 className="font-serif text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-brand-red">
              {pkg.name}
            </h3>
          </Link>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
            <svg className="h-4 w-4 shrink-0 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" />
            </svg>
            <span className="truncate">
              {pkg.from_location} → {pkg.to_location}
            </span>
          </p>
        </div>

        {/* Feature chips with +N More */}
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c, i) => (
            <FeatureChip key={i} icon={c.icon}>
              {c.label}
            </FeatureChip>
          ))}
          {moreCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-brand-gold-soft px-2.5 py-1 text-[11px] font-semibold text-brand-gold">
              +{moreCount} More
            </span>
          )}
        </div>

        {/* Fact strip */}
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-brand-gold/10 pt-3 sm:grid-cols-4">
          <Fact icon="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" label="Duration" value={duration} />
          <Fact icon="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" label="Distance" value={pkg.distance_km != null ? `${pkg.distance_km} km` : "—"} />
          {isGroup && schedule ? (
            <Fact icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" label="Departs" value={depart ? `${schedule} · ${depart}` : schedule} />
          ) : (
            <Fact icon="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01" label="Vehicle" value={vehicleName} />
          )}
          {isGroup ? (
            <Fact icon="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" label="Seats" value={seatsLeft != null ? `${seatsLeft} available` : `${capacity ?? "—"} total`} />
          ) : (
            <Fact icon="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" label="Capacity" value={capacity != null ? `${capacity} Seater${isAc ? " · AC" : ""}` : "—"} />
          )}
        </div>
      </div>

      {/* Right rail: price + CTA */}
      <div className="flex shrink-0 flex-col justify-center gap-2.5 border-t border-brand-gold/10 bg-surface-soft/50 p-4 sm:p-5 md:w-52 md:border-l md:border-t-0">
        <span
          className={[
            "w-fit rounded-md px-2.5 py-1 text-[11px] font-bold",
            isGroup ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700",
          ].join(" ")}
        >
          {category}
        </span>
        <div>
          <p className="text-2xl font-bold text-brand-red">
            {formatInr(parseNumeric(pkg.price))}
          </p>
          {isGroup ? (
            <p className="text-xs text-gray-500">per seat</p>
          ) : (
            pkg.price_per_km != null && (
              <p className="text-xs text-gray-500">
                + {formatInr(parseNumeric(pkg.price_per_km))}/km extra
              </p>
            )
          )}
        </div>
        <Link
          href={soldOut ? "#" : href}
          aria-disabled={soldOut}
          className={[
            "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
            soldOut
              ? "pointer-events-none bg-gray-200 text-gray-500"
              : "bg-brand-red text-white hover:bg-brand-red-dark",
          ].join(" ")}
        >
          {soldOut ? "Sold out" : "View Details"}
          {!soldOut && (
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </Link>
        <p className="inline-flex items-center gap-1 text-[11px] text-gray-400">
          <svg className="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Secure Booking
        </p>
      </div>
    </article>
  );
}
