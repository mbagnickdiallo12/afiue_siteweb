import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Award,
  Calendar,
  Clock,
  Check,
  Download,
  ArrowRight,
  ChevronRight,
  Globe2,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  getFormationBySlug,
  getSimilarFormations,
} from "@/lib/services/formations.service";
import { SimilarFormationCard } from "@/components/formations/SimilarFormationCard";
import { FormationPricingGrid } from "@/components/formations/FormationPricingGrid";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

interface FormationDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: FormationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);

  if (!formation) {
    return {
      title: "Formation introuvable | AFI-L'UE",
    };
  }

  return {
    title: formation.meta_title || `${formation.title} | AFI-L'UE`,
    description:
      formation.meta_description ||
      formation.short_description ||
      `Découvrez le cursus ${formation.title} dispensé par AFI-L'Université de l'Entreprise.`,
  };
}

const ACRONYMS = new Set([
  "BAF",
  "CCA",
  "ACG",
  "GRH",
  "MCV",
  "CI",
  "TL",
  "GPM",
  "MSI",
  "QHSE",
  "OHADA",
  "LMD",
  "ECTS",
  "ONG",
  "PME",
  "PMI",
  "SI",
  "IT",
  "RH",
  "BTP",
]);

function formatCleanCase(raw?: string | null): string {
  if (!raw) return "";
  // If not mostly uppercase, return as-is
  if (raw !== raw.toUpperCase()) return raw;
  const smallWords = new Set([
    "de",
    "du",
    "des",
    "et",
    "en",
    "la",
    "le",
    "les",
    "d'",
    "l'",
    "à",
    "au",
    "aux",
    "sur",
  ]);
  return raw
    .split(" ")
    .map((word, index) => {
      const clean = word.replace(/[(),]/g, "");
      if (ACRONYMS.has(clean) || clean === "–" || clean === "-") {
        return word;
      }
      const lower = word.toLowerCase();
      if (index > 0 && smallWords.has(lower)) {
        return lower;
      }
      // Handle d' or l'
      if (lower.startsWith("d'") || lower.startsWith("l'")) {
        return (
          lower.slice(0, 2) +
          lower.charAt(2).toUpperCase() +
          lower.slice(3)
        );
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

export default async function FormationDetailPage({
  params,
}: FormationDetailPageProps) {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);

  if (!formation) {
    notFound();
  }

  const similarFormations = await getSimilarFormations(
    formation.slug,
    formation.domain_id,
    3,
  );

  const isCames =
    formation.accreditations?.some((a) => a.code === "CAMES") ||
    formation.meta_title?.includes("CAMES");

  const isLicence = formation.level === "licence";

  const careerList =
    formation.career_opportunities_list &&
    formation.career_opportunities_list.length > 0
      ? formation.career_opportunities_list
      : (formation.career_opportunities || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

  const admissionList =
    formation.admission_conditions_list &&
    formation.admission_conditions_list.length > 0
      ? formation.admission_conditions_list
      : [
          formation.admission_requirements ||
            "Admission sur étude du dossier académique et entretien individuel avec un responsable pédagogique.",
        ];

  const programBlocks = formation.program_blocks || [];

  return (
    <div className="bg-white min-h-screen">
      {/* =====================================================================
          1. HERO SECTION — Monochrome (Bleu Licence / Rouge Master) + DotPattern
             Design minimaliste Apple / Google avec titre sur une seule ligne
         ===================================================================== */}
      <section
        className={cn(
          "relative overflow-hidden text-white pt-10 pb-16 sm:pt-12 sm:pb-20",
          isLicence
            ? "bg-gradient-to-br from-[#0B0F19] via-[#13182E] to-[#232B52]"
            : "bg-gradient-to-br from-[#4A0B0E] via-[#8F161D] to-[#C8232C]",
        )}
      >
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "fill-white/30 md:fill-white/40 [mask-image:radial-gradient(560px_circle_at_center,white,transparent)]",
          )}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Fil d'Ariane minimaliste intégré */}
          <nav className="flex items-center gap-2 text-xs text-white/60 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
            <Link
              href="/formations"
              className="hover:text-white transition-colors"
            >
              Programmes
            </Link>
            {formation.domain && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
                <Link
                  href={`/domaines/${formation.domain.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {formation.domain.name}
                </Link>
              </>
            )}
          </nav>

          {/* Identité & Titre complet de la formation */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider border border-white/15">
                {formation.grade || formation.level.toUpperCase()} •{" "}
                {formation.duration_years === 3 ? "BAC+3" : "BAC+5"}
              </span>
            </div>

            <h1 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-white tracking-tight leading-tight sm:leading-snug text-balance">
              {formation.title}
            </h1>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BARRE DE MÉTADONNÉES ACADÉMIQUES (Flexible, 1 ligne, sans texte coupé)
         ===================================================================== */}
      <section className="bg-[#F8FAFC] border-b border-slate-200/80 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-y-3.5 gap-x-6 lg:gap-0">
            {/* Grade */}
            <div className="flex items-center gap-2.5 shrink-0">
              <GraduationCap className="w-4 h-4 text-[#0B0F19] shrink-0" />
              <div className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Grade
                </span>
                <span className="font-sans font-semibold text-xs sm:text-[13px] text-[#0B0F19] whitespace-nowrap">
                  {formatCleanCase(formation.grade || formation.level)} (
                  {formation.duration_years === 3 ? "Bac+3" : "Bac+5"})
                </span>
              </div>
            </div>

            {/* Domaine */}
            <div className="flex items-center gap-2.5 shrink-0 lg:border-l lg:border-slate-200/80 lg:pl-6 xl:pl-8">
              <BookOpen className="w-4 h-4 text-[#0B0F19] shrink-0" />
              <div className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Domaine
                </span>
                <span className="font-sans font-semibold text-xs sm:text-[13px] text-[#0B0F19] whitespace-nowrap">
                  {formation.domain?.name ||
                    formatCleanCase(formation.domaine) ||
                    "Sciences Économiques et Gestion"}
                </span>
              </div>
            </div>

            {/* Mention */}
            <div className="flex items-center gap-2.5 shrink-0 lg:border-l lg:border-slate-200/80 lg:pl-6 xl:pl-8">
              <Layers className="w-4 h-4 text-[#0B0F19] shrink-0" />
              <div className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Mention
                </span>
                <span className="font-sans font-semibold text-xs sm:text-[13px] text-[#0B0F19] whitespace-nowrap">
                  {formatCleanCase(formation.mention || formation.title)}
                </span>
              </div>
            </div>

            {/* Durée */}
            <div className="flex items-center gap-2.5 shrink-0 lg:border-l lg:border-slate-200/80 lg:pl-6 xl:pl-8">
              <Clock className="w-4 h-4 text-[#0B0F19] shrink-0" />
              <div className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Durée
                </span>
                <span className="font-sans font-semibold text-xs sm:text-[13px] text-[#0B0F19] whitespace-nowrap">
                  {formation.duration_label ||
                    `${formation.duration_years} ans (${
                      formation.duration_years * 2
                    } semestres)`}
                </span>
              </div>
            </div>

            {/* Modalités & Régimes */}
            <div className="flex items-center gap-2.5 shrink-0 lg:border-l lg:border-slate-200/80 lg:pl-6 xl:pl-8">
              <Calendar className="w-4 h-4 text-[#0B0F19] shrink-0" />
              <div className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Régimes
                </span>
                <span className="font-sans font-semibold text-xs sm:text-[13px] text-[#0B0F19] whitespace-nowrap">
                  {isLicence ? "Jour • Soir" : "Soir • Week-end • À distance"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PRÉSENTATION, DÉBOUCHÉS & CONDITIONS D'ADMISSION (Layout Bento 7/5)
         ===================================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Colonne Principale (7 cols) : Présentation + Débouchés */}
            <div className="lg:col-span-7 space-y-14">
              {/* Présentation */}
              <div className="space-y-4">
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
                  PRÉSENTATION DU CURSUS
                </span>
                <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0B0F19] tracking-tight">
                  Objectifs & Vision Pédagogique
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {formation.description}
                </p>
              </div>

              {/* Débouchés Professionnels en Bento Cards */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
                    PERSPECTIVES DE CARRIÈRE
                  </span>
                  <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0B0F19] tracking-tight">
                    Débouchés professionnels
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Les principaux métiers et fonctions accessibles à
                    l&apos;issue de la formation :
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {careerList.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-[#F8FAFC] border border-slate-200/70 px-4 py-3.5 flex items-start gap-3 hover:border-slate-300 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-[#191D38] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne Latérale (5 cols) : Conditions d'admission + Accréditations */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              {/* Carte Conditions d'admission — Minimaliste & Épurée */}
              <div className="rounded-[24px] bg-white border border-slate-200/80 p-7 sm:p-8 shadow-2xs space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
                    PRÉREQUIS ACADÉMIQUES
                  </span>
                  <h3 className="font-sans font-bold text-xl text-[#0B0F19] tracking-tight">
                    Conditions d&apos;admission
                  </h3>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                  Pour accéder au programme de{" "}
                  <strong className="text-[#0B0F19] font-semibold">
                    {formation.title}
                  </strong>
                  , les candidats doivent remplir les conditions suivantes :
                </p>

                <ul className="space-y-3.5 pt-1">
                  {admissionList.map((cond, idx) => {
                    const colonIdx = cond.indexOf(":");
                    const hasPrefix = colonIdx > 0 && colonIdx < 22;
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-[#191D38] shrink-0 mt-0.5" />
                        <span>
                          {hasPrefix ? (
                            <>
                              <strong className="font-semibold text-[#0B0F19]">
                                {cond.slice(0, colonIdx + 1)}
                              </strong>
                              {cond.slice(colonIdx + 1)}
                            </>
                          ) : (
                            cond
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Carte Reconnaissances Officielles (Fond Rouge Dégradé AFI + Logos Officiels) */}
              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#380606] via-[#7A0D0B] to-[#C8232C] text-white p-6 sm:p-7 shadow-lg space-y-4 border border-red-500/30">
                <DotPattern
                  cx={1}
                  cy={1}
                  cr={1}
                  className="fill-white/20 [mask-image:radial-gradient(280px_circle_at_center,white,transparent)]"
                />

                <span className="relative z-10 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                  RECONNAISSANCE & ACCRÉDITATIONS
                </span>

                <div className="relative z-10 grid grid-cols-1 gap-2.5">
                  {/* 1. Habilité État du Sénégal avec Drapeau SVG officiel */}
                  <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 text-xs sm:text-[13px] font-semibold text-white transition-colors">
                    <div className="w-7 h-5 rounded-[3px] overflow-hidden shrink-0 shadow-xs border border-white/30 flex items-center justify-center bg-black/20">
                      <Image
                        src="/images/accreditations/flag-senegal.svg"
                        alt="Drapeau du Sénégal"
                        width={28}
                        height={20}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>Programme habilité par l&apos;État du Sénégal</span>
                  </div>

                  {/* 2. Accrédité ANAQ-Sup avec Logo officiel */}
                  <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 text-xs sm:text-[13px] font-semibold text-white transition-colors">
                    <div className="w-7 h-7 rounded-md overflow-hidden shrink-0 shadow-xs bg-white p-1 flex items-center justify-center">
                      <Image
                        src="/images/accreditations/logo-anaq-sup.jpg"
                        alt="Logo ANAQ-Sup"
                        width={28}
                        height={28}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <span>Programme accrédité par l&apos;ANAQ-Sup</span>
                  </div>

                  {/* 3. Accrédité CAMES avec Logo officiel */}
                  <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 text-xs sm:text-[13px] font-semibold text-white transition-colors">
                    <div className="w-7 h-7 rounded-md overflow-hidden shrink-0 shadow-xs bg-white p-0.5 flex items-center justify-center">
                      <Image
                        src="/images/accreditations/logo-cames.jpg"
                        alt="Logo CAMES"
                        width={28}
                        height={28}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span>
                      {isCames
                        ? "Programme accrédité par le CAMES"
                        : "Diplôme cosigné par le MESRI"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. PROGRAMME D'ENSEIGNEMENT (Unités d'Enseignement en Grille Bento)
         ===================================================================== */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-t border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
              ARCHITECTURE PÉDAGOGIQUE
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0B0F19] tracking-tight">
              Programme par Unités d&apos;Enseignement
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Découvrez les modules fondamentaux, méthodologiques et
              professionnels qui structurent le cursus.
            </p>
          </div>

          {programBlocks.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {programBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className="break-inside-avoid bg-white rounded-xl p-5 border border-slate-200/70 shadow-2xs space-y-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#0B0F19] font-mono text-[11px] font-bold">
                      UE {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {block.items.length}{" "}
                      {block.items.length > 1 ? "matières" : "matière"}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-[#0B0F19] leading-snug">
                    {block.title}
                  </h3>

                  <ul className="space-y-2 pt-2.5 border-t border-slate-100">
                    {block.items.map((subject, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8232C] mt-1.5 shrink-0" />
                        <span>{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-sm text-slate-700">
              {formation.curriculum}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          5. PARCOURS INTERNATIONAL LEADER — Bande pleine largeur compacte & épurée
         ===================================================================== */}
      {formation.international_leader?.available && (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#13182E] to-[#1B2142] text-white py-12 sm:py-16">
          <DotPattern
            cx={1}
            cy={1}
            cr={1}
            className="fill-white/20 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-4 w-full">
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-[#C8232C] shrink-0" />
                <span>Cette formation est disponible en International leader :</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify w-full">
                {formation.international_leader.description}
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-3 pt-2 w-full">
              {formation.international_leader.activities.map((act, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-200 leading-snug py-0.5"
                >
                  <Check className="w-4 h-4 text-[#C8232C] shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* =====================================================================
          6. GRILLE TARIFAIRE OFFICIELLE (Design Minimaliste Apple / Google)
         ===================================================================== */}
      <FormationPricingGrid formation={formation} />

      {/* =====================================================================
          7. BARRE D'ACTION EN BAS DE PAGE (Candidature & Brochure PDF)
         ===================================================================== */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#F8FAFC] border border-slate-200/80 px-4 py-10 sm:px-12 sm:py-14 text-center">
            <DotPattern
              cx={1}
              cy={1}
              cr={1}
              className="fill-slate-400/40 [mask-image:radial-gradient(420px_circle_at_center,white,transparent)]"
            />

            <div className="relative z-10 max-w-3xl mx-auto space-y-3">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
                ADMISSIONS 2026-2027
              </span>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#0B0F19] tracking-tight leading-tight text-balance">
                Prêt à rejoindre le programme {formation.title} ?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                Déposez votre dossier de candidature en ligne ou téléchargez la
                fiche complète du programme au format PDF.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/candidater/${formation.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#C8232C] hover:bg-[#a61b23] text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center"
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>Démarrer la demande de candidature</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>

              {formation.brochure_url && (
                <a
                  href={formation.brochure_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0B0F19] text-xs sm:text-sm font-semibold border border-slate-200 transition-all text-center"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Télécharger la fiche (PDF)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FORMATIONS SIMILAIRES DU MÊME DOMAINE
         ===================================================================== */}
      {similarFormations.length > 0 && (
        <section className="py-20 bg-[#F8FAFC] border-t border-slate-200/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
                  MÊME DOMAINE D&apos;EXCELLENCE
                </span>
                <h3 className="font-sans font-bold text-2xl text-[#0B0F19] tracking-tight">
                  Autres formations en {formation.domain?.name}
                </h3>
              </div>
              {formation.domain && (
                <Link
                  href={`/domaines/${formation.domain.slug}`}
                  className="text-xs sm:text-sm font-semibold text-[#0B0F19] hover:text-[#C8232C] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explorer tout le domaine</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
              {similarFormations.map((f) => (
                <div key={f.id} className="h-full flex flex-col">
                  <SimilarFormationCard formation={f} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
