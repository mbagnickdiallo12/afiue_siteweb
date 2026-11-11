"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sliders,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  ArrowRight,
  ExternalLink,
  Layers,
} from "lucide-react";
import { HomepageSlide } from "@/types/database";
import { FileUploadZone } from "@/components/admin/FileUploadZone";

interface Props {
  initialSlides: HomepageSlide[];
}

export function SlidesAdminManager({ initialSlides }: Props) {
  const [slides, setSlides] = useState<HomepageSlide[]>(initialSlides);
  const [isEditing, setIsEditing] = useState(false);
  const [activeItem, setActiveItem] = useState<Partial<HomepageSlide> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreate = () => {
    setActiveItem({
      badge: "Inscriptions Ouvertes 2026-2027",
      title: "L'Excellence Universitaire tournée vers l'Entreprise",
      subtitle: "Rejoignez le pôle d'excellence panafricain reconnu par le CAMES et l'ANAQ-Sup.",
      image_url: "/images/slides/hero-slide-1.jpg",
      cta_primary_text: "Découvrir nos filières",
      cta_primary_url: "/formations",
      cta_secondary_text: "Postuler en ligne",
      cta_secondary_url: "/candidature",
      order_index: slides.length + 1,
      is_active: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (s: HomepageSlide) => {
    setActiveItem({ ...s });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem || !activeItem.title) return;

    setIsSaving(true);
    try {
      const url = activeItem.id
        ? `/api/admin/slides/${activeItem.id}`
        : `/api/admin/slides`;
      const method = activeItem.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeItem),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de sauvegarde");
      }

      const savedSlide: HomepageSlide = data.data;

      if (activeItem.id) {
        setSlides((prev) =>
          prev.map((s) => (s.id === savedSlide.id ? savedSlide : s))
        );
        showToast("Diapositive mise à jour avec succès !");
      } else {
        setSlides((prev) => [...prev, savedSlide]);
        showToast("Nouvelle diapositive ajoutée avec succès !");
      }

      setIsEditing(false);
      setActiveItem(null);
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/slides/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      setSlides((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirmId(null);
      showToast("Diapositive supprimée");
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Slider Page d&apos;Accueil
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les bannières immersives et les boutons d&apos;action du carrousel principal du site.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-afi-red hover:bg-afi-red-800 text-white text-xs font-bold shadow-md shadow-afi-red/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Diapositive</span>
        </button>
      </div>

      {/* Slides Cards */}
      <div className="space-y-4">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row items-stretch hover:shadow-md transition-shadow"
          >
            {/* Visual Preview */}
            <div className="relative md:w-72 h-48 md:h-auto bg-slate-900 shrink-0 overflow-hidden">
              {s.image_url ? (
                <Image
                  src={s.image_url}
                  alt={s.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <Sliders className="w-8 h-8" />
                </div>
              )}
              <div className="absolute top-3 left-3 bg-afi-navy px-2.5 py-1 rounded-lg text-white font-mono text-[11px] font-bold">
                Position #{s.order_index ?? idx + 1}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {s.badge && (
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-afi-red text-white uppercase mb-2">
                    {s.badge}
                  </span>
                )}
                <h3 className="font-heading font-black text-lg text-slate-900 leading-snug">
                  {s.title}
                </h3>
                {s.subtitle && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {s.subtitle}
                  </p>
                )}

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {s.cta_primary_text && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-afi-navy text-white text-[11px] font-bold">
                      <span>{s.cta_primary_text}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="text-slate-300 font-mono text-[10px]">({s.cta_primary_url})</span>
                    </span>
                  )}
                  {s.cta_secondary_text && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-white text-[11px] font-bold">
                      <span>{s.cta_secondary_text}</span>
                      <span className="text-slate-300 font-mono text-[10px]">({s.cta_secondary_url})</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                    s.is_active ? "text-emerald-600" : "text-slate-500"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      s.is_active ? "text-emerald-600" : "text-slate-400"
                    }`}
                  />
                  {s.is_active ? "Active sur le carrousel" : "Désactivée"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-afi-navy text-white hover:bg-afi-navy-800 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(s.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Supprimer la diapositive
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Êtes-vous sûr de vouloir supprimer cette diapositive du carrousel d&apos;accueil ?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Suppression..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Slide Modal */}
      {isEditing && activeItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-afi-navy" />
                <h3 className="font-heading font-black text-lg text-slate-900">
                  {activeItem.id ? "Modifier la Diapositive" : "Nouvelle Diapositive Hero"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setActiveItem(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Badge en surbrillance
                </label>
                <input
                  type="text"
                  value={activeItem.badge || ""}
                  onChange={(e) =>
                    setActiveItem({ ...activeItem, badge: e.target.value })
                  }
                  placeholder="ex: Inscriptions Ouvertes 2026-2027"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Titre principal *
                </label>
                <input
                  type="text"
                  required
                  value={activeItem.title || ""}
                  onChange={(e) =>
                    setActiveItem({ ...activeItem, title: e.target.value })
                  }
                  placeholder="ex: L'Excellence Universitaire tournée vers l'Entreprise"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sous-titre explicatif
                </label>
                <textarea
                  rows={2}
                  value={activeItem.subtitle || ""}
                  onChange={(e) =>
                    setActiveItem({ ...activeItem, subtitle: e.target.value })
                  }
                  placeholder="Sous-titre accompagnant le grand titre..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <FileUploadZone
                    label="Image d'arrière-plan du Slide"
                    value={activeItem.image_url}
                    onChange={(url) =>
                      setActiveItem({ ...activeItem, image_url: url })
                    }
                    accept="image"
                    helpText="Format paysage haute résolution recommandé (1920x1080 ou 16:9, PNG ou JPG)."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bouton Principal : Texte
                  </label>
                  <input
                    type="text"
                    value={activeItem.cta_primary_text || ""}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, cta_primary_text: e.target.value })
                    }
                    placeholder="Découvrir nos filières"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bouton Principal : Lien (URL)
                  </label>
                  <input
                    type="text"
                    value={activeItem.cta_primary_url || ""}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, cta_primary_url: e.target.value })
                    }
                    placeholder="/formations"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bouton Secondaire : Texte (optionnel)
                  </label>
                  <input
                    type="text"
                    value={activeItem.cta_secondary_text || ""}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, cta_secondary_text: e.target.value })
                    }
                    placeholder="Postuler en ligne"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bouton Secondaire : Lien (URL)
                  </label>
                  <input
                    type="text"
                    value={activeItem.cta_secondary_url || ""}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, cta_secondary_url: e.target.value })
                    }
                    placeholder="/candidature"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ordre d&apos;affichage (1, 2, 3...)
                  </label>
                  <input
                    type="number"
                    value={activeItem.order_index ?? 1}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, order_index: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeItem.is_active ?? true}
                      onChange={(e) =>
                        setActiveItem({ ...activeItem, is_active: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-afi-navy"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      Activer sur le carrousel
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setActiveItem(null);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold shadow-md shadow-afi-navy/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Enregistrement..." : "Enregistrer la slide"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

