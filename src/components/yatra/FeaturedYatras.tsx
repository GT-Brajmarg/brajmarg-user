"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import YatraCard from "./YatraCard";

const demoYatras = [
  {
    id: 1,
    slug: "braj-yatra",
    title: "Braj Yatra",
    location: "Mathura to Vrindavan",
    temples: 5,
    days: 3,
    nights: 2,
    price: 2499,
    image: "/images2/default.png",
  },
  {
    id: 2,
    slug: "braj-yatra-2",
    title: "Braj Yatra",
    location: "Mathura to Vrindavan",
    temples: 5,
    days: 3,
    nights: 2,
    price: 2499,
    image: "/images2/default.png",
  },
  {
    id: 3,
    slug: "braj-yatra-3",
    title: "Braj Yatra",
    location: "Mathura to Vrindavan",
    temples: 5,
    days: 3,
    nights: 2,
    price: 2499,
    image: "/images2/default.png",
  },
  {
    id: 4,
    slug: "braj-yatra-4",
    title: "Braj Yatra",
    location: "Mathura to Vrindavan",
    temples: 5,
    days: 3,
    nights: 2,
    price: 2499,
    image: "/images2/default.png",
  },
  {
    id: 5,
    slug: "char-dham-yatra",
    title: "Char Dham Yatra",
    location: "Haridwar",
    temples: 8,
    days: 8,
    nights: 7,
    price: 14999,
    image: "/images2/default.png",
  },
  {
    id: 6,
    slug: "ayodhya-darshan",
    title: "Ayodhya Darshan",
    location: "Ayodhya",
    temples: 6,
    days: 4,
    nights: 3,
    price: 6999,
    image: "/images2/default.png",
  },
  {
    id: 7,
    slug: "dwarka-yatra",
    title: "Dwarka Yatra",
    location: "Dwarka",
    temples: 5,
    days: 4,
    nights: 3,
    price: 8999,
    image: "/images2/default.png",
  },
  {
    id: 8,
    slug: "jagannath-yatra",
    title: "Jagannath Yatra",
    location: "Puri",
    temples: 6,
    days: 5,
    nights: 4,
    price: 9999,
    image: "/images2/default.png",
  },
];

export default function FeaturedYatras() {
  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(demoYatras.length / ITEMS_PER_PAGE);

  const currentYatras = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return demoYatras.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  return (
    <section className="py-12" style={{ marginTop: "40px" }}>
      {/* Heading */}

      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Image src="/images/lotus.png" alt="" width={46} height={46} />

          <h2 className="font-cormorant text-[38px] font-semibold text-[#0B6670]">
            Explore Yatras
          </h2>

          <Image src="/images/lotus.png" alt="" width={46} height={46} />
        </div>

        <p
          className="font-cormorant mt-1 text-[22px] text-[#5B4633]"
          style={{ marginBottom: "10px" }}
        >
          Sacred journeys thoughtfully planned by BrajMarg
        </p>

        <div className="mt-4 rounded-lg border-2 border-[#C37000] bg-[#C37000]/20 px-5 py-2 text-[#3D352F]">
          <div
            className="flex items-center gap-2"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            <Image src="/images/group.svg" alt="" width={28} height={28} />

            <span className="font-cormorant text-[24px] font-bold">
              All yatras are organized group journeys by BrajMarg
            </span>
          </div>
        </div>
      </div>

      {/* Cards */}

      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        style={{ marginTop: "40px" }}
      >
        {currentYatras.map((yatra) => (
          <YatraCard key={yatra.id} yatra={yatra} />
        ))}
      </div>

      {/* Pagination */}

      <div
        className="mt-10 flex items-center justify-center gap-2"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`flex h-9 w-9 items-center justify-center rounded border ${
            currentPage === 1
              ? "cursor-not-allowed border-gray-300 text-gray-300"
              : "border-[#D59A3B] text-[#0B6670]"
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-9 w-9 rounded border font-medium transition ${
                currentPage === page
                  ? "border-[#0B6670] bg-[#0B6670] text-white"
                  : "border-[#D59A3B] bg-white text-[#0B6670]"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className={`flex h-9 w-9 items-center justify-center rounded border ${
            currentPage === totalPages
              ? "cursor-not-allowed border-gray-300 text-gray-300"
              : "border-[#D59A3B] text-[#0B6670]"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
