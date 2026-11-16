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
import {
  ensureUuid,
  getServerSupabase,
  getSiteSettingJson,
  setSiteSettingJson,
} from "@/lib/supabase/admin";
import {
  readCmsStore,
  writeCmsStore,
  DomainConfig,
  GradeConfig,
  PricingGridConfig,
  DEFAULT_DOMAINS_CONFIG,
  DEFAULT_GRADES_CONFIG,
  DEFAULT_PRICING_GRIDS_CONFIG,
} from "./cms-store";

export interface FormationsFilterOptions {
  domain?: string;
  level?: string;
  search?: string;
  department?: string;
  studyMode?: string;
  featuredOnly?: boolean;
}

export type FormationExtendedMeta = Pick<
  Formation,
  | "specialty"
  | "duration_label"
  | "program_blocks"
  | "career_opportunities_list"
  | "admission_conditions_list"
  | "tuition_summary"
  | "tuition_tiers"
  | "extra_fees"
  | "international_leader"
  | "accreditations"
>;

export const FORMATIONS_EXTENDED_KEY = "formations_extended_map";
export const ACADEMIC_CONFIG_KEY = "academic_config";

export interface AcademicConfigPayload {
  domains: DomainConfig[];
  grades: GradeConfig[];
  pricingGrids: PricingGridConfig[];
}

function mergeFormationRecord(
  dbItem: Partial<Formation> & { slug: string; id: string },
  storeMatch?: Formation,
  extMeta?: Partial<FormationExtendedMeta>
): Formation {
  const base = storeMatch || ({} as Formation);
  return {
    ...base,
    ...dbItem,
    id: dbItem.id || base.id,
    title: dbItem.title || base.title,
    slug: dbItem.slug || base.slug,
    level: (dbItem.level || base.level || "licence") as DegreeLevel,
    domain_id: dbItem.domain_id ?? base.domain_id ?? null,
    domain: dbItem.domain || base.domain || null,
    department_id: dbItem.department_id ?? base.department_id ?? null,
    department: dbItem.department || base.department || null,
    mention: dbItem.mention ?? base.mention ?? null,
    specialty: extMeta?.specialty ?? base.specialty ?? null,
    domaine: dbItem.domaine ?? base.domaine ?? dbItem.domain?.name ?? null,
    grade: dbItem.grade ?? base.grade ?? null,
    duration_years: dbItem.duration_years ?? base.duration_years ?? 3,
    duration_label: extMeta?.duration_label ?? base.duration_label ?? null,
    credits_ects: dbItem.credits_ects ?? base.credits_ects ?? 180,
    short_description: dbItem.short_description ?? base.short_description ?? null,
    description: dbItem.description ?? base.description ?? null,
    objectives: dbItem.objectives ?? base.objectives ?? null,
    curriculum: dbItem.curriculum ?? base.curriculum ?? null,
    program_blocks:
      extMeta?.program_blocks && extMeta.program_blocks.length > 0
        ? extMeta.program_blocks
        : base.program_blocks || [],
    career_opportunities:
      dbItem.career_opportunities ?? base.career_opportunities ?? null,
    career_opportunities_list:
      extMeta?.career_opportunities_list &&
      extMeta.career_opportunities_list.length > 0
        ? extMeta.career_opportunities_list
        : base.career_opportunities_list || [],
    admission_requirements:
      dbItem.admission_requirements ?? base.admission_requirements ?? null,
    admission_conditions_list:
      extMeta?.admission_conditions_list &&
      extMeta.admission_conditions_list.length > 0
        ? extMeta.admission_conditions_list
        : base.admission_conditions_list || [],
    tuition_fees_local:
      dbItem.tuition_fees_local !== undefined && dbItem.tuition_fees_local !== null
        ? Number(dbItem.tuition_fees_local)
        : base.tuition_fees_local ?? null,
    tuition_fees_international:
      dbItem.tuition_fees_international !== undefined &&
      dbItem.tuition_fees_international !== null
        ? Number(dbItem.tuition_fees_international)
        : base.tuition_fees_international ?? null,
    tuition_summary: extMeta?.tuition_summary ?? base.tuition_summary ?? null,
    tuition_tiers:
      extMeta?.tuition_tiers && extMeta.tuition_tiers.length > 0
        ? extMeta.tuition_tiers
        : base.tuition_tiers || [],
    extra_fees:
      extMeta?.extra_fees && extMeta.extra_fees.length > 0
        ? extMeta.extra_fees
        : base.extra_fees || [],
    study_modes:
      dbItem.study_modes && dbItem.study_modes.length > 0
        ? dbItem.study_modes
        : base.study_modes || ["initiale", "cours_du_soir", "weekend"],
    brochure_url: dbItem.brochure_url ?? base.brochure_url ?? null,
    international_leader:
      extMeta?.international_leader !== undefined
        ? extMeta.international_leader
        : base.international_leader ?? null,
    accreditations:
      extMeta?.accreditations && extMeta.accreditations.length > 0
        ? extMeta.accreditations
        : base.accreditations || [],
    is_featured: dbItem.is_featured ?? base.is_featured ?? false,
    is_active: dbItem.is_active ?? base.is_active ?? true,
    order_index: dbItem.order_index ?? base.order_index ?? 0,
    meta_title: dbItem.meta_title ?? base.meta_title ?? null,
    meta_description: dbItem.meta_description ?? base.meta_description ?? null,
    legacy_wp_id: dbItem.legacy_wp_id ?? base.legacy_wp_id ?? null,
    legacy_wp_url: dbItem.legacy_wp_url ?? base.legacy_wp_url ?? null,
    created_at: dbItem.created_at || base.created_at || new Date().toISOString(),
    updated_at: dbItem.updated_at || base.updated_at || new Date().toISOString(),
  };
}

