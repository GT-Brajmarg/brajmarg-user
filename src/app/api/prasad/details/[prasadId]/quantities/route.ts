import { NextRequest, NextResponse } from "next/server";
import { fetchPrasadQuantityOptionsService } from "@/lib/services/prasad.service";

type RouteParams = {
  params: Promise<{
    prasadId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { prasadId } = await params;

    const quantities = await fetchPrasadQuantityOptionsService(prasadId);

    return NextResponse.json({
      success: true,
      data: quantities,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch quantity options",
      },
      {
        status: 500,
      },
    );
  }
}
