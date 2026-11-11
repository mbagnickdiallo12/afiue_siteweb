import { NextResponse } from "next/server";
import { getCandidatures } from "@/lib/services/candidatures.service";
import { generateDossierPdf } from "@/lib/services/pdf-dossier.service";
import { DossierCandidatureData } from "@/types/database";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const candidatures = await getCandidatures();
    const candidature = candidatures.find((c) => c.id === id || c.reference_code === id);

    if (!candidature) {
      return NextResponse.json({ error: "Candidature introuvable." }, { status: 404 });
    }

    // Use full dossier_data if available, otherwise reconstruct from core fields
    const dossierData: DossierCandidatureData = candidature.dossier_data || {
      programme_type: candidature.formation?.level === "master" ? "master" : "initiale_licence",
      niveau: candidature.formation?.level === "master" ? "master_1" : "licence_1",
      domaine: "Sciences Économiques et de Gestion",
      mention: candidature.formation?.title || "Formation Professionnelle",
      specialite: candidature.formation?.title || "",
      civilite: "M.",
      nom: candidature.last_name,
      prenom: candidature.first_name,
      date_naissance: candidature.birth_date,
      lieu_naissance: candidature.birth_place,
      nationalite: candidature.country || "Sénégalaise",
      adresse: candidature.city ? `Dakar, ${candidature.city}` : "Dakar",
      ville: candidature.city || "Dakar",
      telephone: candidature.phone,
      portable: candidature.phone,
      email: candidature.email,
      pere: {
        nom_prenom: "",
        profession: "",
        adresse: "",
        email: "",
        telephone: "",
      },
      mere: {
        nom_prenom: "",
        profession: "",
        adresse: "",
        email: "",
        telephone: "",
      },
      autre_tuteur: {
        nom_prenom: "",
        profession: "",
        adresse: "",
        email: "",
        telephone: "",
      },
      parcours: [
        {
          annee: "2024-2025",
          diplome: candidature.last_diploma || "Baccalauréat",
          etablissement: candidature.previous_school || "Lycée",
          date_obtention: "2025",
        },
      ],
      langue_1: { nom: "Français", niveau: "eleve" },
      langue_2: { nom: "Anglais", niveau: "moyen" },
      langue_3: { nom: "", niveau: "" },
      langue_autres: { nom: "", niveau: "" },
      sources_connaissance: ["site_internet", "reseaux_sociaux"],
      motivations_texte: `Candidature soumise en ligne pour la formation ${candidature.formation?.title || "AFI-L'UE"}.\n\nProjet professionnel : Intégrer l'excellence pédagogique d'AFI-L'Université de l'Entreprise pour acquérir des compétences directement opérationnelles en entreprise.`,
      attestation_nom_complet: `${candidature.first_name} ${candidature.last_name}`,
      attestation_lieu: "Dakar",
      attestation_date: new Date(candidature.created_at).toLocaleDateString("fr-FR"),
      attestation_lu_et_approuve: true,
      reference_code: candidature.reference_code,
    } as any;

    const pdfBytes = await generateDossierPdf(dossierData);

    const safeFilename = `Dossier-Candidature-AFI-${candidature.reference_code}-${candidature.last_name}.pdf`
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
    console.error("PDF download error:", err);
    return NextResponse.json(
      { error: "Impossible de générer le dossier de candidature en PDF." },
      { status: 500 }
    );
  }
}

