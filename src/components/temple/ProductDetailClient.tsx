"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import type { ClothItem, FrameItem, Temple } from "@/types/database";
import { formatInr, parseNumeric } from "@/lib/format";
import { slugify } from "@/lib/slug";
import CartItemControl from "@/components/CartItemControl";
import InCartBadge from "@/components/InCartBadge";
import { ProductCarousel, ProductGallery } from "@/components/temple/ProductCarousel";
import { galleryOf } from "@/lib/gallery";

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

function OptionButton({
  active,
  onClick,
  children,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[3.25rem] rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-40 disabled:pointer-events-none ${
        active
          ? "border-brand-red bg-brand-red text-white shadow-sm"
          : "border-gray-200 bg-white text-gray-700 hover:border-brand-red/40 hover:text-brand-red"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProductDetailClient({
  temple,
  category,
  productName,
  variants,
  siblings,
}: ProductDetailProps) {
  const cover = variants[0];

  const itemType: "frame" | "cloth" = category;

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
      category === "cloth" && cover && isCloth(cover) ? cover.sizes ?? [] : [],
    [category, cover]
  );

  const clothColors = useMemo(
    () =>
      category === "cloth" && cover && isCloth(cover) ? cover.colors ?? [] : [],
    [category, cover]
  );

  const [frameVariantIdx, setFrameVariantIdx] = useState(0);
  const [clothSize, setClothSize] = useState<string | null>(
    clothSizes[0] ?? null
  );
  const [clothColor, setClothColor] = useState<string | null>(
    clothColors[0] ?? null
  );

  if (!cover) return null;

  const activeFrameVariant =
    category === "frame" ? variants[frameVariantIdx] ?? cover : cover;

  const displayItem = activeFrameVariant;
  const displayPrice = parseNumeric(displayItem.price);
  const inStock = (displayItem as { in_stock?: boolean }).in_stock ?? true;
  const material = displayItem.material;

  // Frames carry one image per size variant, and every item can now
  // also have its own multi-image gallery → combine both.
  const galleryImages =
    category === "frame"
      ? variants.flatMap((v) => galleryOf(v))
      : galleryOf(cover);

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
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-brand-red">
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          href={`/temple/${slugify(temple.name)}`}
          className="hover:text-brand-red truncate"
        >
          {temple.name}
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          href={`/temple/${slugify(temple.name)}?tab=${category}`}
          className="hover:text-brand-red capitalize"
        >
          {category}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-800 truncate font-medium">{productName}</span>
      </nav>

      {/* Hero — gallery + details */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
        {/* Gallery */}
        <div className="animate-fade-up">
          <ProductGallery images={galleryImages} alt={productName} />
        </div>

        {/* Details — sticky on desktop */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-6">
            <div>
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                <span className="h-px w-6 bg-brand-gold/50" />
                {temple.name}
              </span>
              <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                {productName}
              </h1>
              {material && (
                <p className="mt-2 text-sm text-gray-500">{material}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-brand-red">
                {formatInr(displayPrice)}
              </span>
              <InCartBadge
                itemType={itemType}
                itemId={cartItemId}
                selectedSize={cartSize}
                selectedColor={cartColor}
              />
            </div>

            {/* Devotional trust strip */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "M5 13l4 4L19 7", label: "Temple-blessed" },
                { icon: "M5 8h14M5 8a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-8a2 2 0 00-2-2M5 8l2-4h10l2 4", label: "FREE delivery" },
                { icon: "M9 12l2 2 4-4M12 3l7 4v5c0 4-3 7-7 8-4-1-7-4-7-8V7l7-4z", label: "Secure checkout" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/20 bg-surface-soft px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <svg className="h-3.5 w-3.5 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                  {b.label}
                </span>
              ))}
            </div>

            {/* Frame size variants */}
            {category === "frame" && frameSizes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-700">
                  Select size
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {variants.map((v, i) => {
                    const sizeLabel =
                      (v as FrameItem).size ?? `Option ${i + 1}`;
                    const itemInStock =
                      (v as { in_stock?: boolean }).in_stock ?? true;
                    return (
                      <OptionButton
                        key={v.id}
                        active={i === frameVariantIdx}
                        onClick={() => setFrameVariantIdx(i)}
                        disabled={!itemInStock}
                      >
                        {sizeLabel}
                      </OptionButton>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cloth sizes */}
            {category === "cloth" && clothSizes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-700">
                  Select size
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {clothSizes.map((s) => (
                    <OptionButton
                      key={s}
                      active={clothSize === s}
                      onClick={() => setClothSize(s)}
                    >
                      {s}
                    </OptionButton>
                  ))}
                </div>
              </div>
            )}

            {/* Cloth colours */}
            {category === "cloth" && clothColors.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-700">
                  Select colour
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {clothColors.map((c) => (
                    <OptionButton
                      key={c}
                      active={clothColor === c}
                      onClick={() => setClothColor(c)}
                    >
                      {c}
                    </OptionButton>
                  ))}
                </div>
              </div>
            )}

            {/* Action — hidden on mobile (sticky bar takes over) */}
            <div className="hidden pt-2 lg:block">
              <CartItemControl
                itemType={itemType}
                itemId={cartItemId}
                selectedSize={cartSize}
                selectedColor={cartColor}
                disabled={!canAdd}
                label={inStock ? "Add to cart" : "Out of stock"}
              />
            </div>

            <blockquote className="border-l-2 border-brand-gold/50 pl-4 text-sm italic leading-relaxed text-gray-500">
              “Offered with devotion from {temple.name}. May it bring peace and
              blessings to your home.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* More from this temple — horizontal rail */}
      {siblings.length > 0 && (
        <section className="space-y-5">
          <div className="space-y-1.5">
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
              <span className="h-px w-6 bg-brand-gold/50" />
              Continue your darshan
            </span>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              More from this temple
            </h2>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 scrollbar-thin sm:mx-0 sm:px-0">
            {siblings.map((sib) => {
              const href = `/temple/${slugify(temple.name)}/${category}/${sib.slug}`;
              return (
                <Link
                  key={sib.cover.id}
                  href={href}
                  className="group relative flex w-44 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-brand-gold/15 bg-card-bg shadow-devotional transition-all duration-300 hover:-translate-y-1 hover:shadow-devotional-lg sm:w-52"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-surface-soft">
                    <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                      <ProductCarousel
                        images={[sib.cover.image_url]}
                        alt={sib.name}
                        autoPlay={false}
                      />
                    </div>
                    <div className="absolute left-2.5 top-2.5 z-10">
                      <InCartBadge itemType={itemType} itemId={sib.cover.id} />
                    </div>
                  </div>
                  <div className="p-3.5">
                    <p className="font-serif text-sm font-semibold leading-snug text-gray-900 line-clamp-2">
                      {sib.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-brand-red">
                      {formatInr(sib.minPrice)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-gold/20 bg-card-bg/95 px-4 py-3 backdrop-blur shadow-[0_-8px_24px_-12px_rgba(120,53,15,0.25)] lg:hidden">
        <div className="mx-auto flex max-w-screen-sm items-center gap-3">
          <div className="shrink-0">
            <p className="text-[11px] text-gray-500">Total</p>
            <p className="text-lg font-bold text-brand-red leading-tight">
              {formatInr(displayPrice)}
            </p>
          </div>
          <div className="flex-1">
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
      </div>
    </div>
  );
}
