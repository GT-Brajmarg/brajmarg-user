"use client";

import { useEffect, useRef, useState } from "react";
import { addToCart, autoOpenCartOnce } from "@/lib/cart-store";
import type { ItemType } from "@/types/database";

type Props = {
  itemType: ItemType;
  itemId: string;
  disabled?: boolean;
  selectedSize?: string | null;
  selectedColor?: string | null;
  quantity?: number;
  // Optional per-row price override. Used by the Seva "Contribute" flow:
  // when set, the cart row is created/updated with this exact amount
  // instead of the catalog price, and quantity is forced to 1 ("set my
  // contribution to X" — see cart-store.addToCart).
  itemPrice?: number | null;
  label?: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
  className?: string;
};

type Phase = "idle" | "loading" | "success";

export default function AddToCartButton({
  itemType,
  itemId,
  disabled,
  selectedSize = null,
  selectedColor = null,
  quantity = 1,
  itemPrice,
  label = "Add to cart",
  onSuccess,
  onError,
  className = "",
}: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const successTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current != null) {
        window.clearTimeout(successTimer.current);
      }
    };
  }, []);

  const isBusy = phase !== "idle";
  const isSuccess = phase === "success";

  return (
    <button
      type="button"
      disabled={disabled || isBusy}
      onClick={async () => {
        if (successTimer.current != null) {
          window.clearTimeout(successTimer.current);
          successTimer.current = null;
        }
        setPhase("loading");
        try {
          const res = await addToCart({
            item_type: itemType,
            item_id: itemId,
            quantity,
            selected_size: selectedSize,
            selected_color: selectedColor,
            // Only thread the override when explicitly provided. undefined =
            // catalog price (sum-on-dedupe); number = override (replace, qty 1).
            ...(itemPrice !== undefined ? { item_price: itemPrice } : {}),
          });
          if (!res.ok) {
            setPhase("idle");
            onError?.(res.message ?? "Could not update cart.");
            return;
          }
          setPhase("success");
          successTimer.current = window.setTimeout(() => {
            setPhase("idle");
            successTimer.current = null;
          }, 1600);
          autoOpenCartOnce();
          onSuccess?.();
        } catch {
          setPhase("idle");
          onError?.("Something went wrong. Please try again.");
        }
      }}
      aria-live="polite"
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg text-sm font-semibold px-4 py-2.5 shadow-sm disabled:pointer-events-none transition-all duration-300 will-change-transform active:scale-[0.97] ${
        isSuccess
          ? "bg-emerald-600 text-white scale-[1.02]"
          : "bg-brand-red text-white hover:bg-brand-red-dark disabled:opacity-50"
      } ${className}`}
    >
      {phase === "loading" && (
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
          <span>Adding…</span>
        </>
      )}

      {phase === "success" && (
        <>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 animate-[ping_1s_ease-out_1]" />
          <svg
            className="h-4 w-4 -ml-7 animate-[fadeIn_220ms_ease-out]"
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
          <span>Added to cart</span>
        </>
      )}

      {phase === "idle" && <span>{label}</span>}
    </button>
  );
}
