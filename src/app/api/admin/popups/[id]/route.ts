import { NextResponse } from "next/server";
import {
  updateEventPopupSlide,
  deleteEventPopupSlide,
} from "@/lib/services/event-popup.service";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateEventPopupSlide(id, body);
    if (!updated) {
      return NextResponse.json(
        { error: "Affiche introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ slide: updated });
  } catch (error) {
    console.error("API PUT /api/admin/popups/[id] error:", error);
    return NextResponse.json(
      { error: "Impossible de modifier l'affiche" },
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
    const success = await deleteEventPopupSlide(id);
    if (!success) {
      return NextResponse.json(
        { error: "Affiche introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API DELETE /api/admin/popups/[id] error:", error);
    return NextResponse.json(
      { error: "Impossible de supprimer l'affiche" },
      { status: 500 }
    );
  }
}
