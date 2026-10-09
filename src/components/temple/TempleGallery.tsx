"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTempleGallery } from "@/store/slices/templeGallerySlice";

// interface TempleGalleryProps {
//   templeId: string;
// }

export default function TempleGallery() {
  const dispatch = useAppDispatch();

  const { gallery, loading } = useAppSelector((state) => state.templeGallery);

  // const scrollRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 5;

  const visibleGallery = gallery.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + visibleCount, Math.max(gallery.length - visibleCount, 0)),
    );
  };

  if (!gallery.length) {
    return <div>No gallery images</div>;
  }

  return (
    <section className="relative w-full overflow-hidden rounded-[24px] border-[2px] border-[#C37000] bg-transparent p-5 sm:p-6 shadow-[0_20px_50px_rgba(126,83,26,0.18),0_6px_14px_rgba(126,83,26,0.1)]">
      <div className="relative">
        {/* Header */}
        <div className="my-3 flex items-center justify-center gap-3 text-center">
          <Image src="/images/lotus.png" alt="" width={38} height={38} />

          <h2 className="font-cormorant text-[28px] font-bold text-[#0B6670]">
            Gallery
          </h2>

          <Image src="/images/lotus.png" alt="" width={38} height={38} />
        </div>

        {/* Gallery Carousel */}
        <div className="relative mt-5 px-1 sm:px-6">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2">
            {visibleGallery.map((image) => (
              <div
                key={image.id}
                className="group relative h-[180px] w-[180px] sm:h-[195px] sm:w-[195px] flex-shrink-0 snap-start overflow-hidden rounded-[14px] border border-[#D9B06C] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <Image
                  src={image.image_url}
                  alt={image.alt_text || image.title || "Temple Gallery"}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {gallery.length > 5 && (
            <>
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-0 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105 md:flex"
                >
                  <ChevronLeft size={20} className="text-[#0F5C66]" />
                </button>
              )}

              {currentIndex < gallery.length - visibleCount && (
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-0 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-md transition hover:scale-105 md:flex"
                >
                  <ChevronRight size={20} className="text-[#0F5C66]" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
