"use client";

import Image from "next/image";
import {
  Search,
  ShieldCheck,
  PackageCheck,
  Truck,
  HeartHandshake,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

const trustItems = [
  { icon: ShieldCheck, top: "100% Temple", bottom: "Blessed" },
  { icon: PackageCheck, top: "Secure", bottom: "Packaging" },
  { icon: Truck, top: "Pan India", bottom: "Delivery" },
  { icon: HeartHandshake, top: "Loved by", bottom: "Devotees" },
];

export default function ShopHero() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const CATEGORY_MAP: Record<string, string> = {
    frame: "frames",
    frames: "frames",

    prasad: "prasad",

    cloth: "poshak",
    clothes: "poshak",
    poshak: "poshak",
    dress: "poshak",
    dresses: "poshak",

    "puja essentials": "puja-essentials",
    puja: "puja-essentials",

    books: "books-scriptures",
    scriptures: "books-scriptures",

    incense: "incense-dhoop",
    dhoop: "incense-dhoop",

    idols: "idols-murtis",
    murtis: "idols-murtis",

    gifts: "gift-hampers",
    hampers: "gift-hampers",
  };

  const handleSearch = () => {
    const value = search.trim().toLowerCase();

    if (!value) return;

    // If user searched a category
    if (CATEGORY_MAP[value]) {
      router.push(`/shop/${CATEGORY_MAP[value]}`);
      return;
    }

    // Otherwise perform global search
    router.push(`/shop/search?q=${encodeURIComponent(search.trim())}`);
  };
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-[#EED6A8]">
      <Image
        src="/images/hero-krishna.png"
        alt="Krishna devotional shop collection"
        fill
        priority
        // sizes="100vw"
        className="object-cover opacity-90"
        style={{
          objectPosition: "75% center",
        }}
      />

      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#FFF4DD]/[0.97] via-[#FFF0D1]/[0.72] to-transparent" />

      <Image
        src="/images/shop/peacock-feather.png"
        alt=""
        width={120}
        height={180}
        className="pointer-events-none absolute bottom-4 left-[41%] hidden opacity-80 md:block"
      /> */}

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-[1240px] items-center px-7 py-12 md:px-12">
        <div className="max-w-[500px] md:translate-x-[200px]">
          <h1 className="font-cormorant text-[45px] leading-[1.12] font-bold text-[#0B6670] md:text-[52px]">
            Shop Devotion,
            <br />
            Bring Home Blessings
          </h1>
          <div
            className="mt-2 flex items-center gap-3"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <div className="h-px w-16 bg-[#D7B06B]" />

            <Image
              src="/images/lotus.png"
              alt=""
              width={50}
              height={50}
              className="object-contain"
            />

            <div className="h-px w-16 bg-[#D7B06B]" />
          </div>

          <p className="font-cormorant mt-5 max-w-[385px] font-serif text-[18px] leading-relaxed text-[#3D352F]">
            Explore authentic puja items, sacred gifts and more — blessed by
            temples of India.
          </p>

          <div
            className="mt-5 flex h-[42px] max-w-[460px] items-center rounded-md border border-[#C98C3D] px-3 shadow-[0_4px_10px_rgba(95,57,20,0.08)]"
            style={{ marginTop: "20px" }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search for products, categories..."
              className="font-cormorant h-full min-w-0 flex-1 bg-transparent font-serif text-[15px] text-[#5E513E] outline-none placeholder:text-[#9C8D78]"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={!search.trim()}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Search
                className="h-4 w-4 text-[#C77824]"
                style={{ marginRight: "10px" }}
              />
            </button>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-x-5 gap-y-4"
            style={{ marginTop: "30px" }}
          >
            {trustItems.map(({ icon: Icon, top, bottom }) => (
              <div key={top} className="flex items-center gap-2">
                <Icon className="h-8 w-8 text-[#BD7526]" strokeWidth={1.6} />
                <p className="font-cormorant text-[15px] leading-[1.15] text-[#3D352F]">
                  {top}
                  <br />
                  {bottom}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
