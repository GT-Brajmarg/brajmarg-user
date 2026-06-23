import { NextRequest, NextResponse } from "next/server";
import { fetchTempleTimingsService } from "@/lib/services/temple-timing.service";

type RouteParams = {
  params: Promise<{
    templeId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { templeId } = await params;

    const timings = await fetchTempleTimingsService(templeId);

    return NextResponse.json({
      success: true,
      data: timings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch temple timings",
      },
      {
        status: 500,
      },
    );
  }
}
