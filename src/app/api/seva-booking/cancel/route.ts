import { NextRequest, NextResponse } from "next/server";
import { cancelSevaBooking } from "@/lib/services/sevaBooking.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { registrationId } = body;

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

    const booking = await cancelSevaBooking(registrationId);

    return NextResponse.json(
      {
        success: true,
        message: "Booking cancelled successfully.",
        data: booking,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Cancel Booking Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to cancel booking.",
      },
      {
        status: 500,
      },
    );
  }
}
