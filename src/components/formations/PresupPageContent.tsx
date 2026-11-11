import Image from "next/image";
import Link from "next/link";
import {
  Languages,
  Globe2,
  Calculator,
  Compass,
  Check,
  Download,
  ArrowRight,
  Award,
  Clock,
  Calendar,
  Wallet,
} from "lucide-react";
import TopologyField from "@/components/ui/topology-field";
import { DotPattern } from "@/components/ui/dot-pattern";

const PRESUP_MODULES = [
  {
    title: "APPRENTISSAGE DU FRANÇAIS",
    subtitle: "Fondamentaux académiques & rédactionnels",
    icon: Languages,
    items: [
      "Expression écrite",
      "Expression orale",
      "Orthographe – Grammaire",
    ],
  },
  {
    title: "APPRENTISSAGE DE L’ANGLAIS",
    subtitle: "Communication internationale",
    icon: Globe2,
    items: ["Listening", "Reading", "Comprehension", "Conversation"],
  },
  {
    title: "INITIATION AUX TECHNIQUES DE GESTION",
    subtitle: "Socle pré-universitaire en management",
    icon: Calculator,
    items: [
      "Comptabilité",
      "Informatique",
      "Mathématique Générale",
      "Mathématique Financière",
    ],
  },
  {
    title: "ACTIVITÉS EXTRA-MUROS",
    subtitle: "Immersion culturelle & intégration au Sénégal",
    icon: Compass,
    items: [
      "Visite de Sites Historiques",
      "Visite de Parcs",
      "Week-end d’intégration",
    ],
  },
];

