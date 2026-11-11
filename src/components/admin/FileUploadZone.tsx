"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import {
  UploadCloud,
  FileText,
  FileCheck2,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Link as LinkIcon,
  AlertCircle,
  ImageIcon,
} from "lucide-react";

interface FileUploadZoneProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  accept?: "image" | "document" | "all";
  helpText?: string;
  placeholder?: string;
  className?: string;
}

export function FileUploadZone({
  value,
  onChange,
  label = "Fichier / Image",
  accept = "image",
  helpText,
  placeholder = "Glissez-déposez un fichier ou cliquez pour parcourir",
  className = "",
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptMime =
    accept === "image"
      ? "image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
      : accept === "document"
      ? "application/pdf,.doc,.docx,.xlsx"
      : "image/*,application/pdf,.doc,.docx,.xlsx";

  const isImageFile =
    value &&
    (value.match(/\.(jpeg|jpg|png|webp|gif|svg|avif)($|\?)/i) ||
      value.startsWith("data:image/") ||
      accept === "image");

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Échec du téléversement");
      }

      onChange(data.url);
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de téléversement");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // reset input so same file can be re-uploaded if replaced
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const copyToClipboard = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setManualMode(!manualMode)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-afi-navy transition-colors cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{manualMode ? "Mode Fichier / Glisser-déposer" : "Saisir une URL directe"}</span>
        </button>
      </div>

      {manualMode ? (
        /* Manual URL mode */
        <div className="flex gap-2">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... ou /images/..."
            className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
          />
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 transition-colors"
              title="Tester le lien"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      ) : value ? (
        /* Preview Card */
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {isImageFile ? (
              <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <Image
                  src={value}
                  alt="Aperçu"
                  fill
                  unoptimized
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 truncate">
                  {value.split("/").pop() || "Fichier sélectionné"}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 shrink-0">
                  <FileCheck2 className="w-3 h-3 text-emerald-600" />
                  Prêt
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono truncate max-w-xs mt-0.5">
                {value}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={copyToClipboard}
              title="Copier le lien"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              title="Ouvrir dans un nouvel onglet"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Remplacer par un autre fichier"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Changer</span>
            </button>

            <button
              type="button"
              onClick={() => onChange("")}
              title="Supprimer ce fichier"
              className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-afi-red bg-slate-50 scale-[1.01]"
              : "border-slate-200 hover:border-afi-navy/40 hover:bg-slate-50/50 bg-slate-50/20"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600">
              {isUploading ? (
                <RefreshCw className="w-5 h-5 animate-spin text-afi-navy" />
              ) : accept === "image" ? (
                <ImageIcon className="w-5 h-5 text-afi-navy" />
              ) : (
                <UploadCloud className="w-5 h-5 text-afi-navy" />
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800">
                {isUploading ? "Téléversement en cours..." : placeholder}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {helpText ||
                  (accept === "image"
                    ? "PNG, JPG, WebP, SVG jusqu'à 25 Mo"
                    : "PDF, Word, Excel ou document jusqu'à 25 Mo")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptMime}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

