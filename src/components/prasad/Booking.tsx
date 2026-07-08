"use client";

import { Lock } from "lucide-react";

interface QuantityOption {
  id: string;
  quantity_label: string;
  price: number;
}

interface Props {
  quantities: QuantityOption[];
  selectedQuantity: string;
  onQuantityChange: (id: string) => void;
}

export default function Booking({
  quantities,
  selectedQuantity,
  onQuantityChange,
}: Props) {
  return (
    <section className="relative mt-10 overflow-hidden rounded-[22px] border border-[#D89A3D] bg-transparent p-8 shadow-[0_24px_60px_rgba(126,83,26,0.22),0_8px_18px_rgba(126,83,26,0.12)]">
      {/* Heading */}

      <div className="flex items-start gap-3" style={{ marginTop: "20px" }}>
        <Lock
          size={22}
          className="mt-1 text-[#D89A3D]"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        />

        <div>
          <h2 className="font-cormorant text-[30px] font-semibold text-[#0B6670]">
            Choose Quantity
          </h2>

          <p className="text-[14px] text-[#6B6258]">
            Select the pack size of prasad you wish to order.
          </p>
        </div>
      </div>

      {/* Quantity Cards */}

      <div
        className="mt-8 flex justify-center"
        style={{ marginTop: "30px", marginBottom: "20px" }}
      >
        <div className="flex max-w-[700px] flex-wrap justify-center gap-4">
          {quantities.map((item) => {
            const active = selectedQuantity === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onQuantityChange(item.id)}
                className={`flex h-[86px] w-[118px] flex-col items-center justify-center rounded-xl border transition-all duration-200 ${
                  active
                    ? "border-[#0B6670] bg-transparent shadow-sm"
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

                  <span className="text-[16px] font-medium text-[#2B2B2B]">
                    {item.quantity_label}
                  </span>
                </div>

                <span className="text-[30px] font-semibold text-[#0B6670]">
                  ₹ {item.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
