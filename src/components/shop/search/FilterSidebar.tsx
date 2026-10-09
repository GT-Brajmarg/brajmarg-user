"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface FilterSidebarProps {
  category: string;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;

  selectedPriceRanges: string[];
  setSelectedPriceRanges: React.Dispatch<React.SetStateAction<string[]>>;
}

const categories = [
  { slug: "frames", label: "Frames" },
  { slug: "poshak", label: "Deity Dresses" },
  { slug: "prasad", label: "Prasad" },
  { slug: "puja-essentials", label: "Puja Essentials" },
  { slug: "books-scriptures", label: "Books & Scriptures" },
  { slug: "incense-dhoop", label: "Incense & Dhoop" },
  { slug: "idols-murtis", label: "Idols & Murtis" },
  { slug: "gift-hampers", label: "Gift Hampers" },
];

// const materials = ["Wood", "Marble", "Metal", "Canvas"];

// const sizes = [
//   { label: '5" × 7"', count: 3 },
//   { label: '8" × 10"', count: 2 },
//   { label: '10" × 12"', count: 3 },
//   { label: '12" × 16"', count: 1 },
// ];

const priceRanges = [
  { id: "0-250", label: "Under ₹250", min: 0, max: 250 },
  { id: "251-500", label: "₹251 - ₹500", min: 251, max: 500 },
  { id: "501-1000", label: "₹501 - ₹1,000", min: 501, max: 1000 },
  { id: "1001-2500", label: "₹1,001 - ₹2,500", min: 1001, max: 2500 },
  { id: "2501-5000", label: "₹2,501 - ₹5,000", min: 2501, max: 5000 },
  { id: "5001+", label: "Above ₹5,000", min: 5001, max: Infinity },
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="py-5" style={{ marginTop: "10px" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between"
      >
        <span className="font-cormorant text-[24px] font-semibold text-[#0F5C66]">
          {title}
        </span>

        {open ? (
          <ChevronUp size={18} className="text-[#0F5C66]" />
        ) : (
          <ChevronDown size={18} className="text-[#0F5C66]" />
        )}
      </button>

      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  category,
  selectedCategories,
  setSelectedCategories,
  selectedPriceRanges,
  setSelectedPriceRanges,
}: FilterSidebarProps) {
  const { materials, sizes, colors, quantities } = useAppSelector(
    (state) => state.shopFilters,
  );
  return (
    <aside className="sticky top-28 w-[290px] rounded-2xl p-6">
      {/* Header */}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-cormorant text-[28px] font-semibold text-[#0F5C66]">
          Filter By
        </h2>

        <button className="font-cormorant text-sm font-medium text-[#C37000] hover:underline">
          Clear All
        </button>
      </div>

      {/* CATEGORY */}

      <FilterSection title="Category">
        <div className="space-y-3">
          {categories.map((item) => (
            <label
              key={item.slug}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(item.slug)}
                onChange={() => {
                  if (selectedCategories.includes(item.slug)) {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== item.slug),
                    );
                  } else {
                    setSelectedCategories([...selectedCategories, item.slug]);
                  }
                }}
                className="h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#C37000] checked:bg-[#C37000] focus:ring-1 focus:ring-[#C37000] focus:outline-none"
              />
              <span className="font-cormorant text-[20px] text-[#0F5C66]">
                {item.slug}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* PRICE */}

      {/* <FilterSection title="Price">
        <div>
          <input
            type="range"
            min={0}
            max={10000}
            className="w-full accent-[#C89A4A]"
          />

          <div className="mt-4 flex justify-between text-sm text-[#74675A]">
            <span>₹0</span>

            <span>₹10,000</span>
          </div>
        </div>
      </FilterSection> */}

      {/* MATERIAL */}

      {materials.length > 0 && (
        <FilterSection title="Material">
          <div className="space-y-3">
            {materials.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#C37000] checked:bg-[#C37000]"
                />

                <span className="font-cormorant text-[20px] text-[#0F5C66]">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}
      {sizes.length > 0 && (
        <FilterSection title="Size">
          <div className="space-y-2">
            {sizes.map((size) => (
              <label
                key={size}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#C37000] checked:bg-[#C37000] focus:ring-1 focus:ring-[#C37000] focus:outline-none"
                />

                <span className="font-cormorant text-[20px] text-[#0F5C66]">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {colors.length > 0 && (
        <FilterSection title="Color">
          <div className="space-y-3">
            {colors.map((color) => (
              <label
                key={color}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#C37000] checked:bg-[#C37000] focus:ring-1 focus:ring-[#C37000] focus:outline-none"
                />

                <span className="font-cormorant text-[20px] text-[#0F5C66]">
                  {color}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {quantities.length > 0 && (
        <FilterSection title="Quantity">
          <div className="space-y-3">
            {quantities.map((quantity) => (
              <label
                key={quantity}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#C37000] checked:bg-[#C37000] focus:ring-1 focus:ring-[#C37000] focus:outline-none"
                />

                <span className="font-cormorant text-[20px] text-[#0F5C66]">
                  {quantity}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Price Range">
        <div className="space-y-2">
          {priceRanges.map((price) => (
            <label
              key={price.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(price.id)}
                onChange={() => {
                  if (selectedPriceRanges.includes(price.id)) {
                    setSelectedPriceRanges(
                      selectedPriceRanges.filter((id) => id !== price.id),
                    );
                  } else {
                    setSelectedPriceRanges([...selectedPriceRanges, price.id]);
                  }
                }}
                className="h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#C37000] checked:bg-[#C37000]"
              />

              <span className="font-cormorant text-[20px] text-[#0F5C66]">
                {price.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* AVAILABILITY */}

      <FilterSection title="Availability">
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#C37000] checked:bg-[#C37000] focus:ring-1 focus:ring-[#C37000] focus:outline-none"
            />

            <span className="font-cormorant text-[20px] text-[#0F5C66]">
              In Stock
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#C37000] checked:bg-[#C37000] focus:ring-1 focus:ring-[#C37000] focus:outline-none"
            />

            <span className="font-cormorant text-[20px] text-[#0F5C66]">
              Out of Stock
            </span>
          </label>
        </div>
      </FilterSection>
    </aside>
  );
}
