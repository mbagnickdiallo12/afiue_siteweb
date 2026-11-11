import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { getFormations } from "@/lib/services/formations.service";
import { CandidatureForm } from "@/components/candidature/CandidatureForm";

export const metadata: Metadata = {
  title: "Candidature en Ligne | Admission AFI-L'UE 2026-2027",
  description:
    "Déposez votre dossier de candidature en ligne pour les cycles de Licence et Master à l'Université AFI-L'UE (Dakar & Thiès).",
};

export default async function CandidaterPage() {
  const formations = await getFormations();

  return (
    <div className="bg-[#F8FAFC] min-h-screen selection:bg-afi-red selection:text-white pb-20">
      {/* =========================================================================
          HERO HEADER — Dégradé Bleu AFI & Dot Pattern
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white pt-14 pb-28 sm:pt-16 sm:pb-32">
        {/* Subtle Ambient Navy Blue Glow */}
        <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1E2E6B]/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-12 w-[500px] h-[500px] rounded-full bg-[#182559]/20 blur-3xl pointer-events-none" />

        {/* Pattern grid & DotPattern with mask */}
        <div className="absolute inset-0 pattern-grid-dots mask-radial-faded opacity-35 pointer-events-none" />
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/20 [mask-image:radial-gradient(650px_circle_at_center,white,transparent)] pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-afi-red text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admissions Rentrée 2026-2027</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-[1.18]">
            Dossier d&apos;Admission en Ligne
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-xl mx-auto">
            Remplissez votre dossier en quelques étapes simples. Vous et l&apos;administration recevrez instantanément le document officiel complété en PDF.
          </p>
        </div>
      </section>

      {/* =========================================================================
          FORM CONTAINER — Flottant au-dessus du dégradé (Style Apple / Google)
          ========================================================================= */}
      <div className="-mt-16 sm:-mt-20 relative z-20 max-w-5xl lg:max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <CandidatureForm formations={formations} />
      </div>
    </div>
  );
}
