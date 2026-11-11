"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Filter } from "lucide-react";
import { Domain } from "@/types/database";

interface CatalogFilterBarProps {
  domains: Domain[];
  totalResults: number;
}

export function CatalogFilterBar({
  domains,
  totalResults,
}: CatalogFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentDomain = searchParams.get("domain") || "";
  const currentLevel = searchParams.get("level") || "";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/formations?${params.toString()}`);
  }

  function clearAll() {
    router.push("/formations");
  }

  const hasActiveFilters = Boolean(currentSearch || currentDomain || currentLevel);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            defaultValue={currentSearch}
            placeholder="Filtrer par nom (ex: Intelligence Artificielle, Audit...)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilter("search", e.currentTarget.value);
              }
            }}
            onBlur={(e) => updateFilter("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-red focus:ring-1 focus:ring-afi-red"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => updateFilter("level", "")}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              !currentLevel
                ? "bg-afi-navy text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tous les cycles
          </button>
          <button
            onClick={() => updateFilter("level", "licence")}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              currentLevel === "licence"
                ? "bg-afi-red text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Licences (BAC+3)
          </button>
          <button
            onClick={() => updateFilter("level", "master")}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              currentLevel === "master"
                ? "bg-afi-navy text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Masters (BAC+5)
          </button>
        </div>
      </div>

      {/* Domain filter tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" />
          Domaines :
        </span>
        <button
          onClick={() => updateFilter("domain", "")}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
            !currentDomain
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Tous
        </button>
        {domains.map((d) => (
          <button
            key={d.id}
            onClick={() => updateFilter("domain", d.slug)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              currentDomain === d.slug
                ? "bg-afi-red text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {d.name}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-afi-red hover:underline"
          >
            <X className="w-3.5 h-3.5" />
            Réinitialiser les filtres
          </button>
        )}
      </div>
    </div>
  );
}
