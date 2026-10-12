import { X } from "lucide-react";

interface ActiveFiltersProps {
  category: string;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const categoryLabels: Record<string, string> = {
  frames: "Frames",
  prasad: "Prasad",
  poshak: "Poshak",
  "puja-essentials": "Puja Essentials",
  "books-scriptures": "Books & Scriptures",
  "incense-dhoop": "Incense & Dhoop",
  "idols-murtis": "Idols & Murtis",
  "gift-hampers": "Gift Hampers",
};

export default function ActiveFilters({
  category,
  selectedCategories,
  setSelectedCategories,
}: ActiveFiltersProps) {
  if (selectedCategories.length === 0) return null;

  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {selectedCategories.map((cat) => (
        <button
          key={cat}
          onClick={() =>
            setSelectedCategories((prev) => prev.filter((c) => c !== cat))
          }
          className="font-cormorant inline-flex items-center gap-1.5 rounded-[6px] border border-[#C98C3D] bg-[#FAF3E8] px-2.5 py-1 text-[13px] font-semibold text-[#5E4D3C] transition hover:bg-[#F3E5D0]"
        >
          <span>{categoryLabels[cat] || cat}</span>
          <X size={12} className="text-[#C98C3D]" />
        </button>
      ))}
    </div>
  );
}
