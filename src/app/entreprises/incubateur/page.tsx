import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Rocket,
  Lightbulb,
  Users,
  Handshake,
  Briefcase,
  Coins,
  Network,
  Calendar,
  Building2,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";

export const metadata: Metadata = {
  title: "Incubateur d’entreprises (AFI-BOOST) | Entrepreneuriat | AFI-L'UE",
  description:
    "Le coup de pouce qu’il vous faut pour développer votre projet d’entreprise. Découvrez l’incubateur d’entreprises d’AFI-L’UE : services, coaching, financement, mentorat et networking.",
};

export default function IncubateurPage() {
  const services = [
    {
      icon: Lightbulb,
      title: "Formation et renforcement des capacités des cibles",
    },
    {
      icon: Rocket,
      title: "Soutien au montage de projet",
    },
    {
      icon: Compass,
      title: "Appui conseil",
    },
    {
      icon: Users,
      title: "Suivi / Coaching personnalisé et collectif",
    },
    {
      icon: Coins,
      title: "Appui à la recherche de financement",
    },
    {
      icon: Network,
      title: "Mise en réseau et networking",
    },
    {
      icon: Calendar,
      title:
        "Organisation d’évènements (forums, ateliers, conférences, journées de l’entrepreneuriat etc.) liés à l’entreprenariat",
    },
    {
      icon: Building2,
      title: "Mise à disposition de logistique et d’espace de travail",
    },
    {
      icon: Briefcase,
      title: "Mentorat",
    },
    {
      icon: Handshake,
      title:
        "Mise en relation avec les milieux économiques et potentiels partenaires.",
    },
  ];

  const cibles = [
    "Les étudiants et diplômés de AFI–L’UE qui sont les potentiels porteurs de projet",
    "Les enseignants de AFI-L’UE",
    "Le personnel Administratif",
    "Les porteurs de projets externes à la communauté AFI-L’UE",
    "Les entreprises",
    "Les structures d’appui aux entreprises",
  ];

  const activites = [
    {
      date: "14 Jan 2026",
      title: "Bootcamp #2 – Édition 2025 | AFI-L’UE",
      excerpt:
        "Dans le cadre de sa mission de formation intégrale et de préparation des futurs cadres africains, AFI-L’UE a organisé la deuxième édition de son Bootcamp entrepreneurial...",
      image: "/images/entreprises/incubateur-hero.jpg",
      slug: "/actualites",
    },
    {
      date: "11 Août 2025",
      title:
        "AFI-L’UE et JumpCo Academy : Un Partenariat Stratégique pour Former les Talents de Demain",
      excerpt:
        "AFI-L’UE et JumpCo franchissent une nouvelle étape dans leur engagement pour l’excellence académique et l’innovation entrepreneuriale...",
      image: "/images/entreprises/incubateur-workspace.jpg",
      slug: "/actualites",
    },
    {
      date: "24 Juin 2025",
      title:
        "AFI Speed Job Dating 3ème édition: Une journée exceptionnelle au service de l’emploi",
      excerpt:
        "Ce jeudi 19 juin 2025, l’IFAN Dakar a vibré au rythme de la 3ème édition du AFI Speed Job Dating réunissant entreprises partenaires et jeunes talents...",
      image: "/images/entreprises/vie-etudiante-hero.jpg",
      slug: "/actualites",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      {/* =========================================================================
          1. HERO — INCUBATEUR D'ENTREPRISES (Brand Blue Gradient & Dot Pattern)
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
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-slate-400">Entreprises</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-afi-red">Incubateur d’entreprises</span>
              </div>

              <div className="space-y-4">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-afi-red">
                  Pôle Entrepreneuriat · AFI-BOOST
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                  Incubateur d’entreprises
                </h1>
                <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl">
                  Le coup de pouce qu’il vous faut pour développer votre projet d’entreprise.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#presentation-incubateur"
                  className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Savoir plus</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact?motif=incubateur"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/15 transition-all"
                >
                  Soumettre un projet
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-slate-900">
                <Image
                  src="/images/entreprises/incubateur-hero.jpg"
                  alt="Incubateur d'entreprises AFI-L'UE"
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
          2. PRÉSENTATION DE LA STRUCTURE D'ACCOMPAGNEMENT
          ========================================================================= */}
      <section
        id="presentation-incubateur"
        className="py-16 sm:py-20 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                  Création &amp; Gestion de Projet
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                  Le coup de pouce qu’il vous faut pour développer votre projet d’entreprise.
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p className="text-slate-900 font-medium text-sm sm:text-base">
                  A AFI-L’UE, un étudiant peut choisir de mûrir son projet d’entreprise tout en poursuivant sa formation.
                </p>
                <p>
                  En effet, l’université place à la disposition des étudiants qui le souhaitent, une structure d’accompagnement afin de leur permettre de bénéficier de tous les outils nécessaires à la création et à la gestion de leur projet.
                </p>
                <p>
                  Cette structure est incarnée par un espace d’échange et de convivialité où les étudiants peuvent se retrouver et travailler ensemble, tout en ayant accès à plusieurs ateliers, événements et visites d’entreprises liés à l’entreprenariat. Ces activités sont régulièrement organisées afin de faire profiter aux étudiants de l’expertise de professionnels issus d’entreprises et d’organisations partenaires de l’université.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100">
                <Image
                  src="/images/entreprises/incubateur-workspace.jpg"
                  alt="Espace de travail et d'accompagnement Incubateur AFI-L'UE"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SERVICES PROPOSÉS PAR L'INCUBATEUR (Bento Grid)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Accompagnement Sur-Mesure
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Les services ci-après sont proposés par l’incubateur d’entreprises :
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((srv, idx) => {
              const IconComponent = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-afi-red/40 hover:shadow-md transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center shrink-0 mt-0.5">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <p className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-relaxed pt-1">
                    {srv.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CIBLES (Futuristic Dark Bento)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white relative overflow-hidden">
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/10 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#1E2E6B]/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Communauté &amp; Écosystème
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              Cibles
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Les groupes cibles ci-après sont les bénéficiaires des activités de l’incubateur d’entreprises :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cibles.map((cible, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-afi-red/50 transition-all duration-300 flex items-start gap-3.5"
              >
                <CheckCircle2 className="w-5 h-5 text-afi-red shrink-0 mt-0.5" />
                <span className="font-heading font-bold text-xs sm:text-sm text-white leading-relaxed">
                  {cible}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. NOS ACTIVITÉS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                Événements &amp; Dynamique Entrepreneuriale
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight uppercase">
                NOS ACTIVITÉS
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activites.map((act, idx) => (
              <article
                key={idx}
                className="bg-slate-50 rounded-3xl border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                  <Image
                    src={act.image}
                    alt={act.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-afi-red" />
                      <span>{act.date}</span>
                    </div>

                    <h3 className="font-heading font-black text-base text-slate-900 group-hover:text-afi-red transition-colors leading-snug line-clamp-2">
                      {act.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {act.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60">
                    <Link
                      href={act.slug}
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
      </section>
    </div>
  );
}

