"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemples } from "@/store/slices/templesSlice";

interface TempleGridProps {
  searchTerm: string;
}

export default function TempleGrid({ searchTerm }: TempleGridProps) {
  const dispatch = useAppDispatch();

  const { temples, loading, error } = useAppSelector((state) => state.temples);
  const [currentPage, setCurrentPage] = useState(1);

  const templesPerPage = 8;

  const filteredTemples = temples.filter((temple) => {
    const search = searchTerm.toLowerCase();

    return (
      temple.name?.toLowerCase().includes(search) ||
      temple.location?.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredTemples.length / templesPerPage);

  const startIndex = (currentPage - 1) * templesPerPage;

  const paginatedTemples = filteredTemples.slice(
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
    <section className="relative w-full px-4 pt-[180px] pb-12">
      <div className="flex w-full justify-center">
        {filteredTemples.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="font-cormorant text-[32px] font-semibold text-[#0D5560]">
              No Temples Found
            </h3>
            <p className="mt-2 text-[#7A6A55]">
              Try searching with a different temple name or location.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-18">
            {paginatedTemples.map((temple) => (
              <div
                key={temple.id}
                className={`relative mx-auto h-[420px] w-[260px] transition-all duration-300 hover:-translate-y-2 ${
                  temple.is_coming_soon ? "opacity-40 grayscale-[20%]" : ""
                }`}
              >
                {/* Scroll Frame */}
                <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                  <div className="relative h-[420px] w-[260px]">
                    <Image
                      src="/images2/image 45.png"
                      alt=""
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Badge */}
                <span
                  className={`absolute top-[75px] left-[30px] z-50 inline-flex h-[30px] items-center rounded-full px-[20px] text-[12px] font-bold text-white shadow-sm ${
                    temple.is_coming_soon
                      ? "w-[95px] bg-[#D8A24A]"
                      : "w-[42px] bg-[#15A44D]"
                  }`}
                >
                  {!temple.is_coming_soon && (
                    <span className="mr-[6px] h-[8px] w-[8px] rounded-full bg-white" />
                  )}
                  {temple.is_coming_soon ? "COMING SOON" : "LIVE"}
                </span>

                {/* Temple Image */}
                <div className="absolute top-[40px] left-1/2 h-[180px] w-[200px] -translate-x-1/2">
                  <div className="relative h-full w-full">
                    <div className="absolute top-[-25px] left-1/2 h-[280px] w-[280px] -translate-x-1/2">
                      <div
                        className="absolute top-[58px] left-1/2 z-10 h-[165px] w-[155px] -translate-x-1/2 overflow-hidden rounded-t-[80px]"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 85% 18%, 100% 42%, 100% 100%, 0% 100%, 0% 42%, 15% 18%)",
                        }}
                      >
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
                        className="pointer-events-none absolute inset-0 z-20 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-cormorant absolute top-[255px] left-1/2 w-[90%] -translate-x-1/2 text-center text-[16px] font-semibold text-[#0D5560]">
                  {temple.name}
                </h3>

                {/* Location */}
                <div className="absolute top-[285px] left-1/2 flex -translate-x-1/2 items-center gap-1">
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

                  <span className="font-cormorant block max-w-[140px] truncate text-[12px] text-[#7A6A55]">
                    {temple.location}
                  </span>
                </div>

                {/* Button */}
                {temple.is_coming_soon ? (
                  <button
                    disabled
                    className="font-cormorant absolute top-[315px] left-1/2 flex h-[26px] w-[125px] -translate-x-1/2 cursor-not-allowed items-center justify-center rounded-full border border-[#D7B36A] bg-gray-400 text-[18px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                  >
                    <span className="absolute -left-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                    <span className="pointer-events-none absolute inset-[2px] rounded-full border border-[#E8D4A3]" />
                    Coming Soon
                    <span className="absolute -right-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                  </button>
                ) : (
                  <Link
                    href={`/temples/${temple.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]/g, "")}`}
                    className="font-cormorant absolute top-[315px] left-1/2 flex h-[26px] w-[125px] -translate-x-1/2 items-center justify-center rounded-full border border-[#D7B36A] bg-[#2B8182] text-[18px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-all hover:bg-[#236f70]"
                  >
                    <span className="absolute -left-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                    <span className="pointer-events-none absolute inset-[2px] rounded-full border border-[#E8D4A3]" />
                    Visit Temple
                    <span className="absolute -right-[2px] h-[4px] w-[4px] rounded-full bg-[#D7B36A]" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
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
