import { HomepageSlide } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";
import { ensureUuid, getServerSupabase } from "@/lib/supabase/admin";

export async function getActiveSlides(): Promise<HomepageSlide[]> {
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("homepage_slides")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as HomepageSlide[];
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  return store.slides
    .filter((s) => s.is_active)
    .sort((a, b) => a.order_index - b.order_index);
}

export async function getAllSlidesAdmin(): Promise<HomepageSlide[]> {
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("homepage_slides")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as HomepageSlide[];
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  return store.slides.sort((a, b) => a.order_index - b.order_index);
}

export async function saveSlide(
  slide: Partial<HomepageSlide> & { id?: string }
): Promise<HomepageSlide> {
  const store = readCmsStore();
  const targetId = slide.id ? ensureUuid(slide.id) : undefined;
  const existingIndex = store.slides.findIndex(
    (s) => s.id === slide.id || (targetId && s.id === targetId)
  );

  let updated: HomepageSlide;
  if (existingIndex >= 0) {
    updated = {
      ...store.slides[existingIndex],
      ...slide,
      id: ensureUuid(store.slides[existingIndex].id),
      title: slide.title || store.slides[existingIndex].title,
      subtitle:
        slide.subtitle !== undefined
          ? slide.subtitle
          : store.slides[existingIndex].subtitle,
      updated_at: new Date().toISOString(),
    };
    store.slides[existingIndex] = updated;
  } else {
    updated = {
      id: ensureUuid(slide.id),
      badge: slide.badge || null,
      title: slide.title || "Nouvelle Diapositive",
      subtitle: slide.subtitle || "",
      image_url: slide.image_url || "/images/slides/hero-slide-1.jpg",
      cta_primary_text: slide.cta_primary_text || "En savoir plus",
      cta_primary_url: slide.cta_primary_url || "/formations",
      cta_secondary_text: slide.cta_secondary_text || null,
      cta_secondary_url: slide.cta_secondary_url || null,
      order_index: slide.order_index ?? store.slides.length + 1,
      is_active: slide.is_active ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.slides.push(updated);
  }

  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      await supabase.from("homepage_slides").upsert(
        {
          id: updated.id,
          badge: updated.badge,
          title: updated.title,
          subtitle: updated.subtitle,
          image_url: updated.image_url,
          cta_primary_text: updated.cta_primary_text,
          cta_primary_url: updated.cta_primary_url,
          cta_secondary_text: updated.cta_secondary_text,
          cta_secondary_url: updated.cta_secondary_url,
          order_index: updated.order_index,
          is_active: updated.is_active,
          updated_at: updated.updated_at,
        },
        { onConflict: "id" }
      );
    }
  } catch (err) {
    console.warn("Supabase slide sync warning:", err);
  }

  writeCmsStore(store);
  return updated;
}

export async function deleteSlide(id: string): Promise<boolean> {
  const store = readCmsStore();
  const initialLen = store.slides.length;
  const targetUuid = ensureUuid(id);
  store.slides = store.slides.filter((s) => s.id !== id && s.id !== targetUuid);

  let dbDeleted = false;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { error } = await supabase
        .from("homepage_slides")
        .delete()
        .eq("id", targetUuid);
      if (!error) dbDeleted = true;
    }
  } catch {
    // ignore
  }

  if (store.slides.length !== initialLen || dbDeleted) {
    writeCmsStore(store);
    return true;
  }
  return false;
}
