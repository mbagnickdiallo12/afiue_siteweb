import { NextResponse } from "next/server";
import { deleteKnowledgeItem, updateKnowledgeItem } from "@/lib/services/sophie.service";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const item = updateKnowledgeItem(id, {
      ...(typeof body.title === "string" && { title: body.title }),
      ...(typeof body.content === "string" && { content: body.content }),
      ...(typeof body.category === "string" && { category: body.category }),
      ...(typeof body.is_active === "boolean" && { is_active: body.is_active }),
    });
    if (!item) return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });
    return NextResponse.json({ item });
  } catch (error) {
    console.error("API PUT /api/admin/sophie/knowledge/[id] error:", error);
    return NextResponse.json({ error: "Mise à jour impossible" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ok = deleteKnowledgeItem(id);
  if (!ok) return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });
  return NextResponse.json({ success: true });
}

