"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CART_CHANGE_EVENT, getCartCount, openCart } from "@/lib/cart-store";

/**
 * Floating, draggable cart bubble — behaves like a chat-widget icon.
 *
 *  - Sits at the bottom-right corner by default.
 *  - Can be dragged anywhere on screen; the position is remembered.
 *  - A click (without dragging) opens the floating cart panel.
 *  - Only rendered while the cart has at least one item.
 *
 * Visual language matches the brand (red circle, devotional shadow,
 * the same badge-pop / cart-bump animations used elsewhere).
 */
const POS_KEY = "brajmarg:cartfab:pos";
const SIZE = 56; // bubble diameter (px)
const EDGE = 8; // min gap from viewport edge
const MARGIN = 24; // default offset from bottom-right
const CLICK_SLOP = 6; // px of movement still treated as a click

export default function CartFab() {
  const [count, setCount] = useState<number | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [bumping, setBumping] = useState(false);

  const prevCount = useRef<number | null>(null);
  const bumpTimer = useRef<number | null>(null);
  const posRef = useRef<{ x: number; y: number } | null>(null);

  const dragging = useRef(false);
  const downAt = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const movedFar = useRef(false);

  const clamp = (x: number, y: number) => ({
    x: Math.min(Math.max(EDGE, x), window.innerWidth - SIZE - EDGE),
    y: Math.min(Math.max(EDGE, y), window.innerHeight - SIZE - EDGE),
  });

  const setPosition = (p: { x: number; y: number }) => {
    posRef.current = p;
    setPos(p);
  };

  const load = useCallback(async () => {
    const c = await getCartCount();
    startTransition(() => setCount(c));
  }, []);

  // Initial position: restore persisted, else bottom-right.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(POS_KEY);
      if (raw) {
        const p = JSON.parse(raw) as { x: number; y: number };
        if (typeof p?.x === "number" && typeof p?.y === "number") {
          // Initial position must be derived from the live viewport,
          // which only exists in an effect (no window during SSR).
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setPosition(clamp(p.x, p.y));
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setPosition(
      clamp(
        window.innerWidth - SIZE - MARGIN,
        window.innerHeight - SIZE - MARGIN,
      ),
    );
  }, []);

  // Cart count sync (same triggers the header badge listens to).
  useEffect(() => {
    void load();
  }, [load]);
  useEffect(() => {
    const onCart = () => void load();
    window.addEventListener(CART_CHANGE_EVENT, onCart);
    return () => window.removeEventListener(CART_CHANGE_EVENT, onCart);
  }, [load]);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "brajmarg:cart:v1") void load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [load]);
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [load]);

  // Bump on count increase.
  useEffect(() => {
    if (count == null) return;
    const prev = prevCount.current;
    if (prev != null && count > prev) {
      // One-shot bump animation on increase (same pattern as the
      // header badge, kept consistent across the app).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBumping(true);
      if (bumpTimer.current != null) window.clearTimeout(bumpTimer.current);
      bumpTimer.current = window.setTimeout(() => setBumping(false), 600);
    }
    prevCount.current = count;
    return () => {
      if (bumpTimer.current != null) window.clearTimeout(bumpTimer.current);
    };
  }, [count]);

  // Keep within the viewport on resize.
  useEffect(() => {
    const onResize = () => {
      if (posRef.current) setPosition(clamp(posRef.current.x, posRef.current.y));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    movedFar.current = false;
    downAt.current = { x: e.clientX, y: e.clientY };
    offset.current = {
      x: e.clientX - (posRef.current?.x ?? 0),
      y: e.clientY - (posRef.current?.y ?? 0),
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    if (
      Math.abs(e.clientX - downAt.current.x) > CLICK_SLOP ||
      Math.abs(e.clientY - downAt.current.y) > CLICK_SLOP
    ) {
      movedFar.current = true;
    }
    setPosition(
      clamp(e.clientX - offset.current.x, e.clientY - offset.current.y),
    );
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (movedFar.current) {
      try {
        localStorage.setItem(POS_KEY, JSON.stringify(posRef.current));
      } catch {
        /* ignore */
      }
    } else {
      // Treated as a tap → open the cart panel.
      openCart();
    }
  };

  const n = count ?? 0;
  if (count == null || n === 0 || !pos) return null;

  return (
    <button
      type="button"
      aria-label={`Open cart, ${n} item${n === 1 ? "" : "s"}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ left: pos.x, top: pos.y }}
      className={`fixed z-[140] inline-flex h-14 w-14 touch-none cursor-grab items-center justify-center rounded-full bg-brand-red text-white shadow-devotional-lg ring-1 ring-black/[0.06] transition-colors hover:bg-brand-red-dark active:cursor-grabbing ${
        bumping ? "animate-cart-bump" : ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
      <span className="animate-badge-pop pointer-events-none absolute -top-1 -right-1 inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-bold text-brand-red shadow ring-2 ring-brand-red">
        {n > 9 ? "9+" : n}
      </span>
    </button>
  );
}
