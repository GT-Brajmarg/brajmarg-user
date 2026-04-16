"use client";

import { useState } from "react";
import {
  addToCart,
  findCartRowId,
  getCartLineQty,
  openCart,
  removeFromCart,
  updateCartQty,
  useCartTick,
} from "@/lib/cart-store";
import type { ItemType } from "@/types/database";

type Props = {
  itemType: ItemType;
  itemId: string;
  selectedSize?: string | null;
  selectedColor?: string | null;
  disabled?: boolean;
  /** Label to show in idle state. Defaults to "Add to cart". */
  label?: string;
  /** When true, do NOT auto-open the side drawer. */
  silent?: boolean;
  /** Optional className applied to the outer wrapper. */
  className?: string;
};

/**
 * Single source of truth for "this product → cart" UI.
 *
 * - When the item is NOT in the cart: shows a big red "Add to cart" button.
 *   On click it adds the item, opens the side drawer, and morphs into the
 *   quantity stepper.
 *
 * - When the item IS in the cart: shows a "− qty +" stepper. Hitting "−"
 *   below 1 removes the item from the cart.
 *
 * Reused on temple tabs, product detail pages, and search results so that
 * the cart state is always reflected wherever the product appears.
 */
export default function CartItemControl({
  itemType,
  itemId,
  selectedSize = null,
  selectedColor = null,
  disabled = false,
  label = "Add to cart",
  silent = false,
  className = "",
}: Props) {
  // Re-render whenever the cart changes
  useCartTick();

  const qty = getCartLineQty({
    item_type: itemType,
    item_id: itemId,
    selected_size: selectedSize,
    selected_color: selectedColor,
  });

  const [busy, setBusy] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const onAdd = async () => {
    if (disabled || busy) return;
    setBusy(true);
    try {
      const res = await addToCart({
        item_type: itemType,
        item_id: itemId,
        quantity: 1,
        selected_size: selectedSize,
        selected_color: selectedColor,
      });
      if (res.ok) {
        if (!silent) openCart();
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1100);
      }
    } finally {
      setBusy(false);
    }
  };

  const onIncrement = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const id = await findCartRowId({
        item_type: itemType,
        item_id: itemId,
        selected_size: selectedSize,
        selected_color: selectedColor,
      });
      if (id) await updateCartQty(id, qty + 1);
    } finally {
      setBusy(false);
    }
  };

  const onDecrement = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const id = await findCartRowId({
        item_type: itemType,
        item_id: itemId,
        selected_size: selectedSize,
        selected_color: selectedColor,
      });
      if (!id) return;
      if (qty <= 1) {
        await removeFromCart(id);
      } else {
        await updateCartQty(id, qty - 1);
      }
    } finally {
      setBusy(false);
    }
  };

  // ----- Render: in cart → quantity stepper -----
  if (qty > 0) {
    return (
      <div
        className={`inline-flex w-full items-stretch overflow-hidden rounded-lg bg-emerald-600 text-white shadow-sm ${className}`}
      >
        <button
          type="button"
          onClick={onDecrement}
          disabled={busy}
          aria-label={qty === 1 ? "Remove from cart" : "Decrease quantity"}
          className="flex h-11 w-11 shrink-0 items-center justify-center text-xl font-bold hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 transition-colors"
        >
          {qty === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
              />
            </svg>
          ) : (
            <span aria-hidden>−</span>
          )}
        </button>

        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <span className="text-sm font-bold leading-tight">{qty} in cart</span>
          <span className="text-[10px] uppercase tracking-wide opacity-80">
            tap to update
          </span>
        </div>

        <button
          type="button"
          onClick={onIncrement}
          disabled={busy}
          aria-label="Increase quantity"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-xl font-bold hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 transition-colors"
        >
          <span aria-hidden>+</span>
        </button>
      </div>
    );
  }

  // ----- Render: not in cart → Add button -----
  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={disabled || busy}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${
        justAdded
          ? "bg-emerald-600 text-white"
          : "bg-brand-red text-white hover:bg-brand-red-dark"
      } ${className}`}
    >
      {busy ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Adding…
        </>
      ) : justAdded ? (
        <>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Added
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
