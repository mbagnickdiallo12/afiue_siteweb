import { MetadataRoute } from "next";
import { getFormations } from "@/lib/services/formations.service";
import { getDomains } from "@/lib/services/domains.service";
import { getArticles } from "@/lib/services/articles.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://afi-ue.sn";

  const [formations, domains, articles] = await Promise.all([
    getFormations(),
    getDomains(),
    getArticles(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/formations",
    "/domaines",
    "/admissions",
    "/executive-education",
    "/universite",
    "/universite/vision-et-valeurs",
    "/universite/accreditations",
    "/universite/campus",
    "/actualites",
    "/contact",
    "/candidater",
    "/mentions-legales",
    "/politique-confidentialite",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const formationRoutes: MetadataRoute.Sitemap = formations.map((f) => ({
    url: `${baseUrl}/formations/${f.slug}`,
    lastModified: new Date(f.updated_at || f.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const domainRoutes: MetadataRoute.Sitemap = domains.map((d) => ({
    url: `${baseUrl}/domaines/${d.slug}`,
    lastModified: new Date(d.updated_at || d.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/actualites/${a.slug}`,
    lastModified: new Date(a.updated_at || a.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...formationRoutes,
    ...domainRoutes,
    ...articleRoutes,
  ];
}
