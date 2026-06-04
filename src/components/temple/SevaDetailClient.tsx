"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SevaItem, Temple } from "@/types/database";
import { formatInr, parseNumeric } from "@/lib/format";
import { slugify } from "@/lib/slug";
import AddToCartButton from "@/components/AddToCartButton";
import ToastHost from "@/components/ToastHost";
import { ProductCarousel, ProductGallery } from "@/components/temple/ProductCarousel";
import { galleryOf } from "@/lib/gallery";

/**
 * Seva contribution / details page.
 *
 * Differs from the frame/cloth detail client in one key way: the price is a
 * SUGGESTED contribution, and the user can override it. The chosen amount is
 * threaded through AddToCartButton -> cart_items.item_price -> checkout
 * total -> order_items.item_price, with the "set my contribution to X"
 * semantic (replace, not sum) implemented in cart-store.addToCart.
 */
export default function SevaDetailClient({
  temple,
  item,
  siblings,
}: {
  temple: Temple;
  item: SevaItem;
  siblings: SevaItem[];
}) {
  const templeSlug = useMemo(() => slugify(temple.name), [temple.name]);
  const catalogPrice = parseNumeric(item.price);

  // Suggested contribution tiers around the catalog price. Always include
  // the catalog price itself so the admin's configured amount is honored as
  // a one-tap option. Tiers below the catalog price keep small-donation
  // flow easy without forcing it.
  const tiers = useMemo(() => {
    const base = [101, 501, 1001];
    const set = new Set<number>(base);
    if (catalogPrice > 0) set.add(catalogPrice);
    return Array.from(set)
      .filter((n) => n > 0)
      .sort((a, b) => a - b);
  }, [catalogPrice]);

  // Selected tier (highlights a chip) and the actual amount (in rupees).
  // Default to the catalog price when it's set, else the first tier.
  const defaultAmount = catalogPrice > 0 ? catalogPrice : tiers[0] ?? 101;
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [customText, setCustomText] = useState<string>("");
  const isCustom = !tiers.includes(amount);

  const images = galleryOf(item);

  const [toast, setToast] = useState<string | null>(null);

  // Parse the custom amount field. Anything non-positive or non-finite is
  // rejected so we never POST a zero/negative contribution to the cart.
  const onCustomChange = (raw: string) => {
    // Allow empty while typing, but treat as invalid for the contribute
    // button below (disabled until they pick something valid).
    setCustomText(raw);
    const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
    if (Number.isFinite(n) && n > 0) setAmount(n);
  };

  const pickTier = (t: number) => {
    setAmount(t);
    setCustomText("");
  };

  const validAmount = Number.isFinite(amount) && amount > 0;

  return (
    <>
      {toast && <ToastHost message={toast} onDismiss={() => setToast(null)} />}

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb back to the temple's Seva tab */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link
            href={`/temple/${templeSlug}?tab=seva`}
            className="hover:text-brand-red"
          >
            ← Back to {temple.name} · Seva
          </Link>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: image gallery (carousel on mobile, grid on desktop) */}
          <section>
            <div className="overflow-hidden rounded-xl border border-brand-gold/15 bg-card-bg shadow-sm lg:hidden">
              <ProductCarousel images={images} alt={item.name} />
            </div>
            <div className="hidden lg:block">
              <ProductGallery images={images} alt={item.name} />
            </div>
          </section>

          {/* Right: details + contribute panel */}
          <section className="flex flex-col gap-5">
            <header>
              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-red">
                Seva
              </span>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                {item.name}
              </h1>
              {item.time && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-brand-red">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {item.time}
                </p>
              )}
            </header>

            {item.details && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Details
                </h2>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                  {item.details}
                </p>
              </div>
            )}

            {item.significance && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Significance
                </h2>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                  {item.significance}
                </p>
              </div>
            )}

            {/* Contribute panel — the real action on this page */}
            <div className="rounded-xl border border-brand-gold/20 bg-card-bg p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Contribute toward this Seva
              </h2>
              {catalogPrice > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  Suggested contribution: {formatInr(catalogPrice)}. You can
                  contribute any amount.
                </p>
              )}

              {/* Tier chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                {tiers.map((t) => {
                  const active = !isCustom && amount === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => pickTier(t)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-brand-red text-white shadow-sm"
                          : "bg-gray-50 text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {formatInr(t)}
                      {t === catalogPrice && (
                        <span className="ml-1.5 text-[10px] opacity-75">
                          suggested
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <label className="mt-3 block text-xs font-medium text-gray-600">
                Or enter another amount (₹)
              </label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-base font-semibold text-gray-500">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={customText}
                  onChange={(e) => onCustomChange(e.target.value)}
                  placeholder="e.g. 251"
                  className="w-40 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                />
                {isCustom && validAmount && (
                  <span className="text-xs text-gray-500">
                    Contributing {formatInr(amount)}
                  </span>
                )}
              </div>

              {/* Final summary + Contribute */}
              <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400">
                    Your contribution
                  </div>
                  <div className="text-2xl font-bold text-brand-red">
                    {validAmount ? formatInr(amount) : "—"}
                  </div>
                </div>
                <AddToCartButton
                  itemType="seva"
                  itemId={item.id}
                  itemPrice={amount}
                  disabled={!validAmount}
                  label="Contribute"
                  onSuccess={() => setToast("Added to cart")}
                  onError={(m) => setToast(m)}
                  className="rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                Contributing again replaces the previous amount in your cart
                (it does not stack).
              </p>
            </div>
          </section>
        </div>

        {/* Sibling sevas at the same temple */}
        {siblings.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900">
              More Seva at {temple.name}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {siblings.map((s) => (
                <Link
                  key={s.id}
                  href={`/temple/${templeSlug}/seva/${s.id}`}
                  className="group overflow-hidden rounded-xl border border-brand-gold/15 bg-card-bg shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface-soft">
                    <ProductCarousel images={galleryOf(s)} alt={s.name} />
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                      {s.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-brand-red">
                      {formatInr(parseNumeric(s.price))}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
