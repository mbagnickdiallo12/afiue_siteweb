import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from "pdf-lib";
import { DossierCandidatureData } from "@/types/database";

// =============================================================================
// COLOR PALETTE (AFI-L'UE Institutional & Executive Standard)
// Matches authentic Adobe Illustrator color scheme
// =============================================================================
const C_NAVY = rgb(11 / 255, 18 / 255, 33 / 255);        // #0B1221 - Deep Academic Navy
const C_RED = rgb(173 / 255, 27 / 255, 26 / 255);        // #AD1B1A - AFI Crimson Red
const C_WHITE = rgb(1, 1, 1);                             // #FFFFFF - Pure White
const C_MUTED = rgb(100 / 255, 116 / 255, 139 / 255);    // #64748B - Slate Muted

// =============================================================================
// TYPOGRAPHY & STRING SANITIZATION HELPERS
// =============================================================================
function sanitizeText(str: string | undefined | null): string {
  if (!str) return "";
  return String(str)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00A0/g, " ")
    .replace(/[\u2013\u2014]/g, "-")
    .trim();
}

function formatBirthDate(raw: string | undefined | null): string {
  const clean = sanitizeText(raw);
  if (!clean) return "";
  // Match YYYY-MM-DD or YYYY/MM/DD
  const isoMatch = clean.match(/^(\d{4})\s*[-/.]\s*(\d{1,2})\s*[-/.]\s*(\d{1,2})/);
  if (isoMatch) {
    const [, yyyy, mm, dd] = isoMatch;
    return `${dd.padStart(2, "0")} / ${mm.padStart(2, "0")} / ${yyyy}`;
  }
  // Match DD/MM/YYYY or DD-MM-YYYY
  const frMatch = clean.match(/^(\d{1,2})\s*[-/.]\s*(\d{1,2})\s*[-/.]\s*(\d{4})/);
  if (frMatch) {
    const [, dd, mm, yyyy] = frMatch;
    return `${dd.padStart(2, "0")} / ${mm.padStart(2, "0")} / ${yyyy}`;
  }
  return clean;
}

