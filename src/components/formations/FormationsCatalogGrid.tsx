"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Formation } from "@/types/database";
import { FormationCard } from "@/components/formations/FormationCard";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/motion";

interface FormationsCatalogGridProps {
  formations: Formation[];
  itemsPerPage?: number; // 9 = exactly 3 rows of 3 columns
}

export function FormationsCatalogGrid({
  formations,
  itemsPerPage = 9,
}: FormationsCatalogGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial page from URL or default to 1
  const initialPageParam = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPageParam);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(formations.length / itemsPerPage));

  // If formations list changes (e.g. user filtered by domain or level), reset to page 1 if current > total
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [formations.length, totalPages, currentPage]);

  // Keep state synced with URL ?page= parameter
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    if (pageFromUrl !== currentPage && pageFromUrl <= totalPages) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams, totalPages, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;

    setCurrentPage(newPage);

    // Update URL param without refreshing
    const params = new URLSearchParams(searchParams.toString());
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    const newQuery = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/formations${newQuery}#catalogue`, { scroll: false });

    // Smooth scroll to catalogue header
    const catalogueEl = document.getElementById("catalogue");
    if (catalogueEl) {
      const topOffset = catalogueEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  // Slice formations for current page
  const paginatedFormations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return formations.slice(start, start + itemsPerPage);
  }, [formations, currentPage, itemsPerPage]);

  // Pagination number generator with smart ellipsis (1 ... 3 4 5 ... 10)
  const paginationRange = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range: (number | string)[] = [];
    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;

    if (!showLeftEllipsis && showRightEllipsis) {
      range.push(1, 2, 3, 4, "...", totalPages);
    } else if (showLeftEllipsis && !showRightEllipsis) {
      range.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else if (showLeftEllipsis && showRightEllipsis) {
      range.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, formations.length);

  if (formations.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="font-sans font-bold text-lg text-slate-900">
          Aucune formation trouvée
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Essayez de réinitialiser vos filtres ou de modifier votre terme de recherche.
        </p>
        <div className="pt-2">
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <span>Réinitialiser les filtres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* 3 ROWS OF 3 COLUMNS GRID (Max 9 items) WITH STAGGERED FLUID ENTRANCE */}
      <StaggerContainer
        key={currentPage}
        staggerChildren={0.06}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch pt-2 sm:pt-3 pb-4"
      >
        {paginatedFormations.map((formation) => (
          <StaggerItem key={formation.id} className="h-full flex flex-col">
            <FormationCard formation={formation} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* MODERN NUMBER NAVIGATION (Apple / Google Minimalist Style) */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Summary count */}
          <div className="text-xs text-slate-500 font-medium order-2 sm:order-1">
            Affichage de <strong className="text-slate-900 font-bold">{startItem}</strong> à{" "}
            <strong className="text-slate-900 font-bold">{endItem}</strong> sur{" "}
            <strong className="text-slate-900 font-bold">{formations.length}</strong> filières
          </div>

          {/* Number Navigation Bar */}
          <nav
            aria-label="Pagination des programmes"
            className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-slate-200 shadow-xs order-1 sm:order-2"
          >
            {/* Previous button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Page précédente"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden md:inline">Précédent</span>
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1 px-1">
              {paginationRange.map((page, idx) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-bold select-none"
                    >
                      &hellip;
                    </span>
                  );
                }

                const pageNumber = Number(page);
                const isActive = pageNumber === currentPage;

                return (
                  <button
                    key={`page-${pageNumber}`}
                    type="button"
                    onClick={() => handlePageChange(pageNumber)}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Aller à la page ${pageNumber}`}
                    className={`min-w-[36px] h-9 px-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? "bg-[#0B0F19] text-white shadow-xs scale-100 font-black"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Page suivante"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <span className="hidden md:inline">Suivant</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

