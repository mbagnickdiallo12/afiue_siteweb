import { z } from "zod";
import {
  ensureUuid,
  getServerSupabase,
  getSiteSettingJson,
  setSiteSettingJson,
} from "@/lib/supabase/admin";
import { Candidature, CandidatureStatus } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";

const CANDIDATURES_DOSSIERS_KEY = "candidatures_dossiers";

export const CandidatureInputSchema = z.preprocess(
  (raw: any) => {
    if (!raw || typeof raw !== "object") return raw;
    return {
      formation_id:
        raw.formation_id ||
        raw.specialite_id ||
        raw.filiere_id ||
        raw.specialite ||
        "formation-default",
      first_name: raw.first_name || raw.prenom || "",
      last_name: raw.last_name || raw.nom || "",
      email: raw.email || "",
      phone: raw.phone || raw.telephone || raw.portable || "",
      country: raw.country || raw.nationalite || "Sénégal",
      city: raw.city || raw.ville || "",
      birth_date: raw.birth_date || raw.date_naissance || "",
      birth_place: raw.birth_place || raw.lieu_naissance || "Dakar",
      previous_school:
        raw.previous_school ||
        raw.etablissement_precedent ||
        raw.parcours?.[0]?.etablissement ||
        "",
      last_diploma:
        raw.last_diploma ||
        raw.dernier_diplome ||
        raw.parcours?.[0]?.diplome ||
        "Baccalauréat",
      session_academic_year: raw.session_academic_year || "2026-2027",
      dossier_data: raw.dossier_data || raw,
    };
  },
  z.object({
    formation_id: z.string().min(1, "Veuillez sélectionner une formation"),
    first_name: z.string().min(1, "Le prénom est obligatoire"),
    last_name: z.string().min(1, "Le nom est obligatoire"),
    email: z.string().email("Adresse email valide requise"),
    phone: z.string().min(6, "Numéro de téléphone requis"),
    country: z.string().default("Sénégal"),
    city: z.string().optional(),
    birth_date: z.string().min(1, "Date de naissance requise"),
    birth_place: z.string().min(1, "Lieu de naissance requis"),
    previous_school: z.string().optional(),
    last_diploma: z.string().default("Baccalauréat"),
    session_academic_year: z.string().default("2026-2027"),
    dossier_data: z.any().optional(),
  })
);

export type CandidatureInput = z.infer<typeof CandidatureInputSchema>;

