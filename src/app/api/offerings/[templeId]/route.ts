// app/api/offerings/[templeId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { fetchTempleOfferingsService } from "@/lib/services/offering.service";

type RouteParams = {
  params: Promise<{
    templeId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { templeId } = await params;

    const offerings = await fetchTempleOfferingsService(templeId);

    return NextResponse.json({
      success: true,
      data: offerings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch offerings",
      },
      {
        status: 500,
      },
    );
  }
}
