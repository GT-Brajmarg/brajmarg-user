"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
 * Side cart drawer that slides in from the right when a user
 * adds an item or clicks the cart icon. Amazon-style:
 *   - Sticky header (close button)
 *   - Scrollable item list
 *   - Sticky footer (subtotal + checkout)
 */
export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<EnrichedCartRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);

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

  // Push page content left when drawer is open (desktop only).
  // This prevents the drawer from overlapping product cards.
  useEffect(() => {
    if (!open) {
      document.body.classList.remove("cart-drawer-open");
      return;
    }
    document.body.classList.add("cart-drawer-open");
    return () => document.body.classList.remove("cart-drawer-open");
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

  const subtotal = rows.reduce((s, r) => s + r.unit_price * r.quantity, 0);
  const itemCount = rows.reduce((s, r) => s + r.quantity, 0);

  return (
    /*
     * Non-blocking side cart.
     *
     * No backdrop, no body scroll lock — the rest of the page stays
     * fully interactive so the user can keep adding more products
     * while the cart is visible (Amazon mini-cart pattern).
     *
     * The aside is fixed-positioned to its right edge so it doesn't
     * capture clicks outside its own bounds. When closed it slides
     * off-screen AND switches off pointer events.
     */
    <aside
      role="dialog"
      aria-modal="false"
      aria-label="Your cart"
      aria-hidden={!open}
      className={`fixed top-0 right-0 z-[150] flex h-screen w-full sm:w-[400px] sm:max-w-[92vw] flex-col bg-card-bg shadow-2xl border-l border-gray-200 transition-transform duration-300 ease-out ${
        open ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
        {/* Sticky header */}
        <header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4 bg-card-bg">
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
              <p className="font-bold text-gray-900 leading-tight">
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
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
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
        </header>

        {/* Scrollable items area */}
        <div className="flex-1 overflow-y-auto bg-gray-50/40">
          {loading && rows.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading…
            </div>
          ) : rows.length === 0 ? (
            <div className="p-10 text-center">
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
              <p className="text-xs text-gray-500 mt-1">
                Add prasad, seva, frames or cloth from a temple page.
              </p>
              <Link
                href="/"
                onClick={close}
                className="inline-flex mt-5 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark"
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

        {/* Sticky footer */}
        {rows.length > 0 && (
          <footer className="shrink-0 border-t border-gray-200 bg-card-bg p-5 space-y-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">
                {formatInr(subtotal)}
              </span>
            </div>
            <p className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
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
              FREE delivery on all orders
            </p>
            <Link
              href={authed ? "/checkout" : "/login?next=/checkout"}
              onClick={close}
              className="block w-full rounded-lg bg-brand-red text-center text-sm font-semibold text-white py-3 shadow-sm hover:bg-brand-red-dark active:scale-[0.99] transition-all"
            >
              {authed ? "Proceed to checkout" : "Login to checkout"}
            </Link>
            <Link
              href="/cart"
              onClick={close}
              className="block text-center text-xs text-gray-500 hover:text-brand-red"
            >
              View full cart →
            </Link>
          </footer>
        )}
    </aside>
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
    <li className="flex gap-3 p-4 bg-card-bg">
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

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
              {row.title}
            </h3>
            {row.temple_name && (
              <p className="text-xs text-brand-red truncate mt-0.5">
                {row.temple_name}
              </p>
            )}
            {(row.selected_size || row.selected_color) && (
              <p className="text-xs text-gray-500 mt-1">
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
            className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-brand-red disabled:opacity-40 transition-colors"
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

        <div className="flex items-center justify-between mt-2.5">
          <p className="text-sm font-bold text-gray-900">
            {formatInr(row.unit_price * row.quantity)}
          </p>
          <div className="inline-flex items-center gap-0 rounded-lg border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => updateQty(row.quantity - 1)}
              disabled={busy || row.quantity <= 1}
              aria-label="Decrease quantity"
              className="h-7 w-7 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none rounded-l-lg leading-none text-base"
            >
              −
            </button>
            <span className="w-7 text-center text-sm font-semibold border-x border-gray-200">
              {row.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQty(row.quantity + 1)}
              disabled={busy}
              aria-label="Increase quantity"
              className="h-7 w-7 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none rounded-r-lg leading-none text-base"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
