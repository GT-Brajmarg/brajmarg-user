"use client";

import Image from "next/image";
import { useState } from "react";
import CartItemControl from "@/components/CartItemControl";
import InCartBadge from "@/components/InCartBadge";
import type { PrasadItem, FrameItem, ClothItem } from "@/types/database";
import { galleryOf } from "@/lib/gallery";

interface ShopClientProps {
  prasad: PrasadItem[];
  frames: FrameItem[];
  cloths: ClothItem[];
}

export default function ShopClient({
  prasad,
  frames,
  cloths,
}: ShopClientProps) {
  const [sortBy, setSortBy] = useState("Default");
  const [category, setCategory] = useState<
    "all" | "prasad" | "frame" | "cloth"
  >("all");

  const allProducts = [
    ...prasad.map((item) => ({
      ...item,
      category: "prasad" as const,
    })),
    ...frames.map((item) => ({
      ...item,
      category: "frame" as const,
    })),
    ...cloths.map((item) => ({
      ...item,
      category: "cloth" as const,
    })),
  ];
  const visibleProducts =
    category === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === category);

  const sortedProducts = [...visibleProducts];

  if (sortBy === "Price: Low to High") {
    sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sortBy === "Price: High to Low") {
    sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  return (
    <>
      <div className="min-h-screen bg-[#f5f0e8]">
        {/* Header */}
        <section className="border-b border-brand-gold/15 bg-gradient-to-b from-surface-soft to-background">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              {/* Left Content */}
              <div className="max-w-2xl">
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  <span className="h-px w-6 bg-brand-gold/50" />
                  Brajmarg Store
                </span>

                <h1 className="mt-2 font-serif text-4xl font-bold text-gray-900">
                  Discover Divine Products
                </h1>

                <p className="mt-2 max-w-xl text-base leading-relaxed text-gray-600">
                  Explore authentic spiritual products, prasadam, devotional
                  items, books and temple offerings carefully selected to
                  support your spiritual journey.
                </p>
              </div>
            </div>

            {/* Tabs + Sort */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setCategory("all")}
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition-colors ${
                    category === "all"
                      ? "border-brand-red bg-brand-red text-white shadow-sm"
                      : "border-brand-gold/25 bg-card-bg text-gray-700 hover:border-brand-gold/50"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.27 6.96L12 12.01l8.73-5.05"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 22.08V12"
                    />
                  </svg>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">
                      All Products
                      <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">
                        {allProducts.length}
                      </span>
                    </span>

                    <span className="text-[11px] text-gray-400">
                      View all products
                    </span>
                  </span>
                </button>

                <button
                  onClick={() => setCategory("frame")}
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition-colors ${
                    category === "frame"
                      ? "border-brand-red bg-brand-red text-white shadow-sm"
                      : "border-brand-gold/25 bg-card-bg text-gray-700 hover:border-brand-gold/50"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16l3-3 2 2 3-4"
                    />
                  </svg>

                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">
                      Frames
                      <span className="ml-1.5 rounded-full bg-brand-gold-soft px-1.5 py-0.5 text-[10px] font-bold text-brand-gold">
                        {frames.length}
                      </span>
                    </span>

                    <span className="text-[11px] text-gray-400">
                      Sacred Frames
                    </span>
                  </span>
                </button>
                <button
                  onClick={() => setCategory("prasad")}
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition-colors ${
                    category === "prasad"
                      ? "border-brand-red bg-brand-red text-white shadow-sm"
                      : "border-brand-gold/25 bg-card-bg text-gray-700 hover:border-brand-gold/50"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2l2.5 5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-2z"
                    />
                  </svg>

                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">
                      Prasad
                      <span className="ml-1.5 rounded-full bg-brand-gold-soft px-1.5 py-0.5 text-[10px] font-bold text-brand-gold">
                        {prasad.length}
                      </span>
                    </span>

                    <span className="text-[11px] text-gray-400">
                      Available Offerings
                    </span>
                  </span>
                </button>

                <button
                  onClick={() => setCategory("cloth")}
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition-colors ${
                    category === "cloth"
                      ? "border-brand-red bg-brand-red text-white shadow-sm"
                      : "border-brand-gold/25 bg-card-bg text-gray-700 hover:border-brand-gold/50"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 3l6 4 6-4M6 21l6-4 6 4M6 3v18M18 3v18"
                    />
                  </svg>

                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">
                      Cloths
                      <span className="ml-1.5 rounded-full bg-brand-gold-soft px-1.5 py-0.5 text-[10px] font-bold text-brand-gold">
                        {cloths.length}
                      </span>
                    </span>

                    <span className="text-[11px] text-gray-400">
                      Divine Attire
                    </span>
                  </span>
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Sort by</span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-brand-gold/30 bg-card-bg px-3 py-1.5 text-sm font-medium text-gray-800 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100"
                >
                  <option value="Default">Featured</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-8 py-8">
          {/* Sidebar */}
          {/* <aside className="w-48 shrink-0">
               <div className="sticky top-6">
                 <p className="mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                   Sort by
                 </p>
                 <ul className="space-y-2">
                   {[
                     "Latest Arrivals",
                     "Price: Low -> High",
                     "Price: High -> Low",
                   ].map((option) => (
                     <li key={option}>
                       <button
                         onClick={() => setSortBy(option)}
                         className={`flex items-center gap-2 text-sm transition-colors ${
                           sortBy === option
                             ? "font-semibold text-slate-900"
                             : "text-slate-500 hover:text-slate-800"
                         }`}
                       >
                         {sortBy === option && (
                           <span className="h-1.5 w-1.5 rounded-full bg-slate-900 inline-block" />
                         )}
                         {option}
                       </button>
                     </li>
                   ))}
                 </ul>
               </div>
             </aside> */}

          {/* Main */}
          <main className="flex-1">
            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => {
                const images = galleryOf(product);
                const imageUrl = images[0];

                return (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-2xl border border-brand-gold/15 bg-card-bg shadow-sm"
                  >
                    {/* Poster */}
                    <div className="relative aspect-[1/1] overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-stone-100">
                          <span className="text-sm text-gray-400">
                            No Image
                          </span>
                        </div>
                      )}
                      <InCartBadge
                        itemType={product.category}
                        itemId={product.id}
                        className="absolute left-3 top-3 z-20"
                      />
                    </div>

                    {/* Footer */}
                    <div className="border-t border-brand-gold/10 bg-white p-4">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <h3 className="font-semibold leading-tight text-gray-900">
                          {product.name}
                        </h3>

                        <span className="shrink-0 font-bold text-brand-red">
                          ₹{Number(product.price).toLocaleString()}
                        </span>
                      </div>

                      <CartItemControl
                        itemType={product.category}
                        itemId={product.id}
                        disabled={!product.in_stock}
                        label={
                          product.in_stock ? "Add to cart" : "Out of stock"
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
