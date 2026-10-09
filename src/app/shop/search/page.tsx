import SearchSection from "@/components/shop/search/SearchSection";
import Image from "next/image";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

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
        <div className="flex justify-center px-5">
          <div className="w-full max-w-[1200px]">
            <SearchSection searchQuery={q ?? ""} />
          </div>
        </div>
      </section>
    </main>
  );
}
