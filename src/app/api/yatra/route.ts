import { NextResponse } from "next/server";
import { fetchYatras } from "@/lib/services/yatra.service";

export async function GET() {
  try {
    const yatras = await fetchYatras();

    return NextResponse.json({
      success: true,
      data: yatras,
    });
  } catch (error) {
    console.error("GET /api/yatra", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch yatra packages",
      },
      {
        status: 500,
      },
    );
  }
}
