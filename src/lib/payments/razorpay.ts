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
  /** Called ONLY when the user manually closes/dismisses the Razorpay modal */
  onDismiss?: () => void;
};

/**
 * Ensures scrolling is completely restored on html/body after Razorpay modal closes.
 * Razorpay SDK injects inline `overflow: hidden` onto document.body and document.documentElement.
 * When the modal is dismissed, Razorpay sometimes fails to restore scroll or its cleanup
 * runs after our step transition, leaving the page locked without a scrollbar.
 */
export function restorePageScroll() {
  if (typeof document === "undefined") return;

  const resetStyles = () => {
    try {
      // 1. Remove style locks on body
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow-y");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("height");
      document.body.style.removeProperty("touch-action");
      document.body.style.removeProperty("padding-right");

      // 2. Remove style locks on html element
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow-y");
      document.documentElement.style.removeProperty("position");
      document.documentElement.style.removeProperty("height");

      // 3. Explicitly unlock vertical scroll
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";

      // 4. Clean up any leftover Razorpay container/backdrop elements
      const lingeringElements = document.querySelectorAll(
        ".razorpay-container, .razorpay-backdrop, iframe[name*='razorpay']"
      );
      lingeringElements.forEach((el) => {
        try {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        } catch {}
      });
    } catch {}
  };

  // Run immediately and also in intervals to override any delayed internal Razorpay script cleanup
  resetStyles();
  setTimeout(resetStyles, 50);
  setTimeout(resetStyles, 150);
  setTimeout(resetStyles, 300);
  setTimeout(resetStyles, 600);
  setTimeout(resetStyles, 1000);
}

export async function startRazorpayPayment({
  amount,
  name,
  description,
  onSuccess,
  onDismiss,
}: RazorpayPaymentProps) {
  try {
    const loaded = await loadRazorpay();

    if (!loaded) {
      showToast.error("Unable to load Razorpay payment gateway.");
      restorePageScroll();
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
      restorePageScroll();
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name,
      description,
      order_id: data.order.id,

      modal: {
        // This fires ONLY when user clicks the X / Close button on the Razorpay modal
        ondismiss: function () {
          restorePageScroll();
          onDismiss?.();
        },
      },

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
            restorePageScroll();
            showToast.success(result.message || "Payment verified successfully!");
            onSuccess();
          } else {
            const errorMsg =
              result.message ||
              getErrorMessageFromStatus(verify.status, "Payment verification failed.");
            showToast.error(errorMsg);
            restorePageScroll();
          }
        } catch (err) {
          handleApiError(err, "Payment verification failed.");
          restorePageScroll();
        }
      },

      theme: {
        color: "#C37000",
      },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    handleApiError(err, "Failed to start payment. Please try again.");
    restorePageScroll();
  }
}
