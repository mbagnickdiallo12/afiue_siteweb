import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { getServerSupabase } from "@/lib/supabase/admin";

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const filesToProcess: File[] = [];
    if (singleFile && singleFile.size > 0) {
      filesToProcess.push(singleFile);
    }
    for (const f of files) {
      if (f && f.size > 0 && !filesToProcess.includes(f)) {
        filesToProcess.push(f);
      }
    }

    if (filesToProcess.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Aucun fichier n'a été fourni pour le téléversement.",
        },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const supabase = await getServerSupabase();

    const results = [];

    for (const file of filesToProcess) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            error: `Le fichier ${file.name} dépasse la taille maximale autorisée de 25 Mo.`,
          },
          { status: 400 }
        );
      }

      const mimeType = file.type || "application/octet-stream";
      const ext = path.extname(file.name).toLowerCase();

      const forbiddenExts = [
        ".exe",
        ".bat",
        ".sh",
        ".php",
        ".js",
        ".mjs",
        ".py",
        ".rb",
        ".vbs",
      ];
      if (forbiddenExts.includes(ext)) {
        return NextResponse.json(
          { success: false, error: "Extension de fichier interdite." },
          { status: 400 }
        );
      }

      const baseCleanName = path
        .basename(file.name, ext)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9_-]/g, "-")
        .slice(0, 40);

      const uniqueSuffix = `${Date.now()}-${crypto
        .randomBytes(4)
        .toString("hex")}`;
      const finalFileName = `${baseCleanName}-${uniqueSuffix}${ext || ".bin"}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      let publicUrl = `/uploads/${finalFileName}`;

      // 1. Téléversement vers Supabase Storage (`media-public`) pour persistance cloud
      if (supabase) {
        try {
          const storagePath = `uploads/${finalFileName}`;
          const { error: upErr } = await supabase.storage
            .from("media-public")
            .upload(storagePath, buffer, {
              contentType: mimeType,
              upsert: true,
            });
          if (!upErr) {
            const { data: pubData } = supabase.storage
              .from("media-public")
              .getPublicUrl(storagePath);
            if (pubData?.publicUrl) {
              publicUrl = pubData.publicUrl;
            }
          }
        } catch {
          // Bascule sur le stockage local si indisponible
        }
      }

      // 2. Sauvegarde locale dans `public/uploads` (si le système de fichiers est accessible en écriture)
      try {
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, finalFileName);
        await fs.writeFile(filePath, buffer);
      } catch {
        // Ignoré sur environnement serverless en lecture seule
      }

      results.push({
        url: publicUrl,
        fileName: finalFileName,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
      });
    }

    const primary = results[0];
    return NextResponse.json({
      success: true,
      url: primary.url,
      fileName: primary.fileName,
      originalName: primary.originalName,
      size: primary.size,
      mimeType: primary.mimeType,
      files: results,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Erreur interne lors du téléversement du fichier.",
      },
      { status: 500 }
    );
  }
}
