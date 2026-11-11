"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Layers, ArrowRight, Loader2 } from "lucide-react";
import { SearchResultItem } from "@/lib/services/search.service";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search via client-safe API route
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Search fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Recherche sur AFI-L'UE"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une formation, un domaine (ex: IA, Audit, Droit, Master...)"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none"
          />
          {loading ? (
            <Loader2 className="w-5 h-5 text-afi-red animate-spin ml-2" />
          ) : query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded hover:bg-slate-100 text-slate-400"
              aria-label="Effacer la recherche"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              ESC
            </span>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100">
          {query.trim().length >= 2 && results.length === 0 && !loading && (
            <div className="py-8 text-center text-slate-500">
              <p className="font-medium text-sm">
                Aucun résultat pour &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Essayez un autre mot-clé (ex: Finance, Informatique, Licence, Logistique...)
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Résultats suggérés ({results.length})
              </div>
              {results.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.url}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        item.type === "formation"
                          ? "bg-afi-red/10 text-afi-red"
                          : "bg-afi-navy/10 text-afi-navy"
                      }`}
                    >
                      {item.type === "formation" ? (
                        <BookOpen className="w-4 h-4" />
                      ) : (
                        <Layers className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900 group-hover:text-afi-red transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-afi-red group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="py-6 px-2 text-xs text-slate-400 space-y-2">
              <div className="font-medium text-slate-500">Recherches populaires :</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Intelligence Artificielle",
                  "Génie Logiciel",
                  "Audit & Contrôle",
                  "Banque Finance",
                  "Supply Chain",
                  "Cours du soir",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-afi-red/10 hover:text-afi-red text-slate-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Astuce : vous pouvez ouvrir cette recherche à tout moment avec{" "}
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">
              ⌘K
            </kbd>
          </span>
          <Link
            href="/formations"
            onClick={onClose}
            className="font-medium text-afi-red hover:underline"
          >
            Voir tout le catalogue &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
