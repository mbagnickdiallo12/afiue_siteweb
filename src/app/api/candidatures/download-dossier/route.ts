import { NextResponse } from "next/server";
import { generateDossierPdf } from "@/lib/services/pdf-dossier.service";
import { DossierCandidatureData } from "@/types/database";

export async function POST(request: Request) {
  try {
    const data: DossierCandidatureData = await request.json();

    if (!data.nom || !data.prenom) {
      return NextResponse.json(
        { error: "Les informations de nom et prénom sont obligatoires." },
        { status: 400 }
      );
    }

    const pdfBytes = await generateDossierPdf(data);

    const safeFilename = `Dossier-Candidature-AFI-2026-2027-${data.nom.toUpperCase()}-${data.prenom}.pdf`
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9.-]/g, "_");

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err: any) {
    console.error("Instant PDF generation error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création du PDF." },
      { status: 500 }
    );
  }
}

