"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div
      className="mt-12 flex items-center justify-center gap-2"
      style={{ marginTop: "10px", marginBottom: "20px" }}
    >
      <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2D2B8] hover:bg-[#F8F2E8]">
        <ChevronLeft size={18} className="text-[#0F5C66]" />
      </button>

      {[1].map((page) => (
        <button
          key={page}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
            page === 1
              ? "bg-[#0F5C66] text-white"
              : "border border-[#E2D2B8] hover:bg-[#0F5C66]"
          }`}
        >
          {page}
        </button>
      ))}

      <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2D2B8] hover:bg-[#F8F2E8]">
        <ChevronRight size={18} className="text-[#0F5C66]" />
      </button>
    </div>
  );
}
