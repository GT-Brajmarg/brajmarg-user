import { NextResponse } from "next/server";
import { fetchHomeData } from "@/lib/services/home.service";

export async function GET() {
  try {
    const homeData = await fetchHomeData();

    return NextResponse.json({
      success: true,
      data: homeData,
    });
  } catch (error) {
    console.error("GET /api/home", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch homepage data",
      },
      {
        status: 500,
      },
    );
  }
}
