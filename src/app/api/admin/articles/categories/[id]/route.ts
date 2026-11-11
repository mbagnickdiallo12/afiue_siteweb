import { NextResponse } from "next/server";
import { saveCategory, deleteCategory } from "@/lib/services/articles.service";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await saveCategory({ ...body, id });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur de mise à jour de la catégorie" },
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
    const deleted = await deleteCategory(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Catégorie introuvable ou déjà supprimée" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Catégorie supprimée avec succès",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}

