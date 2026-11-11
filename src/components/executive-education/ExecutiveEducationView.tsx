"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Laptop,
  Sparkles,
  Award,
  BarChart3,
  Scale,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Users,
  Building2,
  FileCheck2,
} from "lucide-react";
import { Formation } from "@/types/database";
import { FocusFilieres } from "@/components/home/FocusFilieres";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, HoverLift } from "@/components/ui/motion";

interface ExecutiveEducationViewProps {
  formations: Formation[];
}

export function ExecutiveEducationView({ formations: _formations }: ExecutiveEducationViewProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [stepWidth, setStepWidth] = useState(0);
  const isHoveredRef = useRef(false);

  const formats = [
    {
      icon: Clock,
      title: "Cours du soir",
      description:
        "En semaine du lundi au vendredi de 18h30 à 21h30 pour poursuivre votre activité professionnelle tout en préparant un diplôme reconnu.",
    },
    {
      icon: Calendar,
      title: "Cours de week-end",
      description:
        "Licences et Masters intensifs dispensés le samedi, conçus pour préserver intégralement vos horaires de travail en semaine.",
    },
    {
      icon: Laptop,
      title: "E-learning",
      description:
        "Plateforme numérique interactive accessible 24h/24 et 7j/7 permettant d'apprendre en toute flexibilité et autonomie, où que vous soyez.",
    },
    {
      icon: Sparkles,
      title: "Formations sur-mesure",
      description:
        "Programmes courts, séminaires intensifs et modules intra-entreprise spécialement calibrés pour répondre aux défis stratégiques des organisations.",
    },
    {
      icon: Award,
      title: "Certificats CPS",
      description:
        "Certificats Professionnels Spécialisés de courte durée (1 à 3 mois) pour acquérir rapidement des expertises opérationnelles ciblées et valorisables.",
    },
  ];

  const extendedFormats = [...formats, ...formats];

  useEffect(() => {
    const updateStepWidth = () => {
      if (!trackRef.current) return;
      const firstChild = trackRef.current.children[0] as HTMLElement | undefined;
      const secondChild = trackRef.current.children[1] as HTMLElement | undefined;
      if (firstChild && secondChild) {
        setStepWidth(secondChild.offsetLeft - firstChild.offsetLeft);
      }
    };

    updateStepWidth();
    window.addEventListener("resize", updateStepWidth);
    return () => window.removeEventListener("resize", updateStepWidth);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isHoveredRef.current) return;
      setCurrentIndex((prev) => {
        if (prev >= formats.length) {
          setIsTransitioning(false);
          return 0;
        }
        setIsTransitioning(true);
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [formats.length]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current) return;
    if (currentIndex >= formats.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const thematiques = [
    {
      icon: BarChart3,
      domain: "Sciences économiques et de gestion",
      description: "Pilotage stratégique, performance financière et développement organisationnel.",
      specialites: [
        "Finance d'entreprise & Ingénierie financière",
        "Management stratégique & Leadership",
        "Marketing & Communication digitale",
        "Comptabilité, Contrôle de gestion & Audit",
        "Gestion des Ressources Humaines (GRH)",
        "Transport, Logistique & Management portuaire",
        "Qualité, Hygiène, Sécurité & Environnement (QHSE)",
      ],
    },
    {
      icon: Scale,
      domain: "Sciences juridiques, politiques et de l'administration",
      description: "Sécurisation juridique, conformité réglementaire et gouvernance publique.",
      specialites: [
        "Droit des affaires & Droit OHADA",
        "Fiscalité d'entreprise & Ingénierie juridique",
        "Marchés publics & Partenariats Public-Privé (PPP)",
        "Administration publique & Politiques territoriales",
        "Responsabilité Sociétale des Entreprises (RSE)",
      ],
    },
    {
      icon: Cpu,
      domain: "Sciences et technologies",
      description: "Transformation numérique, architecture des systèmes et sécurité informatique.",
      specialites: [
        "Cybersécurité & Sécurité des Systèmes d'Information",
        "Big Data & Intelligence Artificielle (IA)",
        "Développement Web, Mobile & Génie logiciel",
        "Réseaux informatiques & Télécoms (CCNA)",
        "Systèmes d'information décisionnels (Business Intelligence)",
      ],
    },
  ];

  const engagements = [
    {
      title: "Analyse de vos besoins",
      description:
        "Diagnostic personnalisé et entretiens de cadrage approfondis pour orienter chaque apprenant vers la formule la plus adaptée à ses ambitions.",
    },
    {
      title: "Offre sur-mesure",
      description:
        "Programmes modulaires et contenus adaptables pour répondre précisément aux exigences opérationnelles de chaque organisation.",
    },
    {
      title: "Équipe d'experts dédiée",
      description:
        "Intervenants professionnels de haut niveau, praticiens chevronnés et dirigeants en prise directe avec les réalités du marché ouest-africain.",
    },
    {
      title: "Pédagogie participative",
      description:
        "Études de cas réels d'entreprises, mises en situation concrètes, ateliers collaboratifs et partage d'expériences enrichissant entre pairs.",
    },
    {
      title: "Évaluation post-formation",
      description:
        "Suivi de l'impact opérationnel direct sur le poste de travail et mesure rigoureuse du retour sur apprentissage pour l'employeur.",
    },
    {
      title: "Diplômes accrédités",
      description:
        "Reconnaissances officielles par l'ANAQ-Sup et le CAMES, garantissant des titres et grades à forte valeur en Afrique et à l'international.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      {/* =========================================================================
          1. HERO PRESTIGE (Minimalist, Dark Editorial, Brand Blue Gradient)
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-afi-red">Executive Education</span>
          </div>


          {/* Main Title & Lead */}
          <div className="max-w-4xl space-y-4">
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Formez-vous aujourd&apos;hui, performez demain.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-3xl">
              Des programmes de formation continue conçus pour les professionnels en activité, alliant flexibilité, expertise terrain et diplômes reconnus à l&apos;échelle africaine et internationale.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/candidater"
              className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Candidater en session continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact?motif=executive-education"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/15 transition-all"
            >
              Demander un devis entreprise
            </Link>
          </div>

          {/* Key Metrics Strip (The 4 KPIs from original site) with Shimmer Beam */}
          <div className="relative pt-10 border-t border-white/10 overflow-hidden">
            {/* Animated scanning shimmer beam */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-afi-red to-transparent w-1/3 animate-shimmer-beam" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="space-y-1">
                <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  +<AnimatedCounter value={30} />
                </div>
                <div className="text-xs text-slate-400 font-medium">ans d&apos;excellence</div>
              </div>

              <div className="space-y-1">
                <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  +<AnimatedCounter value={120} />
                </div>
                <div className="text-xs text-slate-400 font-medium">entreprises clientes</div>
              </div>

              <div className="space-y-1">
                <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  +<AnimatedCounter value={3000} />
                </div>
                <div className="text-xs text-slate-400 font-medium">professionnels formés</div>
              </div>

              <div className="space-y-1">
                <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  +<AnimatedCounter value={100} />
                </div>
                <div className="text-xs text-slate-400 font-medium">intervenants experts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MODALITÉS DE FORMATION ("Apprenez à votre rythme")
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Header & Photo Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                Modalités de Formation
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Apprenez à votre rythme
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                Quelles que soient vos contraintes professionnelles, familiales ou géographiques, nous avons une formule adaptée.
              </p>
            </div>

            <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100">
              <Image
                src="/images/executive/executive-leadership-session.jpg"
                alt="Session de formation continue et leadership AFI-L'UE Executive Education"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>

          {/* The 5 Format Cards — One-Way Infinite Carousel */}
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
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className={`flex items-stretch gap-6 ${
                isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
              }`}
              style={{
                transform: `translate3d(-${currentIndex * stepWidth}px, 0, 0)`,
              }}
            >
              {extendedFormats.map((fmt, idx) => {
                const IconComponent = fmt.icon;
                return (
                  <div
                    key={idx}
                    className="w-[85vw] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <IconComponent className="w-8 h-8 text-afi-red stroke-[1.5]" />
                      </div>

                      <h3 className="font-heading font-black text-lg text-slate-900">
                        {fmt.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {fmt.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DOMAINES D'EXPERTISE ("Des thématiques à haute valeur")
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#191D38] text-white relative overflow-hidden">
        {/* Subtle dot overlay */}
        <div className="absolute inset-0 pattern-grid-dots mask-radial-faded opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Domaines de Formation
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              Des thématiques à haute valeur
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Nos cursus couvrent les 3 grands domaines d&apos;expertise portés par plus de 150 experts praticiens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {thematiques.map((thm, idx) => {
              const IconComponent = thm.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl border border-white/15 hover:border-afi-red/60 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <IconComponent className="w-9 h-9 text-afi-red stroke-[1.75]" />

                    <h3 className="font-heading font-black text-xl text-white leading-snug">
                      {thm.domain}
                    </h3>

                    <ul className="space-y-2.5 pt-1">
                      {thm.specialites.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-1.5 shrink-0 ring-4 ring-afi-red/20" />
                          <span>{spec}</span>
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
          4. 6 ENGAGEMENTS CONCRETS (Notre Démarche)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Notre Démarche
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              6 engagements concrets
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Une méthodologie éprouvée et orientée résultats pour sécuriser votre montée en compétences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {engagements.map((eng, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 space-y-3"
              >
                <CheckCircle2 className="w-7 h-7 text-afi-red stroke-[2]" />
                <h3 className="font-heading font-black text-lg text-slate-900">
                  {eng.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {eng.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PROGRAMMES DISPONIBLES EN COURS DU SOIR (Same Design as Home Page)
          ========================================================================= */}
      <FocusFilieres
        eyebrow="Offre Académique Continue"
        title="Cursus Proposés en Cours du Soir"
        subtitle="Filières de Licence et Master disponibles pour les professionnels."
      />

      {/* =========================================================================
          6. CALL TO ACTION BANNER (Futuriste & Épuré)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white relative overflow-hidden">
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#1E2E6B]/20 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-afi-red" />
            <span>Accompagnement Entreprises &amp; Particuliers</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            Prêt à renforcer vos compétences ?
          </h2>

          <p className="text-slate-300 text-xs sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Contactez notre équipe formation continue pour construire votre projet personnalisé ou candidater dès aujourd&apos;hui.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/candidater"
              className="px-8 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Déposer sa candidature</span>
            </Link>
            <Link
              href="/contact?motif=executive-education"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide border border-white/15 transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Demander un devis entreprise</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
