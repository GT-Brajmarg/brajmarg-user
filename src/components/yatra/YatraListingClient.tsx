"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PackageType, YatraPackage } from "@/types/database";
import { normalizePackageType, type SeatInfo } from "@/lib/yatra";
import { parseNumeric } from "@/lib/format";
import YatraCard from "@/components/yatra/YatraCard";

type Filter = "all" | PackageType;
type Sort = "recommended" | "price_low" | "price_high";

const TABS: { key: Filter; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    key: "all",
    label: "All Yatras",
    sub: "View all available yatras",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    ),
  },
  {
    key: "solo",
    label: "Full Package",
    sub: "Vehicle Included",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01" />
    ),
  },
  {
    key: "group",
    label: "Seat Booking",
    sub: "Shared Yatra",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" />
    ),
  },
];

const SORTS: { key: Sort; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "price_low", label: "Price: Low to High" },
  { key: "price_high", label: "Price: High to Low" },
];

export default function YatraListingClient({
  packages,
  seats,
}: {
  packages: YatraPackage[];
  /** Plain object keyed by package id (server components can't pass a Map). */
  seats: Record<string, SeatInfo>;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recommended");

  const counts = useMemo(() => {
    let solo = 0;
    let group = 0;
    for (const p of packages) {
      if (normalizePackageType(p.package_type) === "group") group += 1;
      else solo += 1;
    }
    return { all: packages.length, solo, group };
  }, [packages]);

  const visible = useMemo(() => {
    const filtered = packages.filter((p) =>
      filter === "all" ? true : normalizePackageType(p.package_type) === filter
    );
    const sorted = [...filtered];
    if (sort === "price_low") {
      sorted.sort((a, b) => parseNumeric(a.price) - parseNumeric(b.price));
    } else if (sort === "price_high") {
      sorted.sort((a, b) => parseNumeric(b.price) - parseNumeric(a.price));
    }
    // "recommended" keeps the server's display_order.
    return sorted;
  }, [packages, filter, sort]);

  return (
    <>
      {/* Header band: title + (All Yatras / My Bookings) card pair */}
      <div className="border-b border-brand-gold/15 bg-gradient-to-b from-surface-soft to-background">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                <span className="h-px w-6 bg-brand-gold/50" />
                Brajmarg Yatra
              </span>
              <h1 className="mt-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Choose Your Divine Journey
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
                Select the yatra experience that suits your devotion and travel
                preference — book the whole vehicle, or reserve seats on a
                shared yatra.
              </p>
            </div>

            {/* All Yatras / My Bookings card pair */}
            <div className="flex shrink-0 gap-3">
              <div className="flex items-center gap-2.5 rounded-xl border-2 border-brand-red/40 bg-card-bg px-4 py-3 shadow-sm">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-red/10 text-brand-red">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-bold text-brand-red">All Yatras</p>
                  <p className="text-[11px] text-gray-500">
                    {counts.all} available
                  </p>
                </div>
              </div>
              <Link
                href="/account/orders"
                className="group flex items-center gap-2.5 rounded-xl border border-brand-gold/25 bg-card-bg px-4 py-3 shadow-sm transition-colors hover:border-brand-gold/50"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gold-soft text-brand-gold">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">My Bookings</p>
                  <p className="text-[11px] text-gray-500">Check your bookings</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Tabs + Sort */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap gap-2.5">
              {TABS.map((tab) => {
                const active = filter === tab.key;
                const count =
                  tab.key === "all"
                    ? counts.all
                    : tab.key === "solo"
                      ? counts.solo
                      : counts.group;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setFilter(tab.key)}
                    aria-pressed={active}
                    className={[
                      "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition-colors",
                      active
                        ? "border-brand-red bg-brand-red text-white shadow-sm"
                        : "border-brand-gold/25 bg-card-bg text-gray-700 hover:border-brand-gold/50",
                    ].join(" ")}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      {tab.icon}
                    </svg>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">
                        {tab.label}
                        <span
                          className={[
                            "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                            active ? "bg-white/20" : "bg-brand-gold-soft text-brand-gold",
                          ].join(" ")}
                        >
                          {count}
                        </span>
                      </span>
                      <span
                        className={[
                          "text-[11px] leading-tight",
                          active ? "text-white/80" : "text-gray-400",
                        ].join(" ")}
                      >
                        {tab.sub}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-lg border border-brand-gold/30 bg-card-bg px-3 py-1.5 text-sm font-medium text-gray-800 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {visible.length > 0 ? (
          <div className="flex flex-col gap-5">
            {visible.map((pkg) => (
              <YatraCard key={pkg.id} pkg={pkg} seats={seats[pkg.id] ?? null} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-gold/30 bg-card-bg p-12 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-gold-soft text-brand-gold">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="font-semibold text-gray-800">
              {filter === "all"
                ? "No yatras available right now."
                : "No yatras in this category right now."}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {filter === "all" ? (
                "New journeys will appear here once they're published."
              ) : (
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="text-brand-red hover:underline"
                >
                  View all yatras
                </button>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
