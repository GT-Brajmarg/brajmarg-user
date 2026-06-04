"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Camino al Amor",
    category: "Spiritual Book",
    description:
      "Los santos y los sabios dicen que amor es devoción y devoción es amor.",
    image: "/products/book-1.jpg",
    price: 370,
  },
  {
    id: 2,
    name: "La Familia de Shri Radha-Krishna",
    category: "Book Series",
    description:
      "La nueva serie ayudará en el aprendizaje de la cultura espiritual.",
    image: "/products/book-2.jpg",
    price: 350,
  },
  {
    id: 3,
    name: "Tinta Espiritual",
    category: "Art Collection",
    description: "Me hice a la mar, alejándome de las costas mundanas.",
    image: "/products/book-3.jpg",
    price: 220,
  },
  {
    id: 4,
    name: "Shri Radha-Krishna Kutumb",
    category: "Book Series",
    description:
      "ODev की नई श्रृंखला, श्री राधाकृष्ण कुटुम्ब, आपको श्री राधा-कृष्ण, उनके परिजनों, सेवकों, उनकी पावन भूमि से परिचित कराएगी।",
    image: "/products/book-4.jpg",
    price: 250,
  },
  {
    id: 5,
    name: "Shri Narad Bhakti Sutra",
    category: "Spiritual Book",
    description:
      "A profound commentary on the Narad Bhakti Sutra for devotees.",
    image: "/products/book-5.jpg",
    price: 300,
  },
  {
    id: 6,
    name: "Tulsi Seva",
    category: "Seva",
    description: "Offer your devotion through the sacred Tulsi seva.",
    image: "/products/tulsi-seva.jpg",
    price: 151,
  },
  {
    id: 7,
    name: "Devotional Art Print",
    category: "Art Collection",
    description:
      "A beautiful illustration of the divine leelas, perfect for your altar.",
    image: "/products/art-1.jpg",
    price: 199,
  },
  {
    id: 8,
    name: "Deepam Seva",
    category: "Seva",
    description:
      "Light a lamp in the name of your loved ones at the sacred temple.",
    image: "/products/deepam.jpg",
    price: 108,
  },
];

const filters = ["All Products", "Books", "Seva", "Prasad", "Gifts"];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("All Products");
  const [sortBy, setSortBy] = useState("Latest Arrivals");

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <section className="border-b border-brand-gold/15 bg-gradient-to-b from-surface-soft to-background">
        <div className="mx-auto max-w-7xl px-6 py-10">
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
                items, books and temple offerings carefully selected to support
                your spiritual journey.
              </p>
            </div>

            {/* All Products / My Orders */}
            <div className="flex shrink-0 gap-3">
              <div className="flex items-center gap-2.5 rounded-xl border-2 border-brand-red/40 bg-card-bg px-4 py-3 shadow-sm">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1"
                  />
                </svg>

                <div>
                  <p className="text-sm font-bold text-brand-red">
                    All Products
                  </p>

                  <p className="text-[11px] text-gray-500">
                    {products.length} available
                  </p>
                </div>
              </div>

              <button className="group flex items-center gap-2.5 rounded-xl border border-brand-gold/25 bg-card-bg px-4 py-3 shadow-sm transition-colors hover:border-brand-gold/50">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                  />
                </svg>

                <div>
                  <p className="text-sm font-bold text-gray-900">My Orders</p>

                  <p className="text-[11px] text-gray-500">Check your orders</p>
                </div>
              </button>
            </div>
          </div>

          {/* Tabs + Sort */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap gap-2.5">
              <button className="flex items-center gap-2 rounded-xl border border-brand-red bg-brand-red px-3.5 py-2 text-left text-white shadow-sm">
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
                      {products.length}
                    </span>
                  </span>

                  <span className="text-[11px] leading-tight text-white/80">
                    View all products
                  </span>
                </span>
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-brand-gold/25 bg-card-bg px-3.5 py-2 text-left text-gray-700 hover:border-brand-gold/50">
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
                    d="M4 19.5A2.5 2.5 0 016.5 17H20"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                  />
                </svg>

                <span className="flex flex-col">
                  <span className="text-sm font-semibold">Books</span>

                  <span className="text-[11px] text-gray-400">
                    Spiritual Literature
                  </span>
                </span>
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-brand-gold/25 bg-card-bg px-3.5 py-2 text-left text-gray-700 hover:border-brand-gold/50">
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
                  <span className="text-sm font-semibold">Prasadam</span>

                  <span className="text-[11px] text-gray-400">
                    Temple Offerings
                  </span>
                </span>
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-brand-gold/25 bg-card-bg px-3.5 py-2 text-left text-gray-700 hover:border-brand-gold/50">
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
                    d="M12 2s3 3.5 3 6a3 3 0 11-6 0c0-2.5 3-6 3-6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 14h12M8 18h8M10 22h4"
                  />
                </svg>

                <span className="flex flex-col">
                  <span className="text-sm font-semibold">Pooja Items</span>

                  <span className="text-[11px] text-gray-400">
                    Daily Worship
                  </span>
                </span>
              </button>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Sort by</span>

              <select className="rounded-lg border border-brand-gold/30 bg-card-bg px-3 py-1.5 text-sm font-medium text-gray-800 outline-none focus:border-brand-red focus:ring-2 focus:ring-red-100">
                <option>Recommended</option>
                <option>Latest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8 flex gap-8">
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
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900">
                      ₹{product.price}.00
                    </span>
                  </div>

                  <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
                    Add to cart
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
