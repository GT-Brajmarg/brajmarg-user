import { NextRequest, NextResponse } from "next/server";
import { fetchAvailableSlots } from "@/lib/services/sevaBooking.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const sevaId = searchParams.get("sevaId");
    const slug = searchParams.get("slug") ?? "";
    const date = searchParams.get("date");

    if (!sevaId) {
      return NextResponse.json(
        {
          success: false,
          message: "Seva ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking date is required.",
        },
        {
          status: 400,
        },
      );
    }

    const slots = await fetchAvailableSlots(slug, sevaId, date);

    return NextResponse.json({
      success: true,
      data: slots,
    });
  } catch (error) {
    console.error("Fetch Slots Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch available slots.",
      },
      {
        status: 500,
      },
    );
  }
}
