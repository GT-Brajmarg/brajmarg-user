import { NextRequest, NextResponse } from "next/server";
import { registerFrameOrderService } from "@/lib/services/product.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const order = await registerFrameOrderService(body);

    return NextResponse.json({
      success: true,
      data: order,
      message: "Frame order placed successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to place frame order",
      },
      {
        status: 500,
      },
    );
  }
}
