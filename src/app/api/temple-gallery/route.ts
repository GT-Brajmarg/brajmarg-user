import { NextRequest, NextResponse } from "next/server";
import { fetchTempleGallery } from "@/lib/services/templeGalleryService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const templeId = searchParams.get("templeId");

    if (!templeId) {
      return NextResponse.json(
        {
          success: false,
          message: "Temple ID is required",
        },
        {
          status: 400,
        },
      );
    }

    const gallery = await fetchTempleGallery(templeId);

    return NextResponse.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch temple gallery",
      },
      {
        status: 500,
      },
    );
  }
}
