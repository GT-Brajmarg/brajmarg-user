import { NextResponse } from "next/server";
import { fetchMyBookings } from "@/lib/services/sevaBooking.service";

export async function GET() {
  try {
    const bookings = await fetchMyBookings();

    return NextResponse.json(
      {
        success: true,
        data: bookings,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Fetch My Bookings Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to fetch bookings.",
      },
      {
        status:
          error instanceof Error && error.message === "Unauthorized"
            ? 401
            : 500,
      },
    );
  }
}
