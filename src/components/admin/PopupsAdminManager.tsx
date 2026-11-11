"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Save,
  Clock,
  ArrowRight,
  ExternalLink,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Sliders,
  Calendar,
  Layers,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { EventPopupConfig, EventPopupSlide } from "@/types/database";
import { FileUploadZone } from "@/components/admin/FileUploadZone";

interface Props {
  initialConfig: EventPopupConfig;
}

const PRESET_EVENT_IMAGES = [
  {
    name: "Affiche Concours SME 2026 (Carré)",
    url: "/images/events/event-sme-concours.jpg",
  },
  {
    name: "AFI TECH • Téranga Skills (Carré)",
    url: "/images/events/event-afitech-teranga.jpg",
  },
  {
    name: "Affiche Prépa-Concours (Carré)",
    url: "/images/events/event-prepa-concours.jpg",
  },
];

export function PopupsAdminManager({ initialConfig }: Props) {
  const [config, setConfig] = useState<EventPopupConfig>(initialConfig);
  const [slides, setSlides] = useState<EventPopupSlide[]>(initialConfig.slides || []);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSlide, setActiveSlide] = useState<Partial<EventPopupSlide> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live preview interactive state
  const [previewIndex, setPreviewIndex] = useState(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreate = () => {
    setActiveSlide({
      title: "Nouvel Événement AFI-L'UE 2026",
      badge: "Événement Spécial",
      subtitle: "Rejoignez l'excellence académique et participez à nos sessions exclusives.",
      image_url: PRESET_EVENT_IMAGES[0].url,
      cta_text: "En savoir plus",
      cta_url: "/candidater",
      show_cta: true,
      target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16),
      show_countdown: true,
      order_index: slides.length + 1,
      is_active: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (slide: EventPopupSlide) => {
    setActiveSlide({
      ...slide,
      target_date: slide.target_date
        ? new Date(slide.target_date).toISOString().slice(0, 16)
        : null,
    });
    setIsEditing(true);
  };

  const handleSaveConfig = async (newConfig: Partial<EventPopupConfig>) => {
    setIsSaving(true);
    try {
      const payload = {
        ...config,
        ...newConfig,
        slides,
      };

      const res = await fetch("/api/admin/popups", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur de sauvegarde");
      const data = await res.json();
      setConfig(data.config);
      setSlides(data.config.slides);
      showToast("Configuration générale enregistrée avec succès");
    } catch {
      showToast("Erreur lors de la sauvegarde de la configuration");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSlide || !activeSlide.title || !activeSlide.image_url) return;

    setIsSaving(true);
    try {
      const isNew = !activeSlide.id;
      const url = isNew
        ? "/api/admin/popups"
        : `/api/admin/popups/${activeSlide.id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        ...activeSlide,
        target_date: activeSlide.target_date
          ? new Date(activeSlide.target_date).toISOString()
          : null,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();

      let updatedSlides: EventPopupSlide[];
      if (isNew) {
        updatedSlides = [...slides, data.slide];
      } else {
        updatedSlides = slides.map((s) =>
          s.id === data.slide.id ? data.slide : s
        );
      }

      setSlides(updatedSlides);
      setConfig({ ...config, slides: updatedSlides });
      setIsEditing(false);
      setActiveSlide(null);
      showToast(isNew ? "Affiche ajoutée avec succès" : "Affiche mise à jour");
    } catch {
      showToast("Erreur lors de l'enregistrement de l'affiche");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSlide = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/popups/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur");

      const filtered = slides.filter((s) => s.id !== id);
      setSlides(filtered);
      setConfig({ ...config, slides: filtered });
      setDeleteConfirmId(null);
      showToast("Affiche supprimée du slider");
    } catch {
      showToast("Erreur lors de la suppression");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = async (slide: EventPopupSlide) => {
    try {
      const updated = { ...slide, is_active: !slide.is_active };
      const res = await fetch(`/api/admin/popups/${slide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error();

      const newSlides = slides.map((s) => (s.id === slide.id ? updated : s));
      setSlides(newSlides);
      setConfig({ ...config, slides: newSlides });
      showToast(
        updated.is_active ? "Affiche activée" : "Affiche désactivée"
      );
    } catch {
      showToast("Erreur lors du changement de statut");
    }
  };

  const activeSlidesForPreview = slides.filter((s) => s.is_active);
  const currentPreviewSlide =
    activeSlidesForPreview[previewIndex % Math.max(1, activeSlidesForPreview.length)] ||
    slides[0];

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-afi-red text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="font-heading font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
              Popups Événements & Annonces
            </h1>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Gérez le popup latéral de la page d&apos;accueil : activez le slider d&apos;affiches animées, le compte à rebours en direct et les boutons d&apos;action personnalisés.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une affiche</span>
        </button>
      </div>

      {/* Global Settings Control Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-slate-700" />
            <h2 className="font-bold text-sm text-slate-900">
              Paramètres généraux du Popup d&apos;accueil
            </h2>
          </div>

          {/* Master Enable/Disable Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                config.is_enabled ? "bg-emerald-600" : "bg-slate-800"
              }`}
            >
              {config.is_enabled ? "Popup Actif sur le site" : "Popup Désactivé"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Toggle master activation */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Affichage du Popup
            </label>
            <button
              type="button"
              onClick={() =>
                handleSaveConfig({ is_enabled: !config.is_enabled })
              }
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2 ${
                config.is_enabled
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              <span>
                {config.is_enabled ? "Désactiver le popup" : "Activer le popup"}
              </span>
            </button>
            <p className="text-[11px] text-slate-500">
              Contrôle si le popup s&apos;ouvre à l&apos;arrivée des visiteurs.
            </p>
          </div>

          {/* 2. Position selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Emplacement sur l&apos;écran
            </label>
            <select
              value={config.position}
              onChange={(e) =>
                handleSaveConfig({
                  position: e.target.value as EventPopupConfig["position"],
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-afi-red"
            >
              <option value="bottom-left">Coin inférieur gauche (Recommandé)</option>
              <option value="bottom-right">Coin inférieur droit</option>
              <option value="center-modal">Modal latéral centré</option>
            </select>
            <p className="text-[11px] text-slate-500">
              Position du popup par-dessus le contenu du site.
            </p>
          </div>

          {/* 3. Slider rotation speed */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Vitesse de défilement (Slider)
            </label>
            <select
              value={config.auto_slide_interval_ms}
              onChange={(e) =>
                handleSaveConfig({
                  auto_slide_interval_ms: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-afi-red"
            >
              <option value={3000}>3 secondes (Rapide)</option>
              <option value={4500}>4.5 secondes (Standard)</option>
              <option value={6000}>6 secondes (Confortable)</option>
              <option value={8000}>8 secondes (Lent)</option>
            </select>
            <p className="text-[11px] text-slate-500">
              Délai de transition automatique entre deux affiches.
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Slides List + Live Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Slides List (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-700" />
              <h2 className="font-heading font-black text-base text-slate-900">
                Affiches du Slider ({slides.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {activeSlidesForPreview.length} active(s) en rotation
            </span>
          </div>

          {slides.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-sm text-slate-800">
                Aucune affiche pour le moment
              </h3>
              <p className="text-xs text-slate-500">
                Cliquez sur « Ajouter une affiche » pour configurer votre premier événement.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {slides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Square Image Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                      <Image
                        src={slide.image_url}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {slide.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-white font-bold text-[9px] uppercase tracking-wider">
                            {slide.badge}
                          </span>
                        )}

                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold text-white ${
                            slide.is_active ? "bg-emerald-600" : "bg-slate-700"
                          }`}
                        >
                          {slide.is_active ? "Actif" : "Inactif"}
                        </span>

                        {slide.show_countdown && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[9px] inline-flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            <span>Compte à rebours</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {slide.title}
                      </h3>

                      {slide.subtitle && (
                        <p className="text-[11px] text-slate-500 truncate max-w-md">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 justify-end">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(slide)}
                      title={slide.is_active ? "Désactiver" : "Activer"}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer ${
                        slide.is_active
                          ? "bg-slate-800 hover:bg-slate-900"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {slide.is_active ? "Désactiver" : "Activer"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(slide)}
                      title="Modifier"
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {deleteConfirmId === slide.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDeleteSlide(slide.id)}
                          disabled={isDeleting}
                          className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Confirmer
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer"
                        >
                          Non
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(slide.id)}
                        title="Supprimer"
                        className="w-8 h-8 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Live Interactive Preview (Span 5) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-afi-red" />
              <h2 className="font-heading font-black text-sm text-slate-900">
                Aperçu Visuel en Direct
              </h2>
            </div>

            {activeSlidesForPreview.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewIndex(
                      (prev) =>
                        (prev - 1 + activeSlidesForPreview.length) %
                        activeSlidesForPreview.length
                    )
                  }
                  className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-bold font-mono text-slate-500">
                  {previewIndex + 1}/{activeSlidesForPreview.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewIndex(
                      (prev) => (prev + 1) % activeSlidesForPreview.length
                    )
                  }
                  className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-500">
            Rendu exact tel que le visiteur le découvrira {config.position === "bottom-left" ? "en bas à gauche" : config.position === "bottom-right" ? "en bas à droite" : "au centre"} de la page d&apos;accueil :
          </p>

          {/* Mini Mockup of the Popup */}
          {currentPreviewSlide ? (
            <div className="relative mx-auto max-w-[320px] bg-white rounded-xl shadow-xl border border-slate-200 p-4 space-y-3">
              {/* Floating Close Button */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-afi-red text-white flex items-center justify-center shadow-md border-2 border-white">
                <X className="w-4 h-4" />
              </div>

              {/* Square Image */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-900">
                <Image
                  src={currentPreviewSlide.image_url}
                  alt={currentPreviewSlide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute inset-0 pattern-grid-dots opacity-25" />
              </div>

              {/* Title & Subtitle */}
              <div className="text-center space-y-0.5">
                <h4 className="font-heading font-black text-xs text-slate-900 leading-tight">
                  {currentPreviewSlide.title}
                </h4>
                {currentPreviewSlide.subtitle && (
                  <p className="text-[10px] text-slate-600 line-clamp-2">
                    {currentPreviewSlide.subtitle}
                  </p>
                )}
              </div>

              {/* Countdown Preview */}
              {currentPreviewSlide.show_countdown && (
                <div className="text-center space-y-1 py-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">
                    Compte à rebours en direct
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    <div className="bg-slate-900 text-white rounded-md py-1 px-1.5 min-w-[36px]">
                      <span className="font-mono font-bold text-xs block leading-none">
                        24
                      </span>
                      <span className="text-[7px] text-slate-400 uppercase">J</span>
                    </div>
                    <span className="text-slate-400 text-xs font-bold">:</span>
                    <div className="bg-slate-900 text-white rounded-md py-1 px-1.5 min-w-[36px]">
                      <span className="font-mono font-bold text-xs block leading-none">
                        08
                      </span>
                      <span className="text-[7px] text-slate-400 uppercase">H</span>
                    </div>
                    <span className="text-slate-400 text-xs font-bold">:</span>
                    <div className="bg-slate-900 text-white rounded-md py-1 px-1.5 min-w-[36px]">
                      <span className="font-mono font-bold text-xs block leading-none">
                        45
                      </span>
                      <span className="text-[7px] text-slate-400 uppercase">M</span>
                    </div>
                    <span className="text-slate-400 text-xs font-bold">:</span>
                    <div className="bg-afi-red text-white rounded-md py-1 px-1.5 min-w-[36px]">
                      <span className="font-mono font-bold text-xs block leading-none">
                        12
                      </span>
                      <span className="text-[7px] text-red-200 uppercase">S</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Button Preview */}
              {currentPreviewSlide.show_cta && (
                <div className="py-2.5 px-4 rounded-lg bg-afi-red text-white text-xs font-bold text-center shadow-xs flex items-center justify-center gap-1.5">
                  <span>{currentPreviewSlide.cta_text || "En savoir plus"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Slide Creation / Edit Modal */}
      {isEditing && activeSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-afi-red text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-lg text-slate-900">
                  {activeSlide.id ? "Modifier l'Affiche" : "Nouvelle Affiche Événement"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setActiveSlide(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveSlide} className="p-6 overflow-y-auto space-y-5">
              {/* Titre & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Titre de l&apos;Événement *
                  </label>
                  <input
                    type="text"
                    required
                    value={activeSlide.title || ""}
                    onChange={(e) =>
                      setActiveSlide({ ...activeSlide, title: e.target.value })
                    }
                    placeholder="Ex: Concours National SME 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-afi-red"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Badge / Tag Supérieur
                  </label>
                  <input
                    type="text"
                    value={activeSlide.badge || ""}
                    onChange={(e) =>
                      setActiveSlide({ ...activeSlide, badge: e.target.value })
                    }
                    placeholder="Ex: Concours 2026, Webinaire, Portes Ouvertes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-afi-red"
                  />
                </div>
              </div>

              {/* Description courte */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Sous-titre / Description Courte
                </label>
                <textarea
                  rows={2}
                  value={activeSlide.subtitle || ""}
                  onChange={(e) =>
                    setActiveSlide({ ...activeSlide, subtitle: e.target.value })
                  }
                  placeholder="Courte phrase percutante pour inciter à l'action..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-afi-red"
                />
              </div>

              {/* Choix de l'image carrée */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Image Carrée de l&apos;Affiche (Ratio 1:1) *
                </label>

                {/* Preset quick picker */}
                <div className="grid grid-cols-3 gap-2.5">
                  {PRESET_EVENT_IMAGES.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() =>
                        setActiveSlide({ ...activeSlide, image_url: preset.url })
                      }
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-all ${
                        activeSlide.image_url === preset.url
                          ? "border-afi-red bg-slate-900 text-white shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={preset.url}
                          alt={preset.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[10px] font-bold truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Direct URL input */}
                <input
                  type="text"
                  required
                  value={activeSlide.image_url || ""}
                  onChange={(e) =>
                    setActiveSlide({ ...activeSlide, image_url: e.target.value })
                  }
                  placeholder="URL directe de l'image (/images/events/...)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-afi-red font-mono"
                />

                {/* File Upload Zone */}
                <FileUploadZone
                  value={activeSlide.image_url}
                  onChange={(url: string) =>
                    setActiveSlide({ ...activeSlide, image_url: url })
                  }
                  label="Téléverser une nouvelle affiche carrée"
                  accept="image"
                />
              </div>

              {/* Section Compte à Rebours */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-bold text-slate-900">
                      Compte à Rebours (Countdown)
                    </span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeSlide.show_countdown ?? false}
                      onChange={(e) =>
                        setActiveSlide({
                          ...activeSlide,
                          show_countdown: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-afi-red focus:ring-afi-red cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      Activer le compte à rebours
                    </span>
                  </label>
                </div>

                {activeSlide.show_countdown && (
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Date & Heure limite de l&apos;événement
                    </label>
                    <input
                      type="datetime-local"
                      value={activeSlide.target_date || ""}
                      onChange={(e) =>
                        setActiveSlide({
                          ...activeSlide,
                          target_date: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-afi-red"
                    />
                  </div>
                )}
              </div>

              {/* Section Bouton d'Action CTA */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-bold text-slate-900">
                      Bouton d&apos;Action (CTA)
                    </span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeSlide.show_cta ?? true}
                      onChange={(e) =>
                        setActiveSlide({
                          ...activeSlide,
                          show_cta: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-afi-red focus:ring-afi-red cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      Afficher le bouton
                    </span>
                  </label>
                </div>

                {activeSlide.show_cta && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600">
                        Texte du Bouton
                      </label>
                      <input
                        type="text"
                        value={activeSlide.cta_text || ""}
                        onChange={(e) =>
                          setActiveSlide({
                            ...activeSlide,
                            cta_text: e.target.value,
                          })
                        }
                        placeholder="Ex: Déposer un projet"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-afi-red"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600">
                        Lien de Destination
                      </label>
                      <input
                        type="text"
                        value={activeSlide.cta_url || ""}
                        onChange={(e) =>
                          setActiveSlide({
                            ...activeSlide,
                            cta_url: e.target.value,
                          })
                        }
                        placeholder="Ex: /candidater ou https://..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-afi-red"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Switch Statut Actif */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-800">
                  Activer cette affiche dans la rotation
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeSlide.is_active ?? true}
                    onChange={(e) =>
                      setActiveSlide({
                        ...activeSlide,
                        is_active: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-afi-red focus:ring-afi-red cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-700">
                    Affiche active
                  </span>
                </label>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setActiveSlide(null);
                  }}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isSaving ? "Enregistrement..." : "Enregistrer l'affiche"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
