import { Quote, Award, Building2 } from "lucide-react";

export function LeadershipQuotes() {
  const leaders = [
    {
      name: "M. Papa Moustapha DIOP",
      role: "Président Directeur Général",
      institution: "AFI-L'Université de l'Entreprise",
      badge: "Fondateur & Visionnaire",
      quote:
        "Depuis sa création, AFI-L'UE s'est fixé une mission fondatrice : former les bâtisseurs de l'Afrique de demain en conjuguant rigueur académique internationale et immersion concrète dans les réalités de l'entreprise. Notre plus grande fierté réside dans nos milliers de diplômés qui dirigent aujourd'hui des banques, des ministères et des fleurons industriels à travers tout le continent.",
    },
    {
      name: "M. Abou DIENG",
      role: "Directeur Général Adjoint Chargé des Affaires Académiques",
      institution: "AFI-L'Université de l'Entreprise",
      badge: "Garant Académique",
      quote:
        "Notre engagement repose sur une conformité sans compromis avec les référentiels les plus stricts du CAMES et de l'ANAQ-Sup. Nous offrons à nos apprenants des maquettes pédagogiques constamment actualisées, dispensées par des universitaires émérites et des professionnels chevronnés du monde des affaires.",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-afi-red bg-afi-red/10 px-3.5 py-1.5 rounded-full">
            Gouvernance &amp; Direction
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Le Mot de la Direction
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Une vision stratégique guidée par l&apos;ambition de faire de chaque étudiant un acteur 
            majeur du progrès économique et social.
          </p>
        </div>

        {/* 2-Column Luxury Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-afi-red/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="space-y-6 relative z-10">
                {/* Header with avatar initial and badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-afi-navy text-white flex items-center justify-center font-heading font-black text-xl shadow-md group-hover:bg-afi-red transition-colors">
                      {leader.name
                        .split(" ")
                        .slice(1, 3)
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-lg text-slate-900">
                        {leader.name}
                      </h3>
                      <p className="text-xs text-afi-red font-bold">
                        {leader.role}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {leader.institution}
                      </p>
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-slate-200 group-hover:text-afi-red/20 transition-colors shrink-0" />
                </div>

                {/* Quote Body */}
                <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic border-l-2 border-slate-300 pl-4">
                  &ldquo;{leader.quote}&rdquo;
                </blockquote>
              </div>

              {/* Bottom Card Ribbon */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                  <Award className="w-3 h-3 text-emerald-600" />
                  {leader.badge}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  Dakar &amp; Thiès
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
