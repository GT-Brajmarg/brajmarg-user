"use client";

import { useState } from "react";
import TempleHero from "./TempleHero";
import TempleSearch from "./TempleSearch";
import TempleGrid from "./TempleGrid";
import TempleCTA from "./TempleCTA";
import Image from "next/image";

export default function TemplePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F0E5]">
      <Image
        src="/images/paper-texture.png"
        alt=""
        fill
        priority
        aria-hidden
        className="pointer-events-none object-cover opacity-34 mix-blend-multiply"
      />

      <div className="relative z-10">
        <div className="relative">
          <TempleHero />
          <div className="relative z-20 mx-auto -mt-20 w-full max-w-[1260px] px-5 sm:-mt-24 md:-mt-28">
            <TempleSearch onSearch={setSearchTerm} />
          </div>
        </div>

        <section className="mt-8 md:mt-10">
          <TempleGrid searchTerm={searchTerm} />
        </section>

        <section className="mt-6 mb-16 flex justify-center">
          <TempleCTA />
        </section>
      </div>
    </main>
  );
}
