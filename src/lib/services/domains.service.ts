import { Domain, Department, DomainHierarchy } from "@/types/database";
import { MOCK_DOMAINS, MOCK_DEPARTMENTS } from "@/lib/data/mock-data";
import { PROGRAMME_HIERARCHY } from "@/lib/data/programme-hierarchy";
import { createClient } from "@/lib/supabase/server";

export async function getDomainHierarchyBySlug(
  slug: string
): Promise<DomainHierarchy | null> {
  return (
    PROGRAMME_HIERARCHY.find(
      (d) =>
        d.slug === slug || d.code.toLowerCase() === slug.toLowerCase()
    ) || null
  );
}

export async function getDomains(): Promise<Domain[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return MOCK_DOMAINS;
    }

    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_DOMAINS;
    }

    return data as Domain[];
  } catch {
    return MOCK_DOMAINS;
  }
}

export async function getDomainBySlug(slug: string): Promise<Domain | null> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return MOCK_DOMAINS.find((d) => d.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return MOCK_DOMAINS.find((d) => d.slug === slug) || null;
    }

    return data as Domain;
  } catch {
    return MOCK_DOMAINS.find((d) => d.slug === slug) || null;
  }
}

export async function getDepartments(): Promise<Department[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return MOCK_DEPARTMENTS;
    }

    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_DEPARTMENTS;
    }

    return data as Department[];
  } catch {
    return MOCK_DEPARTMENTS;
  }
}
