"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedPlan } from "@/store/slices/subscriptionSlice";

import TempleSelectionHero from "@/components/subscribe-alerts/TempleSelectionHero";
import TempleSearch from "@/components/temples/TempleSearch";
import TempleGrid from "@/components/subscribe-alerts/TempleGrid";

export default function SubscribeTemplePage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const selectedPlan = searchParams.get("plan");
  useEffect(() => {
    if (selectedPlan) {
      dispatch(setSelectedPlan(selectedPlan));
    }
  }, [selectedPlan, dispatch]);
  return (
    <main className="relative overflow-hidden bg-[#F8F2E8]">
      {/* ================= Background ================= */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[420px] left-1/2 w-[1050px] -translate-x-1/2 opacity-[0.04]"
        />

        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[1600px] left-1/2 w-[900px] -translate-x-1/2 opacity-[0.03]"
        />
      </div>

      {/* ================= Content ================= */}
      <div className="relative z-10 w-full">
        <TempleSelectionHero />
      </div>

      <div className="relative z-10 mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-4 py-10">
          {/* Hero */}
          <div style={{ marginTop: "20px", marginBottom: "40px" }}>
            <TempleSearch onSearch={setSearch} />
          </div>
          <TempleGrid search={search} />
          {/* Search */}
        </div>
      </div>

      {/* Bottom Skyline */}
    </main>
  );
}
