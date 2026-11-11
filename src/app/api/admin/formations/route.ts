import { NextResponse } from "next/server";
import { getAllFormationsAdmin, saveFormation } from "@/lib/services/formations.service";

export async function GET() {
  try {
    const formations = await getAllFormationsAdmin();
    return NextResponse.json({ success: true, data: formations });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Le titre de la formation est requis" },
        { status: 400 }
      );
    }
    const saved = await saveFormation(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

