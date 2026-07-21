"use client";

import { Ruler, Tag } from "lucide-react";
import Image from "next/image";
interface SizeOption {
  id: string;
  size_label: string;
  price: number;
}

interface MaterialOption {
  id: string;
  material_name: string;
  description: string;
  extra_price: number;
  is_default: boolean;
}

interface Props {
  sizes: SizeOption[];
  materials: MaterialOption[];
  selectedSize: string;
  selectedMaterial: string;
  onSizeChange: (id: string) => void;
  onMaterialChange: (id: string) => void;
}

export default function Booking({
  sizes,
  materials,
  selectedSize,
  selectedMaterial,
  onSizeChange,
  onMaterialChange,
}: Props) {
  return (
    <section className="relative mt-10 overflow-hidden rounded-[28px] border-[3px] border-[#C37000] bg-[#EFDEC7]/20 p-8 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
      {/* ================= SIZE ================= */}

      <div>
        <div
          className="flex items-start gap-3"
          style={{ marginLeft: "20px", marginTop: "20px" }}
        >
          <Ruler
            size={22}
            className="mt-1 text-[#D89A3D]"
            style={{ marginTop: "20px" }}
          />

          <div>
            <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
              Choose Size
            </h2>

            <p className="text-[16px] text-[#3D352F]">
              Select the size of frame you wish to order.
            </p>
          </div>
        </div>

        <div
          className="mt-7 flex flex-wrap justify-center gap-4"
          style={{ marginTop: "30px" }}
        >
          {sizes.map((size) => {
            const active = selectedSize === size.id;

            return (
              <button
                key={size.id}
                onClick={() => onSizeChange(size.id)}
                className={`flex h-[90px] w-[130px] flex-col items-center justify-center rounded-xl border transition ${
                  active
                    ? "border-[#0B6670] bg-transparent"
                    : "border-[#E5C48A] bg-transparent hover:border-[#D89A3D]"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      active ? "border-[#0B6670]" : "border-[#D89A3D]"
                    }`}
                  >
                    {active && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#0B6670]" />
                    )}
                  </div>

                  <span className="text-[15px] font-medium">
                    {size.size_label}
                  </span>
                </div>

                <span className="text-[28px] font-semibold text-[#0B6670]">
                  ₹ {size.price}
                </span>
              </button>
            );
          })}

          <div className="flex h-[90px] w-[200px] items-center justify-center rounded-xl border border-[#D89A3D] bg-[#C37000]/20 px-4 text-center">
            <div className="flex gap-1">
              <Tag
                size={38}
                className="mt-1 text-[#D89A3D]"
                style={{ marginLeft: "10px", marginTop: "10px" }}
              />

              <p
                className="font-cormorant text-[18px] leading-5 text-[#3D352F]"
                style={{ marginRight: "10px" }}
              >
                Price changes based on the size and material you select.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MATERIAL ================= */}

      <div
        className="mt-10"
        style={{ marginTop: "30px", marginBottom: "20px" }}
      >
        <div className="flex items-start gap-3">
          <Image
            src="/images/tag.svg" // Replace with your image path
            alt="Tag"
            width={22}
            height={22}
            className="mt-1"
            style={{ marginTop: "20px", marginLeft: "20px" }}
          />

          <div>
            <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
              Choose Material / Frame
            </h2>

            <p className="text-[16px] text-[#3D352F]">
              Select the type of frame you wish to order.
            </p>
          </div>
        </div>

        <div
          className="mt-7 flex w-full flex-wrap justify-center gap-4"
          style={{ marginTop: "30px" }}
        >
          {materials.map((material) => {
            const active = selectedMaterial === material.id;

            return (
              <button
                key={material.id}
                onClick={() => onMaterialChange(material.id)}
                className={`flex h-[115px] w-[220px] flex-col items-start rounded-xl border p-5 text-left transition ${
                  active
                    ? "border-[#0B6670] bg-transparent"
                    : "border-[#E5C48A] bg-transparent hover:border-[#D89A3D]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      active ? "border-[#0B6670]" : "border-[#D89A3D]"
                    }`}
                    style={{ marginLeft: "10px" }}
                  >
                    {active && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#0B6670]" />
                    )}
                  </div>

                  <span
                    className="font-cormorant text-[18px] text-[#3D342A]"
                    style={{ marginTop: "10px" }}
                  >
                    {material.material_name}
                  </span>
                </div>

                <p
                  className="mt-2 text-[12px] leading-5 text-[#666]"
                  style={{ marginLeft: "25px" }}
                >
                  {material.description}
                </p>

                <div className="mt-auto" style={{ marginLeft: "25px" }}>
                  {material.is_default ? (
                    <span className="font-semibold text-[#0B6670]">
                      (Default)
                    </span>
                  ) : (
                    <span className="font-semibold text-[#0B6670]">
                      + ₹ {material.extra_price}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
