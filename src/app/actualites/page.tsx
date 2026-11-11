import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { getArticles, getCategories } from "@/lib/services/articles.service";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Actualités & Blog Scientifique | AFI-L'UE Dakar",
  description:
    "Suivez toute l'actualité institutionnelle, les événements universitaires, les colloques du laboratoire AFI Research Center et les informations d'admission.",
};

interface ActualitesPageProps {
  searchParams: Promise<{
    cat?: string;
    q?: string;
  }>;
}

export default async function ActualitesPage({ searchParams }: ActualitesPageProps) {
  const { cat, q } = await searchParams;
  const [articles, categories] = await Promise.all([
    getArticles({ categorySlug: cat, search: q }),
    getCategories(),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <FadeIn>
          <div className="bg-afi-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-afi-red px-3 py-1 rounded-full inline-block">
                Communication & Recherche
              </span>
              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Actualités & Publications
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Retrouvez les annonces officielles, les cérémonies de remise de diplômes, les travaux scientifiques d&apos;AFI Research Center et la vie de nos campus.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/actualites"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              !cat
                ? "bg-afi-navy text-white"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Toutes les actualités
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/actualites?cat=${c.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                cat === c.slug
                  ? "bg-afi-red text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const imageUrl = article.cover_image_url || "/images/news/admission-2026.jpg";
              return (
                <StaggerItem key={article.id}>
                  <HoverLift className="h-full">
                    <article
                      className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden group h-full justify-between"
                    >
                      {/* Couverture photo réelle + dégradé cinématographique AFI + pattern pointillé */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 shrink-0">
                        <Image
                          src={imageUrl}
                          alt={article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#191D38]/50 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 pattern-grid-dots opacity-40 pointer-events-none" />
                        <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-afi-red/20 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                        <Newspaper className="absolute bottom-3 right-3.5 w-8 h-8 text-white/20 stroke-[1.25] group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20 shadow-xs">
                          {article.category?.name || "Actualité"}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {new Date(
                                article.published_at || article.created_at
                              ).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          <h2 className="font-heading font-black text-base sm:text-lg text-slate-900 group-hover:text-afi-red transition-colors leading-snug line-clamp-2">
                            <Link href={`/actualites/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h2>

                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                          <Link
                            href={`/actualites/${article.slug}`}
                            className="text-xs font-bold text-slate-900 group-hover:text-afi-red flex items-center gap-1.5 transition-colors"
                          >
                            <span>Lire l&apos;article complet</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </HoverLift>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto space-y-3 border border-slate-200">
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Aucun article dans cette catégorie
            </h3>
            <p className="text-xs text-slate-500">
              Consultez l&apos;ensemble de nos publications récentes.
            </p>
            <div className="pt-2">
              <Link
                href="/actualites"
                className="px-4 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold inline-block"
              >
                Voir toutes les actualités
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
