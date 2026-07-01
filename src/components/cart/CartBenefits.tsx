import { ArrowLeft, Package, Truck, CreditCard, Sparkles } from "lucide-react";
// import { GiOm } from "react-icons/gi";
import Link from "next/link";

export default function CartBenefits() {
  const benefits = [
    {
      icon: <Sparkles className="h-8 w-8 text-[#C67A00]" />,
      title: "100% Temple Blessed",
      subtitle: "Authentic & Trusted",
    },
    {
      icon: <Package className="h-8 w-8 text-[#C67A00]" />,
      title: "Secure Packaging",
      subtitle: "Packed with Care",
    },
    {
      icon: <Truck className="h-8 w-8 text-[#C67A00]" />,
      title: "Pan India Delivery",
      subtitle: "Safe Delivery to your doorstep",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-[#C67A00]" />,
      title: "Easy & Secure Payments",
      subtitle: "Multiple payment options",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FBF5EB] py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/mandala-bg.svg')",
            backgroundSize: "700px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Continue Shopping */}
        <Link
          href="/shop"
          className="font-cormorant inline-flex items-center gap-2 rounded-lg border border-[#C67A00] px-5 py-2 text-lg font-semibold text-[#0B6670] transition hover:bg-[#FFF5E7]"
          style={{ marginTop: "20px" }}
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-[#0F5C66]" />
          <span className="flex h-8 items-center text-[#0F5C66]">
            Continue Shopping
          </span>
        </Link>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1
            className="font-cormorant text-4xl font-semibold text-[#0B6670]"
            style={{ marginTop: "20px" }}
          >
            Your Cart
          </h1>

          <p className="mt-2 text-lg text-[#555]">
            Review your items before checkout
          </p>
        </div>

        {/* Benefits */}
        <div
          className="mt-10 rounded-2xl border border-[#D99B36] bg-[#FFF9F0] px-8 py-7"
          style={{ marginTop: "20px" }}
        >
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            style={{
              marginTop: "10px",
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "10px",
            }}
          >
            {benefits.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div>{item.icon}</div>

                <div>
                  <p className="text-lg font-semibold text-[#5A3D1B]">
                    {item.title}
                  </p>

                  <p className="text-base text-[#6F5841]">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
