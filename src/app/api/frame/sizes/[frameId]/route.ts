import { NextRequest, NextResponse } from "next/server";
import { fetchFrameSizesService } from "@/lib/services/product.service";

type RouteParams = {
  params: Promise<{
    frameId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { frameId } = await params;

    const sizes = await fetchFrameSizesService(frameId);

    return NextResponse.json({
      success: true,
      data: sizes,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch frame sizes",
      },
      {
        status: 500,
      },
    );
  }
}
