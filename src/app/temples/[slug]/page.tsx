"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import TempleHero from "@/components/temple/TempleHero";
import { fetchLiveDarshan } from "@/store/slices/heroSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTempleDetails } from "@/store/slices/templeDetailsSlice";
import DarshanTimings from "@/components/temple/DarshanTimings";
import TempleSevas from "@/components/temple/TempleSevas";
import TemplePrasad from "@/components/temple/TemplePrasad";
import TempleOfferings from "@/components/temple/TempleOfferings";
import TempleGallery from "@/components/temple/TempleGallery";
import TempleLocation from "@/components/temple/TempleLocation";
import RelatedTemples from "@/components/temple/RelatedTemples";

export default function TempleDetailsPage() {
  const { slug } = useParams();

  const dispatch = useAppDispatch();

  const { temple, loading } = useAppSelector((state) => state.templeDetails);
  //   useEffect(() => {
  //     if (temple) {
  //       console.log("Temple Details:", temple);
  //     }
  //   }, [temple]);

  //   console.log("Temple:", temple);
  //   console.log("Loading:", loading);
  //   console.log("Error:", error);

  useEffect(() => {
    if (slug) {
      dispatch(getTempleDetails(slug as string));
    }
  }, [dispatch, slug]);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  useEffect(() => {
    dispatch(fetchLiveDarshan());
  }, [dispatch]);

  if (loading) {
    return <div>Loading temple...</div>;
  }

  if (!temple) {
    return <div>Temple not found</div>;
  }

  return (
    <main className="bg-[#F8F2E8]">
      {/* <TempleHero temple={temple} /> */}

      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px]">
          <div style={{ marginBottom: isMobile ? "40px" : "10px" }}>
            <TempleHero temple={temple} />
          </div>

          {/* <DarshanTimings templeId={temple.id} /> */}
          <div>
            <DarshanTimings templeId={temple.id} />
          </div>
          <div style={{ marginTop: isMobile ? "90px" : "40px" }}>
            <TempleSevas templeId={temple.id} templeSlug={slug as string} />
          </div>

          <div style={{ marginTop: isMobile ? "90px" : "40px" }}>
            <TemplePrasad templeId={temple.id} templeSlug={slug as string} />
          </div>

          <div style={{ marginTop: isMobile ? "90px" : "40px" }}>
            <TempleOfferings templeId={temple.id} templeSlug={slug as string} />
          </div>

          <div style={{ marginTop: isMobile ? "90px" : "40px" }}>
            <TempleGallery templeId={temple.id} />
          </div>

          <div
            style={{
              marginTop: isMobile ? "90px" : "60px",
              marginBottom: isMobile ? "90px" : "60px",
            }}
          >
            <TempleLocation templeId={temple.id} />
          </div>
          <div
            style={{
              marginTop: isMobile ? "90px" : "60px",
              marginBottom: isMobile ? "90px" : "60px",
            }}
          >
            <RelatedTemples currentTempleId={temple.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
