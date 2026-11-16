import { Article, ArticleCategory } from "@/types/database";
import { MOCK_CATEGORIES } from "@/lib/data/mock-data";
import { ensureUuid, getServerSupabase } from "@/lib/supabase/admin";
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
    const supabase = await getServerSupabase();
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

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return filterArticlesList(data as Article[], {
          tag: options?.tag,
          search: options?.search,
          limit: options?.limit,
        });
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  const published = store.articles.filter((a) => a.status === "published");
  return filterArticlesList(published, options);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select(`*, category:article_categories(*)`)
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        return data as Article;
      }
    }
  } catch {
    // fallback to CMS store
  }

  const store = readCmsStore();
  const found = store.articles.find((a) => a.slug === slug);
  if (found) {
    const cats =
      store.categories && store.categories.length > 0
        ? store.categories
        : MOCK_CATEGORIES;
    const cat =
      cats.find((c) => c.id === found.category_id) || found.category || null;
    return { ...found, category: cat };
  }
  return null;
}

export async function getAllArticlesAdmin(): Promise<Article[]> {
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select(`*, category:article_categories(*)`)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Article[];
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  const cats =
    store.categories && store.categories.length > 0
      ? store.categories
      : MOCK_CATEGORIES;
  return store.articles
    .map((a) => {
      const cat = cats.find((c) => c.id === a.category_id) || a.category || null;
      return { ...a, category: cat };
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function getCategories(): Promise<ArticleCategory[]> {
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("article_categories")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as ArticleCategory[];
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  const cats =
    store.categories && store.categories.length > 0
      ? store.categories
      : MOCK_CATEGORIES;
  return [...cats].sort((a, b) => a.order_index - b.order_index);
}

export async function incrementArticleViewCount(
  slug: string
): Promise<number | null> {
  let updatedCount: number | null = null;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("articles")
        .select("id, view_count")
        .eq("slug", slug)
        .maybeSingle();

      if (data) {
        const nextCount = (data.view_count || 0) + 1;
        await supabase
          .from("articles")
          .update({ view_count: nextCount })
          .eq("id", data.id);
        updatedCount = nextCount;
      }
    }
  } catch {
    // ignore
  }

  try {
    const store = readCmsStore();
    const article = store.articles.find((a) => a.slug === slug);
    if (article) {
      article.view_count = (article.view_count || 0) + 1;
      writeCmsStore(store);
      if (updatedCount === null) {
        updatedCount = article.view_count;
      }
    }
  } catch {
    // ignore
  }

  return updatedCount;
}

export async function getAllCategoriesAdmin(): Promise<ArticleCategory[]> {
  return getCategories();
}

export async function saveCategory(
  category: Partial<ArticleCategory> & { id?: string }
): Promise<ArticleCategory> {
  const store = readCmsStore();
  const cats =
    store.categories && store.categories.length > 0
      ? [...store.categories]
      : [...MOCK_CATEGORIES];
  const targetId = category.id ? ensureUuid(category.id) : undefined;
  const existingIdx = cats.findIndex(
    (c) => c.id === category.id || (targetId && ensureUuid(c.id) === targetId)
  );

  let updated: ArticleCategory;
  if (existingIdx >= 0) {
    updated = {
      ...cats[existingIdx],
      ...category,
      id: ensureUuid(cats[existingIdx].id),
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
      id: ensureUuid(category.id),
      name: category.name || "Nouvelle Catégorie",
      slug,
      description: category.description || null,
      order_index: category.order_index ?? cats.length + 1,
      created_at: new Date().toISOString(),
    };
    cats.push(updated);
  }

  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      await supabase.from("article_categories").upsert(
        {
          id: updated.id,
          name: updated.name,
          slug: updated.slug,
          description: updated.description,
          order_index: updated.order_index,
        },
        { onConflict: "id" }
      );
    }
  } catch (err) {
    console.warn("Supabase category sync warning:", err);
  }

  store.categories = cats;
  writeCmsStore(store);
  return updated;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const store = readCmsStore();
  const cats =
    store.categories && store.categories.length > 0
      ? [...store.categories]
      : [...MOCK_CATEGORIES];
  const targetUuid = ensureUuid(id);
  const filtered = cats.filter(
    (c) => c.id !== id && ensureUuid(c.id) !== targetUuid
  );

  let dbDeleted = false;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { error } = await supabase
        .from("article_categories")
        .delete()
        .eq("id", targetUuid);
      if (!error) dbDeleted = true;
    }
  } catch {
    // ignore
  }

  if (filtered.length !== cats.length || dbDeleted) {
    store.categories = filtered;
    writeCmsStore(store);
    return true;
  }
  return false;
}

