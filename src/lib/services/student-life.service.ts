import { StudentLifeItem } from "@/types/database";
import { readCmsStore, writeCmsStore } from "./cms-store";

export async function getActiveStudentLifeItems(): Promise<StudentLifeItem[]> {
  const store = readCmsStore();
  return store.student_life
    .filter((item) => item.is_active)
    .sort((a, b) => a.order_index - b.order_index);
}

export async function getAllStudentLifeAdmin(): Promise<StudentLifeItem[]> {
  const store = readCmsStore();
  return [...store.student_life].sort((a, b) => a.order_index - b.order_index);
}

export async function saveStudentLifeItem(
  item: Partial<StudentLifeItem> & { id?: string }
): Promise<StudentLifeItem> {
  const store = readCmsStore();
  const now = new Date().toISOString();

  if (item.id) {
    const index = store.student_life.findIndex((s) => s.id === item.id);
    if (index !== -1) {
      store.student_life[index] = {
        ...store.student_life[index],
        ...item,
        updated_at: now,
      };
      writeCmsStore(store);
      return store.student_life[index];
    }
  }

  const newItem: StudentLifeItem = {
    id: item.id || `student-life-${Date.now()}`,
    title: item.title || "Nouvelle activité étudiante",
    tag: item.tag || "Vie de Campus",
    image_url: item.image_url || "/images/student-life/graduation-arena.jpg",
    order_index: item.order_index ?? store.student_life.length + 1,
    is_active: item.is_active ?? true,
    created_at: now,
    updated_at: now,
  };

  store.student_life.push(newItem);
  writeCmsStore(store);
  return newItem;
}

export async function deleteStudentLifeItem(id: string): Promise<boolean> {
  const store = readCmsStore();
  const initialLen = store.student_life.length;
  store.student_life = store.student_life.filter((s) => s.id !== id);
  if (store.student_life.length !== initialLen) {
    writeCmsStore(store);
    return true;
  }
  return false;
}

