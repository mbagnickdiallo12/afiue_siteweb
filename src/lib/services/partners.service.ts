import { Partner } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";

export async function getActivePartners(): Promise<Partner[]> {
  const store = readCmsStore();
  return store.partners
    .filter((p) => p.is_active)
    .sort((a, b) => a.order_index - b.order_index);
}

export async function getAllPartnersAdmin(): Promise<Partner[]> {
  const store = readCmsStore();
  return [...store.partners].sort((a, b) => a.order_index - b.order_index);
}

export async function savePartner(
  partner: Partial<Partner> & { id?: string }
): Promise<Partner> {
  const store = readCmsStore();
  const now = new Date().toISOString();

  if (partner.id) {
    const index = store.partners.findIndex((p) => p.id === partner.id);
    if (index !== -1) {
      store.partners[index] = {
        ...store.partners[index],
        ...partner,
        updated_at: now,
      };
      writeCmsStore(store);
      return store.partners[index];
    }
  }

  const newPartner: Partner = {
    id: partner.id || `partner-${Date.now()}`,
    name: partner.name || "Nouveau Partenaire",
    sub_label: partner.sub_label ?? null,
    full_title: partner.full_title ?? null,
    logo_url: partner.logo_url ?? null,
    website_url: partner.website_url ?? null,
    partner_type: partner.partner_type || "academique",
    display_style: partner.display_style || "bold-caps",
    order_index: partner.order_index ?? store.partners.length + 1,
    is_active: partner.is_active ?? true,
    created_at: now,
    updated_at: now,
  };

  store.partners.push(newPartner);
  writeCmsStore(store);
  return newPartner;
}

export async function deletePartner(id: string): Promise<boolean> {
  const store = readCmsStore();
  const initialLen = store.partners.length;
  store.partners = store.partners.filter((p) => p.id !== id);
  if (store.partners.length !== initialLen) {
    writeCmsStore(store);
    return true;
  }
  return false;
}

