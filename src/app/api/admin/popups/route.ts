import { NextResponse } from "next/server";
import {
  getEventPopupConfig,
  updateEventPopupConfig,
  addEventPopupSlide,
} from "@/lib/services/event-popup.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await getEventPopupConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error("API GET /api/admin/popups error:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer la configuration des popups" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateEventPopupConfig(body);
    return NextResponse.json({ config: updated });
  } catch (error) {
    console.error("API PUT /api/admin/popups error:", error);
    return NextResponse.json(
      { error: "Impossible de mettre à jour la configuration" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.image_url) {
      return NextResponse.json(
        { error: "Le titre et l'image de l'affiche sont obligatoires" },
        { status: 400 }
      );
    }

    const newSlide = await addEventPopupSlide({
      title: body.title,
      badge: body.badge || "Événement",
      subtitle: body.subtitle || "",
      image_url: body.image_url,
      cta_text: body.cta_text || "En savoir plus",
      cta_url: body.cta_url || "/formations",
      show_cta: body.show_cta !== false,
      target_date: body.target_date || null,
      show_countdown: Boolean(body.show_countdown),
      order_index: body.order_index ?? 99,
      is_active: body.is_active !== false,
    });

    return NextResponse.json({ slide: newSlide }, { status: 201 });
  } catch (error) {
    console.error("API POST /api/admin/popups error:", error);
    return NextResponse.json(
      { error: "Impossible d'ajouter l'affiche" },
      { status: 500 }
    );
  }
}
