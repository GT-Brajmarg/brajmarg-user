"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import YatraHero from "@/components/dashboard/yatra/YatraHero";
import YatraFilters from "@/components/dashboard/yatra/YatraFilters";
import YatraTabs from "@/components/dashboard/yatra/YatraTabs";
import YatraList from "@/components/dashboard/yatra/YatraList";

import Image from "next/image";
import { useState } from "react";

export default function MyYatrasPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest first");
  const [activeTab, setActiveTab] = useState("All Yatras");

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F9F2E8]">
      {/* Background Images */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Paper Texture */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.34]"
        />

        {/* Top Mandala */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[60px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />

        {/* Middle Mandala */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[850px] left-1/2 w-[850px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
        />

        {/* Bottom Mandala */}
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
          {/* Sidebar */}
          <div className="w-[270px] shrink-0 border-r border-[#C37000]/30">
            <DashboardSidebar />
          </div>

          {/* Content */}
          <div
            className="mt-[30px] flex-1 space-y-8"
            style={{ marginTop: "30px" }}
          >
            <YatraHero />

            <YatraFilters
              search={search}
              sort={sort}
              onSearch={setSearch}
              onSort={setSort}
            />

            <YatraTabs active={activeTab} onChange={setActiveTab} />

            <YatraList search={search} sort={sort} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </main>
  );
}
