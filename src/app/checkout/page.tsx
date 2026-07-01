import CheckoutPage from "@/components/checkout/CheckoutPage";

const items = [
  {
    id: 1,
    type: "SEVA" as const,
    title: "Rajbhog Seva",
    temple: "Shreenathji Temple",
    image: "/images/demo.jpg",
    quantity: 1,
    price: 751,
  },
];
export default function Page() {
  return (
    <main className="bg-[#F8F2E8]">
      {/* <TempleHero temple={temple} /> */}

      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px]">
          <CheckoutPage items={items} />
        </div>
      </div>
    </main>
  );
}
