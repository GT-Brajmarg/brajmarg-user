import { ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { CartItemType } from "././../../types/types";

const items: CartItemType[] = [
  {
    id: 1,
    type: "SEVA",
    title: "Rajbhog Seva",
    temple: "Shreenathji Temple, Nathdwara",
    date: "22 June 2026, 1:00 PM",
    price: 751,
    quantity: 1,
    image: "/images/cart/seva.jpg",
  },
  {
    id: 2,
    type: "PRASAD",
    title: "Mishri Prasad",
    temple: "Shreenathji Temple, Nathdwara",
    extra: "250 gms",
    price: 251,
    quantity: 1,
    image: "/images/cart/prasad.jpg",
  },
  {
    id: 3,
    type: "SHOP",
    title: "Shreenathji Pichwai Frame",
    temple: "Shreenathji Temple, Nathdwara",
    extra: "12×16 inch • Teak wood finish",
    price: 2300,
    quantity: 1,
    image: "/images/cart/frame.jpg",
  },
];

export default function CartSection() {
  return (
    <section className="py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-[#D79B32] bg-[#FFF9F0]">
          <div className="flex items-center gap-3 border-b p-6">
            <ShoppingCart
              className="text-[#C67A00]"
              style={{ marginLeft: "20px" }}
            />

            <h2
              className="font-cormorant text-2xl font-semibold text-[#0B6670]"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Items in your Cart ({items.length})
            </h2>
          </div>

          <div className="px-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <OrderSummary items={items} />
      </div>
    </section>
  );
}
