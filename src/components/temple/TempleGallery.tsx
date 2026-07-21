"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTempleGallery } from "@/store/slices/templeGallerySlice";

interface TempleGalleryProps {
  templeId: string;
}

export default function TempleGallery({ templeId }: TempleGalleryProps) {
  const dispatch = useAppDispatch();

  const { gallery, loading } = useAppSelector((state) => state.templeGallery);

  // const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log("Temple ID:", templeId);
    if (templeId) {
      dispatch(getTempleGallery(templeId));
    }
  }, [dispatch, templeId]);

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

  // console.log({
  //   loading,
  //   gallery,
  // });

  if (loading) {
    return <div>Loading gallery...</div>;
  }

  if (!gallery.length) {
    return <div>No gallery images</div>;
  }

  return (
    <section className="relative overflow-hidden rounded-[22px] border-[2px] border-[#C37000] bg-transparent p-4 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" />

      <div className="relative">
        {/* Header */}
        <div
          className="mb-4 flex items-center justify-center gap-3"
          style={{ marginTop: "15px" }}
        >
          <Image src="/images/lotus.png" alt="" width={48} height={28} />

          <h2 className="font-cormorant text-[28px] font-semibold text-[#0B6670]">
            Gallery
          </h2>

          <Image src="/images/lotus.png" alt="" width={48} height={28} />
        </div>

        {/* Gallery */}
        <div
          className="relative"
          style={{
            marginBottom: "20px",
            marginTop: "15px",
            marginLeft: "10px",
            marginRight: "20px",
          }}
        >
          <div
            className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth"
            style={{ marginLeft: "50px", marginRight: "40px" }}
          >
            {visibleGallery.map((image) => (
              <div
                key={image.id}
                className="group relative h-[202px] w-[202px] flex-shrink-0 overflow-hidden rounded-[10px] border border-[#D9B06C]"
              >
                <Image
                  src={image.image_url}
                  alt={image.alt_text || image.title || "Temple Gallery"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {gallery.length > 5 && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute top-1/2 left-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-sm transition hover:scale-105"
                style={{ marginLeft: "6px" }}
              >
                <ChevronLeft size={18} className="text-[#0F5C66]" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= gallery.length - visibleCount}
                className="absolute top-1/2 right-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-sm transition hover:scale-105"
                style={{ marginRight: "6px" }}
              >
                <ChevronRight size={18} className="text-[#0F5C66]" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
