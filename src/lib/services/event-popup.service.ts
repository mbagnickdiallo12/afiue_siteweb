import { EventPopupConfig, EventPopupSlide } from "@/types/database";
import {
  readCmsStore,
  writeCmsStore,
  DEFAULT_EVENT_POPUP_CONFIG,
} from "./cms-store";
import {
  getSiteSettingJson,
  setSiteSettingJson,
} from "@/lib/supabase/admin";

const EVENT_POPUP_KEY = "event_popup_config";

export async function getEventPopupConfig(): Promise<EventPopupConfig> {
  try {
    const store = readCmsStore();
    const fallback = store.event_popup || DEFAULT_EVENT_POPUP_CONFIG;
    const dbConfig = await getSiteSettingJson<EventPopupConfig>(
      EVENT_POPUP_KEY,
      fallback
    );
    if (dbConfig && Array.isArray(dbConfig.slides)) {
      return dbConfig;
    }
    return fallback;
  } catch (error) {
    console.warn("Failed to get event popup config, using default:", error);
    return DEFAULT_EVENT_POPUP_CONFIG;
  }
}

export async function updateEventPopupConfig(
  newConfig: Partial<EventPopupConfig>
): Promise<EventPopupConfig> {
  const store = readCmsStore();
  const current = await getEventPopupConfig();

  const updated: EventPopupConfig = {
    ...current,
    ...newConfig,
    slides: newConfig.slides || current.slides,
  };

  store.event_popup = updated;
  writeCmsStore(store);
  await setSiteSettingJson(
    EVENT_POPUP_KEY,
    updated,
    "Configuration et affiches du popup événementiel"
  );
  return updated;
}

export async function addEventPopupSlide(
  slide: Omit<EventPopupSlide, "id">
): Promise<EventPopupSlide> {
  const store = readCmsStore();
  const current = await getEventPopupConfig();

  const newSlide: EventPopupSlide = {
    ...slide,
    id: `popup-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const updated: EventPopupConfig = {
    ...current,
    slides: [...current.slides, newSlide],
  };

  store.event_popup = updated;
  writeCmsStore(store);
  await setSiteSettingJson(EVENT_POPUP_KEY, updated);
  return newSlide;
}

export async function updateEventPopupSlide(
  id: string,
  slideData: Partial<EventPopupSlide>
): Promise<EventPopupSlide | null> {
  const store = readCmsStore();
  const current = await getEventPopupConfig();

  const index = current.slides.findIndex((s) => s.id === id);
  if (index === -1) return null;

  const updatedSlide: EventPopupSlide = {
    ...current.slides[index],
    ...slideData,
    updated_at: new Date().toISOString(),
  };

  const nextSlides = [...current.slides];
  nextSlides[index] = updatedSlide;

  const updated: EventPopupConfig = {
    ...current,
    slides: nextSlides,
  };

  store.event_popup = updated;
  writeCmsStore(store);
  await setSiteSettingJson(EVENT_POPUP_KEY, updated);
  return updatedSlide;
}

export async function deleteEventPopupSlide(id: string): Promise<boolean> {
  const store = readCmsStore();
  const current = await getEventPopupConfig();

  const initialLen = current.slides.length;
  const nextSlides = current.slides.filter((s) => s.id !== id);

  if (nextSlides.length !== initialLen) {
    const updated: EventPopupConfig = {
      ...current,
      slides: nextSlides,
    };
    store.event_popup = updated;
    writeCmsStore(store);
    await setSiteSettingJson(EVENT_POPUP_KEY, updated);
    return true;
  }
  return false;
}
