import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <div
      className="relative w-full max-w-[720px] rounded-[6px] shadow-[0_4px_10px_rgba(0,0,0,0.05),0_12px_30px_rgba(195,112,0,0.12)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.08),0_18px_40px_rgba(195,112,0,0.18)]"
      style={{ marginTop: "30px" }}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Products"
        className="font-cormorant h-[36px] w-full rounded-[4px] border border-[#A86000] bg-transparent pr-10 pl-3 text-[15px] text-[#5C3B14] transition outline-none placeholder:text-[#9B8A75] focus:border-[#B78628] focus:ring-1 focus:ring-[#E2B86D]"
      />

      <Search
        size={16}
        strokeWidth={2}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#A86000]"
      />
    </div>
  );
}
