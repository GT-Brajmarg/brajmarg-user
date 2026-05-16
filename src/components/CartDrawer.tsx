"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  CART_CHANGE_EVENT,
  CART_OPEN_EVENT,
  getCart,
  removeFromCart,
  updateCartQty,
} from "@/lib/cart-store";
import { enrichCartRows } from "@/lib/cart-enrich";
import type { EnrichedCartRow } from "@/types/cart";
import { formatInr } from "@/lib/format";

/**
 * Premium floating cart.
 *
 *  - Desktop / tablet: a floating glass panel docked to the right, with
 *    clear breathing room from the header, footer and screen edge. The
 *    page stays visible (and dimmed) behind it so the user never loses
 *    shopping context.
 *  - Mobile: a native-feeling bottom sheet with a drag handle and
 *    swipe-to-close.
 *
 * Layout is always: sticky header · scrollable items · sticky checkout.
 * Visual language (cream/red/emerald palette, rounded-2xl, devotional
 * shadow, project easing curves) matches the rest of the app.
 */
export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<EnrichedCartRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);

  // Mobile swipe-to-close: live drag offset (px) while the sheet is
  // being dragged down by the grab handle / header.
  const [dragY, setDragY] = useState<number | null>(null);
  const dragStart = useRef<number | null>(null);

  // Desktop / tablet: the whole panel can be picked up by its header
  // and moved freely anywhere on screen (hand gesture). Persisted.
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const panelPosRef = useRef<{ x: number; y: number } | null>(null);
  const moving = useRef(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveOffset = useRef({ x: 0, y: 0 });
  const asideRef = useRef<HTMLElement | null>(null);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const PANEL_POS_KEY = "brajmarg:cart-panel-pos";

  const setPanel = (p: { x: number; y: number }) => {
    panelPosRef.current = p;
    setPanelPos(p);
  };

  const clampPanel = (x: number, y: number) => {
    const el = asideRef.current;
    const w = el?.offsetWidth ?? 400;
    const h = el?.offsetHeight ?? 400;
    return {
      x: Math.min(Math.max(8, x), window.innerWidth - w - 8),
      y: Math.min(Math.max(8, y), window.innerHeight - h - 8),
    };
  };

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setAuthed(Boolean(user));
    const cart = await getCart();
    const enriched = await enrichCartRows(supabase, cart);
    setRows(enriched);
    setLoading(false);
  }, []);

  // Open trigger
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      void load();
    };
    window.addEventListener(CART_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CART_OPEN_EVENT, onOpen);
  }, [load]);

  // Live cart changes while drawer is open
  useEffect(() => {
    if (!open) return;
    const onChange = () => void load();
    window.addEventListener(CART_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CART_CHANGE_EVENT, onChange);
  }, [open, load]);

  // Focus management: move focus into the panel on open, restore on close.
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      const t = window.setTimeout(() => closeBtnRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }
    lastFocused.current?.focus?.();
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  // ---- Mobile swipe-to-close (only when the bottom-sheet layout is active)
  const isSheet = () =>
    typeof window !== "undefined" && window.innerWidth < 640;

  const onTouchStart = (e: React.TouchEvent) => {
    if (!isSheet()) return;
    dragStart.current = e.touches[0].clientY;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStart.current == null) return;
    const delta = e.touches[0].clientY - dragStart.current;
    if (delta > 0) setDragY(delta);
  };
  const onTouchEnd = () => {
    if (dragStart.current == null) return;
    if ((dragY ?? 0) > 110) close();
    dragStart.current = null;
    setDragY(null);
  };

  // ---- Desktop / tablet: hand-gesture drag the whole panel ----------
  const onHeaderPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return; // mobile keeps swipe-to-close
    if ((e.target as HTMLElement).closest("button")) return; // not the close btn
    const el = asideRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    moving.current = true;
    setIsMoving(true);
    moveOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    // Switch from CSS anchoring to free positioning at the current spot.
    setPanel({ x: rect.left, y: rect.top });
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onHeaderPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!moving.current) return;
    setPanel(
      clampPanel(
        e.clientX - moveOffset.current.x,
        e.clientY - moveOffset.current.y,
      ),
    );
  };

  const onHeaderPointerUp = () => {
    if (!moving.current) return;
    moving.current = false;
    setIsMoving(false);
    try {
      localStorage.setItem(
        PANEL_POS_KEY,
        JSON.stringify(panelPosRef.current),
      );
    } catch {
      /* ignore */
    }
  };

  // Restore a previously moved position (desktop/tablet only).
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 640) return;
    try {
      const raw = localStorage.getItem(PANEL_POS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as { x: number; y: number };
      if (typeof p?.x === "number" && typeof p?.y === "number") {
        // Restored position must be clamped against the live viewport,
        // which only exists in an effect (no window during SSR).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPanel(clampPanel(p.x, p.y));
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Keep the panel on-screen if the viewport is resized.
  useEffect(() => {
    const onResize = () => {
      if (!panelPosRef.current) return;
      if (window.innerWidth < 640) return;
      setPanel(clampPanel(panelPosRef.current.x, panelPosRef.current.y));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const subtotal = rows.reduce((s, r) => s + r.unit_price * r.quantity, 0);
  const itemCount = rows.reduce((s, r) => s + r.quantity, 0);

  // On phones the panel is a bottom sheet → never free-positioned.
  const freePos =
    panelPos != null &&
    typeof window !== "undefined" &&
    window.innerWidth >= 640;

  const panelStyle: React.CSSProperties | undefined =
    dragY != null
      ? { transform: `translateY(${dragY}px)`, transition: "none" }
      : freePos
        ? {
            left: panelPos!.x,
            top: panelPos!.y,
            right: "auto",
            bottom: "auto",
            transition: isMoving ? "none" : undefined,
          }
        : undefined;

  return (
    /*
     * Non-blocking floating cart.
     *
     * The wrapper never captures pointer events, and there is no dim
     * backdrop or scroll lock — the rest of the page stays fully
     * interactive so the user can keep adding products while the cart
     * is visible. Only the panel itself is interactive.
     */
    <div
      aria-hidden={!open}
      className="pointer-events-none fixed inset-0 z-[150]"
    >
      {/* Floating panel (desktop/tablet) · bottom sheet (mobile) */}
      <aside
        ref={asideRef}
        role="dialog"
        aria-modal="false"
        aria-label="Your cart"
        style={panelStyle}
        className={`fixed flex flex-col overflow-hidden bg-card-bg text-foreground
          inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl
          sm:inset-x-auto sm:bottom-6 sm:top-20 sm:right-4 lg:right-6
          sm:max-h-none sm:w-[440px] lg:w-[400px] sm:max-w-[92vw] sm:rounded-2xl
          border border-gray-200/80 ring-1 ring-black/[0.04] shadow-devotional-lg
          transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100 sm:translate-x-0"
              : "pointer-events-none translate-y-full opacity-0 sm:translate-y-0 sm:opacity-0 sm:translate-x-[calc(100%+2.5rem)]"
          }`}
      >
        {/* Sticky header (also the mobile drag area) */}
        <header
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onPointerDown={onHeaderPointerDown}
          onPointerMove={onHeaderPointerMove}
          onPointerUp={onHeaderPointerUp}
          title="Drag to move the cart"
          className="relative shrink-0 select-none border-b border-gray-200 bg-card-bg px-5 pb-4 pt-3 sm:cursor-grab sm:pt-4 sm:active:cursor-grabbing"
        >
          {/* Mobile grab handle */}
          <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-gray-300 sm:hidden" />
          {/* Desktop/tablet drag affordance */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1.5 hidden -translate-x-1/2 text-gray-300 sm:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="9" cy="6" r="1.6" />
              <circle cx="15" cy="6" r="1.6" />
              <circle cx="9" cy="12" r="1.6" />
              <circle cx="15" cy="12" r="1.6" />
              <circle cx="9" cy="18" r="1.6" />
              <circle cx="15" cy="18" r="1.6" />
            </svg>
          </span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <div>
                <p className="font-bold leading-tight text-gray-900">
                  Your cart
                </p>
                <p className="text-xs text-gray-500">
                  {itemCount === 0
                    ? "Empty"
                    : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
                </p>
              </div>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Scrollable items area */}
        <div className="scrollbar-thin flex-1 overflow-y-auto overscroll-contain bg-gray-50/40">
          {loading && rows.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading…
            </div>
          ) : rows.length === 0 ? (
            <div className="animate-fade-up p-10 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                Your cart is empty
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Add prasad, seva, frames or cloth from a temple page.
              </p>
              <Link
                href="/"
                onClick={close}
                className="mt-5 inline-flex rounded-lg bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
              >
                Explore temples
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {rows.map((row) => (
                <DrawerRow key={row.id} row={row} onChange={load} />
              ))}
            </ul>
          )}
        </div>

        {/* Sticky checkout footer */}
        {rows.length > 0 && (
          <footer className="shrink-0 space-y-3 border-t border-gray-200 bg-card-bg p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-6px_18px_rgba(120,53,15,0.06)]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">
                {formatInr(subtotal)}
              </span>
            </div>
            {/* <p className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </p> */}
            <Link
              href={authed ? "/checkout" : "/login?next=/checkout"}
              onClick={close}
              className="block w-full rounded-lg bg-brand-red py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-red-dark active:scale-[0.99]"
            >
              {authed ? "Proceed to checkout" : "Login to checkout"}
            </Link>
            <Link
              href="/cart"
              onClick={close}
              className="block text-center text-xs text-gray-500 transition-colors hover:text-brand-red"
            >
              View full cart →
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}

// ------------------------------------------------------------
// Drawer line item
// ------------------------------------------------------------
function DrawerRow({
  row,
  onChange,
}: {
  row: EnrichedCartRow;
  onChange: () => void;
}) {
  const [busy, setBusy] = useState(false);

  const updateQty = async (next: number) => {
    if (next < 1) return;
    setBusy(true);
    await updateCartQty(row.id, next);
    setBusy(false);
    onChange();
  };

  const remove = async () => {
    setBusy(true);
    await removeFromCart(row.id);
    setBusy(false);
    onChange();
  };

  return (
    <li className="flex gap-3 bg-card-bg p-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200/60">
        {row.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.image_url}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
              {row.title}
            </h3>
            {row.temple_name && (
              <p className="mt-0.5 truncate text-xs text-brand-red">
                {row.temple_name}
              </p>
            )}
            {(row.selected_size || row.selected_color) && (
              <p className="mt-1 text-xs text-gray-500">
                {row.selected_size && <span>Size: {row.selected_size}</span>}
                {row.selected_size && row.selected_color && " · "}
                {row.selected_color && (
                  <span>Colour: {row.selected_color}</span>
                )}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={remove}
            disabled={busy}
            aria-label="Remove item"
            className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-brand-red disabled:opacity-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
              />
            </svg>
          </button>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900">
            {formatInr(row.unit_price * row.quantity)}
          </p>
          <div className="inline-flex items-center gap-0 rounded-lg border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => updateQty(row.quantity - 1)}
              disabled={busy || row.quantity <= 1}
              aria-label="Decrease quantity"
              className="h-7 w-7 rounded-l-lg text-base leading-none text-gray-600 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-30"
            >
              −
            </button>
            <span className="w-7 border-x border-gray-200 text-center text-sm font-semibold">
              {row.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQty(row.quantity + 1)}
              disabled={busy}
              aria-label="Increase quantity"
              className="h-7 w-7 rounded-r-lg text-base leading-none text-gray-600 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
