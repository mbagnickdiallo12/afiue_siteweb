import { NextResponse } from "next/server";
import {
  getAllCategoriesAdmin,
  saveCategory,
} from "@/lib/services/articles.service";

export async function GET() {
  try {
    const categories = await getAllCategoriesAdmin();
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur de chargement des catégories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Le nom de la catégorie est obligatoire" },
        { status: 400 }
      );
    }
    const saved = await saveCategory(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la création de la catégorie" },
      { status: 500 }
    );
  }
}

