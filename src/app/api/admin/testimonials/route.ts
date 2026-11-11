import { NextResponse } from "next/server";
import { getAllTestimonialsAdmin, saveTestimonial } from "@/lib/services/testimonials.service";

export async function GET() {
  try {
    const list = await getAllTestimonialsAdmin();
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.author_name || !body.content) {
      return NextResponse.json(
        { success: false, error: "Le nom et le texte du témoignage sont requis" },
        { status: 400 }
      );
    }
    const saved = await saveTestimonial(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

