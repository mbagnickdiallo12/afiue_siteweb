import { NextResponse } from "next/server";
import { updateCandidatureStatus, deleteCandidature } from "@/lib/services/candidatures.service";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateCandidatureStatus(id, body.status, body.admin_notes);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Dossier non trouvé" }, { status: 404 });
    }
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
    const deleted = await deleteCandidature(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Dossier non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Dossier supprimé" });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

