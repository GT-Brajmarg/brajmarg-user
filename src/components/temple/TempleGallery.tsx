"use client";

import { useEffect, useRef } from "react";
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

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log("Temple ID:", templeId);
    if (templeId) {
      dispatch(getTempleGallery(templeId));
    }
  }, [dispatch, templeId]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
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
    <section className="relative overflow-hidden rounded-[22px] border border-[#D89A3D] bg-[#FBF6EE] p-4">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D89A3D 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

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
          style={{ marginBottom: "20px", marginTop: "15px" }}
        >
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth"
          >
            {gallery.map((image) => (
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

          {gallery.length > 3 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute top-1/2 left-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-sm transition hover:scale-105"
              >
                <ChevronLeft size={18} className="text-[#A06A15]" />
              </button>

              <button
                onClick={scrollRight}
                className="absolute top-1/2 right-[-12px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D89A3D] bg-[#F8E6C5] shadow-sm transition hover:scale-105"
              >
                <ChevronRight size={18} className="text-[#A06A15]" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
