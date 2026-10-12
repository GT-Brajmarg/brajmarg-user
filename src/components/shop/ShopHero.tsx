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
  {
    image: "/images/temple-blessed.svg",
    top: "100% Temple",
    bottom: "Blessed",
  },
  {
    image: "/images/secure-packaging.svg",
    top: "Secure",
    bottom: "Packaging",
  },
  {
    image: "/images/pan-india-delivery.svg",
    top: "Pan India",
    bottom: "Delivery",
  },
  {
    image: "/images/loved-by-devotees.svg",
    top: "Loved by",
    bottom: "Devotees",
  },
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
    <section className="relative overflow-hidden bg-[#EED6A8]">
      {/* Tablet & Desktop Background Image (md and up) */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/images/hero-krishna.png"
          alt="Krishna devotional shop collection"
          fill
          priority
          className="object-cover opacity-90"
          style={{
            objectPosition: "75% center",
          }}
        />
      </div>

      {/* Mobile-only Image on Top */}
      <div className="relative w-full h-[240px] sm:h-[300px] md:hidden overflow-hidden">
        <Image
          src="/images/hero-krishna.png"
          alt="Krishna devotional shop collection"
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: "70% center",
          }}
        />
      </div>

      {/* Content Container (Below image on mobile, overlay on tablet & desktop) */}
      <div className="relative z-10 mx-auto flex min-h-0 md:min-h-[500px] max-w-[1240px] items-center px-6 sm:px-10 md:px-12 py-8 sm:py-10 md:py-16">
        <div className="w-full max-w-[420px] md:max-w-[290px] lg:max-w-[540px]">
          <h1 className="font-cormorant text-[45px] leading-[1.12] font-bold text-[#0B6670] md:text-[36px] lg:text-[52px]">
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

          <p className="font-cormorant mt-5 max-w-[385px] text-[18px] md:text-[15px] lg:text-[18px] leading-relaxed text-[#3D352F]">
            Explore authentic puja items, sacred gifts and more — blessed by
            temples of India.
          </p>

          <div
            className="mt-5 flex h-[42px] max-w-[460px] md:max-w-[290px] lg:max-w-[460px] items-center rounded-md border border-[#C98C3D] px-3 shadow-[0_4px_10px_rgba(95,57,20,0.08)]"
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
              style={{ marginLeft: "10px" }}
              placeholder="Search for products, categories or temples..."
              className="font-cormorant h-full min-w-0 flex-1 bg-transparent font-serif text-[15px] text-[#5E513E] outline-none placeholder:text-[#9C8D78]"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="cursor-pointer"
            >
              <Search
                className="h-4 w-4 text-[#C77824]"
                style={{ marginRight: "10px" }}
              />
            </button>
          </div>

          <div
            className="mt-8 flex flex-wrap md:grid md:grid-cols-2 lg:flex lg:flex-nowrap items-center gap-x-3 md:gap-x-3 lg:gap-x-6 gap-y-3"
            style={{ marginTop: "30px" }}
          >
            {trustItems.map(({ image, top, bottom }) => (
              <div key={top} className="flex items-center gap-2 md:gap-1.5 lg:gap-2 flex-shrink-0">
                <Image
                  src={image}
                  alt={top}
                  width={32}
                  height={32}
                  className="h-8 w-8 md:h-7 md:w-7 lg:h-8 lg:w-8 object-contain flex-shrink-0"
                />

                <p className="font-cormorant text-[15px] md:text-[13px] lg:text-[15px] leading-[1.15] text-[#3D352F] whitespace-nowrap">
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
