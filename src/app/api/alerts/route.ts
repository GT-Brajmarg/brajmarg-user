import { NextResponse } from "next/server";
import { fetchAlerts } from "@/lib/services/alert.service";

export async function GET() {
  try {
    const alerts = await fetchAlerts();

    return NextResponse.json({
      success: true,
      data: alerts,
    });
  } catch (error) {
    console.error("GET /api/alerts", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch alerts",
      },
      {
        status: 500,
      },
    );
  }
}
