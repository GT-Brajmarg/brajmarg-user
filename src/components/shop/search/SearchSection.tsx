"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SlidersHorizontal, X } from "lucide-react";

import SearchBar from "./SearchBar";
import SearchResultTitle from "./SearchResultTitle";
import ActiveFilters from "./ActiveFilters";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

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

  const collectionTitles: Record<string, string> = {
    "best-sellers": "Best Sellers",
    "festival-specials": "Festival Specials",
    "new-arrivals": "New Arrivals",
    handcrafted: "Handcrafted",
  };

  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const title = category
    ? (categoryTitles[category] ?? "Shop")
    : (collectionTitles[collection ?? ""] ?? "Shop");

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

      {/* Mobile Filter Button */}
      <div
        className="mt-4 flex justify-end lg:hidden"
        style={{ marginBottom: "10px" }}
      >
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-full border border-[#C37000] px-4 py-2 text-sm font-medium text-[#C37000]"
        >
          <SlidersHorizontal size={18} style={{ marginLeft: "5px" }} />
          <span style={{ marginRight: "5px" }}>Filters</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-6 lg:mt-2 lg:flex-row lg:gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            category={category ?? ""}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedPriceRanges={selectedPriceRanges}
            setSelectedPriceRanges={setSelectedPriceRanges}
          />
        </div>

        {/* Product Section */}
        <div className="relative flex-1">
          {/* Temple Image */}
          <Image
            src="/images/search-temple.png"
            alt="Temple Illustration"
            width={300}
            height={100}
            className="absolute -top-30 -right-8 hidden xl:block"
          />

          <div className="rounded-xl border border-[#C37000] bg-transparent p-3 md:p-5">
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

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 w-[65%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl lg:hidden">
            <div className="mb-6 flex justify-end">
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={{ marginLeft: "20px" }}>
              <FilterSidebar
                category={category ?? ""}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPriceRanges={selectedPriceRanges}
                setSelectedPriceRanges={setSelectedPriceRanges}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
