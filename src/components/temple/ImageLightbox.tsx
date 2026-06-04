"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Full-screen, dependency-free image viewer used everywhere a devotee
 * may want a closer look — prasad/seva cards (which have no detail
 * page), the listing cards, and the product detail gallery.
 *
 * Features, all tuned for an older, mobile-first audience:
 *   • swipe / arrow-key / on-screen arrow navigation
 *   • tap-to-zoom (1× ↔ 2×) with drag-to-pan while zoomed
 *   • thumbnail strip when there's more than one image
 *   • Escape / backdrop tap to close, body scroll locked while open
 *
 * Render it conditionally from a parent that owns the open state:
 *
 *   {open && (
 *     <ImageLightbox images={imgs} alt={name} startIndex={i}
 *       onClose={() => setOpen(false)} />
 *   )}
 */

function clean(images: Array<string | null | undefined>): string[] {
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

export function ImageLightbox({
  images,
  alt,
  startIndex = 0,
  onClose,
}: {
  images: Array<string | null | undefined>;
  alt: string;
  startIndex?: number;
  onClose: () => void;
}) {
  const pics = clean(images);
  const count = pics.length;
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(startIndex, 0), Math.max(count - 1, 0))
  );
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const swipe = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null
  );

  const go = useCallback(
    (next: number) => {
      setZoomed(false);
      setPan({ x: 0, y: 0 });
      setIndex((next + count) % Math.max(count, 1));
    },
    [count]
  );

  // Keyboard nav + scroll lock for the lifetime of the overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, go, onClose]);

  if (count === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — image viewer`}
      className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
      style={{ animation: "fadeIn .2s ease-out" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white/90">
        <span className="truncate text-sm font-medium">
          {alt}
          {count > 1 && (
            <span className="ml-2 text-white/55">
              {index + 1} / {count}
            </span>
          )}
        </span>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (zoomed) {
            drag.current = { x: t.clientX, y: t.clientY, ox: pan.x, oy: pan.y };
          } else {
            swipe.current = { x: t.clientX, y: t.clientY, active: true };
          }
        }}
        onTouchMove={(e) => {
          if (zoomed && drag.current) {
            const t = e.touches[0];
            setPan({
              x: drag.current.ox + (t.clientX - drag.current.x),
              y: drag.current.oy + (t.clientY - drag.current.y),
            });
          }
        }}
        onTouchEnd={(e) => {
          if (zoomed) {
            drag.current = null;
            return;
          }
          if (!swipe.current.active) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - swipe.current.x;
          const dy = t.clientY - swipe.current.y;
          swipe.current.active = false;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            go(dx < 0 ? index + 1 : index - 1);
          }
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={pics[index]}
          src={pics[index]}
          alt={alt}
          draggable={false}
          onClick={() => {
            setZoomed((z) => !z);
            setPan({ x: 0, y: 0 });
          }}
          className={`max-h-full max-w-full select-none rounded-lg object-contain transition-transform duration-300 ${
            zoomed ? "scale-[2] cursor-zoom-out" : "cursor-zoom-in"
          }`}
          style={{
            animation: "scaleIn .25s cubic-bezier(.22,1,.36,1)",
            transform: zoomed
              ? `scale(2) translate(${pan.x / 2}px, ${pan.y / 2}px)`
              : undefined,
          }}
        />

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {count > 1 && (
        <div
          className="flex justify-center gap-2 overflow-x-auto px-4 py-4 no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {pics.map((src, i) => (
            <button
              key={src + i}
              type="button"
              aria-label={`View image ${i + 1}`}
              onClick={() => go(i)}
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === index
                  ? "border-brand-gold"
                  : "border-transparent opacity-55 hover:opacity-90"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
