import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllPartnersAdmin, savePartner } from "@/lib/services/partners.service";

export async function GET() {
  try {
    const partners = await getAllPartnersAdmin();
    return NextResponse.json({ success: true, data: partners });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la récupération des partenaires" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Le nom du partenaire est obligatoire" },
        { status: 400 }
      );
    }
    const saved = await savePartner(body);
    revalidatePath("/");
    revalidatePath("/admin/partenaires");
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de l'enregistrement du partenaire" },
      { status: 500 }
    );
  }
}

