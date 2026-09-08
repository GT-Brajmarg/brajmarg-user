"use client";

import TempleCard from "./TempleCard";
import SelectedTempleBar from "./SelectedTempleBar";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTemples } from "@/store/slices/templesSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { setSelectedTemples } from "@/store/slices/subscriptionSlice";

export interface Temple {
  id: string;
  name: string;
  location: string;
  image: string;
  tags: string[];
}

// const TEMPLES: Temple[] = [
//   {
//     id: "1",
//     name: "Shreenathji Temple",
//     location: "Nathdwara, Rajasthan",
//     image: "/images/temples/shreenathji.jpg",
//     tags: ["Krishna", "Vaishnav"],
//   },
//   {
//     id: "2",
//     name: "Banke Bihari Temple",
//     location: "Vrindavan, Uttar Pradesh",
//     image: "/images/temples/banke-bihari.jpg",
//     tags: ["Krishna", "Braj"],
//   },
//   {
//     id: "3",
//     name: "Prem Mandir",
//     location: "Vrindavan, Uttar Pradesh",
//     image: "/images/temples/prem-mandir.jpg",
//     tags: ["Radha", "Krishna"],
//   },
//   {
//     id: "4",
//     name: "Dwarkadhish Temple",
//     location: "Mathura, Uttar Pradesh",
//     image: "/images/temples/dwarkadhish.jpg",
//     tags: ["Krishna"],
//   },
//   {
//     id: "5",
//     name: "ISKCON Temple",
//     location: "Vrindavan",
//     image: "/images/temples/iskcon.jpg",
//     tags: ["ISKCON"],
//   },
//   {
//     id: "6",
//     name: "Govind Dev Ji",
//     location: "Jaipur, Rajasthan",
//     image: "/images/temples/govind-dev.jpg",
//     tags: ["Krishna"],
//   },
//   {
//     id: "7",
//     name: "Ranganath Temple",
//     location: "Vrindavan",
//     image: "/images/temples/ranganath.jpg",
//     tags: ["South India"],
//   },
//   {
//     id: "8",
//     name: "Radha Raman Temple",
//     location: "Vrindavan",
//     image: "/images/temples/radha-raman.jpg",
//     tags: ["Gaudiya"],
//   },
//   {
//     id: "9",
//     name: "Madan Mohan Temple",
//     location: "Vrindavan",
//     image: "/images/temples/madan-mohan.jpg",
//     tags: ["Historic"],
//   },
// ];

interface TempleGridProps {
  search?: string;
}

export default function TempleGrid({ search = "" }: TempleGridProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan") || "monthly";
  const ITEMS_PER_PAGE = 9;

  const [currentPage, setCurrentPage] = useState(1);

  const { temples, loading, error } = useAppSelector((state) => state.temples);

  const [selectedTemples, setLocalSelectedTemples] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTemples());
  }, [dispatch]);

  const filteredTemples = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return temples;

    return temples.filter(
      (temple) =>
        temple.name.toLowerCase().includes(query) ||
        temple.location.toLowerCase().includes(query),
    );
  }, [search, temples]);

  const totalPages = Math.ceil(filteredTemples.length / ITEMS_PER_PAGE);

  const paginatedTemples = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredTemples.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTemples, currentPage]);

  const selectedTempleObjects = useMemo(() => {
    return temples.filter((temple) => selectedTemples.includes(temple.id));
  }, [selectedTemples, temples]);

  const handleSelectTemple = (id: string) => {
    setLocalSelectedTemples((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <section>
      {/* Section Header */}

      <div className="mb-8 flex items-center justify-between">
        <div></div>

        <div className="rounded-full bg-[#0B6670] px-5 py-2 text-white"></div>
      </div>

      {/* Temple Grid */}

      <div
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        style={{ marginBottom: "50px" }}
      >
        {paginatedTemples.map((temple) => (
          <TempleCard
            key={temple.id}
            id={temple.id}
            name={temple.name}
            location={temple.location}
            image={temple.image_url || ""}
            tags={[]}
            selected={selectedTemples.includes(temple.id)}
            onSelect={handleSelectTemple}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTemples.length === 0 && (
        <div className="flex h-[300px] flex-col items-center justify-center rounded-[20px]">
          <h3 className="font-cormorant text-[28px] font-semibold text-[#0B6670]">
            No Temples Found
          </h3>

          <p className="mt-2 text-[#6B5E4F]">
            Try searching with another temple or location.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 mb-5 flex items-center justify-center gap-3">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex h-10 w-10 items-center justify-center rounded-[8px] border transition ${
              currentPage === 1
                ? "cursor-not-allowed border-[#E5D3B3] text-[#C8BBA5]"
                : "border-[#D8B06B] text-[#0F5C66] hover:bg-[#FFF2DD]"
            }`}
          >
            ←
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-[8px] border transition ${
                  currentPage === page
                    ? "border-[#0B6670] bg-[#0B6670] text-[#EFDEC7]"
                    : "border-[#D8B06B] text-[#0F5C66] hover:bg-[#FFF2DD]"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`flex h-10 w-10 items-center justify-center rounded-[8px] border transition ${
              currentPage === totalPages
                ? "cursor-not-allowed border-[#E5D3B3] text-[#C8BBA5]"
                : "border-[#D8B06B] text-[#0F5C66] hover:bg-[#FFF2DD]"
            }`}
          >
            →
          </button>
        </div>
      )}

      {/* Sticky Footer */}

      {selectedTempleObjects.length > 0 && (
        <div className="mt-10">
          <SelectedTempleBar
            temples={selectedTempleObjects}
            onRemove={handleSelectTemple}
            onContinue={() => {
              const temples = selectedTempleObjects.map(
                (temple) => temple.name,
              );

              // console.log("Selected Temple Objects:", selectedTempleObjects);
              // console.log("Dispatching:", temples);

              dispatch(setSelectedTemples(temples));

              router.push(`/subscribe-alerts/preferences?plan=${plan}`);
            }}
          />
        </div>
      )}
    </section>
  );
}
