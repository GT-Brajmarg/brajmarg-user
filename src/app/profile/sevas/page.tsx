"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
// import SevaHero from "@/components/seva/SevaHero";
import SevaHero from "@/components/dashboard/seva/SevaHero";
import SevaFilters from "@/components/dashboard/seva/SevaFilters";
import SevaTabs from "@/components/dashboard/seva/SevaTabs";
import SevaList from "@/components/dashboard/seva/SevaList";

import Image from "next/image";
import { useState } from "react";

export default function MySevasPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest first");
  const [activeTab, setActiveTab] = useState("All Sevas");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F9F2E8]">
      {/* Same Background Images */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Full payment page paper texture */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.34]"
        />

        {/* Mandala behind payment heading / stepper */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[60px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />

        {/* Mandala behind payment methods */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[850px] left-1/2 w-[850px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
        />

        {/* Mandala behind order summary / bottom payment content */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[1700px] left-1/2 w-[700px] max-w-none -translate-x-1/2 opacity-[0.035] md:w-[900px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex justify-center">
        <div className="flex w-full max-w-[1200px] gap-8 px-4 py-10">
          <div className="w-[270px] shrink-0 border-r border-[#C37000]/30">
            <DashboardSidebar />
          </div>

          <div className="mt-8 flex-1 space-y-8" style={{ marginTop: "30px" }}>
            <SevaHero />

            <SevaFilters
              search={search}
              sort={sort}
              onSearch={setSearch}
              onSort={setSort}
            />

            <SevaTabs active={activeTab} onChange={setActiveTab} />

            <SevaList search={search} sort={sort} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </main>
  );
}
