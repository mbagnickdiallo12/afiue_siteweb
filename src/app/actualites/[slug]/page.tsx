import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Tag,
  ShieldCheck,
  Building2,
  GraduationCap,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/services/articles.service";
import { ArticleContentRenderer } from "@/components/blog/ArticleContentRenderer";
import { ArticleReadingProgress } from "@/components/blog/ArticleReadingProgress";
import { ArticleShareBar } from "@/components/blog/ArticleShareBar";
import { ArticleTableOfContents } from "@/components/blog/ArticleTableOfContents";
import { ArticleViewCounter } from "@/components/blog/ArticleViewCounter";

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

  const title = article.meta_title || `${article.title} | AFI-L'UE`;
  const description =
    article.meta_description || article.excerpt || article.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.published_at || article.created_at,
      images: article.cover_image_url ? [article.cover_image_url] : [],
    },
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

  const allArticles = await getArticles({ limit: 8 });
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;

  // Calcul du temps de lecture (standard 180-200 mots/minute)
  const wordCount = article.content
    ? article.content.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 180));

  const publishedDate = new Date(
    article.published_at || article.created_at
  ).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased selection:bg-afi-red selection:text-white">
      {/* Barre de progression de lecture fixed */}
      <ArticleReadingProgress />

      {/* Fil d'Ariane Minimaliste & Sobre */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none"
          >
            <Link
              href="/"
              className="hover:text-afi-red font-medium transition-colors"
            >
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <Link
              href="/actualites"
              className="hover:text-afi-red font-medium transition-colors"
            >
              Actualités
            </Link>
            {article.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <Link
                  href={`/actualites?cat=${article.category.slug}`}
                  className="hover:text-afi-red font-medium transition-colors"
                >
                  {article.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24">
        {/* En-tête Éditorial Apple / Google */}
        <header className="max-w-4xl mx-auto text-center space-y-6 pb-10">
          {/* Badge Catégorie & Métadonnées */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-afi-red text-white font-bold uppercase tracking-wider text-[11px] shadow-xs">
              {article.category?.name || "Actualité Institutionnelle"}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <time dateTime={article.published_at || article.created_at}>
                {publishedDate}
              </time>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{readingTimeMin} min de lecture</span>
            </span>
            <span className="text-slate-300">•</span>
            <ArticleViewCounter
              slug={article.slug}
              initialCount={article.view_count || 0}
            />
          </div>

          {/* Grand Titre Éditorial */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.18] max-w-3xl mx-auto">
            {article.title}
          </h1>

          {/* Chapeau / Résumé */}
          {article.excerpt && (
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto italic">
              {article.excerpt}
            </p>
          )}

          {/* Signature Auteur Institutionnel */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="w-11 h-11 rounded-full bg-afi-navy text-white flex items-center justify-center font-heading font-black text-sm shadow-md border-2 border-white ring-1 ring-slate-200">
              AFI
            </div>
            <div className="text-left text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <span>Direction de la Communication & des Relations Publiques</span>
                <span title="Source Officielle AFI-L'UE" className="inline-flex items-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </span>
              </div>
              <p className="text-slate-500">
                Université AFI-L&apos;UE • Dakar, Sénégal
              </p>
            </div>
          </div>
        </header>

        {/* Couverture Photo Haute Définition */}
        {article.cover_image_url && (
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
            <div className="relative w-full aspect-[21/9] sm:aspect-[2/1] rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/80">
              <Image
                src={article.cover_image_url}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white/90 text-xs">
                <span className="font-medium truncate pr-4">
                  Campus AFI-L&apos;UE Dakar • Événement & Actualité
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px] font-semibold tracking-wide shrink-0">
                  AFI MEDIA
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Grille Principale 2 Colonnes : Contenu + Barre Latérale Sommaire/Actions */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Colonne Principale de Lecture (8 colonnes) */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-12 lg:p-14 border border-slate-200/80 shadow-md space-y-10">
            {/* Barre de partage horizontale supérieure */}
            <div className="border-b border-slate-100 pb-6 flex items-center justify-between">
              <ArticleShareBar
                title={article.title}
                slug={article.slug}
                variant="horizontal"
              />
            </div>

            {/* Corps du texte riche */}
            <div className="article-body">
              <ArticleContentRenderer content={article.content} />
            </div>

            {/* Mots-clés / Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-8 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5 text-afi-red" />
                  <span>Thématiques & Mots-clés</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/actualites?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Carte Auteur & Signature Institutionnelle */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-afi-navy text-white flex items-center justify-center font-heading font-black text-lg shrink-0 shadow-md">
                AFI
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-black text-sm text-slate-900">
                    Université AFI-L&apos;UE
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-afi-red text-white text-[10px] font-bold">
                    Officiel
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Pôle d&apos;excellence universitaire privé au Sénégal habilité par l&apos;État et accrédité par l&apos;ANAQ-Sup et le CAMES. Fondé pour former les leaders économiques et technologiques du continent.
                </p>
                <div className="pt-1 flex items-center gap-4 text-slate-500">
                  <Link
                    href="/actualites"
                    className="font-bold text-afi-red hover:underline"
                  >
                    Voir tous les articles &rarr;
                  </Link>
                  <span>•</span>
                  <a
                    href="mailto:communication@afi-ue.sn"
                    className="hover:text-slate-900 transition-colors"
                  >
                    Contact presse & communication
                  </a>
                </div>
              </div>
            </div>

            {/* Barre de partage inférieure */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-afi-red transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Toutes les actualités</span>
              </Link>
              <ArticleShareBar
                title={article.title}
                slug={article.slug}
                variant="horizontal"
              />
            </div>

            {/* Navigation Précédent / Suivant */}
            {(prevArticle || nextArticle) && (
              <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <Link
                    href={`/actualites/${prevArticle.slug}`}
                    className="p-4 rounded-2xl border border-slate-200/80 hover:border-afi-red/40 hover:shadow-xs transition-all space-y-1 group"
                  >
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 group-hover:text-afi-red transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Article Précédent
                    </span>
                    <p className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-slate-900">
                      {prevArticle.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}

                {nextArticle && (
                  <Link
                    href={`/actualites/${nextArticle.slug}`}
                    className="p-4 rounded-2xl border border-slate-200/80 hover:border-afi-red/40 hover:shadow-xs transition-all space-y-1 text-right group sm:col-start-2"
                  >
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center justify-end gap-1 group-hover:text-afi-red transition-colors">
                      Article Suivant
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <p className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-slate-900">
                      {nextArticle.title}
                    </p>
                  </Link>
                )}
              </div>
            )}
          </article>

          {/* Colonne Latérale Sticky (4 colonnes) */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-20 self-start space-y-6">
            {/* Table des matières interactive */}
            <ArticleTableOfContents content={article.content} />

            {/* Widget de partage social sticky */}
            <ArticleShareBar
              title={article.title}
              slug={article.slug}
              variant="sidebar"
            />

            {/* Encart Appel à Candidature AFI 2026-2027 */}
            <div className="bg-afi-navy text-white rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-afi-red/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-afi-red text-white text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Rentrée 2026-2027
                </div>

                <h3 className="font-heading font-black text-lg text-white leading-snug">
                  Rejoignez l&apos;Université de l&apos;Entreprise
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Licences, Masters et MBA reconnus par l&apos;État du Sénégal, l&apos;ANAQ-Sup et le CAMES.
                </p>

                <div className="space-y-2 text-xs text-slate-200 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Double diplomation internationale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Incubateur AFI-Boost & Stages garantis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Horaires Jour, Soir et Week-end</span>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <Link
                    href="/candidater"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-afi-red text-white text-xs font-bold hover:bg-afi-red-800 transition-colors shadow-md"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Déposer ma candidature</span>
                  </Link>

                  <a
                    href="https://wa.me/221778247110"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Conseiller Admissions (WhatsApp)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Encart Campus & Informations rapides */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Building2 className="w-4 h-4 text-afi-red" />
                <span>Campus Principal Dakar</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Rue A, Point E, Dakar • Accueil du lundi au vendredi de 8h30 à 18h30.
              </p>
              <div className="pt-1 text-[11px] text-slate-400">
                Téléphone : +221 33 824 71 10
              </div>
            </div>
          </aside>
        </div>

        {/* Section Recommandations "À Lire Également" */}
        {relatedArticles.length > 0 && (
          <section className="max-w-6xl mx-auto pt-20 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-bold text-afi-red uppercase tracking-wider block">
                  Recommandations
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                  À Lire Également
                </h2>
              </div>
              <Link
                href="/actualites"
                className="text-xs font-bold text-slate-700 hover:text-afi-red transition-colors inline-flex items-center gap-1.5"
              >
                <span>Toutes les publications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => {
                const relDate = new Date(
                  rel.published_at || rel.created_at
                ).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                const relWords = rel.content
                  ? rel.content.trim().split(/\s+/).filter(Boolean).length
                  : 0;
                const relReadingTime = Math.max(1, Math.ceil(relWords / 180));

                return (
                  <Link
                    key={rel.id}
                    href={`/actualites/${rel.slug}`}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-afi-red/40 transition-all flex flex-col group"
                  >
                    {/* Image */}
                    <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                      <Image
                        src={
                          rel.cover_image_url ||
                          "/images/news/admission-2026.jpg"
                        }
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-afi-red text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {rel.category?.name || "Actualité"}
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {relDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {relReadingTime} min
                          </span>
                        </div>
                        <h3 className="font-heading font-black text-base text-slate-900 group-hover:text-afi-red transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h3>
                        {rel.excerpt && (
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {rel.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-afi-red group-hover:translate-x-1 transition-transform">
                        <span>Lire l&apos;article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
