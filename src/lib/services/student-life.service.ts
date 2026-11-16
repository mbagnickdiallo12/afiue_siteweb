import { StudentLifeItem } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";
import {
  ensureUuid,
  getSiteSettingJson,
  setSiteSettingJson,
} from "@/lib/supabase/admin";

const STUDENT_LIFE_KEY = "student_life_items";

export async function getAllStudentLifeAdmin(): Promise<StudentLifeItem[]> {
  const store = readCmsStore();
  const list = await getSiteSettingJson<StudentLifeItem[]>(
    STUDENT_LIFE_KEY,
    store.student_life
  );
  return [...list].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}

export async function getActiveStudentLifeItems(): Promise<StudentLifeItem[]> {
  const all = await getAllStudentLifeAdmin();
  return all
    .filter((item) => item.is_active !== false)
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
}

export async function saveStudentLifeItem(
  item: Partial<StudentLifeItem> & { id?: string }
): Promise<StudentLifeItem> {
  const store = readCmsStore();
  const currentList = await getAllStudentLifeAdmin();
  const now = new Date().toISOString();

  const targetId = item.id ? ensureUuid(item.id) : undefined;
  const index = currentList.findIndex(
    (s) => s.id === item.id || (targetId && ensureUuid(s.id) === targetId)
  );

  let saved: StudentLifeItem;
  if (index !== -1) {
    saved = {
      ...currentList[index],
      ...item,
      id: currentList[index].id,
      updated_at: now,
    };
    currentList[index] = saved;
  } else {
    saved = {
      id: ensureUuid(item.id),
      title: item.title || "Nouvelle activité étudiante",
      tag: item.tag || "Vie de Campus",
      image_url: item.image_url || "/images/student-life/graduation-arena.jpg",
      order_index: item.order_index ?? currentList.length + 1,
      is_active: item.is_active ?? true,
      created_at: now,
      updated_at: now,
    };
    currentList.push(saved);
  }

  store.student_life = currentList;
  writeCmsStore(store);
  await setSiteSettingJson(
    STUDENT_LIFE_KEY,
    currentList,
    "Activités et événements de la vie étudiante AFI-L'UE"
  );

  return saved;
}

export async function deleteStudentLifeItem(id: string): Promise<boolean> {
  const store = readCmsStore();
  const currentList = await getAllStudentLifeAdmin();
  const targetUuid = ensureUuid(id);
  const filtered = currentList.filter(
    (s) => s.id !== id && ensureUuid(s.id) !== targetUuid
  );

  if (filtered.length !== currentList.length) {
    store.student_life = filtered;
    writeCmsStore(store);
    await setSiteSettingJson(STUDENT_LIFE_KEY, filtered);
    return true;
  }
  return false;
}