export function PresupPageContent() {
  return (
    <div className="bg-white min-h-screen">
      {/* =====================================================================
          1. HERO SECTION — Minimaliste, centré et futuriste (Apple / Google)
         ===================================================================== */}
      <section className="relative overflow-hidden bg-[#070A12] text-white py-24 sm:py-32">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <TopologyField className="w-full h-full pointer-events-none" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#070A12] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[#070A12]/30 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] text-white/90 text-xs font-medium backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8232C]" />
            <span>
              École Préparatoire aux Études Supérieures • Immersion 600h
            </span>
          </div>

          <h1 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-white">
            La formation PRESUP
          </h1>

          <p className="text-slate-300 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            Améliorez votre niveau et accédez à la formation de vos rêves !
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/candidater?formation=presup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8232C] hover:bg-[#a61b23] text-white text-xs sm:text-sm font-semibold shadow-lg transition-all"
            >
              <span>Candidater au programme PRESUP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="/brochures/dossier-candidature-2026-2027.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium border border-white/15 backdrop-blur-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger dossier candidature</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BARRE D'INDICATEURS CLÉS (Durée, Volume Horaire, Tarifs 2026-2027)
         ===================================================================== */}
      <section className="bg-[#F8FAFC] border-b border-slate-200/70 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0B0F19] text-white flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Période & Durée
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#0B0F19]">
                  Octobre à Août (10 mois)
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0B0F19] text-white flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Volume Horaire
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#0B0F19]">
                  600 heures de cours intensifs
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#C8232C] text-white flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Coût Annuel 2026–2027
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#0B0F19]">
                  690 000 FCFA{" "}
                  <span className="font-normal text-slate-500 text-xs">
                    (Inscr. 150 000 + 60 000/mois)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. PRÉSENTATION DU PROGRAMME PRESUP (Texte officiel en 2 colonnes)
         ===================================================================== */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
              VOCATION INTERNATIONALE
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-4xl text-[#0B0F19] tracking-tight leading-snug">
              AFI-L’UE accueille tous les ans un nombre croissant d’étudiants
              étrangers.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-slate-600 text-sm sm:text-base leading-relaxed">
            <div className="space-y-5">
              <p>
                Ces étudiants, recrutés sur la base de leurs bons résultats dans
                leur domaine de formation respectif, doivent avoir un niveau de
                français suffisant pour s’intégrer et profiter de manière
                performante des programmes proposés par l’université.
              </p>
              <p>
                C’est pourquoi, le groupe AFI-L’UE a mis en place le programme{" "}
                <strong className="text-[#0B0F19] font-semibold">PRESUP</strong>{" "}
                : Une école préparatoire aux études supérieures dans les
                universités de langue française qui a pour objectif de pallier
                aux difficultés d’ordre linguistique que rencontrent les
                étudiants non francophones de manière générale, durant les
                premières années de leur formation dans les universités
                francophones.
              </p>
            </div>

            <div className="bg-[#F5F7FA] rounded-[24px] p-7 sm:p-8 border border-slate-200/70 flex flex-col justify-between space-y-6">
              <p className="text-slate-700 leading-relaxed">
                <strong className="text-[#0B0F19] font-bold">PRESUP</strong>{" "}
                s’adresse donc à tous les pays non francophones, notamment aux
                pays de la sous-région Ouest africaine et d’Afrique Centrale (
                <span className="text-[#0B0F19] font-medium">
                  Guinée-Bissau, Cap Vert, Gambie, Ghana, Guinée-équatoriale
                </span>
                ), mais aussi à toutes les personnes souhaitant simplement
                améliorer leur niveau de français afin d’accéder à une formation
                supérieure.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/80">
                {[
                  "Guinée-Bissau",
                  "Cap-Vert",
                  "Gambie",
                  "Ghana",
                  "Guinée-Équatoriale",
                  "International",
                ].map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-medium text-[#0B0F19]"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. MODULES DE LA FORMATION (Bento Grid 2x2 sur fond Bleu Marine AFI)
         ===================================================================== */}
      <section className="py-24 sm:py-28 bg-gradient-to-b from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white relative overflow-hidden">
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/10 [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8232C]">
              ARCHITECTURE DU PROGRAMME
            </span>
            <h2 className="font-sans font-semibold text-xl sm:text-3xl text-white tracking-tight leading-relaxed">
              <strong className="font-bold">La formation</strong> propose aux
              étudiants un programme élaboré par des experts en la matière et
              comprend entre autres les modules suivants :
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PRESUP_MODULES.map((mod) => {
              const IconComponent = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="rounded-[26px] bg-white/[0.05] backdrop-blur-md border border-white/10 p-8 sm:p-9 space-y-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-400">{mod.subtitle}</p>
                      <div className="w-10 h-0.5 rounded-full bg-[#C8232C] pt-0.5" />
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {mod.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-slate-200"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#C8232C]/20 border border-[#C8232C]/40 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CONFORMITÉ TEST TFI™ & DOSSIER DE CANDIDATURE
         ===================================================================== */}
      <section className="py-24 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image officielle HD + Bouton Télécharger dossier candidature */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-slate-200/80 shadow-lg bg-slate-50">
                <Image
                  src="/images/programmes/presup-students.jpg"
                  alt="Étudiants du programme PRESUP AFI-L'UE"
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/brochures/dossier-candidature-2026-2027.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#C8232C] border border-slate-200 shadow-sm text-xs sm:text-sm font-bold transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger dossier candidature</span>
                </a>

                <Link
                  href="/candidater?formation=presup"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0B0F19] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all"
                >
                  <span>Postuler en ligne</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Texte officiel Test TFI™ */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#0B0F19] text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-[#C8232C]" />
                <span>CECRL : Niveaux A2 à C1</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#C8232C] tracking-tight">
                  AFI-L’UE en conformité avec le Test TFI™
                </h2>
                <div className="w-12 h-1 rounded-full bg-[#C8232C]" />
              </div>

              <p className="font-sans font-semibold text-sm sm:text-base text-[#0B0F19]">
                Norme internationale pour l’évaluation des compétences en
                français.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Le test TFI offre un standard international pour mesurer la
                capacité à communiquer en français à des niveaux indépendants et
                avancés (CECRL : A2-C1). Le test utilise un vocabulaire de tous
                les jours, des phrases et des expressions clés ainsi que des
                situations du monde réel. Les résultats des tests indiquent dans
                quelle mesure les gens peuvent communiquer en français
                académique, en français professionnel et en français quotidien.
                Le test TFI n’exige pas de connaissances spécialisées autres que
                celles d’une personne qui utilise le français dans ses activités
                professionnelles quotidiennes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

