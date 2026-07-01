import CheckoutButton from "./CheckoutButton";
import { CartItemType } from "../../types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  items: CartItemType[];
}

export default function OrderSummary({ items }: Props) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="rounded-3xl border border-[#D79B32] bg-[#FFF9F0] p-8">
      <h2
        className="font-cormorant text-3xl font-semibold text-[#0B6670]"
        style={{ marginLeft: "10px", marginTop: "10px" }}
      >
        Order Summary
      </h2>

      <div
        className="mt-8 space-y-4"
        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
      >
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-lg">
            <span className="font-cormorant">{item.title}</span>

            <span>₹{item.price}</span>
          </div>
        ))}
      </div>

      <div
        className="my-8 border-t border-dashed pt-6"
        style={{ marginTop: "10px" }}
      >
        <div
          className="mb-3 flex justify-between"
          style={{ marginLeft: "10px", marginTop: "10px", marginRight: "10px" }}
        >
          <span className="font-cormorant text-lg">Subtotal</span>

          <span>₹{subtotal}</span>
        </div>

        <div
          className="flex justify-between"
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          <span className="font-cormorant text-lg">Shipping</span>

          <span className="font-cormorant text-lg">Calculated at checkout</span>
        </div>
      </div>

      <div className="border-t border-dashed pt-6">
        <p
          className="text-lg"
          style={{ marginTop: "20px", marginLeft: "10px" }}
        >
          Estimated Total
        </p>

        <h3
          className="mt-2 text-3xl font-bold text-[#0B6670]"
          style={{ marginLeft: "10px" }}
        >
          ₹{subtotal}
        </h3>

        <p className="text-[#0B6670]" style={{ marginLeft: "10px" }}>
          + Shipping Charges
        </p>

        <p
          className="mt-1 text-sm"
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          (Inclusive of all Taxes)
        </p>
      </div>
      <div style={{ marginTop: "60px", marginLeft: "30px" }}>
        <Link href="/checkout">
          <button className="font-cormorant mt-10 flex h-15 w-80 items-center justify-center gap-3 rounded-xl bg-[#0B6670] text-3xl font-semibold text-white transition hover:bg-[#09545B]">
            Proceed to Checkout
            <ArrowRight size={28} />
          </button>
        </Link>
      </div>

      <p className="mt-3 text-center text-xs text-[#6D665B]">
        Secure Payments. Easy Returns. 100% Satisfaction.
      </p>
    </div>
  );
}
