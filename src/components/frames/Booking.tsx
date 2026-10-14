"use client";

import { Ruler, Tag } from "lucide-react";

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
    <section className="relative mt-6 sm:mt-8 overflow-hidden rounded-[20px] sm:rounded-[24px] border-[2px] border-[#C37000] bg-[#EFDEC7]/20 p-5 sm:p-7 md:p-8 shadow-[0_8px_25px_rgba(126,83,26,0.08)]">
      {/* ================= SIZE ================= */}
      <div>
        <div className="flex items-start gap-2.5 sm:gap-3">
          <Ruler size={22} className="mt-1 text-[#D89A3D] shrink-0" />
          <div>
            <h2 className="font-cormorant text-[24px] sm:text-[28px] font-semibold text-[#0B6670] leading-tight">
              Choose Size
            </h2>
            <p className="font-cormorant mt-0.5 text-[15px] sm:text-[16px] text-[#3D352F]">
              Select the size of frame you wish to order.
            </p>
          </div>
        </div>

        {/* 5 Equal Columns Grid matching Image 4 */}
        <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {sizes.map((size) => {
            const active = selectedSize === size.id;

            return (
              <button
                key={size.id}
                type="button"
                onClick={() => onSizeChange(size.id)}
                className={`flex h-[88px] sm:h-[94px] w-full flex-col items-center justify-center rounded-[14px] p-2 transition-all duration-200 cursor-pointer ${
                  active
                    ? "border-[2px] border-[#0B6670] bg-[#0B6670]/5 shadow-sm"
                    : "border border-[#E5C48A] bg-transparent hover:border-[#D89A3D]"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      active
                        ? "border-[1.5px] border-[#0B6670]"
                        : "border-[#C37000]"
                    }`}
                  >
                    {active && (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0B6670]" />
                    )}
                  </span>
                  <span className="font-cormorant text-[16px] sm:text-[17px] font-semibold text-[#2F241B]">
                    {size.size_label}
                  </span>
                </div>

                <span className="font-cormorant text-[22px] sm:text-[24px] font-semibold leading-none text-[#0B6670]">
                  ₹ {size.price}
                </span>
              </button>
            );
          })}

          {/* Price Changes Tag Card matching Image 4 */}
          <div className="flex h-[88px] sm:h-[94px] w-full items-center gap-2.5 rounded-[14px] border border-[#D89A3D] bg-[#EBD5B3]/80 px-3.5 py-2">
            <Tag size={20} className="shrink-0 text-[#C37000] rotate-45" />
            <p className="font-cormorant text-[13.5px] sm:text-[14.5px] leading-tight text-[#3D352F]">
              Price changes based on the size and material you select.
            </p>
          </div>
        </div>
      </div>

      {/* ================= MATERIAL ================= */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-[1.5px] border-[#D89A3D]">
            <div className="h-2.5 w-2.5 rounded-[1px] border border-[#D89A3D]" />
          </div>
          <div>
            <h2 className="font-cormorant text-[24px] sm:text-[28px] font-semibold text-[#0B6670] leading-tight">
              Choose Material / Frame
            </h2>
            <p className="font-cormorant mt-0.5 text-[15px] sm:text-[16px] text-[#3D352F]">
              Select the type of frame you wish to order.
            </p>
          </div>
        </div>

        {/* 3 Equal Columns Grid matching Image 4 */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
          {materials.map((material) => {
            const active = selectedMaterial === material.id;

            return (
              <button
                key={material.id}
                type="button"
                onClick={() => onMaterialChange(material.id)}
                className={`flex min-h-[115px] w-full flex-col justify-between rounded-[14px] p-4 text-left transition-all duration-200 cursor-pointer ${
                  active
                    ? "border-[2px] border-[#0B6670] bg-[#0B6670]/5 shadow-sm"
                    : "border border-[#E5C48A] bg-transparent hover:border-[#D89A3D]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        active
                          ? "border-[1.5px] border-[#0B6670]"
                          : "border-[#C37000]"
                      }`}
                    >
                      {active && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#0B6670]" />
                      )}
                    </span>
                    <span className="font-cormorant text-[17px] sm:text-[18px] font-semibold leading-snug text-[#2F241B]">
                      {material.material_name}
                    </span>
                  </div>
                  <p className="font-cormorant mt-1.5 pl-6 text-[13px] sm:text-[14px] leading-snug text-[#5C5A55]">
                    {material.description}
                  </p>
                </div>

                <div className="mt-3 pl-6">
                  {material.is_default ? (
                    <span className="font-cormorant text-[15px] sm:text-[16px] font-semibold text-[#0B6670]">
                      (Default)
                    </span>
                  ) : (
                    <span className="font-cormorant text-[15px] sm:text-[16px] font-semibold text-[#0B6670]">
                      + {material.extra_price}
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