function normalizeInputData(data: any): DossierCandidatureData {
  return {
    programme_type:
      data.programme_type ||
      (data.programmeType === "LICENCE_CONTINUE" ? "continue_licence" :
       data.programmeType === "MASTER" ? "master" :
       data.programmeType === "PRESUP" ? "presup" :
       data.programmeType === "E_LEARNING" ? "elearning" :
       data.programmeType === "COURS_WEEKEND" ? "cours_weekend" : "initiale_licence"),
    sous_option:
      data.sous_option ||
      (data.optionPedagogique?.toLowerCase().includes("leader") ? "international_leader" :
       data.optionPedagogique?.toLowerCase().includes("multi") ? "multiprogramme" : ""),
    niveau:
      data.niveau ||
      (data.niveauEtude === "LICENCE_2" ? "licence_2" :
       data.niveauEtude === "LICENCE_3" ? "licence_3" :
       data.niveauEtude === "MASTER_1" ? "master_1" :
       data.niveauEtude === "MASTER_2" ? "master_2" : "licence_1"),
    domaine: data.domaine || "Sciences Économiques et de Gestion",
    mention: data.mention || data.filiere || "Formation Professionnelle",
    specialite: data.specialite || data.filiere || "",
    civilite: (data.civilite === "Monsieur" || data.civilite === "M.") ? "M." :
              (data.civilite === "Madame" || data.civilite === "Mme") ? "Mme" :
              (data.civilite === "Mademoiselle" || data.civilite === "Mlle") ? "Mlle" : "M.",
    nom: data.nom || data.last_name || "",
    prenom: data.prenom || data.first_name || "",
    date_naissance: formatBirthDate(data.date_naissance || data.dateNaissance || data.birth_date || ""),
    lieu_naissance: data.lieu_naissance || data.lieuNaissance || data.birth_place || "",
    nationalite: data.nationalite || data.country || "Sénégalaise",
    adresse: data.adresse || (data.city ? `Dakar, ${data.city}` : "Dakar"),
    adresse_suite: data.adresse_suite || "",
    ville: data.ville || data.city || "Dakar",
    telephone: data.telephone || data.telephone1 || data.phone || "",
    portable: data.portable || data.telephone2 || data.phone || "",
    email: data.email || "",
    pere: data.pere || {
      nom_prenom: data.nomTuteur || "",
      profession: data.professionTuteur || "",
      adresse: data.adresseTuteur || "",
      email: data.emailTuteur || "",
      telephone: data.telephoneTuteur || "",
    },
    mere: data.mere || {
      nom_prenom: data.nomMere || "",
      profession: data.professionMere || "",
      adresse: data.adresseTuteur || "",
      email: "-",
      telephone: data.telephoneMere || "",
    },
    autre_tuteur: data.autre_tuteur,
    parcours: data.parcours || (data.cursus?.map((c: any) => ({
      annee: c.annee || "",
      diplome: c.diplome || "",
      etablissement: c.etablissement || "",
      date_obtention: c.dateMention || c.date_obtention || "",
    }))) || [
      {
        annee: data.anneeObtention ? `${parseInt(data.anneeObtention) - 1}-${data.anneeObtention}` : "2024-2025",
        diplome: data.dernierDiplome || data.last_diploma || "Baccalauréat",
        etablissement: data.etablissementOrigine || data.previous_school || "Lycée",
        date_obtention: data.anneeObtention || "2025",
      },
    ],
    langue_1: data.langue_1 || {
      nom: "Français",
      niveau: (data.niveauFrancais?.toLowerCase() === "moyen" ? "moyen" :
               data.niveauFrancais?.toLowerCase() === "faible" ? "faible" : "eleve") as any,
    },
    langue_2: data.langue_2 || {
      nom: "Anglais",
      niveau: (data.niveauAnglais?.toLowerCase() === "eleve" || data.niveauAnglais?.toLowerCase() === "élevé" ? "eleve" :
               data.niveauAnglais?.toLowerCase() === "faible" ? "faible" : "moyen") as any,
    },
    langue_3: data.langue_3 || {
      nom: data.autreLangue || "Espagnol",
      niveau: (data.niveauEspagnol?.toLowerCase() === "eleve" ? "eleve" : "moyen") as any,
    },
    langue_autres: data.langue_autres,
    sources_connaissance: data.sources_connaissance ||
      (Array.isArray(data.connaissanceAfi) ? data.connaissanceAfi.map((s: string) => {
        const lower = s.toLowerCase();
        if (lower.includes("site")) return "site_internet";
        if (lower.includes("bouche") || lower.includes("famille")) return "bouche_a_oreille";
        if (lower.includes("recommandation") || lower.includes("etudiant")) return "etudiant_afi";
        if (lower.includes("social") || lower.includes("reseau")) return "reseaux_sociaux";
        return "site_internet";
      }) : ["site_internet", "bouche_a_oreille"]),
    motivations_texte: data.motivations_texte || data.lettreMotivation || "",
    attestation_nom_complet: data.attestation_nom_complet || `${data.prenom || data.first_name || ""} ${data.nom || data.last_name || ""}`.trim(),
    attestation_lieu: data.attestation_lieu || "Dakar",
    attestation_date: data.attestation_date || data.dateSoumission || new Date().toLocaleDateString("fr-FR"),
    attestation_lu_et_approuve: true,
    reference_code: data.reference_code || data.reference || "AFI-2026-OFFICIEL",
  } as any;
}

