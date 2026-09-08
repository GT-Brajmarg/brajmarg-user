"use client";

import { Search, ChevronDown } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Props {
  search: string;
  onSearch: (value: string) => void;
  sort: string;
  onSort: (value: string) => void;
}

const sortOptions = [
  "Newest first",
  "Oldest first",
  "Upcoming First",
  "Completed First",
];

export default function SevaFilters({ search, onSearch, sort, onSort }: Props) {
  return (
    <div
      className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      style={{ marginTop: "20px" }}
    >
      {/* Search */}
      <div className="relative w-full max-w-[560px]">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by seva, temple or booking ID"
          className={`${cormorantInfant.className} h-[50px] w-full rounded-[14px] border-2 border-[#A86000]/64 px-6 pr-14 text-[18px] font-bold text-[#5E5E5E] outline-none placeholder:text-[#5E5E5E] focus:border-[#C37000]`}
          style={{ paddingLeft: "10px" }}
        />

        <Search
          size={20}
          className="absolute top-1/2 right-5 -translate-y-1/2 text-[#C37000]"
        />
      </div>

      {/* Sort */}
      <div className="relative w-full lg:w-[250px]">
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className={`${cormorantInfant.className} h-[50px] w-full appearance-none rounded-[14px] border-2 border-[#A86000]/64 px-6 pr-12 text-[18px] font-bold text-[#5E5E5E] outline-none focus:border-[#C37000]`}
          style={{ paddingLeft: "10px" }}
        >
          {sortOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <ChevronDown
          size={20}
          className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-[#C37000]"
        />
      </div>
    </div>
  );
}
