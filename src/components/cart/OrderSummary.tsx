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
    <div className="relative min-h-[615px] flex-col rounded-3xl border border-[#D79B32] bg-[transparent] p-8">
      <h2
        className="font-cormorant text-2xl font-semibold text-[#0B6670]"
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
            <span className="font-cormorant text-[16px] text-[#3D352F]">
              {item.title}
            </span>

            <span className="text-[15px] text-[#3D352F]">₹{item.price}</span>
          </div>
        ))}
      </div>

      <div
        className="my-8 border-t border-dashed border-[#C37000] pt-6"
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

      <div className="mt-auto border-t border-dashed border-[#C37000] px-[10px] pt-6">
        <p
          className="font-cormorant text-[20px]"
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

        <p
          className="font-cormorant text-xl text-[#0B6670]"
          style={{ marginLeft: "10px" }}
        >
          + Shipping Charges
        </p>

        <p
          className="font-cormorant mt-1 text-sm"
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          (Inclusive of all Taxes)
        </p>
      </div>
      <div className="absolute right-8 bottom-8 left-8 items-center px-4">
        <Link href="/checkout" className="w-full max-w-[300px]">
          <button className="font-cormorant flex h-[50px] w-full items-center justify-center gap-3 rounded-xl bg-[#0B6670] text-[24px] font-semibold text-[#EFDEC7] transition hover:bg-[#09545B]">
            Proceed to Checkout
            <ArrowRight size={26} />
          </button>
        </Link>

        <p className="mt-3 w-full max-w-[320px] text-center text-xs text-[#0F5C66]">
          Secure Payments. Easy Returns. 100% Satisfaction.
        </p>
      </div>
    </div>
  );
}
