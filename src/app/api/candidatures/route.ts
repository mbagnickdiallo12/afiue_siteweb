import { NextResponse } from "next/server";
import { submitCandidature } from "@/lib/services/candidatures.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitCandidature(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Erreur de validation des données" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      reference_code: result.reference_code,
      message:
        "Votre dossier de candidature a été enregistré avec succès. Conservez précieusement votre code de référence.",
    });
  } catch (err) {
    console.error("Candidature submission error:", err);
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors de l'enregistrement." },
      { status: 500 }
    );
  }
}
