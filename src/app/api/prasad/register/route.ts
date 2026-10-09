import { NextRequest, NextResponse } from "next/server";
import { registerPrasadService } from "@/lib/services/prasad.service";
import { PrasadOrderPayload } from "@/types/prasad";

export async function POST(request: NextRequest) {
  try {
    const payload: PrasadOrderPayload = await request.json();

    const order = await registerPrasadService(payload);

    return NextResponse.json({
      success: true,
      data: order,
      message: "Prasad order created successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create prasad order",
      },
      {
        status: 500,
      },
    );
  }
}
