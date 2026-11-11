import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Accréditations & Reconnaissances | CAMES & ANAQ-Sup | AFI-L'UE",
  description:
    "Reconnaissance des diplômes d'AFI-L'UE par le CAMES et habilitation institutionnelle par l'Autorité Nationale d'Assurance Qualité (ANAQ-Sup).",
};

export default function AccreditationsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-afi-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Label Qualité & Conformité Internationale
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Accréditations & Reconnaissances
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              La qualité académique de l&apos;AFI-L&apos;UE est certifiée par les plus hautes instances nationales et panafricaines d&apos;évaluation de l&apos;enseignement supérieur.
            </p>
          </div>
        </div>

        {/* 2 Main Accreditations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CAMES */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-400">Panafricain</span>
              <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">
                Le CAMES (Conseil Africain et Malgache)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Le Conseil Africain et Malgache pour l&apos;Enseignement Supérieur regroupe 19 pays membres. Les diplômes accrédités par le CAMES bénéficient d&apos;une équivalence de plein droit dans l&apos;ensemble de ces pays et ouvrent l&apos;accès aux concours administratifs et aux poursuites d&apos;études en Master et Doctorat à l&apos;international.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1.5">
              <div className="font-bold text-slate-900">Filières majeures reconnues CAMES :</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Licence & Master en Audit et Contrôle de Gestion</li>
                <li>Licence & Master en Banque, Assurance et Finance</li>
                <li>Licence & Master en Transport et Supply Chain</li>
                <li>Licence en Génie Logiciel (GELO)</li>
              </ul>
            </div>
          </div>

          {/* ANAQ-SUP */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-afi-navy/10 text-afi-navy flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-400">National (Sénégal)</span>
              <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">
                L&apos;ANAQ-Sup (Autorité Nationale)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Créée par décret présidentiel, l&apos;Autorité Nationale d&apos;Assurance Qualité de l&apos;Enseignement Supérieur évalue la gouvernance institutionnelle, les infrastructures, le corps enseignant et la pertinence pédagogique des filières universitaires au Sénégal.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1.5">
              <div className="font-bold text-slate-900">Garanties institutionnelles :</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Habilitation institutionnelle délivrée par le Ministère</li>
                <li>Accréditation périodique des programmes de Licence et Master</li>
                <li>Validation conforme aux normes LMD internationales</li>
                <li>Reconnaissance pour les bourses de l&apos;État du Sénégal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
          <h3 className="font-heading font-bold text-xl text-slate-900">
            Faites le choix d&apos;un diplôme sécurisé et reconnu à l&apos;international
          </h3>
          <p className="text-xs text-slate-600 max-w-xl mx-auto">
            Nos diplômés s&apos;insèrent dans les plus grandes entreprises multinationales, institutions bancaires et organisations sous-régionales.
          </p>
          <div className="pt-2">
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-afi-red hover:bg-afi-red-800 text-white text-xs font-bold transition-colors"
            >
              <span>Consulter les formations accréditées</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
