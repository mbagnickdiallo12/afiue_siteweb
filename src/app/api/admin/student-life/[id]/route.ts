import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveStudentLifeItem, deleteStudentLifeItem } from "@/lib/services/student-life.service";
import { readCmsStore } from "@/lib/services/cms-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const store = readCmsStore();
    const item = store.student_life.find((s) => s.id === id);
    if (!item) {
      return NextResponse.json({ success: false, error: "Élément non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
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
    const updated = await saveStudentLifeItem({ ...body, id });
    revalidatePath("/");
    revalidatePath("/vie-etudiante");
    revalidatePath("/admin/vie-etudiante");
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
    const deleted = await deleteStudentLifeItem(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Élément introuvable" }, { status: 404 });
    }
    revalidatePath("/");
    revalidatePath("/vie-etudiante");
    revalidatePath("/admin/vie-etudiante");
    return NextResponse.json({ success: true, message: "Élément supprimé avec succès" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}

