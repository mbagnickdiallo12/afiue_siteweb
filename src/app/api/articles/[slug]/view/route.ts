import { NextRequest, NextResponse } from "next/server";
import { incrementArticleViewCount } from "@/lib/services/articles.service";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Slug manquant" }, { status: 400 });
    }

    const updated = await incrementArticleViewCount(slug);
    return NextResponse.json({ success: true, view_count: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur interne" },
      { status: 500 }
    );
  }
}
