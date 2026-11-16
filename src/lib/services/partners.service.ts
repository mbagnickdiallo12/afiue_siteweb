import { Partner } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";
import {
  ensureUuid,
  getServerSupabase,
  getSiteSettingJson,
  setSiteSettingJson,
} from "@/lib/supabase/admin";

const PARTNERS_CATALOG_KEY = "partners_catalog";

export async function getAllPartnersAdmin(): Promise<Partner[]> {
  const store = readCmsStore();
  const list = await getSiteSettingJson<Partner[]>(
    PARTNERS_CATALOG_KEY,
    store.partners
  );
  return [...list].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}

export async function getActivePartners(): Promise<Partner[]> {
  const all = await getAllPartnersAdmin();
  return all
    .filter((p) => p.is_active !== false)
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}

async function syncPartnerTableRow(partner: Partner) {
  try {
    const supabase = await getServerSupabase();
    if (!supabase) return;
    await supabase.from("partners").upsert(
      {
        id: ensureUuid(partner.id),
        name: partner.name,
        logo_url: partner.logo_url || "",
        partner_type: partner.partner_type || "academique",
        website_url: partner.website_url || null,
        order_index: partner.order_index ?? 0,
        is_active: partner.is_active ?? true,
      },
      { onConflict: "id" }
    );
  } catch {
    // ignore
  }
}

export async function savePartner(
  partner: Partial<Partner> & { id?: string }
): Promise<Partner> {
  const store = readCmsStore();
  const currentList = await getAllPartnersAdmin();
  const now = new Date().toISOString();

  const targetId = partner.id ? ensureUuid(partner.id) : undefined;
  const index = currentList.findIndex(
    (p) => p.id === partner.id || (targetId && ensureUuid(p.id) === targetId)
  );

  let saved: Partner;
  if (index !== -1) {
    saved = {
      ...currentList[index],
      ...partner,
      id: ensureUuid(currentList[index].id),
      updated_at: now,
    };
    currentList[index] = saved;
  } else {
    saved = {
      id: ensureUuid(partner.id),
      name: partner.name || "Nouveau Partenaire",
      sub_label: partner.sub_label ?? null,
      full_title: partner.full_title ?? null,
      logo_url: partner.logo_url ?? null,
      website_url: partner.website_url ?? null,
      partner_type: partner.partner_type || "academique",
      display_style: partner.display_style || "bold-caps",
      order_index: partner.order_index ?? currentList.length + 1,
      is_active: partner.is_active ?? true,
      created_at: now,
      updated_at: now,
    };
    currentList.push(saved);
  }

  store.partners = currentList;
  writeCmsStore(store);

  await Promise.all([
    setSiteSettingJson(
      PARTNERS_CATALOG_KEY,
      currentList,
      "Catalogue complet des partenaires académiques et institutionnels"
    ),
    syncPartnerTableRow(saved),
  ]);

  return saved;
}

export async function deletePartner(id: string): Promise<boolean> {
  const store = readCmsStore();
  const currentList = await getAllPartnersAdmin();
  const targetUuid = ensureUuid(id);
  const filtered = currentList.filter(
    (p) => p.id !== id && ensureUuid(p.id) !== targetUuid
  );

  let dbDeleted = false;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { error } = await supabase
        .from("partners")
        .delete()
        .eq("id", targetUuid);
      if (!error) dbDeleted = true;
    }
  } catch {
    // ignore
  }

  if (filtered.length !== currentList.length || dbDeleted) {
    store.partners = filtered;
    writeCmsStore(store);
    await setSiteSettingJson(PARTNERS_CATALOG_KEY, filtered);
    return true;
  }
  return false;
}
