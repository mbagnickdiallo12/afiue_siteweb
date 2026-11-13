"use client";

import Link from "next/link";
import {
  Globe2,
  Plane,
  GraduationCap,
  Award,
  Users2,
  Building2,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  FileText,
  Mail,
  Phone,
  Compass,
  MapPin,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export function MobiliteView() {
  const stats = [
    { value: "26+", label: "Nationalités représentées", detail: "Sur nos campus de Dakar et Thiès" },
    { value: "16+", label: "Partenaires internationaux", detail: "Universités, instituts et réseaux" },
    { value: "100%", label: "Conformité LMD & CAMES", detail: "Équivalence panafricaine et mondiale" },
    { value: "30+", label: "Ans d'ouverture panafricaine", detail: "Leadership académique depuis 1993" },
  ];

  const mobilityPillars = [
    {
      icon: Plane,
      badge: "Étudiants d'AFI-L'UE",
      title: "Mobilité Sortante (Outbound)",
      desc: "Offrez une dimension internationale à votre cursus grâce à des semestres d'études, des stages et des immersions dans nos universités partenaires en Europe, Afrique et Amérique du Nord.",
      highlights: [
        "Semestres d'échanges académiques avec validation de crédits ECTS",
        "Parcours International Leader avec double diplomation européenne (FEDE)",
        "Stages en entreprise à l'étranger facilités par notre réseau d'entreprises partenaires",
        "Préparation et passage officiel des certifications TOEIC™ et TFI™",
      ],
      color: "from-afi-red to-red-700",
      iconBg: "bg-afi-red/10 text-afi-red",
    },
    {
      icon: Users2,
      badge: "Étudiants Internationaux",
      title: "Mobilité Entrante (Inbound)",
      desc: "Chaque année, des centaines d'étudiants venus de plus de 26 pays africains et internationaux choisissent AFI-L'UE à Dakar ou Thiès pour l'excellence de ses diplômes reconnus par le CAMES et l'État.",
      highlights: [
        "Guichet unique d'accueil : assistance pour les formalités de visa et carte de séjour",
        "Aide à l'hébergement sécurisé à proximité immédiate des campus de Dakar et Thiès",
        "Semaine d'intégration interculturelle, parrainage étudiant et vie associative dynamique",
        "Accompagnement administratif et pédagogique personnalisé tout au long du cursus",
      ],
      color: "from-afi-navy to-[#1a2b5c]",
      iconBg: "bg-afi-navy/10 text-afi-navy",
    },
    {
      icon: GraduationCap,
      badge: "Corps Professoral & Recherche",
      title: "Mobilité des Enseignants & Chercheurs",
      desc: "La coopération internationale d'AFI-L'UE favorise l'échange de compétences et la recherche pluridisciplinaire au service des entreprises et du développement africain.",
      highlights: [
        "Accueil régulier de professeurs invités et de spécialistes internationaux",
        "Projet européen ManaGlobal (Horizon 2020) réunissant 16 organisations partenaires",
        "Colloques scientifiques conjoints, co-directions de mémoires et publications de recherche",
        "Partage de bonnes pratiques pédagogiques et harmonisation des programmes d'enseignement",
      ],
      color: "from-slate-900 to-slate-800",
      iconBg: "bg-slate-900/10 text-slate-900",
    },
  ];

  const flagshipPrograms = [
    {
      title: "Parcours International Leader",
      tag: "Double Diplomation",
      desc: "Disponible en Licence, ce parcours exclusif permet d'obtenir conjointement le diplôme d'État sénégalais (co-signé MESRI / accrédité CAMES) et le Diplôme Européen d'Études Supérieures (DEES de la FEDE), complété par la certification d'anglais TOEIC.",
      icon: Award,
    },
    {
      title: "Consortium ManaGlobal (Union Européenne)",
      tag: "Recherche Internationale",
      desc: "Programme d'échanges et de recherche sur le management globalisé et les pratiques africaines, financé par le programme Horizon 2020 de l'Union Européenne, associant l'AFI Research Center à 16 universités et laboratoires internationaux.",
      icon: Globe2,
    },
    {
      title: "Passeport Compétences Mondiales",
      tag: "Certifications Globales",
      desc: "Préparation intégrée aux certifications linguistiques (TOEIC pour l'anglais, Test TFI pour le français des affaires) et technologiques (Cisco Networking Academy, Huawei ICT Academy) pour une employabilité immédiate partout dans le monde.",
      icon: ShieldCheck,
    },
  ];

  const internationalPartners = [
    { name: "CAMES", desc: "Conseil Africain et Malgache pour l'Enseignement Supérieur (19 pays membres)" },
    { name: "FEDE", desc: "Fédération Européenne des Écoles (Genève / Paris)" },
    { name: "AUF", desc: "Agence Universitaire de la Francophonie" },
    { name: "ManaGlobal EU", desc: "Réseau européen et africain de recherche et de mobilité (Horizon 2020)" },
    { name: "UCAD (Labo FOCS)", desc: "Partenaire académique & recherche interuniversitaire" },
    { name: "Univ. Gaston Berger", desc: "Coopération académique & échanges d'enseignants" },
    { name: "Cisco Networking", desc: "Académie régionale de compétences numériques" },
    { name: "Huawei ICT Academy", desc: "Certifications technologies de pointe & cloud" },
  ];

  const steps = [
    {
      step: "01",
      title: "Définition du projet de mobilité",
      desc: "Choix de la destination, vérification des prérequis académiques et validation de la cohérence avec votre parcours.",
    },
    {
      step: "02",
      title: "Dossier de candidature & entretien",
      desc: "Dépôt des relevés de notes, lettre de motivation, justificatifs linguistiques et entretien avec la commission de mobilité.",
    },
    {
      step: "03",
      title: "Convention d'études & acceptation",
      desc: "Signature du contrat pédagogique (Learning Agreement) assurant la pleine reconnaissance de vos crédits à votre retour.",
    },
    {
      step: "04",
      title: "Préparation au départ & accompagnement",
      desc: "Assistance démarches consulaires, préparation logistique et suivi continu assuré par le Bureau des Relations Internationales.",
    },
  ];

  const faqs = [
    {
      q: "À quel moment de mon cursus puis-je postuler pour une mobilité internationale ?",
      a: "La mobilité étudiante est généralement ouverte à partir de la 2ème année de Licence (L2) et en Master. Les étudiants en Licence 1 peuvent néanmoins intégrer directement le parcours International Leader dès leur inscription.",
    },
    {
      q: "Mes cours suivis à l'étranger sont-ils validés dans mon diplôme AFI-L'UE ?",
      a: "Absolument. Conformément au système LMD et au contrat pédagogique signé avant votre départ, chaque crédit ECTS ou équivalent validé dans l'université partenaire est reconnu de plein droit pour l'obtention de votre diplôme à AFI-L'UE.",
    },
    {
      q: "Je suis un étudiant étranger, comment intégrer AFI-L'UE à Dakar ou Thiès ?",
      a: "Vous pouvez candidater 100% en ligne sur notre plateforme. Dès votre pré-inscription validée, notre Bureau International vous délivre une attestation de pré-inscription pour vos formalités consulaires et vous guide jusqu'à votre arrivée.",
    },
    {
      q: "Quelles sont les opportunités de stages à l'international ?",
      a: "Grâce à notre service carrières et aux conventions signées avec des multinationales partenaires opérant dans toute la sous-région et en Europe, nous accompagnons nos étudiants dans la recherche de stages de fin d'études à l'étranger.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white">
      {/* =========================================================================
          1. HERO PRESTIGE (Brand Dark Gradient, Editorial & Modern)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white py-16 sm:py-24">
        {/* Subtle Ambient Navy Blue Glow */}
        <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1E2E6B]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-12 w-[500px] h-[500px] rounded-full bg-afi-red/15 blur-3xl pointer-events-none" />

        {/* Modern Dot Pattern */}
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/15 [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
        />

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
          <div className="max-w-4xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase border border-white/15 backdrop-blur-md">
              <Globe2 className="w-3.5 h-3.5 text-afi-red" />
              <span>Relations Internationales &amp; Coopération</span>
            </span>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Mobilité Internationale &amp; Rayonnement Académique
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-3xl">
              Depuis plus de 30 ans, AFI-L’Université de l’Entreprise fait de l’ouverture sur le monde un pilier de son excellence académique. Échanges étudiants, doubles diplômes européens, accueil de plus de 26 nationalités et partenariats mondiaux : donnez à votre avenir une portée résolument internationale.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/candidater"
              className="px-6 sm:px-8 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-98 inline-flex items-center gap-2 group"
            >
              <span>Candidater à AFI-L&apos;UE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="px-6 sm:px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold tracking-wide uppercase transition-all border border-white/20 backdrop-blur-md inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span>Contacter le pôle mobilité</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CHIFFRES CLÉS DE L'INTERNATIONALISATION
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
          3. LES 3 VOLETS DE LA MOBILITÉ
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
            Une dynamique à 360 degrés
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
            Les Trois Volets de la Mobilité à AFI-L&apos;UE
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Que vous souhaitiez vous former à l&apos;étranger, rejoindre notre campus dakarois ou mener des travaux de recherche conjoints, découvrez nos passerelles d&apos;échange.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mobilityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
              >
                <div className="space-y-6">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-black text-xl text-slate-900 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    {pillar.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer link */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-afi-navy hover:text-afi-red transition-colors group/link"
                  >
                    <span>Renseignements &amp; démarches</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. PROGRAMMES PHARES D'OUVERTURE INTERNATIONALE
          ========================================================================= */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-afi-red/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1E2E6B]/20 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Parcours &amp; Alliances Globales
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
              Des Programmes Conçus pour les Leaders Mondiaux
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Nos cursus associent reconnaissance nationale d&apos;État, accréditation panafricaine CAMES et double diplomation européenne pour propulser nos diplômés partout sur le continent et dans le monde.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {flagshipPrograms.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4 flex flex-col justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-afi-red/20 text-afi-red flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-slate-200">
                        {prog.tag}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white">
                      {prog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Link
                      href="/formations"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-afi-red transition-colors"
                    >
                      <span>Explorer les formations éligibles</span>
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
          5. PARTENAIRES ACADÉMIQUES & INSTITUTIONNELS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
            Réseau Panafricain &amp; International
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
            Des Accords Institutionnels Majeurs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            AFI-L&apos;UE collabore avec des institutions et réseaux d&apos;enseignement supérieur de premier plan pour sécuriser la valeur de vos diplômes et multiplier les opportunités de mobilité.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {internationalPartners.map((part, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xs">
                {part.name.substring(0, 3)}
              </div>
              <h4 className="font-heading font-black text-sm text-slate-900">
                {part.name}
              </h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                {part.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. ÉTAPES D'UNE CANDIDATURE À LA MOBILITÉ
          ========================================================================= */}
      <section className="bg-slate-100 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Guide pas à pas
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
              Comment Préparer Votre Mobilité ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Le Bureau des Relations Internationales d&apos;AFI-L&apos;UE vous accompagne à chaque étape pour garantir le succès de votre séjour d&apos;études.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3 relative overflow-hidden"
              >
                <div className="font-heading font-black text-3xl sm:text-4xl text-afi-red/20">
                  {st.step}
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900">
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
          7. FOIRE AUX QUESTIONS (FAQ MOBILITÉ)
          ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
            Questions Fréquentes
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
            Tout Ce Que Vous Devez Savoir sur la Mobilité
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2"
            >
              <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-afi-red shrink-0 mt-0.5" />
                <span>{f.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. CONTACT DU PÔLE MOBILITÉ (BANDEAU ACTION)
          ========================================================================= */}
      <section className="bg-gradient-to-r from-afi-navy to-slate-950 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Bureau des Relations Internationales &amp; Mobilité
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Un Projet de Mobilité ? Échangeons Ensemble
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nos conseillers sont à votre écoute pour vous orienter sur les démarches, les bourses, le logement et les universités partenaires.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a
              href="mailto:afi@afi-ue.sn"
              className="px-6 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>afi@afi-ue.sn</span>
            </a>

            <a
              href="tel:+221338247110"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wider uppercase transition-all border border-white/15 inline-flex items-center gap-2 font-mono"
            >
              <Phone className="w-4 h-4" />
              <span>+221 33 824 71 10</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
