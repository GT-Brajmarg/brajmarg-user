"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <section className="relative mb-8">
      <Link
        href="/cart"
        className="font-cormorant inline-flex items-center gap-2 rounded-lg border border-[#C67A00] bg-[#FFF9F0] px-5 py-2 text-lg font-semibold text-[#0B6670] transition hover:bg-[#FFF3E2]"
        style={{ marginTop: "20px" }}
      >
        <ArrowLeft className="h-4 w-4 text-[#0F5C66]" />

        <span className="font-cormorant text-lg font-semibold text-[#0F5C66]">
          Back to Cart
        </span>
      </Link>

      <div className="mt-10 text-center">
        <h1
          className="font-cormorant text-4xl font-semibold text-[#0B6670]"
          style={{ marginTop: "20px" }}
        >
          Checkout
        </h1>

        <p className="mt-2 text-[#5B5146]">
          Secure and blessed delivery of your order.
        </p>
      </div>
    </section>
  );
}
