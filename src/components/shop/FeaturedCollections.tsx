import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const collections = [
  {
    title: "Best Sellers",
    subtitle: "Most loved by devotees.",
    slug: "best-sellers",
    image: "/images/collection-best-sellers.png",
  },
  {
    title: "Festival Specials",
    subtitle: "For every sacred occasion.",
    slug: "festival-specials",
    image: "/images/collection-festive.png",
  },
  {
    title: "New Arrivals",
    subtitle: "Freshly added this week.",
    slug: "new-arrivals",
    image: "/images/collection-new-arrivals.png",
  },
  {
    title: "Handcrafted",
    subtitle: "Handcrafted by skilled artisans.",
    slug: "handcrafted",
    image: "/images/collection-handcrafted.png",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="mt-2">
      <div
        className="flex items-center justify-center gap-3"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <Image
          src="/images/lotus.png"
          alt=""
          width={20}
          height={24}
          className="h-6 w-6 md:h-8 md:w-8"
        />

        <h2 className="font-cormorant text-[18px] leading-tight font-semibold text-[#0C6D72] sm:text-[22px] md:text-[30px]">
          Featured Collections
        </h2>

        <Image
          src="/images/lotus.png"
          alt=""
          width={44}
          height={44}
          className="h-6 w-6 md:h-8 md:w-8"
        />
      </div>

      <div
        className="mt-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
        style={{ marginBottom: "40px" }}
      >
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/shop/featured/${collection.slug}`}
            className="group overflow-hidden rounded-[11px] border border-[#D7A25B] bg-[#C37000]/20 text-left shadow-[0_4px_12px_rgba(104,65,20,0.1)] transition hover:-translate-y-1"
          >
            <div className="relative h-[132px] overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <span className="absolute top-2 left-2 grid h-7 w-7 place-items-center rounded-full bg-[#FFF4D9] text-[#C78632] shadow-sm">
                ✾
              </span>
            </div>

            <div className="flex items-center justify-between px-3 py-3">
              <div
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <h3 className="font-cormorant text-[20px] leading-none font-semibold text-[#0B6670]">
                  {collection.title}
                </h3>

                {/* <Image
                  src="/images/divider_1.png"
                  alt=""
                  fill={false}
                  width={80}
                  height={6}
                  className="object-contain"
                /> */}

                <p
                  className="font-cormorant text-[12px] leading-none text-[#725B3D]"
                  style={{ marginTop: "10px" }}
                >
                  {collection.subtitle}
                </p>
              </div>

              <span
                className="grid h-7 w-7 place-items-center rounded-full bg-[#08717A] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#B86E22]"
                style={{ marginRight: "10px" }}
              >
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
