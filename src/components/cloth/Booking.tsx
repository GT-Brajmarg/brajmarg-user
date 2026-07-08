"use client";

import { Ruler, Tag } from "lucide-react";

interface SizeOption {
  id: string;
  size_label: string;
  price: number;
}

interface ColorOption {
  id: string;
  color_name: string;
  color_hex: string;
  extra_price: number;
  is_default: boolean;
}

interface Props {
  sizes: SizeOption[];
  colors: ColorOption[];
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (id: string) => void;
  onColorChange: (id: string) => void;
}

export default function Booking({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: Props) {
  return (
    <section className="relative mt-10 overflow-hidden rounded-[28px] border border-[#D89A3D] bg-transparent p-8 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
      {/* ================= SIZE ================= */}

      <div>
        <div
          className="flex items-start gap-3"
          style={{ marginLeft: "20px", marginTop: "10px" }}
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
              Select the size of cloth you wish to order.
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
                size={48}
                className="mt-1 text-[#D89A3D]"
                style={{
                  marginLeft: "10px",
                  marginTop: "5px",
                  marginRight: "5px",
                }}
              />

              <p
                className="font-cormorant text-[18px] leading-5 text-[#3D352F]"
                style={{ marginRight: "10px" }}
              >
                Price changes based on the size and colour you select.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COLOR ================= */}

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
              Choose Color
            </h2>

            <p className="text-[16px] text-[#3D352F]">
              Select your preferred cloth colour.
            </p>
          </div>
        </div>

        <div
          className="mt-7 flex w-full flex-wrap justify-center gap-4"
          style={{ marginTop: "30px" }}
        >
          {colors.map((color) => {
            const active = selectedColor === color.id;

            return (
              <button
                key={color.id}
                onClick={() => onColorChange(color.id)}
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
                    {color.color_name}
                  </span>
                </div>

                {/* <p
                  className="mt-2 text-[12px] leading-5 text-[#666]"
                  style={{ marginLeft: "25px" }}
                >
                  {color.description}
                </p> */}

                <div className="mt-auto" style={{ marginLeft: "25px" }}>
                  {color.is_default ? (
                    <span className="font-semibold text-[#0B6670]">
                      (Default)
                    </span>
                  ) : (
                    <span className="font-semibold text-[#0B6670]">
                      + ₹ {color.extra_price}
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
