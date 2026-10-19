import { loadRazorpay } from "@/lib/loadRazorpay";
import {
  showToast,
  handleApiError,
  getErrorMessageFromStatus,
} from "@/lib/toast";

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
  try {
    const loaded = await loadRazorpay();

    if (!loaded) {
      showToast.error("Unable to load Razorpay payment gateway.");
      return;
    }

    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      const msg =
        data.message ||
        getErrorMessageFromStatus(response.status, "Unable to create payment order.");
      showToast.error(msg);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name,
      description,
      order_id: data.order.id,

      handler: async function (response: Record<string, unknown>) {
        try {
          const verify = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const result = await verify.json();

          if (verify.ok && result.success) {
            showToast.success(result.message || "Payment verified successfully!");
            onSuccess();
          } else {
            const errorMsg =
              result.message ||
              getErrorMessageFromStatus(verify.status, "Payment verification failed.");
            showToast.error(errorMsg);
          }
        } catch (err) {
          handleApiError(err, "Payment verification failed.");
        }
      },

      theme: {
        color: "#C37000",
      },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    handleApiError(err, "Failed to start payment. Please try again.");
  }
}
