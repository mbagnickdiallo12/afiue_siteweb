import { Testimonial } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";
import { createClient } from "@/lib/supabase/server";

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
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
  return store.testimonials.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  const store = readCmsStore();
  return store.testimonials.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}

export async function saveTestimonial(testimonial: Partial<Testimonial> & { id?: string }): Promise<Testimonial> {
  const store = readCmsStore();
  const existingIndex = store.testimonials.findIndex((t) => t.id === testimonial.id);

  let updated: Testimonial;
  if (existingIndex >= 0) {
    updated = {
      ...store.testimonials[existingIndex],
      ...testimonial,
      author_name: testimonial.author_name || store.testimonials[existingIndex].author_name,
      author_role: testimonial.author_role || store.testimonials[existingIndex].author_role,
      content: testimonial.content || store.testimonials[existingIndex].content,
    };
    store.testimonials[existingIndex] = updated;
  } else {
    updated = {
      id: testimonial.id || `testi-${Date.now()}`,
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

  writeCmsStore(store);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const store = readCmsStore();
  const initialLen = store.testimonials.length;
  store.testimonials = store.testimonials.filter((t) => t.id !== id);
  if (store.testimonials.length !== initialLen) {
    writeCmsStore(store);
    return true;
  }
  return false;
}

