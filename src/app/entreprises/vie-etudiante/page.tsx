import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Globe2,
  HeartHandshake,
  Users,
  Sparkles,
  Calendar,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";

export const metadata: Metadata = {
  title: "Vie Étudiante | Communauté, Clubs & Événements | AFI-L'UE",
  description:
    "Vous êtes nouveau à AFI-L’UE ? Vivez de nouvelles expériences et explorez vos centres d’intérêts ! Découvrez la vie étudiante, nos 26+ nationalités, clubs et événements.",
};

export default function VieEtudiantePage() {
  const activitesPhares = [
    {
      date: "04 Juin 2026",
      title: "Journée Culturelle",
      excerpt:
        "L’Université AFI-L’UE a vibré au rythme de la diversité culturelle lors de sa Journée Culturelle mettant à l’honneur plus de 26 nationalités...",
      image: "/images/entreprises/vie-etudiante-hero.jpg",
      slug: "/actualites",
    },
    {
      date: "02 Juil 2025",
      title:
        "Immersion professionnelle: Les étudiants QHSE à la découverte de l’Institut de Technologie Alimentaire",
      excerpt:
        "Une journée enrichissante au cœur de l’expertise alimentaire pour notre promotion d’étudiants QHSE...",
      image: "/images/entreprises/vie-etudiante-2.jpg",
      slug: "/actualites",
    },
    {
      date: "24 Juin 2025",
      title:
        "AFI Speed Job Dating 3ème édition: Une journée exceptionnelle au service de l’emploi",
      excerpt:
        "Ce jeudi 19 juin 2025, l’IFAN Dakar a vibré au rythme de la 3ème édition du AFI Speed Job Dating...",
      image: "/images/entreprises/vie-etudiante-3.jpg",
      slug: "/actualites",
    },
    {
      date: "27 Mars 2025",
      title: "Immersion dans l’écosystème numérique de Sonatel",
      excerpt:
        "Une plongée au cœur de l’infrastructure numérique sénégalaise pour nos étudiants en Informatique et Réseaux...",
      image: "/images/entreprises/incubateur-workspace.jpg",
      slug: "/actualites",
    },
    {
      date: "2023",
      title:
        "AFI BOOTCAMP 2023 : Un tremplin vers l’excellence des compétences",
      excerpt:
        "Le Groupe AFI-L’UE a récemment marqué une grande innovation avec le AFI BOOTCAMP 2023, une initiative révolutionnaire...",
      image: "/images/entreprises/incubateur-hero.jpg",
      slug: "/actualites",
    },
  ];

  const galerie = [
    {
      title: "WEE-END D’INTÉGRATION",
      image: "/images/entreprises/vie-etudiante-1.jpg",
    },
    {
      title: "AFI VELO TOUR",
      image: "/images/entreprises/vie-etudiante-2.jpg",
    },
    {
      title: "JOURNÉE CULTURELLE",
      image: "/images/entreprises/vie-etudiante-3.jpg",
    },
    {
      title: "JOURNÉE DÉGUSTATION",
      image: "/images/entreprises/vie-etudiante-4.jpg",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      {/* =========================================================================
          1. HERO — VIE ÉTUDIANTE (Brand Blue Gradient & Dot Pattern)
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
                <span className="text-afi-red">Vie Étudiante</span>
              </div>

              <div className="space-y-4">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-afi-red">
                  Vous êtes nouveau à AFI-L’UE ?
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
                  Vivez de nouvelles expériences et explorez vos centres d’intérêts !
                </h1>

                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.05] border border-white/10 space-y-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <p className="font-semibold text-white">
                    Amour, partage et tolérance…
                  </p>
                  <p>Chez nous, on arrive comme on est.</p>
                  <p>
                    Et si on est un tout petit peu curieux, un tout petit peu généreux,
                  </p>
                  <p>On repart emprunt d’un peu de tous.</p>
                  <p className="font-bold text-afi-red pt-1">
                    Bienvenue à AFI-L’Université de l’Entreprise !
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/candidater"
                  className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Rejoignez-nous</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/formations"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/15 transition-all"
                >
                  Voir nos programmes
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-slate-900">
                <Image
                  src="/images/entreprises/vie-etudiante-hero.jpg"
                  alt="Vie Étudiante à AFI-L'Université de l'Entreprise"
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
          2. COMMUNAUTÉ PANAFRICAINE & ENGAGEMENT CITOYEN (Bento Layout)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Highlight Card: 26 Pays */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white flex flex-col justify-between space-y-6 relative overflow-hidden border border-white/10 shadow-md">
              <DotPattern
                cx={1}
                cy={1}
                cr={1}
                className="fill-white/10 [mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
              />
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#1E2E6B]/25 blur-3xl pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-afi-red flex items-center justify-center">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
                  26+ pays
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Chaque année, AFI-l’UE accueille des{" "}
                  <strong className="font-bold text-white">
                    centaines d’étudiants
                  </strong>{" "}
                  venant de plus de{" "}
                  <strong className="font-bold text-white">
                    26 pays différents
                  </strong>
                  .
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Véritable valeur ajoutée pour tous ceux qui composent la « communauté » de l’établissement, cet apport de cultures et d’expériences internationales place le défi d’intégration au centre des préoccupations de l’université afin de permettre aux étudiants de mieux appréhender le contexte global du monde actuel et celui de l’entreprise.
                </p>
              </div>
            </div>

            {/* Right Stack: Responsabilité, Clubs & Entrepreneuriat Social */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-6">
              <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading font-black text-lg sm:text-xl text-slate-900">
                    Amicale, Clubs &amp; Identité Professionnelle
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Par ailleurs, à travers les multiples activités organisées dans le cadre de sa vie étudiante, AFI-L-UE veille aussi à intégrer la notion de responsabilité dans le mode de raisonnement et le processus de prise de décision de ses étudiants.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  En effet, de nombreuses activités ludiques, citoyennes et humanitaires sont organisées à l’initiative des étudiants eux-mêmes, par le biais de leur amicale ou de leurs clubs et sous la supervision de l’administration. Ces expériences sont une véritable opportunité pour les étudiants de sortir de leur zone de confort, et contribuent fortement à leur épanouissement ainsi qu’à la construction de leur identité professionnelle.
                </p>
              </div>

              <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading font-black text-lg sm:text-xl text-slate-900">
                    Entrepreneuriat Social &amp; Solidaire
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  De la rénovation d’une école primaire à la récolte de dons pour des pouponnières, en passant par un weekend d’intégration ou un voyage d’étude porté sur un thème d’entreprise, les étudiants de AFI-L’UE sont sensibilisés dès la première année de leurs études à l’entrepreneuriat sociale et solidaire et au défi du développement de l’Afrique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DÉCOUVREZ NOS ACTIVITÉS PHARES
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Temps Forts du Campus
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Découvrez nos activités phares
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activitesPhares.map((act, idx) => (
              <article
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
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

                  <div className="pt-3 border-t border-slate-100">
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

      {/* =========================================================================
          4. GALERIE D'IMAGES
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-afi-red">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Moments de Vie</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Galerie d’images
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galerie.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl border border-slate-200/80 overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-heading font-black text-xs sm:text-sm text-slate-900 tracking-wide uppercase">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

