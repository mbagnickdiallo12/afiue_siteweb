import { Metadata } from "next";
import { Target, Eye, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Vision, Mission & Valeurs | AFI-L'UE",
  description:
    "Découvrez les principes fondateurs et les valeurs d'excellence, d'éthique et d'innovation de l'Université de l'Entreprise.",
};

export default function VisionValeursPage() {
  const values = [
    {
      title: "Excellence Académique",
      desc: "Rigueur des enseignements, sélection rigoureuse et conformité continue aux référentiels CAMES et ANAQ-Sup.",
    },
    {
      title: "Professionnalisme & Pratique",
      desc: "Immersion précoce dans les réalités de l'entreprise via stages, études de cas réels et interventions de praticiens.",
    },
    {
      title: "Innovation & Agilité",
      desc: "Anticipation des métiers d'avenir : intelligence artificielle, big data, transformation managériale et fintech.",
    },
    {
      title: "Éthique & Citoyenneté",
      desc: "Formation de citoyens responsables, respectueux des règles de déontologie professionnelle et du bien commun.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-afi-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Identité Fondatrice
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Vision, Mission & Valeurs
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Le projet pédagogique d&apos;AFI-L&apos;UE repose sur une conviction profonde : le développement durable de l&apos;Afrique passe par des compétences de haut niveau forgées au contact direct des entreprises.
            </p>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900">
              Notre Mission
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Former des cadres supérieurs, ingénieurs et managers dotés d&apos;un socle scientifique solide, d&apos;une agilité technique remarquable et d&apos;un sens aigu du leadership éthique, capables d&apos;agir efficacement dans un environnement économique globalisé et en rapide mutation.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-afi-navy/10 text-afi-navy flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900">
              Notre Vision
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Demeurer l&apos;université privée de référence en Afrique de l&apos;Ouest par l&apos;excellence de sa gouvernance, la pertinence de ses formations professionnalisantes, la vitalité de sa recherche appliquée et son ancrage indéfectible auprès des entreprises leaders.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <h3 className="font-heading font-black text-2xl text-slate-900 text-center">
            Les 4 Piliers de Notre Charte des Valeurs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-afi-red flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900">
                  {v.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
