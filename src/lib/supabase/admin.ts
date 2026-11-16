import crypto from "crypto";
import { createClient as createBaseClient } from "@supabase/supabase-js";
import { createClient as createServerSsrClient } from "./server";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Garantit un identifiant UUID v4 valide pour PostgreSQL.
 * Si un identifiant texte legacy (ex: "testi-1", "cand-001") est fourni,
 * il est converti de manière déterministe en UUID valide.
 */
export function ensureUuid(id?: string | null): string {
  if (!id || !id.trim()) {
    return crypto.randomUUID();
  }
  const clean = id.trim();
  if (UUID_REGEX.test(clean)) {
    return clean.toLowerCase();
  }
  const hash = crypto.createHash("md5").update(`afi-uuid:${clean}`).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

/**
 * Client Supabase d'administration avec privilèges élevés (Service Role).
 * STRICTEMENT RÉSERVÉ au serveur pour les opérations d'administration et de synchronisation.
 */
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error(
      "SÉCURITÉ CRITIQUE : Le client Supabase Admin ne peut pas être exécuté côté client navigateur."
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createBaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Retourne le client Supabase serveur avec privilèges Service Role (contourne RLS côté serveur),
 * ou bascule sur le client SSR standard si la clé Service Role n'est pas définie.
 */
export async function getServerSupabase() {
  const admin = createAdminClient();
  if (admin) return admin;
  return await createServerSsrClient();
}

/**
 * Lit une clé JSONB depuis la table `public.site_settings` de Supabase.
 */
export async function getSiteSettingJson<T>(
  key: string,
  fallback: T
): Promise<T> {
  try {
    const supabase = await getServerSupabase();
    if (!supabase) return fallback;
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (!error && data && data.value !== undefined && data.value !== null) {
      return data.value as T;
    }
  } catch {
    // fallback silencieux
  }
  return fallback;
}

/**
 * Enregistre ou met à jour une clé JSONB dans la table `public.site_settings` de Supabase.
 */
export async function setSiteSettingJson<T>(
  key: string,
  value: T,
  description?: string
): Promise<boolean> {
  try {
    const supabase = await getServerSupabase();
    if (!supabase) return false;
    const { error } = await supabase.from("site_settings").upsert(
      {
        key,
        value,
        ...(description ? { description } : {}),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );
    return !error;
  } catch {
    return false;
  }
}

