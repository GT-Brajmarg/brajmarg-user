import { loadRazorpay } from "@/lib/loadRazorpay";

type RazorpayPaymentProps = {
  amount: number;
  name: string;
  description: string;
  onSuccess: () => void;
};

export async function startRazorpayPayment({
  amount,
  name,
  description,
  onSuccess,
}: RazorpayPaymentProps) {
  const loaded = await loadRazorpay();

  if (!loaded) {
    throw new Error("Unable to load Razorpay");
  }

  const response = await fetch("/api/payment/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error("Unable to create order");
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: data.order.amount,
    currency: data.order.currency,
    name,
    description,
    order_id: data.order.id,

    handler: async function (response: any) {
      const verify = await fetch("/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });

      const result = await verify.json();

      if (result.success) {
        onSuccess();
      } else {
        alert("Payment verification failed");
      }
    },

    theme: {
      color: "#C37000",
    },
  };

  new window.Razorpay(options).open();
}
