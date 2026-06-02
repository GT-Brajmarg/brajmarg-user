"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
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
import { ImageLightbox } from "@/components/temple/ImageLightbox";
import { ZoomTrigger } from "@/components/temple/ZoomTrigger";
import { galleryOf } from "@/lib/gallery";

/** Payload for the shared, single-instance lightbox overlay. */
type LightboxState = { images: Array<string | null | undefined>; alt: string };

type TabId = "schedule" | "prasad" | "seva" | "frame" | "cloth";

const TABS: { id: TabId; label: string }[] = [
  { id: "schedule", label: "Temple Schedule" },
  { id: "prasad", label: "Prasad" },
  { id: "seva", label: "Rajbhog / Seva" },
  { id: "frame", label: "Frame" },
  { id: "cloth", label: "Cloth" },
];

// day_of_week is stored as a numeric string matching JS Date.getDay():
// 0 = Sunday … 6 = Saturday (the admin panel's convention). Some rows may
// also use the legacy "daily" tag, which applies to every weekday.
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DAILY = "daily";

/** Normalises a stored day_of_week into a comparable key. */
function dayKey(d: string): string {
  return (d ?? "").trim().toLowerCase();
}

/** True if a timing row applies to the given weekday index (0–6). */
function timingMatchesDay(rowDay: string, weekdayIndex: number): boolean {
  const key = dayKey(rowDay);
  if (key === DAILY) return true;
  return key === String(weekdayIndex);
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
  const router = useRouter();
  const searchParams = useSearchParams();

  // Resolve the tab to show on first paint.
  //   • A hard reload always falls back to the default (first) tab —
  //     per product spec, refreshing forgets the active tab.
  //   • Any other entry (deep link from a detail page, back/forward
  //     navigation) honours the ?tab= param so the last tab is kept.
  const initialTab = useMemo<TabId>(() => {
    const fromUrl = searchParams.get("tab");
    const valid = TABS.some((x) => x.id === fromUrl) ? (fromUrl as TabId) : null;
    if (typeof window !== "undefined") {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (nav?.type === "reload") return "schedule";
    }
    return valid ?? "schedule";
    // Read once on mount; later changes are driven by selectTab/popstate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tab, setTab] = useState<TabId>(initialTab);

  // Switching a tab rewrites the URL in place (replace — no new history
  // entry, no scroll jump, no server round-trip). We use the Next router's
  // replace (not window.history.replaceState) so the App Router's own
  // history entry stays in sync with the URL. Otherwise a later
  // router.push("/cart") is recorded against the stale entry (the bare
  // temple URL with no ?tab=), and Back lands on the default Schedule tab
  // instead of the tab the cart was opened from.
  const selectTab = useCallback(
    (next: TabId) => {
      setTab(next);
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      if (next === "schedule") url.searchParams.delete("tab");
      else url.searchParams.set("tab", next);
      router.replace(`${url.pathname}${url.search}`, { scroll: false });
    },
    [router]
  );

  // Keep the active tab in sync with Back/Forward navigation.
  useEffect(() => {
    const onPop = () => {
      const fromUrl = new URLSearchParams(window.location.search).get("tab");
      setTab(TABS.some((x) => x.id === fromUrl) ? (fromUrl as TabId) : "schedule");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Make sure the URL reflects the resolved initial tab so the first
  // detail-page link or cart-open captures the correct tab on return.
  // Uses router.replace (not history.replaceState) for the same reason as
  // selectTab: keep the App Router history entry in sync with the URL.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const current = url.searchParams.get("tab");
    const desired = tab === "schedule" ? null : tab;
    if (current !== desired) {
      if (desired) url.searchParams.set("tab", desired);
      else url.searchParams.delete("tab");
      router.replace(`${url.pathname}${url.search}`, { scroll: false });
    }
    // Run once after mount to align URL ↔ initialTab.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [toast, setToast] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const showHeroImage = Boolean(temple.image_url) && !heroImgFailed;

  // Selected weekday (0–6). Defaults to today; the user can switch days.
  // Initialised in an effect so SSR and the first client render agree
  // (today is only known client-side).
  const [selectedDay, setSelectedDay] = useState<number>(0);
  useEffect(() => {
    setSelectedDay(new Date().getDay());
  }, []);

  // Which weekdays actually have any slots (incl. "daily"), so we can
  // hint which tabs are populated.
  const daysWithSlots = useMemo(() => {
    const set = new Set<number>();
    for (const row of timings) {
      const key = dayKey(row.day_of_week);
      if (key === DAILY) {
        for (let i = 0; i < 7; i++) set.add(i);
      } else {
        const n = Number(key);
        if (Number.isInteger(n) && n >= 0 && n <= 6) set.add(n);
      }
    }
    return set;
  }, [timings]);

  // Timings for the selected day only, ordered by opening time.
  const dayTimings = useMemo(
    () =>
      timings
        .filter((row) => timingMatchesDay(row.day_of_week, selectedDay))
        .sort((a, b) => a.opening_time.localeCompare(b.opening_time)),
    [timings, selectedDay]
  );

  const frameGroups = useMemo(() => groupFrameItems(frames), [frames]);
  const templeSlug = useMemo(() => slugify(temple.name), [temple.name]);

  const openLightbox = (images: Array<string | null | undefined>, alt: string) =>
    setLightbox({ images, alt });

  // Breadcrumb Back: step back through history when there's an
  // in-app entry to return to, otherwise land on the home dashboard.
  const goBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

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

      {/* Back button + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-red/30 bg-card-bg px-3.5 py-1.5 text-sm font-semibold text-brand-red transition-colors hover:bg-brand-red hover:text-white hover:border-brand-red"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>

        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-gray-500 transition-colors hover:text-brand-red"
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
                <span className="hidden sm:inline">Home</span>
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
            <li aria-current="page" className="min-w-0">
              <span className="block truncate font-semibold text-brand-red">
                {temple.name}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {temple.description && (
        <div>
          <p
            className={`text-sm leading-relaxed text-gray-700 sm:text-base ${
              descExpanded ? "" : "line-clamp-3"
            }`}
          >
            {temple.description}
          </p>
          {temple.description.length > 220 && (
            <button
              type="button"
              onClick={() => setDescExpanded((v) => !v)}
              className="mt-1 text-sm font-semibold text-brand-red hover:text-brand-red-dark"
            >
              {descExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="sticky top-16 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 bg-background/90 backdrop-blur border-b border-gray-200 sm:border-0 pb-2 sm:pb-0">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap scrollbar-thin">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => selectTab(t.id)}
              aria-pressed={tab === t.id}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                tab === t.id
                  ? "border-brand-red bg-brand-red text-white shadow-sm"
                  : "border-gray-200 bg-card-bg text-gray-700 hover:border-brand-red/40 hover:text-brand-red"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "schedule" && (
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading
              title="Daily Darshan Timings"
              subtitle="Plan your darshan — slots listed for the selected weekday"
            />
            {selectedDay === new Date().getDay() && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-soft px-3 py-1 text-xs font-semibold text-brand-gold">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
                </svg>
                Today
              </span>
            )}
          </div>

          {/* Day selector — pick any weekday to see its slots. */}
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((name, i) => {
              const isSelected = i === selectedDay;
              const hasSlots = daysWithSlots.has(i);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedDay(i)}
                  aria-pressed={isSelected}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? "bg-brand-red text-white shadow-sm"
                      : hasSlots
                        ? "bg-card-bg text-gray-700 ring-1 ring-brand-gold/20 hover:bg-brand-gold-soft"
                        : "bg-surface-soft text-gray-400 ring-1 ring-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>

          {dayTimings.length === 0 ? (
            <p className="text-sm text-gray-500">
              No darshan timings for {WEEKDAYS[selectedDay]}.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {dayTimings.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col rounded-xl border border-brand-gold/15 bg-card-bg p-4 shadow-sm transition-shadow hover:shadow-devotional"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gold-soft text-brand-gold">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <p className="mt-3 font-serif text-base font-bold text-gray-900">
                    {row.label ?? "Darshan"}
                  </p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-brand-red">
                    {formatTime(row.opening_time)} – {formatTime(row.closing_time)}
                  </p>
                  {row.special_note && (
                    <p className="mt-2 text-xs leading-snug text-gray-500">
                      {row.special_note}
                    </p>
                  )}
                </div>
              ))}
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
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {prasad.map((p) => (
                <PrasadCard key={p.id} item={p} onZoom={openLightbox} />
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "seva" && (
        <section className="space-y-5">
          <SectionHeading
            title="Rajbhog / Seva"
            subtitle="Register a sankalp — sacred service offerings performed in your name"
          />
          {seva.length === 0 ? (
            <p className="text-sm text-gray-500">No seva listed yet.</p>
          ) : (
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {seva.map((s) => (
                <SevaCard
                  key={s.id}
                  item={s}
                  templeSlug={templeSlug}
                  onZoom={openLightbox}
                />
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
                  onZoom={openLightbox}
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
                  onZoom={openLightbox}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <ToastHost message={toast} onDismiss={() => setToast(null)} />
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
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
  onZoom,
}: {
  group: FrameGroup;
  templeSlug: string;
  onZoom: (images: Array<string | null | undefined>, alt: string) => void;
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
        <ZoomTrigger onOpen={() => onZoom(images, group.name)} />
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
  onZoom,
}: {
  item: ClothItem;
  templeSlug: string;
  onZoom: (images: Array<string | null | undefined>, alt: string) => void;
}) {
  const href = `/temple/${templeSlug}/cloth/${slugify(item.name)}`;
  const images = galleryOf(item);

  return (
    <CardShell href={href}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProductCarousel images={images} alt={item.name} />
        </div>
        <div className="absolute left-2.5 top-2.5 z-10">
          <InCartBadge itemType="cloth" itemId={item.id} />
        </div>
        <ZoomTrigger onOpen={() => onZoom(images, item.name)} />
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
function PrasadCard({
  item,
  onZoom,
}: {
  item: PrasadItem;
  onZoom: (images: Array<string | null | undefined>, alt: string) => void;
}) {
  const images = galleryOf(item);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-brand-gold/15 bg-card-bg shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/30 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProductCarousel images={images} alt={item.name} />
        </div>
        <div className="absolute left-2.5 top-2.5 z-10">
          <InCartBadge itemType="prasad" itemId={item.id} />
        </div>
        <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-gold shadow-sm backdrop-blur">
          Prasad
        </span>
        <ZoomTrigger onOpen={() => onZoom(images, item.name)} />
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

/**
 * Seva card — same compact 4:3 layout as Prasad/Frame/Cloth so the grid
 * stays uniform across tabs. Surfaces the time pill and a single-line
 * details hint; the Register CTA replaces the linked footer pill since
 * Seva (like Prasad) has no detail page.
 */
function SevaCard({
  item,
  templeSlug,
  onZoom,
}: {
  item: SevaItem;
  templeSlug: string;
  onZoom: (images: Array<string | null | undefined>, alt: string) => void;
}) {
  // Seva names are Hindi/Devanagari -> slugify() returns "" for them; use
  // the row id as the URL key (robust + unique). The detail page also lets
  // the user pick a CUSTOM contribution amount.
  const detailHref = `/temple/${templeSlug}/seva/${item.id}`;
  const images = galleryOf(item);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-brand-gold/15 bg-card-bg shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/30 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProductCarousel images={images} alt={item.name} />
        </div>
        <div className="absolute left-2.5 top-2.5 z-10">
          <InCartBadge itemType="seva" itemId={item.id} />
        </div>
        <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-gold shadow-sm backdrop-blur">
          Seva
        </span>
        <ZoomTrigger onOpen={() => onZoom(images, item.name)} />
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={detailHref}
            className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2 hover:text-brand-red"
          >
            {item.name}
          </Link>
          <p className="shrink-0 text-base font-bold text-brand-red">
            {formatInr(parseNumeric(item.price))}
          </p>
        </div>
        {item.time && (
          <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-md bg-red-50 px-2 py-0.5 text-[11px] font-medium text-brand-red">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
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
            {item.time}
          </span>
        )}
        {item.details && (
          <p className="mt-1 text-[11px] leading-relaxed text-gray-500 line-clamp-1">
            <span className="font-medium uppercase tracking-wide text-gray-400">
              Details:
            </span>{" "}
            {item.details}
          </p>
        )}
        <div className="mt-auto pt-3">
          <CartItemControl
            itemType="seva"
            itemId={item.id}
            label="Register for Seva"
          />
          <Link
            href={detailHref}
            className="mt-2 block text-center text-[11px] font-medium text-brand-red hover:underline"
          >
            View details · Contribute custom amount →
          </Link>
        </div>
      </div>
    </article>
  );
}
