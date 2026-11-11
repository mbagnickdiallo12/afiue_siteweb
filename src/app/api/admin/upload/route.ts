import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

// Allowed MIME types: images and documents
const ALLOWED_MIME_TYPES = new Set([
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "application/zip",
]);

// Maximum file size: 25 MB
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
        { success: false, error: "Aucun fichier n'a été fourni pour le téléversement." },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const results = [];

    for (const file of filesToProcess) {
      // Validate size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            error: `Le fichier ${file.name} dépasse la taille maximale autorisée de 25 Mo.`,
          },
          { status: 400 }
        );
      }

      // Check MIME type if provided
      const mimeType = file.type || "application/octet-stream";
      const ext = path.extname(file.name).toLowerCase();

      // Basic security check: forbid executable extensions
      const forbiddenExts = [".exe", ".bat", ".sh", ".php", ".js", ".mjs", ".py", ".rb", ".vbs"];
      if (forbiddenExts.includes(ext)) {
        return NextResponse.json(
          { success: false, error: "Extension de fichier interdite." },
          { status: 400 }
        );
      }

      // Generate a clean, unique file name
      const baseCleanName = path
        .basename(file.name, ext)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9_-]/g, "-")
        .slice(0, 40);

      const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
      const finalFileName = `${baseCleanName}-${uniqueSuffix}${ext || ".bin"}`;
      const filePath = path.join(uploadDir, finalFileName);

      // Convert file buffer and save
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${finalFileName}`;
      results.push({
        url: publicUrl,
        fileName: finalFileName,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
      });
    }

    // If single file was uploaded, also return root fields for direct consumption
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
      { success: false, error: error.message || "Erreur interne lors du téléversement du fichier." },
      { status: 500 }
    );
  }
}

