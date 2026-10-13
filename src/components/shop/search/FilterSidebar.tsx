"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface FilterSidebarProps {
  category: string;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;

  selectedPriceRanges?: string[];
  setSelectedPriceRanges?: React.Dispatch<React.SetStateAction<string[]>>;

  priceFilter?: { min: number; max: number } | null;
  setPriceFilter?: React.Dispatch<
    React.SetStateAction<{ min: number; max: number } | null>
  >;
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

function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (val: { min: number; max: number }) => void;
}) {
  const step = 10;
  const currentMin = Math.max(min, Math.min(value.min, max));
  const currentMax = Math.min(max, Math.max(value.max, min));

  const minPercent = max > min ? ((currentMin - min) / (max - min)) * 100 : 0;
  const maxPercent = max > min ? ((currentMax - min) / (max - min)) * 100 : 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const newMin = Math.min(val, currentMax - step);
    onChange({ min: newMin, max: currentMax });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const newMax = Math.max(val, currentMin + step);
    onChange({ min: currentMin, max: newMax });
  };

  return (
    <div className="space-y-3 px-1 py-2">
      {/* Price Labels / Badges */}
      <div className="flex items-center justify-between font-cormorant text-[14px]">
        <div className="flex flex-col">
          <span className="text-[11px] text-[#A6723E] uppercase tracking-wider">
            Min
          </span>
          <span className="rounded border border-[#C37000]/40 bg-[#FAF3E8] px-2 py-0.5 font-bold text-[#0B6670]">
            ₹{currentMin}
          </span>
        </div>
        <span className="mt-3 font-bold text-[#A6723E]">—</span>
        <div className="flex flex-col items-end">
          <span className="text-[11px] text-[#A6723E] uppercase tracking-wider">
            Max
          </span>
          <span className="rounded border border-[#C37000]/40 bg-[#FAF3E8] px-2 py-0.5 font-bold text-[#0B6670]">
            ₹{currentMax}
          </span>
        </div>
      </div>

      {/* Dual Slider Track Container */}
      <div className="relative flex h-5 items-center">
        {/* Background rail */}
        <div className="absolute h-1.5 w-full rounded-full bg-[#EAD8BD]" />

        {/* Active Teal track */}
        <div
          className="absolute h-1.5 rounded-full bg-[#0B6670]"
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`,
          }}
        />

        {/* Min Input Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMin}
          onChange={handleMinChange}
          aria-label="Minimum price"
          style={{ zIndex: currentMin > max - 100 ? 25 : 15 }}
          className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FAF3E8] [&::-webkit-slider-thumb]:bg-[#0B6670] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#FAF3E8] [&::-moz-range-thumb]:bg-[#0B6670] [&::-moz-range-thumb]:cursor-pointer"
        />

        {/* Max Input Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMax}
          onChange={handleMaxChange}
          aria-label="Maximum price"
          style={{ zIndex: 20 }}
          className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FAF3E8] [&::-webkit-slider-thumb]:bg-[#0B6670] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#FAF3E8] [&::-moz-range-thumb]:bg-[#0B6670] [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      {/* Min / Max bounds */}
      <div className="flex justify-between font-cormorant text-[12px] text-[#A6723E]">
        <span>₹{min}</span>
        <span>₹{max}</span>
      </div>
    </div>
  );
}

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
  priceFilter,
  setPriceFilter,
}: FilterSidebarProps) {
  const { materials, sizes, colors, quantities } = useAppSelector(
    (state) => state.shopFilters,
  );
  const items = useAppSelector((state) => state.shop.items);

  const { sliderMin, sliderMax } = useMemo(() => {
    if (!items || items.length === 0) {
      return { sliderMin: 0, sliderMax: 1000 };
    }

    const prices = items
      .map((p: any) => Number(p.price))
      .filter((p: number) => !isNaN(p) && p >= 0);

    if (prices.length === 0) {
      return { sliderMin: 0, sliderMax: 1000 };
    }

    const rawMin = Math.min(...prices);
    const rawMax = Math.max(...prices);

    const calculatedMin = Math.floor(rawMin / 100) * 100;
    let calculatedMax = Math.ceil(rawMax / 100) * 100;

    if (calculatedMax <= calculatedMin) {
      calculatedMax = calculatedMin + 100;
    }

    return { sliderMin: calculatedMin, sliderMax: calculatedMax };
  }, [items]);

  const currentPriceRange = priceFilter ?? {
    min: sliderMin,
    max: sliderMax,
  };

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
            setSelectedPriceRanges?.([]);
            setPriceFilter?.(null);
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
        <FilterSection title="Material" defaultOpen={false}>
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
        <FilterSection title="Size" defaultOpen={false}>
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
        <FilterSection title="Color" defaultOpen={false}>
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
        <FilterSection title="Quantity" defaultOpen={false}>
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
      <FilterSection title="Price Range" defaultOpen={false}>
        <PriceRangeSlider
          min={sliderMin}
          max={sliderMax}
          value={currentPriceRange}
          onChange={(newRange) => {
            setPriceFilter?.(newRange);
          }}
        />
      </FilterSection>

      {/* AVAILABILITY */}
      {/* <FilterSection title="Availability">
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
      </FilterSection> */}
    </aside>
  );
}
