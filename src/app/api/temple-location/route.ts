import { NextRequest, NextResponse } from "next/server";
import { fetchTempleLocation } from "@/lib/services/templeLocation.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const templeId = searchParams.get("templeId");

    if (!templeId) {
      return NextResponse.json(
        {
          success: false,
          message: "Temple ID is required",
        },
        {
          status: 400,
        },
      );
    }

    const location = await fetchTempleLocation(templeId);

    return NextResponse.json({
      success: true,
      data: location,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch temple location",
      },
      {
        status: 500,
      },
    );
  }
}
