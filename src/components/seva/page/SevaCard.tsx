"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Infant } from "next/font/google";

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-infant",
});

interface Props {
  seva: {
    id: string;
    slug: string;
    name: string;
    temple: string;
    image: string;
    price: number;
    slots: number;
  };
}

export default function SevaCard({ seva }: Props) {
  return (
    <Link href={`/temples/${seva.slug}/sevas/${seva.id}`} className="block">
      <div className="group min-h-[430px] overflow-hidden rounded-[22px] bg-[#C37000]/16 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}

        <div className="relative h-[300px] overflow-hidden">
          <Image
            src={seva.image}
            alt={seva.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}

        <div
          className="space-y-2 p-5"
          style={{ marginTop: "5px", marginLeft: "10px" }}
        >
          <h3 className="font-cormorant text-[20px] font-semibold text-[#0B6670]">
            {seva.name}
          </h3>

          <p
            className={`${cormorantInfant.className} text-[16px] font-bold text-[#3D352F]`}
          >
            {seva.temple}
          </p>

          <div className="flex items-center justify-between pt-2">
            <span
              className={`${cormorantInfant.className} text-[25px] font-bold text-[#0F5C66]`}
            >
              ₹ {seva.price}
            </span>

            <span
              className={`${cormorantInfant.className} rounded-md border border-[#C37000] px-3 py-1 text-[16px] font-bold text-[#C37000]`}
              style={{ marginRight: "15px" }}
            >
              <span style={{ marginRight: "5px", marginLeft: "5px" }}>
                {seva.slots} Slots Left
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
