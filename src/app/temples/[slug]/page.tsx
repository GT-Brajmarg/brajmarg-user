"use client";

import { useEffect, useState } from "react";

import { fetchTempleTimings } from "@/store/slices/templeTimingsSlice";
import { fetchTempleSevas } from "@/store/slices/sevaSlice";
import { fetchTemplePrasad } from "@/store/slices/prasadSlice";
import { fetchTempleFrames } from "@/store/slices/frameSlice";
import { fetchTempleCloths } from "@/store/slices/clothSlice";
import { getTempleGallery } from "@/store/slices/templeGallerySlice";
import { getTempleLocation } from "@/store/slices/templeLocationSlice";
import { fetchTemples } from "@/store/slices/templesSlice";
import { useParams } from "next/navigation";
import Image from "next/image";

import TempleHero from "@/components/temple/TempleHero";
import DarshanTimings from "@/components/temple/DarshanTimings";
import TempleSevas from "@/components/temple/TempleSevas";
import TemplePrasad from "@/components/temple/TemplePrasad";
import TempleOfferings from "@/components/temple/TempleOfferings";
import TempleGallery from "@/components/temple/TempleGallery";
import TempleLocation from "@/components/temple/TempleLocation";
import RelatedTemples from "@/components/temple/RelatedTemples";
import TempleDetailsLoader from "@/components/temple/TempleDetailsLoader";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTempleDetails } from "@/store/slices/templeDetailsSlice";
import { fetchLiveDarshan } from "@/store/slices/heroSlice";

export default function TempleDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [booting, setBooting] = useState(true);

  const dispatch = useAppDispatch();

  const { temple, loading, currentSlug } = useAppSelector(
    (state) => state.templeDetails,
  );

  const hasCurrentTemple = Boolean(temple) && currentSlug === slug;

  const heroLoading = useAppSelector((state) => state.hero.loading);
  const darshan = useAppSelector((state) => state.hero.darshan);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const hasDarshanData = Boolean(darshan.templeName);

  useEffect(() => {
    if (!slug) return;

    let mounted = true;

    async function initialize() {
      try {
        // Temple Details first
        const result = await dispatch(getTempleDetails(slug)).unwrap();

        const templeId = result.temple.id;

        await Promise.all([
          dispatch(fetchLiveDarshan()).unwrap(),
          dispatch(fetchTempleTimings(templeId)).unwrap(),
          dispatch(fetchTempleSevas(templeId)).unwrap(),
          dispatch(fetchTemplePrasad(templeId)).unwrap(),
          dispatch(fetchTempleFrames(templeId)).unwrap(),
          dispatch(fetchTempleCloths(templeId)).unwrap(),
          dispatch(getTempleGallery(templeId)).unwrap(),
          dispatch(getTempleLocation(templeId)).unwrap(),
          dispatch(fetchTemples()).unwrap(),
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) {
          setBooting(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, [dispatch, slug]);

  if (booting) {
    return <TempleDetailsLoader />;
  }

  if (!temple || !hasCurrentTemple) {
    return <div>Temple not found</div>;
  }

  return (
    <main className="relative overflow-hidden bg-[#F8F2E8]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[360px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
          />

          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={900}
            height={900}
            className="absolute top-[1450px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
          />

          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={900}
            height={900}
            className="absolute top-[2550px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.030]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex justify-center">
        <div className="w-full max-w-[1200px]">
          <TempleHero temple={temple} loading={loading} />

          <DarshanTimings />

          <div style={{ marginTop: isMobile ? "90px" : "30px" }}>
            <TempleSevas templeSlug={slug} />
          </div>

          <div style={{ marginTop: isMobile ? "90px" : "40px" }}>
            <TemplePrasad templeSlug={slug} />
          </div>

          <div style={{ marginTop: isMobile ? "90px" : "10px" }}>
            <TempleOfferings templeSlug={slug} />
          </div>

          <div style={{ marginTop: isMobile ? "90px" : "30px" }}>
            <TempleGallery />
          </div>

          <div style={{ marginTop: isMobile ? "90px" : "30px" }}>
            <TempleLocation />
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
