import { Testimonial } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";
import { ensureUuid, getServerSupabase } from "@/lib/supabase/admin";

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Testimonial[];
      }
    }
  } catch {
    // fallback to store
  }

  const store = readCmsStore();
  return store.testimonials
    .filter((t) => t.is_active !== false)
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("order_index", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Testimonial[];
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  return store.testimonials.sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
}

export async function saveTestimonial(
  testimonial: Partial<Testimonial> & { id?: string }
): Promise<Testimonial> {
  const store = readCmsStore();
  const targetId = testimonial.id ? ensureUuid(testimonial.id) : undefined;
  const existingIndex = store.testimonials.findIndex(
    (t) =>
      t.id === testimonial.id ||
      (targetId && ensureUuid(t.id) === targetId)
  );

  let updated: Testimonial;
  if (existingIndex >= 0) {
    updated = {
      ...store.testimonials[existingIndex],
      ...testimonial,
      id: ensureUuid(store.testimonials[existingIndex].id),
      author_name:
        testimonial.author_name || store.testimonials[existingIndex].author_name,
      author_role:
        testimonial.author_role || store.testimonials[existingIndex].author_role,
      content: testimonial.content || store.testimonials[existingIndex].content,
    };
    store.testimonials[existingIndex] = updated;
  } else {
    updated = {
      id: ensureUuid(testimonial.id),
      author_name: testimonial.author_name || "Nom de l'Alumni",
      author_role: testimonial.author_role || "Poste & Fonction",
      author_company: testimonial.author_company || null,
      content: testimonial.content || "Témoignage...",
      avatar_url: testimonial.avatar_url || null,
      promotion_year: testimonial.promotion_year || new Date().getFullYear(),
      formation_title: testimonial.formation_title || null,
      is_featured: testimonial.is_featured ?? true,
      is_active: testimonial.is_active ?? true,
      order_index: testimonial.order_index ?? store.testimonials.length + 1,
      created_at: new Date().toISOString(),
    };
    store.testimonials.push(updated);
  }

  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      await supabase.from("testimonials").upsert(
        {
          id: updated.id,
          author_name: updated.author_name,
          author_role: updated.author_role,
          author_company: updated.author_company,
          content: updated.content,
          avatar_url: updated.avatar_url,
          promotion_year: updated.promotion_year,
          formation_title: updated.formation_title,
          is_featured: updated.is_featured,
          is_active: updated.is_active,
          order_index: updated.order_index,
        },
        { onConflict: "id" }
      );
    }
  } catch (err) {
    console.warn("Supabase testimonial sync warning:", err);
  }

  writeCmsStore(store);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const store = readCmsStore();
  const initialLen = store.testimonials.length;
  const targetUuid = ensureUuid(id);
  store.testimonials = store.testimonials.filter(
    (t) => t.id !== id && ensureUuid(t.id) !== targetUuid
  );

  let dbDeleted = false;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", targetUuid);
      if (!error) dbDeleted = true;
    }
  } catch {
    // ignore
  }

  if (store.testimonials.length !== initialLen || dbDeleted) {
    writeCmsStore(store);
    return true;
  }
  return false;
}
