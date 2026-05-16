"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type {
  ClothItem,
  FrameItem,
  PrasadItem,
  SevaItem,
  Temple,
  TempleTiming,
} from "@/types/database";
import { formatInr, parseNumeric } from "@/lib/format";
import { groupFrameItems, type FrameGroup } from "@/lib/frame-group";
import { slugify } from "@/lib/slug";
import CartItemControl from "@/components/CartItemControl";
import InCartBadge from "@/components/InCartBadge";
import ToastHost from "@/components/ToastHost";

type TabId = "schedule" | "prasad" | "seva" | "frame" | "cloth";

const TABS: { id: TabId; label: string }[] = [
  { id: "schedule", label: "Temple Schedule" },
  { id: "prasad", label: "Prasad" },
  { id: "seva", label: "Rajbhog / Seva" },
  { id: "frame", label: "Frame" },
  { id: "cloth", label: "Cloth" },
];

const DAY_ORDER = [
  "daily",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function dayRank(d: string) {
  const i = DAY_ORDER.indexOf(d.toLowerCase());
  return i === -1 ? 99 : i;
}

function formatTime(t: string) {
  const parts = t.split(":");
  const h = Number(parts[0] ?? 0);
  const m = Number(parts[1] ?? 0);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TempleDetailClient({
  temple,
  timings,
  prasad,
  seva,
  frames,
  cloth,
}: {
  temple: Temple;
  timings: TempleTiming[];
  prasad: PrasadItem[];
  seva: SevaItem[];
  frames: FrameItem[];
  cloth: ClothItem[];
}) {
  const searchParams = useSearchParams();
  const initialTab = ((): TabId => {
    const t = searchParams.get("tab");
    return TABS.some((x) => x.id === t) ? (t as TabId) : "schedule";
  })();
  const [tab, setTab] = useState<TabId>(initialTab);
  const [toast, setToast] = useState<string | null>(null);
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const showHeroImage = Boolean(temple.image_url) && !heroImgFailed;

  const sortedTimings = useMemo(
    () =>
      [...timings].sort(
        (a, b) => dayRank(a.day_of_week) - dayRank(b.day_of_week)
      ),
    [timings]
  );

  const frameGroups = useMemo(() => groupFrameItems(frames), [frames]);
  const templeSlug = useMemo(() => slugify(temple.name), [temple.name]);

  return (
    <div>
      {/* Hero — full-width banner. Tall enough that portrait deity
          photos read well; object-top keeps the face anchored when
          the image aspect is taller than the container. */}
      <div className="relative h-[360px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900">
        {showHeroImage && (
          <>
            {/* Soft blurred backdrop fills any letterboxed area on
                wider screens, so the hero never looks empty. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={temple.image_url ?? ""}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl opacity-60"
            />
            {/* Foreground image — contained on large screens so the
                full deity is visible, covered (top-anchored) on
                smaller screens for an immersive banner. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={temple.image_url ?? ""}
              alt={temple.name}
              onError={() => setHeroImgFailed(true)}
              className="relative h-full w-full object-cover object-top sm:object-contain"
            />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-8 sm:pb-8 max-w-screen-2xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
            {temple.name}
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-white/90 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            {temple.location}
          </p>
        </div>
      </div>

      {/* Content below hero */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* Breadcrumb + back link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-gray-500 hover:text-brand-red transition-colors"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10"
                  />
                </svg>
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </li>
            <li aria-current="page">
              <span className="font-semibold text-brand-red truncate max-w-[12rem] sm:max-w-none">
                {temple.name}
              </span>
            </li>
          </ol>
        </nav>

        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-card-bg px-4 py-1.5 text-sm font-semibold text-brand-red hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>
          Back to dashboard
        </Link>
      </div>

      {temple.description && (
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {temple.description}
        </p>
      )}

      {/* Tabs */}
      <div className="sticky top-16 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 bg-background/90 backdrop-blur border-b border-gray-200 sm:border-0 pb-2 sm:pb-0">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap scrollbar-thin">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors border ${
                tab === t.id
                  ? "bg-brand-red text-white border-brand-red"
                  : "bg-card-bg text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "schedule" && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Daily timings</h2>
          {sortedTimings.length === 0 ? (
            <p className="text-sm text-gray-500">Schedule coming soon.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-card-bg">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Day</th>
                    <th className="px-4 py-3 font-semibold">Slot</th>
                    <th className="px-4 py-3 font-semibold">Time</th>
                    <th className="px-4 py-3 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedTimings.map((row) => (
                    <tr key={row.id} className="text-gray-800">
                      <td className="px-4 py-3 capitalize whitespace-nowrap">
                        {row.day_of_week}
                      </td>
                      <td className="px-4 py-3">{row.label ?? "—"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatTime(row.opening_time)} –{" "}
                        {formatTime(row.closing_time)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {row.special_note ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {tab === "prasad" && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Prasad</h2>
          {prasad.length === 0 ? (
            <p className="text-sm text-gray-500">No prasad listed yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {prasad.map((p) => (
                <article
                  key={p.id}
                  className="rounded-xl border border-gray-200 bg-card-bg overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                    <div className="absolute top-2 left-2">
                      <InCartBadge itemType="prasad" itemId={p.id} />
                    </div>
                    {!p.in_stock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-900">
                          Out of stock
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-sm font-bold text-brand-red whitespace-nowrap">
                        {formatInr(parseNumeric(p.price))}
                      </p>
                    </div>
                    {p.ingredients && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        <span className="font-semibold">Ingredients:</span>{" "}
                        {p.ingredients}
                      </p>
                    )}
                    <div className="mt-auto pt-4">
                      <CartItemControl
                        itemType="prasad"
                        itemId={p.id}
                        disabled={!p.in_stock}
                        label={p.in_stock ? "Add to cart" : "Out of stock"}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "seva" && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Rajbhog / Seva</h2>
          {seva.length === 0 ? (
            <p className="text-sm text-gray-500">No seva listed yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {seva.map((s) => (
                <article
                  key={s.id}
                  className="rounded-xl border border-gray-200 bg-card-bg p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-gray-900 font-serif">
                      {s.name}
                    </h3>
                    <p className="text-base font-bold text-brand-red whitespace-nowrap">
                      {formatInr(parseNumeric(s.price))}
                    </p>
                  </div>

                  {s.time && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-red bg-red-50 px-2.5 py-1 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
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
                      {s.time}
                    </span>
                  )}

                  {s.details && (
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                        Details
                      </p>
                      <p className="text-sm text-gray-600 leading-snug mt-1">
                        {s.details}
                      </p>
                    </div>
                  )}

                  {s.significance && (
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                        Significance
                      </p>
                      <blockquote className="border-l-2 border-brand-red pl-3 mt-1 text-sm italic text-gray-600 leading-snug">
                        {s.significance}
                      </blockquote>
                    </div>
                  )}

                  <CartItemControl
                    itemType="seva"
                    itemId={s.id}
                    label="Register for Seva"
                    className="py-3"
                  />
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "frame" && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Frames</h2>
          {frameGroups.length === 0 ? (
            <p className="text-sm text-gray-500">No frames listed yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {frameGroups.map((g) => (
                <FrameGroupCard
                  key={g.name}
                  group={g}
                  templeSlug={templeSlug}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "cloth" && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Cloth / Poshak</h2>
          {cloth.length === 0 ? (
            <p className="text-sm text-gray-500">No cloth items yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cloth.map((c) => (
                <ClothProductCard
                  key={c.id}
                  item={c}
                  templeSlug={templeSlug}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <ToastHost message={toast} onDismiss={() => setToast(null)} />
      </div>
    </div>
  );
}

/**
 * Frame card on the temple listing — links to the product detail
 * page. Shows minimum price across size variants. The InCartBadge
 * counts the cover variant since that's what the user lands on.
 */
function FrameGroupCard({
  group,
  templeSlug,
}: {
  group: FrameGroup;
  templeSlug: string;
}) {
  const cover = group.variants[0];
  if (!cover) return null;

  const minPrice = Math.min(
    ...group.variants.map((v) => parseNumeric(v.price))
  );
  const hasMultiple = group.variants.length > 1;
  const href = `/temple/${templeSlug}/frame/${slugify(group.name)}`;

  return (
    <Link
      href={href}
      className="group rounded-xl border border-gray-200 bg-card-bg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
        {cover.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.image_url}
            alt={group.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
        <div className="absolute top-2 left-2">
          <InCartBadge itemType="frame" itemId={cover.id} />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {group.name}
        </h3>
        {group.material && (
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
            {group.material}
          </p>
        )}
        <p className="text-sm font-bold text-brand-red mt-2">
          {hasMultiple ? `From ${formatInr(minPrice)}` : formatInr(minPrice)}
        </p>
        <p className="mt-auto pt-3 text-xs font-semibold text-brand-red group-hover:underline">
          View details →
        </p>
      </div>
    </Link>
  );
}

/**
 * Cloth card on the temple listing — links to the product detail
 * page where the user picks size + colour.
 */
function ClothProductCard({
  item,
  templeSlug,
}: {
  item: ClothItem;
  templeSlug: string;
}) {
  const href = `/temple/${templeSlug}/cloth/${slugify(item.name)}`;

  return (
    <Link
      href={href}
      className="group rounded-xl border border-gray-200 bg-card-bg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
        {item.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image_url}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
        <div className="absolute top-2 left-2">
          <InCartBadge itemType="cloth" itemId={item.id} />
        </div>
        {!item.in_stock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-900">
              Out of stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {item.name}
        </h3>
        {item.material && (
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
            {item.material}
          </p>
        )}
        <p className="text-sm font-bold text-brand-red mt-2">
          {formatInr(parseNumeric(item.price))}
        </p>
        <p className="mt-auto pt-3 text-xs font-semibold text-brand-red group-hover:underline">
          View details →
        </p>
      </div>
    </Link>
  );
}
