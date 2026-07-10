import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth/get-current-user";
import {
  deleteUserAddressService,
  updateUserAddressService,
} from "@/lib/services/address.service";

type RouteContext = {
  params: Promise<{
    addressId: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { addressId } = await params;
    const { userId } = getCurrentUserFromRequest(request);
    const body = await request.json();

    const address = await updateUserAddressService(userId, addressId, body);

    return NextResponse.json({
      success: true,
      data: address,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to update address.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { addressId } = await params;
    const { userId } = getCurrentUserFromRequest(request);

    await deleteUserAddressService(userId, addressId);

    return NextResponse.json({
      success: true,
      data: {
        id: addressId,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to delete address.",
      },
      { status: 400 },
    );
  }
}
