"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Newspaper,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  Search,
  ExternalLink,
  Eye,
  Calendar,
  Tag,
  ChevronDown,
  FolderOpen,
  Layers,
  Clock,
  Sparkles,
} from "lucide-react";
import { Article, ArticleCategory } from "@/types/database";
import { FileUploadZone } from "@/components/admin/FileUploadZone";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

interface Props {
  initialArticles: Article[];
  initialCategories: ArticleCategory[];
}

type SubTab = "articles" | "categories";

export function ArticlesAdminManager({
  initialArticles,
  initialCategories,
}: Props) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("articles");

  // Articles state
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [categories, setCategories] = useState<ArticleCategory[]>(initialCategories);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Article Modal state
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Partial<Article> | null>(null);
  const [isSavingArticle, setIsSavingArticle] = useState(false);
  const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null);
  const [isDeletingArticle, setIsDeletingArticle] = useState(false);

  // Category Modal state
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Partial<ArticleCategory> | null>(null);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q))) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(q));

      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      const matchCategory =
        categoryFilter === "all" ||
        a.category_id === categoryFilter ||
        a.category?.slug === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [articles, search, statusFilter, categoryFilter]);

  // Open Create Article
  const handleOpenCreateArticle = () => {
    const defaultCat = categories[0] || null;
    setActiveArticle({
      title: "",
      slug: "",
      category_id: defaultCat?.id || null,
      category: defaultCat,
      excerpt: "",
      content: "",
      cover_image_url: "/images/news/admission-2026.jpg",
      tags: ["Actualité", "AFI"],
      status: "published",
      is_pinned: false,
      published_at: new Date().toISOString(),
    });
    setIsEditingArticle(true);
  };

  // Open Edit Article
  const handleOpenEditArticle = (a: Article) => {
    setActiveArticle({ ...a });
    setIsEditingArticle(true);
  };

  // Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle || !activeArticle.title) return;

    setIsSavingArticle(true);
    try {
      const slug =
        activeArticle.slug ||
        activeArticle.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

      const payload = {
        ...activeArticle,
        slug,
      };

      const url = activeArticle.id
        ? `/api/admin/articles/${activeArticle.id}`
        : `/api/admin/articles`;
      const method = activeArticle.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de sauvegarde de l'article");
      }

      const saved: Article = data.data;

      if (activeArticle.id) {
        setArticles((prev) =>
          prev.map((a) => (a.id === saved.id ? saved : a))
        );
        showToast("Article mis à jour avec succès !");
      } else {
        setArticles((prev) => [saved, ...prev]);
        showToast("Nouvel article publié avec succès !");
      }

      setIsEditingArticle(false);
      setActiveArticle(null);
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsSavingArticle(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: string) => {
    setIsDeletingArticle(true);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      setArticles((prev) => prev.filter((a) => a.id !== id));
      setDeleteArticleId(null);
      showToast("Article supprimé définitivement.");
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsDeletingArticle(false);
    }
  };

  // Open Create Category
  const handleOpenCreateCategory = () => {
    setActiveCategory({
      name: "",
      slug: "",
      description: "",
      order_index: categories.length + 1,
    });
    setIsEditingCategory(true);
  };

  // Open Edit Category
  const handleOpenEditCategory = (cat: ArticleCategory) => {
    setActiveCategory({ ...cat });
    setIsEditingCategory(true);
  };

  // Save Category
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCategory || !activeCategory.name) return;

    setIsSavingCategory(true);
    try {
      const slug =
        activeCategory.slug ||
        activeCategory.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

      const payload = {
        ...activeCategory,
        slug,
      };

      const url = activeCategory.id
        ? `/api/admin/articles/categories/${activeCategory.id}`
        : `/api/admin/articles/categories`;
      const method = activeCategory.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de sauvegarde de la catégorie");
      }

      const savedCat: ArticleCategory = data.data;

      if (activeCategory.id) {
        setCategories((prev) =>
          prev.map((c) => (c.id === savedCat.id ? savedCat : c))
        );
        showToast("Catégorie mise à jour !");
      } else {
        setCategories((prev) => [...prev, savedCat]);
        showToast("Nouvelle catégorie créée !");
      }

      setIsEditingCategory(false);
      setActiveCategory(null);
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsSavingCategory(false);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    setIsDeletingCategory(true);
    try {
      const res = await fetch(`/api/admin/articles/categories/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      setCategories((prev) => prev.filter((c) => c.id !== id));
      setDeleteCategoryId(null);
      showToast("Catégorie supprimée.");
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsDeletingCategory(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Espace Actualités & Blog
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les articles de presse, publications du Research Center, galeries photos et catégories éditoriales.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeSubTab === "categories" ? (
            <button
              onClick={handleOpenCreateCategory}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle Catégorie</span>
            </button>
          ) : (
            <button
              onClick={handleOpenCreateArticle}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-afi-red hover:bg-afi-red-800 text-white text-xs font-bold shadow-md shadow-afi-red/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvel Article</span>
            </button>
          )}
        </div>
      </div>

      {/* SUB-TABS NAVIGATION (Articles vs Catégories) */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab("articles")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeSubTab === "articles"
              ? "bg-afi-navy text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Articles & Actualités ({articles.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("categories")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeSubTab === "categories"
              ? "bg-afi-navy text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>Catégories du Blog ({categories.length})</span>
        </button>
      </div>

      {/* VIEW 1: ARTICLES CATALOGUE */}
      {activeSubTab === "articles" && (
        <div className="space-y-6">
          {/* Control Bar: Search + Category Filter + Status Filter */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par titre, mot-clé, tag ou extrait..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-afi-navy/20 focus:border-afi-navy transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Category Dropdown */}
              <div className="relative min-w-[200px]">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-afi-navy/20 cursor-pointer"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Status Switcher */}
              <div className="inline-flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === "all"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Tous ({articles.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("published")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === "published"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Publiés
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("draft")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === "draft"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Brouillons
                </button>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <AlertCircle className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-700">
                Aucun article ne correspond à votre recherche.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Modifiez vos filtres ou rédigez un nouvel article.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((a) => {
                const words = (a.content || "").trim().split(/\s+/).length;
                const readMin = Math.max(1, Math.ceil(words / 200));

                return (
                  <div
                    key={a.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                        {a.cover_image_url ? (
                          <Image
                            src={a.cover_image_url}
                            alt={a.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                            <Newspaper className="w-8 h-8" />
                          </div>
                        )}

                        {/* Top Overlays */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-afi-navy text-white shadow-xs">
                            {a.category?.name || "Actualité"}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs ${
                              a.status === "published"
                                ? "bg-emerald-600 text-white"
                                : "bg-amber-600 text-white"
                            }`}
                          >
                            {a.status === "published" ? "Publié" : "Brouillon"}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {a.published_at
                              ? new Date(a.published_at).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "Date indéfinie"}
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            ~{readMin} min
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {a.view_count || 0}
                          </span>
                        </div>

                        <h3 className="font-heading font-black text-slate-900 text-sm line-clamp-2 leading-snug">
                          {a.title}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                          {a.excerpt || a.content}
                        </p>

                        {a.tags && a.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {a.tags.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                      <a
                        href={`/actualites/${a.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-afi-navy transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Voir l&apos;article</span>
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditArticle(a)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-afi-navy text-white text-[11px] font-bold hover:bg-afi-navy-800 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Éditer</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteArticleId(a.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Supprimer l'article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: CATEGORIES MANAGEMENT */}
      {activeSubTab === "categories" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                Catégories Éditoriales du Blog
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Organisez vos publications par thématique pour faciliter la découverte et le filtrage sur le site public.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreateCategory}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Créer une Catégorie</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const countArticles = articles.filter(
                (a) => a.category_id === cat.id || a.category?.slug === cat.slug
              ).length;

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-xl bg-afi-navy text-white flex items-center justify-center font-bold text-xs">
                          {cat.order_index || 1}
                        </span>
                        <div>
                          <h4 className="font-heading font-black text-sm text-slate-900">
                            {cat.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            /{cat.slug}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditCategory(cat)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Modifier la catégorie"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteCategoryId(cat.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Supprimer la catégorie"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed min-h-[40px]">
                      {cat.description || "Aucune description renseignée."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>
                      {countArticles} article{countArticles > 1 ? "s" : ""} associé{countArticles > 1 ? "s" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryFilter(cat.id);
                        setActiveSubTab("articles");
                      }}
                      className="text-afi-red hover:underline text-[11px] font-bold"
                    >
                      Filtrer les articles &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL 1: EDIT / CREATE ARTICLE (FULL BLOG EDITOR) */}
      {isEditingArticle && activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 custom-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-afi-navy" />
                <h3 className="font-heading font-black text-lg text-slate-900">
                  {activeArticle.id ? "Modifier l'Article" : "Rédiger un Nouvel Article"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditingArticle(false);
                  setActiveArticle(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="mt-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Titre de l&apos;article *
                </label>
                <input
                  type="text"
                  required
                  value={activeArticle.title || ""}
                  onChange={(e) =>
                    setActiveArticle({ ...activeArticle, title: e.target.value })
                  }
                  placeholder="ex: Cérémonie solennelle de remise des diplômes Promotion 2026"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                />
              </div>

              {/* Category, Status, Slug Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Catégorie du Blog *
                  </label>
                  <div className="relative">
                    <select
                      value={activeArticle.category_id || (categories[0]?.id || "")}
                      onChange={(e) => {
                        const catId = e.target.value;
                        const cat = categories.find((c) => c.id === catId) || null;
                        setActiveArticle({
                          ...activeArticle,
                          category_id: catId,
                          category: cat,
                        });
                      }}
                      className="appearance-none w-full pl-3.5 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20 cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Statut de publication
                  </label>
                  <div className="relative">
                    <select
                      value={activeArticle.status || "published"}
                      onChange={(e) =>
                        setActiveArticle({
                          ...activeArticle,
                          status: e.target.value as "published" | "draft",
                        })
                      }
                      className="appearance-none w-full pl-3.5 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20 cursor-pointer"
                    >
                      <option value="published">Publié (En ligne)</option>
                      <option value="draft">Brouillon (Non visible)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    value={activeArticle.slug || ""}
                    onChange={(e) =>
                      setActiveArticle({ ...activeArticle, slug: e.target.value })
                    }
                    placeholder="automatique si laissé vide"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                  />
                </div>
              </div>

              {/* COVER IMAGE UPLOAD ZONE */}
              <FileUploadZone
                label="Image de couverture de l'article"
                value={activeArticle.cover_image_url}
                onChange={(url) =>
                  setActiveArticle({ ...activeArticle, cover_image_url: url })
                }
                accept="image"
                helpText="Image principale au format paysage recommandée (16:9, PNG ou JPG)."
              />

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Tags & Mots-clés (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={activeArticle.tags ? activeArticle.tags.join(", ") : ""}
                  onChange={(e) =>
                    setActiveArticle({
                      ...activeArticle,
                      tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="ex: Admissions, Cérémonie, Recherche, Campus Dakar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Extrait / Résumé introductif
                </label>
                <textarea
                  rows={2}
                  value={activeArticle.excerpt || ""}
                  onChange={(e) =>
                    setActiveArticle({ ...activeArticle, excerpt: e.target.value })
                  }
                  placeholder="Court résumé affiché sur les cartes du blog et dans les aperçus..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                />
              </div>

              {/* FULL RICH TEXT EDITOR */}
              <RichTextEditor
                label="Contenu complet de l'article"
                value={activeArticle.content || ""}
                onChange={(content) =>
                  setActiveArticle({ ...activeArticle, content })
                }
                placeholder="Rédigez ici le corps de votre article, ajoutez des sous-titres, citations, listes, téléversez des images ou créez une galerie photos responsive..."
                minHeight="min-h-[380px]"
              />

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingArticle(false);
                    setActiveArticle(null);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSavingArticle}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold shadow-md shadow-afi-navy/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingArticle ? "Enregistrement..." : "Enregistrer l'article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT / CREATE CATEGORY */}
      {isEditingCategory && activeCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-afi-navy" />
                <h4 className="font-heading font-black text-sm text-slate-900">
                  {activeCategory.id ? "Modifier la Catégorie" : "Nouvelle Catégorie de Blog"}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditingCategory(false);
                  setActiveCategory(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Nom de la catégorie *
                </label>
                <input
                  type="text"
                  required
                  value={activeCategory.name || ""}
                  onChange={(e) =>
                    setActiveCategory({ ...activeCategory, name: e.target.value })
                  }
                  placeholder="ex: Vie Universitaire"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={activeCategory.slug || ""}
                    onChange={(e) =>
                      setActiveCategory({ ...activeCategory, slug: e.target.value })
                    }
                    placeholder="auto si vide"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Ordre d&apos;affichage
                  </label>
                  <input
                    type="number"
                    value={activeCategory.order_index ?? 1}
                    onChange={(e) =>
                      setActiveCategory({
                        ...activeCategory,
                        order_index: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={activeCategory.description || ""}
                  onChange={(e) =>
                    setActiveCategory({
                      ...activeCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description succincte de la thématique..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingCategory(false);
                    setActiveCategory(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSavingCategory}
                  className="px-5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800 disabled:opacity-50"
                >
                  {isSavingCategory ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE ARTICLE CONFIRMATION */}
      {deleteArticleId && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Supprimer l&apos;article
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Êtes-vous certain de vouloir supprimer cet article ? Cette action est irréversible.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteArticleId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={isDeletingArticle}
                onClick={() => handleDeleteArticle(deleteArticleId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeletingArticle ? "Suppression..." : "Confirmer la suppression"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: DELETE CATEGORY CONFIRMATION */}
      {deleteCategoryId && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Supprimer la catégorie
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Êtes-vous certain de vouloir supprimer cette catégorie ? Les articles associés resteront conservés dans le système.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteCategoryId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={isDeletingCategory}
                onClick={() => handleDeleteCategory(deleteCategoryId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeletingCategory ? "Suppression..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
