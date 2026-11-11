"use client";

import { useState, useMemo } from "react";
import {
  FileCheck,
  Search,
  Download,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  X,
  Save,
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
} from "lucide-react";
import { Candidature, CandidatureStatus } from "@/types/database";

interface Props {
  initialCandidatures: Candidature[];
}

export function CandidaturesAdminManager({ initialCandidatures }: Props) {
  const [candidatures, setCandidatures] = useState<Candidature[]>(initialCandidatures);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidature | null>(null);
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCandidatures = useMemo(() => {
    return candidatures.filter((c) => {
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        c.first_name.toLowerCase().includes(q) ||
        c.last_name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.reference_code.toLowerCase().includes(q) ||
        (c.formation?.title && c.formation.title.toLowerCase().includes(q));

      return matchStatus && matchSearch;
    });
  }, [candidatures, statusFilter, search]);

  const stats = useMemo(() => {
    return {
      total: candidatures.length,
      soumis: candidatures.filter((c) => c.status === "soumis").length,
      en_revue: candidatures.filter((c) => c.status === "en_revue").length,
      admis: candidatures.filter((c) => c.status === "admis").length,
      rejete: candidatures.filter((c) => c.status === "rejete").length,
    };
  }, [candidatures]);

  const handleOpenDetail = (c: Candidature) => {
    setSelectedCandidate(c);
    setAdminNotes(c.admin_notes || "");
  };

  const handleUpdateStatus = async (id: string, newStatus: CandidatureStatus, notes?: string) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/candidatures/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: notes !== undefined ? notes : adminNotes,
          reviewed_by: "Admin Scolarité",
          reviewed_at: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de mise à jour");
      }

      const updated = data.data;
      setCandidatures((prev) => prev.map((c) => (c.id === id ? updated : c)));
      if (selectedCandidate?.id === id) {
        setSelectedCandidate(updated);
      }
      showToast(`Statut mis à jour : ${newStatus.toUpperCase()}`);
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedCandidate) return;
    await handleUpdateStatus(selectedCandidate.id, selectedCandidate.status, adminNotes);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/candidatures/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      setCandidatures((prev) => prev.filter((c) => c.id !== id));
      setDeleteConfirmId(null);
      if (selectedCandidate?.id === id) {
        setSelectedCandidate(null);
      }
      showToast("Candidature supprimée avec succès");
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Référence",
      "Date de dépôt",
      "Nom",
      "Prénom",
      "Email",
      "Téléphone",
      "Pays",
      "Ville",
      "Dernier diplôme",
      "Filière souhaitée",
      "Statut",
      "Notes administratives",
    ];

    const rows = filteredCandidatures.map((c) => [
      `"${c.reference_code}"`,
      `"${new Date(c.created_at).toLocaleDateString("fr-FR")}"`,
      `"${c.last_name}"`,
      `"${c.first_name}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      `"${c.country}"`,
      `"${c.city || ""}"`,
      `"${c.last_diploma || ""}"`,
      `"${c.formation?.title || ""}"`,
      `"${c.status}"`,
      `"${(c.admin_notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `candidatures_afi_ue_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Fichier CSV généré et téléchargé !");
  };

  const renderStatusBadge = (status: CandidatureStatus) => {
    switch (status) {
      case "soumis":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 whitespace-nowrap">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>En attente</span>
          </span>
        );
      case "en_revue":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 whitespace-nowrap">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <span>En examen</span>
          </span>
        );
      case "admis":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Admis</span>
          </span>
        );
      case "rejete":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 whitespace-nowrap">
            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Non retenu</span>
          </span>
        );
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
            Gestion des Candidatures
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Examinez les dossiers d&apos;inscription, attribuez des statuts et téléchargez les listes officielles.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold shadow-md shadow-afi-navy/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          <span>Exporter en CSV</span>
        </button>
      </div>

      {/* KPI Overview Cards (Style Moderne, Épuré Dashboard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Total Dossiers */}
        <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                <FileCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                Global
              </span>
            </div>
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {stats.total}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Total Dossiers
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Candidatures enregistrées
              </div>
            </div>
          </div>
        </div>

        {/* 2. En Attente */}
        <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-slate-100 px-2.5 py-1 rounded-full">
                À traiter
              </span>
            </div>
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-amber-600 tracking-tight">
                {stats.soumis}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                En Attente
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Nouveaux dossiers soumis
              </div>
            </div>
          </div>
        </div>

        {/* 3. En Examen */}
        <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-slate-100 px-2.5 py-1 rounded-full">
                En cours
              </span>
            </div>
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-blue-600 tracking-tight">
                {stats.en_revue}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                En Examen
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Commission pédagogique
              </div>
            </div>
          </div>
        </div>

        {/* 4. Admis */}
        <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-slate-100 px-2.5 py-1 rounded-full">
                Validé
              </span>
            </div>
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-emerald-600 tracking-tight">
                {stats.admis}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Admis
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Candidats retenus
              </div>
            </div>
          </div>
        </div>

        {/* 5. Non Retenus */}
        <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                <XCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-slate-100 px-2.5 py-1 rounded-full">
                Rejet
              </span>
            </div>
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-red-600 tracking-tight">
                {stats.rejete}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1">
                Non Retenus
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Dossiers non validés
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Status Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par candidat, code réf, email, téléphone ou filière..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-afi-navy/20 focus:border-afi-navy transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="inline-flex bg-slate-100 p-1 rounded-xl overflow-x-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "all"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Tous ({stats.total})
          </button>
          <button
            onClick={() => setStatusFilter("soumis")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "soumis"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            En attente ({stats.soumis})
          </button>
          <button
            onClick={() => setStatusFilter("en_revue")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "en_revue"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            En examen ({stats.en_revue})
          </button>
          <button
            onClick={() => setStatusFilter("admis")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "admis"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Admis ({stats.admis})
          </button>
          <button
            onClick={() => setStatusFilter("rejete")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "rejete"
                ? "bg-red-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Refusés ({stats.rejete})
          </button>
        </div>
      </div>

      {/* Candidatures Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1020px] text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5 whitespace-nowrap w-[150px]">Référence / Date</th>
                <th className="px-5 py-3.5 whitespace-nowrap min-w-[240px]">Candidat</th>
                <th className="px-5 py-3.5 whitespace-nowrap min-w-[260px]">Filière Choisie</th>
                <th className="px-5 py-3.5 whitespace-nowrap min-w-[180px]">Origine & Diplôme</th>
                <th className="px-5 py-3.5 whitespace-nowrap w-[140px]">Statut</th>
                <th className="px-5 py-3.5 text-right whitespace-nowrap w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidatures.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    Aucune candidature trouvée pour ce filtre.
                  </td>
                </tr>
              ) : (
                filteredCandidatures.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-900 text-xs tracking-tight whitespace-nowrap">
                        {c.reference_code}
                      </div>
                      <div className="text-[11px] text-slate-400 whitespace-nowrap mt-0.5">
                        {new Date(c.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900 whitespace-nowrap">
                        {c.first_name} {c.last_name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono whitespace-nowrap flex items-center gap-1.5 mt-0.5">
                        <span>{c.email}</span>
                        {c.phone && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span>{c.phone}</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap max-w-[320px]">
                      <div
                        className="font-bold text-slate-800 text-xs truncate max-w-[290px] whitespace-nowrap"
                        title={c.formation?.title || "Filière non spécifiée"}
                      >
                        {c.formation?.title || "Filière non spécifiée"}
                      </div>
                      <div className="text-[10px] text-afi-red font-bold uppercase whitespace-nowrap mt-0.5">
                        {c.formation?.level || "Licence"}
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <div
                        className="text-slate-800 font-medium text-xs whitespace-nowrap truncate max-w-[190px]"
                        title={c.last_diploma || "Baccalauréat"}
                      >
                        {c.last_diploma || "Baccalauréat"}
                      </div>
                      <div className="text-[11px] text-slate-400 whitespace-nowrap mt-0.5">
                        {c.city || "Dakar"}, {c.country || "Sénégal"}
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {renderStatusBadge(c.status)}
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2 whitespace-nowrap">
                        <a
                          href={`/api/candidatures/${c.id}/pdf`}
                          download
                          title="Télécharger le Dossier PDF Rempli"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleOpenDetail(c)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-afi-navy hover:bg-afi-navy-800 text-white font-bold text-xs transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Examiner</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(c.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Supprimer la candidature
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Êtes-vous sûr de vouloir supprimer définitivement cette candidature ? Toutes les informations du dossier seront purgées.
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

      {/* Candidate File Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-afi-navy bg-slate-100 px-2.5 py-1 rounded-lg">
                  {selectedCandidate.reference_code}
                </span>
                <h3 className="font-heading font-black text-xl text-slate-900 mt-1">
                  {selectedCandidate.first_name} {selectedCandidate.last_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Télécharger le PDF officiel rempli */}
            <div className="pt-4">
              <a
                href={`/api/candidatures/${selectedCandidate.id}/pdf`}
                download
                className="w-full py-3 px-5 rounded-2xl bg-afi-red hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-afi-red/20 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Dossier de Candidature (PDF Officiel Rempli)</span>
              </a>
            </div>

            {/* Quick Status Control Buttons */}
            <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="text-[11px] font-bold uppercase text-slate-500 mb-2">
                Décision & Statut du dossier :
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleUpdateStatus(selectedCandidate.id, "soumis")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCandidate.status === "soumis"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-amber-50"
                  }`}
                >
                  En attente
                </button>
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleUpdateStatus(selectedCandidate.id, "en_revue")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCandidate.status === "en_revue"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                  }`}
                >
                  En examen
                </button>
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleUpdateStatus(selectedCandidate.id, "admis")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCandidate.status === "admis"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50"
                  }`}
                >
                  Admis (Validé)
                </button>
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleUpdateStatus(selectedCandidate.id, "rejete")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCandidate.status === "rejete"
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-red-50"
                  }`}
                >
                  Non retenu
                </button>
              </div>
            </div>

            {/* Dossier Details Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <Mail className="w-3 h-3" /> Email
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-1 truncate">
                    {selectedCandidate.email}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <Phone className="w-3 h-3" /> Téléphone
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-1">
                    {selectedCandidate.phone}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> Localisation
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-1">
                    {selectedCandidate.city}, {selectedCandidate.country}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> Date de Naissance
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-1">
                    {selectedCandidate.birth_date} (à {selectedCandidate.birth_place || "N/A"})
                  </div>
                </div>
              </div>

              {/* Chosen Formation */}
              <div className="p-4 bg-afi-navy text-white rounded-2xl">
                <div className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-white" /> Programme sollicité
                </div>
                <div className="font-heading font-black text-white text-sm mt-1">
                  {selectedCandidate.formation?.title || "Formation choisie"}
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Niveau : <span className="font-bold uppercase text-amber-400">{selectedCandidate.formation?.level || "Licence"}</span> &bull; Session : {selectedCandidate.session_academic_year}
                </div>
              </div>

              {/* Academic Background */}
              <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" /> Antécédents académiques
                </div>
                <div className="text-xs text-slate-700 mt-1">
                  Dernier diplôme : <span className="font-bold text-slate-900">{selectedCandidate.last_diploma}</span>
                </div>
                <div className="text-xs text-slate-700 mt-0.5">
                  Établissement précédent : <span className="font-bold text-slate-900">{selectedCandidate.previous_school || "N/A"}</span>
                </div>
              </div>

              {/* Admin Evaluation Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes d&apos;évaluation et observations administratives
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Ajouter des notes internes sur le dossier du candidat..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-afi-navy/20 leading-relaxed"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Sauvegarder les notes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
