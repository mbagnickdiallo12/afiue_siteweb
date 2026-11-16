import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  saveArticle,
  deleteArticle,
  getAllArticlesAdmin,
} from "@/lib/services/articles.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articles = await getAllArticlesAdmin();
    const article = articles.find((a) => a.id === id || a.slug === id);
    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article non trouvé" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 }
    );
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
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 }
    );
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
      return NextResponse.json(
        { success: false, error: "Article introuvable" },
        { status: 404 }
      );
    }
    revalidatePath("/", "layout");
    return NextResponse.json({
      success: true,
      message: "Article supprimé avec succès",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 }
    );
  }
}
