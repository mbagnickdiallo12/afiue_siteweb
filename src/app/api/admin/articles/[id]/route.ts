import { NextResponse } from "next/server";
import { saveArticle, deleteArticle } from "@/lib/services/articles.service";
import { readCmsStore } from "@/lib/services/cms-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const store = readCmsStore();
    const article = store.articles.find((a) => a.id === id);
    if (!article) {
      return NextResponse.json({ success: false, error: "Article non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveArticle({ ...body, id });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteArticle(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Article introuvable" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Article supprimé avec succès" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