export function generateReferenceCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AFI-2026-${randomPart}`;
}

function normalizeIsoDate(rawDate?: string): string {
  if (!rawDate) return "2002-01-01";
  const trimmed = rawDate.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const dmy = trimmed.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
  if (dmy) {
    return `${dmy[3]}-${dmy[2]}-${dmy[1]}`;
  }
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return "2002-01-01";
}

export async function submitCandidature(
  input: CandidatureInput
): Promise<{ success: boolean; reference_code: string; error?: string }> {
  const validated = CandidatureInputSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      reference_code: "",
      error: validated.error.issues.map((e) => e.message).join(", "),
    };
  }

  const reference_code = generateReferenceCode();
  const recordId = ensureUuid();
  const normalizedBirthDate = normalizeIsoDate(validated.data.birth_date);

  const store = readCmsStore();
  if (!store.candidatures) {
    store.candidatures = [];
  }

  const matchedFormation =
    store.formations.find(
      (f) =>
        f.id === validated.data.formation_id ||
        f.slug === validated.data.formation_id ||
        f.title.toLowerCase() === validated.data.formation_id.toLowerCase()
    ) ||
    store.formations[0] ||
    null;

  const newRecord: Candidature = {
    id: recordId,
    reference_code,
    first_name: validated.data.first_name,
    last_name: validated.data.last_name,
    email: validated.data.email,
    phone: validated.data.phone,
    country: validated.data.country,
    city: validated.data.city || null,
    birth_date: normalizedBirthDate,
    birth_place: validated.data.birth_place,
    previous_school: validated.data.previous_school || null,
    last_diploma: validated.data.last_diploma,
    session_academic_year: validated.data.session_academic_year,
    status: "soumis",
    formation_id: matchedFormation?.id || validated.data.formation_id,
    formation: matchedFormation
      ? ({
          id: matchedFormation.id,
          title: matchedFormation.title,
          slug: matchedFormation.slug,
          level: matchedFormation.level,
        } as any)
      : null,
    admin_notes: null,
    reviewed_by: null,
    reviewed_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    candidat_id: null,
    dossier_data: (validated.data as any).dossier_data || null,
  };

  store.candidatures.unshift(newRecord);
  writeCmsStore(store);

  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      let dbFormationId = matchedFormation?.id
        ? ensureUuid(matchedFormation.id)
        : null;

      if (matchedFormation?.slug) {
        const { data: dbForm } = await supabase
          .from("formations")
          .select("id")
          .eq("slug", matchedFormation.slug)
          .maybeSingle();
        if (dbForm?.id) {
          dbFormationId = dbForm.id;
        }
      }

      if (!dbFormationId) {
        const { data: firstForm } = await supabase
          .from("formations")
          .select("id")
          .limit(1)
          .maybeSingle();
        if (firstForm?.id) {
          dbFormationId = firstForm.id;
        }
      }

      if (dbFormationId) {
        await supabase.from("candidatures").upsert(
          {
            id: recordId,
            formation_id: dbFormationId,
            reference_code,
            first_name: validated.data.first_name,
            last_name: validated.data.last_name,
            email: validated.data.email,
            phone: validated.data.phone,
            country: validated.data.country,
            city: validated.data.city || null,
            birth_date: normalizedBirthDate,
            birth_place: validated.data.birth_place,
            previous_school: validated.data.previous_school || null,
            last_diploma: validated.data.last_diploma,
            session_academic_year: validated.data.session_academic_year,
            status: "soumis",
          },
          { onConflict: "id" }
        );
      }

      if (newRecord.dossier_data) {
        const dossiersMap = await getSiteSettingJson<Record<string, any>>(
          CANDIDATURES_DOSSIERS_KEY,
          {}
        );
        dossiersMap[recordId] = newRecord.dossier_data;
        dossiersMap[reference_code] = newRecord.dossier_data;
        await setSiteSettingJson(
          CANDIDATURES_DOSSIERS_KEY,
          dossiersMap,
          "Données détaillées des dossiers de candidature"
        );
      }
    }
  } catch (err) {
    console.warn("Supabase candidature insert warning:", err);
  }

  return { success: true, reference_code };
}

export async function getCandidatures(): Promise<Candidature[]> {
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const [{ data, error }, dossiersMap] = await Promise.all([
        supabase
          .from("candidatures")
          .select(`*, formation:formations(id, title, slug, level)`)
          .order("created_at", { ascending: false }),
        getSiteSettingJson<Record<string, any>>(CANDIDATURES_DOSSIERS_KEY, {}),
      ]);

      if (!error && data && data.length > 0) {
        return (data as Candidature[]).map((c) => ({
          ...c,
          dossier_data:
            c.dossier_data ||
            dossiersMap[c.id] ||
            dossiersMap[c.reference_code] ||
            null,
        }));
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  return store.candidatures || [];
}

export async function updateCandidatureStatus(
  id: string,
  status: CandidatureStatus,
  adminNotes?: string
): Promise<Candidature | null> {
  const store = readCmsStore();
  const targetUuid = ensureUuid(id);
  const index = store.candidatures.findIndex(
    (c) => c.id === id || ensureUuid(c.id) === targetUuid
  );

  const nowIso = new Date().toISOString();

  if (index !== -1) {
    store.candidatures[index] = {
      ...store.candidatures[index],
      status,
      admin_notes:
        adminNotes !== undefined
          ? adminNotes
          : store.candidatures[index].admin_notes,
      reviewed_at: nowIso,
      reviewed_by: "Admin",
      updated_at: nowIso,
    };
    writeCmsStore(store);
  }

  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("candidatures")
        .update({
          status,
          ...(adminNotes !== undefined ? { admin_notes: adminNotes } : {}),
          reviewed_at: nowIso,
          updated_at: nowIso,
        })
        .eq("id", targetUuid)
        .select(`*, formation:formations(id, title, slug, level)`)
        .maybeSingle();

      if (data) {
        return data as Candidature;
      }
    }
  } catch {
    // continue
  }

  return index !== -1 ? store.candidatures[index] : null;
}

export async function deleteCandidature(id: string): Promise<boolean> {
  const store = readCmsStore();
  const targetUuid = ensureUuid(id);
  const target = store.candidatures.find(
    (c) => c.id === id || ensureUuid(c.id) === targetUuid
  );
  const initialLen = store.candidatures.length;
  store.candidatures = store.candidatures.filter(
    (c) => c.id !== id && ensureUuid(c.id) !== targetUuid
  );

  let dbDeleted = false;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { error } = await supabase
        .from("candidatures")
        .delete()
        .eq("id", targetUuid);
      if (!error) dbDeleted = true;

      const dossiersMap = await getSiteSettingJson<Record<string, any>>(
        CANDIDATURES_DOSSIERS_KEY,
        {}
      );
      let modified = false;
      if (dossiersMap[id]) {
        delete dossiersMap[id];
        modified = true;
      }
      if (dossiersMap[targetUuid]) {
        delete dossiersMap[targetUuid];
        modified = true;
      }
      if (target?.reference_code && dossiersMap[target.reference_code]) {
        delete dossiersMap[target.reference_code];
        modified = true;
      }
      if (modified) {
        await setSiteSettingJson(CANDIDATURES_DOSSIERS_KEY, dossiersMap);
      }
    }
  } catch {
    // ignore
  }

  if (store.candidatures.length !== initialLen || dbDeleted) {
    writeCmsStore(store);
    return true;
  }
  return false;
}
