// src/app/api/live-darshan/route.ts

import { NextResponse } from "next/server";
import { fetchLiveDarshan } from "@/lib/services/live-darshan.service";

export async function GET() {
  try {
    const data = await fetchLiveDarshan();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch live darshan",
      },
      {
        status: 500,
      },
    );
  }
}
