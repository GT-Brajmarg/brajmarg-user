"use client";

import Image from "next/image";
import { Cormorant_Infant } from "next/font/google";

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface OrderItem {
  id: string;
  image: string;
  title: string;
  temple: string;
  quantity: number;
  price: number;
}

interface Props {
  items: OrderItem[];
}

export default function OrderItems({ items }: Props) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <section
      className="mt-6 rounded-[22px] border border-[#C37000]/63 p-6"
      style={{ marginTop: "20px", marginLeft: "40px", marginRight: "40px" }}
    >
      <h2
        className={`${cormorantInfant.className} text-[20px] font-bold text-[#3D352F]`}
        style={{ marginLeft: "20px", marginTop: "10px" }}
      >
        Items in this Order
      </h2>

      <div className="mt-6 divide-y divide-[#E6D7C5]">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-5">
            {/* Left */}

            <div className="flex items-center gap-5">
              <div
                className="relative h-[92px] w-[92px] overflow-hidden rounded-xl border border-[#E6C8A2]"
                style={{ marginLeft: "20px", marginTop: "10px" }}
              >
                <Image
                  src={"/images2/default.png"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3
                  className={`${cormorantInfant.className} text-[18px] font-bold text-[#0F5C66]`}
                >
                  {item.title}
                </h3>

                <p
                  className={`${cormorantInfant.className} mt-1 text-[15px] font-bold text-[#3D352F]`}
                >
                  {item.temple}
                </p>

                <p className="mt-1 text-[12px] text-[#3D352F]">
                  Qty : {item.quantity}
                </p>
              </div>
            </div>

            {/* Right */}

            <div
              className="text-[16px] font-semibold text-[#0F5C66]"
              style={{ marginRight: "20px" }}
            >
              ₹ {item.price}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}

      <div
        className="mt-8 border-t border-[#C37000]/24 pt-6"
        style={{ marginTop: "10px", marginLeft: "20px", marginRight: "20px" }}
      >
        <div className="space-y-3" style={{ marginTop: "10px" }}>
          {/* Subtotal */}
          <div className="flex items-start justify-between">
            <div>
              <p
                className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
              >
                Subtotal{" "}
                <span className="text-[16px] font-normal text-[#3D352F]">
                  ({items.length} Items)
                </span>
              </p>
            </div>

            <span
              className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
            >
              ₹{subtotal}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex items-start justify-between">
            <p
              className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
            >
              Shipping{" "}
              <span className="text-[16px] font-normal text-[#3D352F]">
                (Standard Delivery)
              </span>
            </p>

            <span
              className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
            >
              ₹49
            </span>
          </div>

          {/* Packaging */}
          <div className="flex items-center justify-between">
            <span
              className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
            >
              Packaging &amp; Handling
            </span>

            <span
              className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
            >
              ₹49
            </span>
          </div>

          {/* Total */}
          <div
            className="mt-4 flex items-start justify-between border-t border-[#C37000]/24 pt-4"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <div>
              <p
                className={`${cormorantInfant.className} text-[18px] font-bold text-[#3D352F]`}
              >
                Total Amount
              </p>

              <p className="text-[12px] font-bold text-[#3D352F]/78">
                (Inclusive of all Taxes)
              </p>
            </div>

            <span
              className={`${cormorantInfant.className} text-[24px] font-bold text-[#0F5C66]`}
            >
              ₹{total}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
