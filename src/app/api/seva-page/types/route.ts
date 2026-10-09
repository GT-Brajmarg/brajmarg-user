import { NextResponse } from "next/server";
import { fetchSevaTypes } from "@/lib/services/sevaPage.service";

export async function GET() {
  try {
    const types = await fetchSevaTypes();

    return NextResponse.json({
      success: true,
      data: types,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch seva types.",
      },
      {
        status: 500,
      },
    );
  }
}
