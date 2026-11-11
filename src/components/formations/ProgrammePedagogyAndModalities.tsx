import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  Award,
  Check,
  Laptop,
  Briefcase,
  CalendarClock,
  Languages,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export const OTHER_PROGRAMMES_LIST = [
  {
    title: "Formation Initiale",
    badge: "Cours du Jour",
    description:
      "Cursus à temps plein pour les bacheliers et étudiants, rythmé par l'alternance académique, les stages et l'entrepreneuriat.",
    href: "/programmes/formation-initiale",
    icon: GraduationCap,
  },
  {
    title: "Formation Continue",
    badge: "Cours du Soir • 17h30",
    description:
      "Destinée aux professionnels en activité souhaitant perfectionner leur expertise ou réorienter leur carrière.",
    href: "/programmes/formation-continue",
    icon: Briefcase,
  },
  {
    title: "E-Learning",
    badge: "Formation à Distance",
    description:
      "Suivez votre Licence ou Master 100 % en ligne en français, sans contrainte de présence physique.",
    href: "/programmes/e-learning",
    icon: Laptop,
  },
  {
    title: "Cours du Week-end",
    badge: "Samedi & Dimanche",
    description:
      "Format intensif le week-end permettant aux cadres et actifs de valider leur Licence 3 ou Master en 9 mois.",
    href: "/cours-du-weekend",
    icon: CalendarClock,
  },
  {
    title: "Executive Education",
    badge: "Dirigeants & Cadres",
    description:
      "Certificats exécutifs et séminaires sur-mesure pour accompagner la transformation stratégique des organisations.",
    href: "/programmes/executive-education",
    icon: Sparkles,
  },
  {
    title: "Présup",
    badge: "Immersion Français • 600h",
    description:
      "Programme intensif de langue française et d'initiation à la gestion dédié aux étudiants internationaux.",
    href: "/programmes/presup",
    icon: Languages,
  },
];

export function ProgrammePedagogyAndModalities() {
  return (
    <>
      {/* =====================================================================
          ARCHITECTURE DES PARCOURS (International Leader vs Multiprogramme)
          Design Apple / Google : Minimaliste, moderne, épuré et harmonieux
         ===================================================================== */}
      <section className="py-20 sm:py-24 bg-[#FAFBFC] border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* En-tête centré minimaliste */}
          <div className="max-w-3xl mx-auto text-center space-y-3.5">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
              CURSUS EN 5 ANS • APRÈS LE BAC
            </span>

            <h2 className="font-sans font-bold text-2xl sm:text-4xl text-[#0B0F19] tracking-tight leading-[1.2]">
              Spécialisez-vous dès la 1ère année de Licence et devenez expert en Master.
            </h2>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              L’offre de formation du Groupe AFI-L’UE prépare les étudiants à relever des défis de leadership complexes et propose, en Licence, deux parcours diplômants au choix :
            </p>
          </div>

          {/* Comparatif Bento Harmonisé — 1 Carte Bleu Nuit & 1 Carte Blanche Épurée */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* 1. International Leader — Carte Bleu Nuit Signature */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0B0F19] via-[#13182E] to-[#1B2142] text-white border border-white/10 p-7 sm:p-9 flex flex-col justify-between shadow-xl overflow-hidden group">
              <div className="absolute inset-0 pattern-grid-dots opacity-20 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/15">
                    <Globe2 className="w-3.5 h-3.5 text-[#C8232C]" />
                    Double Diplomation
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-2xl text-white tracking-tight">
                    International Leader
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Obtenez deux diplômes : celui d&apos;AFI-L&apos;UE cosigné avec le Ministère de l&apos;Enseignement Supérieur et le <strong className="text-white font-semibold">DEES de la FEDE</strong>, complétés par la certification <strong className="text-white font-semibold">TOEIC</strong>.
                  </p>
                </div>

                {/* Points clés */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Ce que le programme assure :
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C8232C] shrink-0 mt-0.5" />
                      <span>Polyvalence professionnelle dans des métiers voisins</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C8232C] shrink-0 mt-0.5" />
                      <span>Modules de leadership préparant aux fonctions de manager en Master</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C8232C] shrink-0 mt-0.5" />
                      <span>Ouverture internationale (Double diplomation AFI-L&apos;UE / FEDE)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C8232C] shrink-0 mt-0.5" />
                      <span>Maîtrise de l&apos;anglais validée par la certification TOEIC</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pied de carte with Shimmer Beam */}
              <div className="relative z-10 mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs overflow-hidden">
                {/* Animated scanning shimmer beam */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-afi-red to-transparent w-1/3 animate-shimmer-beam" />

                <span className="text-slate-400 font-medium">Disponibilité</span>
                <span className="font-semibold text-white bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  Licence • Formation initiale
                </span>
              </div>
            </div>

            {/* 2. Multiprogramme — Carte Blanche Épurée */}
            <div className="relative rounded-2xl bg-white border border-slate-200/80 p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200/60">
                    <Award className="w-3.5 h-3.5 text-[#191D38]" />
                    Diplôme d&apos;État Cosigné
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-2xl text-[#0B0F19] tracking-tight">
                    Multiprogramme
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Ce parcours permet l&apos;obtention du diplôme officiel de AFI-L&apos;UE, <strong className="text-slate-900 font-semibold">cosigné avec le Ministère en charge de l&apos;Enseignement Supérieur</strong>.
                  </p>
                </div>

                {/* Points clés */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Ce que le programme assure :
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#191D38] shrink-0 mt-0.5" />
                      <span>Polyvalence professionnelle dans des métiers voisins</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#191D38] shrink-0 mt-0.5" />
                      <span>Acquisition des bases du leadership préparant au parcours Master</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pied de carte */}
              <div className="mt-8 pt-5 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 font-medium">Licence</span>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full text-right">
                    Initiale • Continue • Week-end • À distance
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 font-medium">Master</span>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full text-right">
                    Formation continue • Week-end • À distance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          AUTRES PROGRAMMES — Bento Grid minimaliste (Style Apple)
         ===================================================================== */}
      <section className="py-24 sm:py-28 bg-[#F5F7FA] border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
              MODALITÉS & DISPOSITIFS SUR-MESURE
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-4xl text-[#0B0F19] tracking-tight">
              Autres programmes
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Des parcours pensés pour chaque rythme de vie : étudiants,
              professionnels en activité, cadres dirigeants et étudiants
              internationaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OTHER_PROGRAMMES_LIST.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group bg-white rounded-[24px] p-7 border border-slate-200/70 hover:border-slate-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-center group-hover:bg-[#C8232C] transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-lg text-[#0B0F19] tracking-tight group-hover:text-[#C8232C] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#0B0F19] group-hover:text-[#C8232C] transition-colors">
                    <span>Découvrir</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
