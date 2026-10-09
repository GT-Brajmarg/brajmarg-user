import { NextRequest, NextResponse } from "next/server";
import { fetchSevaSlotsService } from "@/lib/services/seva.service";

type RouteParams = {
  params: Promise<{
    sevaId: string;
  }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { sevaId } = await params;

    const date = request.nextUrl.searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Date is required",
        },
        {
          status: 400,
        },
      );
    }

    const slots = await fetchSevaSlotsService(sevaId, date);

    return NextResponse.json({
      success: true,
      data: slots,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch slots",
      },
      {
        status: 500,
      },
    );
  }
}
