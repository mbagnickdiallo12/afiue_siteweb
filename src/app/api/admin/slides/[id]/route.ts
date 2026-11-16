import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  saveSlide,
  deleteSlide,
  getAllSlidesAdmin,
} from "@/lib/services/slides.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const slides = await getAllSlidesAdmin();
    const slide = slides.find((s) => s.id === id);
    if (!slide) {
      return NextResponse.json(
        { success: false, error: "Slide non trouvée" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: slide });
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
    const updated = await saveSlide({ ...body, id });
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
    const deleted = await deleteSlide(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Slide introuvable" },
        { status: 404 }
      );
    }
    revalidatePath("/", "layout");
    return NextResponse.json({
      success: true,
      message: "Slide supprimée avec succès",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 }
    );
  }
}
