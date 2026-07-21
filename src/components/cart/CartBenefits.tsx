import { ArrowLeft, Package, Truck, CreditCard, Sparkles } from "lucide-react";
// import { GiOm } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

export default function CartBenefits() {
  const benefits = [
    {
      icon: (
        <Image
          src="/images/sparkles-icon-1.svg"
          alt="Temple Blessed"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      ),
      title: "100% Temple Blessed",
      subtitle: "Authentic & Trusted",
    },
    {
      icon: (
        <Image
          src="/images/package-icon-1.svg"
          alt="Secure Packaging"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      ),
      title: "Secure Packaging",
      subtitle: "Packed with Care",
    },
    {
      icon: (
        <Image
          src="/images/truck-icon.svg"
          alt="Pan India Delivery"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      ),
      title: "Pan India Delivery",
      subtitle: "Safe Delivery to your doorstep",
    },
    {
      icon: (
        <Image
          src="/images/credit-card-icon.svg"
          alt="Secure Payments"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      ),
      title: "Easy & Secure Payments",
      subtitle: "Multiple payment options",
    },
  ];

  return (
    <section className="relative overflow-hidden py-8">
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
          <span
            className="flex h-8 items-center text-[#0F5C66]"
            style={{ marginRight: "10px" }}
          >
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

          <p className="mt-2 text-lg font-medium text-[#3D352F]">
            Review your items before checkout
          </p>
        </div>

        {/* Benefits */}
        <div
          className="bg-[#C37000]/05 mt-10 rounded-2xl border border-[#C37000] bg-[#C37000]/4 px-8 py-7"
          style={{ marginTop: "40px" }}
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
                  <p className="font-cormorant text-lg font-semibold text-[#3D352F]">
                    {item.title}
                  </p>

                  <p className="font-cormorant text-base text-[#3D352F]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
