"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Award,
  Users,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
  Building2,
  TrendingUp,
  Layers,
  FileText,
  PhoneCall,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { Formation } from "@/types/database";
import { DotPattern } from "@/components/ui/dot-pattern";

interface CoursDuWeekendViewProps {
  formations: Formation[];
}

const WHY_CHOOSE_ITEMS = [
  {
    title: "Flexibilité maximale",
    description:
      "Nos cours de week-end sont conçus pour s’adapter à votre emploi du temps chargé. Apprenez tout en continuant à travailler.",
    icon: Clock,
  },
  {
    title: "Contenu de pointe",
    description:
      "Explorez des sujets pertinents et actuels animés par des experts de votre secteur d’activité.",
    icon: Sparkles,
  },
  {
    title: "Programmes variés",
    description:
      "Nous proposons une gamme de cours couvrant divers domaines tels que la finance, le marketing, la gestion des ressources humaines, la stratégie d’entreprise, l’audit et le contrôle de gestion, la fiscalité, le Supply Chain Management et bien d’autres encore.",
    icon: Layers,
  },
  {
    title: "Réseau puissant",
    description:
      "Élargissez votre réseau professionnel en interagissant avec des pairs et des formateurs de classe internationale.",
    icon: Users,
  },
  {
    title: "Diplômes accrédités",
    description:
      "Nos diplômes sont reconnus par l’ANAQ-Sup et cosignés avec le ministère en charge de l’enseignement supérieur.",
    icon: Award,
  },
];

