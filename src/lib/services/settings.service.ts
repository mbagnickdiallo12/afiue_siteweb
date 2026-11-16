import { SiteSettings } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";
import {
  getSiteSettingJson,
  setSiteSettingJson,
} from "@/lib/supabase/admin";

const CONTACT_INFO_KEY = "contact_info";

export async function getSiteSettings(): Promise<SiteSettings> {
  const store = readCmsStore();
  const dbValue = await getSiteSettingJson<Partial<SiteSettings>>(
    CONTACT_INFO_KEY,
    store.settings
  );
  return {
    ...store.settings,
    ...dbValue,
  };
}

export async function updateSiteSettings(
  patch: Partial<SiteSettings>
): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...patch,
  };

  const store = readCmsStore();
  store.settings = updated;
  writeCmsStore(store);

  await setSiteSettingJson(
    CONTACT_INFO_KEY,
    updated,
    "Coordonnées officielles, réseaux sociaux et paramètres généraux du site AFI-L'UE"
  );

  return updated;
}
