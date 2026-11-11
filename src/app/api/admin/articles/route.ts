import { NextResponse } from "next/server";
import { getAllArticlesAdmin, saveArticle } from "@/lib/services/articles.service";

export async function GET() {
  try {
    const articles = await getAllArticlesAdmin();
    return NextResponse.json({ success: true, data: articles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la récupération des articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Le titre de l'article est obligatoire" },
        { status: 400 }
      );
    }
    const saved = await saveArticle(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de l'enregistrement de l'article" },
      { status: 500 }
    );
  }
}

