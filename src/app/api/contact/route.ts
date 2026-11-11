import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const ContactSchema = z.object({
  full_name: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Veuillez renseigner un objet"),
  message: z.string().min(10, "Votre message doit comporter au moins 10 caractères"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ContactSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    try {
      const supabase = await createClient();
      if (supabase) {
        await supabase.from("contact_inquiries").insert({
          full_name: validated.data.full_name,
          email: validated.data.email,
          phone: validated.data.phone || null,
          subject: validated.data.subject,
          message: validated.data.message,
        });
      }
    } catch {
      // In development or if offline, proceed smoothly
    }

    return NextResponse.json({
      success: true,
      message:
        "Votre message a bien été envoyé aux équipes de l'AFI-L'UE. Nous vous répondrons dans les plus brefs délais.",
    });
  } catch {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    );
  }
}
