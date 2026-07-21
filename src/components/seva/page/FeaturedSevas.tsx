"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SevaCard from "./SevaCard";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { fetchFeaturedSevas } from "@/store/slices/sevaPageSlice";

export default function FeaturedSevas() {
  const dispatch = useAppDispatch();

  const { featuredSevas, selectedDate, selectedSevaType, loading } =
    useAppSelector((state) => state.sevaPage);

  useEffect(() => {
    dispatch(
      fetchFeaturedSevas({
        date: selectedDate ?? undefined,
        sevaType: selectedSevaType ?? undefined,
      }),
    );
  }, [dispatch, selectedDate, selectedSevaType]);

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, selectedSevaType]);

  const totalPages = Math.ceil(featuredSevas.length / ITEMS_PER_PAGE);

  const paginatedSevas = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return featuredSevas.slice(start, start + ITEMS_PER_PAGE);
  }, [featuredSevas, currentPage]);
  return (
    <section className="py-10" style={{ marginTop: "30px" }}>
      {/* Heading */}

      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Image src="/images/lotus.png" alt="" width={54} height={36} />

          <h2 className="font-cormorant text-[36px] font-semibold text-[#0B6670]">
            {selectedDate || selectedSevaType
              ? "Available Sevas"
              : "Featured Sevas"}
          </h2>

          <Image src="/images/lotus.png" alt="" width={54} height={36} />
        </div>

        <p className="font-cormorant text-[24px] text-[#3D352F]">
          {selectedDate || selectedSevaType
            ? "Showing sevas matching your selection"
            : "Handpicked Devotional Sevas for You"}
        </p>
      </div>

      {/* Cards */}

      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        style={{ marginTop: "20px" }}
      >
        {loading ? (
          <div className="col-span-4">
            <section className="flex min-h-[350px] items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D8C7A6] border-t-[#0F5C66]" />

                <h3 className="font-cormorant mt-6 text-3xl font-semibold text-[#0F5C66]">
                  Loading Sevas
                </h3>

                <p className="mt-2 text-center text-sm text-[#6B7280]">
                  Please wait while we prepare the available sevas for your
                  spiritual journey...
                </p>
              </div>
            </section>
          </div>
        ) : featuredSevas.length === 0 ? (
          <div className="font-cormorant col-span-4 py-16 text-center text-[28px] text-[#5C4A39]">
            No Sevas Available
          </div>
        ) : (
          paginatedSevas.map((item) => (
            <SevaCard
              key={item.id}
              seva={{
                id: item.id,

                slug: item.temples.name
                  .toLowerCase()
                  .replace(/[^a-z0-9\s]/g, "")
                  .replace(/\s+/g, "-"),

                name: item.name,
                temple: item.temples.name,
                price: item.price,
                image: item.image_url || "/images2/default.png",
                slots: 0,
              }}
            />
          ))
        )}
      </div>

      {/* Pagination */}

      <div
        className="mt-10 flex items-center justify-center gap-2"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`flex h-10 w-10 items-center justify-center rounded border ${
            currentPage === 1
              ? "cursor-not-allowed border-gray-300 text-gray-300"
              : "border-[#D18418] text-[#0B6670]"
          } `}
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-10 w-10 items-center justify-center rounded ${
                currentPage === page
                  ? "bg-[#0B6670] text-white"
                  : "border border-[#D18418] text-[#0B6670]"
              } `}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`flex h-10 w-10 items-center justify-center rounded border ${
            currentPage === totalPages
              ? "cursor-not-allowed border-gray-300 text-gray-300"
              : "border-[#D18418] text-[#0B6670]"
          } `}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
