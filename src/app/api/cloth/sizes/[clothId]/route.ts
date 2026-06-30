import { NextRequest, NextResponse } from "next/server";
import { fetchClothSizesService } from "@/lib/services/product.service";

type RouteParams = {
  params: Promise<{
    clothId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { clothId } = await params;

    const sizes = await fetchClothSizesService(clothId);

    return NextResponse.json({
      success: true,
      data: sizes,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cloth sizes",
      },
      {
        status: 500,
      },
    );
  }
}
