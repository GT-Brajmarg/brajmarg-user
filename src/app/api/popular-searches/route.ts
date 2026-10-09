import { NextResponse } from "next/server";

import { getPopularSearchesService } from "@/lib/services/popularSearchService";

export async function GET() {
  try {
    const searches = await getPopularSearchesService();

    return NextResponse.json(searches);
  } catch (error) {
    console.error("Popular searches error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch popular searches",
      },
      {
        status: 500,
      },
    );
  }
}
