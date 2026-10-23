import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase pour les composants côté navigateur (Client Components).
 * Utilise uniquement les clés publiques NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * Ne contient JAMAIS de clé secrète ou service_role.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Mode dégradé sécurisé en développement si les variables ne sont pas encore renseignées
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
