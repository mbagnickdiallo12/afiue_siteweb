import { NextResponse } from "next/server";
import { answerSophie, readSophieStore, type SophieChatMessage } from "@/lib/services/sophie.service";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Autorise jusqu'à 60s sur Vercel pour les réponses IA sans timeout

export async function GET() {
  return NextResponse.json({
    status: "ok",
    has_gemini_key: Boolean(process.env.GEMINI_API_KEY),
    key_prefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.slice(0, 7) + "..." : "none",
  });
}

export async function POST(request: Request) {
  try {
    if (!readSophieStore().config.is_enabled) {
      return NextResponse.json({ error: "Sophie est momentanément indisponible." }, { status: 503 });
    }

    const body = await request.json().catch(() => ({}));
    let messages: SophieChatMessage[] = [];

    if (Array.isArray(body.messages) && body.messages.length > 0) {
      messages = body.messages
        .filter((m: unknown) => typeof m === "object" && m !== null)
        .map((m: { role?: unknown; content?: unknown }) => ({
          role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
          content: String(m.content || "").slice(0, 2000),
        }))
        .filter((m: SophieChatMessage) => m.content.trim().length > 0);
    } else if (typeof body.message === "string" && body.message.trim().length > 0) {
      const history: SophieChatMessage[] = Array.isArray(body.history)
        ? body.history
            .filter((m: unknown) => typeof m === "object" && m !== null)
            .map((m: { role?: unknown; content?: unknown }) => ({
              role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
              content: String(m.content || "").slice(0, 2000),
            }))
        : [];
      messages = [...history, { role: "user" as const, content: body.message.trim() }];
    }

    if (messages.length === 0) {
      return NextResponse.json({ error: "Message invalide." }, { status: 400 });
    }

    const { reply, sources } = await answerSophie(messages.slice(-12));
    return NextResponse.json({ reply, sources });
  } catch (error) {
    console.error("API POST /api/sophie/chat error:", error);
    return NextResponse.json(
      { error: "Sophie n'a pas pu répondre. Réessayez dans un instant." },
      { status: 500 },
    );
  }
}
