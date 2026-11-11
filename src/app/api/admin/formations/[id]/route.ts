import { NextResponse } from "next/server";
import { saveFormation, deleteFormation, getAllFormationsAdmin } from "@/lib/services/formations.service";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const all = await getAllFormationsAdmin();
    const found = all.find((f) => f.id === id || f.slug === id);
    if (!found) {
      return NextResponse.json({ success: false, error: "Formation non trouvée" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: found });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await saveFormation({ ...body, id });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteFormation(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Formation non trouvée ou déjà supprimée" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Formation supprimée avec succès" });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

