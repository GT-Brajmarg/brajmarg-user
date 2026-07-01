// import CartHero from "@/components/cart/CartHero";
// import CartFeatures from "@/components/cart/CartFeatures";
// import CartItems from "@/components/cart/CartItems";
// import OrderSummary from "@/components/cart/OrderSummary";
// import CartSupport from "@/components/cart/CartSupport";
// import PurchaseBanner from "@/components/cart/PurchaseBanner";

// export default function CartPage() {
//   return (
//     <main className="bg-[#FBF4E8]">
//       <CartHero />

//       <div className="mx-auto max-w-7xl px-6">

//         <CartFeatures />

//         <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
//           <CartItems />
//           <OrderSummary />
//         </section>

//         <CartSupport />

//         <PurchaseBanner />
//       </div>
//     </main>
//   );
// }

import CartBenefits from "@/components/cart/CartBenefits";
import CartSection from "@/components/cart/CartSection";
import CartSupportSection from "@/components/cart/CartSupportSection";

export default function CartPage() {
  return (
    <>
      <main className="bg-[#F8F2E8]">
        {/* <TempleHero temple={temple} /> */}

        <div className="mx-auto flex justify-center">
          <div className="w-full max-w-[1200px]">
            <CartBenefits />
            <div style={{ marginTop: "30px" }}>
              <CartSection />
            </div>
            <div style={{ marginTop: "30px" }}>
              <CartSupportSection />
            </div>
            {/* Cart Items */}
          </div>
        </div>
      </main>
    </>
  );
}
