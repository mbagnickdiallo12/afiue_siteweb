import { NextResponse } from "next/server";
import { addKnowledgeItem, type SophieCategory } from "@/lib/services/sophie.service";

export const dynamic = "force-dynamic";

const CATEGORIES: SophieCategory[] = [
  "admissions",
  "formations",
  "frais",
  "campus",
  "vie_etudiante",
  "general",
  "document",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    if (!title || content.length < 10) {
      return NextResponse.json(
        { error: "Un titre et un contenu (10 caractères minimum) sont requis." },
        { status: 400 },
      );
    }
    const category = CATEGORIES.includes(body.category) ? body.category : "general";
    const item = addKnowledgeItem({ title, content, category });
    return NextResponse.json({ item });
  } catch (error) {
    console.error("API POST /api/admin/sophie/knowledge error:", error);
    return NextResponse.json({ error: "Ajout impossible" }, { status: 500 });
  }
}

