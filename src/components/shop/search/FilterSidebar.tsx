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
  { slug: "frames", label: "Frames", count: 18 },
  { slug: "poshak", label: "Deity Dresses", count: 4 },
  { slug: "prasad", label: "Prasad", count: 5 },
  { slug: "puja-essentials", label: "Puja Essentials", count: 4 },
  { slug: "books-scriptures", label: "Books & Scriptures", count: 3 },
  { slug: "incense-dhoop", label: "Incense & Dhoop", count: 2 },
  { slug: "idols-murtis", label: "Idols & Murtis", count: 4 },
  { slug: "gift-hampers", label: "Gift Hampers", count: 3 },
];

const priceRanges = [
  { id: "0-250", label: "Under ₹250", count: 3, min: 0, max: 250 },
  { id: "251-500", label: "₹251 – ₹500", count: 5, min: 251, max: 500 },
  { id: "501-1000", label: "₹501 – ₹1,000", count: 3, min: 501, max: 1000 },
  { id: "1001-2500", label: "₹1,001 – ₹2,500", count: 4, min: 1001, max: 2500 },
  { id: "2501-5000", label: "₹2,501 – ₹5,000", count: 2, min: 2501, max: 5000 },
  { id: "5001+", label: "Above ₹5,000", count: 2, min: 5001, max: Infinity },
];

const availabilityOptions = [
  { label: "In Stock", count: 18 },
  { label: "Ready to Ship", count: 2 },
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
    <div className="py-2.5 border-b border-[#EAD8BD]/60 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-1 cursor-pointer"
      >
        <span className="font-cormorant text-[16px] font-bold text-[#0F5C66]">
          {title}
        </span>

        {open ? (
          <ChevronUp size={15} className="text-[#0F5C66]" />
        ) : (
          <ChevronDown size={15} className="text-[#0F5C66]" />
        )}
      </button>

      {open && <div className="mt-2">{children}</div>}
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
    <aside className="w-full lg:w-[240px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-cormorant text-[20px] font-bold text-[#0F5C66]">
          Filter By
        </h2>

        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedPriceRanges([]);
          }}
          className="font-cormorant text-[12px] font-medium text-[#A6723E] hover:underline cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Decorative Divider */}
      <div className="my-2.5 flex items-center gap-2">
        <div className="h-px flex-1 bg-[#D8B478]/50" />
        <div className="h-1.5 w-1.5 rotate-45 border border-[#C37000]/60 bg-[#EFDEC7]" />
        <div className="h-px flex-1 bg-[#D8B478]/50" />
      </div>

      {/* CATEGORY */}
      <FilterSection title="Category">
        <div className="space-y-2">
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
                className="sr-only"
              />
              <span
                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border transition ${
                  selectedCategories.includes(item.slug)
                    ? "border-[#0B6670] bg-[#0B6670] text-white"
                    : "border-[#C37000] bg-transparent"
                }`}
              >
                {selectedCategories.includes(item.slug) && (
                  <svg
                    className="h-2.5 w-2.5"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M2.5 6L5 8.5L9.5 3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="flex-1 font-cormorant text-[15px] font-medium text-[#3D352F] group-hover:text-[#0B6670]">
                {item.label}
              </span>
              <span className="font-cormorant text-[13px] font-bold text-[#0B6670]">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* MATERIAL */}
      {materials.length > 0 && (
        <FilterSection title="Material">
          <div className="space-y-2">
            {materials.map((item, idx) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#0B6670] checked:bg-[#0B6670] focus:outline-none"
                />
                <span className="flex-1 font-cormorant text-[15px] font-medium text-[#3D352F]">
                  {item}
                </span>
                <span className="font-cormorant text-[13px] font-bold text-[#0B6670]">
                  {[3, 4, 2, 1][idx] ?? 3}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* SIZE */}
      {sizes.length > 0 && (
        <FilterSection title="Size">
          <div className="space-y-2">
            {sizes.map((size, idx) => (
              <label
                key={size}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#0B6670] checked:bg-[#0B6670] focus:outline-none"
                />
                <span className="flex-1 font-cormorant text-[15px] font-medium text-[#3D352F]">
                  {size}
                </span>
                <span className="font-cormorant text-[13px] font-bold text-[#0B6670]">
                  {[3, 2, 3, 1][idx] ?? 2}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* COLOR */}
      {colors.length > 0 && (
        <FilterSection title="Color">
          <div className="space-y-2">
            {colors.map((color, idx) => (
              <label
                key={color}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#0B6670] checked:bg-[#0B6670] focus:outline-none"
                />
                <span className="flex-1 font-cormorant text-[15px] font-medium text-[#3D352F]">
                  {color}
                </span>
                <span className="font-cormorant text-[13px] font-bold text-[#0B6670]">
                  {[2, 4, 3][idx] ?? 2}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* QUANTITY */}
      {quantities.length > 0 && (
        <FilterSection title="Quantity">
          <div className="space-y-2">
            {quantities.map((quantity, idx) => (
              <label
                key={quantity}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#0B6670] checked:bg-[#0B6670] focus:outline-none"
                />
                <span className="flex-1 font-cormorant text-[15px] font-medium text-[#3D352F]">
                  {quantity}
                </span>
                <span className="font-cormorant text-[13px] font-bold text-[#0B6670]">
                  {[1, 2, 5][idx] ?? 1}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* PRICE RANGE */}
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
                className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#0B6670] checked:bg-[#0B6670] focus:outline-none"
              />
              <span className="flex-1 font-cormorant text-[15px] font-medium text-[#3D352F]">
                {price.label}
              </span>
              <span className="font-cormorant text-[13px] font-bold text-[#0B6670]">
                {price.count}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* AVAILABILITY */}
      <FilterSection title="Availability">
        <div className="space-y-2">
          {availabilityOptions.map((option) => (
            <label
              key={option.label}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="checkbox"
                className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[3px] border border-[#C37000] bg-transparent checked:border-[#0B6670] checked:bg-[#0B6670] focus:outline-none"
              />
              <span className="flex-1 font-cormorant text-[15px] font-medium text-[#3D352F]">
                {option.label}
              </span>
              <span className="font-cormorant text-[13px] font-bold text-[#0B6670]">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}
