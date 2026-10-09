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
        <section className="relative h-[550px] overflow-visible md:h-[340px]">
          <TempleHero />

          <div className="absolute bottom-[-50px] left-1/2 z-20 w-full max-w-[1260px] -translate-x-1/2 px-5 md:bottom-[-145px]">
            <TempleSearch onSearch={setSearchTerm} />
          </div>
        </section>

        <section
          className="mt-[220px] md:mt-[500px]"
          style={{ marginTop: "180px" }}
        >
          <TempleGrid searchTerm={searchTerm} />
        </section>
        <section
          className="mb-[50px] flex justify-center pt-8"
          style={{ marginBottom: "50px" }}
        >
          <TempleCTA />
        </section>
      </div>
    </main>
  );
}
