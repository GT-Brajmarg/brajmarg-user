import { NextRequest, NextResponse } from "next/server";
import { fetchSevaDetails } from "@/lib/services/sevaBooking.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const slug = searchParams.get("slug");
    const sevaId = searchParams.get("sevaId");

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Temple slug is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!sevaId) {
      return NextResponse.json(
        {
          success: false,
          message: "Seva ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const seva = await fetchSevaDetails(slug, sevaId);

    if (!seva) {
      return NextResponse.json(
        {
          success: false,
          message: "Seva not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data: seva,
    });
  } catch (error) {
    console.error("Fetch Seva Details Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
