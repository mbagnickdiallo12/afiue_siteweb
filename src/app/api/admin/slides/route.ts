import { NextResponse } from "next/server";
import { getAllSlidesAdmin, saveSlide } from "@/lib/services/slides.service";

export async function GET() {
  try {
    const slides = await getAllSlidesAdmin();
    return NextResponse.json({ success: true, data: slides });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la récupération des slides" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Le titre de la slide est obligatoire" },
        { status: 400 }
      );
    }
    const saved = await saveSlide(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de l'enregistrement de la slide" },
      { status: 500 }
    );
  }
}

