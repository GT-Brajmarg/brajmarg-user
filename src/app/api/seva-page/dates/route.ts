import { NextResponse } from "next/server";
import { fetchAvailableDates } from "@/lib/services/sevaPage.service";

export async function GET() {
  try {
    const dates = await fetchAvailableDates();

    return NextResponse.json({
      success: true,
      data: dates,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to fetch dates.",
      },
      {
        status: 500,
      },
    );
  }
}
