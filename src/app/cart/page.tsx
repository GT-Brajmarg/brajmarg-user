import CartBenefits from "@/components/cart/CartBenefits";
import CartSection from "@/components/cart/CartSection";
import CartSupportSection from "@/components/cart/CartSupportSection";
import Image from "next/image";

export default function CartPage() {
  return (
    <>
      <main className="relative isolate min-h-screen overflow-hidden bg-[#F8F2E8]">
        {/* Background layers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Paper texture across the entire cart page */}
          <Image
            src="/images/temple-paper-texture.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.22]"
          />

          {/* Mandala 1 — behind Cart Benefits */}
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[80px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
          />

          {/* Mandala 2 — behind Cart Section */}
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={1050}
            height={1050}
            className="absolute top-[1050px] left-1/2 w-[850px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
          />

          {/* Mandala 3 — behind Support Section */}
          <Image
            src="/images/mandala_bg_1.png"
            alt=""
            width={900}
            height={900}
            className="absolute top-[2050px] left-1/2 w-[700px] max-w-none -translate-x-1/2 opacity-[0.035] md:w-[900px]"
          />
        </div>

        <div className="mx-auto flex justify-center">
          <div className="w-full max-w-[1200px]">
            <CartBenefits />
            <div style={{ marginTop: "30px" }}>
              <CartSection />
            </div>
            <div style={{ marginTop: "30px" }}>
              <CartSupportSection />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
