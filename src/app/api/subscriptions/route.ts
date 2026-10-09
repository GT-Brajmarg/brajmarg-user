import { NextResponse } from "next/server";
import { fetchSubscriptionPlans } from "@/lib/services/subscription.service";

export async function GET() {
  try {
    const plans = await fetchSubscriptionPlans();

    return NextResponse.json({
      success: true,
      data: plans,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch plans",
      },
      {
        status: 500,
      },
    );
  }
}
