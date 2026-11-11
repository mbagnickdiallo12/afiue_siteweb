import {
  Formation,
  DegreeLevel,
  DomainHierarchy,
  Domain,
} from "@/types/database";
import { MOCK_FORMATIONS } from "@/lib/data/mock-data";
import {
  PROGRAMME_HIERARCHY,
  ALL_DOMAINS,
} from "@/lib/data/programme-hierarchy";
import { createClient } from "@/lib/supabase/server";
import { readCmsStore, writeCmsStore } from "./cms-store";

export interface FormationsFilterOptions {
  domain?: string;
  level?: string;
  search?: string;
  department?: string;
  studyMode?: string;
  featuredOnly?: boolean;
}

/**
 * Retourne l'arborescence complète dynamique :
 * Programme AFI-L'UE -> Domaines -> Mentions (Licences / Masters) -> Formations
 */
export async function getProgrammeHierarchy(): Promise<DomainHierarchy[]> {
  try {
    const storeFormations = readCmsStore().formations.filter(
      (f) => f.is_active !== false
    );
    if (storeFormations.length > 0) {
      return ALL_DOMAINS.map((domain) => {
        const domainFormations = storeFormations
          .filter(
            (f) =>
              f.domain_id === domain.id ||
              f.domain?.slug === domain.slug ||
              (f.domaine &&
                f.domaine.toLowerCase() === domain.name.toLowerCase())
          )
          .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
        const licences = domainFormations.filter((f) => f.level === "licence");
        const masters = domainFormations.filter((f) => f.level === "master");

        return {
          ...domain,
          formations_count: licences.length + masters.length,
          licences_count: licences.length,
          masters_count: masters.length,
          mentions: {
            licences,
            masters,
          },
        };
      });
    }
    return PROGRAMME_HIERARCHY;
  } catch {
    return PROGRAMME_HIERARCHY;
  }
}

export async function getDomainHierarchyBySlug(
  slug: string
): Promise<DomainHierarchy | null> {
  const tree = await getProgrammeHierarchy();
  return (
    tree.find(
      (d) =>
        d.slug === slug || d.code.toLowerCase() === slug.toLowerCase()
    ) || null
  );
}

export async function getFormations(
  filters?: FormationsFilterOptions
): Promise<Formation[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return filterMockFormations(readCmsStore().formations, filters);
    }

    let query = supabase
      .from("formations")
      .select(
        `
        *,
        domain:domains(*),
        department:departments(*)
      `
      )
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (filters?.domain) {
      const { data: domainData } = await supabase
        .from("domains")
        .select("id")
        .or(`slug.eq.${filters.domain},code.eq.${filters.domain}`)
        .maybeSingle();

      if (domainData?.id) {
        query = query.eq("domain_id", domainData.id);
      }
    }

    if (filters?.level) {
      query = query.eq("level", filters.level as DegreeLevel);
    }

    if (filters?.featuredOnly) {
      query = query.eq("is_featured", true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return filterMockFormations(readCmsStore().formations, filters);
    }

    // If database still has partial seed (<30 formations), use complete dynamic catalogue
    if (!filters && data.length < 30) {
      return filterMockFormations(readCmsStore().formations, filters);
    }

    return data as Formation[];
  } catch {
    return filterMockFormations(MOCK_FORMATIONS, filters);
  }
}

export async function getFeaturedFormations(): Promise<Formation[]> {
  return getFormations({ featuredOnly: true });
}

export async function getFormationBySlug(
  slug: string
): Promise<Formation | null> {
  try {
    const storeFormations = readCmsStore().formations;
    const fromStore = storeFormations.find((f) => f.slug === slug);
    if (fromStore) {
      return fromStore;
    }

    const fallback = MOCK_FORMATIONS.find((f) => f.slug === slug);
    return fallback || null;
  } catch {
    const fallback = MOCK_FORMATIONS.find((f) => f.slug === slug);
    return fallback || null;
  }
}

export async function getSimilarFormations(
  currentSlug: string,
  domainId?: string | null,
  limit: number = 3
): Promise<Formation[]> {
  const all = await getFormations();
  return all
    .filter(
      (f) => f.slug !== currentSlug && (!domainId || f.domain_id === domainId)
    )
    .slice(0, limit);
}

export function getStaticDomains(): Domain[] {
  return ALL_DOMAINS;
}

export async function getAllFormationsAdmin(): Promise<Formation[]> {
  const store = readCmsStore();
  return store.formations.sort((a, b) => a.order_index - b.order_index);
}

