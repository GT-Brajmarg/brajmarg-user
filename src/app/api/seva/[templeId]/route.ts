import { NextRequest, NextResponse } from "next/server";
import { fetchTempleSevasService } from "@/lib/services/seva.service";

type RouteParams = {
  params: Promise<{
    templeId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { templeId } = await params;

    const sevas = await fetchTempleSevasService(templeId);

    return NextResponse.json({
      success: true,
      data: sevas,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch sevas",
      },
      { status: 500 },
    );
  }
}
