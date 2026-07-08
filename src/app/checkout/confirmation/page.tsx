import OrderConfirmationPage from "@/components/checkout/confirmation/OrderConfirmationPage";
import type { CheckoutItem } from "@/components/checkout/types";

const items: CheckoutItem[] = [
  {
    id: 1,
    type: "SEVA",
    title: "Rajbhog Seva",
    temple: "Shreenathji Temple, Nathdwara",
    image: "/images/rajbhog-seva.png",
    quantity: 1,
    price: 751,
    date: "22 June 2026, 1:00 PM",
  },
  {
    id: 2,
    type: "PRASAD",
    title: "Mishri Prasad",
    temple: "Shreenathji Temple, Nathdwara",
    image: "/images/mishri-prasad.png",
    quantity: 1,
    price: 251,
    extra: "250 gms",
  },
  {
    id: 3,
    type: "SHOP",
    title: "Shreenathji Pichwai Frame",
    temple: "Shreenathji Temple, Nathdwara",
    image: "/images/shreenathji-pichwai-frame.png",
    quantity: 1,
    price: 2300,
    extra: "12×16 inch • Teak wood finish",
  },
];

export default function Page() {
  return (
    <main className="bg-[#F8F2E8]">
      {/* <TempleHero temple={temple} /> */}

      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px]">
          <OrderConfirmationPage items={items} />
        </div>
      </div>
    </main>
  );
}
