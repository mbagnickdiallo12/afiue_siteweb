import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Download } from "lucide-react";
import { getFormations } from "@/lib/services/formations.service";
import { getDomains } from "@/lib/services/domains.service";
import { FormationsCatalogView } from "@/components/formations/FormationsCatalogView";
import { ProgrammePedagogyAndModalities } from "@/components/formations/ProgrammePedagogyAndModalities";
import TopologyField from "@/components/ui/topology-field";

export const metadata: Metadata = {
  title: "Programmes & Catalogue des Formations | AFI-L'UE",
  description:
    "Intégrer le Groupe AFI-L’UE, c'est bénéficier d'une pédagogie innovante et de programmes de formation qui ont un impact réel sur la performance des entreprises.",
};

interface FormationsPageProps {
  searchParams: Promise<{
    domain?: string;
    level?: string;
    search?: string;
  }>;
}

export default async function FormationsPage({
  searchParams,
}: FormationsPageProps) {
  const resolvedParams = await searchParams;
  const [formations, domains] = await Promise.all([
    getFormations(),
    getDomains(),
  ]);

  return (
    <div className="bg-white min-h-screen">
      {/* =====================================================================
          1. HERO SECTION — Minimaliste, centré et épuré (Style Apple / Google)
             avec TopologyField 3D aux couleurs bleu marine AFI-L'UE
         ===================================================================== */}
      <section className="relative overflow-hidden bg-[#070A12] text-white py-24 sm:py-32">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <TopologyField className="w-full h-full pointer-events-none" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#070A12] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[#070A12]/30 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] text-white/80 text-xs font-medium backdrop-blur-md border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Programmes LMD • Accrédités CAMES & ANAQ-Sup</span>
          </div>

          <h1 className="font-sans font-semibold text-2xl sm:text-4xl lg:text-[42px] tracking-tight leading-[1.32] text-white">
            Intégrer le Groupe AFI-L’UE,{" "}
            <span className="text-white/70 font-normal">
              c&apos;est bénéficier d&apos;une pédagogie innovante et de
              programmes de formation qui ont
            </span>{" "}
            un impact réel sur la performance des entreprises.
          </h1>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#catalogue"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B0F19] hover:bg-slate-100 text-xs font-semibold transition-all"
            >
              <span>Explorer nos filières</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/brochures/offre-de-formation-2026-2027.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/15 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Brochure 2026–2027 (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CATALOGUE DYNAMIQUE DES FORMATIONS (Filtres + Cartes)
         ===================================================================== */}
      <section id="catalogue" className="py-20 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
              LICENCES & MASTERS
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#0B0F19] tracking-tight">
              Nos filières de formation
            </h2>
          </div>

          <FormationsCatalogView
            allFormations={formations}
            domains={domains}
            initialLevel={resolvedParams.level}
            initialDomain={resolvedParams.domain}
            initialSearch={resolvedParams.search}
          />
        </div>
      </section>

      {/* =====================================================================
          3 & 4. ARCHITECTURE DES PARCOURS + AUTRES PROGRAMMES
         ===================================================================== */}
      <ProgrammePedagogyAndModalities />
    </div>
  );
}
