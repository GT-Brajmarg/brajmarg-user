import { NextRequest, NextResponse } from "next/server";
import { fetchFrameMaterialsService } from "@/lib/services/product.service";

type RouteParams = {
  params: Promise<{
    frameId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { frameId } = await params;

    const materials = await fetchFrameMaterialsService(frameId);

    return NextResponse.json({
      success: true,
      data: materials,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch frame materials",
      },
      {
        status: 500,
      },
    );
  }
}
