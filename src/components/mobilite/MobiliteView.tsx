"use client";

import Link from "next/link";
import {
  Globe2,
  Plane,
  GraduationCap,
  Award,
  Users2,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import TopologyField from "@/components/ui/topology-field";
import TextRevealFaqs from "@/components/ui/text-reveal-faqs";

export function MobiliteView() {
  const stats = [
    { value: "26+", label: "Nationalités", detail: "Étudiants sur nos campus" },
    { value: "16+", label: "Partenaires", detail: "Universités & réseaux mondiaux" },
    { value: "100%", label: "Conformité LMD", detail: "Crédits ECTS & CAMES" },
    { value: "30+", label: "Ans d'expérience", detail: "Excellence depuis 1993" },
  ];

  const mobilityPillars = [
    {
      icon: Plane,
      iconColor: "text-afi-red",
      badge: "Étudiants d'AFI-L'UE",
      title: "Mobilité Sortante",
      desc: "Effectuez un semestre d'études ou un stage certifié auprès de nos universités partenaires en Europe, Afrique et Amérique.",
      highlights: [
        "Semestres d'échanges avec crédits ECTS",
        "Double diplomation européenne (FEDE)",
        "Stages en entreprises internationales",
      ],
    },
    {
      icon: Users2,
      iconColor: "text-afi-navy",
      badge: "Étudiants Internationaux",
      title: "Mobilité Entrante",
      desc: "Rejoignez AFI-L'UE à Dakar ou Thiès et bénéficiez de diplômes d'État sénégalais accrédités par le CAMES.",
      highlights: [
        "Guichet unique d'accueil & assistance visa",
        "Aide à l'hébergement sécurisé",
        "Intégration culturelle & parrainage",
      ],
    },
    {
      icon: GraduationCap,
      iconColor: "text-slate-800",
      badge: "Corps Professoral & Recherche",
      title: "Mobilité Enseignants & Chercheurs",
      desc: "Développez des projets conjoints de recherche pluridisciplinaire et d'échanges d'expertises académiques.",
      highlights: [
        "Professeurs invités et experts internationaux",
        "Consortium européen ManaGlobal (Horizon 2020)",
        "Colloques et publications scientifiques conjoints",
      ],
    },
  ];

  const flagshipPrograms = [
    {
      title: "Parcours International Leader",
      tag: "Double Diplomation",
      desc: "Double diplôme d'État sénégalais (CAMES) et Diplôme Européen (DEES FEDE), complété par la certification officielle TOEIC.",
      icon: Award,
    },
    {
      title: "Consortium ManaGlobal",
      tag: "Recherche Européenne",
      desc: "Réseau de recherche et de mobilité (Horizon 2020) associant AFI Research Center à 16 universités et laboratoires internationaux.",
      icon: Globe2,
    },
    {
      title: "Passeport Compétences Mondiales",
      tag: "Certifications",
      desc: "Préparation certifiante intégrée : TOEIC, Test TFI, Cisco Networking Academy et Huawei ICT Academy.",
      icon: ShieldCheck,
    },
  ];

  const internationalPartners = [
    { name: "CAMES", desc: "Conseil Africain et Malgache pour l'Enseignement Supérieur (19 pays)" },
    { name: "FEDE", desc: "Fédération Européenne des Écoles (Genève / Paris)" },
    { name: "AUF", desc: "Agence Universitaire de la Francophonie" },
    { name: "ManaGlobal EU", desc: "Réseau de recherche et mobilité (Horizon 2020)" },
    { name: "UCAD (Labo FOCS)", desc: "Partenaire académique & recherche interuniversitaire" },
    { name: "Univ. Gaston Berger", desc: "Coopération académique & échanges d'enseignants" },
    { name: "Cisco Networking", desc: "Académie régionale de compétences numériques" },
    { name: "Huawei ICT Academy", desc: "Certifications technologies de pointe & cloud" },
  ];

  const steps = [
    {
      step: "01",
      title: "Projet de mobilité",
      desc: "Choix de la destination et validation pédagogique avec votre coordinateur.",
    },
    {
      step: "02",
      title: "Dossier & Entretien",
      desc: "Dépôt des pièces académiques et entretien avec la commission de sélection.",
    },
    {
      step: "03",
      title: "Convention d'études",
      desc: "Signature du contrat pédagogique garantissant la validation des crédits ECTS.",
    },
    {
      step: "04",
      title: "Départ & Suivi",
      desc: "Assistance visa, hébergement et accompagnement continu à destination.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white">
      {/* =========================================================================
          1. HERO PRESTIGE (TopologyField 3D, Minimaliste & Pur Apple/Google)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#070A12] text-white pt-32 sm:pt-40 pb-16 sm:pb-24">
        {/* TopologyField 3D Canvas Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <TopologyField className="w-full h-full pointer-events-none" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#070A12] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[#070A12]/30 pointer-events-none" />

        {/* Subtle Ambient Navy & Brand Glow */}
        <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1E2E6B]/20 blur-3xl pointer-events-none z-[1]" />
        <div className="absolute -bottom-24 -left-12 w-[500px] h-[500px] rounded-full bg-afi-red/15 blur-3xl pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-afi-red">Mobilité Internationale</span>
          </div>

          {/* Main Title & Lead */}
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-afi-red">
              <Globe2 className="w-4 h-4 text-afi-red" strokeWidth={2} />
              <span>Relations Internationales &amp; Coopération</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Mobilité Internationale &amp; Rayonnement Académique
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl">
              Échanges académiques, doubles diplômes européens et immersions internationales : construisez un parcours d&apos;excellence mondiale à AFI-L&apos;UE.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/candidater"
              className="inline-flex items-center justify-between gap-3.5 pl-6 pr-1.5 py-1.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-98 group"
            >
              <span>Candidater à AFI-L&apos;UE</span>
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-afi-red flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-between gap-3.5 pl-6 pr-1.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:scale-[1.02] group"
            >
              <span>Contacter le pôle mobilité</span>
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#191D38] group-hover:bg-afi-red text-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CHIFFRES CLÉS (Format Cartes Épurées)
          ========================================================================= */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between"
            >
              <div className="font-heading font-black text-2xl sm:text-4xl text-afi-navy tracking-tight">
                {s.value}
              </div>
              <div className="mt-1">
                <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {s.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. LES 3 VOLETS DE LA MOBILITÉ (Design Simple & Minimaliste, Zéro Contour)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
            Une dynamique internationale
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
            Les Trois Volets de la Mobilité
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Des passerelles d&apos;échange ouvertes à l&apos;ensemble de notre communauté académique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {mobilityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Icon libre sans fond ni contour + Badge typographique pur */}
                  <div className="flex items-center justify-between">
                    <Icon className={`w-8 h-8 ${pillar.iconColor}`} strokeWidth={1.75} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Desc concis */}
                  <div className="space-y-1.5">
                    <h3 className="font-heading font-black text-xl text-slate-900 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* 3 points clés concis */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {pillar.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-afi-red shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer link minimaliste */}
                <div className="pt-5 mt-6 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-afi-navy hover:text-afi-red transition-colors group/link"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. PROGRAMMES INTERNATIONAUX PHARES (Fond Opaque Solide, Sans Contour d'Icône)
          ========================================================================= */}
      <section className="bg-[#070A12] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-afi-red/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1E2E6B]/20 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Parcours &amp; Alliances
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              Des Programmes Conçus pour les Leaders
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Doubles diplômes et programmes certifiants pour une reconnaissance académique mondiale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {flagshipPrograms.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-4">
                    {/* Icon libre sans contour ni fond transparent + Tag typographique */}
                    <div className="flex items-center justify-between">
                      <Icon className="w-8 h-8 text-afi-red" strokeWidth={1.75} />
                      <span className="text-xs font-bold uppercase tracking-wider text-afi-red">
                        {prog.tag}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white">
                      {prog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-800">
                    <Link
                      href="/formations"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-afi-red transition-colors"
                    >
                      <span>Explorer les formations</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PARTENAIRES ACADÉMIQUES & INSTITUTIONNELS (Design Pur & Épuré)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
            Accords Institutionnels
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
            Partenaires &amp; Réseaux d&apos;Excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Des accords académiques majeurs pour sécuriser la valeur internationale de vos diplômes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {internationalPartners.map((part, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-1.5 hover:border-slate-300 transition-colors"
            >
              <h4 className="font-heading font-bold text-sm text-slate-900">
                {part.name}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {part.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. ÉTAPES D'UNE CANDIDATURE À LA MOBILITÉ (Processus Minimaliste 4 Étapes)
          ========================================================================= */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Processus
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
              Comment Préparer Votre Mobilité ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Un accompagnement personnalisé à chaque étape de votre démarche internationale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-2"
              >
                <div className="font-heading font-black text-2xl text-afi-navy">
                  {st.step}
                </div>
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FOIRE AUX QUESTIONS (FAQ MOBILITÉ - Style TextReveal)
          ========================================================================= */}
      <TextRevealFaqs
        badge="Questions Fréquentes"
        title="Tout Ce Que Vous Devez Savoir sur la Mobilité"
        description="Retrouvez toutes les réponses essentielles sur les échanges universitaires, l'accueil des étudiants étrangers, la reconnaissance des crédits ECTS et les stages internationaux."
      />
    </div>
  );
}
