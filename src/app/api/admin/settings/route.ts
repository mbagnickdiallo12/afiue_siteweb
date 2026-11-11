import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/services/settings.service";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la récupération des paramètres" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, data: updated, message: "Paramètres enregistrés avec succès" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la mise à jour des paramètres" },
      { status: 500 }
    );
  }
}

