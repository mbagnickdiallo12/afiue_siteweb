import { NextResponse } from "next/server";
import {
  readSophieStoreAsync,
  updateSophieConfig,
} from "@/lib/services/sophie.service";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await readSophieStoreAsync();
  return NextResponse.json({
    ...store,
    ai_connected: Boolean(
      process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY
    ),
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const config = await updateSophieConfig({
      ...(typeof body.is_enabled === "boolean" && {
        is_enabled: body.is_enabled,
      }),
      ...(typeof body.welcome_message === "string" && {
        welcome_message: body.welcome_message,
      }),
      ...(Array.isArray(body.suggestions) && {
        suggestions: body.suggestions
          .filter((s: unknown) => typeof s === "string" && s.trim())
          .slice(0, 6),
      }),
      ...(typeof body.extra_instructions === "string" && {
        extra_instructions: body.extra_instructions,
      }),
    });
    return NextResponse.json({ config });
  } catch (error) {
    console.error("API PUT /api/admin/sophie error:", error);
    return NextResponse.json(
      { error: "Mise à jour impossible" },
      { status: 500 }
    );
  }
}
