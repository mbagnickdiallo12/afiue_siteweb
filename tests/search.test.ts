import { describe, it, expect } from "vitest";
import { normalizeText, instantSearch } from "@/lib/services/search.service";

describe("Search Service", () => {
  it("normalizes accents and lowercases correctly", () => {
    expect(normalizeText("Économie & Gestion")).toBe("economie & gestion");
    expect(normalizeText("Ingénierie Logicielle")).toBe("ingenierie logicielle");
    expect(normalizeText("  Sénégal  ")).toBe("senegal");
  });

  it("returns formations and domains for matching query", async () => {
    const results = await instantSearch("intelligence");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.type === "formation")).toBe(true);
  });

  it("handles accent-agnostic searches", async () => {
    const results = await instantSearch("genie");
    expect(results.some((r) => r.title.includes("Génie Logiciel"))).toBe(true);
  });

  it("returns empty array for very short queries", async () => {
    const results = await instantSearch("a");
    expect(results).toEqual([]);
  });
});
