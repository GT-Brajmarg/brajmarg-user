import { createClient } from "@/utils/supabase/server";
import { createServiceClient } from "@/utils/supabase/admin";
import YatraListingClient from "@/components/yatra/YatraListingClient";
import type { YatraPackage } from "@/types/database";
import { seatsLeftFor, type SeatInfo } from "@/lib/yatra";

export const metadata = {
  title: "Yatra Packages — Brajmarg",
  description:
    "Curated darshan yatras with comfortable vehicles, satvik food, and a soulful route through the Braj region.",
};

const TRUST = [
  {
    title: "Trusted & Verified",
    sub: "All yatras are verified for your safety",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Comfort & Convenience",
    sub: "Well-maintained vehicles and experienced drivers",
    icon: "M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01",
  },
  {
    title: "Devotee Support",
    sub: "24/7 assistance during your yatra",
    icon: "M18 10a6 6 0 10-12 0v3.586l-.707.707A1 1 0 006 16h12a1 1 0 00.707-1.707L18 13.586V10z",
  },
  {
    title: "Flexible Options",
    sub: "Choose full package or seat booking",
    icon: "M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z",
  },
];

export default async function YatraPage() {
  const supabase = await createClient();

  // Active packages with their embedded vehicle (one query via the FK).
  const { data } = await supabase
    .from("yatra_packages")
    .select(
      "*, vehicles(name,vehicle_type,seating_capacity,is_ac,features,image_url)"
    )
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  const packages = (data ?? []) as YatraPackage[];

  // Seats-left for group packages, derived from live bookings via the
  // service client (per-user RLS can't see other customers' orders).
  // Serialise the Map to a plain object so it can cross the server→client
  // boundary into the interactive listing.
  const seats: Record<string, SeatInfo> = {};
  const admin = createServiceClient();
  if (admin) {
    const map = await seatsLeftFor(admin, packages);
    for (const [id, info] of map) seats[id] = info;
  }

  return (
    <main className="flex-1">
      <YatraListingClient packages={packages} seats={seats} />

      {/* Trust strip */}
      <div className="mx-auto max-w-screen-2xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-brand-gold/15 bg-card-bg p-5 shadow-devotional sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gold-soft text-brand-gold">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">{t.title}</p>
                <p className="text-xs leading-snug text-gray-500">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shri Radhe Krishna devotional footer band */}
      <div className="relative overflow-hidden border-t border-brand-gold/20 bg-gradient-to-b from-brand-gold-soft/60 to-surface-soft">
        {/* Faint temple-silhouette pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--brand-gold) 0 2px, transparent 2px 22px)",
          }}
        />
        <div className="relative mx-auto max-w-screen-2xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="font-serif text-lg font-bold text-brand-red sm:text-xl">
            ॥ श्री राधे कृष्ण ॥
          </p>
          <p className="mt-1 text-sm text-gray-600">
            May your yatra be filled with devotion, peace &amp; divine
            blessings.
          </p>
        </div>
      </div>
    </main>
  );
}
