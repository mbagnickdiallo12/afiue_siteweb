import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  ChevronRight,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/services/articles.service";
import { ArticleContentRenderer } from "@/components/blog/ArticleContentRenderer";

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable | AFI-L'UE",
    };
  }

  return {
    title: article.meta_title || `${article.title} | AFI-L'UE`,
    description: article.meta_description || article.excerpt || article.title,
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const otherArticles = (await getArticles({ limit: 4 })).filter(
    (a) => a.slug !== article.slug
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <Link href="/" className="hover:text-afi-red transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link
              href="/actualites"
              className="hover:text-afi-red transition-colors"
            >
              Actualités
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold truncate max-w-sm">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-md space-y-8">
          {/* Header */}
          <div className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-afi-red text-white font-bold uppercase tracking-wider shadow-xs">
                {article.category?.name || "Actualité"}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(
                  article.published_at || article.created_at
                ).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed italic border-l-4 border-afi-red pl-4">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Couverture photo réelle */}
          {article.cover_image_url && (
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <Image
                src={article.cover_image_url}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Body Content with Rich Markdown & Gallery renderer */}
          <div className="pt-2">
            <ArticleContentRenderer content={article.content} />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Mots-clés :
              </span>
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Action Ribbon */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-afi-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à toutes les actualités</span>
            </Link>

            <Link
              href="/candidater"
              className="px-4 py-2 rounded-xl bg-afi-red text-white text-xs font-bold shadow-sm hover:bg-afi-red-800 transition-colors"
            >
              Candidater à l&apos;AFI-L&apos;UE
            </Link>
          </div>
        </div>
      </article>

      {/* Other Articles Recommendation */}
      {otherArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 space-y-6">
          <h3 className="font-heading font-bold text-xl text-slate-900">
            À Lire Également
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherArticles.slice(0, 3).map((a) => (
              <Link
                key={a.id}
                href={`/actualites/${a.slug}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-afi-red/40 hover:shadow-md transition-all group"
              >
                <div className="text-[11px] font-bold text-afi-red mb-1">
                  {a.category?.name || "Actualité"}
                </div>
                <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-afi-red transition-colors line-clamp-2">
                  {a.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
