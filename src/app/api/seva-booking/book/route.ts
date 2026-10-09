import { NextRequest, NextResponse } from "next/server";
import { registerSeva } from "@/lib/services/sevaBooking.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      templeId,
      sevaItemId,
      slotId,
      registrationDate,
      devoteeName,
      devoteePhone,
      devoteeGotra,
      bookingFor,
      whatsappUpdates,
      notes,
    } = body;

    if (!templeId) {
      return NextResponse.json(
        {
          success: false,
          message: "Temple ID is required.",
        },
        { status: 400 },
      );
    }

    if (!sevaItemId) {
      return NextResponse.json(
        {
          success: false,
          message: "Seva ID is required.",
        },
        { status: 400 },
      );
    }

    if (!slotId) {
      return NextResponse.json(
        {
          success: false,
          message: "Slot ID is required.",
        },
        { status: 400 },
      );
    }

    if (!registrationDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration date is required.",
        },
        { status: 400 },
      );
    }

    if (!devoteeName) {
      return NextResponse.json(
        {
          success: false,
          message: "Devotee name is required.",
        },
        { status: 400 },
      );
    }

    if (!devoteePhone) {
      return NextResponse.json(
        {
          success: false,
          message: "Devotee phone is required.",
        },
        { status: 400 },
      );
    }

    const booking = await registerSeva({
      templeId,
      sevaItemId,
      slotId,
      registrationDate,
      devoteeName,
      devoteePhone,
      devoteeGotra,
      bookingFor,
      whatsappUpdates,
      notes,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Seva booked successfully.",
        data: booking,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Book Seva Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to book seva.",
      },
      {
        status: 500,
      },
    );
  }
}
