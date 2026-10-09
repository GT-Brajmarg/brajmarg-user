import { NextRequest, NextResponse } from "next/server";
import { fetchAvailableDates } from "@/lib/services/sevaBooking.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const sevaId = searchParams.get("sevaId");
    const slug = searchParams.get("slug") ?? "";

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

    const dates = await fetchAvailableDates(slug, sevaId);

    return NextResponse.json({
      success: true,
      data: dates,
    });
  } catch (error) {
    console.error("Fetch Dates Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch available dates.",
      },
      {
        status: 500,
      },
    );
  }
}