// =============================================================================
// MAIN PDF GENERATOR: Authentic Illustrator Template Dynamic Overlay
// =============================================================================
export async function generateDossierPdf(inputData: DossierCandidatureData | any): Promise<Uint8Array> {
  const data = normalizeInputData(inputData);

  // Load the authentic Adobe Illustrator master PDF template
  const templatePath = path.join(process.cwd(), "public", "templates", "dossier", "Dossier de candidature.pdf");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Le modèle PDF officiel est introuvable à : ${templatePath}`);
  }

  const templateBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(templateBytes);

  // Standard crisp fonts for high legibility
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // ---------------------------------------------------------------------------
  // Helper: clear the entire dotted line segment and write text cleanly
  // Eliminates all trailing dotted lines for executive clarity
  // ---------------------------------------------------------------------------
  function clearDotsAndWrite(
    page: PDFPage,
    text: string | undefined | null,
    clearX: number,
    clearY: number,
    clearWidth: number,
    textX: number,
    textY: number,
    size: number = 10,
    isBold: boolean = false,
    textColor = C_NAVY
  ) {
    const clean = sanitizeText(text);
    if (!clean) return;

    // Erase the full dotted line segment so no dots trail behind
    page.drawRectangle({
      x: clearX,
      y: clearY - 4,
      width: clearWidth,
      height: size + 6,
      color: C_WHITE,
    });

    const font = isBold ? fontBold : fontRegular;
    page.drawText(clean, {
      x: textX,
      y: textY,
      size,
      font,
      color: textColor,
    });
  }

  // ---------------------------------------------------------------------------
  // Helper: draw checkbox mark (crisp bold "X" mathematically centered inside
  // the exact SVG <rect> checkbox bounds)
  // ---------------------------------------------------------------------------
  function drawCheckInSvgBox(
    page: PDFPage,
    boxX: number,
    boxY_svg: number,
    boxSize: number = 12.24,
    fontSize: number = 9.5,
    color = C_RED
  ) {
    const pageHeight = 841.89;
    const boxBottomY = pageHeight - (boxY_svg + boxSize);
    const textW = fontBold.widthOfTextAtSize("X", fontSize);
    const capH = 0.718 * fontSize;
    const x = boxX + (boxSize - textW) / 2;
    const y = boxBottomY + (boxSize - capH) / 2;
    page.drawText("X", {
      x,
      y,
      size: fontSize,
      font: fontBold,
      color,
    });
  }

  // ---------------------------------------------------------------------------
  // Helper: draw filière field (DOMAINE, MENTION, SPÉCIALITÉ) with complete dot
  // clearance, harmonized font size, and automatic 2-line wrapping so text is
  // never truncated or cut off.
  // ---------------------------------------------------------------------------
  function drawFiliereField(
    page: PDFPage,
    labelColonX: number,
    baseY: number,
    value: string,
    fontSize: number = 8.5
  ) {
    const cleanVal = sanitizeText(value).trim();
    if (!cleanVal) return;

    const startX = 395;
    const rightMargin = 581;
    const maxWidth = rightMargin - startX; // ~186 pt

    const fullWidth = fontBold.widthOfTextAtSize(cleanVal, fontSize);

    if (fullWidth <= maxWidth) {
      // Single line: clear all underlying dots from colon to margin
      page.drawRectangle({
        x: labelColonX + 1,
        y: baseY - 6,
        width: rightMargin - (labelColonX + 1),
        height: 16,
        color: C_WHITE,
      });
      page.drawText(cleanVal, {
        x: startX,
        y: baseY,
        size: fontSize,
        font: fontBold,
        color: C_NAVY,
      });
    } else {
      // 2 lines: split words cleanly without cutting off
      const words = cleanVal.split(/\s+/);
      let line1 = "";
      let line2 = "";

      for (const w of words) {
        const test = line1 ? `${line1} ${w}` : w;
        if (fontBold.widthOfTextAtSize(test, fontSize) <= maxWidth && !line2) {
          line1 = test;
        } else {
          line2 = line2 ? `${line2} ${w}` : w;
        }
      }

      // If line 2 still overflows slightly, scale down slightly
      let effectiveFontSize = fontSize;
      const line2Width = fontBold.widthOfTextAtSize(line2, fontSize);
      if (line2Width > maxWidth) {
        effectiveFontSize = Math.max(7.2, Number((fontSize * (maxWidth / line2Width)).toFixed(1)));
      }

      // Erase full 2-line zone covering dots and line space
      page.drawRectangle({
        x: labelColonX + 1,
        y: baseY - 12,
        width: rightMargin - (labelColonX + 1),
        height: 25,
        color: C_WHITE,
      });

      page.drawText(line1, {
        x: startX,
        y: baseY + 3,
        size: effectiveFontSize,
        font: fontBold,
        color: C_NAVY,
      });
      page.drawText(line2, {
        x: startX,
        y: baseY - 8,
        size: effectiveFontSize,
        font: fontBold,
        color: C_NAVY,
      });
    }
  }

  // ===========================================================================
  // PAGE 1 : PROGRAMMES & ÉTAT CIVIL
  // ===========================================================================
  const p1 = pdfDoc.getPage(0);

  // Top Right Dashed Box (bounds: x=395.47..554.80, y_pdf=587.97..659.12, center=475.14)
  // Clear interior strictly inside the dashed border (2pt inset) so all 4 dashed borders remain intact
  const refCode = sanitizeText((data as any).reference_code || "AFI-2026-OFFICIEL");
  const submissionDate = sanitizeText(data.attestation_date || new Date().toLocaleDateString("fr-FR"));
  const topBoxCenterX = 475.14;
  const C_DARK_TEXT = rgb(0.11, 0.11, 0.11);
  const C_FINE_DOTS = rgb(0.74, 0.77, 0.81);

  p1.drawRectangle({
    x: 397.5,
    y: 590,
    width: 155,
    height: 67,
    color: C_WHITE,
  });

  function drawCenteredInTopBox(text: string, y: number, size: number, font: PDFFont, color: any) {
    const w = font.widthOfTextAtSize(text, size);
    p1.drawText(text, {
      x: topBoxCenterX - w / 2,
      y,
      size,
      font,
      color,
    });
  }

  drawCenteredInTopBox(`RÉFÉRENCE : ${refCode}`, 643.5, 8, fontBold, C_NAVY);
  drawCenteredInTopBox("À remplir par AFI-L'UE", 628.5, 9.5, fontRegular, C_DARK_TEXT);
  drawCenteredInTopBox("Dossier reçu le", 615.0, 9.5, fontRegular, C_DARK_TEXT);

  p1.drawLine({
    start: { x: 408, y: 597.5 },
    end: { x: 542, y: 597.5 },
    thickness: 0.6,
    color: C_FINE_DOTS,
    dashArray: [0.8, 2.2],
  });
  drawCenteredInTopBox(submissionDate, 600.0, 9.5, fontBold, C_NAVY);

  // Program Selection Checkbox (20x20 boxes at x=28.36)
  switch (data.programme_type) {
    case "initiale_licence":
      drawCheckInSvgBox(p1, 28.36, 319.83, 20, 13.5);
      break;
    case "continue_licence":
      drawCheckInSvgBox(p1, 28.36, 409.19, 20, 13.5);
      break;
    case "master":
      drawCheckInSvgBox(p1, 28.36, 442.29, 20, 13.5);
      break;
    case "presup":
      drawCheckInSvgBox(p1, 28.36, 475.40, 20, 13.5);
      break;
    case "elearning":
      drawCheckInSvgBox(p1, 28.36, 508.51, 20, 13.5);
      break;
    default:
      drawCheckInSvgBox(p1, 28.36, 319.83, 20, 13.5);
      break;
  }

  // Sub-option (International Leader / Multiprogramme - 20x20 boxes at x=201.68)
  if (data.sous_option === "international_leader") {
    drawCheckInSvgBox(p1, 201.68, 349.89, 20, 13.5);
  } else if (data.sous_option === "multiprogramme") {
    drawCheckInSvgBox(p1, 201.68, 376.72, 20, 13.5);
  }

  // Niveau Checkbox (12.24x12.24 boxes)
  switch (data.niveau) {
    case "licence_1":
      drawCheckInSvgBox(p1, 379.91, 353.44, 12.24, 9.5);
      break;
    case "licence_2":
      drawCheckInSvgBox(p1, 476.94, 353.44, 12.24, 9.5);
      break;
    case "licence_3":
      drawCheckInSvgBox(p1, 571.47, 353.44, 12.24, 9.5);
      break;
    case "master_1":
      drawCheckInSvgBox(p1, 416.37, 389.61, 12.24, 9.5);
      break;
    case "master_2":
      drawCheckInSvgBox(p1, 512.51, 389.61, 12.24, 9.5);
      break;
    default:
      drawCheckInSvgBox(p1, 379.91, 353.44, 12.24, 9.5);
      break;
  }

  // Filière labels (Domaine, Mention, Spécialité) - erase all dots, harmonize size, 2-line wrap without cut-offs
  drawFiliereField(p1, 387.25, 384, data.domaine || "Sciences Économiques et de Gestion", 8.5);
  drawFiliereField(p1, 383.31, 351, data.mention || "Formation Professionnelle", 8.5);
  drawFiliereField(p1, 392.04, 318, data.specialite || data.mention || "", 8.5);

  // Civilité Checkbox (12.24x12.24 boxes at y_svg=584.96)
  if (data.civilite === "Mme") {
    drawCheckInSvgBox(p1, 38.36, 584.96, 12.24, 9.5);
  } else if (data.civilite === "Mlle") {
    drawCheckInSvgBox(p1, 163.98, 584.96, 12.24, 9.5);
  } else {
    drawCheckInSvgBox(p1, 308.88, 584.96, 12.24, 9.5); // M.
  }

  // État Civil Fields - replace uneven heavy black dots with harmonized, very fine light-grey dotted lines
  const C_LIGHT_DOTS = rgb(0.74, 0.77, 0.81);
  const etatCivilRightClear = 593;
  const etatCivilRightDotEnd = 584.3;

  function drawHarmonizedDottedField(
    clearStartX: number,
    clearEndX: number,
    dotEndX: number,
    baseY: number,
    text: string | undefined | null,
    textX: number,
    size: number = 10,
    isBold: boolean = false
  ) {
    // 1. Erase original heavy black template dots completely
    p1.drawRectangle({
      x: clearStartX,
      y: baseY - 3,
      width: clearEndX - clearStartX,
      height: 15,
      color: C_WHITE,
    });

    // 2. Draw harmonized ultra-fine light-grey dotted line
    p1.drawLine({
      start: { x: clearStartX + 2, y: baseY + 0.6 },
      end: { x: dotEndX, y: baseY + 0.6 },
      thickness: 0.6,
      color: C_LIGHT_DOTS,
      dashArray: [0.8, 2.2],
    });

    // 3. Draw candidate text cleanly above the fine dotted line
    const clean = sanitizeText(text);
    if (clean) {
      p1.drawText(clean, {
        x: textX,
        y: baseY + 2.5,
        size,
        font: isBold ? fontBold : fontRegular,
        color: C_NAVY,
      });
    }
  }

  // Nom (S) : (ends at 75.75)
  drawHarmonizedDottedField(77.5, etatCivilRightClear, etatCivilRightDotEnd, 217.20, data.nom.toUpperCase(), 84, 10.5, true);
  // Prénom (S) : (ends at 91.29)
  drawHarmonizedDottedField(93, etatCivilRightClear, etatCivilRightDotEnd, 192.69, data.prenom, 99, 10.5, true);
  // Date de naissance : (colon ends at ~137, "Lieu de naissance" starts at 298.79)
  drawHarmonizedDottedField(139, 297.5, 295.5, 168.17, data.date_naissance, 145, 10, false);
  // Lieu de naissance : (ends at 394.13)
  drawHarmonizedDottedField(394.5, etatCivilRightClear, etatCivilRightDotEnd, 168.17, data.lieu_naissance, 402, 10, false);
  // Nationalité : (ends at 91.73)
  drawHarmonizedDottedField(93.5, etatCivilRightClear, etatCivilRightDotEnd, 143.66, data.nationalite || "Sénégalaise", 99, 10, false);
  // Adresse : (ends at 75.27)
  drawHarmonizedDottedField(77, etatCivilRightClear, etatCivilRightDotEnd, 119.15, data.adresse, 83, 10, false);
  // Adresse suite (full line from 27.35)
  drawHarmonizedDottedField(27, etatCivilRightClear, etatCivilRightDotEnd, 94.64, data.adresse_suite || "", 30, 10, false);
  // Ville : (ends at 54.92)
  drawHarmonizedDottedField(56.5, etatCivilRightClear, etatCivilRightDotEnd, 70.13, data.ville || "Dakar", 63, 10, false);
  // Tél. : (ends at 50.53, "Portable" starts at 285.15)
  drawHarmonizedDottedField(52, 285.0, 282.0, 45.61, data.telephone, 57, 10, false);
  // Portable : (ends at 330.27)
  drawHarmonizedDottedField(332, etatCivilRightClear, etatCivilRightDotEnd, 45.61, data.portable || data.telephone, 338, 10, false);
  // E-mail (caractères très lisibles : (ends at 187.05)
  drawHarmonizedDottedField(189, etatCivilRightClear, etatCivilRightDotEnd, 21.10, data.email, 195, 10, true);

  // ===========================================================================
  // PAGE 2 : TUTEUR / BAILLEUR, PARCOURS SCOLAIRE, LANGUES & CANAL
  // ===========================================================================
  const p2 = pdfDoc.getPage(1);

  // Tuteur - Père
  if (data.pere) {
    if (data.pere.nom_prenom) p2.drawText(sanitizeText(data.pere.nom_prenom), { x: 160, y: 766, size: 9, font: fontBold, color: C_NAVY });
    if (data.pere.profession) p2.drawText(sanitizeText(data.pere.profession), { x: 160, y: 749, size: 9, font: fontRegular, color: C_NAVY });
    if (data.pere.adresse) p2.drawText(sanitizeText(data.pere.adresse), { x: 160, y: 732, size: 9, font: fontRegular, color: C_NAVY });
    if (data.pere.email && data.pere.email !== "-") p2.drawText(sanitizeText(data.pere.email), { x: 160, y: 715, size: 9, font: fontRegular, color: C_NAVY });
    if (data.pere.telephone) p2.drawText(sanitizeText(data.pere.telephone), { x: 160, y: 698, size: 9, font: fontRegular, color: C_NAVY });
  }

  // Tuteur - Mère
  if (data.mere) {
    if (data.mere.nom_prenom) p2.drawText(sanitizeText(data.mere.nom_prenom), { x: 375, y: 766, size: 9, font: fontBold, color: C_NAVY });
    if (data.mere.profession) p2.drawText(sanitizeText(data.mere.profession), { x: 375, y: 749, size: 9, font: fontRegular, color: C_NAVY });
    if (data.mere.adresse) p2.drawText(sanitizeText(data.mere.adresse), { x: 375, y: 732, size: 9, font: fontRegular, color: C_NAVY });
    if (data.mere.email && data.mere.email !== "-") p2.drawText(sanitizeText(data.mere.email), { x: 375, y: 715, size: 9, font: fontRegular, color: C_NAVY });
    if (data.mere.telephone) p2.drawText(sanitizeText(data.mere.telephone), { x: 375, y: 698, size: 9, font: fontRegular, color: C_NAVY });
  }

  // Autre tuteur (si spécifié)
  if (data.autre_tuteur && data.autre_tuteur.nom_prenom) {
    p2.drawText(sanitizeText(data.autre_tuteur.nom_prenom), { x: 160, y: 662, size: 9, font: fontBold, color: C_NAVY });
    if (data.autre_tuteur.profession) p2.drawText(sanitizeText(data.autre_tuteur.profession), { x: 160, y: 645, size: 9, font: fontRegular, color: C_NAVY });
    if (data.autre_tuteur.adresse) p2.drawText(sanitizeText(data.autre_tuteur.adresse), { x: 160, y: 628, size: 9, font: fontRegular, color: C_NAVY });
    if (data.autre_tuteur.email) p2.drawText(sanitizeText(data.autre_tuteur.email), { x: 160, y: 611, size: 9, font: fontRegular, color: C_NAVY });
    if (data.autre_tuteur.telephone) p2.drawText(sanitizeText(data.autre_tuteur.telephone), { x: 160, y: 594, size: 9, font: fontRegular, color: C_NAVY });
  }

  // Parcours scolaire table rows
  const parcoursRows = data.parcours || [];
  const parcoursYBase = [490, 465, 441, 416, 391, 367, 342];
  parcoursRows.slice(0, 7).forEach((row, idx) => {
    const yRow = parcoursYBase[idx];
    if (row.annee) p2.drawText(sanitizeText(row.annee), { x: 30, y: yRow, size: 9, font: fontRegular, color: C_NAVY });
    if (row.diplome) p2.drawText(sanitizeText(row.diplome), { x: 135, y: yRow, size: 9, font: fontBold, color: C_NAVY });
    if (row.etablissement) p2.drawText(sanitizeText(row.etablissement), { x: 296, y: yRow, size: 9, font: fontRegular, color: C_NAVY });
    if (row.date_obtention) p2.drawText(sanitizeText(row.date_obtention), { x: 478, y: yRow, size: 9, font: fontRegular, color: C_NAVY });
  });

  // Langues (1ère, 2e, 3e, Autres)
  // Label ":" ends at x=80.80, dots span x=83.68..297.14, "Niveau" starts at x=300.02
  const drawLangRow = (nom: string, niveau: string | undefined, yText: number, boxY_svg: number) => {
    clearDotsAndWrite(p2, nom, 82, yText, 216, 86, yText, 10, true);
    if (niveau === "faible") drawCheckInSvgBox(p2, 379.58, boxY_svg, 12.24, 9.5);
    else if (niveau === "moyen") drawCheckInSvgBox(p2, 443.70, boxY_svg, 12.24, 9.5);
    else if (niveau === "eleve" || niveau === "courant") drawCheckInSvgBox(p2, 518.00, boxY_svg, 12.24, 9.5);
  };

  if (data.langue_1) drawLangRow(data.langue_1.nom || "Français", data.langue_1.niveau || "eleve", 272.5, 559.16);
  if (data.langue_2) drawLangRow(data.langue_2.nom || "Anglais", data.langue_2.niveau || "moyen", 242, 589.54);
  if (data.langue_3 && data.langue_3.nom) drawLangRow(data.langue_3.nom, data.langue_3.niveau || "moyen", 211.7, 619.92);
  if (data.langue_autres && data.langue_autres.nom) drawLangRow(data.langue_autres.nom, data.langue_autres.niveau || "moyen", 183.5, 647.90);

  // Comment avez-vous connu l'établissement Checkboxes (12.24x12.24 boxes at x=17.97 and x=265.83)
  const sources = data.sources_connaissance || [];
  if (sources.includes("publicite_presse")) drawCheckInSvgBox(p2, 17.97, 726.74, 12.24, 9.5);
  if (sources.includes("salons")) drawCheckInSvgBox(p2, 17.97, 744.33, 12.24, 9.5);
  if (sources.includes("affichage")) drawCheckInSvgBox(p2, 17.97, 761.92, 12.24, 9.5);
  if (sources.includes("site_internet")) drawCheckInSvgBox(p2, 17.97, 779.50, 12.24, 9.5);
  if (sources.includes("article_presse")) drawCheckInSvgBox(p2, 17.97, 797.09, 12.24, 9.5);
  if (sources.includes("bouche_a_oreille")) drawCheckInSvgBox(p2, 17.97, 814.68, 12.24, 9.5);
  if (sources.includes("etudiant_afi")) drawCheckInSvgBox(p2, 265.83, 726.74, 12.24, 9.5);
  if (sources.includes("presentation_etablissement")) drawCheckInSvgBox(p2, 265.83, 744.33, 12.24, 9.5);
  if (sources.includes("evenement_afi")) drawCheckInSvgBox(p2, 265.83, 761.92, 12.24, 9.5);
  if (sources.includes("conseiller_orientation")) drawCheckInSvgBox(p2, 265.83, 779.50, 12.24, 9.5);
  if (sources.includes("reseaux_sociaux")) drawCheckInSvgBox(p2, 265.83, 797.09, 12.24, 9.5);
  if (sources.includes("courrier_mailing")) drawCheckInSvgBox(p2, 265.83, 814.68, 12.24, 9.5);

  // ===========================================================================
  // PAGE 3 : VOS MOTIVATIONS SUR LE CHOIX DE LA FILIÈRE ET DE L'UNIVERSITÉ
  // ===========================================================================
  const p3 = pdfDoc.getPage(2);
  const rawMotivation = sanitizeText(data.motivations_texte) ||
    `Madame, Monsieur les membres de la Commission d'Admission,\n\nPar la présente, je sollicite mon admission au sein du Groupe AFI - L'Université de l'Entreprise pour y suivre la formation en ${data.mention || "Licence"}.\n\nMon projet professionnel est orienté vers l'acquisition de compétences rigoureuses et directement opérationnelles me permettant d'intégrer avec succès le monde de l'entreprise. L'excellence académique d'AFI-L'UE, ses accréditations reconnues et la qualité de son corps professoral correspondent parfaitement à mes ambitions d'évolution professionnelle.\n\nRigoureux, motivé et déterminé, je mettrai tout en œuvre pour réussir brillamment mes études au sein de votre établissement.\n\nEn vous remerciant pour l'attention portée à ma candidature, je vous prie d'agréer l'expression de mes salutations distinguées.`;

  // Wrap and justify text across the full width of Page 3 (x=26.75 to x=577.70),
  // erasing all underlying dotted lines for every rendered line.
  const motivationStartX = 26.75;
  const motivationEndX = 577.70;
  const motivationMaxWidth = motivationEndX - motivationStartX; // 550.95 pt
  const motivationFontSize = 10;
  const minSpaceWidth = fontRegular.widthOfTextAtSize(" ", motivationFontSize);
  const motivationLineStep = 21;
  const motivationMinY = 140;
  let motivationY = 742.83;

  function eraseMotivationLineDots(y: number) {
    p3.drawRectangle({
      x: 25,
      y: y - 4,
      width: 555,
      height: 16,
      color: C_WHITE,
    });
  }

  function drawJustifiedMotivationLine(words: string[], y: number, isLastLine: boolean) {
    eraseMotivationLineDots(y);
    if (isLastLine || words.length <= 1) {
      p3.drawText(words.join(" "), {
        x: motivationStartX,
        y,
        size: motivationFontSize,
        font: fontRegular,
        color: C_NAVY,
      });
      return;
    }

    const totalWordsWidth = words.reduce(
      (sum, w) => sum + fontRegular.widthOfTextAtSize(w, motivationFontSize),
      0
    );
    const gaps = words.length - 1;
    const spaceWidth = (motivationMaxWidth - totalWordsWidth) / gaps;

    // Fallback to standard left-align if inter-word gap is excessively wide
    if (spaceWidth > minSpaceWidth * 4) {
      p3.drawText(words.join(" "), {
        x: motivationStartX,
        y,
        size: motivationFontSize,
        font: fontRegular,
        color: C_NAVY,
      });
      return;
    }

    let curX = motivationStartX;
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      p3.drawText(w, {
        x: curX,
        y,
        size: motivationFontSize,
        font: fontRegular,
        color: C_NAVY,
      });
      curX += fontRegular.widthOfTextAtSize(w, motivationFontSize) + spaceWidth;
    }
  }

  const paragraphs = rawMotivation.split(/\r?\n/);
  for (const para of paragraphs) {
    if (motivationY < motivationMinY) break;
    const trimmed = para.trim();
    if (!trimmed) {
      eraseMotivationLineDots(motivationY);
      motivationY -= motivationLineStep;
      continue;
    }

    const words = trimmed.split(/\s+/);
    let currentWords: string[] = [];
    let currentWidth = 0;

    for (const w of words) {
      const wWidth = fontRegular.widthOfTextAtSize(w, motivationFontSize);
      const addedWidth = currentWords.length === 0 ? wWidth : minSpaceWidth + wWidth;

      if (currentWidth + addedWidth > motivationMaxWidth && currentWords.length > 0) {
        if (motivationY >= motivationMinY) {
          drawJustifiedMotivationLine(currentWords, motivationY, false);
          motivationY -= motivationLineStep;
        }
        currentWords = [w];
        currentWidth = wWidth;
      } else {
        currentWords.push(w);
        currentWidth += addedWidth;
      }
    }

    if (currentWords.length > 0 && motivationY >= motivationMinY) {
      drawJustifiedMotivationLine(currentWords, motivationY, true);
      motivationY -= motivationLineStep;
    }
  }

  // ===========================================================================
  // PAGE 4 : CONSTITUTION DU DOSSIER, DROIT À L'IMAGE & ATTESTATION
  // ===========================================================================
  const p4 = pdfDoc.getPage(3);

  // Attestation sur l'honneur - erase all dots after the label to the right margin
  const candidateFullName = sanitizeText(data.attestation_nom_complet || `${data.nom.toUpperCase()} ${data.prenom}`);
  clearDotsAndWrite(p4, candidateFullName, 179, 303, 403, 185, 303, 11, true);

  // Fait à ..., le ... - completely clear dots and format cleanly
  const faitLieu = sanitizeText(data.attestation_lieu || data.ville || "Dakar");
  p4.drawRectangle({
    x: 18,
    y: 103,
    width: 275,
    height: 16,
    color: C_WHITE,
  });
  p4.drawText(`Fait à ${faitLieu}, le ${submissionDate}`, {
    x: 18,
    y: 105,
    size: 11,
    font: fontBold,
    color: C_NAVY,
  });

  // Signature Block
  p4.drawText("Lu et approuvé", { x: 420, y: 70, size: 10, font: fontOblique, color: C_NAVY });
  p4.drawText(candidateFullName, { x: 405, y: 52, size: 11, font: fontBold, color: C_NAVY });

  // ===========================================================================
  // PAGE 5 : RÉSERVÉE A L'ADMINISTRATION (DÉCISION & OBSERVATIONS)
  // Laissée 100% telle quelle pour le remplissage manuel par l'administration
  // ===========================================================================

  return await pdfDoc.save();
}

// Backward-compatible alias
export const generateCandidatureDossierPdf = generateDossierPdf;
