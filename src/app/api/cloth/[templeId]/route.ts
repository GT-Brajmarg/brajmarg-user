import { NextRequest, NextResponse } from "next/server";
import { fetchTempleClothsService } from "@/lib/services/product.service";

type RouteParams = {
  params: Promise<{
    templeId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { templeId } = await params;

    const cloths = await fetchTempleClothsService(templeId);

    return NextResponse.json({
      success: true,
      data: cloths,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cloths",
      },
      {
        status: 500,
      },
    );
  }
}