async function fetchAllFormationsFromDb(includeInactive = false): Promise<Formation[]> {
  const storeFormations = readCmsStore().formations;
  try {
    const supabase = await getServerSupabase();
    if (!supabase) {
      return includeInactive
        ? storeFormations
        : storeFormations.filter((f) => f.is_active !== false);
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
      .order("order_index", { ascending: true });

    if (!includeInactive) {
      query = query.eq("is_active", true);
    }

    const [{ data, error }, extendedMap] = await Promise.all([
      query,
      getSiteSettingJson<Record<string, Partial<FormationExtendedMeta>>>(
        FORMATIONS_EXTENDED_KEY,
        {}
      ),
    ]);

    if (error || !data || data.length === 0) {
      return includeInactive
        ? storeFormations
        : storeFormations.filter((f) => f.is_active !== false);
    }

    return (data as Formation[]).map((dbItem) => {
      const storeMatch = storeFormations.find(
        (sf) => sf.slug === dbItem.slug || sf.id === dbItem.id
      );
      const extMeta = extendedMap[dbItem.slug] || extendedMap[dbItem.id];
      return mergeFormationRecord(dbItem, storeMatch, extMeta);
    });
  } catch {
    return includeInactive
      ? storeFormations
      : storeFormations.filter((f) => f.is_active !== false);
  }
}

/**
 * Retourne l'arborescence complète dynamique :
 * Programme AFI-L'UE -> Domaines -> Mentions (Licences / Masters) -> Formations
 */
export async function getProgrammeHierarchy(): Promise<DomainHierarchy[]> {
  try {
    const activeFormations = await fetchAllFormationsFromDb(false);
    if (activeFormations.length > 0) {
      return ALL_DOMAINS.map((domain) => {
        const domainFormations = activeFormations
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
    const allActive = await fetchAllFormationsFromDb(false);
    return filterMockFormations(allActive, filters);
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
    const all = await fetchAllFormationsFromDb(true);
    const found = all.find((f) => f.slug === slug || f.id === slug);
    if (found) return found;

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
  const all = await fetchAllFormationsFromDb(true);
  return all.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
}

export async function getAcademicConfigAdmin(): Promise<AcademicConfigPayload> {
  const store = readCmsStore();
  const fallback: AcademicConfigPayload = {
    domains: store.domains_config || DEFAULT_DOMAINS_CONFIG,
    grades: store.grades_config || DEFAULT_GRADES_CONFIG,
    pricingGrids: store.pricing_grids_config || DEFAULT_PRICING_GRIDS_CONFIG,
  };
  return await getSiteSettingJson<AcademicConfigPayload>(
    ACADEMIC_CONFIG_KEY,
    fallback
  );
}

export async function updateAcademicConfigAdmin(
  patch: Partial<AcademicConfigPayload>
): Promise<AcademicConfigPayload> {
  const current = await getAcademicConfigAdmin();
  const updated: AcademicConfigPayload = {
    domains: patch.domains || current.domains,
    grades: patch.grades || current.grades,
    pricingGrids: patch.pricingGrids || current.pricingGrids,
  };

  const store = readCmsStore();
  store.domains_config = updated.domains;
  store.grades_config = updated.grades;
  store.pricing_grids_config = updated.pricingGrids;
  writeCmsStore(store);

  await setSiteSettingJson(
    ACADEMIC_CONFIG_KEY,
    updated,
    "Configuration académique (domaines, grades et grilles tarifaires)"
  );

  // Also sync domains to public.domains table in Supabase
  if (patch.domains && patch.domains.length > 0) {
    try {
      const supabase = await getServerSupabase();
      if (supabase) {
        for (const d of patch.domains) {
          await supabase.from("domains").upsert(
            {
              id: ensureUuid(d.id),
              code: d.code,
              name: d.name,
              slug: d.slug,
              short_description: d.short_description,
              icon: d.icon || "BookOpen",
              order_index: d.order_index,
              is_active: d.is_active,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
        }
      }
    } catch {
      // ignore
    }
  }

  return updated;
}

export async function saveFormation(
  formation: Partial<Formation> & { id?: string; title: string }
): Promise<Formation> {
  const store = readCmsStore();
  const existingIndex = store.formations.findIndex(
    (f) =>
      (formation.id && f.id === formation.id) ||
      (formation.slug && f.slug === formation.slug)
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
      id: ensureUuid(formation.id || store.formations[existingIndex].id),
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
      id: ensureUuid(formation.id),
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

  // Synchronisation Supabase (table relationnelle `formations` + métadonnées étendues `site_settings`)
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      // Vérifie si un enregistrement existe déjà avec ce slug pour préserver les clés étrangères
      const { data: existingRow } = await supabase
        .from("formations")
        .select("id")
        .eq("slug", updated.slug)
        .maybeSingle();

      if (existingRow?.id) {
        updated.id = existingRow.id;
      }

      const dbPayload = {
        id: updated.id,
        department_id: updated.department_id,
        domain_id: updated.domain_id,
        title: updated.title,
        slug: updated.slug,
        level: updated.level,
        mention: updated.mention,
        domaine: updated.domaine,
        grade: updated.grade,
        duration_years: updated.duration_years,
        credits_ects: updated.credits_ects,
        short_description: updated.short_description,
        description: updated.description,
        objectives: updated.objectives,
        curriculum: updated.curriculum,
        career_opportunities: updated.career_opportunities,
        admission_requirements: updated.admission_requirements,
        tuition_fees_local: updated.tuition_fees_local,
        tuition_fees_international: updated.tuition_fees_international,
        study_modes: updated.study_modes,
        brochure_url: updated.brochure_url,
        is_featured: updated.is_featured,
        is_active: updated.is_active,
        order_index: updated.order_index,
        meta_title: updated.meta_title,
        meta_description: updated.meta_description,
        updated_at: updated.updated_at,
      };

      await supabase.from("formations").upsert(dbPayload, { onConflict: "id" });

      const extendedMap = await getSiteSettingJson<
        Record<string, Partial<FormationExtendedMeta>>
      >(FORMATIONS_EXTENDED_KEY, {});

      extendedMap[updated.slug] = {
        specialty: updated.specialty,
        duration_label: updated.duration_label,
        program_blocks: updated.program_blocks,
        career_opportunities_list: updated.career_opportunities_list,
        admission_conditions_list: updated.admission_conditions_list,
        tuition_summary: updated.tuition_summary,
        tuition_tiers: updated.tuition_tiers,
        extra_fees: updated.extra_fees,
        international_leader: updated.international_leader,
        accreditations: updated.accreditations,
      };

      await setSiteSettingJson(
        FORMATIONS_EXTENDED_KEY,
        extendedMap,
        "Métadonnées académiques étendues des formations (UE, listes débouchés/admissions, grilles)"
      );
    }
  } catch (err) {
    console.warn("Supabase formation sync warning:", err);
  }

  writeCmsStore(store);
  return updated;
}

export async function deleteFormation(id: string): Promise<boolean> {
  const store = readCmsStore();
  const target = store.formations.find((f) => f.id === id || f.slug === id);
  const initialLen = store.formations.length;
  store.formations = store.formations.filter(
    (f) => f.id !== id && f.slug !== id
  );

  let dbDeleted = false;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      await supabase
        .from("formation_accreditations")
        .delete()
        .eq("formation_id", target?.id || id);
      const { error } = await supabase
        .from("formations")
        .delete()
        .or(`id.eq.${target?.id || id},slug.eq.${target?.slug || id}`);
      if (!error) dbDeleted = true;

      if (target?.slug) {
        const extendedMap = await getSiteSettingJson<
          Record<string, Partial<FormationExtendedMeta>>
        >(FORMATIONS_EXTENDED_KEY, {});
        if (extendedMap[target.slug]) {
          delete extendedMap[target.slug];
          await setSiteSettingJson(FORMATIONS_EXTENDED_KEY, extendedMap);
        }
      }
    }
  } catch {
    // ignore
  }

  if (store.formations.length !== initialLen || dbDeleted) {
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
