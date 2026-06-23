import { NextRequest, NextResponse } from "next/server";
import { fetchTempleDetails } from "@/lib/services/temple.service";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // console.log("Slug received:", id);

    const data = await fetchTempleDetails(id);

    // console.log("Temple found:", data.temple);

    if (!data.temple) {
      return NextResponse.json(
        {
          success: false,
          message: "Temple not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET /api/temples/[id]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch temple details",
      },
      {
        status: 500,
      },
    );
  }
}
