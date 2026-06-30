import { NextRequest, NextResponse } from "next/server";
import { fetchSevaDetailsService } from "@/lib/services/seva.service";

type RouteParams = {
  params: Promise<{
    templeId: string;
    sevaId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { templeId, sevaId } = await params;

    const seva = await fetchSevaDetailsService(templeId);

    return NextResponse.json({
      success: true,
      data: seva,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch seva details",
      },
      {
        status: 500,
      },
    );
  }
}
