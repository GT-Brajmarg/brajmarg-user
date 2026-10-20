"use client";

import Image from "next/image";
import Link from "next/link";
import { cormorantInfant } from "@/lib/fonts";

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
    <Link href={`/temples/${seva.slug}/sevas/${seva.id}`} className="block h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-[#C37000]/16 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
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
          className="flex flex-1 flex-col justify-between space-y-2 p-5"
          style={{ marginTop: "5px", marginLeft: "10px" }}
        >
          <div>
            <h3
              className="font-cormorant text-[20px] font-semibold text-[#0B6670] line-clamp-2 min-h-[56px]"
              title={seva.name}
            >
              {seva.name}
            </h3>

            <p
              className={`${cormorantInfant.className} mt-1 text-[16px] font-bold text-[#3D352F] line-clamp-1`}
              title={seva.temple}
            >
              {seva.temple}
            </p>
          </div>

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