export function CoursDuWeekendView({ formations }: CoursDuWeekendViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<"all" | "licence" | "master">("all");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // Exactly 2 rows of 3 cards on desktop

  // Reset pagination to first page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLevel, selectedDomain, searchQuery]);

  // Extract unique domains
  const domains = useMemo(() => {
    const map = new Map<string, { id: string; name: string; slug: string }>();
    formations.forEach((f) => {
      if (f.domain) {
        map.set(f.domain.slug, {
          id: f.domain.id,
          name: f.domain.name,
          slug: f.domain.slug,
        });
      }
    });
    return Array.from(map.values());
  }, [formations]);

  // Filter formations
  const filteredFormations = useMemo(() => {
    return formations.filter((f) => {
      const matchLevel = selectedLevel === "all" || f.level === selectedLevel;
      const matchDomain =
        selectedDomain === "all" ||
        f.domain?.slug === selectedDomain ||
        f.domain_id === selectedDomain;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        f.title.toLowerCase().includes(query) ||
        f.mention?.toLowerCase().includes(query) ||
        f.domaine?.toLowerCase().includes(query) ||
        f.short_description?.toLowerCase().includes(query);

      return matchLevel && matchDomain && matchQuery;
    });
  }, [formations, selectedLevel, selectedDomain, searchQuery]);

  // Pagination calculations (2 lines = 6 formations per page)
  const totalPages = Math.ceil(filteredFormations.length / ITEMS_PER_PAGE) || 1;

  const paginatedFormations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFormations.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFormations, currentPage]);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("formations");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <span className="text-afi-red">Cours du Week-end</span>
          </div>

          {/* Main Title & Lead */}
          <div className="max-w-5xl space-y-4">
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl sm:whitespace-nowrap text-white tracking-tight leading-tight">
              Cours du Week-end à AFI&#8209;L’UE
            </h1>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-3xl">
              Élargissez vos horizons et atteignez de nouveaux sommets professionnels. Des formations certifiantes et diplômantes d’excellence conçues pour les professionnels en activité et étudiants désireux d’allier travail et montée en compétences.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm italic font-medium">
              « Expand your horizons and reach new heights. »
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/candidater"
              className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Candidater en ligne</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#formations"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/15 transition-all flex items-center gap-2"
            >
              <span>Voir les formations disponibles</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Key Metrics / Indicators Strip (4 KPIs on a single line) with Shimmer Beam */}
          <div className="relative pt-10 border-t border-white/10 overflow-hidden">
            {/* Animated scanning shimmer beam */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-afi-red to-transparent w-1/3 animate-shimmer-beam" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-afi-red" />
                  <span>Jours</span>
                </div>
                <div className="font-heading font-black text-lg sm:text-2xl text-white tracking-tight">
                  Samedi &amp; Dimanche
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-afi-red" />
                  <span>Horaires</span>
                </div>
                <div className="font-heading font-black text-lg sm:text-2xl text-white tracking-tight">
                  09h00 – 17h00
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-afi-red" />
                  <span>Durée</span>
                </div>
                <div className="font-heading font-black text-lg sm:text-2xl text-white tracking-tight">
                  09 mois
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-afi-red" />
                  <span>Niveaux</span>
                </div>
                <div className="font-heading font-black text-lg sm:text-2xl text-white tracking-tight">
                  Licence 3 &amp; Master
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTRODUCTION & BIENVENUE — Screenshot 2 content + students photo
         ===================================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-afi-red text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Excellence &amp; Flexibilité Professionnelle</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 leading-snug">
                Bienvenue aux cours de week-end de AFI-L’UE
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Bienvenue aux cours de week-end de AFI-L’UE, une opportunité exceptionnelle d’acquérir des compétences de pointe, de développer votre réseau professionnel et d’explorer de nouvelles perspectives. Que vous soyez un professionnel en activité ou un étudiant, nos cours de week-end sont conçus pour répondre à vos besoins.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-afi-red shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-700 font-medium">
                    <strong className="text-slate-900">Maintien de votre activité professionnelle :</strong> Formez-vous sans interruption de carrière ni impact sur votre emploi du temps en semaine.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-afi-red shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-700 font-medium">
                    <strong className="text-slate-900">Même valeur académique que la formation initiale :</strong> Programme rigoureux et diplôme d'État cosigné par le Ministère et reconnu ANAQ-Sup / CAMES.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-afi-red shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-700 font-medium">
                    <strong className="text-slate-900">Réseautage de haut niveau :</strong> Échangez avec des cadres, entrepreneurs et formateurs de premier plan d’Afrique et de l'international.
                  </p>
                </div>
              </div>
            </div>

            {/* Students photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl group aspect-[3/2] w-full">
                <Image
                  src="/images/programmes/cours-du-weekend-etudiants-laptop.jpg"
                  alt="Étudiants et professionnels en cours du week-end à AFI-L'UE"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. POURQUOI CHOISIR LES COURS DE WEEK-END ? — Screenshot 2 & 3 points
         ===================================================================== */}
      <section className="py-16 sm:py-24 bg-slate-50/80 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left title column */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
                Pourquoi choisir les cours de week-end de AFI-L’UE ?
              </h2>
              {/* Red underline bar from screenshot */}
              <div className="w-24 h-1.5 bg-afi-red rounded-full" />

              <p className="text-slate-600 text-base leading-relaxed pt-3">
                Une formule éprouvée depuis plus de deux décennies qui allie rigueur pédagogique, flexibilité pour les travailleurs et accréditation officielle.
              </p>

              <div className="pt-4">
                <Link
                  href="/candidater"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-afi-red hover:bg-afi-red-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <span>Rejoindre la promotion</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right pillars column */}
            <div className="lg:col-span-7 space-y-6">
              {WHY_CHOOSE_ITEMS.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-red-50 text-afi-red flex items-center justify-center shrink-0 border border-red-100">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <h3 className="font-heading font-black text-lg text-afi-red">
                          {item.title} :
                        </h3>
                        <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. MODALITÉS & GRILLE TARIFAIRE
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-afi-red uppercase tracking-wider">
              Organisation &amp; Tarifs
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
              Grille tarifaire et calendrier académique
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Une formule condensée en 9 mois (de Janvier à Septembre) avec un étalement des paiements sur toute la durée de la formation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Licence 3 card */}
            <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 shadow-2xs transition-all space-y-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-afi-navy text-white text-[11px] font-bold uppercase tracking-wider">
                  Niveau Bac+3
                </span>
                <h3 className="font-heading font-black text-2xl text-slate-900">
                  Licence 3 – Cours du Week-end
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Pour titulaires de BTS, DUT ou Licence 2 validée
                </p>
              </div>

              <div className="space-y-3 py-2 border-y border-slate-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Droits d’inscription :</span>
                  <strong className="text-slate-900 font-black">170 000 FCFA</strong>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Mensualité (9 mois) :</span>
                  <strong className="text-afi-red font-black text-base">80 000 FCFA / mois</strong>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Période de cours :</span>
                  <span className="text-slate-900 font-semibold">Janvier à Septembre</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Horaires :</span>
                  <span className="text-slate-900 font-semibold">Samedi &amp; Dimanche (09h – 17h)</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>• Bibliothèque numérique annuelle : 10 000 FCFA</p>
                <p>• Frais de mémoire de fin de cycle : 70 000 FCFA</p>
              </div>

              <Link
                href="/candidater?niveau=licence3&mode=weekend"
                className="w-full py-3 rounded-full bg-afi-navy hover:bg-slate-800 text-white font-bold text-sm text-center block transition-colors"
              >
                Candidater en Licence 3 Week-end
              </Link>
            </div>

            {/* Master card */}
            <div className="p-8 rounded-3xl bg-slate-50/70 border-2 border-afi-red/40 hover:border-afi-red shadow-sm transition-all space-y-6 relative">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-afi-red text-white text-[11px] font-bold uppercase tracking-wider">
                  Niveau Bac+5
                </span>
                <h3 className="font-heading font-black text-2xl text-slate-900">
                  Master 1 &amp; Master 2 – Week-end
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Pour titulaires de Licence (BAC+3) ou Master 1
                </p>
              </div>

              <div className="space-y-3 py-2 border-y border-slate-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Droits d’inscription :</span>
                  <strong className="text-slate-900 font-black">180 000 FCFA</strong>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Mensualité (9 mois) :</span>
                  <strong className="text-afi-red font-black text-base">95 000 FCFA / mois</strong>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Période de cours :</span>
                  <span className="text-slate-900 font-semibold">Janvier à Septembre</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Horaires :</span>
                  <span className="text-slate-900 font-semibold">Samedi &amp; Dimanche (09h – 17h)</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>• Bibliothèque numérique annuelle : 10 000 FCFA</p>
                <p>• Frais de soutenance de mémoire M2 : 100 000 FCFA</p>
              </div>

              <Link
                href="/candidater?niveau=master&mode=weekend"
                className="w-full py-3 rounded-full bg-afi-red hover:bg-afi-red-700 text-white font-bold text-sm text-center block transition-colors shadow-sm"
              >
                Candidater en Master Week-end
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FORMATIONS DISPONIBLES EN COURS DU WEEK-END
         ===================================================================== */}
      <section id="formations" className="py-16 sm:py-24 bg-slate-50/50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header & Controls */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-afi-red uppercase tracking-wider">
                Catalogue Académique
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
                Formations disponibles en Cours du Week-end
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Explorez l'ensemble des programmes diplômants de Licence 3 et de Master dispensés les samedis et dimanches à AFI-L'UE.
              </p>
            </div>

            {/* Filter Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              {/* Level Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto">
                <button
                  onClick={() => setSelectedLevel("all")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === "all"
                      ? "bg-afi-navy text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Tous ({formations.length})
                </button>
                <button
                  onClick={() => setSelectedLevel("licence")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === "licence"
                      ? "bg-afi-navy text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Licences 3
                </button>
                <button
                  onClick={() => setSelectedLevel("master")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === "master"
                      ? "bg-afi-navy text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Masters
                </button>
              </div>

              {/* Domain Dropdown */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="appearance-none pl-3.5 pr-9 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:border-afi-red w-full md:w-auto cursor-pointer"
                  >
                    <option value="all">Tous les domaines académiques</option>
                    {domains.map((dom) => (
                      <option key={dom.id} value={dom.slug}>
                        {dom.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrer une filière..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-afi-red"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Formations Grid (2 rows of 3 columns = 6 items per page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedFormations.map((f) => {
              const isMaster = f.level === "master";
              return (
                <div
                  key={f.id}
                  className="group bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/80 transition-all duration-300 hover:shadow-lg hover:border-slate-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Brand Gradient & Pattern Cover with Floating Level Badge (identical to homepage) */}
                    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#191D38] to-[#28315E]">
                      {/* Grid Dots Pattern */}
                      <div className="absolute inset-0 pattern-grid-dots opacity-35 pointer-events-none" />
                      {/* Ambient Glow */}
                      <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#364482]/40 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                      {/* Subtle Watermark Icon */}
                      <BookOpen className="absolute bottom-3 right-3.5 w-10 h-10 text-white/10 stroke-[1.25] group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

                      {/* Floating Level Badge */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/15 shadow-xs">
                        {isMaster ? "Master (Bac+5)" : "Licence 3 (Bac+3)"}
                      </div>

                      {/* Floating Domain Tag */}
                      {f.domain?.name && (
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-slate-200 text-[10px] font-medium tracking-wide border border-white/10 max-w-[170px] truncate">
                          {f.domain.name.split("&")[0].trim()}
                        </div>
                      )}
                    </div>

                    {/* Card Main Info */}
                    <div className="pt-4 px-1">
                      {/* Course Title */}
                      <h3 className="font-heading font-black text-lg text-slate-900 group-hover:text-afi-red transition-colors line-clamp-2 leading-snug mb-2">
                        <Link href={`/formations/${f.slug}`}>
                          {f.title}
                        </Link>
                      </h3>

                      {/* Metadata Sub-row: Duration • Modes */}
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-2 flex-wrap mb-2.5">
                        <span className="text-slate-700 font-semibold">09 mois</span>
                        <span className="text-slate-300">•</span>
                        <span>Cours du Week-end</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400">Sam &amp; Dim</span>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {f.short_description ||
                          `Formation diplômante de pointe dispensée en cours du week-end à AFI-L'Université de l'Entreprise.`}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Row: Detail link & Candidater pill */}
                  <div className="pt-3.5 px-1 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/candidater?formation=${f.slug}&mode=weekend`}
                      className="text-xs font-semibold text-slate-600 hover:text-afi-red inline-flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Candidater</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>

                    <Link
                      href={`/formations/${f.slug}`}
                      className="px-6 sm:px-7 py-2.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 text-center min-w-[130px]"
                    >
                      Détail du cursus
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Numbered Pagination (Modern, Clean & Minimalist) */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-slate-200/80">
              <div className="text-xs text-slate-500 font-medium order-2 sm:order-1">
                Affichage de{" "}
                <span className="font-bold text-slate-900">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                à{" "}
                <span className="font-bold text-slate-900">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredFormations.length)}
                </span>{" "}
                sur{" "}
                <span className="font-bold text-slate-900">
                  {filteredFormations.length}
                </span>{" "}
                formations
              </div>

              <div className="inline-flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200/80 shadow-2xs order-1 sm:order-2">
                {/* Previous Page */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                  aria-label="Page précédente"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((item, index) => {
                  if (item === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-medium select-none"
                      >
                        …
                      </span>
                    );
                  }

                  const pageNum = item as number;
                  const isCurrent = pageNum === currentPage;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-8 h-8 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-afi-navy text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Page */}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                  aria-label="Page suivante"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {filteredFormations.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">Aucune formation ne correspond à vos critères de recherche.</p>
              <button
                onClick={() => {
                  setSelectedLevel("all");
                  setSelectedDomain("all");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-afi-red hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          7. CALL TO ACTION FINAL
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-afi-navy-950 via-afi-navy to-afi-navy-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-afi-red" />
            <span>Rentrée Académique de Janvier • Inscriptions Ouvertes</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Prêt à atteindre de nouveaux sommets professionnels ?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Rejoignez la prochaine promotion des cours du week-end de l'Université de l'Entreprise et donnez un élan décisif à votre carrière.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/candidater"
              className="px-8 py-4 rounded-full bg-afi-red hover:bg-afi-red-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <span>Déposer ma candidature</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/25 transition-all inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contacter un conseiller (+221 33 824 71 10)</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

