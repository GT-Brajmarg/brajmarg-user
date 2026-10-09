import { NextRequest, NextResponse } from "next/server";
import { fetchFrameDetailsService } from "@/lib/services/product.service";

type RouteParams = {
  params: Promise<{
    frameId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { frameId } = await params;

    const frame = await fetchFrameDetailsService(frameId);

    return NextResponse.json({
      success: true,
      data: frame,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch frame details",
      },
      {
        status: 500,
      },
    );
  }
}
