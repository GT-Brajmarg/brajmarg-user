import { NextResponse } from "next/server";
import { fetchAvailableDatesService } from "@/lib/services/seva.service";

type RouteParams = {
  params: Promise<{
    templeId: string;
    sevaId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { sevaId } = await params;

    const dates = await fetchAvailableDatesService(sevaId);

    return NextResponse.json({
      success: true,
      data: dates,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch available dates",
      },
      {
        status: 500,
      },
    );
  }
}
