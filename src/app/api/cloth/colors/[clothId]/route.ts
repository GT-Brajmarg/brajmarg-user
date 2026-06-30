import { NextRequest, NextResponse } from "next/server";
import { fetchClothColorsService } from "@/lib/services/product.service";

type RouteParams = {
  params: Promise<{
    clothId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { clothId } = await params;

    const colors = await fetchClothColorsService(clothId);

    return NextResponse.json({
      success: true,
      data: colors,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cloth colors",
      },
      {
        status: 500,
      },
    );
  }
}
