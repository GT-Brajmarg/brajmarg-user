import { NextResponse } from "next/server";
import { fetchTemples } from "@/lib/services/temple.service";

export async function GET() {
  try {
    const temples = await fetchTemples();

    return NextResponse.json({
      success: true,
      data: temples,
    });
  } catch (error) {
    console.error("GET /api/temples", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch temples",
      },
      {
        status: 500,
      },
    );
  }
}
