import PaymentPage from "@/components/checkout/payment/PaymentPage";
import Image from "next/image";

export default function Page() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F8F2E8]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Full payment page paper texture */}
        <Image
          src="/images/temple-paper-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />

        {/* Mandala behind payment heading / stepper */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[60px] left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.045] md:w-[1050px]"
        />

        {/* Mandala behind payment methods */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={1050}
          height={1050}
          className="absolute top-[850px] left-1/2 w-[850px] max-w-none -translate-x-1/2 opacity-[0.04] md:w-[1050px]"
        />

        {/* Mandala behind order summary / bottom payment content */}
        <Image
          src="/images/mandala_bg_1.png"
          alt=""
          width={900}
          height={900}
          className="absolute top-[1700px] left-1/2 w-[700px] max-w-none -translate-x-1/2 opacity-[0.035] md:w-[900px]"
        />
      </div>
      <div className="mx-auto flex justify-center">
        <div className="w-full max-w-[1200px]">
          <PaymentPage />
        </div>
      </div>
    </main>
  );
}
