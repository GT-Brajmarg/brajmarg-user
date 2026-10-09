import { NextRequest, NextResponse } from "next/server";
import { fetchPrasadDetailsService } from "@/lib/services/prasad.service";

type RouteParams = {
  params: Promise<{
    prasadId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { prasadId } = await params;

    const prasad = await fetchPrasadDetailsService(prasadId);

    return NextResponse.json({
      success: true,
      data: prasad,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch prasad details",
      },
      {
        status: 500,
      },
    );
  }
}
