import { NextRequest, NextResponse } from "next/server";
import { fetchSevaDetailsService } from "@/lib/services/seva.service";

type RouteParams = {
  params: Promise<{
    sevaId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { sevaId } = await params;

    const seva = await fetchSevaDetailsService(sevaId);

    return NextResponse.json({
      success: true,
      data: seva,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch seva details",
      },
      { status: 500 },
    );
  }
}
