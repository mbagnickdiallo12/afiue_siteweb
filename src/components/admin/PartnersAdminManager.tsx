"use client";

import { useState } from "react";
import { Partner, PartnerType } from "@/types/database";
import {
  Handshake,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from "lucide-react";
import { FileUploadZone } from "./FileUploadZone";

interface Props {
  initialPartners: Partner[];
}

const PARTNER_TYPE_LABELS: Record<string, { label: string; badgeClass: string }> = {
  accreditation: { label: "Accréditation", badgeClass: "bg-afi-red text-white" },
  institutionnel: { label: "Institutionnel", badgeClass: "bg-afi-navy text-white" },
  academique: { label: "Académique", badgeClass: "bg-blue-600 text-white" },
  academic: { label: "Académique", badgeClass: "bg-blue-600 text-white" },
  entreprise: { label: "Entreprise / Tech", badgeClass: "bg-emerald-600 text-white" },
  corporate: { label: "Entreprise / Tech", badgeClass: "bg-emerald-600 text-white" },
};

const DISPLAY_STYLE_OPTIONS: { value: NonNullable<Partner["display_style"]>; label: string }[] = [
  { value: "bold-caps", label: "Majuscules Gras (Style CAMES)" },
  { value: "dot-sep", label: "Point Médian + Sous-label (Style ANAQ · SUP)" },
  { value: "pipe-sep", label: "Barre Verticale + Sous-label (Style MESRI | Sénégal)" },
  { value: "serif-italic", label: "Sérif Italique (Style auf)" },
  { value: "cisco", label: "Barres Réseau + Texte (Style cisco)" },
  { value: "wide-caps", label: "Majuscules Espacées (Style HUAWEI)" },
];

export function renderPartnerPreview(partner: Partner) {
  if (partner.logo_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={partner.logo_url}
        alt={partner.full_title || partner.name}
        className="h-8 w-auto max-w-[150px] object-contain"
      />
    );
  }

  const style = partner.display_style || "bold-caps";

  switch (style) {
    case "dot-sep":
      return (
        <div className="flex items-center gap-1.5 text-slate-700 select-none">
          <span className="font-heading font-extrabold text-lg tracking-wider">
            {partner.name}
          </span>
          {partner.sub_label && (
            <>
              <span className="text-slate-400 font-light text-lg">·</span>
              <span className="font-sans font-bold text-xs tracking-widest uppercase">
                {partner.sub_label}
              </span>
            </>
          )}
        </div>
      );
    case "pipe-sep":
      return (
        <div className="flex items-center gap-2 text-slate-700 select-none">
          <span className="font-heading font-bold text-base tracking-widest uppercase">
            {partner.name}
          </span>
          {partner.sub_label && (
            <>
              <span className="h-3.5 w-[1px] bg-slate-300" />
              <span className="font-sans font-normal text-xs tracking-wide text-slate-500">
                {partner.sub_label}
              </span>
            </>
          )}
        </div>
      );
    case "serif-italic":
      return (
        <div className="flex items-baseline gap-1 text-slate-700 select-none">
          <span className="font-serif italic font-black text-2xl tracking-tight">
            {partner.name}
          </span>
          {partner.sub_label && (
            <span className="font-sans font-semibold text-xs text-slate-500">
              {partner.sub_label}
            </span>
          )}
        </div>
      );
    case "cisco":
      return (
        <div className="flex flex-col items-center text-slate-700 select-none">
          <div className="flex items-end gap-[2.5px] h-2.5 mb-0.5 opacity-80">
            <span className="w-[2px] h-1 bg-current rounded-full" />
            <span className="w-[2px] h-2 bg-current rounded-full" />
            <span className="w-[2px] h-2.5 bg-current rounded-full" />
            <span className="w-[2px] h-1.5 bg-current rounded-full" />
            <span className="w-[2px] h-2.5 bg-current rounded-full" />
            <span className="w-[2px] h-2 bg-current rounded-full" />
            <span className="w-[2px] h-1 bg-current rounded-full" />
          </div>
          <span className="font-heading font-black text-xs tracking-[0.22em] lowercase leading-none">
            {partner.name}
          </span>
        </div>
      );
    case "wide-caps":
      return (
        <div className="flex items-center gap-1.5 text-slate-700 select-none">
          <span className="font-heading font-extrabold text-base tracking-[0.2em] uppercase">
            {partner.name}
          </span>
          {partner.sub_label && (
            <span className="font-sans font-semibold text-xs text-slate-500">
              {partner.sub_label}
            </span>
          )}
        </div>
      );
    case "bold-caps":
    default:
      return (
        <div className="flex items-baseline gap-1.5 text-slate-700 select-none">
          <span className="font-heading font-black text-xl tracking-tight">
            {partner.name}
          </span>
          {partner.sub_label && (
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500">
              {partner.sub_label}
            </span>
          )}
        </div>
      );
  }
}

