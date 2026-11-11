import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { savePartner, deletePartner } from "@/lib/services/partners.service";
import { readCmsStore } from "@/lib/services/cms-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const store = readCmsStore();
    const partner = store.partners.find((p) => p.id === id);
    if (!partner) {
      return NextResponse.json({ success: false, error: "Partenaire non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: partner });
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
    const updated = await savePartner({ ...body, id });
    revalidatePath("/");
    revalidatePath("/admin/partenaires");
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
    const deleted = await deletePartner(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Partenaire introuvable" }, { status: 404 });
    }
    revalidatePath("/");
    revalidatePath("/admin/partenaires");
    return NextResponse.json({ success: true, message: "Partenaire supprimé avec succès" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

