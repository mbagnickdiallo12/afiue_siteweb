import { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admissions 2026-2027 | Modalités & Calendrier | AFI-L'UE",
  description:
    "Découvrez les conditions d'admission, le calendrier de recrutement et les pièces justificatives requises pour intégrer l'Université AFI-L'UE.",
};

export default function AdmissionsPage() {
  const steps = [
    {
      num: "01",
      title: "Choix de la formation",
      desc: "Consultez notre catalogue de Licences et Masters et sélectionnez la filière correspondant à votre projet professionnel.",
    },
    {
      num: "02",
      title: "Dépôt du dossier en ligne",
      desc: "Remplissez le formulaire de candidature officiel et transmettez vos relevés de notes et diplômes antérieurs.",
    },
    {
      num: "03",
      title: "Entretien d'admission",
      desc: "Entretien avec le jury pédagogique (en présentiel ou visioconférence) pour évaluer votre motivation et votre niveau.",
    },
    {
      num: "04",
      title: "Notification & Inscription",
      desc: "Réception de la décision d'admission sous 72h et finalisation des formalités d'inscription administrative.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-afi-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Campagne 2026-2027
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Admissions à l&apos;Université AFI-L&apos;UE
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Découvrez la procédure d&apos;inscription pour les cycles de Licence et Master en formation initiale ou cours du soir à Dakar et Thiès.
            </p>
            <div className="pt-2">
              <Link
                href="/candidater"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-afi-red hover:bg-afi-red-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Déposer sa candidature en ligne</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Steps */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading font-black text-2xl text-slate-900">
              Le Parcours d&apos;Admission en 4 Étapes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Un processus transparent, rigoureux et rapide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3 relative overflow-hidden"
              >
                <span className="font-heading font-black text-4xl text-slate-100 absolute top-4 right-4 pointer-events-none">
                  {s.num}
                </span>
                <div className="w-8 h-8 rounded-lg bg-afi-red/10 text-afi-red font-heading font-bold text-xs flex items-center justify-center">
                  {s.num}
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Checklist Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-afi-navy/10 text-afi-navy flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-900">
                Pièces Justificatives à Fournir
              </h3>
              <p className="text-xs text-slate-500">
                Documents à joindre lors de votre inscription définitive.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 block">
                Pour une entrée en Licence 1 (BAC+1) :
              </span>
              <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                <li>Copie certifiée conforme de l&apos;attestation du Baccalauréat</li>
                <li>Relevés de notes des classes de Seconde, Première et Terminale</li>
                <li>Copie de la carte nationale d&apos;identité ou du passeport</li>
                <li>2 photos d&apos;identité récentes</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 block">
                Pour une admission parallèle ou en Master :
              </span>
              <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                <li>Copie certifiée conforme du diplôme de Licence ou équivalent (BAC+3)</li>
                <li>Relevés de notes de toutes les années universitaires</li>
                <li>Curriculum Vitae détaillé et lettre de motivation</li>
                <li>Copie de la pièce d&apos;identité ou du passeport</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Des questions sur les équivalences de diplômes étrangers ?
            </span>
            <Link
              href="/contact"
              className="text-xs font-bold text-afi-red hover:underline"
            >
              Contacter le service des équivalences &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
