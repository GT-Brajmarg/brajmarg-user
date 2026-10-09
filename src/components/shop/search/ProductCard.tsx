"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Cormorant_Infant } from "next/font/google";
import Link from "next/link";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["600", "700"],
});
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
    <div className="group overflow-hidden rounded-2xl border border-[#E6D7BF] bg-[#C37000]/16 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-[270px] bg-[#F8F2E8]">
        <Image
          src={product.image_url || "/images2/default.png"}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3
          className={`${cormorantInfant.className} text-[20px] leading-[1.15] font-semibold text-[#0F5C66]`}
          style={{ marginLeft: "5px", marginTop: "10px" }}
        >
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span
            className={`${cormorantInfant.className} text-[16px] font-semibold text-[#3D352F]`}
            style={{ marginLeft: "5px" }}
          >
            {product.temples?.name ?? "BrajMarg Temple"}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span
            className={`${cormorantInfant.className} text-[24px] font-semibold text-[#0F5C66]`}
            style={{ marginLeft: "5px" }}
          >
            ₹{product.price}
          </span>

          <Link
            href={detailUrl}
            className={`${cormorantInfant.className} group flex h-[26px] items-center gap-1 rounded-[5px] border border-[#C37000] px-3 text-[14px] font-medium text-[#C37000] transition-all duration-200 hover:bg-[#C37000] hover:text-white`}
            style={{ marginRight: "10px" }}
          >
            <span className="text-[#C37000]" style={{ marginLeft: "5px" }}>
              View Details
            </span>

            <ArrowRight
              size={13}
              strokeWidth={2}
              className="text-[#C37000] transition-transform duration-200 group-hover:translate-x-1"
              style={{ marginRight: "5px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
