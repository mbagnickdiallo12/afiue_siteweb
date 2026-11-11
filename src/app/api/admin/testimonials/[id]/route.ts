import { NextResponse } from "next/server";
import { saveTestimonial, deleteTestimonial } from "@/lib/services/testimonials.service";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await saveTestimonial({ ...body, id });
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
    const deleted = await deleteTestimonial(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Témoignage non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Témoignage supprimé avec succès" });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

