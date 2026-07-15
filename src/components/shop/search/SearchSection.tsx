"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultTitle from "./SearchResultTitle";
import ActiveFilters from "./ActiveFilters";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { fetchShopFilters } from "@/store/slices/shopFilterSlice";

interface Props {
  category?: string;
  collection?: string;
  searchQuery?: string;
}

export default function SearchSection({
  category,
  collection,
  searchQuery: initialSearchQuery = "",
}: Props) {
  const categoryTitles: Record<string, string> = {
    frames: "Frames",
    prasad: "Prasad",
    poshak: "Poshak",
    "puja-essentials": "Puja Essentials",
    "books-scriptures": "Books & Scriptures",
    "incense-dhoop": "Incense & Dhoop",
    "idols-murtis": "Idols & Murtis",
    "gift-hampers": "Gift Hampers",
  };
  const priceRanges = [
    { id: "0-250", label: "Under ₹250", min: 0, max: 250 },
    { id: "251-500", label: "₹251 - ₹500", min: 251, max: 500 },
    { id: "501-1000", label: "₹501 - ₹1,000", min: 501, max: 1000 },
    { id: "1001-2500", label: "₹1,001 - ₹2,500", min: 1001, max: 2500 },
    { id: "2501-5000", label: "₹2,501 - ₹5,000", min: 2501, max: 5000 },
    { id: "5001+", label: "Above ₹5,000", min: 5001, max: Infinity },
  ];
  const collectionTitles: Record<string, string> = {
    "best-sellers": "Best Sellers",
    "festival-specials": "Festival Specials",
    "new-arrivals": "New Arrivals",
    handcrafted: "Handcrafted",
  };

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const title = category
    ? (categoryTitles[category] ?? "Shop")
    : (collectionTitles[collection ?? ""] ?? "Shop");
  const dispatch = useAppDispatch();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    category ? [category] : [],
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
  }, [category]);

  useEffect(() => {
    if (selectedCategories.length === 0) return;

    dispatch(fetchShopFilters(selectedCategories));
  }, [dispatch, selectedCategories]);
  return (
    <section className="relative">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <SearchResultTitle title={title} total={20} />

      <div
        className="mt-6 flex gap-8"
        style={{ marginTop: "5px", marginBottom: "20px" }}
      >
        <FilterSidebar
          category={category ?? ""}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedPriceRanges={selectedPriceRanges}
          setSelectedPriceRanges={setSelectedPriceRanges}
        />
        <div className="flex-1">
          <Image
            src="/images/search-temple.png"
            alt="Temple Illustration"
            width={300}
            height={100}
            className="absolute top-12 -right-10 z-20 object-contain"
          />
          <div className="flex-1 rounded-[12px] border border-[#C37000] bg-transparent px-3 pt-3 pb-5">
            <ActiveFilters
              category={category ?? ""}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            <ProductGrid
              selectedCategories={selectedCategories}
              selectedPriceRanges={selectedPriceRanges}
              collection={collection}
              searchQuery={searchQuery}
            />
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}
