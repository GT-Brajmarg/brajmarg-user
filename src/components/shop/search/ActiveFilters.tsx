import { X } from "lucide-react";

interface ActiveFiltersProps {
  category: string;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ActiveFilters({
  category,
  selectedCategories,
  setSelectedCategories,
}: ActiveFiltersProps) {
  return (
    <div
      className="mb-4 flex flex-wrap gap-2"
      style={{ marginLeft: "10px", marginTop: "10px" }}
    >
      {selectedCategories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategories((prev) => prev.filter((c) => c !== category))
          }
          className="font-cormorant flex items-center gap-1 rounded border border-[#D8A14B] px-2 py-1 text-[15px] text-[#3D352F]"
        >
          <span style={{ marginLeft: "5px" }}>{category}</span>
          <X
            size={12}
            className="text-[#C37000]"
            style={{ marginRight: "5px" }}
          />
        </button>
      ))}
    </div>
  );
}
