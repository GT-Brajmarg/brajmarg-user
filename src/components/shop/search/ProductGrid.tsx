"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchShopProducts } from "@/store/slices/shopSlice";
import { priceRanges } from "../shopFilters";

// const products = Array.from({ length: 9 }).map((_, i) => ({
//   id: i + 1,
//   name: "Shreenath Ji Wooden Frame",
//   temple: "Shreenath Ji Temple, Nathdwara",
//   price: 1499,
//   oldPrice: 1899,
//   image: "/images2/default.png", // Replace with your image
// }));

interface ProductGridProps {
  selectedCategories: string[];
  selectedPriceRanges: string[];
  collection?: string;
  searchQuery: string;
}

export default function ProductGrid({
  selectedCategories,
  selectedPriceRanges,
  collection,
  searchQuery,
}: ProductGridProps) {
  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector((state) => state.shop);

  const comingSoonCategories = [
    "puja-essentials",
    "books-scriptures",
    "incense-dhoop",
    "idols-murtis",
    "gift-hampers",
  ];

  const isComingSoon =
    selectedCategories.length > 0 &&
    selectedCategories.every((category) =>
      comingSoonCategories.includes(category),
    );

  useEffect(() => {
    if (isComingSoon) return;

    if (selectedCategories.length === 0 && !collection) return;

    dispatch(
      fetchShopProducts({
        categories: selectedCategories,
        collection,
        query: searchQuery,
      }),
    );
  }, [dispatch, selectedCategories, collection, isComingSoon]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (isComingSoon) {
    return (
      <div className="mx-[10px] my-5 flex min-h-[420px] flex-col items-center justify-center rounded-[18px] px-8 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF1DD]">
          <span className="text-4xl">🛍️</span>
        </div>

        <h2 className="font-cormorant text-[40px] font-semibold text-[#0C6972]">
          Coming Soon
        </h2>

        <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#6C563B]">
          We're carefully curating this collection with authentic devotional
          products. This category will be available soon on Brajmarg.
        </p>

        <div className="mt-8 rounded-full border border-[#D79A43] bg-[#FFF3DE] px-6 py-2 text-[14px] font-medium text-[#C37000]">
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>
            Stay Tuned
          </span>
        </div>
      </div>
    );
  }
  const filteredProducts =
    selectedPriceRanges.length === 0
      ? items
      : items.filter((product) => {
          const price = Number(product.price);

          return selectedPriceRanges.some((rangeId) => {
            const range = priceRanges.find((r) => r.id === rangeId);

            if (!range) return false;

            return price >= range.min && price <= range.max;
          });
        });

  const searchedProducts =
    searchQuery.trim() === ""
      ? filteredProducts
      : filteredProducts.filter((product) => {
          const query = searchQuery.toLowerCase();

          return [
            product.name,
            product.category,
            product.temples?.name,
            product.material,
            product.description,
          ]
            .filter(Boolean)
            .some((field) => String(field).toLowerCase().includes(query));
        });

  if (searchedProducts.length === 0) {
    return (
      <div className="mx-[10px] my-5 flex min-h-[420px] flex-col items-center justify-center rounded-[18px] px-8 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF1DD]">
          <span className="text-4xl">🔍</span>
        </div>

        <h2 className="font-cormorant text-[40px] font-semibold text-[#0C6972]">
          No Products Found
        </h2>

        <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#6C563B]">
          We couldn't find any products matching your selected filters. Try
          adjusting your filters or explore other devotional collections.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-full border border-[#D79A43] bg-[#FFF3DE] px-6 py-2 text-[14px] font-medium text-[#C37000] transition hover:bg-[#FBE7C4]"
        >
          <span
            className="mx-2"
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            Clear Filters
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      style={{
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      {searchedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
