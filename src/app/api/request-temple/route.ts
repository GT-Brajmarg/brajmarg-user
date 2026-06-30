import { NextRequest, NextResponse } from "next/server";
import {
  fetchTempleRequestAccessOptions,
  submitTempleRequest,
} from "@/lib/services/requestTemple.service";

export async function GET() {
  try {
    const options = await fetchTempleRequestAccessOptions();

    return NextResponse.json({
      success: true,
      data: options,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch access options",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Request Body:", body);

    const requestData = await submitTempleRequest(body);

    return NextResponse.json({
      success: true,
      data: requestData,
      message: "Temple request submitted successfully.",
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
