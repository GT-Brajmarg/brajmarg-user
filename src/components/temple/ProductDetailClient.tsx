"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ClothItem, FrameItem, Temple } from "@/types/database";
import { formatInr, parseNumeric } from "@/lib/format";
import { slugify } from "@/lib/slug";
import CartItemControl from "@/components/CartItemControl";
import InCartBadge from "@/components/InCartBadge";

type Category = "frame" | "cloth";

export type ProductDetailProps = {
  temple: Temple;
  category: Category;
  productName: string;
  variants: Array<FrameItem | ClothItem>;
  siblings: Array<{
    cover: FrameItem | ClothItem;
    minPrice: number;
    name: string;
    slug: string;
  }>;
};

function isCloth(item: FrameItem | ClothItem): item is ClothItem {
  return Array.isArray((item as ClothItem).sizes);
}

export default function ProductDetailClient({
  temple,
  category,
  productName,
  variants,
  siblings,
}: ProductDetailProps) {
  const cover = variants[0];
  if (!cover) return null;

  const itemType: "frame" | "cloth" = category;

  // Frame: sizes come from `size` per variant row
  // Cloth: sizes come from the `sizes` array on the single item
  const frameSizes = useMemo(
    () =>
      category === "frame"
        ? variants
            .map((v) => (v as FrameItem).size ?? null)
            .filter((s): s is string => Boolean(s))
        : [],
    [category, variants]
  );

  const clothSizes = useMemo(
    () =>
      category === "cloth" && isCloth(cover) ? cover.sizes ?? [] : [],
    [category, cover]
  );

  const clothColors = useMemo(
    () =>
      category === "cloth" && isCloth(cover) ? cover.colors ?? [] : [],
    [category, cover]
  );

  // Selection state
  const [frameVariantIdx, setFrameVariantIdx] = useState(0);
  const [clothSize, setClothSize] = useState<string | null>(
    clothSizes[0] ?? null
  );
  const [clothColor, setClothColor] = useState<string | null>(
    clothColors[0] ?? null
  );

  // Resolve which variant the user is currently looking at
  const activeFrameVariant =
    category === "frame" ? variants[frameVariantIdx] ?? cover : cover;

  const displayItem = activeFrameVariant;
  const displayPrice = parseNumeric(displayItem.price);
  const inStock = (displayItem as { in_stock?: boolean }).in_stock ?? true;
  const material = displayItem.material;

  // Cart-control inputs
  const cartItemId = displayItem.id;
  const cartSize =
    category === "frame"
      ? (displayItem as FrameItem).size ?? null
      : clothSize;
  const cartColor = category === "cloth" ? clothColor : null;

  const needsClothColor = clothColors.length > 0;
  const canAdd =
    inStock &&
    (category === "frame"
      ? Boolean((displayItem as FrameItem).size) || frameSizes.length === 0
      : Boolean(clothSize) && (!needsClothColor || Boolean(clothColor)));

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-brand-red">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/temple/${slugify(temple.name)}`}
          className="hover:text-brand-red truncate"
        >
          {temple.name}
        </Link>
        <span>/</span>
        <span className="capitalize">{category}</span>
        <span>/</span>
        <span className="text-gray-800 truncate">{productName}</span>
      </nav>

      {/* Hero — image + details */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-8">
        {/* Image */}
        <div className="rounded-2xl border border-gray-200 bg-card-bg p-4 sm:p-6">
          <div className="relative aspect-square w-full max-w-xl mx-auto overflow-hidden rounded-xl bg-gray-100">
            {displayItem.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={displayItem.image_url}
                alt={productName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
            )}
            <div className="absolute top-4 left-4">
              <InCartBadge
                itemType={itemType}
                itemId={cartItemId}
                selectedSize={cartSize}
                selectedColor={cartColor}
              />
            </div>
            {!inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900">
                  Out of stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-brand-red">
              {temple.name}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900 font-serif leading-tight">
              {productName}
            </h1>
            {material && (
              <p className="text-sm text-gray-500 mt-1">{material}</p>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatInr(displayPrice)}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              FREE delivery
            </span>
          </div>

          {/* Frame size variants */}
          {category === "frame" && frameSizes.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                Select size
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v, i) => {
                  const sizeLabel = (v as FrameItem).size ?? `Option ${i + 1}`;
                  const active = i === frameVariantIdx;
                  const itemInStock =
                    (v as { in_stock?: boolean }).in_stock ?? true;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setFrameVariantIdx(i)}
                      disabled={!itemInStock}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                        active
                          ? "border-brand-red bg-red-50 text-brand-red"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {sizeLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cloth sizes */}
          {category === "cloth" && clothSizes.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                Select size
              </p>
              <div className="flex flex-wrap gap-2">
                {clothSizes.map((s) => {
                  const active = clothSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setClothSize(s)}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? "border-brand-red bg-red-50 text-brand-red"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cloth colours */}
          {category === "cloth" && clothColors.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                Select colour
              </p>
              <div className="flex flex-wrap gap-2">
                {clothColors.map((c) => {
                  const active = clothColor === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setClothColor(c)}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? "border-brand-red bg-red-50 text-brand-red"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action — same control as listing card */}
          <div className="pt-2">
            <CartItemControl
              itemType={itemType}
              itemId={cartItemId}
              selectedSize={cartSize}
              selectedColor={cartColor}
              disabled={!canAdd}
              label={inStock ? "Add to cart" : "Out of stock"}
            />
          </div>
        </div>
      </section>

      {/* More like this */}
      {siblings.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              More from this temple
            </h2>
            <div className="w-16 h-1 bg-brand-red rounded mt-2" />
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {siblings.map((sib) => {
              const minPriceLabel = formatInr(sib.minPrice);
              const href = `/temple/${slugify(temple.name)}/${category}/${sib.slug}`;
              return (
                <Link
                  key={sib.cover.id}
                  href={href}
                  className="group block overflow-hidden rounded-xl border border-gray-200 bg-card-bg hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                    {sib.cover.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sib.cover.image_url}
                        alt={sib.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                    <div className="absolute top-2 left-2">
                      <InCartBadge
                        itemType={itemType}
                        itemId={sib.cover.id}
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {sib.name}
                    </p>
                    <p className="text-sm font-bold text-brand-red mt-1">
                      {minPriceLabel}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
