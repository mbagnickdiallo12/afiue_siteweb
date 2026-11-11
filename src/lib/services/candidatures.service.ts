import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { Candidature, CandidatureStatus } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";

export const CandidatureInputSchema = z.preprocess(
  (raw: any) => {
    if (!raw || typeof raw !== "object") return raw;
    return {
      formation_id: raw.formation_id || raw.specialite_id || raw.filiere_id || raw.specialite || "formation-default",
      first_name: raw.first_name || raw.prenom || "",
      last_name: raw.last_name || raw.nom || "",
      email: raw.email || "",
      phone: raw.phone || raw.telephone || raw.portable || "",
      country: raw.country || raw.nationalite || "Sénégal",
      city: raw.city || raw.ville || "",
      birth_date: raw.birth_date || raw.date_naissance || "",
      birth_place: raw.birth_place || raw.lieu_naissance || "Dakar",
      previous_school: raw.previous_school || raw.etablissement_precedent || raw.parcours?.[0]?.etablissement || "",
      last_diploma: raw.last_diploma || raw.dernier_diplome || raw.parcours?.[0]?.diplome || "Baccalauréat",
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

  // Save to CMS local persistent store
  try {
    const store = readCmsStore();
    if (!store.candidatures) {
      store.candidatures = [];
    }
    const formation = store.formations.find(
      (f) => f.id === validated.data.formation_id || f.slug === validated.data.formation_id || f.title === validated.data.formation_id
    ) || store.formations[0] || null;

    const newRecord: Candidature = {
      id: `cand-${Date.now()}`,
      reference_code,
      first_name: validated.data.first_name,
      last_name: validated.data.last_name,
      email: validated.data.email,
      phone: validated.data.phone,
      country: validated.data.country,
      city: validated.data.city || null,
      birth_date: validated.data.birth_date,
      birth_place: validated.data.birth_place,
      previous_school: validated.data.previous_school || null,
      last_diploma: validated.data.last_diploma,
      session_academic_year: validated.data.session_academic_year,
      status: "soumis",
      formation_id: validated.data.formation_id,
      formation: formation ? {
        id: formation.id,
        title: formation.title,
        slug: formation.slug,
        level: formation.level,
      } as any : null,
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
  } catch (err) {
    console.warn("CMS Store save note:", err);
  }

  // Also try Supabase if connected
  try {
    const supabase = await createClient();
    if (supabase) {
      await supabase.from("candidatures").insert({
        formation_id: validated.data.formation_id,
        reference_code,
        first_name: validated.data.first_name,
        last_name: validated.data.last_name,
        email: validated.data.email,
        phone: validated.data.phone,
        country: validated.data.country,
        city: validated.data.city || null,
        birth_date: validated.data.birth_date,
        birth_place: validated.data.birth_place,
        previous_school: validated.data.previous_school || null,
        last_diploma: validated.data.last_diploma,
        session_academic_year: validated.data.session_academic_year,
        status: "soumis",
      });
    }
  } catch {
    // continue
  }

  return { success: true, reference_code };
}

export async function getCandidatures(): Promise<Candidature[]> {
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("candidatures")
        .select(`*, formation:formations(id, title, slug, level)`)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Candidature[];
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
  const index = store.candidatures.findIndex((c) => c.id === id);
  if (index === -1) return null;

  store.candidatures[index] = {
    ...store.candidatures[index],
    status,
    admin_notes: adminNotes !== undefined ? adminNotes : store.candidatures[index].admin_notes,
    reviewed_at: new Date().toISOString(),
    reviewed_by: "Admin",
    updated_at: new Date().toISOString(),
  };

  writeCmsStore(store);

  try {
    const supabase = await createClient();
    if (supabase) {
      await supabase
        .from("candidatures")
        .update({
          status,
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
    }
  } catch {
    // continue
  }

  return store.candidatures[index];
}

export async function deleteCandidature(id: string): Promise<boolean> {
  const store = readCmsStore();
  const initialLen = store.candidatures.length;
  store.candidatures = store.candidatures.filter((c) => c.id !== id);
  if (store.candidatures.length !== initialLen) {
    writeCmsStore(store);
    return true;
  }
  return false;
}
