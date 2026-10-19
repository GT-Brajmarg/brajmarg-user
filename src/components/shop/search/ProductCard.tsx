"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
// import { Cormorant_Infant } from "next/font/google";
import Link from "next/link";

// const cormorantInfant = Cormorant_Infant({
//   subsets: ["latin"],
//   weight: ["600", "700"],
// });
interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;

  category: "frames" | "prasad" | "poshak";

  temples?: {
    id: string;
    name: string;
    slug: string;
    location?: string;
    image_url?: string;
  };
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const detailUrl =
    product.category === "frames"
      ? `/temples/${product.temples?.slug}/frames/${product.id}`
      : product.category === "prasad"
        ? `/temples/${product.temples?.slug}/prasad/${product.id}`
        : `/temples/${product.temples?.slug}/cloth/${product.id}`;

  return (
    <div className="group overflow-hidden rounded-[16px] border border-[#E4D1B5] bg-[#F5EAD9] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-[200px] w-full overflow-hidden bg-[#F8F2E8]">
        <Image
          src={product.image_url || "/images2/default.png"}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-3.5">
        <h3 className="font-cormorant text-[16px] leading-[1.2] font-bold text-[#0B6670] line-clamp-1">
          {product.name}
        </h3>

        <p className="font-cormorant text-[13px] font-medium text-[#7A6B5B] line-clamp-1 mt-0.5">
          {product.temples?.name ?? "-"}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-cormorant text-[18px] font-bold text-[#0B6670]">
            ₹ {Number(product.price).toLocaleString("en-IN")}
          </span>

          <Link
            href={detailUrl}
            className="font-cormorant inline-flex h-[26px] items-center gap-1 rounded-[6px] border border-[#C98C3D] bg-[#EFDEC7]/40 px-2.5 text-[12px] font-semibold text-[#C98C3D] transition hover:bg-[#C98C3D] hover:text-white"
          >
            <span>View Details</span>
            <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