export default function PartnersAdminManager({ initialPartners }: Props) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partial<Partner> | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const openCreateModal = () => {
    setEditingPartner({
      name: "",
      sub_label: "",
      full_title: "",
      logo_url: null,
      website_url: "",
      partner_type: "accreditation",
      display_style: "bold-caps",
      order_index: partners.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (partner: Partner) => {
    setEditingPartner({ ...partner });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner || !editingPartner.name) return;
    setLoading(true);

    try {
      const isEdit = Boolean(editingPartner.id);
      const url = isEdit
        ? `/api/admin/partners/${editingPartner.id}`
        : "/api/admin/partners";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...editingPartner,
        sub_label: editingPartner.sub_label?.trim() ? editingPartner.sub_label.trim() : null,
        full_title: editingPartner.full_title?.trim() ? editingPartner.full_title.trim() : null,
        logo_url: editingPartner.logo_url?.trim() ? editingPartner.logo_url.trim() : null,
        website_url: editingPartner.website_url?.trim() ? editingPartner.website_url.trim() : null,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        if (isEdit) {
          setPartners((prev) =>
            prev
              .map((p) => (p.id === json.data.id ? json.data : p))
              .sort((a, b) => a.order_index - b.order_index)
          );
          showToast("Partenaire mis à jour avec succès !");
        } else {
          setPartners((prev) =>
            [...prev, json.data].sort((a, b) => a.order_index - b.order_index)
          );
          showToast("Nouveau partenaire ajouté avec succès !");
        }
        setIsModalOpen(false);
        setEditingPartner(null);
      } else {
        alert(json.error || "Erreur lors de l'enregistrement");
      }
    } catch {
      alert("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (partner: Partner) => {
    try {
      const res = await fetch(`/api/admin/partners/${partner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...partner, is_active: !partner.is_active }),
      });
      const json = await res.json();
      if (json.success) {
        setPartners((prev) =>
          prev.map((p) => (p.id === partner.id ? json.data : p))
        );
        showToast(
          json.data.is_active
            ? "Partenaire affiché sur l'accueil"
            : "Partenaire masqué de l'accueil"
        );
      }
    } catch {
      alert("Erreur lors du changement de statut");
    }
  };

  const moveOrder = async (partner: Partner, direction: "up" | "down") => {
    const sorted = [...partners].sort((a, b) => a.order_index - b.order_index);
    const idx = sorted.findIndex((p) => p.id === partner.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const other = sorted[swapIdx];
    const newOrderPartner = other.order_index;
    const newOrderOther =
      partner.order_index === other.order_index
        ? direction === "up"
          ? partner.order_index - 1
          : partner.order_index + 1
        : partner.order_index;

    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/admin/partners/${partner.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...partner, order_index: newOrderPartner }),
        }),
        fetch(`/api/admin/partners/${other.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...other, order_index: newOrderOther }),
        }),
      ]);
      const [j1, j2] = await Promise.all([res1.json(), res2.json()]);
      if (j1.success && j2.success) {
        setPartners((prev) =>
          prev
            .map((p) => {
              if (p.id === partner.id) return j1.data;
              if (p.id === other.id) return j2.data;
              return p;
            })
            .sort((a, b) => a.order_index - b.order_index)
        );
        showToast("Ordre d'affichage mis à jour !");
      }
    } catch {
      alert("Erreur lors du réordonnancement");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer le partenaire "${name}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setPartners((prev) => prev.filter((p) => p.id !== id));
        showToast("Partenaire supprimé avec succès !");
      }
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-8">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-afi-navy text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold text-afi-red uppercase tracking-widest">
            Page d&apos;Accueil · Bandeau Officiel
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-afi-navy mt-1">
            Accréditations & Partenaires ({partners.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les institutions d&apos;accréditation (CAMES, ANAQ-SUP, MESRI) et les partenaires académiques/entreprises (AUF, Cisco, Huawei) affichés sur l&apos;accueil.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-afi-red hover:bg-afi-red-light text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Ajouter un Partenaire
        </button>
      </div>

      {/* Live Preview Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Aperçu en direct du bandeau sur la page d&apos;accueil
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{partners.filter((p) => p.is_active).length} actifs</span>
          </span>
        </div>
        <div className="py-5 px-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-center md:justify-between gap-x-10 gap-y-6">
          {partners
            .filter((p) => p.is_active)
            .map((p) => (
              <div key={p.id} title={p.full_title || p.name}>
                {renderPartnerPreview(p)}
              </div>
            ))}
        </div>
      </div>

      {/* Grid of Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, idx) => {
          const typeInfo =
            PARTNER_TYPE_LABELS[partner.partner_type] ||
            PARTNER_TYPE_LABELS.academique;
          return (
            <div
              key={partner.id}
              className={`bg-white rounded-2xl border overflow-hidden shadow-xs transition-all flex flex-col justify-between ${
                partner.is_active ? "border-slate-200" : "border-slate-200 opacity-60"
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Top Badges — 100% Opaque Solid Backgrounds */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider">
                      #{partner.order_index}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${typeInfo.badgeClass}`}
                    >
                      {typeInfo.label}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      partner.is_active
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    {partner.is_active ? "Actif" : "Masqué"}
                  </span>
                </div>

                {/* Visual Wordmark / Logo Box */}
                <div className="h-24 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-4">
                  {renderPartnerPreview(partner)}
                </div>

                {/* Partner Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading font-bold text-base text-afi-navy">
                      {partner.name}
                      {partner.sub_label ? ` (${partner.sub_label})` : ""}
                    </h3>
                    {partner.website_url && (
                      <a
                        href={partner.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-afi-red hover:underline"
                      >
                        <span>Site web</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 min-h-[2rem]">
                    {partner.full_title || "Aucune description complète renseignée"}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(partner)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1.5 rounded-lg transition-colors ${
                      partner.is_active
                        ? "text-slate-700 hover:text-afi-navy"
                        : "text-emerald-600 hover:text-emerald-700"
                    }`}
                  >
                    {partner.is_active ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                        <span>Masquer</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Activer</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => moveOrder(partner, "up")}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-afi-navy disabled:opacity-30 transition-colors"
                    title="Monter"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveOrder(partner, "down")}
                    disabled={idx === partners.length - 1}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-afi-navy disabled:opacity-30 transition-colors"
                    title="Descendre"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(partner)}
                    className="p-2 rounded-lg bg-afi-navy text-white hover:bg-slate-800 transition-colors"
                    title="Modifier"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id, partner.name)}
                    className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && editingPartner && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-afi-navy text-white flex items-center justify-center">
                  <Handshake className="w-4 h-4" />
                </div>
                <h2 className="font-heading font-extrabold text-xl text-afi-navy">
                  {editingPartner.id
                    ? "Modifier le Partenaire / Accréditation"
                    : "Nouveau Partenaire / Accréditation"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Sigle / Nom court *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPartner.name || ""}
                    onChange={(e) =>
                      setEditingPartner({ ...editingPartner, name: e.target.value })
                    }
                    placeholder="Ex: CAMES, ANAQ, MESRI..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Sous-label (optionnel)
                  </label>
                  <input
                    type="text"
                    value={editingPartner.sub_label || ""}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        sub_label: e.target.value,
                      })
                    }
                    placeholder="Ex: SUP, Sénégal..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ordre d&apos;affichage
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingPartner.order_index || 1}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        order_index: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Intitulé officiel complet
                </label>
                <input
                  type="text"
                  value={editingPartner.full_title || ""}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      full_title: e.target.value,
                    })
                  }
                  placeholder="Ex: Conseil Africain et Malgache pour l'Enseignement Supérieur"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Type de Partenaire
                  </label>
                  <select
                    value={editingPartner.partner_type || "accreditation"}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        partner_type: e.target.value as PartnerType,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy bg-white"
                  >
                    <option value="accreditation">Accréditation</option>
                    <option value="institutionnel">Institutionnel</option>
                    <option value="academique">Académique</option>
                    <option value="entreprise">Entreprise / Tech</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Style typographique (si pas de logo image)
                  </label>
                  <select
                    value={editingPartner.display_style || "bold-caps"}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        display_style: e.target.value as Partner["display_style"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy bg-white"
                  >
                    {DISPLAY_STYLE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Site web officiel (optionnel)
                </label>
                <input
                  type="url"
                  value={editingPartner.website_url || ""}
                  onChange={(e) =>
                    setEditingPartner({
                      ...editingPartner,
                      website_url: e.target.value,
                    })
                  }
                  placeholder="https://www.lecames.org"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy"
                />
              </div>

              <div>
                <FileUploadZone
                  label="Logo Image (Optionnel — remplace le style typographique si renseigné)"
                  value={editingPartner.logo_url || ""}
                  onChange={(url) =>
                    setEditingPartner({
                      ...editingPartner,
                      logo_url: url || null,
                    })
                  }
                  accept="image"
                  helpText="Laissez vide pour conserver la signature typographique minimaliste (recommandé), ou téléversez un logo PNG/SVG."
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingPartner.is_active)}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        is_active: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-afi-red focus:ring-afi-red"
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    Afficher ce partenaire sur la page d&apos;accueil
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-afi-red hover:bg-afi-red-light text-white text-xs font-bold uppercase tracking-wider shadow-md disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
