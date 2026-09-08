import { NextResponse } from "next/server";
import { sendOtpService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();

    const result = await sendOtpService(identifier);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
