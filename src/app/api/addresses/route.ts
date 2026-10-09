import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth/get-current-user";
import {
  createUserAddressService,
  getUserAddressesService,
} from "@/lib/services/address.service";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getCurrentUserFromRequest(request);

    const addresses = await getUserAddressesService(userId);

    return NextResponse.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch saved addresses.",
      },
      { status: 401 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getCurrentUserFromRequest(request);
    const body = await request.json();

    const address = await createUserAddressService(userId, body);

    return NextResponse.json(
      {
        success: true,
        data: address,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to save address.",
      },
      { status: 400 },
    );
  }
}
