import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllStudentLifeAdmin, saveStudentLifeItem } from "@/lib/services/student-life.service";

export async function GET() {
  try {
    const items = await getAllStudentLifeAdmin();
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la récupération des éléments Vie Étudiante" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Le titre est obligatoire" },
        { status: 400 }
      );
    }
    const saved = await saveStudentLifeItem(body);
    revalidatePath("/");
    revalidatePath("/vie-etudiante");
    revalidatePath("/admin/vie-etudiante");
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de l'enregistrement de l'élément" },
      { status: 500 }
    );
  }
}

