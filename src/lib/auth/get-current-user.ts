import { NextRequest } from "next/server";

export function getCurrentUserFromRequest(_request: NextRequest) {
  const userId = process.env.TEMP_USER_ID;

  if (!userId) {
    throw new Error("TEMP_USER_ID is missing in environment variables.");
  }

  return {
    userId,
  };
}
