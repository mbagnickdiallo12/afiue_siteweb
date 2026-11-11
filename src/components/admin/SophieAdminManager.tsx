"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Search,
  RefreshCw,
  Send,
  Eye,
  Sliders,
  Database,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { type SophieCategory, type SophieKnowledgeItem, type SophieConfig } from "@/lib/services/sophie.service";
import { HandoffBeam, createSimulatedVoice, type BeamPhase } from "@/components/ui/handoff-beam";
import { SophieAvatar3D } from "@/components/sophie/SophieAvatar3D";
import { DotPattern } from "@/components/ui/dot-pattern";

const CATEGORIES: { value: SophieCategory; label: string }[] = [
  { value: "general", label: "Général & Institution" },
  { value: "formations", label: "Formations & Cursus" },
  { value: "admissions", label: "Admissions & Inscriptions" },
  { value: "frais", label: "Frais & Bourses" },
  { value: "campus", label: "Campus & Horaires" },
  { value: "vie_etudiante", label: "Vie étudiante & Stages" },
  { value: "document", label: "Document importé" },
];

const AFI_BEAM = ["#e5252f", "#ff6b6b", "#ffc2c2", "#ff4d5a", "#ff8a8a"];
const voiceLevel = createSimulatedVoice(21);

interface SophieAdminData {
  config: SophieConfig;
  knowledge: SophieKnowledgeItem[];
  ai_connected: boolean;
}

