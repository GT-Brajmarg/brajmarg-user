"use client";

import { useState } from "react";
import { removeFromCart, updateCartQty } from "@/lib/cart-store";
import type { EnrichedCartRow } from "@/types/cart";
import { formatInr } from "@/lib/format";

export default function CartActions({
  row,
  onChange,
}: {
  row: EnrichedCartRow;
  onChange?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const updateQty = async (next: number) => {
    if (next < 1) return;
    setLoading(true);
    const res = await updateCartQty(row.id, next);
    setLoading(false);
    if (res.ok) onChange?.();
  };

  const remove = async () => {
    setLoading(true);
    const res = await removeFromCart(row.id);
    setLoading(false);
    if (res.ok) onChange?.();
  };

  const lineTotal = row.unit_price * row.quantity;

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold text-gray-900 leading-snug">{row.title}</h2>
          {row.temple_name && (
            <p className="text-xs text-brand-red mt-0.5">{row.temple_name}</p>
          )}
          <p className="text-xs text-gray-500 mt-1 capitalize">{row.item_type}</p>
          {(row.selected_size || row.selected_color) && (
            <p className="text-xs text-gray-600 mt-1">
              {row.selected_size && <span>Size: {row.selected_size}</span>}
              {row.selected_size && row.selected_color && " · "}
              {row.selected_color && <span>Colour: {row.selected_color}</span>}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={remove}
          disabled={loading}
          className="text-xs font-semibold text-gray-500 hover:text-brand-red disabled:opacity-50"
        >
          Remove
        </button>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
        <p className="text-sm font-bold text-gray-900">{formatInr(lineTotal)}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={loading || row.quantity <= 1}
            onClick={() => updateQty(row.quantity - 1)}
            className="h-8 w-8 rounded-lg border border-gray-200 text-lg leading-none hover:bg-gray-50 disabled:opacity-40"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{row.quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={loading}
            onClick={() => updateQty(row.quantity + 1)}
            className="h-8 w-8 rounded-lg border border-gray-200 text-lg leading-none hover:bg-gray-50 disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
