import { SiteSettings } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";
import { createClient } from "@/lib/supabase/server";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "contact_info")
        .maybeSingle();

      if (!error && data && data.value) {
        return {
          ...readCmsStore().settings,
          ...(data.value as Partial<SiteSettings>),
        };
      }
    }
  } catch {
    // fallback
  }

  const store = readCmsStore();
  return store.settings;
}

export async function updateSiteSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  const store = readCmsStore();
  const updated: SiteSettings = {
    ...store.settings,
    ...patch,
  };
  store.settings = updated;
  writeCmsStore(store);

  try {
    const supabase = await createClient();
    if (supabase) {
      await supabase.from("site_settings").upsert({
        key: "contact_info",
        value: updated,
        updated_at: new Date().toISOString(),
      });
    }
  } catch {
    // silently continue
  }

  return updated;
}
