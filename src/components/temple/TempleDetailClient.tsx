"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
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
import { ProductCarousel } from "@/components/temple/ProductCarousel";
import { galleryOf } from "@/lib/gallery";

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
        <section className="space-y-5">
          <SectionHeading
            title="Sacred Prasad"
            subtitle="Blessed offerings, prepared with devotion and delivered to your door"
          />
          {prasad.length === 0 ? (
            <p className="text-sm text-gray-500">No prasad listed yet.</p>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {prasad.map((p) => (
                <PrasadCard key={p.id} item={p} />
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
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-card-bg"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-soft">
                    <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                      <ProductCarousel
                        images={galleryOf(s)}
                        alt={s.name}
                      />
                    </div>
                    <div className="absolute left-2.5 top-2.5 z-10">
                      <InCartBadge itemType="seva" itemId={s.id} />
                    </div>
                  </div>

                  <div className="space-y-3 p-5">
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
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "frame" && (
        <section className="space-y-5">
          <SectionHeading
            title="Divine Frames"
            subtitle="Bring the deity's darshan home — curated frames for your sacred space"
          />
          {frameGroups.length === 0 ? (
            <p className="text-sm text-gray-500">No frames listed yet.</p>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        <section className="space-y-5">
          <SectionHeading
            title="Poshak & Cloth"
            subtitle="Handcrafted attire to adorn the deity with reverence"
          />
          {cloth.length === 0 ? (
            <p className="text-sm text-gray-500">No cloth items yet.</p>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
 * Premium section heading shared by the product tabs — a devotional
 * eyebrow rule, serif title, and a soft supporting line.
 */
function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-1.5">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
        <span className="h-px w-6 bg-brand-gold/50" />
        Brajmarg
      </span>
      <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-[28px]">
        {title}
      </h2>
      <p className="max-w-xl text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

/** Shared shell so every product card reads as one curated system. */
function CardShell({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-brand-gold/15 bg-card-bg shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/30 hover:shadow-md"
    >
      {children}
    </Link>
  );
}

/**
 * Compact price + action footer, pinned to the card bottom so every
 * CTA aligns on the same baseline regardless of title length.
 */
function CardFooter({
  price,
  fromLabel = false,
}: {
  price: number;
  fromLabel?: boolean;
}) {
  return (
    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
      <div className="flex items-baseline gap-1">
        {fromLabel && (
          <span className="text-[10px] font-medium text-gray-400">From</span>
        )}
        <span className="text-base font-bold text-brand-red">
          {formatInr(price)}
        </span>
      </div>
      <span className="inline-flex items-center gap-1 rounded-lg bg-brand-red px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-brand-red-dark">
        View
        <svg
          className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  );
}

/**
 * Frame card on the temple listing — links to the product detail
 * page. Each size variant carries its own image, so a grouped frame
 * gets a real multi-image carousel. Shows min price across variants.
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
  // Each size variant carries its own gallery → combine them all so
  // the card carousel walks every photo across every variant.
  const images = group.variants.flatMap((v) => galleryOf(v));

  return (
    <CardShell href={href}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProductCarousel images={images} alt={group.name} />
        </div>
        <div className="absolute left-2.5 top-2.5 z-10">
          <InCartBadge itemType="frame" itemId={cover.id} />
        </div>
        {hasMultiple && (
          <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-gold shadow-sm backdrop-blur">
            {group.variants.length} sizes
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2">
          {group.name}
        </h3>
        {group.material && (
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400 line-clamp-1">
            {group.material} · Frame
          </p>
        )}
        <CardFooter price={minPrice} fromLabel={hasMultiple} />
      </div>
    </CardShell>
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
    <CardShell href={href}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProductCarousel images={galleryOf(item)} alt={item.name} />
        </div>
        <div className="absolute left-2.5 top-2.5 z-10">
          <InCartBadge itemType="cloth" itemId={item.id} />
        </div>
        {!item.in_stock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">
              Out of stock
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2">
          {item.name}
        </h3>
        {item.material && (
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400 line-clamp-1">
            {item.material} · Poshak
          </p>
        )}
        <CardFooter price={parseNumeric(item.price)} />
      </div>
    </CardShell>
  );
}

/**
 * Prasad has no detail page, so the card carries the full story:
 * an image carousel, devotional context, price, and an inline
 * add-to-cart / quantity control. Compact and warm by design.
 */
function PrasadCard({ item }: { item: PrasadItem }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-brand-gold/15 bg-card-bg shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/30 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProductCarousel images={galleryOf(item)} alt={item.name} />
        </div>
        <div className="absolute left-2.5 top-2.5 z-10">
          <InCartBadge itemType="prasad" itemId={item.id} />
        </div>
        <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-gold shadow-sm backdrop-blur">
          Prasad
        </span>
        {!item.in_stock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">
              Out of stock
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2">
            {item.name}
          </h3>
          <p className="shrink-0 text-base font-bold text-brand-red">
            {formatInr(parseNumeric(item.price))}
          </p>
        </div>
        {item.ingredients && (
          <p className="mt-1 text-[11px] leading-relaxed text-gray-500 line-clamp-1">
            <span className="font-medium uppercase tracking-wide text-gray-400">
              Ingredients:
            </span>{" "}
            {item.ingredients}
          </p>
        )}
        <div className="mt-auto pt-3">
          <CartItemControl
            itemType="prasad"
            itemId={item.id}
            disabled={!item.in_stock}
            label={item.in_stock ? "Add to cart" : "Out of stock"}
          />
        </div>
      </div>
    </article>
  );
}
