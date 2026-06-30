"use client";

import { useState } from "react";
import { Ruler, Tag } from "lucide-react";

interface SizeOption {
  id: string;
  label: string;
  price: number;
}

interface MaterialOption {
  id: string;
  name: string;
  description: string;
  extraPrice: number;
  recommended?: boolean;
}

interface Props {
  sizes?: SizeOption[];
  materials?: MaterialOption[];
}

export default function Booking({ sizes = [], materials = [] }: Props) {
  // -----------------------------
  // Dummy Data (remove after API)
  // -----------------------------
  const dummySizes: SizeOption[] = [
    {
      id: "1",
      label: '5" × 7"',
      price: 650,
    },
    {
      id: "2",
      label: '8" × 10"',
      price: 950,
    },
    {
      id: "3",
      label: '10" × 12"',
      price: 1450,
    },
    {
      id: "4",
      label: '12" × 16"',
      price: 2300,
    },
  ];

  const dummyMaterials: MaterialOption[] = [
    {
      id: "1",
      name: "Teak Wood Frame",
      description: "Premium teak wood with rich finish",
      extraPrice: 0,
      recommended: true,
    },
    {
      id: "2",
      name: "Sheesham Wood Frame",
      description: "Durable sheesham wood with natural grain",
      extraPrice: 300,
    },
    {
      id: "3",
      name: "Golden Finish Frame",
      description: "Elegant golden finish for a royal look",
      extraPrice: 500,
    },
  ];

  const sizeOptions = sizes.length ? sizes : dummySizes;
  const materialOptions = materials.length ? materials : dummyMaterials;

  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].id);

  const [selectedMaterial, setSelectedMaterial] = useState(
    materialOptions[0].id,
  );
  return (
    <section className="mt-10 rounded-[28px] border border-[#D89A3D] bg-[#FCF8F1] p-8">
      {/* ================= SIZE ================= */}

      <div>
        <div className="flex items-start gap-3" style={{ marginLeft: "20px" }}>
          <Ruler
            size={22}
            className="mt-1 text-[#D89A3D]"
            style={{ marginTop: "20px" }}
          />

          <div>
            <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
              Choose Size
            </h2>

            <p className="text-[14px] text-[#6D6257]">
              Select the size of frame you wish to order.
            </p>
          </div>
        </div>

        <div
          className="mt-7 flex flex-wrap justify-center gap-4"
          style={{ marginTop: "30px" }}
        >
          {sizeOptions.map((size) => {
            const active = selectedSize === size.id;

            return (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`flex h-[90px] w-[130px] flex-col items-center justify-center rounded-xl border transition ${
                  active
                    ? "border-[#0B6670] bg-[#F8FCFC]"
                    : "border-[#E5C48A] bg-white hover:border-[#D89A3D]"
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

                  <span className="text-[15px] font-medium">{size.label}</span>
                </div>

                <span className="text-[28px] font-semibold text-[#0B6670]">
                  ₹ {size.price}
                </span>
              </button>
            );
          })}

          <div className="flex h-[90px] w-[200px] items-center justify-center rounded-xl border border-[#D89A3D] bg-[#FCF5E9] px-4 text-center">
            <div className="flex gap-1">
              <Tag
                size={18}
                className="mt-1 text-[#D89A3D]"
                style={{ marginLeft: "10px" }}
              />

              <p
                className="font-cormorant text-[18px] leading-5 text-[#5B4631]"
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
          <Tag
            size={22}
            className="mt-1 text-[#D89A3D]"
            style={{ marginTop: "20px", marginLeft: "20px" }}
          />

          <div>
            <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
              Choose Material / Frame
            </h2>

            <p className="text-[14px] text-[#6D6257]">
              Select the type of frame you wish to order.
            </p>
          </div>
        </div>

        <div
          className="mt-7 flex w-full flex-wrap justify-center gap-4"
          style={{ marginTop: "30px" }}
        >
          {materialOptions.map((material) => {
            const active = selectedMaterial === material.id;

            return (
              <button
                key={material.id}
                onClick={() => setSelectedMaterial(material.id)}
                className={`flex h-[115px] w-[220px] flex-col items-start rounded-xl border p-5 text-left transition ${
                  active
                    ? "border-[#0B6670] bg-[#F8FCFC]"
                    : "border-[#E5C48A] bg-white hover:border-[#D89A3D]"
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
                    {material.name}
                  </span>
                </div>

                <p
                  className="mt-2 text-[12px] leading-5 text-[#666]"
                  style={{ marginLeft: "25px" }}
                >
                  {material.description}
                </p>

                <div className="mt-auto" style={{ marginLeft: "25px" }}>
                  {material.recommended ? (
                    <span className="font-semibold text-[#0B6670]">
                      (Default)
                    </span>
                  ) : (
                    <span className="font-semibold text-[#0B6670]">
                      + ₹ {material.extraPrice}
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
