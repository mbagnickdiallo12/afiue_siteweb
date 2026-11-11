"use client";

import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Images,
  Info,
  Eye,
  Edit3,
  Columns,
  UploadCloud,
  X,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { ArticleContentRenderer } from "@/components/blog/ArticleContentRenderer";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  minHeight?: string;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  label = "Contenu de l'article",
  minHeight = "min-h-[350px]",
  placeholder = "Rédigez votre article ici...",
}: RichTextEditorProps) {
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("edit");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  // Link state
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // Single Image state
  const [singleImageUrl, setSingleImageUrl] = useState("");
  const [singleImageCaption, setSingleImageCaption] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<{ url: string; caption: string }[]>([]);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Word count & read time
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const chars = value.length;
  const readTimeMin = Math.max(1, Math.ceil(words / 200));

  // Helper to insert formatted text at cursor
  const insertText = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || defaultText;

    const replacement = `${before}${selected}${after}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 50);
  };

  // Insert line prefix (like ## or - or >)
  const insertLinePrefix = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);

    if (selected) {
      const lines = selected.split("\n");
      const prefixed = lines.map((l) => `${prefix}${l}`).join("\n");
      const newValue = value.substring(0, start) + prefixed + value.substring(end);
      onChange(newValue);
    } else {
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart);
      onChange(newValue);
    }

    setTimeout(() => {
      textarea.focus();
    }, 50);
  };

  // Image Upload handler for Modal
  const handleSingleImageUpload = async (file: File) => {
    setIsUploadingImage(true);
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
      setSingleImageUrl(data.url);
      if (!singleImageCaption) {
        setSingleImageCaption(file.name.replace(/\.[^/.]+$/, ""));
      }
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleConfirmSingleImage = () => {
    if (!singleImageUrl) return;
    const caption = singleImageCaption.trim();
    const markdown = `\n\n![${caption}](${singleImageUrl})\n\n`;
    insertText(markdown, "", "");
    setIsImageModalOpen(false);
    setSingleImageUrl("");
    setSingleImageCaption("");
  };

  // Gallery multi-upload
  const handleGalleryFilesUpload = async (files: FileList) => {
    setIsUploadingGallery(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Échec du téléversement");
      }

      const uploadedFiles = data.files || [{ url: data.url, originalName: data.originalName }];
      const newItems = uploadedFiles.map((f: any) => ({
        url: f.url,
        caption: (f.originalName || "").replace(/\.[^/.]+$/, ""),
      }));

      setGalleryItems((prev) => [...prev, ...newItems]);
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleConfirmGallery = () => {
    if (galleryItems.length === 0) return;
    const blockLines = [
      "\n:::gallery",
      ...galleryItems.map((item) => `${item.url} | ${item.caption || ""}`),
      ":::\n\n",
    ];
    insertText(blockLines.join("\n"), "", "");
    setIsGalleryModalOpen(false);
    setGalleryItems([]);
  };

  const handleConfirmLink = () => {
    if (!linkUrl) return;
    const label = linkText.trim() || linkUrl;
    insertText(`[${label}](`, ")", linkUrl);
    setIsLinkModalOpen(false);
    setLinkText("");
    setLinkUrl("");
  };

  const insertCallout = (type: "info" | "warning" | "tip") => {
    const title =
      type === "info"
        ? "Information importante"
        : type === "warning"
          ? "Attention / Rappel"
          : "Bon à savoir";
    const block = `\n:::callout-${type}\n**${title}** : Renseignez ici les détails complémentaires utiles pour les candidats.\n:::\n\n`;
    insertText(block, "", "");
  };

  return (
    <div className="space-y-2">
      {/* Label and View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-bold text-slate-800">
          {label} *
        </label>

        <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === "edit"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-900"
              }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Édition</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === "preview"
              ? "bg-afi-navy text-white shadow-xs"
              : "text-slate-500 hover:text-slate-900"
              }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Aperçu Réel</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === "split"
              ? "bg-afi-navy text-white shadow-xs"
              : "text-slate-500 hover:text-slate-900"
              }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Partagé</span>
          </button>
        </div>
      </div>

      {/* Editor Frame */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-afi-navy/20 focus-within:border-afi-navy transition-all">
        {/* Toolbar */}
        {(viewMode === "edit" || viewMode === "split") && (
          <div className="p-2 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center gap-1 shrink-0">
            {/* Headers */}
            <button
              type="button"
              onClick={() => insertLinePrefix("## ")}
              title="Titre H2"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors font-bold text-xs"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertLinePrefix("### ")}
              title="Sous-titre H3"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors font-bold text-xs"
            >
              <Heading3 className="w-4 h-4" />
            </button>

            <span className="w-px h-4 bg-slate-200 mx-1" />

            {/* Inlines */}
            <button
              type="button"
              onClick={() => insertText("**", "**", "texte en gras")}
              title="Gras (Ctrl+B)"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors font-bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText("*", "*", "texte en italique")}
              title="Italique (Ctrl+I)"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors font-bold"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText("<u>", "</u>", "texte souligné")}
              title="Souligné"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors font-bold"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText("~~", "~~", "texte barré")}
              title="Barré"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors font-bold"
            >
              <Strikethrough className="w-4 h-4" />
            </button>

            <span className="w-px h-4 bg-slate-200 mx-1" />

            {/* Lists & Quotes */}
            <button
              type="button"
              onClick={() => insertLinePrefix("- ")}
              title="Liste à puces"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertLinePrefix("1. ")}
              title="Liste numérotée"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertLinePrefix("> ")}
              title="Citation"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText("\n\n---\n\n")}
              title="Ligne de séparation"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-px h-4 bg-slate-200 mx-1" />

            {/* Link */}
            <button
              type="button"
              onClick={() => {
                const textarea = textareaRef.current;
                const sel = textarea
                  ? value.substring(textarea.selectionStart, textarea.selectionEnd)
                  : "";
                setLinkText(sel);
                setLinkUrl("");
                setIsLinkModalOpen(true);
              }}
              title="Insérer un lien"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
            </button>

            {/* Single Image Modal */}
            <button
              type="button"
              onClick={() => {
                setSingleImageUrl("");
                setSingleImageCaption("");
                setIsImageModalOpen(true);
              }}
              title="Insérer une image avec légende"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors text-xs font-bold"
            >
              <ImageIcon className="w-4 h-4 text-afi-navy" />
              <span>Image</span>
            </button>

            {/* Gallery Modal */}
            <button
              type="button"
              onClick={() => {
                setGalleryItems([]);
                setIsGalleryModalOpen(true);
              }}
              title="Insérer une galerie photos"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition-colors text-xs font-bold"
            >
              <Images className="w-4 h-4" />
              <span>Galerie</span>
            </button>

            {/* Callouts */}
            <button
              type="button"
              onClick={() => insertCallout("info")}
              title="Encadré d'information"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Info className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        )}

        {/* Work Area */}
        <div
          className={`grid ${viewMode === "split" ? "grid-cols-1 md:grid-cols-2 divide-x divide-slate-100" : "grid-cols-1"
            }`}
        >
          {/* Textarea Editor */}
          {(viewMode === "edit" || viewMode === "split") && (
            <textarea
              ref={textareaRef}
              rows={12}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`w-full p-4 text-xs sm:text-sm text-slate-800 font-mono leading-relaxed focus:outline-none resize-y bg-transparent ${minHeight}`}
            />
          )}

          {/* Real-time Preview */}
          {(viewMode === "preview" || viewMode === "split") && (
            <div
              className={`p-6 bg-slate-50/50 overflow-y-auto max-h-[600px] custom-scrollbar ${minHeight}`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>Rendu public de l&apos;article</span>
                <span className="text-emerald-600 font-bold">Synchronisé en direct</span>
              </div>
              {value.trim() ? (
                <ArticleContentRenderer content={value} />
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Le contenu rédigé s&apos;affichera ici en temps réel...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Status Bar */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-4">
            <span>
              <strong>{words}</strong> mots
            </span>
            <span>
              <strong>{chars}</strong> caractères
            </span>
            <span className="hidden sm:inline">
              ~<strong>{readTimeMin}</strong> min de lecture
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
            <HelpCircle className="w-3 h-3" />
            <span>Markdown & Balises Riches supportés</span>
          </div>
        </div>
      </div>

      {/* MODAL 1: INSERT LINK */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Insérer un lien hypertexte
              </h4>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Texte à afficher
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="ex: Portail des Admissions"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Adresse URL *
                </label>
                <input
                  type="url"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://... ou /candidater"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmLink}
                disabled={!linkUrl}
                className="px-4 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800 disabled:opacity-50"
              >
                Insérer le lien
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INSERT SINGLE IMAGE */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-afi-navy" />
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  Insérer une Image dans l&apos;article
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <input
                  type="file"
                  id="single-image-file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleSingleImageUpload(f);
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="single-image-file"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <UploadCloud className="w-8 h-8 text-afi-navy" />
                  <span className="font-bold text-slate-800">
                    {isUploadingImage
                      ? "Téléversement en cours..."
                      : "Cliquez pour téléverser une image depuis votre ordinateur"}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    PNG, JPG, WebP jusqu&apos;à 25 Mo
                  </span>
                </label>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  OU URL de l&apos;image
                </label>
                <input
                  type="text"
                  value={singleImageUrl}
                  onChange={(e) => setSingleImageUrl(e.target.value)}
                  placeholder="/uploads/... ou https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                />
              </div>

              {singleImageUrl && (
                <div className="p-3 bg-slate-100 rounded-xl flex items-center gap-3">
                  <div className="relative w-14 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                    <img
                      src={singleImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      Image prête
                    </span>
                    <span className="text-xs font-mono text-slate-600 truncate block">
                      {singleImageUrl}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Légende / Texte sous l&apos;image
                </label>
                <input
                  type="text"
                  value={singleImageCaption}
                  onChange={(e) => setSingleImageCaption(e.target.value)}
                  placeholder="ex: Les étudiants en salle d'informatique lors du hackathon 2026"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmSingleImage}
                disabled={!singleImageUrl}
                className="px-5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800 disabled:opacity-50"
              >
                Insérer l&apos;image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INSERT GALLERY OF IMAGES */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Images className="w-5 h-5 text-afi-navy" />
                <div>
                  <h4 className="font-heading font-black text-sm text-slate-900">
                    Créer une Galerie Photos Responsive
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Sélectionnez plusieurs photos pour générer une grille élégante dans l&apos;article.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Upload Zone */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <input
                type="file"
                id="gallery-files"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleGalleryFilesUpload(e.target.files);
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor="gallery-files"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <UploadCloud className="w-10 h-10 text-afi-navy" />
                <span className="font-bold text-xs text-slate-800">
                  {isUploadingGallery
                    ? "Téléversement des photos..."
                    : "Cliquez pour sélectionner plusieurs photos ou glissez-déposez"}
                </span>
                <span className="text-[11px] text-slate-400">
                  Sélection multiple autorisée (PNG, JPG, WebP)
                </span>
              </label>
            </div>

            {/* List of uploaded photos */}
            {galleryItems.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Photos sélectionnées ({galleryItems.length})</span>
                  <button
                    type="button"
                    onClick={() => setGalleryItems([])}
                    className="text-red-600 hover:underline text-[11px]"
                  >
                    Tout vider
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar p-1">
                  {galleryItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3"
                    >
                      <div className="w-14 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0 relative">
                        <img
                          src={item.url}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <input
                          type="text"
                          value={item.caption}
                          onChange={(e) => {
                            const next = [...galleryItems];
                            next[idx].caption = e.target.value;
                            setGalleryItems(next);
                          }}
                          placeholder="Légende facultative..."
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryItems(galleryItems.filter((_, i) => i !== idx))
                        }
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Retirer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmGallery}
                disabled={galleryItems.length === 0}
                className="px-5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800 disabled:opacity-50"
              >
                Insérer la galerie ({galleryItems.length} photos)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

