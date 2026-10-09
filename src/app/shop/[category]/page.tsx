import FilterSidebar from "@/components/shop/search/FilterSidebar";
import SearchBar from "@/components/shop/search/SearchBar";
import ShopSearchHeader from "@/components/shop/search/SearchBar";
import SearchSection from "@/components/shop/search/SearchSection";
import Image from "next/image";
// import ProductGrid from "@/components/shop/products/ProductGrid";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

const categoryMap: Record<
  string,
  {
    title: string;
    subtitle: string;
  }
> = {
  frames: {
    title: "Frames",
    subtitle: "Divine Frames & Wall Decor",
  },
  prasad: {
    title: "Prasad",
    subtitle: "Temple Prasad & Offerings",
  },
  poshak: {
    title: "Poshak",
    subtitle: "Beautiful Dresses for Thakurji",
  },
  "puja-essentials": {
    title: "Puja Essentials",
    subtitle: "Puja Items & Accessories",
  },
  "books-scriptures": {
    title: "Books & Scriptures",
    subtitle: "Spiritual Books & Scriptures",
  },
  "incense-dhoop": {
    title: "Incense & Dhoop",
    subtitle: "Aromatic Incense & Dhoop",
  },
  "idols-murtis": {
    title: "Idols & Murtis",
    subtitle: "Murtis, Brass & Wooden Idols",
  },
  "gift-hampers": {
    title: "Gift Hampers",
    subtitle: "Curated Devotional Gift Hampers",
  },
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  return (
    <main className="relative min-h-screen bg-[#F9F3EA]">
      {/* paper texture */}
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
          className="object-cover opacity-[0.22]"
        />

        {/* Mandala behind Shop Categories */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[10px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />

        {/* Mandala behind Featured Collections */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[1500px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
        />

        {/* Bottom Mandala */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute bottom-[-250px] left-1/2 w-[750px] max-w-none -translate-x-1/2 opacity-[0.035] md:w-[900px]"
        />
      </div>

      <section className="relative z-10 py-10">
        <div className="relative z-10 flex w-full justify-center px-5 sm:px-8 lg:px-12">
          <div className="w-full max-w-[1200px]">
            <SearchSection category={category} />
          </div>
        </div>
      </section>
    </main>
  );
}