export async function saveFormation(
  formation: Partial<Formation> & { id?: string; title: string }
): Promise<Formation> {
  const store = readCmsStore();
  const existingIndex = store.formations.findIndex(
    (f) =>
      (formation.id && f.id === formation.id) ||
      (!formation.id && formation.slug && f.slug === formation.slug)
  );

  const matchedDomain =
    ALL_DOMAINS.find(
      (d) =>
        d.id === formation.domain_id ||
        (formation.domaine &&
          d.name.toLowerCase() === formation.domaine.toLowerCase())
    ) ||
    formation.domain ||
    ALL_DOMAINS[0];

  let updated: Formation;
  if (existingIndex >= 0) {
    updated = {
      ...store.formations[existingIndex],
      ...formation,
      domain_id: formation.domain_id || matchedDomain.id,
      domain: matchedDomain,
      domaine: formation.domaine || matchedDomain.name,
      title: formation.title,
      slug: formation.slug || store.formations[existingIndex].slug,
      updated_at: new Date().toISOString(),
    };
    store.formations[existingIndex] = updated;
  } else {
    const slug =
      formation.slug ||
      formation.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const isMaster = formation.level === "master";

    updated = {
      id: formation.id || `form-${Date.now()}`,
      department_id: formation.department_id || null,
      domain_id: formation.domain_id || matchedDomain.id,
      domain: matchedDomain,
      department: null,
      title: formation.title,
      slug,
      level: formation.level || "licence",
      mention: formation.mention || null,
      specialty: formation.specialty || null,
      domaine: formation.domaine || matchedDomain.name,
      grade:
        formation.grade ||
        (isMaster ? "Master (Bac+5)" : "Licence (Bac+3)"),
      duration_years: formation.duration_years || (isMaster ? 2 : 3),
      duration_label:
        formation.duration_label ||
        (isMaster
          ? "2 ans (4 semestres – 120 crédits ECTS)"
          : "3 ans (6 semestres – 180 crédits ECTS)"),
      credits_ects: formation.credits_ects || (isMaster ? 120 : 180),
      short_description: formation.short_description || "",
      description: formation.description || null,
      objectives: formation.objectives || null,
      curriculum: formation.curriculum || null,
      program_blocks: formation.program_blocks || [],
      career_opportunities:
        formation.career_opportunities ||
        (formation.career_opportunities_list?.length
          ? formation.career_opportunities_list.join(", ")
          : null),
      career_opportunities_list: formation.career_opportunities_list || [],
      admission_requirements:
        formation.admission_requirements ||
        (formation.admission_conditions_list?.length
          ? formation.admission_conditions_list.join(" ")
          : null),
      admission_conditions_list: formation.admission_conditions_list || [],
      tuition_fees_local:
        formation.tuition_fees_local ?? (isMaster ? 1130000 : 920000),
      tuition_fees_international:
        formation.tuition_fees_international ?? (isMaster ? 1130000 : 1120000),
      tuition_summary: formation.tuition_summary || null,
      tuition_tiers: formation.tuition_tiers || [],
      extra_fees: formation.extra_fees || [],
      study_modes: formation.study_modes || [
        "initiale",
        "cours_du_soir",
        "weekend",
        "e_learning",
      ],
      brochure_url:
        formation.brochure_url || "/brochures/offre-de-formation-2026-2027.pdf",
      international_leader: formation.international_leader || null,
      is_featured: formation.is_featured ?? false,
      is_active: formation.is_active ?? true,
      order_index: formation.order_index ?? store.formations.length + 1,
      meta_title: formation.meta_title || `${formation.title} | AFI-L'UE`,
      meta_description:
        formation.meta_description || formation.short_description || null,
      legacy_wp_id: null,
      legacy_wp_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.formations.unshift(updated);
  }

  writeCmsStore(store);
  return updated;
}

export async function deleteFormation(id: string): Promise<boolean> {
  const store = readCmsStore();
  const initialLen = store.formations.length;
  store.formations = store.formations.filter((f) => f.id !== id && f.slug !== id);
  if (store.formations.length !== initialLen) {
    writeCmsStore(store);
    return true;
  }
  return false;
}

function filterMockFormations(
  formations: Formation[],
  filters?: FormationsFilterOptions
): Formation[] {
  if (!filters) return formations;

  return formations.filter((f) => {
    if (filters.featuredOnly && !f.is_featured) return false;
    if (filters.level && f.level !== filters.level) return false;
    if (filters.domain) {
      const match =
        f.domain?.slug === filters.domain ||
        f.domain?.code?.toLowerCase() === filters.domain.toLowerCase() ||
        f.domain_id === filters.domain;
      if (!match) return false;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      const match =
        f.title.toLowerCase().includes(q) ||
        f.short_description?.toLowerCase().includes(q) ||
        f.mention?.toLowerCase().includes(q) ||
        f.domaine?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}