export async function saveArticle(
  article: Partial<Article> & { id?: string }
): Promise<Article> {
  const store = readCmsStore();
  const availableCats = await getCategories();
  const linkedCategory =
    availableCats.find(
      (c) =>
        c.id === article.category_id ||
        (article.category_id && ensureUuid(c.id) === ensureUuid(article.category_id))
    ) ||
    article.category ||
    availableCats[0] ||
    null;

  const targetId = article.id ? ensureUuid(article.id) : undefined;
  const existingIndex = store.articles.findIndex(
    (a) =>
      a.id === article.id ||
      (targetId && ensureUuid(a.id) === targetId) ||
      (article.slug && a.slug === article.slug)
  );

  let updated: Article;
  if (existingIndex >= 0) {
    updated = {
      ...store.articles[existingIndex],
      ...article,
      id: ensureUuid(store.articles[existingIndex].id),
      title: article.title || store.articles[existingIndex].title,
      slug: article.slug || store.articles[existingIndex].slug,
      category_id: linkedCategory?.id
        ? ensureUuid(linkedCategory.id)
        : article.category_id
        ? ensureUuid(article.category_id)
        : null,
      category: linkedCategory,
      updated_at: new Date().toISOString(),
    };
    store.articles[existingIndex] = updated;
  } else {
    updated = {
      id: ensureUuid(article.id),
      category_id: linkedCategory?.id ? ensureUuid(linkedCategory.id) : null,
      author_id: null,
      title: article.title || "Nouvel Article",
      slug:
        article.slug ||
        (article.title
          ? article.title
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
          : `article-${Date.now()}`),
      excerpt: article.excerpt || null,
      content: article.content || "",
      cover_image_url:
        article.cover_image_url || "/images/news/admission-2026.jpg",
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

  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const dbPayload = {
        id: updated.id,
        category_id: updated.category_id,
        author_id: null,
        title: updated.title,
        slug: updated.slug,
        excerpt: updated.excerpt,
        content: updated.content,
        cover_image_url: updated.cover_image_url,
        tags: updated.tags,
        status: updated.status,
        is_pinned: updated.is_pinned,
        view_count: updated.view_count,
        published_at: updated.published_at,
        meta_title: updated.meta_title,
        meta_description: updated.meta_description,
        updated_at: updated.updated_at,
      };
      await supabase.from("articles").upsert(dbPayload, { onConflict: "id" });
    }
  } catch (err) {
    console.warn("Supabase article sync warning:", err);
  }

  writeCmsStore(store);
  return updated;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const targetUuid = ensureUuid(id);
  let dbDeleted = false;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", targetUuid);
      if (!error) dbDeleted = true;
    }
  } catch {
    // ignore
  }

  const store = readCmsStore();
  const initialLen = store.articles.length;
  store.articles = store.articles.filter(
    (a) => a.id !== id && ensureUuid(a.id) !== targetUuid
  );
  if (store.articles.length !== initialLen || dbDeleted) {
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
    const tagLower = options.tag.toLowerCase();
    result = result.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === tagLower)
    );
  }

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
        a.content.toLowerCase().includes(q)
    );
  }

  if (options.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}
