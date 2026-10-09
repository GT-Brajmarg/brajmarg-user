import { NextResponse } from "next/server";
import { validateTempLogin } from "@/lib/auth/temp-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");

    if (!phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number and password are required.",
        },
        { status: 400 },
      );
    }

    const isValidUser = validateTempLogin(phone, password);

    if (!isValidUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number or password.",
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          id: "temp-brajmarg-user",
          phone: phone.replace(/\D/g, "").slice(-10),
          role: "USER",
          name: "Brajmarg User",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while logging in.",
      },
      { status: 500 },
    );
  }
}
