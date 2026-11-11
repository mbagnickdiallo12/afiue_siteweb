import { EventPopupConfig, EventPopupSlide } from "@/types/database";
import { readCmsStore, writeCmsStore, DEFAULT_EVENT_POPUP_CONFIG } from "./cms-store";

export async function getEventPopupConfig(): Promise<EventPopupConfig> {
  try {
    const store = readCmsStore();
    return store.event_popup || DEFAULT_EVENT_POPUP_CONFIG;
  } catch (error) {
    console.warn("Failed to get event popup config, using default:", error);
    return DEFAULT_EVENT_POPUP_CONFIG;
  }
}

export async function updateEventPopupConfig(
  newConfig: Partial<EventPopupConfig>
): Promise<EventPopupConfig> {
  const store = readCmsStore();
  const current = store.event_popup || DEFAULT_EVENT_POPUP_CONFIG;

  const updated: EventPopupConfig = {
    ...current,
    ...newConfig,
    slides: newConfig.slides || current.slides,
  };

  store.event_popup = updated;
  writeCmsStore(store);
  return updated;
}

export async function addEventPopupSlide(
  slide: Omit<EventPopupSlide, "id">
): Promise<EventPopupSlide> {
  const store = readCmsStore();
  const current = store.event_popup || DEFAULT_EVENT_POPUP_CONFIG;

  const newSlide: EventPopupSlide = {
    ...slide,
    id: `popup-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const updatedSlides = [...current.slides, newSlide];
  store.event_popup = {
    ...current,
    slides: updatedSlides,
  };

  writeCmsStore(store);
  return newSlide;
}

export async function updateEventPopupSlide(
  id: string,
  slideData: Partial<EventPopupSlide>
): Promise<EventPopupSlide | null> {
  const store = readCmsStore();
  const current = store.event_popup || DEFAULT_EVENT_POPUP_CONFIG;

  const index = current.slides.findIndex((s) => s.id === id);
  if (index === -1) return null;

  const updatedSlide: EventPopupSlide = {
    ...current.slides[index],
    ...slideData,
    updated_at: new Date().toISOString(),
  };

  current.slides[index] = updatedSlide;
  store.event_popup = { ...current };
  writeCmsStore(store);
  return updatedSlide;
}

export async function deleteEventPopupSlide(id: string): Promise<boolean> {
  const store = readCmsStore();
  const current = store.event_popup || DEFAULT_EVENT_POPUP_CONFIG;

  const initialLen = current.slides.length;
  current.slides = current.slides.filter((s) => s.id !== id);

  if (current.slides.length !== initialLen) {
    store.event_popup = { ...current };
    writeCmsStore(store);
    return true;
  }
  return false;
}

