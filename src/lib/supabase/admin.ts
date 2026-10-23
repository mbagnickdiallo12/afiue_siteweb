import { createClient as createBaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase d'administration avec privilèges élevés (Service Role).
 * STRICTEMENT RÉSERVÉ au serveur pour les tâches système critiques :
 * - Création d'utilisateurs staff
 * - Scripts de migration WordPress
 * - Tâches planifiées et synchronisation
 *
 * NE JAMAIS IMPORTER CE MODULE DANS UN COMPOSANT CLIENT.
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
