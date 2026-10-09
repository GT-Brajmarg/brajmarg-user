import { NextRequest, NextResponse } from "next/server";
import { fetchClothDetailsService } from "@/lib/services/product.service";

type RouteParams = {
  params: Promise<{
    clothId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { clothId } = await params;

    const cloth = await fetchClothDetailsService(clothId);

    return NextResponse.json({
      success: true,
      data: cloth,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cloth details",
      },
      {
        status: 500,
      },
    );
  }
}
