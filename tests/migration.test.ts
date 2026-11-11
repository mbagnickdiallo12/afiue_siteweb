import { describe, it, expect } from "vitest";
import {
  cleanDiviShortcodes,
  decodeHtmlEntities,
} from "../scripts/migrate-wp";

describe("WordPress Migration Tools", () => {
  it("cleans Divi shortcodes completely from content", () => {
    const raw =
      '[et_pb_section fb_built="1"][et_pb_row][et_pb_column type="4_4"]<p>Licence en Audit et Contrôle.</p>[/et_pb_column][/et_pb_row][/et_pb_section]';
    const cleaned = cleanDiviShortcodes(raw);
    expect(cleaned).toBe("<p>Licence en Audit et Contrôle.</p>");
    expect(cleaned).not.toContain("et_pb_");
  });

  it("decodes HTML entities properly", () => {
    const raw = "AFI-L&#8217;UE &#8211; L&#8217;Universit&eacute; de l&#8217;Entreprise";
    const decoded = decodeHtmlEntities(raw);
    expect(decoded).toBe("AFI-L'UE – L'Université de l'Entreprise");
  });
});
