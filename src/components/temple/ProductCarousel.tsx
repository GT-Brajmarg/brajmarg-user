"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

/**
 * Premium devotional image experience.
 *
 * The product tables currently expose a single `image_url` per row,
 * but frames carry one image per size variant — so a grouped frame
 * already has a real multi-image gallery. These components accept an
 * array of image URLs and degrade gracefully to a single static image
 * (no dots, no arrows, no autoplay) when only one is supplied. When
 * the backend later adds an `images[]` field, nothing here changes.
 */

function cleanImages(images: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const src of images) {
    const s = (src ?? "").trim();
    if (s && !seen.has(s)) {
      seen.add(s);
      out.push(s);
    }
  }
  return out;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

type SwipeState = { x: number; y: number; active: boolean };

/* ── Compact carousel for listing / prasad cards ───────────────── */

export function ProductCarousel({
  images,
  alt,
  autoPlay = true,
  interval = 4200,
  objectFit = "cover",
  className = "",
}: {
  images: Array<string | null | undefined>;
  alt: string;
  autoPlay?: boolean;
  interval?: number;
  objectFit?: "cover" | "contain";
  className?: string;
}) {
  const pics = cleanImages(images);
  const count = pics.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipe = useRef<SwipeState>({ x: 0, y: 0, active: false });

  const go = useCallback(
    (next: number) => setIndex((next + count) % Math.max(count, 1)),
    [count]
  );

  useEffect(() => {
    if (!autoPlay || count < 2 || paused || prefersReducedMotion()) return;
    const id = window.setInterval(
      () => setIndex((c) => (c + 1) % count),
      interval
    );
    return () => window.clearInterval(id);
  }, [autoPlay, count, paused, interval]);

  // No image → warm devotional placeholder.
  if (count === 0) {
    return (
      <div
        className={`h-full w-full bg-gradient-to-br from-brand-gold-soft via-surface-soft to-amber-100 flex items-center justify-center ${className}`}
        aria-label={alt}
      >
        <span className="text-3xl text-brand-gold/50">॥</span>
      </div>
    );
  }

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        swipe.current = { x: t.clientX, y: t.clientY, active: true };
      }}
      onTouchEnd={(e) => {
        if (!swipe.current.active) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - swipe.current.x;
        const dy = t.clientY - swipe.current.y;
        swipe.current.active = false;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          go(dx < 0 ? index + 1 : index - 1);
        }
      }}
    >
      <div
        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {pics.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src + i}
            src={src}
            alt={i === 0 ? alt : `${alt} — view ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            className={`h-full w-full shrink-0 ${
              objectFit === "cover" ? "object-cover" : "object-contain"
            }`}
            draggable={false}
          />
        ))}
      </div>

      {/* Soft top + bottom gradient so badges/text float elegantly */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-black/5" />

      {count > 1 && (
        <>
          {/* Arrows — reveal on hover (desktop), tappable on mobile */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              stop(e);
              go(index - 1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-gray-800 shadow-md backdrop-blur-sm opacity-0 transition-opacity duration-200 hover:bg-white group-hover:opacity-100 max-sm:opacity-100"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              stop(e);
              go(index + 1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-gray-800 shadow-md backdrop-blur-sm opacity-0 transition-opacity duration-200 hover:bg-white group-hover:opacity-100 max-sm:opacity-100"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {pics.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={(e) => {
                  stop(e);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/55 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Immersive gallery for the product detail page ─────────────── */

function GalleryStage({
  pics,
  alt,
  view,
  go,
  contain,
  swipeRef,
}: {
  pics: string[];
  alt: string;
  view: number;
  go: (next: number) => void;
  contain?: boolean;
  swipeRef: RefObject<SwipeState>;
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onTouchStart={(e) => {
        const t = e.touches[0];
        swipeRef.current = { x: t.clientX, y: t.clientY, active: true };
      }}
      onTouchEnd={(e) => {
        if (!swipeRef.current.active) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - swipeRef.current.x;
        swipeRef.current.active = false;
        if (Math.abs(dx) > 45) go(dx < 0 ? view + 1 : view - 1);
      }}
    >
      <div
        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${view * 100}%)` }}
      >
        {pics.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src + i}
            src={src}
            alt={i === 0 ? alt : `${alt} — view ${i + 1}`}
            className={`h-full w-full shrink-0 ${
              contain ? "object-contain" : "object-cover"
            }`}
            draggable={false}
          />
        ))}
      </div>

      {pics.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(view - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-gray-800 shadow-lg backdrop-blur transition hover:bg-white"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(view + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-gray-800 shadow-lg backdrop-blur transition hover:bg-white"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export function ProductGallery({
  images,
  alt,
}: {
  images: Array<string | null | undefined>;
  alt: string;
}) {
  const pics = cleanImages(images);
  const count = pics.length;
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const swipe = useRef<SwipeState>({ x: 0, y: 0, active: false });

  // Clamp on read so a shrinking image list never needs an effect.
  const view = count > 0 ? Math.min(index, count - 1) : 0;

  const go = useCallback(
    (next: number) => setIndex((next + count) % Math.max(count, 1)),
    [count]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(view + 1);
      if (e.key === "ArrowLeft") go(view - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, view, go]);

  if (count === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-brand-gold-soft via-surface-soft to-amber-100 flex items-center justify-center">
        <span className="text-5xl text-brand-gold/40">॥</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main stage */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-brand-gold/15 bg-surface-soft">
        <GalleryStage
          pics={pics}
          alt={alt}
          view={view}
          go={go}
          swipeRef={swipe}
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
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {pics.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-20 sm:w-20 ${
                i === view
                  ? "border-brand-red ring-2 ring-brand-red/20"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-fade-up"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
            onClick={() => setLightbox(false)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div
            className="h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <GalleryStage
              pics={pics}
              alt={alt}
              view={view}
              go={go}
              swipeRef={swipe}
              contain
            />
          </div>
        </div>
      )}
    </div>
  );
}
