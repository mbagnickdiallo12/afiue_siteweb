"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MessageSquareQuote,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  ExternalLink,
  GraduationCap,
  Building,
  Calendar,
} from "lucide-react";
import { Testimonial } from "@/types/database";
import { FileUploadZone } from "@/components/admin/FileUploadZone";

interface Props {
  initialTestimonials: Testimonial[];
}

export function TestimonialsAdminManager({ initialTestimonials }: Props) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isEditing, setIsEditing] = useState(false);
  const [activeItem, setActiveItem] = useState<Partial<Testimonial> | null>(null);
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
      author_name: "",
      author_role: "",
      author_company: "",
      content: "",
      avatar_url: "/images/testimonials/alumni-ndiaye.jpg",
      promotion_year: 2024,
      formation_title: "Master Ingénierie Financière",
      order_index: testimonials.length + 1,
      is_featured: true,
      is_active: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setActiveItem({ ...t });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem || !activeItem.author_name || !activeItem.content) return;

    setIsSaving(true);
    try {
      const url = activeItem.id
        ? `/api/admin/testimonials/${activeItem.id}`
        : `/api/admin/testimonials`;
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

      const savedTestimonial: Testimonial = data.data;

      if (activeItem.id) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === savedTestimonial.id ? savedTestimonial : t))
        );
        showToast("Témoignage mis à jour avec succès !");
      } else {
        setTestimonials((prev) => [...prev, savedTestimonial]);
        showToast("Nouveau témoignage ajouté avec succès !");
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
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setDeleteConfirmId(null);
      showToast("Témoignage supprimé");
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
            Gestion des Témoignages Alumni
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les 6 retours d&apos;expérience officiels affichés sur la page d&apos;accueil et la section Alumni.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-afi-red hover:bg-afi-red-800 text-white text-xs font-bold shadow-md shadow-afi-red/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Témoignage</span>
        </button>
      </div>

      {/* Testimonials Grid Cards (Style Moderne, Épuré Dashboard) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={t.id}
            className="group relative rounded-3xl bg-white border border-slate-200/70 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle Ethereal Ambient Glow Corner on Hover */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Top row: Order badge and controls */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-[11px] font-bold shadow-xs">
                  Position #{t.order_index ?? idx + 1}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    title="Modifier"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(t.id)}
                    title="Supprimer"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-600 hover:text-white text-slate-500 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Author details */}
              <div className="flex items-start gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-afi-red shadow-xs bg-slate-100 transition-transform duration-300 group-hover:scale-105">
                  {t.avatar_url ? (
                    <Image
                      src={t.avatar_url}
                      alt={t.author_name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-afi-navy text-white font-bold text-sm">
                      {t.author_name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-black text-sm sm:text-base text-slate-900 leading-snug truncate group-hover:text-afi-red transition-colors">
                    {t.author_name}
                  </h3>
                  <p className="text-[11px] font-bold text-afi-red line-clamp-2 mt-0.5">
                    {t.author_role}
                    {t.author_company && ` · ${t.author_company}`}
                  </p>
                  {t.formation_title && (
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 truncate font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{t.formation_title}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Quote Excerpt */}
              <blockquote className="text-xs text-slate-600 italic bg-slate-50/80 p-4 rounded-2xl border border-slate-100/90 leading-relaxed">
                <p className="line-clamp-4 leading-relaxed">
                  &laquo; {t.content} &raquo;
                </p>
              </blockquote>
            </div>

            {/* Footer Metadata */}
            <div className="mt-4 pt-3.5 border-t border-slate-100/80 flex items-center justify-between text-[11px] relative z-10">
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Promo {t.promotion_year || "Alumni"}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                  t.is_active ? "text-emerald-600" : "text-slate-500"
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    t.is_active ? "text-emerald-600" : "text-slate-400"
                  }`}
                />
                {t.is_active ? "Actif sur le site" : "Masqué"}
              </span>
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
                Supprimer le témoignage
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Êtes-vous certain de vouloir supprimer ce témoignage ? Il ne sera plus visible sur le carrousel de la page d&apos;accueil.
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

      {/* Edit / Create Modal */}
      {isEditing && activeItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-afi-navy" />
                <h3 className="font-heading font-black text-lg text-slate-900">
                  {activeItem.id ? "Modifier le Témoignage" : "Nouveau Témoignage Alumni"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom et Prénom de l&apos;Alumni *
                  </label>
                  <input
                    type="text"
                    required
                    value={activeItem.author_name || ""}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, author_name: e.target.value })
                    }
                    placeholder="ex: M. Papa Macodou NDIAYE"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Fonction / Poste actuel *
                  </label>
                  <input
                    type="text"
                    required
                    value={activeItem.author_role || ""}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, author_role: e.target.value })
                    }
                    placeholder="ex: Directeur Général"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Entreprise / Organisation
                  </label>
                  <input
                    type="text"
                    value={activeItem.author_company || ""}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, author_company: e.target.value })
                    }
                    placeholder="ex: ABB Sénégal"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Filière suivie à AFI
                  </label>
                  <input
                    type="text"
                    value={activeItem.formation_title || ""}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, formation_title: e.target.value })
                    }
                    placeholder="ex: Bachelor en Gestion des Réseaux Informatiques"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Année de promotion
                  </label>
                  <input
                    type="number"
                    value={activeItem.promotion_year || 2024}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, promotion_year: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FileUploadZone
                    label="Photo de profil de l'Alumni (Avatar)"
                    value={activeItem.avatar_url}
                    onChange={(url) =>
                      setActiveItem({ ...activeItem, avatar_url: url })
                    }
                    accept="image"
                    helpText="Photo carrée ou portrait de l'intervenant recommandée (PNG ou JPG)."
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
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Texte du témoignage *
                </label>
                <textarea
                  required
                  rows={5}
                  value={activeItem.content || ""}
                  onChange={(e) =>
                    setActiveItem({ ...activeItem, content: e.target.value })
                  }
                  placeholder="Partagez le témoignage et l'expérience de l'alumni..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20 leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
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
                    Actif sur le carrousel
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeItem.is_featured ?? true}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, is_featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-afi-navy"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Mis en avant
                  </span>
                </label>
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
                  <span>{isSaving ? "Enregistrement..." : "Enregistrer"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

