"use client";

import { getCartLineQty, useCartTick } from "@/lib/cart-store";
import type { ItemType } from "@/types/database";

/**
 * Small pill that overlays a product image to indicate the item
 * is already in the cart. Live-updates whenever the cart changes
 * so a user can browse around and immediately see what's in.
 *
 * For products with size/colour variants, pass `aggregate` to
 * count any variant of this item rather than a specific one.
 */
export default function InCartBadge({
  itemType,
  itemId,
  selectedSize = null,
  selectedColor = null,
  className = "",
}: {
  itemType: ItemType;
  itemId: string;
  selectedSize?: string | null;
  selectedColor?: string | null;
  className?: string;
}) {
  useCartTick();

  const qty = getCartLineQty({
    item_type: itemType,
    item_id: itemId,
    selected_size: selectedSize,
    selected_color: selectedColor,
  });

  if (qty === 0) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-md ring-2 ring-white ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
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
      {qty} in cart
    </span>
  );
}
