import { NextResponse } from "next/server";
import { readSophieStore } from "@/lib/services/sophie.service";

export const dynamic = "force-dynamic";

/** Configuration publique du widget (aucune donnée sensible). */
export async function GET() {
  const { config } = readSophieStore();
  return NextResponse.json({
    is_enabled: config.is_enabled,
    welcome_message: config.welcome_message,
    suggestions: config.suggestions,
  });
}

