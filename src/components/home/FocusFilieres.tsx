"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Search,
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  GraduationCap,
  Award,
} from "lucide-react";
import { Formation } from "@/types/database";
import { ALL_FORMATIONS } from "@/lib/data/programme-hierarchy";
import { FormationCard } from "@/components/formations/FormationCard";

interface FocusFilieresProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  formations?: Formation[];
}

export function FocusFilieres({
  eyebrow,
  title = "Focus sur nos Filières Phares",
  subtitle,
  formations: initialFormations,
}: FocusFilieresProps = {}) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "licence" | "master">("all");
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLevelDropdownOpen(false);
      }
    }
    if (levelDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [levelDropdownOpen]);

  const sourceFormations = useMemo(() => {
    return initialFormations && initialFormations.length > 0
      ? initialFormations
      : ALL_FORMATIONS;
  }, [initialFormations]);

  const filieres = useMemo(() => {
    return sourceFormations.map((f) => {
      const isLicence = f.level === "licence";
      const domainCode = f.domain?.code?.toUpperCase() || "";

      let tag = "gestion";
      if (domainCode === "ST") tag = "tech";
      else if (domainCode === "SJP") tag = "droit";
      else if (domainCode === "SHS") tag = "shs";

      const levelBadge = isLicence ? "Licence (BAC+3)" : "Master (BAC+5)";

      const modesLabels = (f.study_modes || []).map((m) => {
        if (m === "initiale") return "Jour";
        if (m === "cours_du_soir") return "Soir";
        if (m === "weekend") return "Week-end";
        if (m === "e_learning") return "En ligne";
        return m;
      });
      const modesText = isLicence
        ? "Jour • Soir"
        : "Soir • Week-end • À distance";

      const durationText = f.duration_years
        ? `${f.duration_years} an${f.duration_years > 1 ? "s" : ""}`
        : isLicence
          ? "3 ans"
          : "2 ans (Bac+5)";

      return {
        ...f,
        id: f.id || f.slug,
        title: f.title,
        domain: f.domain,
        domainName: f.domain?.name || "Formation Universitaire",
        level: f.level,
        levelBadge,
        levelType: isLicence ? ("licence" as const) : ("master" as const),
        duration: durationText,
        modes: modesText,
        cames: f.accreditations?.some((a) => a.code === "CAMES") ?? false,
        anaqSup: true,
        slug: f.slug,
        image_url: f.image_url || `/images/formations/${f.slug}.jpg`,
        tag,
        description:
          f.short_description ||
          f.description ||
          "Formation d'excellence dispensée par AFI-L'Université de l'Entreprise.",
      };
    });
  }, [sourceFormations]);

  // Dynamic filter and search computation
  const filtered = useMemo(() => {
    return filieres.filter((f) => {
      const matchesLevel =
        selectedLevel === "all" || f.levelType === selectedLevel;

      const matchesCategory =
        selectedFilter === "all" || f.tag === selectedFilter;

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === "" ||
        f.title.toLowerCase().includes(query) ||
        (f.description && f.description.toLowerCase().includes(query)) ||
        (f.domainName && f.domainName.toLowerCase().includes(query)) ||
        f.modes.toLowerCase().includes(query) ||
        f.levelBadge.toLowerCase().includes(query);

      return matchesLevel && matchesCategory && matchesQuery;
    });
  }, [selectedLevel, selectedFilter, searchQuery, filieres]);

  const hasActiveFilters =
    searchQuery !== "" || selectedFilter !== "all" || selectedLevel !== "all";

  // Check scroll position to enable/disable arrows
  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [filtered]);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 380;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const scrollAmount = isMobile ? cardWidth : cardWidth * 2;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Calm, deliberate autoplay: advance one card at a time every 5.5s with instant hover pause
  useEffect(() => {
    if (filtered.length <= 1) return;

    const timer = setInterval(() => {
      // Strictly pause if user is hovering over any card or button
      if (isHoveredRef.current || isPaused) return;
      if (!carouselRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 25;

      if (isAtEnd) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const firstCard = carouselRef.current.firstElementChild as HTMLElement | null;
        const cardAdvance = firstCard ? firstCard.offsetWidth + 24 : 380;
        carouselRef.current.scrollBy({
          left: cardAdvance,
          behavior: "smooth",
        });
      }
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, filtered.length]);

  return (
    <section className="py-16 sm:py-20 bg-slate-50 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Clean Title */}
        <div className="mb-8 space-y-2">
          {eyebrow && (
            <span className="block text-xs font-bold uppercase tracking-widest text-afi-red">
              {eyebrow}
            </span>
          )}
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl text-slate-900 tracking-tight sm:whitespace-nowrap">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* 2. Modern Unified Control Bar (Search Bar + Dropdown + Category Filters) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-10">
          {/* Left Block: Search Input + Compact Level Dropdown */}
          <div className="flex items-center gap-2.5 flex-1 max-w-xl">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une filière, un métier, une spécialité..."
                className="w-full pl-11 pr-10 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-xs focus:border-afi-red/40 focus:ring-4 focus:ring-afi-red/10 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                  aria-label="Effacer la recherche"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Compact Level Dropdown (Licence / Master) */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLevelDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full bg-white border shadow-xs transition-all text-xs font-semibold cursor-pointer ${selectedLevel !== "all"
                  ? "border-afi-navy text-afi-navy bg-slate-50 font-bold"
                  : "border-slate-200/90 text-slate-700 hover:border-slate-300 hover:text-slate-950"
                  }`}
              >
                <GraduationCap className="w-4 h-4 text-afi-navy shrink-0" />
                <span className="whitespace-nowrap">
                  {selectedLevel === "all"
                    ? "Tous cycles"
                    : selectedLevel === "licence"
                      ? "Licence"
                      : "Master"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${levelDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {levelDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200/90 shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLevel("all");
                      setLevelDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors cursor-pointer ${selectedLevel === "all"
                      ? "text-afi-red font-bold bg-slate-50"
                      : "text-slate-700 hover:bg-slate-50 font-medium"
                      }`}
                  >
                    <span>Tous les cycles</span>
                    {selectedLevel === "all" && (
                      <Check className="w-3.5 h-3.5 text-afi-red" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLevel("licence");
                      setLevelDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors cursor-pointer ${selectedLevel === "licence"
                      ? "text-afi-red font-bold bg-slate-50"
                      : "text-slate-700 hover:bg-slate-50 font-medium"
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                      <span>Licence (Bac+3)</span>
                    </span>
                    {selectedLevel === "licence" && (
                      <Check className="w-3.5 h-3.5 text-afi-red" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLevel("master");
                      setLevelDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors cursor-pointer ${selectedLevel === "master"
                      ? "text-afi-red font-bold bg-slate-50"
                      : "text-slate-700 hover:bg-slate-50 font-medium"
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-slate-500" />
                      <span>Master (Bac+5)</span>
                    </span>
                    {selectedLevel === "master" && (
                      <Check className="w-3.5 h-3.5 text-afi-red" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Apple-style pill filter (Exact design from screenshot) */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white rounded-full border border-slate-200/90 shadow-xs flex-nowrap overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "Toutes les filières" },
              { id: "gestion", label: "Gestion & Finance" },
              { id: "tech", label: "Technologies & IA" },
              { id: "droit", label: "Droit & Fiscalité" },
              { id: "shs", label: "Sciences Humaines & Société" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${selectedFilter === tab.id
                  ? "bg-afi-navy text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Empty State Handling */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto space-y-4 my-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Aucune filière trouvée
              </h3>
              <p className="text-xs text-slate-500">
                Aucun parcours ne correspond à vos critères actuels.
              </p>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                  setSelectedLevel("all");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser les filtres</span>
              </button>
            )}
          </div>
        ) : (
          /* 4. Single-Row Fluid Carousel */
          <div
            ref={carouselRef}
            onScroll={checkScroll}
            onMouseEnter={() => {
              isHoveredRef.current = true;
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
              setIsPaused(false);
            }}
            onTouchStart={() => {
              isHoveredRef.current = true;
              setIsPaused(true);
            }}
            onTouchEnd={() => {
              isHoveredRef.current = false;
              setIsPaused(false);
            }}
            className="flex items-stretch gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pt-4 pb-8 -mt-2"
          >
            {filtered.map((filiere) => (
              <div
                key={filiere.id}
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  setIsPaused(false);
                }}
                className="w-[88vw] sm:w-[360px] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start flex flex-col"
              >
                <FormationCard formation={filiere} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Controls Row: Navigation arrows on left, Discovery button on right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 sm:mt-10">
          {/* Left: Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border border-afi-red/30 bg-white hover:bg-afi-red flex items-center justify-center text-afi-red hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer focus:outline-none focus:ring-0 active:scale-95 shadow-xs group"
              aria-label="Filières précédentes"
            >
              <ChevronLeft className="w-5 h-5 text-afi-red group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full border border-afi-red/30 bg-white hover:bg-afi-red flex items-center justify-center text-afi-red hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer focus:outline-none focus:ring-0 active:scale-95 shadow-xs group"
              aria-label="Filières suivantes"
            >
              <ChevronRight className="w-5 h-5 text-afi-red group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Right: Discovery Button */}
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm transition-all hover:scale-105"
          >
            <BookOpen className="w-4 h-4 text-afi-red" />
            <span>Explorer toutes les formations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
