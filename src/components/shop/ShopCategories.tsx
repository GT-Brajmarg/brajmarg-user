"use client";

import Image from "next/image";
import { CategoryImage } from "./CategoryImage";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export default function ShopCategories() {
  const frames = useAppSelector((state) => state.frames.items);
  const prasad = useAppSelector((state) => state.prasad.items);
  const cloths = useAppSelector((state) => state.cloths.items);
  const categories = [
    {
      title: "Frames",
      subtitle: "Divine Frames & Wall Decor",
      image: "/images/category-frames.png",
      link: "/shop/frames",
      count: frames?.length || 0,
    },
    {
      title: "Prasad",
      subtitle: "Temple Prasad & Offerings",
      image:
        prasad?.[0]?.image ||
        prasad?.[0]?.thumbnail ||
        "/images/category-prasad.png",
      link: "/shop/prasad",
      count: prasad?.length || 0,
    },
    {
      title: "Poshak",
      subtitle: "Beautiful Dresses for Thakurji",
      image: "/images/category-poshak.png",
      link: "/shop/poshak",
      count: cloths?.length || 0,
    },
    {
      title: "Puja Essentials",
      subtitle: "Puja Items & Accessories",
      image: "/images/category-puja.png",
      link: "/shop/puja-essentials",
    },
    {
      title: "Books & Scriptures",
      subtitle: "Spiritual Books & Scriptures",
      image: "/images/category-books.png",
      link: "/shop/books-scriptures",
    },
    {
      title: "Incense & Dhoop",
      subtitle: "Aromatic Incense & Dhoop",
      image: "/images/category-incense.png",
      link: "/shop/incense-dhoop",
    },
    {
      title: "Idols & Murtis",
      subtitle: "Murtis, Brass & Wooden Idols",
      image: "/images/category-idols.png",
      link: "/shop/idols-murtis",
    },
    {
      title: "Gift Hampers",
      subtitle: "Curated Devotional Gift Hampers",
      image: "/images/category-hampers.png",
      link: "/shop/gift-hampers",
    },
  ];

  return (
    <section className="max-hpb-12 relative min-h-[450px] w-full px-4">
      <SectionTitle title="Shop by Category" />

      <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-18">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.link}
            className="group flex flex-col items-center rounded-[14px] border border-[#C37000] bg-[#C37000]/10 p-3 text-center shadow-[0_3px_9px_rgba(139,95,35,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_18px_rgba(139,95,35,0.16)]"
          >
            <div
              className="relative h-[100px] w-[100px] overflow-hidden rounded-xl"
              style={{ marginTop: "15px", marginBottom: "15px" }}
            >
              <CategoryImage src={category.image} alt={category.title} />
            </div>

            <h3 className="font-cormorant mt-2 text-[20px] font-semibold text-[#0C6972]">
              {category.title}
            </h3>

            <p
              className="font-cormorant mx-auto mt-1 max-w-[135px] text-[12px] leading-[1.2] text-[#6C563B]"
              style={{ marginBottom: "10px" }}
            >
              {category.subtitle}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <div
      className="flex items-center justify-center gap-3"
      style={{ marginTop: "40px", marginBottom: "30px" }}
    >
      <Image src="/images/lotus.png" alt="" width={54} height={36} />

      <h2 className="font-cormorant text-[18px] leading-tight font-semibold text-[#0C6D72] sm:text-[22px] md:text-[30px]">
        Shop by Category
      </h2>

      <Image src="/images/lotus.png" alt="" width={54} height={36} />
    </div>
  );
}
