import { describe, it, expect } from "vitest";
import {
  CandidatureInputSchema,
  generateReferenceCode,
  submitCandidature,
} from "@/lib/services/candidatures.service";

describe("Candidatures Service & Validation", () => {
  it("generates a valid reference code format", () => {
    const code = generateReferenceCode();
    expect(code).toMatch(/^AFI-2026-[A-Z0-9]{5}$/);
  });

  it("validates valid candidature payload", () => {
    const valid = CandidatureInputSchema.safeParse({
      formation_id: "55555555-5555-5555-5555-555555555501",
      first_name: "Fatou",
      last_name: "Ndiaye",
      email: "fatou.ndiaye@example.com",
      phone: "+221 77 123 45 67",
      country: "Sénégal",
      city: "Dakar",
      birth_date: "2003-04-15",
      birth_place: "Dakar",
      last_diploma: "Baccalauréat S2",
      session_academic_year: "2026-2027",
    });

    expect(valid.success).toBe(true);
  });

  it("fails validation on invalid email or missing fields", () => {
    const invalid = CandidatureInputSchema.safeParse({
      formation_id: "",
      first_name: "F",
      last_name: "",
      email: "not-an-email",
      phone: "",
      birth_date: "",
      birth_place: "",
      last_diploma: "",
    });

    expect(invalid.success).toBe(false);
  });

  it("submits candidature and returns reference code", async () => {
    const res = await submitCandidature({
      formation_id: "55555555-5555-5555-5555-555555555501",
      first_name: "Ousmane",
      last_name: "Sow",
      email: "ousmane.sow@test.com",
      phone: "+221 77 000 00 00",
      country: "Sénégal",
      city: "Thiès",
      birth_date: "2002-08-10",
      birth_place: "Thiès",
      last_diploma: "Licence 2 Informatique",
      session_academic_year: "2026-2027",
    });

    expect(res.success).toBe(true);
    expect(res.reference_code).toMatch(/^AFI-2026-[A-Z0-9]{5}$/);
  });
});
