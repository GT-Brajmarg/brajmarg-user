import { NextRequest, NextResponse } from "next/server";
import { fetchShopFiltersService } from "@/lib/services/shopFilter.service";

export async function GET(request: NextRequest) {
  try {
    const categories = request.nextUrl.searchParams.getAll("category");

    if (!categories.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No categories selected",
        },
        {
          status: 400,
        },
      );
    }

    const data = await fetchShopFiltersService(categories);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch filters",
      },
      {
        status: 500,
      },
    );
  }
}
