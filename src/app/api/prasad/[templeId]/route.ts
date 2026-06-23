// app/api/prasad/[templeId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { fetchTemplePrasadService } from "@/lib/services/prasad.service";

type RouteParams = {
  params: Promise<{
    templeId: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { templeId } = await params;

    const prasad = await fetchTemplePrasadService(templeId);

    return NextResponse.json({
      success: true,
      data: prasad,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch prasad items",
      },
      { status: 500 },
    );
  }
}
