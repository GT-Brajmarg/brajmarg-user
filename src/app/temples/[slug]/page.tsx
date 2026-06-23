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

export default function TempleDetailsPage() {
  const { slug } = useParams();

  const dispatch = useAppDispatch();

  const { temple, loading, error } = useAppSelector(
    (state) => state.templeDetails,
  );
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
      <TempleHero temple={temple} />

      <div className="mx-auto mt-3 flex justify-center">
        <div className="w-full max-w-[1200px]">
          <DarshanTimings templeId={temple.id} />
          <div style={{ marginTop: "60px" }}>
            <TempleSevas templeId={temple.id} />
          </div>
          <div style={{ marginTop: "60px" }}>
            <TemplePrasad templeId={temple.id} />
          </div>
          <div style={{ marginTop: "60px" }}>
            <TempleOfferings templeId={temple.id} />
          </div>
          <div style={{ marginTop: "60px" }}>
            <TempleGallery />
          </div>
          <div style={{ marginTop: "60px", marginBottom: "60px" }}>
            <TempleLocation />
          </div>
        </div>
      </div>
    </main>
  );
}
