import { NextResponse } from "next/server";
import { readSophieStoreAsync } from "@/lib/services/sophie.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const { config } = await readSophieStoreAsync();
  return NextResponse.json({
    is_enabled: config.is_enabled,
    welcome_message: config.welcome_message,
    suggestions: config.suggestions,
  });
}
