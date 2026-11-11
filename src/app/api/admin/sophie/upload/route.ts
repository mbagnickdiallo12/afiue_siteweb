import { NextResponse } from "next/server";
import { addKnowledgeItem } from "@/lib/services/sophie.service";

export const dynamic = "force-dynamic";

const MAX_BYTES = 15 * 1024 * 1024;

/** Import d'un document (PDF, TXT, MD, CSV) : le texte est extrait puis mémorisé par Sophie. */
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Fichier trop volumineux (15 Mo max)." }, { status: 400 });
    }

    const name = file.name;
    const ext = name.split(".").pop()?.toLowerCase() || "";
    let text = "";

    if (ext === "pdf") {
      const { extractText, getDocumentProxy } = await import("unpdf");
      const pdf = await getDocumentProxy(new Uint8Array(await file.arrayBuffer()));
      const result = await extractText(pdf, { mergePages: true });
      text = Array.isArray(result.text) ? result.text.join("\n") : result.text;
    } else if (["txt", "md", "csv", "json"].includes(ext)) {
      text = await file.text();
    } else {
      return NextResponse.json(
        { error: "Format non pris en charge (PDF, TXT, MD ou CSV)." },
        { status: 400 },
      );
    }

    text = text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
    if (text.length < 20) {
      return NextResponse.json(
        { error: "Aucun texte lisible dans ce document (PDF scanné ?)." },
        { status: 400 },
      );
    }

    const title = String(form.get("title") || "").trim() || name.replace(/\.[^.]+$/, "");
    const item = addKnowledgeItem({
      title,
      content: text,
      category: "document",
      source: "document",
      file_name: name,
    });
    return NextResponse.json({ item });
  } catch (error) {
    console.error("API POST /api/admin/sophie/upload error:", error);
    return NextResponse.json({ error: "Lecture du document impossible." }, { status: 500 });
  }
}

