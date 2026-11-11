"use client";

import { useState } from "react";
import { StudentLifeItem } from "@/types/database";
import {
  Camera,
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
  Image as ImageIcon,
} from "lucide-react";
import { FileUploadZone } from "./FileUploadZone";

interface Props {
  initialItems: StudentLifeItem[];
}

export default function StudentLifeAdminManager({ initialItems }: Props) {
  const [items, setItems] = useState<StudentLifeItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<StudentLifeItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const openCreateModal = () => {
    setEditingItem({
      title: "",
      tag: "Vie de Campus",
      image_url: "/images/student-life/graduation-arena.jpg",
      order_index: items.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: StudentLifeItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title) return;
    setLoading(true);

    try {
      const isEdit = Boolean(editingItem.id);
      const url = isEdit
        ? `/api/admin/student-life/${editingItem.id}`
        : "/api/admin/student-life";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      const json = await res.json();

      if (json.success) {
        if (isEdit) {
          setItems((prev) =>
            prev
              .map((s) => (s.id === json.data.id ? json.data : s))
              .sort((a, b) => a.order_index - b.order_index)
          );
          showToast("Photo Vie Étudiante mise à jour avec succès !");
        } else {
          setItems((prev) =>
            [...prev, json.data].sort((a, b) => a.order_index - b.order_index)
          );
          showToast("Nouvelle photo Vie Étudiante ajoutée avec succès !");
        }
        setIsModalOpen(false);
        setEditingItem(null);
      } else {
        alert(json.error || "Erreur lors de l'enregistrement");
      }
    } catch {
      alert("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (item: StudentLifeItem) => {
    try {
      const res = await fetch(`/api/admin/student-life/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_active: !item.is_active }),
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) =>
          prev.map((s) => (s.id === item.id ? json.data : s))
        );
        showToast(
          json.data.is_active ? "Photo activée sur l'accueil" : "Photo masquée de l'accueil"
        );
      }
    } catch {
      alert("Erreur lors du changement de statut");
    }
  };

  const moveOrder = async (item: StudentLifeItem, direction: "up" | "down") => {
    const sorted = [...items].sort((a, b) => a.order_index - b.order_index);
    const idx = sorted.findIndex((s) => s.id === item.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const other = sorted[swapIdx];
    const newOrderItem = other.order_index;
    const newOrderOther = item.order_index === other.order_index
      ? (direction === "up" ? item.order_index - 1 : item.order_index + 1)
      : item.order_index;

    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/admin/student-life/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, order_index: newOrderItem }),
        }),
        fetch(`/api/admin/student-life/${other.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...other, order_index: newOrderOther }),
        }),
      ]);
      const [j1, j2] = await Promise.all([res1.json(), res2.json()]);
      if (j1.success && j2.success) {
        setItems((prev) =>
          prev
            .map((s) => {
              if (s.id === item.id) return j1.data;
              if (s.id === other.id) return j2.data;
              return s;
            })
            .sort((a, b) => a.order_index - b.order_index)
        );
        showToast("Ordre d'affichage mis à jour !");
      }
    } catch {
      alert("Erreur lors du réordonnancement");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer la photo "${title}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/student-life/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setItems((prev) => prev.filter((s) => s.id !== id));
        showToast("Photo supprimée avec succès !");
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
            Page d&apos;Accueil · Carrousel Campus
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-afi-navy mt-1">
            Vie Étudiante à AFI-L&apos;UE ({items.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les photos, catégories et légendes de la galerie défilante « Vie Étudiante à AFI-L&apos;UE » sur la page d&apos;accueil.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-afi-red hover:bg-afi-red-light text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Ajouter une Photo
        </button>
      </div>

      {/* Grid of Student Life Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border overflow-hidden shadow-xs transition-all flex flex-col justify-between ${
              item.is_active ? "border-slate-200" : "border-slate-200 opacity-60"
            }`}
          >
            <div>
              {/* Preview Banner */}
              <div className="relative h-56 bg-afi-navy overflow-hidden">
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Top Badges — 100% Opaque Solid Backgrounds */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-afi-navy text-white text-[10px] font-bold uppercase tracking-wider">
                    #{item.order_index}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-afi-red text-white text-[10px] font-bold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      item.is_active
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    {item.is_active ? "Actif" : "Masqué"}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-slate-200 mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-heading font-bold text-sm leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleActive(item)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1.5 rounded-lg transition-colors ${
                    item.is_active
                      ? "text-slate-700 hover:text-afi-navy"
                      : "text-emerald-600 hover:text-emerald-700"
                  }`}
                  title={item.is_active ? "Masquer de l'accueil" : "Activer sur l'accueil"}
                >
                  {item.is_active ? (
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
                  onClick={() => moveOrder(item, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-afi-navy disabled:opacity-30 transition-colors"
                  title="Monter"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveOrder(item, "down")}
                  disabled={idx === items.length - 1}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-afi-navy disabled:opacity-30 transition-colors"
                  title="Descendre"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 rounded-lg bg-afi-navy text-white hover:bg-slate-800 transition-colors"
                  title="Modifier"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-afi-navy text-white flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h2 className="font-heading font-extrabold text-xl text-afi-navy">
                  {editingItem.id
                    ? "Modifier la Photo Vie Étudiante"
                    : "Nouvelle Photo Vie Étudiante"}
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
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Catégorie / Étiquette (Tag) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.tag || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, tag: e.target.value })
                    }
                    placeholder="Ex: Vie de Campus, 28+ Nationalités, Excellence Académique..."
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
                    value={editingItem.order_index || 1}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        order_index: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Titre / Légende principale *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  placeholder="Ex: Randonnée Sportive & Bien-être"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-afi-navy"
                />
              </div>

              <div>
                <FileUploadZone
                  label="Photo de Vie Étudiante *"
                  value={editingItem.image_url || ""}
                  onChange={(url) =>
                    setEditingItem({ ...editingItem, image_url: url })
                  }
                  accept="image"
                  helpText="Importez une photo de campus depuis votre ordinateur (JPG, PNG, WebP)"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem.is_active)}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        is_active: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-afi-red focus:ring-afi-red"
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    Afficher cette photo dans le carrousel de la page d&apos;accueil
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
