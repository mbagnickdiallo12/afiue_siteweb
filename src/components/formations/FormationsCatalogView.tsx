"use client";

import { useState, useMemo, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Filter, BookOpen, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Formation, Domain } from "@/types/database";
import { FormationCard } from "@/components/formations/FormationCard";

interface FormationsCatalogViewProps {
  allFormations: Formation[];
  domains: Domain[];
  initialLevel?: string;
  initialDomain?: string;
  initialSearch?: string;
}

export function FormationsCatalogView({
  allFormations,
  domains,
  initialLevel = "",
  initialDomain = "",
  initialSearch = "",
}: FormationsCatalogViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL or props
  const [level, setLevel] = useState<string>(() => searchParams.get("level") || initialLevel);
  const [domain, setDomain] = useState<string>(() => searchParams.get("domain") || initialDomain);
  const [search, setSearch] = useState<string>(() => searchParams.get("search") || initialSearch);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const p = Number(searchParams.get("page"));
    return p > 0 ? p : 1;
  });

  const [, startTransition] = useTransition();

  // Keep state synced if URL changes via back/forward navigation
  useEffect(() => {
    const urlLevel = searchParams.get("level") || "";
    const urlDomain = searchParams.get("domain") || "";
    const urlSearch = searchParams.get("search") || "";
    const urlPage = Number(searchParams.get("page")) || 1;

    setLevel(urlLevel);
    setDomain(urlDomain);
    setSearch(urlSearch);
    setCurrentPage(urlPage);
  }, [searchParams]);

  // Sync state to URL without reloading the page
  const syncUrl = (newLevel: string, newDomain: string, newSearch: string, newPage: number) => {
    const params = new URLSearchParams();
    if (newLevel) params.set("level", newLevel);
    if (newDomain) params.set("domain", newDomain);
    if (newSearch) params.set("search", newSearch);
    if (newPage > 1) params.set("page", newPage.toString());

    const qs = params.toString();
    const newUrl = qs ? `/formations?${qs}#catalogue` : "/formations#catalogue";

    startTransition(() => {
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", newUrl);
      }
    });
  };

  // Instant real-time filtering
  const filteredFormations = useMemo(() => {
    return allFormations.filter((f) => {
      // Level filter
      if (level) {
        if (f.level !== level) return false;
      }

      // Domain filter
      if (domain) {
        const matchesDomain =
          f.domain?.slug === domain ||
          f.domain?.code?.toLowerCase() === domain.toLowerCase() ||
          f.domain_id === domain ||
          (f.domaine && domains.find((d) => d.slug === domain)?.name.toLowerCase() === f.domaine.toLowerCase());

        if (!matchesDomain) return false;
      }

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesSearch =
          f.title.toLowerCase().includes(q) ||
          f.short_description?.toLowerCase().includes(q) ||
          f.mention?.toLowerCase().includes(q) ||
          f.domaine?.toLowerCase().includes(q);

        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [allFormations, level, domain, search, domains]);

  // Pagination calculations (9 items per page = 3x3)
  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredFormations.length / itemsPerPage));
  const activePage = Math.min(currentPage, totalPages);

  const paginatedFormations = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return filteredFormations.slice(start, start + itemsPerPage);
  }, [filteredFormations, activePage]);

  // Handler for Level filter change
  const handleLevelChange = (newLevel: string) => {
    const updated = level === newLevel ? "" : newLevel;
    setLevel(updated);
    setCurrentPage(1);
    syncUrl(updated, domain, search, 1);
  };

  // Handler for Domain filter change
  const handleDomainChange = (newDomain: string) => {
    const updated = domain === newDomain ? "" : newDomain;
    setDomain(updated);
    setCurrentPage(1);
    syncUrl(level, updated, search, 1);
  };

  // Handler for Search filter change
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    syncUrl(level, domain, value, 1);
  };

  // Reset all filters
  const handleReset = () => {
    setLevel("");
    setDomain("");
    setSearch("");
    setCurrentPage(1);
    syncUrl("", "", "", 1);
  };

  // Handler for Page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === activePage) return;
    setCurrentPage(newPage);
    syncUrl(level, domain, search, newPage);

    // Smooth scroll to top of catalogue
    const catalogueEl = document.getElementById("catalogue");
    if (catalogueEl) {
      const topOffset = catalogueEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  // Pagination buttons logic
  const paginationRange = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const range: (number | string)[] = [];
    const showLeftEllipsis = activePage > 3;
    const showRightEllipsis = activePage < totalPages - 2;

    if (!showLeftEllipsis && showRightEllipsis) {
      range.push(1, 2, 3, 4, "...", totalPages);
    } else if (showLeftEllipsis && !showRightEllipsis) {
      range.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else if (showLeftEllipsis && showRightEllipsis) {
      range.push(1, "...", activePage - 1, activePage, activePage + 1, "...", totalPages);
    }
    return range;
  }, [activePage, totalPages]);

  const hasActiveFilters = Boolean(level || domain || search);
  const startItem = (activePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(activePage * itemsPerPage, filteredFormations.length);

  return (
    <div className="space-y-8">
      {/* =========================================================================
          BARRE DE FILTRES MULTI-CRITÈRES (Recherche instantanée + Niveaux + Domaines)
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Recherche textuelle en direct */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Filtrer par nom (ex: Intelligence Artificielle, Audit...)"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-red focus:ring-1 focus:ring-afi-red transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtres par Cycle / Niveau */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
            <button
              type="button"
              onClick={() => handleLevelChange("")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                !level
                  ? "bg-afi-navy text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tous les cycles
            </button>
            <button
              type="button"
              onClick={() => handleLevelChange("licence")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                level === "licence"
                  ? "bg-afi-red text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Licences (BAC+3)
            </button>
            <button
              type="button"
              onClick={() => handleLevelChange("master")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                level === "master"
                  ? "bg-afi-navy text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Masters (BAC+5)
            </button>
          </div>
        </div>

        {/* Filtres par Domaines Académiques */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Domaines :
          </span>

          <button
            type="button"
            onClick={() => handleDomainChange("")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              !domain
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tous
          </button>

          {domains.map((d) => {
            const isSelected = domain === d.slug;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => handleDomainChange(d.slug)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-afi-red text-white shadow-2xs font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {d.name}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-afi-red hover:underline cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Réinitialiser les filtres</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          RÉSULTATS DE FORMATIONS OU ÉTAT VIDE
          ========================================================================= */}
      {filteredFormations.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-sans font-bold text-lg text-slate-900">
            Aucune formation trouvée
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Aucune filière ne correspond à vos critères de recherche actuels.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0F19] hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <span>Réinitialiser les filtres</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Grille responsive des formations (3 colonnes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {paginatedFormations.map((formation) => (
              <div key={formation.id} className="h-full flex flex-col">
                <FormationCard formation={formation} />
              </div>
            ))}
          </div>

          {/* Pagination & Compteur */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium order-2 sm:order-1">
              Affichage de <strong className="text-slate-900 font-bold">{startItem}</strong> à{" "}
              <strong className="text-slate-900 font-bold">{endItem}</strong> sur{" "}
              <strong className="text-slate-900 font-bold">{filteredFormations.length}</strong> formation
              {filteredFormations.length > 1 ? "s" : ""}
            </div>

            {totalPages > 1 && (
              <nav
                className="flex items-center gap-1.5 order-1 sm:order-2"
                aria-label="Pagination catalogue"
              >
                {/* Bouton Précédent */}
                <button
                  type="button"
                  onClick={() => handlePageChange(activePage - 1)}
                  disabled={activePage === 1}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Précédent</span>
                </button>

                {/* Numéros de page */}
                <div className="flex items-center gap-1">
                  {paginationRange.map((pageNumber, idx) => {
                    if (pageNumber === "...") {
                      return (
                        <span
                          key={`ellipsis-${idx}`}
                          className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-400 select-none"
                        >
                          …
                        </span>
                      );
                    }

                    const num = Number(pageNumber);
                    const isActive = num === activePage;

                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handlePageChange(num)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-afi-red text-white shadow-xs"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>

                {/* Bouton Suivant */}
                <button
                  type="button"
                  onClick={() => handlePageChange(activePage + 1)}
                  disabled={activePage === totalPages}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

