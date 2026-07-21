import { NextRequest, NextResponse } from "next/server";
import { fetchFeaturedSevas } from "@/lib/services/sevaPage.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date") || undefined;

    const sevaType = searchParams.get("sevaType") || undefined;

    const sevas = await fetchFeaturedSevas({
      date,
      sevaType,
    });

    return NextResponse.json({
      success: true,
      data: sevas,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch featured sevas.",
      },
      {
        status: 500,
      },
    );
  }
}
