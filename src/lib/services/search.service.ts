import { getFormations } from "./formations.service";
import { getDomains } from "./domains.service";

export interface SearchResultItem {
  id: string;
  type: "formation" | "domain";
  title: string;
  subtitle: string;
  slug: string;
  url: string;
  badge?: string;
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export async function instantSearch(
  query: string,
  limit: number = 8
): Promise<SearchResultItem[]> {
  const q = normalizeText(query);
  if (!q || q.length < 2) return [];

  const [formations, domains] = await Promise.all([
    getFormations(),
    getDomains(),
  ]);

  const results: SearchResultItem[] = [];

  // Search in formations
  for (const f of formations) {
    const titleNorm = normalizeText(f.title);
    const descNorm = normalizeText(f.short_description || "");
    const mentionNorm = normalizeText(f.mention || "");
    const domainNorm = normalizeText(f.domaine || "");

    const isMatch =
      titleNorm.includes(q) ||
      descNorm.includes(q) ||
      mentionNorm.includes(q) ||
      domainNorm.includes(q);

    if (isMatch) {
      results.push({
        id: f.id,
        type: "formation",
        title: f.title,
        subtitle: `${f.level.toUpperCase()} • ${f.duration_years} ans • ${
          f.domaine || "AFI-L'UE"
        }`,
        slug: f.slug,
        url: `/formations/${f.slug}`,
        badge: f.level.toUpperCase(),
      });
    }
  }

  // Search in domains
  for (const d of domains) {
    const nameNorm = normalizeText(d.name);
    const descNorm = normalizeText(d.short_description || "");

    if (nameNorm.includes(q) || descNorm.includes(q)) {
      results.push({
        id: d.id,
        type: "domain",
        title: d.name,
        subtitle: `Domaine d'enseignement • ${d.code}`,
        slug: d.slug,
        url: `/domaines/${d.slug}`,
        badge: d.code,
      });
    }
  }

  return results.slice(0, limit);
}
