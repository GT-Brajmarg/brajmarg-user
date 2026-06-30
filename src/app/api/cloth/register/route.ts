import { NextRequest, NextResponse } from "next/server";
import { registerClothOrderService } from "@/lib/services/product.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const order = await registerClothOrderService(body);

    return NextResponse.json({
      success: true,
      data: order,
      message: "Cloth order placed successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to place cloth order",
      },
      {
        status: 500,
      },
    );
  }
}
