"use client";

import { useEffect, useId } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { formatInr, parseNumeric } from "@/lib/format";
import type { ItemType } from "@/types/database";

export type ProductModalOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;

  itemType: ItemType;
  itemId: string;

  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  price: number | string;

  sizes?: ProductModalOption[];
  selectedSize?: string | null;
  onSelectSize?: (value: string) => void;

  colors?: ProductModalOption[];
  selectedColor?: string | null;
  onSelectColor?: (value: string) => void;

  inStock?: boolean;
  canAdd?: boolean;

  onAdded?: () => void;
  onError?: (msg: string) => void;
};

export default function ProductModal({
  open,
  onClose,
  itemType,
  itemId,
  title,
  subtitle,
  description,
  imageUrl,
  price,
  sizes,
  selectedSize,
  onSelectSize,
  colors,
  selectedColor,
  onSelectColor,
  inStock = true,
  canAdd,
  onAdded,
  onError,
}: Props) {
  const dialogId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const computedCanAdd =
    typeof canAdd === "boolean" ? canAdd : inStock;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogId}
        className="relative z-[81] w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-card-bg shadow-xl border border-gray-100 flex flex-col"
      >
        {/* Close button */}
        <div className="sticky top-0 z-10 flex justify-end bg-card-bg/95 backdrop-blur border-b border-gray-100 px-3 py-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
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

        {/* Image */}
        <div className="relative aspect-square w-full bg-gray-100">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
          {!inStock && (
            <span className="absolute top-3 left-3 rounded-full bg-gray-900/90 px-3 py-1 text-xs font-semibold text-white">
              Out of stock
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <h2 id={dialogId} className="text-xl font-bold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
            <p className="text-lg font-bold text-brand-red mt-2">
              {formatInr(parseNumeric(price))}
            </p>
          </div>

          {description && (
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
          )}

          {sizes && sizes.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Select size
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => {
                  const active = selectedSize === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      disabled={s.disabled}
                      onClick={() => onSelectSize?.(s.value)}
                      className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                        active
                          ? "border-brand-red bg-red-50 text-brand-red"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {colors && colors.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Select colour
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const active = selectedColor === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      disabled={c.disabled}
                      onClick={() => onSelectColor?.(c.value)}
                      className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                        active
                          ? "border-brand-red bg-red-50 text-brand-red"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer with Add to Cart */}
        <div className="sticky bottom-0 mt-auto bg-card-bg/95 backdrop-blur border-t border-gray-100 p-4">
          <AddToCartButton
            itemType={itemType}
            itemId={itemId}
            selectedSize={selectedSize ?? null}
            selectedColor={selectedColor ?? null}
            disabled={!computedCanAdd}
            label={inStock ? "Add to cart" : "Out of stock"}
            onSuccess={() => {
              onAdded?.();
              onClose();
            }}
            onError={(m) => onError?.(m)}
            className="w-full py-3 text-base"
          />
        </div>
      </div>
    </div>
  );
}
