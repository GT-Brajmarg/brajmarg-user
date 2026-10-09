import OrderConfirmationPage from "@/components/checkout/confirmation/OrderConfirmationPage";
import type { CheckoutItem } from "@/components/checkout/types";
import Image from "next/image";

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
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F8F2E8]">
      {/* <TempleHero temple={temple} /> */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Full checkout page paper texture */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />

        {/* Mandala behind checkout heading / steps */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[60px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />

        {/* Mandala behind delivery and payment content */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[950px] left-1/2 w-[850px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
        />

        {/* Mandala behind order summary / bottom content */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[1900px] left-1/2 w-[700px] max-w-none -translate-x-1/2 opacity-[0.035] md:w-[900px]"
        />
      </div>
      {/* <TempleHero temple={temple} /> */}

      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px]">
          <OrderConfirmationPage items={items} />
        </div>
      </div>
    </main>
  );
}
