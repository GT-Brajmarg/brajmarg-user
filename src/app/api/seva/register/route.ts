import { NextRequest, NextResponse } from "next/server";
import { fetchSevaSlotsService } from "@/lib/services/seva.service";

export async function GET(request: NextRequest) {
  try {
    const sevaId = request.nextUrl.searchParams.get("sevaId");
    const date = request.nextUrl.searchParams.get("date");

    if (!sevaId) {
      return NextResponse.json(
        {
          success: false,
          message: "Seva ID is required",
        },
        { status: 400 },
      );
    }

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Date is required",
        },
        { status: 400 },
      );
    }

    const slots = await fetchSevaSlotsService(sevaId, date);

    return NextResponse.json({
      success: true,
      data: slots,
    });
  } catch (error) {
    console.error("Failed to fetch seva slots:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch slots",
      },
      { status: 500 },
    );
  }
}
