import { NextRequest, NextResponse } from "next/server";
import { verifySevaPayment } from "@/lib/services/sevaBooking.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      registrationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = body;

    if (!registrationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * TODO:
     * Verify Razorpay Signature here.
     *
     * crypto.createHmac(...)
     *
     * Compare generated signature with
     * razorpaySignature
     */

    const booking = await verifySevaPayment(registrationId);

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      data: booking,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Payment verification failed.",
      },
      {
        status: 500,
      },
    );
  }
}
