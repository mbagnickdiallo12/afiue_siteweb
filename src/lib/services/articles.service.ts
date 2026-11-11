import { Article, ArticleCategory } from "@/types/database";
import { MOCK_CATEGORIES } from "@/lib/data/mock-data";
import { createClient } from "@/lib/supabase/server";
import { readCmsStore, writeCmsStore } from "./cms-store";

export interface ArticlesFilterOptions {
  categorySlug?: string;
  tag?: string;
  search?: string;
  limit?: number;
}

export async function getArticles(
  options?: ArticlesFilterOptions
): Promise<Article[]> {
  try {
    const supabase = await createClient();
    if (supabase) {
      let query = supabase
        .from("articles")
        .select(`*, category:article_categories(*)`)
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (options?.categorySlug) {
        const { data: catData } = await supabase
          .from("article_categories")
          .select("id")
          .eq("slug", options.categorySlug)
          .maybeSingle();

        if (catData?.id) {
          query = query.eq("category_id", catData.id);
        }
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Article[];
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  const published = store.articles.filter((a) => a.status === "published");
  return filterArticlesList(published, options);
}

export async function getAllArticlesAdmin(): Promise<Article[]> {
  const store = readCmsStore();
  const cats = store.categories && store.categories.length > 0 ? store.categories : MOCK_CATEGORIES;
  return store.articles
    .map((a) => {
      const cat = cats.find((c) => c.id === a.category_id) || a.category || null;
      return { ...a, category: cat };
    })
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const store = readCmsStore();
  const found = store.articles.find((a) => a.slug === slug);
  return found || null;
}

export async function getCategories(): Promise<ArticleCategory[]> {
  const store = readCmsStore();
  const cats = store.categories && store.categories.length > 0 ? store.categories : MOCK_CATEGORIES;
  return [...cats].sort((a, b) => a.order_index - b.order_index);
}

export async function getAllCategoriesAdmin(): Promise<ArticleCategory[]> {
  return getCategories();
}

export async function saveCategory(category: Partial<ArticleCategory> & { id?: string }): Promise<ArticleCategory> {
  const store = readCmsStore();
  const cats = store.categories && store.categories.length > 0 ? [...store.categories] : [...MOCK_CATEGORIES];
  const existingIdx = cats.findIndex((c) => c.id === category.id);

  let updated: ArticleCategory;
  if (existingIdx >= 0) {
    updated = {
      ...cats[existingIdx],
      ...category,
      name: category.name || cats[existingIdx].name,
      slug:
        category.slug ||
        category.name
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") ||
        cats[existingIdx].slug,
    };
    cats[existingIdx] = updated;
  } else {
    const slug =
      category.slug ||
      category.name
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      `categorie-${Date.now()}`;

    updated = {
      id: category.id || `cat-${Date.now()}`,
      name: category.name || "Nouvelle Catégorie",
      slug,
      description: category.description || null,
      order_index: category.order_index ?? (cats.length + 1),
      created_at: new Date().toISOString(),
    };
    cats.push(updated);
  }

  store.categories = cats;
  writeCmsStore(store);
  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const store = readCmsStore();
  const cats = store.categories && store.categories.length > 0 ? [...store.categories] : [...MOCK_CATEGORIES];
  const filtered = cats.filter((c) => c.id !== id);
  if (filtered.length !== cats.length) {
    store.categories = filtered;
    writeCmsStore(store);
    return true;
  }
  return false;
}

export async function saveArticle(article: Partial<Article> & { id?: string }): Promise<Article> {
  const store = readCmsStore();
  const availableCats = store.categories && store.categories.length > 0 ? store.categories : MOCK_CATEGORIES;
  const linkedCategory =
    availableCats.find((c) => c.id === article.category_id) ||
    article.category ||
    availableCats[0] ||
    null;

  const existingIndex = store.articles.findIndex((a) => a.id === article.id);

  let updated: Article;
  if (existingIndex >= 0) {
    updated = {
      ...store.articles[existingIndex],
      ...article,
      title: article.title || store.articles[existingIndex].title,
      slug: article.slug || store.articles[existingIndex].slug,
      category_id: article.category_id || store.articles[existingIndex].category_id || linkedCategory?.id || null,
      category: linkedCategory,
      updated_at: new Date().toISOString(),
    };
    store.articles[existingIndex] = updated;
  } else {
    updated = {
      id: article.id || `art-${Date.now()}`,
      category_id: article.category_id || linkedCategory?.id || null,
      author_id: null,
      title: article.title || "Nouvel Article",
      slug: article.slug || `article-${Date.now()}`,
      excerpt: article.excerpt || null,
      content: article.content || "",
      cover_image_url: article.cover_image_url || "/images/news/admission-2026.jpg",
      tags: article.tags || ["Actualité"],
      status: article.status || "published",
      is_pinned: article.is_pinned ?? false,
      view_count: article.view_count || 0,
      published_at: article.published_at || new Date().toISOString(),
      meta_title: article.meta_title || article.title || null,
      meta_description: article.meta_description || article.excerpt || null,
      legacy_wp_id: null,
      legacy_wp_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: linkedCategory,
    };
    store.articles.unshift(updated);
  }

  writeCmsStore(store);
  return updated;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const store = readCmsStore();
  const initialLen = store.articles.length;
  store.articles = store.articles.filter((a) => a.id !== id);
  if (store.articles.length !== initialLen) {
    writeCmsStore(store);
    return true;
  }
  return false;
}

function filterArticlesList(
  articles: Article[],
  options?: ArticlesFilterOptions
): Article[] {
  if (!options) return articles;

  let result = [...articles];

  if (options.categorySlug) {
    result = result.filter((a) => a.category?.slug === options.categorySlug);
  }

  if (options.tag) {
    result = result.filter((a) => a.tags?.includes(options.tag!));
  }

  if (options.search) {
    const q = options.search.toLowerCase().trim();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
    );
  }

  if (options.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}
