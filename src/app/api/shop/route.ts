import { NextRequest, NextResponse } from "next/server";
import { fetchShopProductsService } from "@/lib/services/shop.service";

export async function GET(request: NextRequest) {
  try {
    const categories = request.nextUrl.searchParams.getAll("category");

    const collection =
      request.nextUrl.searchParams.get("collection") || undefined;

    const query = request.nextUrl.searchParams.get("q")?.trim() || undefined;

    // At least one filter should exist
    if (categories.length === 0 && !collection && !query) {
      return NextResponse.json(
        {
          success: false,
          message: "Category, collection or search query is required",
        },
        { status: 400 },
      );
    }

    const data = await fetchShopProductsService({
      categories,
      collection,
      query,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("SHOP API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch shop products",
      },
      { status: 500 },
    );
  }
}