export function SophieAdminManager() {
  const [data, setData] = useState<SophieAdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"config" | "knowledge" | "upload" | "simulator">("knowledge");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Filtres connaissances
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Modal Ajout/Édition Connaissance
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SophieKnowledgeItem | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalCategory, setModalCategory] = useState<SophieCategory>("general");
  const [modalContent, setModalContent] = useState("");
  const [modalSubmitting, setModalSubmitting] = useState(false);

  // Formulaire Upload Document
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<SophieCategory>("document");
  const [uploading, setUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Simulateur de Test
  const [simMessages, setSimMessages] = useState<Array<{ role: "user" | "assistant"; content: string; sources?: string[] }>>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis Sophie en mode simulation. Posez-moi n'importe quelle question sur AFI-L'UE pour tester mes réponses et vérifier mes connaissances.",
    },
  ]);
  const [simInput, setSimInput] = useState("");
  const [simPhase, setSimPhase] = useState<BeamPhase>("idle");

  // Charger les données
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/sophie", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Erreur chargement Sophie admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Enregistrer la configuration générale
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/sophie", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.config),
      });
      if (res.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(null), 3500);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  };

  // Ajouter / Éditer une connaissance manuelle
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setModalTitle("");
    setModalCategory("general");
    setModalContent("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: SophieKnowledgeItem) => {
    setEditingItem(item);
    setModalTitle(item.title);
    setModalCategory(item.category);
    setModalContent(item.content);
    setIsModalOpen(true);
  };

  const handleSaveKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim() || !modalContent.trim()) return;
    setModalSubmitting(true);
    try {
      if (editingItem) {
        // Mise à jour
        const res = await fetch(`/api/admin/sophie/knowledge/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: modalTitle,
            category: modalCategory,
            content: modalContent,
          }),
        });
        if (res.ok) {
          const updated = await res.json();
          setData((prev) =>
            prev
              ? {
                  ...prev,
                  knowledge: prev.knowledge.map((k) => (k.id === updated.id ? updated : k)),
                }
              : null
          );
          setIsModalOpen(false);
        }
      } else {
        // Création
        const res = await fetch("/api/admin/sophie/knowledge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: modalTitle,
            category: modalCategory,
            content: modalContent,
          }),
        });
        if (res.ok) {
          const created = await res.json();
          setData((prev) =>
            prev
              ? {
                  ...prev,
                  knowledge: [created, ...prev.knowledge],
                }
              : null
          );
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Erreur sauvegarde connaissance:", err);
    } finally {
      setModalSubmitting(false);
    }
  };

  // Supprimer une connaissance
  const handleDeleteKnowledge = async (id: string, title: string) => {
    if (!confirm(`Supprimer définitivement la connaissance "${title}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/sophie/knowledge/${id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                knowledge: prev.knowledge.filter((k) => k.id !== id),
              }
            : null
        );
      }
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  // Upload d'un document
  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    setUploadFeedback(null);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("title", uploadTitle || uploadFile.name);
      formData.append("category", uploadCategory);

      const res = await fetch("/api/admin/sophie/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setUploadFeedback({
          type: "success",
          message: `Document "${result.document_title}" indexé avec succès ! ${result.chunks_created} sections ont été ajoutées aux connaissances de Sophie.`,
        });
        setUploadFile(null);
        setUploadTitle("");
        fetchData();
      } else {
        setUploadFeedback({
          type: "error",
          message: result.error || "Impossible d'extraire le document.",
        });
      }
    } catch (err) {
      setUploadFeedback({
        type: "error",
        message: "Erreur réseau lors du téléversement.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Simulateur de Test
  const handleSimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = simInput.trim();
    if (!query) return;

    const userMsg = { role: "user" as const, content: query };
    const newHistory = [...simMessages, userMsg];
    setSimMessages(newHistory);
    setSimInput("");
    setSimPhase("thinking");

    try {
      const res = await fetch("/api/sophie/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: newHistory.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setSimPhase("speaking");
        setSimMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: json.reply,
            sources: json.sources,
          },
        ]);
        setTimeout(() => setSimPhase("idle"), 2400);
      } else {
        setSimPhase("idle");
        setSimMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Erreur de réponse du serveur. Veuillez vérifier la connexion ou les logs.",
          },
        ]);
      }
    } catch {
      setSimPhase("idle");
      setSimMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erreur lors de l'appel au service Sophie.",
        },
      ]);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
        <RefreshCw className="w-8 h-8 text-afi-red animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-700">Chargement de l'agent Sophie...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-700">Impossible de charger les données de Sophie.</p>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-afi-navy text-white text-xs font-bold rounded-lg hover:bg-slate-900 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Filtrage des connaissances
  const filteredKnowledge = data.knowledge.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const manualCount = data.knowledge.filter((k) => k.source === "manual").length;
  const documentCount = data.knowledge.filter((k) => k.source === "document").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* =========================================================================
          HEADER PRINCIPAL
          ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <SophieAvatar3D size={56} />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  Sophie AI — Conseillère Virtuelle AFI-L&apos;UE
                </h1>
                {data.config.is_enabled ? (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                    Actif sur le site
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-white">
                    Désactivé
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                Sophie répond 24h/24 aux étudiants et visiteurs en s'appuyant rigoureusement sur le site officiel d'AFI-L'UE,
                les 37 formations, les frais d'inscription et les documents que vous lui transmettez ci-dessous.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                const newEnabled = !data.config.is_enabled;
                setData({ ...data, config: { ...data.config, is_enabled: newEnabled } });
                fetch("/api/admin/sophie", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ is_enabled: newEnabled }),
                });
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                data.config.is_enabled
                  ? "bg-slate-800 text-white hover:bg-slate-900"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {data.config.is_enabled ? "Mettre en pause l'agent" : "Activer Sophie sur le site"}
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Voir sur le site
            </Link>
          </div>
        </div>

        {/* =========================================================================
            KPI CARDS
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catalogue</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">37 Formations</div>
            <p className="text-xs text-slate-500 mt-1">Synchronisées en temps réel</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connaissances FAQ</span>
              <Database className="w-4 h-4 text-afi-navy" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{manualCount} fiches</div>
            <p className="text-xs text-slate-500 mt-1">Règles, bourses & campus</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Documents PDF</span>
              <FileText className="w-4 h-4 text-afi-red" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{documentCount} sections</div>
            <p className="text-xs text-slate-500 mt-1">Extraites & indexées</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Moteur d'IA</span>
              <Cpu className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-sm font-black text-slate-900 mt-2 flex items-center gap-1.5">
              {data.ai_connected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Gemini AI Connecté
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Moteur Sémantique Local
                </>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {data.ai_connected ? "Génération fluide activée" : "Sans dépendance externe"}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ONGLETS DE NAVIGATION
          ========================================================================= */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("knowledge")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "knowledge"
              ? "bg-afi-navy text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          Base de connaissances ({data.knowledge.length})
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "upload"
              ? "bg-afi-navy text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          Importer un document PDF / TXT
        </button>

        <button
          onClick={() => setActiveTab("config")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "config"
              ? "bg-afi-navy text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Configuration & Prompt
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "simulator"
              ? "bg-afi-navy text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Simulateur de test en direct
        </button>
      </div>

      {/* =========================================================================
          TAB 1 : BASE DE CONNAISSANCES
          ========================================================================= */}
      {activeTab === "knowledge" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher une règle, une formation, un frais..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-afi-navy focus:ring-1 focus:ring-afi-navy"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:border-afi-navy"
              >
                <option value="all">Toutes les catégories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-afi-red text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              Ajouter une connaissance
            </button>
          </div>

          {filteredKnowledge.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <Database className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">Aucune fiche de connaissance trouvée.</p>
              <p className="text-xs text-slate-500 mt-1">
                {searchTerm || selectedCategory !== "all"
                  ? "Modifiez vos filtres de recherche."
                  : "Cliquez sur 'Ajouter une connaissance' pour enrichir l'expertise de Sophie."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredKnowledge.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-white uppercase tracking-wider">
                        {CATEGORIES.find((c) => c.value === item.category)?.label || item.category}
                      </span>
                      {item.source === "document" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-afi-red">
                          <FileText className="w-3 h-3" />
                          {item.file_name || "Document"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                          Saisie manuelle
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">{item.content}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-400">
                    <span>Ajouté le {new Date(item.created_at).toLocaleDateString("fr-FR")}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-slate-500 hover:text-afi-navy hover:bg-slate-100 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteKnowledge(item.id, item.title)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2 : UPLOAD DE DOCUMENT
          ========================================================================= */}
      {activeTab === "upload" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Importer un document universitaire</h2>
            <p className="text-xs text-slate-500 mt-1">
              Déposez un fichier PDF (règlement pédagogique, brochure, calendrier, guide des études) ou un document texte.
              Le texte sera automatiquement extrait, découpé en sections logiques et indexé dans la base de Sophie.
            </p>
          </div>

          {uploadFeedback && (
            <div
              className={`p-4 rounded-xl text-xs font-semibold flex items-start gap-3 ${
                uploadFeedback.type === "success"
                  ? "bg-slate-900 text-white"
                  : "bg-red-700 text-white"
              }`}
            >
              {uploadFeedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-200 shrink-0 mt-0.5" />
              )}
              <span>{uploadFeedback.message}</span>
            </div>
          )}

          <form onSubmit={handleUploadDocument} className="space-y-4">
            {/* Zone de drop */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-afi-navy transition-colors bg-white">
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.txt,.md,.csv"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setUploadFile(file);
                  if (file && !uploadTitle) {
                    setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
                  }
                }}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <UploadCloud className="w-12 h-12 text-slate-400 mb-3" />
                <span className="text-xs font-bold text-slate-800">
                  {uploadFile ? uploadFile.name : "Cliquez pour sélectionner un fichier PDF ou TXT"}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Formats acceptés : PDF, TXT, Markdown (taille max recommandée : 15 Mo)
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Titre du document pour l'indexation
                </label>
                <input
                  type="text"
                  placeholder="Ex : Guide de l'étudiant 2026-2027"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-afi-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie associée</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as SophieCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:border-afi-navy"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!uploadFile || uploading}
              className="w-full py-3 bg-afi-navy text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  Extraction et indexation en cours...
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-white" />
                  Extraire le texte et enseigner à Sophie
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* =========================================================================
          TAB 3 : CONFIGURATION & PROMPT
          ========================================================================= */}
      {activeTab === "config" && (
        <form onSubmit={handleSaveConfig} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Personnalisation du comportement</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Ajustez le message d'accueil, les questions suggérées et les consignes directrices de Sophie.
              </p>
            </div>
            {saveStatus === "saved" && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Modifications enregistrées !
              </span>
            )}
            {saveStatus === "error" && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
                Erreur de sauvegarde
              </span>
            )}
          </div>

          {/* Toggle Activer */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
            <div>
              <div className="text-xs font-bold text-slate-900">Visibilité publique du chatbot</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Quand désactivé, le widget disparait complètement du site public.
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                setData({
                  ...data,
                  config: { ...data.config, is_enabled: !data.config.is_enabled },
                })
              }
              className={`w-12 h-6 rounded-full transition-colors relative ${
                data.config.is_enabled ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  data.config.is_enabled ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Message de bienvenue */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Message d'accueil initial (affiché au visiteur)
            </label>
            <textarea
              rows={3}
              value={data.config.welcome_message}
              onChange={(e) =>
                setData({
                  ...data,
                  config: { ...data.config, welcome_message: e.target.value },
                })
              }
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-afi-navy"
            />
          </div>

          {/* Suggestions rapides */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Boutons de suggestions rapides (max 6)
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Ces questions sont proposées sous forme de puces cliquables au démarrage de la conversation.
            </p>
            <div className="space-y-2">
              {data.config.suggestions.map((sug, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sug}
                    onChange={(e) => {
                      const newSug = [...data.config.suggestions];
                      newSug[idx] = e.target.value;
                      setData({ ...data, config: { ...data.config, suggestions: newSug } });
                    }}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-afi-navy"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSug = data.config.suggestions.filter((_, i) => i !== idx);
                      setData({ ...data, config: { ...data.config, suggestions: newSug } });
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {data.config.suggestions.length < 6 && (
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      config: {
                        ...data.config,
                        suggestions: [...data.config.suggestions, "Nouvelle question fréquente"],
                      },
                    })
                  }
                  className="px-3 py-1.5 text-xs font-bold text-afi-navy border border-dashed border-slate-300 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter une suggestion
                </button>
              )}
            </div>
          </div>

          {/* Prompt et consignes strictes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Consignes additionnelles de l'Université (Prompt système)
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Règles spécifiques d'orientation que Sophie doit toujours respecter (ex : mettre en valeur le programme International Leader, insister sur les cours du soir et week-end, rappeler que les candidatures se font sur /candidater).
            </p>
            <textarea
              rows={4}
              value={data.config.extra_instructions}
              onChange={(e) =>
                setData({
                  ...data,
                  config: { ...data.config, extra_instructions: e.target.value },
                })
              }
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-afi-navy"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saveStatus === "saving"}
              className="px-6 py-2.5 bg-afi-red text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {saveStatus === "saving" ? "Enregistrement..." : "Enregistrer la configuration"}
            </button>
          </div>
        </form>
      )}

      {/* =========================================================================
          TAB 4 : SIMULATEUR DE TEST EN DIRECT
          ========================================================================= */}
      {activeTab === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Chat Window */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1629] via-[#090e1c] to-[#05070f] border border-white/10 p-4 shadow-2xl flex flex-col h-[580px]">
            {/* Dot Pattern d'AFI-L'UE sur le simulateur */}
            <DotPattern
              width={20}
              height={20}
              cx={1}
              cy={1}
              cr={1}
              className="fill-white/[0.08] [mask-image:radial-gradient(420px_circle_at_center,white,transparent)] pointer-events-none"
            />

            {/* Lueur d'ambiance AFI */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[340px] h-[180px] bg-gradient-to-b from-afi-red/20 via-[#1b2754]/30 to-transparent blur-3xl opacity-80" />
            <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Header chat */}
            <div className="relative z-10 flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <SophieAvatar3D
                  size={36}
                  isThinking={simPhase === "thinking"}
                  isSpeaking={simPhase === "speaking"}
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5 font-heading">
                    Sophie AI — Test en direct
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-slate-300">Mode simulation administrateur</div>
                </div>
              </div>
              <button
                onClick={() =>
                  setSimMessages([
                    {
                      role: "assistant",
                      content: "Conversation réinitialisée. Posez une nouvelle question !",
                    },
                  ])
                }
                className="text-[11px] text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
              >
                Réinitialiser
              </button>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {simMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="text-[10px] text-slate-400 mb-1 px-1">
                    {m.role === "user" ? "Vous" : "Sophie"}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-white to-[#f1f5f9] text-slate-900 font-medium shadow-sm"
                        : "bg-gradient-to-br from-[#18233c] to-[#0e1526] text-[#f1f5f9] border border-white/10 shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-slate-300 space-y-0.5">
                        <div className="font-semibold text-afi-red">Sources mobilisées :</div>
                        {m.sources.map((s, si) => (
                          <div key={si} className="truncate">
                            • {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Composer Input without bottom contour */}
            <form onSubmit={handleSimSubmit} className="relative z-10 pt-2 mt-1">
              <HandoffBeam
                phase={simPhase}
                level={voiceLevel}
                palette={AFI_BEAM}
                intensity={0.9}
                className="rounded-2xl pointer-events-none"
              />
              <div className="relative flex items-center gap-2 bg-gradient-to-b from-[#141c30] to-[#0c1222] rounded-2xl px-3 py-2 border-0 shadow-inner">
                <input
                  type="text"
                  placeholder="Posez une question à Sophie..."
                  value={simInput}
                  onChange={(e) => setSimInput(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!simInput.trim() || simPhase === "thinking"}
                  className="w-7 h-7 rounded-full bg-afi-red text-white flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-40 shrink-0 shadow-[0_0_10px_rgba(229,37,47,0.4)]"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Info & Test Scenarios */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-afi-red" />
              Scénarios de test recommandés
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cliquez sur une question pour l'envoyer directement dans le simulateur et vérifier la précision des réponses de Sophie :
            </p>

            <div className="space-y-2">
              {[
                "Quels sont les masters disponibles en cours du soir et week-end ?",
                "Combien coûte la Licence 1 en formation initiale ?",
                "Quels sont les campus et comment contacter l'université ?",
                "Peut-on faire un master en e-learning depuis l'étranger ?",
                "Qu'est-ce que le parcours International Leader ?",
                "Existe-t-il des facilités de paiement ou des bourses ?",
              ].map((query, qi) => (
                <button
                  key={qi}
                  onClick={() => {
                    setSimInput(query);
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-afi-navy text-xs font-medium text-slate-700 hover:text-afi-navy hover:bg-slate-100 transition-all leading-snug"
                >
                  → {query}
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-white text-[11px] leading-relaxed mt-4">
              <div className="font-bold mb-1 flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Périmètre strict garanti
              </div>
              Sophie est programmée pour ne répondre que sur AFI-L'UE. Si un visiteur tente de la détourner vers des sujets externes, elle le recentre poliment sur nos programmes et admissions.
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL AJOUT / ÉDITION CONNAISSANCE
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {editingItem ? "Modifier la connaissance" : "Ajouter une nouvelle connaissance"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                Fermer
              </button>
            </div>

            <form onSubmit={handleSaveKnowledge} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Titre de la fiche</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Tenue vestimentaire et uniforme en L1/L2"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-afi-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie</label>
                <select
                  value={modalCategory}
                  onChange={(e) => setModalCategory(e.target.value as SophieCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:border-afi-navy"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contenu détaillé (faits précis)
                </label>
                <p className="text-[11px] text-slate-500 mb-1.5">
                  Rédigez des faits clairs et concis. Sophie s'appuiera sur ce texte pour formuler ses réponses.
                </p>
                <textarea
                  required
                  rows={6}
                  placeholder="Ex : Le port de l'uniforme est obligatoire du lundi au jeudi pour tous les étudiants de L1 et L2 en cours du jour..."
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-afi-navy"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="px-5 py-2 bg-afi-red text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {modalSubmitting ? "Enregistrement..." : editingItem ? "Mettre à jour" : "Ajouter à Sophie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
