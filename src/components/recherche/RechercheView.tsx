"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  BookOpen,
  Layers,
  Microscope,
  Users,
  Presentation,
  BarChart3,
  Scale,
  Cpu,
  Sparkles,
  Handshake,
  Globe2,
  Calendar,
  Compass,
  Award,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export function RechercheView() {
  const articlesTrackRef = useRef<HTMLDivElement>(null);
  const [articleIndex, setArticleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [stepWidth, setStepWidth] = useState(0);
  const isHoveredRef = useRef(false);

  const interrogations = [
    {
      num: "01",
      question: "Quels sont les maux de nos entreprises ?",
    },
    {
      num: "02",
      question:
        "Nos politiques sont-elles alignées aux objectifs de performances des entreprises africaines ?",
    },
    {
      num: "03",
      question:
        "Comment être en phase avec la globalisation tout en valorisant nos potentiels et savoir-faire locaux ?",
    },
  ];

  const missions = [
    {
      num: "01",
      icon: BookOpen,
      text: "Traduire, sous un angle interdisciplinaire, les pulsions de l’entreprise en réalités pédagogiques ;",
    },
    {
      num: "02",
      icon: Users,
      text: "Regrouper des chercheurs qui réfléchissent sur des thématiques transversales et produisent des savoirs ancrés dans les valeurs africaines ;",
    },
    {
      num: "03",
      icon: Presentation,
      text: "Promouvoir la dissémination des résultats de la recherche scientifique par l’organisation et la participation à des activités tels que :",
      items: [
        "– Tables rondes.",
        "– Conférences.",
        "– Séminaires, ateliers et congres nationaux et internationaux.",
      ],
    },
  ];

  const axes = [
    {
      id: 0,
      icon: BarChart3,
      title: "Sciences économiques et gestion",
      description:
        "Management des entreprises, stratégie, innovation, finance, comptabilité, RH, marketing et entrepreneuriat.",
      themes: [
        "Comportement des acteurs économiques",
        "Management (inter)culturel des entreprises",
        "Pratiques RH et performance des organisations",
        "Innovation organisationnelle et technologique",
        "Finance d’entreprise et de marché",
        "Consommation, commerce et culture en Afrique",
      ],
    },
    {
      id: 1,
      icon: Scale,
      title: "Sciences Juridiques et Politiques",
      description:
        "Études orientées sur le droit des affaires et ses enjeux dans la gouvernance des entreprises et des organisations.",
      themes: [
        "Commerce international",
        "Droit du commerce",
        "Droit du travail",
        "Droit des contrats et des obligations",
        "Droit et libertés à l’ère du numérique",
      ],
    },
    {
      id: 2,
      icon: Cpu,
      title: "Sciences et Technologies",
      description:
        "Travaux consacrés à la transformation numérique, au développement Web, au marketing digital et à l’IA.",
      themes: [
        "Système d’information et gestion des données",
        "E-commerce",
        "Communication digitale territoriale",
        "Intelligence artificielle",
        "Médias et société",
      ],
    },
  ];

  const activites = [
    "SEMINAIRES",
    "CONFERENCES",
    "JOURNEES SCIENTIFIQUES",
    "ATELIERS SCIENTIFIQUES",
    "COLLOQUES",
    "WORKING PROGRESS SEMINARY ;",
  ];

  const concepts = ["– AFI Research Days,", "– Expertise trajectoire."];

  const universitesPartenaires = [
    "LABO FOCS de l’UCAD ;",
    "Université Gaston Berger de Saint-Louis ;",
    "Université Alioune Diop de Bambey.",
  ];

  const articles = [
    {
      date: "03 Juil 2025",
      title:
        "Séminaire de formation à la recherche documentaire organisé par AFI-Research Center",
      excerpt:
        "Les 5 et 6 mai 2025, le Centre de Recherche AFI-Research Center, structure du Groupe AFI-L’Université de l’Entreprise...",
      image: "/images/recherche/arc-seminaire-2025.jpg",
      slug: "/actualites",
    },
    {
      date: "03 Mai 2023",
      title: "Journée Scientifique 2023 du Groupe AFI-L’UE",
      excerpt:
        "AFI-Research Center a célébré le 3 mai 2023 le trentième anniversaire du Groupe AFI-L’UE en organisant une journée scientifique...",
      image: "/images/recherche/arc-conference.jpg",
      slug: "/actualites",
    },
    {
      date: "2021",
      title: "Summer School 2021 – Consortium Managlobal",
      excerpt:
        "A l’occasion de la Summer school 2021, organisée par le consortium de recherche et de formation Managlobal, l’équipe...",
      image: "/images/recherche/afi-lab.jpg",
      slug: "/actualites",
    },
    {
      date: "2020",
      title: "Journées d’études – AFIFOCS RESEARCH CENTER",
      excerpt:
        "AFIFOCS RESEARCH CENTER du Groupe AFI-L'UE, en collaboration avec le laboratoire FOCS de la Faculté Des Sciences...",
      image: "/images/recherche/arc-hero.jpg",
      slug: "/actualites",
    },
    {
      date: "13 Jan 2020",
      title: "LANCEMENT – AFI FOCS RESEARCH CENTER",
      excerpt:
        "Les 13 et 14 Janvier 2020, le groupe AFI L’UE a procédé au lancement de son laboratoire de recherche AFI FOCS...",
      image: "/images/recherche/arc-conference.jpg",
      slug: "/actualites",
    },
  ];

  const extendedArticles = [...articles, ...articles];

  useEffect(() => {
    const updateStep = () => {
      if (!articlesTrackRef.current) return;
      const first = articlesTrackRef.current.children[0] as HTMLElement | undefined;
      const second = articlesTrackRef.current.children[1] as HTMLElement | undefined;
      if (first && second) {
        setStepWidth(second.offsetLeft - first.offsetLeft);
      }
    };
    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isHoveredRef.current) return;
      setArticleIndex((prev) => {
        if (prev >= articles.length) {
          setIsTransitioning(false);
          return 0;
        }
        setIsTransitioning(true);
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [articles.length]);

  const handleArticlesTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== articlesTrackRef.current) return;
    if (articleIndex >= articles.length) {
      setIsTransitioning(false);
      setArticleIndex(0);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      {/* =========================================================================
          1. HERO FUTURISTE (Brand Blue Gradient & Dot Pattern)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white py-16 sm:py-20">
        {/* Subtle Ambient Navy Blue Glow */}
        <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1E2E6B]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-12 w-[500px] h-[500px] rounded-full bg-[#182559]/20 blur-3xl pointer-events-none" />

        {/* Modern Dot Pattern with Radial Mask */}
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/15 [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Typography & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-afi-red">Recherche</span>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-afi-red text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Notre Centre de Recherche</span>
                </div>

                <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.06]">
                  AFI RESEARCH CENTER
                </h1>

                <p className="text-slate-300 text-lg sm:text-2xl font-light tracking-tight">
                  “Ensemble, construisons demain.”
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/candidater"
                  className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg shadow-afi-red/25 active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Rejoignez-nous</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#axes-recherche"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/15 transition-all"
                >
                  Explorer les axes de recherche
                </a>
              </div>

              {/* Minimalist Key Pillars Strip with Shimmer Beam */}
              <div className="relative pt-8 border-t border-white/10 overflow-hidden">
                {/* Animated scanning shimmer beam */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-afi-red to-transparent w-1/3 animate-shimmer-beam" />

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="font-heading font-black text-xl sm:text-2xl text-white">
                      ARC
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Centre de Recherche
                    </div>
                  </div>
                  <div>
                    <div className="font-heading font-black text-xl sm:text-2xl text-white">
                      AFI-Lab
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Laboratoire Pluridisciplinaire
                    </div>
                  </div>
                  <div>
                    <div className="font-heading font-black text-xl sm:text-2xl text-white">
                      3 Axes
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Gestion, Droit &amp; Tech
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Simple Clean Visual */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-slate-900">
                <Image
                  src="/images/recherche/arc-hero.jpg"
                  alt="AFI Research Center - Notre Centre de Recherche"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MANIFESTE & LES 3 INTERROGATIONS FONDAMENTALES (Apple Editorial Bento)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Narrative Manifesto */}
            <FadeIn className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                  Développement &amp; Innovation
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  AFI RESEARCH CENTER
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p className="text-slate-900 font-medium text-sm sm:text-base leading-relaxed">
                  Suivant ses orientations de recherche axées sur le développement et l’innovation, le Groupe AFI-L’UE a créé AFI-Research Center (ARC), en tant que centre de recherche du groupe AFI-L’UE.
                </p>
                <p>
                  En effet, au regard des mutations économiques et sociales et des avancées technologiques qui impulsent une constante variance du fonctionnement des organisations, il apparait nécessaire de mettre à profit la recherche afin de contribuer à adapter au mieux les techniques de gestion des entreprises africaines.
                </p>
                <p>
                  Aussi, une synergie entre le monde académique et celui des entreprises s’avère indispensable pour ensemble déceler et comprendre les défis auxquels sont confrontés les managers africains. Autour de cette alliance, ARC tente de trouver des solutions face à ces obstacles et difficultés de gestion liés aux contextes socioculturels des économies locales.
                </p>
                <p>
                  Dans sa démarche, le centre de recherche du Groupe AFI-L’UE réunit académiciens, managers d’entreprises et chercheurs autour de thématiques liées à la recherche et au développement de nos industries pour une croissance durable, afin de se poser les bonnes questions.
                </p>
              </div>
            </FadeIn>

            {/* Right Column: The 3 Fundamental Questions Bento Stack */}
            <StaggerContainer staggerChildren={0.1} className="lg:col-span-6 space-y-4">
              {interrogations.map((item) => (
                <StaggerItem key={item.num}>
                  <div
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-afi-red/40 hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
                  >
                    <span className="w-10 h-10 rounded-2xl bg-afi-red text-white font-heading font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {item.num}
                    </span>
                    <p className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug pt-1.5">
                      {item.question}
                    </p>
                  </div>
                </StaggerItem>
              ))}

              <StaggerItem>
                <div className="p-6 rounded-3xl bg-[#0B0F19] text-white border border-white/10 space-y-2 shadow-xl">
                  <div className="flex items-center gap-2 text-afi-red text-xs font-bold uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>Dynamique Commune</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    C’est dans une dynamique commune de partage d’expériences motivée par un profond désir de service à la communauté que les acteurs de ARC tentent ensemble de répondre à ces interrogations fondamentales pour le fleurissement de nos économies locales.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. OBJECTIFS & COMITÉ SCIENTIFIQUE (3-Card Apple Bento Grid)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Vocation Scientifique
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight uppercase">
              OBJECTIFS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              AFI Research Center (ARC) a pour but de promouvoir la recherche à travers :
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* La capitalisation */}
            <div className="lg:col-span-4 p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-xl text-slate-900">
                  La capitalisation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  La capitalisation des résultats des recherches scientifiques par intégration dans des curricula de formation constamment adaptés ;
                </p>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Pédagogie &amp; Curricula
              </div>
            </div>

            {/* La modélisation */}
            <div className="lg:col-span-4 p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                  <Microscope className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-xl text-slate-900">
                  La modélisation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  La modélisation de ces résultats scientifiques en solutions et outils opérationnels pour les entreprises et les organisations ainsi que pour leurs managers et employés.
                </p>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Solutions Opérationnelles
              </div>
            </div>

            {/* Comité Scientifique & Publications Internationales */}
            <div className="lg:col-span-4 p-7 sm:p-8 rounded-3xl bg-[#0B0F19] text-white border border-white/10 flex flex-col justify-between space-y-5 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-afi-red/20 blur-2xl pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-afi-red flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-black text-xl text-white">
                  Comité Scientifique &amp; Revues Internationales
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Le centre de recherche a aussi pour vocation de former ses chercheurs aux outils de recherche et méthodes de rédaction des contributions scientifiques publiables dans des revues internationales.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dans cette perspective, un comité scientifique constitué d’académiciens, de professionnels de l’environnement des affaires et des organisations, est chargé de proposer régulièrement des thématiques nouvelles liées au management des organisations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. NOTRE LABORATOIRE : AFI-Lab & SES MISSIONS (Unified Studio Layout)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Top Stage: AFI-Lab Bento Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Dual Visual Stack */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100">
                <Image
                  src="/images/recherche/afi-lab.jpg"
                  alt="Notre Laboratoire : AFI-Lab"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100">
                <Image
                  src="/images/recherche/arc-conference.jpg"
                  alt="Conférences et travaux scientifiques AFI-Lab"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                  Laboratoire de Recherche Pluridisciplinaire
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  NOTRE LABORATOIRE : AFI-Lab
                </h2>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p className="text-slate-900 font-medium">
                  AFI-Lab est un laboratoire de recherche pluridisciplinaire sous la tutelle de AFI-Research Center (ARC) et constitue un ancrage important de AFI L’Université de l’Entreprise dans la formation, la recherche scientifique, l’innovation et l’insertion.
                </p>
                <p>
                  AFI-Lab a pour ambition de mener des réflexions sur des thématiques liées aux sciences économiques et de gestion, aux sciences et technologies de l’information et de la Communication, aux sciences juridiques et politiques.
                </p>
                <p>
                  L’objectif visé est de mieux répondre aux problématiques liées au management des entreprises africaines avec l’ambition de contribuer de manière active au débat scientifique à travers ses activités de recherche.
                </p>
                <p>
                  Ainsi AFI-Lab se veut un espace dédié à la production scientifique qui s’ouvre aux échanges et brassages d’expériences et d’expertises entre acteurs du monde académique et professionnels des organisations, de l’entreprise et plus généralement de l’environnement des affaires.
                </p>
                <p>
                  Les thématiques abordées vont s’articuler essentiellement autour des pratiques managériales ancrées dans des valeurs socioculturelles africaines.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Stage: MISSIONS */}
          <div className="pt-6 border-t border-slate-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                  Piliers d&apos;Action
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight uppercase mt-1">
                  MISSIONS
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-afi-red/10 text-afi-red font-heading font-bold text-xs">
                <Quote className="w-3.5 h-3.5" />
                <span>“Ensemble, construisons demain.”</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {missions.map((m) => {
                const IconComponent = m.icon;
                return (
                  <div
                    key={m.num}
                    className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-400">
                          {m.num}
                        </span>
                      </div>

                      <p className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-relaxed">
                        {m.text}
                      </p>

                      {m.items && (
                        <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-600">
                          {m.items.map((item, iIdx) => (
                            <li key={iIdx} className="font-medium text-slate-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. AXES DE RECHERCHE (Minimalist Bento Cards)
          ========================================================================= */}
      <section
        id="axes-recherche"
        className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Domaines Scientifiques AFI-Lab
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight uppercase">
              AXES DE RECHERCHE
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Trois grands pôles pluridisciplinaires couvrant la gestion, le droit et les technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {axes.map((axe) => {
              const IconComponent = axe.icon;

              return (
                <div
                  key={axe.id}
                  className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-afi-red/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <IconComponent className="w-8 h-8 text-afi-red stroke-[1.75]" />

                    <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 leading-snug">
                      {axe.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {axe.description}
                    </p>

                    <ul className="space-y-2 pt-3 border-t border-slate-100">
                      {axe.themes.map((theme, tIdx) => (
                        <li
                          key={tIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                          <span>{theme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. ANIMATION SCIENTIFIQUE (Futuristic Dark Bento Grid)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white relative overflow-hidden">
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/10 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#1E2E6B]/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Animation Scientifique & Nos Concepts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                  Diffusion des Travaux
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                  ANIMATION SCIENTIFIQUE
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dans la conduite de sa mission, le laboratoire AFI-Lab contribue à l’animation scientifique par l’organisation d’activités qui permettent la diffusion des travaux effectués.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-afi-red">
                  NOS CONCEPTS :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {concepts.map((cpt, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/10 text-xs sm:text-sm font-bold text-white"
                    >
                      {cpt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: ACTIVITES 2x3 Bento */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-afi-red">
                ACTIVITES :
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activites.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-afi-red/50 transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <span className="font-mono text-[11px] font-bold text-afi-red">
                      0{idx + 1}
                    </span>
                    <span className="font-heading font-black text-xs sm:text-sm text-white tracking-wide">
                      {act}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. PARTENARIATS ET COLLABORATIONS & PROJET MANAGLOBAL
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Top Block: Partenariats Académiques */}
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                Réseau Scientifique &amp; International
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight uppercase">
                PARTENARIATS ET COLLABORATIONS
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Considérant l’importance de la coopération interuniversitaire, AFI-Lab collabore avec plusieurs institutions académiques du monde scientifique.
              </p>
            </div>

            {/* 3 Partner Universities Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {universitesPartenaires.map((univ, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center shrink-0">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <span className="font-heading font-black text-sm sm:text-base text-slate-900">
                    {univ}
                  </span>
                </div>
              ))}
            </div>

            {/* Partnership Objectives */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <p className="font-heading font-bold text-sm sm:text-base text-slate-900">
                Ces partenariats ont pour objet :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5" />
                  <span>
                    Le développement et le perfectionnement de la formation, notamment de l’enseignement supérieur, de la recherche scientifique, technique, culturelle et dans l’étude des problématiques liées à l’intérêt général
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5" />
                  <span>
                    Les échanges en termes d’expériences, d’expertises, de bonnes pratiques, notamment à travers la mobilité des étudiants, du personnel d’encadrement administratif et du personnel d’enseignement et de recherche.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Block: Flagship Case Study — PROJET MANAGLOBLAL */}
          <div className="rounded-[32px] bg-[#0B0F19] text-white p-8 sm:p-12 border border-white/10 relative overflow-hidden space-y-8">
            <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-afi-red/15 blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-afi-red">
                  <Globe2 className="w-4 h-4" />
                  <span>Programme Européen Horizon 2020 · RISE</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  PROJET MANAGLOBLAL
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold">
                  Université Rennes 2
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-afi-red text-white text-xs font-bold">
                  1,5M € · 4 ans
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold">
                  16 Organisations Partenaires
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="lg:col-span-5 space-y-5">
                <p>
                  Lancé en janvier 2019 et porté par l’Université Rennes 2, ManaGlobal est un projet de recherche et de formation innovant (RISE) qui s’intéresse aux pratiques de gestion dans plusieurs pays africains et arabes. Il a reçu le soutien du programme Horizon 2020 de l’Union européenne à travers le programme d’Actions Marie Sklodowska-Curie et bénéficie d’un financement de 1,5 millions d’euros sur 4 ans. Sa problématique est résumée par la question suivante :
                </p>

                <div className="p-6 rounded-2xl bg-white/[0.06] border border-afi-red/40 text-white font-heading font-bold text-sm sm:text-base leading-snug">
                  “Comment les entreprises et leurs filiales deviennent-elles rentables et se développent-elles dans les pays émergents ?”
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <p>
                  Pour répondre à cette question, ManaGlobal s’efforce de mesurer l’écart entre les normes de gestion mondialisées et les pratiques locales. Il étudie les formes hybrides et innovantes de gouvernance d’entreprises privées et la manière dont elles peuvent être façonnées par la mobilité des personnes, des capitaux, des biens et des connaissances. Le projet de recherche s’attache également à analyser comment les pratiques commerciales locales traditionnelles, souvent perçues comme des freins au développement, peuvent aussi se transformer en opportunités.
                </p>
                <p>
                  En réunissant seize organisations partenaires dans différents pays européens, africains, et arabes, ManaGlobal est aussi innovant et pionnier dans les collaborations qu’il a mises en place. Il s’appuie sur un réseau d’universitaires et d’entrepreneurs africains, arabes, et européens, de chefs d’entreprises, de managers et de décideurs institutionnels.
                </p>
                <p>
                  AFI-L’UE joue parfaitement sa partition dans ce programme international. En effet, après avoir co-organisé avec l’UCAD une pré-conférence et une conférence au Sénégal, AFI-LUE, en partenariat avec l’Université Rennes II, assure le pilotage pédagogique d’une formation en ligne, de courte durée, offerte gratuitement sur le thème du management dans un environnement globalisé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. ARTICLES & PUBLICATIONS (One-Way Infinite Carousel)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                Actualités Scientifiques
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight uppercase">
                ARTICLES
              </h2>
            </div>

            <Link
              href="/formations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-xs self-start sm:self-end"
            >
              <span>Voir nos programmes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div
            className="overflow-hidden py-2 -my-2"
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
            onTouchStart={() => {
              isHoveredRef.current = true;
            }}
            onTouchEnd={() => {
              isHoveredRef.current = false;
            }}
          >
            <div
              ref={articlesTrackRef}
              onTransitionEnd={handleArticlesTransitionEnd}
              className={`flex items-stretch gap-6 ${
                isTransitioning
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translate3d(-${articleIndex * stepWidth}px, 0, 0)`,
              }}
            >
              {extendedArticles.map((art, idx) => (
                <article
                  key={idx}
                  className="w-[85vw] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#191D38] to-[#28315E]">
                    <div className="absolute inset-0 pattern-grid-dots opacity-35 pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#364482]/40 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-afi-red" />
                        <span>{art.date}</span>
                      </div>

                      <h3 className="font-heading font-black text-base text-slate-900 group-hover:text-afi-red transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <Link
                        href={art.slug}
                        className="text-xs font-bold text-afi-red hover:underline inline-flex items-center gap-1.5"
                      >
                        <span>Lire plus</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
