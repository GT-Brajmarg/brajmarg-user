"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemples } from "@/store/slices/templesSlice";

export default function TempleGrid() {
  const dispatch = useAppDispatch();

  const { temples, loading, error } = useAppSelector((state) => state.temples);
  const [currentPage, setCurrentPage] = useState(1);

  const templesPerPage = 8;

  const totalPages = Math.ceil(temples.length / templesPerPage);

  const startIndex = (currentPage - 1) * templesPerPage;

  const paginatedTemples = temples.slice(
    startIndex,
    startIndex + templesPerPage,
  );

  useEffect(() => {
    dispatch(fetchTemples());
  }, [dispatch]);

  if (loading) {
    return <div className="py-20 text-center">Loading temples...</div>;
  }

  if (error) {
    return <div className="py-20 text-center">{error}</div>;
  }

  return (
    <section className="relative mx-auto max-w-[1280px] px-4 py-12">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
        {paginatedTemples.map((temple) => (
          <div
            key={temple.id}
            className={`relative mx-auto h-[470px] w-[290px] transition-all duration-300 hover:-translate-y-2 ${
              temple.is_coming_soon ? "opacity-50" : ""
            }`}
          >
            {/* Scroll Frame */}
            <div className="pointer-events-none absolute inset-0 z-0">
              <Image
                src="/images2/image 45.png"
                alt=""
                fill
                priority
                style={{ objectFit: "fill" }}
              />
            </div>

            {/* Badge */}
            <span
              className={`absolute top-[58px] left-[35px] z-50 inline-flex h-[30px] items-center gap-1 rounded-full px-[20px] text-[12px] font-bold text-white ${
                temple.is_coming_soon
                  ? "w-[90px] bg-[#D8A24A]"
                  : "w-[45px] bg-[#15A44D]"
              }`}
            >
              {!temple.is_coming_soon && (
                <span className="h-[8px] w-[8px] rounded-full bg-white" />
              )}

              {temple.is_coming_soon ? "COMING SOON" : "LIVE"}
            </span>

            {/* Arch Image */}
            <div className="absolute top-[90px] left-1/2 h-[180px] w-[200px] -translate-x-1/2">
              <div className="absolute top-[-30px] left-1/2 h-[280px] w-[280px] -translate-x-1/2">
                <div className="absolute top-[48px] left-[62px] h-[170px] w-[155px] overflow-hidden rounded-t-[999px]">
                  <Image
                    src={temple.image_url || ""}
                    alt={temple.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <Image
                  src="/images2/temple-arch-frame.png"
                  alt=""
                  fill
                  className="pointer-events-none z-20 object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <h3 className="font-cormorant absolute top-[300px] left-1/2 w-[90%] -translate-x-1/2 text-center text-[18px] font-semibold text-[#0D5560]">
              {temple.name}
            </h3>

            <div className="absolute top-[340px] left-1/2 flex -translate-x-1/2 items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8860a"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <span className="font-cormorant text-[12px] font-medium text-[#7A6A55]">
                {temple.location}
              </span>
            </div>

            <Link
              href={`/temples/${temple.name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "")}`}
              className="font-cormorant absolute bottom-[58px] left-1/2 flex h-[36px] w-[145px] -translate-x-1/2 items-center justify-center rounded-full border border-[#D7B36A] bg-[#2B8182] text-[18px] font-semibold text-white transition-all hover:bg-[#236f70]"
            >
              <span className="absolute -left-[4px] h-[8px] w-[8px] rounded-full bg-[#D7B36A]" />
              <span className="pointer-events-none absolute inset-[2px] rounded-full border border-[#E8D4A3]" />
              Visit Temple
              <span className="absolute -right-[4px] h-[8px] w-[8px] rounded-full bg-[#D7B36A]" />
            </Link>
          </div>
        ))}
      </div>
      <div
        className="mt- flex justify-center"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <div className="flex items-center gap-2">
          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] border border-[#C88A1A] text-[#0D6B73] disabled:opacity-40"
          >
            ←
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`flex h-[32px] w-[32px] items-center justify-center rounded-[4px] border text-[18px] font-medium ${
                currentPage === i + 1
                  ? "border-[#0D6B73] bg-[#0D6B73] text-white"
                  : "border-[#C88A1A] bg-transparent text-[#0D6B73]"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] border border-[#C88A1A] text-[#0D6B73] disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
