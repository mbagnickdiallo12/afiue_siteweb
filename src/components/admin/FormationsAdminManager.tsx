"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  GraduationCap,
  Sparkles,
  X,
  Save,
  AlertCircle,
  Copy,
  Star,
  BookOpen,
  Briefcase,
  Coins,
  FileText,
  Layers,
  ArrowUp,
  ArrowDown,
  Download,
  Globe,
  ChevronDown,
  SlidersHorizontal,
  Settings2,
  Check,
  Building,
} from "lucide-react";
import {
  Formation,
  ProgramBlock,
  InternationalLeaderInfo,
} from "@/types/database";
import {
  DomainConfig,
  GradeConfig,
  PricingGridConfig,
} from "@/lib/services/cms-store";
import { FileUploadZone } from "@/components/admin/FileUploadZone";

interface Props {
  initialFormations: Formation[];
  initialDomains?: DomainConfig[];
  initialGrades?: GradeConfig[];
  initialPricingGrids?: PricingGridConfig[];
}

type EditorTab =
  | "general"
  | "pedagogie"
  | "programme"
  | "admissions_debouches"
  | "tarifs_seo";

type MainSubView = "catalogue" | "domains" | "pricing" | "grades";

const STUDY_MODE_OPTIONS: { value: string; label: string }[] = [
  { value: "initiale", label: "Formation Initiale (Cours du Jour)" },
  { value: "cours_du_soir", label: "Formation Continue (Cours du Soir)" },
  { value: "weekend", label: "Cours du Week-end" },
  { value: "e_learning", label: "Formation à Distance (E-Learning)" },
];

export function FormationsAdminManager({
  initialFormations,
  initialDomains = [],
  initialGrades = [],
  initialPricingGrids = [],
}: Props) {
  const [formations, setFormations] = useState<Formation[]>(initialFormations);
  const [domainsConfig, setDomainsConfig] =
    useState<DomainConfig[]>(initialDomains);
  const [gradesConfig, setGradesConfig] =
    useState<GradeConfig[]>(initialGrades);
  const [pricingGridsConfig, setPricingGridsConfig] =
    useState<PricingGridConfig[]>(initialPricingGrids);

  // Sub-view selector: catalogue vs configuration
  const [activeSubView, setActiveSubView] = useState<MainSubView>("catalogue");

  // Catalogue Filters
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [domaineFilter, setDomaineFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Formation Editor Modal
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>("general");
  const [activeItem, setActiveItem] = useState<Partial<Formation> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Inputs for adding items in dynamic lists
  const [newAdmissionItem, setNewAdmissionItem] = useState("");
  const [newCareerItem, setNewCareerItem] = useState("");
  const [newExtraFeeItem, setNewExtraFeeItem] = useState("");

  // Domain Config Editor state
  const [editingDomain, setEditingDomain] = useState<DomainConfig | null>(null);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);

  // Grade Config Editor state
  const [editingGrade, setEditingGrade] = useState<GradeConfig | null>(null);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  // Pricing Grid Editor state
  const [editingPricingGrid, setEditingPricingGrid] =
    useState<PricingGridConfig | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [newPricingExtraFeeItem, setNewPricingExtraFeeItem] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 4 Official Domains extracted strictly from configuration (never duplicated or mixed case)
  const availableDomains = useMemo(() => {
    if (domainsConfig && domainsConfig.length > 0) {
      return domainsConfig
        .filter((d) => d.is_active)
        .sort((a, b) => a.order_index - b.order_index);
    }
    return [
      {
        id: "22222222-2222-2222-2222-222222222201",
        code: "SEG",
        name: "Sciences Économiques et Gestion",
        slug: "sciences-economiques-et-de-gestion",
        short_description: "Banque, Finance, Audit, Comptabilité, Management",
        order_index: 1,
        is_active: true,
      },
      {
        id: "22222222-2222-2222-2222-222222222202",
        code: "SJP",
        name: "Sciences Juridiques, Politiques et de l'Administration",
        slug: "sciences-juridiques-politiques-et-de-ladministration",
        short_description: "Droit des Affaires, Fiscalité, Administration",
        order_index: 2,
        is_active: true,
      },
      {
        id: "22222222-2222-2222-2222-222222222203",
        code: "ST",
        name: "Sciences et Technologies",
        slug: "sciences-et-technologies",
        short_description: "Génie Logiciel, IA, Big Data, Réseaux",
        order_index: 3,
        is_active: true,
      },
      {
        id: "22222222-2222-2222-2222-222222222204",
        code: "SHS",
        name: "Sciences de l'Homme et de la Société",
        slug: "sciences-de-lhomme-et-de-la-societe",
        short_description: "Langues Étrangères Appliquées, Communication",
        order_index: 4,
        is_active: true,
      },
    ];
  }, [domainsConfig]);

  const filteredFormations = useMemo(() => {
    return formations.filter((f) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.slug.toLowerCase().includes(q) ||
        (f.mention && f.mention.toLowerCase().includes(q)) ||
        (f.specialty && f.specialty.toLowerCase().includes(q)) ||
        (f.domaine && f.domaine.toLowerCase().includes(q));

      const matchLevel =
        levelFilter === "all" ||
        (levelFilter === "licence" && f.level === "licence") ||
        (levelFilter === "master" && f.level === "master");

      const matchDomaine =
        domaineFilter === "all" ||
        (f.domaine && f.domaine.toLowerCase() === domaineFilter.toLowerCase());

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && f.is_active) ||
        (statusFilter === "draft" && !f.is_active) ||
        (statusFilter === "featured" && f.is_featured);

      return matchSearch && matchLevel && matchDomaine && matchStatus;
    });
  }, [formations, search, levelFilter, domaineFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = formations.length;
    const licences = formations.filter((f) => f.level === "licence").length;
    const masters = formations.filter((f) => f.level === "master").length;
    const active = formations.filter((f) => f.is_active).length;
    const featured = formations.filter((f) => f.is_featured).length;
    return { total, licences, masters, active, featured };
  }, [formations]);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Persistence of dynamic configuration (domains, grades, pricing grids)
  const saveConfigsToBackend = async (patch: {
    domains?: DomainConfig[];
    grades?: GradeConfig[];
    pricingGrids?: PricingGridConfig[];
  }) => {
    try {
      const res = await fetch("/api/admin/formations/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de sauvegarde de configuration");
      }
      return data.data;
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
      return null;
    }
  };

  const handleOpenCreate = () => {
    setActiveTab("general");
    const defaultDom = availableDomains[0]?.name || "Sciences Économiques et Gestion";
    const defaultGrade =
      gradesConfig.find((g) => g.level === "licence")?.name ||
      "Licence (Bac+3)";
    const defaultPricing = pricingGridsConfig.find(
      (p) => p.level === "licence"
    );

    setActiveItem({
      title: "",
      slug: "",
      level: "licence",
      grade: defaultGrade,
      domaine: defaultDom,
      mention: "",
      specialty: "",
      duration_years: 3,
      duration_label: "3 ans (6 semestres – 180 crédits ECTS)",
      credits_ects: 180,
      tuition_fees_local: defaultPricing?.annual_fee_local || 920000,
      tuition_fees_international:
        defaultPricing?.annual_fee_international || 1120000,
      tuition_summary:
        "Inscription : 170 000 FCFA • Mensualité : dès 70 000 FCFA (Soir) / 75 000 à 85 000 FCFA (Jour) / 90 000 FCFA (E-Learning)",
      tuition_tiers: defaultPricing?.tiers || [],
      study_modes: ["initiale", "cours_du_soir", "weekend", "e_learning"],
      short_description: "",
      description: "",
      objectives: "",
      curriculum: "",
      program_blocks: [
        {
          title: "UE 1 : Enseignements Fondamentaux",
          items: ["Introduction au domaine", "Méthodologie universitaire"],
        },
      ],
      admission_conditions_list: [
        "Titulaire du Baccalauréat (toutes séries éligibles) ou équivalent reconnu",
        "Étude du dossier académique et entretien de motivation",
      ],
      admission_requirements: "",
      career_opportunities_list: [
        "Cadre opérationnel en entreprise",
        "Consultant junior",
      ],
      career_opportunities: "",
      extra_fees: [
        "Frais de soutenance (Licence 3) : 50 000 FCFA",
        "Tenue vestimentaire obligatoire (Licence 1 Jour) : 50 000 FCFA",
      ],
      brochure_url: "/brochures/offre-de-formation-2026-2027.pdf",
      international_leader: null,
      meta_title: "",
      meta_description: "",
      is_featured: false,
      is_active: true,
      order_index: formations.length + 1,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (item: Formation) => {
    setActiveTab("general");
    setActiveItem({
      ...item,
      study_modes: item.study_modes || [
        "initiale",
        "cours_du_soir",
        "weekend",
        "e_learning",
      ],
      program_blocks: item.program_blocks
        ? item.program_blocks.map((b) => ({ ...b, items: [...b.items] }))
        : [],
      admission_conditions_list: item.admission_conditions_list
        ? [...item.admission_conditions_list]
        : item.admission_requirements
        ? item.admission_requirements.split("\n").filter(Boolean)
        : [],
      career_opportunities_list: item.career_opportunities_list
        ? [...item.career_opportunities_list]
        : item.career_opportunities
        ? item.career_opportunities
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      extra_fees: item.extra_fees ? [...item.extra_fees] : [],
    });
    setIsEditing(true);
  };

  const handleApplyPricingGrid = (gridId: string) => {
    const grid = pricingGridsConfig.find((g) => g.id === gridId);
    if (!grid || !activeItem) return;

    setActiveItem({
      ...activeItem,
      tuition_fees_local: grid.annual_fee_local,
      tuition_fees_international: grid.annual_fee_international,
      tuition_tiers: [...grid.tiers],
      extra_fees: grid.extra_fees ? [...grid.extra_fees] : (activeItem.extra_fees || []),
      tuition_summary: `Inscription : ${grid.registration_fee.toLocaleString(
        "fr-FR"
      )} FCFA • Mensualité : dès ${grid.monthly_fee.toLocaleString(
        "fr-FR"
      )} FCFA / mois`,
    });
    showToast(`Grille "${grid.name}" appliquée à la formation !`);
  };

  const handleApplyGrade = (gradeId: string) => {
    const grade = gradesConfig.find((g) => g.id === gradeId);
    if (!grade || !activeItem) return;

    const isLic = grade.level === "licence";
    setActiveItem({
      ...activeItem,
      grade: grade.name,
      level: grade.level,
      duration_years: grade.duration_years,
      credits_ects: grade.default_ects,
      duration_label: `${grade.duration_years} ans (${
        grade.duration_years * 2
      } semestres – ${grade.default_ects} crédits ECTS)`,
    });
    showToast(`Grade "${grade.name}" appliqué !`);
  };

  const handleDuplicate = async (item: Formation) => {
    try {
      const copyTitle = `${item.title} (Copie)`;
      const copySlug = `${item.slug}-copie-${Date.now().toString().slice(-4)}`;
      const payload: Partial<Formation> = {
        ...item,
        id: undefined,
        title: copyTitle,
        slug: copySlug,
        is_active: false,
        order_index: formations.length + 1,
      };

      const res = await fetch("/api/admin/formations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la duplication");
      }
      setFormations((prev) => [data.data, ...prev]);
      showToast(`Formation dupliquée : ${copyTitle}`);
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    }
  };

  const handleQuickToggleStatus = async (
    item: Formation,
    field: "is_active" | "is_featured"
  ) => {
    try {
      const updatedPayload = {
        ...item,
        [field]: !item[field],
      };
      const res = await fetch(`/api/admin/formations/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de mise à jour");
      }
      setFormations((prev) =>
        prev.map((f) => (f.id === item.id ? data.data : f))
      );
      showToast(
        field === "is_active"
          ? data.data.is_active
            ? "Formation publiée sur le site"
            : "Formation passée en brouillon"
          : data.data.is_featured
          ? "Formation mise en avant sur l'accueil"
          : "Retirée de la mise en avant"
      );
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem || !activeItem.title) return;

    setIsSaving(true);
    try {
      const slug = activeItem.slug || generateSlug(activeItem.title);
      const careerOpportunitiesText =
        activeItem.career_opportunities_list &&
        activeItem.career_opportunities_list.length > 0
          ? activeItem.career_opportunities_list.join(", ")
          : activeItem.career_opportunities || "";

      const admissionRequirementsText =
        activeItem.admission_conditions_list &&
        activeItem.admission_conditions_list.length > 0
          ? activeItem.admission_conditions_list.join("\n")
          : activeItem.admission_requirements || "";

      const payload: Partial<Formation> = {
        ...activeItem,
        slug,
        career_opportunities: careerOpportunitiesText,
        admission_requirements: admissionRequirementsText,
      };

      const url = activeItem.id
        ? `/api/admin/formations/${activeItem.id}`
        : `/api/admin/formations`;
      const method = activeItem.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur de sauvegarde");
      }

      const savedFormation: Formation = data.data;

      if (activeItem.id) {
        setFormations((prev) =>
          prev.map((f) => (f.id === savedFormation.id ? savedFormation : f))
        );
        showToast("Formation mise à jour avec succès !");
      } else {
        setFormations((prev) => [savedFormation, ...prev]);
        showToast("Nouvelle formation créée avec succès !");
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
      const res = await fetch(`/api/admin/formations/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      setFormations((prev) => prev.filter((f) => f.id !== id));
      setDeleteConfirmId(null);
      showToast("Formation supprimée du catalogue");
    } catch (err: any) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Ordre",
      "Intitulé",
      "Niveau",
      "Domaine",
      "Mention",
      "Durée",
      "Crédits ECTS",
      "Frais Locaux (FCFA)",
      "Statut",
      "Slug",
    ];
    const rows = filteredFormations.map((f) => [
      f.order_index ?? 1,
      `"${f.title.replace(/"/g, '""')}"`,
      f.level.toUpperCase(),
      `"${(f.domaine || "").replace(/"/g, '""')}"`,
      `"${(f.mention || "").replace(/"/g, '""')}"`,
      `"${f.duration_label || `${f.duration_years} ans`}"`,
      f.credits_ects ?? 180,
      f.tuition_fees_local ?? 0,
      f.is_active ? "Publié" : "Brouillon",
      `"/${f.slug}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute(
      "download",
      `catalogue_formations_afi_ue_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Catalogue exporté en CSV !");
  };

  const toggleStudyMode = (mode: string) => {
    if (!activeItem) return;
    const current = activeItem.study_modes || [];
    const exists = current.includes(mode);
    const next = exists
      ? current.filter((m) => m !== mode)
      : [...current, mode];
    setActiveItem({ ...activeItem, study_modes: next });
  };

  const addProgramBlock = () => {
    if (!activeItem) return;
    const blocks = activeItem.program_blocks || [];
    const newBlock: ProgramBlock = {
      title: `UE ${blocks.length + 1} : Nouvelle Unité d'Enseignement`,
      items: ["Nouvelle matière"],
    };
    setActiveItem({
      ...activeItem,
      program_blocks: [...blocks, newBlock],
    });
  };

  const updateProgramBlock = (
    idx: number,
    patch: Partial<ProgramBlock>
  ) => {
    if (!activeItem || !activeItem.program_blocks) return;
    const next = activeItem.program_blocks.map((b, i) =>
      i === idx ? { ...b, ...patch } : b
    );
    setActiveItem({ ...activeItem, program_blocks: next });
  };

  const removeProgramBlock = (idx: number) => {
    if (!activeItem || !activeItem.program_blocks) return;
    setActiveItem({
      ...activeItem,
      program_blocks: activeItem.program_blocks.filter((_, i) => i !== idx),
    });
  };

  const moveProgramBlock = (idx: number, direction: "up" | "down") => {
    if (!activeItem || !activeItem.program_blocks) return;
    const blocks = [...activeItem.program_blocks];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const temp = blocks[idx];
    blocks[idx] = blocks[targetIdx];
    blocks[targetIdx] = temp;
    setActiveItem({ ...activeItem, program_blocks: blocks });
  };

  const addSubjectToBlock = (blockIdx: number) => {
    if (!activeItem || !activeItem.program_blocks) return;
    const blocks = activeItem.program_blocks.map((b, i) =>
      i === blockIdx ? { ...b, items: [...b.items, ""] } : b
    );
    setActiveItem({ ...activeItem, program_blocks: blocks });
  };

  const updateSubjectInBlock = (
    blockIdx: number,
    subjIdx: number,
    value: string
  ) => {
    if (!activeItem || !activeItem.program_blocks) return;
    const blocks = activeItem.program_blocks.map((b, i) => {
      if (i !== blockIdx) return b;
      const items = b.items.map((item, j) => (j === subjIdx ? value : item));
      return { ...b, items };
    });
    setActiveItem({ ...activeItem, program_blocks: blocks });
  };

  const removeSubjectFromBlock = (blockIdx: number, subjIdx: number) => {
    if (!activeItem || !activeItem.program_blocks) return;
    const blocks = activeItem.program_blocks.map((b, i) => {
      if (i !== blockIdx) return b;
      return { ...b, items: b.items.filter((_, j) => j !== subjIdx) };
    });
    setActiveItem({ ...activeItem, program_blocks: blocks });
  };

  // Domain Management Handlers
  const handleSaveDomain = async (domain: DomainConfig) => {
    const existingIdx = domainsConfig.findIndex((d) => d.id === domain.id);
    let next: DomainConfig[];
    if (existingIdx >= 0) {
      next = domainsConfig.map((d) => (d.id === domain.id ? domain : d));
    } else {
      next = [...domainsConfig, domain];
    }
    const res = await saveConfigsToBackend({ domains: next });
    if (res?.domains) {
      setDomainsConfig(res.domains);
      setIsDomainModalOpen(false);
      setEditingDomain(null);
      showToast("Domaine enregistré avec succès !");
    }
  };

  const handleDeleteDomain = async (id: string) => {
    if (domainsConfig.length <= 1) {
      alert("Vous devez conserver au moins un domaine.");
      return;
    }
    const next = domainsConfig.filter((d) => d.id !== id);
    const res = await saveConfigsToBackend({ domains: next });
    if (res?.domains) {
      setDomainsConfig(res.domains);
      showToast("Domaine supprimé de la configuration.");
    }
  };

  // Grade Management Handlers
  const handleSaveGrade = async (grade: GradeConfig) => {
    const existingIdx = gradesConfig.findIndex((g) => g.id === grade.id);
    let next: GradeConfig[];
    if (existingIdx >= 0) {
      next = gradesConfig.map((g) => (g.id === grade.id ? grade : g));
    } else {
      next = [...gradesConfig, grade];
    }
    const res = await saveConfigsToBackend({ grades: next });
    if (res?.grades) {
      setGradesConfig(res.grades);
      setIsGradeModalOpen(false);
      setEditingGrade(null);
      showToast("Grade académique enregistré !");
    }
  };

  const handleDeleteGrade = async (id: string) => {
    if (gradesConfig.length <= 1) {
      alert("Vous devez conserver au moins un grade.");
      return;
    }
    const next = gradesConfig.filter((g) => g.id !== id);
    const res = await saveConfigsToBackend({ grades: next });
    if (res?.grades) {
      setGradesConfig(res.grades);
      showToast("Grade supprimé.");
    }
  };

  // Pricing Grid Management Handlers
  const handleSavePricingGrid = async (grid: PricingGridConfig) => {
    const existingIdx = pricingGridsConfig.findIndex((p) => p.id === grid.id);
    let next: PricingGridConfig[];
    if (existingIdx >= 0) {
      next = pricingGridsConfig.map((p) => (p.id === grid.id ? grid : p));
    } else {
      next = [...pricingGridsConfig, grid];
    }
    const res = await saveConfigsToBackend({ pricingGrids: next });
    if (res?.pricingGrids) {
      setPricingGridsConfig(res.pricingGrids);
      setIsPricingModalOpen(false);
      setEditingPricingGrid(null);
      showToast("Grille tarifaire enregistrée !");
    }
  };

  const handleDeletePricingGrid = async (id: string) => {
    if (pricingGridsConfig.length <= 1) {
      alert("Vous devez conserver au moins une grille tarifaire.");
      return;
    }
    const next = pricingGridsConfig.filter((p) => p.id !== id);
    const res = await saveConfigsToBackend({ pricingGrids: next });
    if (res?.pricingGrids) {
      setPricingGridsConfig(res.pricingGrids);
      showToast("Grille tarifaire supprimée.");
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

      {/* Header with Sub-view navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Gestion des Formations & Paramètres Académiques
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez le catalogue des filières ainsi que les sous-options dynamiques (4 Domaines, Grilles tarifaires, Grades académiques).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exporter CSV</span>
          </button>

          <button
            onClick={handleOpenCreate}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-afi-red hover:bg-afi-red-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Formation</span>
          </button>
        </div>
      </div>

      {/* Sub-view Navigation Pills */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubView("catalogue")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubView === "catalogue"
              ? "bg-afi-navy text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Catalogue des Formations ({formations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubView("domains")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubView === "domains"
              ? "bg-afi-navy text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Nos 4 Domaines ({availableDomains.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubView("pricing")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubView === "pricing"
              ? "bg-afi-navy text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>Grilles Tarifaires ({pricingGridsConfig.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubView("grades")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeSubView === "grades"
              ? "bg-afi-navy text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Grades Académiques ({gradesConfig.length})</span>
        </button>
      </div>

      {/* VIEW 1: CATALOGUE DES FORMATIONS */}
      {activeSubView === "catalogue" && (
        <div className="space-y-6">
          {/* KPI Overview Cards (Style Moderne, Épuré Dashboard) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Total Catalogue */}
            <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                    <BookOpen className="w-4 h-4" />
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
                    Total Catalogue
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    Toutes filières confondues
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Licences (Bac+3) */}
            <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-afi-navy text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-afi-navy bg-slate-100 px-2.5 py-1 rounded-full">
                    Bac+3
                  </span>
                </div>
                <div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                    {stats.licences}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    Licences (Bac+3)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    Cursus premier cycle
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Masters (Bac+5) */}
            <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-afi-red text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-afi-red bg-slate-100 px-2.5 py-1 rounded-full">
                    Bac+5
                  </span>
                </div>
                <div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-afi-red tracking-tight">
                    {stats.masters}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    Masters (Bac+5)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    Cursus second cycle
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Publiées en ligne */}
            <div className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-slate-100 px-2.5 py-1 rounded-full">
                    Actif
                  </span>
                </div>
                <div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-emerald-600 tracking-tight">
                    {stats.active}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    Publiées en ligne
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    Visibles sur le portail
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Bar: Search & Filters */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par intitulé, mention, spécialité, domaine ou slug..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-afi-navy transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Level Filter */}
              <div className="inline-flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setLevelFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    levelFilter === "all"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={() => setLevelFilter("licence")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    levelFilter === "licence"
                      ? "bg-afi-navy text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Licence
                </button>
                <button
                  type="button"
                  onClick={() => setLevelFilter("master")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    levelFilter === "master"
                      ? "bg-afi-red text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Master
                </button>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Publiées uniquement</option>
                  <option value="draft">Brouillons uniquement</option>
                  <option value="featured">Mises en avant (Accueil)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Domaine Select — Strictly our 4 official domains */}
              <div className="relative">
                <select
                  value={domaineFilter}
                  onChange={(e) => setDomaineFilter(e.target.value)}
                  className="appearance-none pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer max-w-[260px]"
                >
                  <option value="all">Tous les domaines (4)</option>
                  {availableDomains.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Formations Table (Scrollable on restricted height) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <span className="text-xs font-bold text-slate-700">
                {filteredFormations.length} filière
                {filteredFormations.length > 1 ? "s" : ""} affichée
                {filteredFormations.length > 1 ? "s" : ""}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Synchronisation en direct
              </span>
            </div>

            <div className="overflow-x-auto max-h-[540px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-100 text-[11px] font-bold uppercase text-slate-700 border-b border-slate-200 shadow-xs">
                  <tr>
                    <th className="px-6 py-3.5 bg-slate-100">Filière</th>
                    <th className="px-4 py-3.5 bg-slate-100">Niveau</th>
                    <th className="px-4 py-3.5 bg-slate-100">Domaine</th>
                    <th className="px-4 py-3.5 bg-slate-100">Statut</th>
                    <th className="px-6 py-3.5 text-right bg-slate-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredFormations.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        Aucune formation ne correspond à vos critères de recherche.
                      </td>
                    </tr>
                  ) : (
                    filteredFormations.map((f) => {
                      return (
                        <tr
                          key={f.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900 max-w-md line-clamp-1">
                              {f.title}
                            </div>
                            {f.mention && (
                              <div className="text-[11px] text-slate-500 font-medium truncate max-w-md mt-0.5">
                                {f.mention}
                              </div>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                f.level === "licence"
                                  ? "bg-afi-navy text-white"
                                  : "bg-afi-red text-white"
                              }`}
                            >
                              {f.level}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-slate-700 font-medium max-w-[220px] truncate">
                            {f.domaine || "Général"}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuickToggleStatus(f, "is_active")
                              }
                              title="Cliquer pour basculer Publié / Brouillon"
                              className="cursor-pointer group"
                            >
                              {f.is_active ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:underline">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Publié</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 group-hover:underline">
                                  <XCircle className="w-4 h-4 text-slate-400" />
                                  <span>Brouillon</span>
                                </span>
                              )}
                            </button>
                          </td>

                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <a
                                href={`/formations/${f.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Voir la page publique"
                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>

                              <button
                                type="button"
                                onClick={() => handleDuplicate(f)}
                                title="Dupliquer cette formation"
                                className="p-1.5 rounded-lg text-slate-500 hover:text-afi-navy transition-colors cursor-pointer"
                              >
                                <Copy className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenEdit(f)}
                                title="Modifier tous les détails"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-afi-navy hover:bg-afi-navy-800 text-white font-bold text-[11px] transition-colors cursor-pointer"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Éditer</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(f.id)}
                                title="Supprimer la formation"
                                className="p-1.5 rounded-lg text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pied de liste avec indicateur de défilement */}
            <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
              <span>
                Faites défiler le tableau pour parcourir l&apos;ensemble du catalogue ({filteredFormations.length} filière{filteredFormations.length > 1 ? "s" : ""})
              </span>
              <span className="font-bold text-slate-700">
                {filteredFormations.length} résultats
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: GESTION DES 4 DOMAINES ACADEMIQUES */}
      {activeSubView === "domains" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
            <div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                Pôles Académiques Officiels d&apos;AFI-L&apos;UE
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Configurez les 4 grands domaines qui structurent l&apos;ensemble de l&apos;offre de formation et le méga-menu du site.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingDomain({
                  id: `dom-${Date.now()}`,
                  code: "",
                  name: "",
                  slug: "",
                  short_description: "",
                  order_index: availableDomains.length + 1,
                  is_active: true,
                });
                setIsDomainModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Domaine</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableDomains.map((domain) => {
              const countFormations = formations.filter(
                (f) =>
                  f.domaine &&
                  f.domaine.toLowerCase() === domain.name.toLowerCase()
              ).length;
              return (
                <div
                  key={domain.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-afi-navy text-white flex items-center justify-center font-bold text-xs font-mono">
                        {domain.code || "DOM"}
                      </span>
                      <div>
                        <h4 className="font-heading font-black text-sm text-slate-900">
                          {domain.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-mono">
                          /{domain.slug}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-800 text-white">
                      #{domain.order_index}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {domain.short_description || "Aucune description renseignée."}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {countFormations} formation{countFormations > 1 ? "s" : ""} rattachée{countFormations > 1 ? "s" : ""}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingDomain({ ...domain });
                          setIsDomainModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="Modifier le domaine"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDomain(domain.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:text-red-800 cursor-pointer"
                        title="Supprimer le domaine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: GESTION DES GRILLES TARIFAIRES */}
      {activeSubView === "pricing" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
            <div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                Grilles Tarifaires Officielles (Session 2026-2027)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Définissez les modèles de frais de scolarité, montants des mensualités et modalités applicables aux formations en un clic.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingPricingGrid({
                  id: `grid-${Date.now()}`,
                  name: "Nouvelle Grille Tarifaire",
                  level: "licence",
                  registration_fee: 170000,
                  monthly_fee: 75000,
                  annual_fee_local: 920000,
                  annual_fee_international: 1120000,
                  extra_fees: [],
                  tiers: [],
                });
                setNewPricingExtraFeeItem("");
                setIsPricingModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle Grille</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pricingGridsConfig.map((grid) => (
              <div
                key={grid.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase mb-1.5 ${
                        grid.level === "licence"
                          ? "bg-afi-navy text-white"
                          : "bg-afi-red text-white"
                      }`}
                    >
                      {grid.level}
                    </span>
                    <h4 className="font-heading font-black text-base text-slate-900">
                      {grid.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPricingGrid({
                          ...grid,
                          extra_fees: grid.extra_fees ? [...grid.extra_fees] : [],
                        });
                        setNewPricingExtraFeeItem("");
                        setIsPricingModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePricingGrid(grid.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Frais Inscription
                    </div>
                    <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                      {grid.registration_fee.toLocaleString("fr-FR")} FCFA
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Mensualité de base
                    </div>
                    <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                      {grid.monthly_fee.toLocaleString("fr-FR")} FCFA / mois
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Annuel Référence Local
                    </div>
                    <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                      {grid.annual_fee_local.toLocaleString("fr-FR")} FCFA
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Annuel International
                    </div>
                    <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                      {grid.annual_fee_international.toLocaleString("fr-FR")} FCFA
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">
                    Paliers & Modes configurés ({grid.tiers.length}) :
                  </div>
                  {grid.tiers.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50"
                    >
                      <span className="font-semibold text-slate-800 truncate">
                        {t.label}
                      </span>
                      <span className="font-mono font-bold text-slate-900 shrink-0 ml-2">
                        {t.monthly_fee}
                      </span>
                    </div>
                  ))}
                </div>

                {grid.extra_fees && grid.extra_fees.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">
                      Frais supplémentaires & annexes ({grid.extra_fees.length}) :
                    </div>
                    <div className="space-y-1">
                      {grid.extra_fees.map((fee, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-afi-red shrink-0" />
                          <span>{fee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: GESTION DES GRADES ACADEMIQUES */}
      {activeSubView === "grades" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
            <div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                Grades & Niveaux de Diplôme
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Gérez les libellés de grades officiels (Licence Bac+3, Master Bac+5, etc.) et leurs valeurs par défaut.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingGrade({
                  id: `grade-${Date.now()}`,
                  name: "Nouveau Grade",
                  level: "licence",
                  duration_years: 3,
                  default_ects: 180,
                });
                setIsGradeModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Grade</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gradesConfig.map((grade) => (
              <div
                key={grade.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase mb-2 ${
                      grade.level === "licence"
                        ? "bg-afi-navy text-white"
                        : "bg-afi-red text-white"
                    }`}
                  >
                    {grade.level}
                  </span>
                  <h4 className="font-heading font-black text-base text-slate-900">
                    {grade.name}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    {grade.duration_years} an(s) &bull; {grade.default_ects} ECTS
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingGrade({ ...grade });
                      setIsGradeModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteGrade(grade.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: EDIT DOMAIN CONFIG */}
      {isDomainModalOpen && editingDomain && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Configurer le Domaine Académique
              </h3>
              <button
                type="button"
                onClick={() => setIsDomainModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nom officiel du domaine *
                </label>
                <input
                  type="text"
                  required
                  value={editingDomain.name}
                  onChange={(e) =>
                    setEditingDomain({ ...editingDomain, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Code court (acronyme)
                  </label>
                  <input
                    type="text"
                    value={editingDomain.code}
                    onChange={(e) =>
                      setEditingDomain({
                        ...editingDomain,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="SEG, SJP..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Ordre d&apos;affichage
                  </label>
                  <input
                    type="number"
                    value={editingDomain.order_index}
                    onChange={(e) =>
                      setEditingDomain({
                        ...editingDomain,
                        order_index: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Slug URL
                </label>
                <input
                  type="text"
                  value={editingDomain.slug}
                  onChange={(e) =>
                    setEditingDomain({ ...editingDomain, slug: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description succincte
                </label>
                <textarea
                  rows={3}
                  value={editingDomain.short_description}
                  onChange={(e) =>
                    setEditingDomain({
                      ...editingDomain,
                      short_description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDomainModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleSaveDomain(editingDomain)}
                className="px-5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800"
              >
                Enregistrer le domaine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT GRADE CONFIG */}
      {isGradeModalOpen && editingGrade && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Configurer le Grade Académique
              </h3>
              <button
                type="button"
                onClick={() => setIsGradeModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Libellé du grade *
                </label>
                <input
                  type="text"
                  required
                  value={editingGrade.name}
                  onChange={(e) =>
                    setEditingGrade({ ...editingGrade, name: e.target.value })
                  }
                  placeholder="ex: Licence (Bac+3)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Niveau associé
                </label>
                <select
                  value={editingGrade.level}
                  onChange={(e) =>
                    setEditingGrade({
                      ...editingGrade,
                      level: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="licence">Licence</option>
                  <option value="master">Master</option>
                  <option value="doctorat">Doctorat</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Durée (années)
                  </label>
                  <input
                    type="number"
                    value={editingGrade.duration_years}
                    onChange={(e) =>
                      setEditingGrade({
                        ...editingGrade,
                        duration_years: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Crédits ECTS par défaut
                  </label>
                  <input
                    type="number"
                    value={editingGrade.default_ects}
                    onChange={(e) =>
                      setEditingGrade({
                        ...editingGrade,
                        default_ects: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsGradeModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleSaveGrade(editingGrade)}
                className="px-5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800"
              >
                Enregistrer le grade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT PRICING GRID CONFIG */}
      {isPricingModalOpen && editingPricingGrid && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Configurer la Grille Tarifaire
              </h3>
              <button
                type="button"
                onClick={() => setIsPricingModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nom de la grille *
                </label>
                <input
                  type="text"
                  required
                  value={editingPricingGrid.name}
                  onChange={(e) =>
                    setEditingPricingGrid({
                      ...editingPricingGrid,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Niveau applicable
                </label>
                <div className="relative">
                  <select
                    value={editingPricingGrid.level}
                    onChange={(e) =>
                      setEditingPricingGrid({
                        ...editingPricingGrid,
                        level: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 pr-9 bg-slate-50 border border-slate-200 rounded-xl font-bold appearance-none cursor-pointer"
                  >
                    <option value="licence">Licence</option>
                    <option value="master">Master</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Frais Inscription (FCFA)
                  </label>
                  <input
                    type="number"
                    value={editingPricingGrid.registration_fee}
                    onChange={(e) =>
                      setEditingPricingGrid({
                        ...editingPricingGrid,
                        registration_fee: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mensualité de base (FCFA)
                  </label>
                  <input
                    type="number"
                    value={editingPricingGrid.monthly_fee}
                    onChange={(e) =>
                      setEditingPricingGrid({
                        ...editingPricingGrid,
                        monthly_fee: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Total Annuel Local (FCFA)
                  </label>
                  <input
                    type="number"
                    value={editingPricingGrid.annual_fee_local}
                    onChange={(e) =>
                      setEditingPricingGrid({
                        ...editingPricingGrid,
                        annual_fee_local: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Total Annuel International
                  </label>
                  <input
                    type="number"
                    value={editingPricingGrid.annual_fee_international}
                    onChange={(e) =>
                      setEditingPricingGrid({
                        ...editingPricingGrid,
                        annual_fee_international: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Frais supplémentaires & annexes */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 text-xs">
                    Frais supplémentaires & annexes
                  </label>
                  <span className="text-[10px] text-slate-500">
                    Uniforme, bibliothèque, mémoire, soutenance...
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPricingExtraFeeItem}
                    onChange={(e) => setNewPricingExtraFeeItem(e.target.value)}
                    placeholder="ex: Frais de mémoire : 70 000 FCFA"
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:border-afi-navy"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (!newPricingExtraFeeItem.trim()) return;
                        setEditingPricingGrid({
                          ...editingPricingGrid,
                          extra_fees: [
                            ...(editingPricingGrid.extra_fees || []),
                            newPricingExtraFeeItem.trim(),
                          ],
                        });
                        setNewPricingExtraFeeItem("");
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newPricingExtraFeeItem.trim()) return;
                      setEditingPricingGrid({
                        ...editingPricingGrid,
                        extra_fees: [
                          ...(editingPricingGrid.extra_fees || []),
                          newPricingExtraFeeItem.trim(),
                        ],
                      });
                      setNewPricingExtraFeeItem("");
                    }}
                    className="px-3.5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800 transition-colors cursor-pointer shrink-0"
                  >
                    Ajouter
                  </button>
                </div>

                {(!editingPricingGrid.extra_fees ||
                  editingPricingGrid.extra_fees.length === 0) ? (
                  <p className="text-[11px] text-slate-400 italic">
                    Aucun frais supplémentaire configuré pour cette grille.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                    {editingPricingGrid.extra_fees.map((fee, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={fee}
                          onChange={(e) => {
                            const next = [
                              ...(editingPricingGrid.extra_fees || []),
                            ];
                            next[idx] = e.target.value;
                            setEditingPricingGrid({
                              ...editingPricingGrid,
                              extra_fees: next,
                            });
                          }}
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditingPricingGrid({
                              ...editingPricingGrid,
                              extra_fees: (
                                editingPricingGrid.extra_fees || []
                              ).filter((_, i) => i !== idx),
                            })
                          }
                          className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                          title="Supprimer ce frais"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPricingModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleSavePricingGrid(editingPricingGrid)}
                className="px-5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800"
              >
                Enregistrer la grille
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: DELETE CONFIRMATION */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Confirmer la suppression
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Êtes-vous sûr de vouloir supprimer définitivement cette formation ?
              Cette action retirera la page publique et l&apos;ensemble de son programme.
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
                {isDeleting ? "Suppression..." : "Confirmer la suppression"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: FULL 5-TAB FORMATION EDITOR MODAL */}
      {isEditing && activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 my-4 max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 sm:px-8 py-5 bg-afi-navy text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-afi-red text-white flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-white">
                    {activeItem.id
                      ? `Édition : ${activeItem.title}`
                      : "Créer une Nouvelle Formation Diplômante"}
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Renseignez les détails académiques ou appliquez directement vos grilles tarifaires et grades configurés.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setActiveItem(null);
                }}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 sm:px-8 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto py-2.5 shrink-0">
              {[
                {
                  id: "general" as EditorTab,
                  label: "1. Infos Générales & Domaine",
                  icon: GraduationCap,
                },
                {
                  id: "pedagogie" as EditorTab,
                  label: "2. Modalités & Présentation",
                  icon: BookOpen,
                },
                {
                  id: "programme" as EditorTab,
                  label: `3. Programme & UE (${
                    activeItem.program_blocks?.length || 0
                  })`,
                  icon: Layers,
                },
                {
                  id: "admissions_debouches" as EditorTab,
                  label: "4. Admissions & Débouchés",
                  icon: Briefcase,
                },
                {
                  id: "tarifs_seo" as EditorTab,
                  label: "5. Grilles Tarifaires & SEO",
                  icon: Coins,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-afi-navy text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Body */}
            <form
              onSubmit={handleSave}
              className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6"
            >
              {/* TAB 1: INFORMATIONS GENERALES */}
              {activeTab === "general" && (
                <div className="space-y-5">
                  {/* Dynamic Grade Quick-Apply Banner */}
                  {gradesConfig.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <SlidersHorizontal className="w-4 h-4 text-afi-navy" />
                        <span>Sélectionner et appliquer un Grade configuré :</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {gradesConfig.map((grade) => (
                          <button
                            key={grade.id}
                            type="button"
                            onClick={() => handleApplyGrade(grade.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              activeItem.grade === grade.name
                                ? "bg-afi-navy text-white shadow-xs"
                                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            {grade.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Intitulé officiel de la formation *
                      </label>
                      <input
                        type="text"
                        required
                        value={activeItem.title || ""}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            title: e.target.value,
                          })
                        }
                        placeholder="ex: Licence Banque Assurance Finance"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-afi-navy"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Slug URL (adresse de la page)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={activeItem.slug || ""}
                          onChange={(e) =>
                            setActiveItem({
                              ...activeItem,
                              slug: e.target.value,
                            })
                          }
                          placeholder="ex: licence-banque-assurance-finance"
                          className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-afi-navy"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setActiveItem({
                              ...activeItem,
                              slug: generateSlug(activeItem.title || ""),
                            })
                          }
                          className="px-3.5 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition-colors cursor-pointer shrink-0"
                        >
                          Générer depuis le titre
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Cycle / Niveau académique *
                      </label>
                      <div className="relative">
                        <select
                          value={activeItem.level || "licence"}
                          onChange={(e) => {
                            const lvl = e.target.value as
                              | "licence"
                              | "master"
                              | "doctorat";
                            const isLic = lvl === "licence";
                            setActiveItem({
                              ...activeItem,
                              level: lvl,
                              grade: isLic
                                ? "Licence (Bac+3)"
                                : "Master (Bac+5)",
                              duration_years: isLic ? 3 : 2,
                              credits_ects: isLic ? 180 : 120,
                              duration_label: isLic
                                ? "3 ans (6 semestres – 180 crédits ECTS)"
                                : "2 ans (4 semestres – 120 crédits ECTS)",
                            });
                          }}
                          className="appearance-none w-full pl-3.5 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-afi-navy cursor-pointer"
                        >
                          <option value="licence">Licence (Bac +3)</option>
                          <option value="master">Master (Bac +5)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Grade affiché sur la fiche
                      </label>
                      <input
                        type="text"
                        value={activeItem.grade || ""}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            grade: e.target.value,
                          })
                        }
                        placeholder="ex: Licence (Bac+3) ou Master (Bac+5)"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-afi-navy"
                      />
                    </div>

                    {/* Domaine d'étude officiel — Strictly our configured domains */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Domaine d&apos;étude officiel d&apos;AFI-L&apos;UE *
                      </label>
                      <div className="relative">
                        <select
                          value={activeItem.domaine || availableDomains[0]?.name}
                          onChange={(e) =>
                            setActiveItem({
                              ...activeItem,
                              domaine: e.target.value,
                            })
                          }
                          className="appearance-none w-full pl-3.5 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-afi-navy cursor-pointer"
                        >
                          {availableDomains.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name} ({d.code || "AFI"})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mention académique (affichée dans la barre d&apos;infos)
                      </label>
                      <input
                        type="text"
                        value={activeItem.mention || ""}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            mention: e.target.value,
                          })
                        }
                        placeholder="ex: Banque Assurance Finance – BAF"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-afi-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Spécialité (optionnel)
                      </label>
                      <input
                        type="text"
                        value={activeItem.specialty || ""}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            specialty: e.target.value,
                          })
                        }
                        placeholder="ex: Ingénierie Financière"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-afi-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Durée (en années)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={8}
                        value={activeItem.duration_years ?? 3}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            duration_years: Number(e.target.value),
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Crédits ECTS
                      </label>
                      <input
                        type="number"
                        value={activeItem.credits_ects ?? 180}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            credits_ects: Number(e.target.value),
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Libellé complet de la durée
                      </label>
                      <input
                        type="text"
                        value={activeItem.duration_label || ""}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            duration_label: e.target.value,
                          })
                        }
                        placeholder="ex: 3 ans (6 semestres – 180 crédits ECTS)"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Ordre d&apos;affichage dans le catalogue
                      </label>
                      <input
                        type="number"
                        value={activeItem.order_index ?? 1}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            order_index: Number(e.target.value),
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  {/* Publication & Featured switches */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeItem.is_active ?? true}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            is_active: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded text-afi-navy"
                      />
                      <span className="text-xs font-bold text-slate-900">
                        Formation active et publiée sur le site public
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeItem.is_featured ?? false}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            is_featured: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded text-afi-red"
                      />
                      <span className="text-xs font-bold text-slate-900">
                        Mettre en avant sur la page d&apos;accueil (Vedette)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: MODALITES & PRESENTATION PEDAGOGIQUE */}
              {activeTab === "pedagogie" && (
                <div className="space-y-6">
                  {/* Modalités d'enseignement */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Modalités d&apos;enseignement disponibles
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {STUDY_MODE_OPTIONS.map((opt) => {
                        const checked = (
                          activeItem.study_modes || []
                        ).includes(opt.value);
                        return (
                          <label
                            key={opt.value}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                              checked
                                ? "bg-afi-navy text-white border-afi-navy"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleStudyMode(opt.value)}
                              className="w-4 h-4 rounded"
                            />
                            <span>{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Option International Leader (FEDE + TOEIC) */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-afi-red" />
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Parcours International Leader (Double Diplôme FEDE & TOEIC)
                        </span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(
                            activeItem.international_leader?.available
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              const info: InternationalLeaderInfo = {
                                available: true,
                                description:
                                  "Parcours International Leader avec Double diplôme européen FEDE + Certification internationale d'anglais TOEIC (Mensualité : 95 000 FCFA / mois).",
                                activities: [
                                  "Double diplôme reconnu par la FEDE (Fédération Européenne Des Écoles)",
                                  "Préparation et passage officiel du test TOEIC inclus",
                                  "Immersion linguistique et mobilité académique internationale",
                                ],
                              };
                              setActiveItem({
                                ...activeItem,
                                international_leader: info,
                              });
                            } else {
                              setActiveItem({
                                ...activeItem,
                                international_leader: null,
                              });
                            }
                          }}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-xs font-bold text-slate-800">
                          Activer ce parcours
                        </span>
                      </label>
                    </div>

                    {activeItem.international_leader && (
                      <div className="space-y-3 pt-2 border-t border-slate-200">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Description du Parcours International Leader
                          </label>
                          <textarea
                            rows={2}
                            value={
                              activeItem.international_leader.description || ""
                            }
                            onChange={(e) =>
                              setActiveItem({
                                ...activeItem,
                                international_leader: {
                                  ...activeItem.international_leader!,
                                  description: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Points clés & activités (séparés par un retour à la ligne)
                          </label>
                          <textarea
                            rows={3}
                            value={(
                              activeItem.international_leader.activities || []
                            ).join("\n")}
                            onChange={(e) =>
                              setActiveItem({
                                ...activeItem,
                                international_leader: {
                                  ...activeItem.international_leader!,
                                  activities: e.target.value
                                    .split("\n")
                                    .filter(Boolean),
                                },
                              })
                            }
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Descriptions */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Résumé court (affiché sur les cartes du catalogue et le Hero)
                    </label>
                    <textarea
                      rows={2}
                      value={activeItem.short_description || ""}
                      onChange={(e) =>
                        setActiveItem({
                          ...activeItem,
                          short_description: e.target.value,
                        })
                      }
                      placeholder="Résumé percutant en 1 ou 2 phrases..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Présentation générale détaillée de la formation
                    </label>
                    <textarea
                      rows={5}
                      value={activeItem.description || ""}
                      onChange={(e) =>
                        setActiveItem({
                          ...activeItem,
                          description: e.target.value,
                        })
                      }
                      placeholder="Présentation complète des enjeux, compétences visées et spécificités de la filière..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Objectifs pédagogiques & Compétences visées
                    </label>
                    <textarea
                      rows={3}
                      value={activeItem.objectives || ""}
                      onChange={(e) =>
                        setActiveItem({
                          ...activeItem,
                          objectives: e.target.value,
                        })
                      }
                      placeholder="Objectifs académiques et opérationnels du programme..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: PROGRAMME & UNITES D'ENSEIGNEMENT (UE) */}
              {activeTab === "programme" && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-900">
                        Architecture des Unités d&apos;Enseignement (UE)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Ajoutez, réorganisez ou modifiez les blocs d&apos;UE et la liste des matières enseignées.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addProgramBlock}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold hover:bg-afi-navy-800 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter un Bloc d&apos;UE</span>
                    </button>
                  </div>

                  {(!activeItem.program_blocks ||
                    activeItem.program_blocks.length === 0) && (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                      Aucun bloc d&apos;Unité d&apos;Enseignement défini. Cliquez sur{" "}
                      <strong>&laquo; Ajouter un Bloc d&apos;UE &raquo;</strong> pour structurer les cours.
                    </div>
                  )}

                  <div className="space-y-4">
                    {(activeItem.program_blocks || []).map((block, bIdx) => (
                      <div
                        key={bIdx}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="px-3 py-2 bg-afi-navy text-white font-mono text-xs font-bold rounded-xl shrink-0">
                              UE {String(bIdx + 1).padStart(2, "0")}
                            </span>
                            <input
                              type="text"
                              value={block.title}
                              onChange={(e) =>
                                updateProgramBlock(bIdx, {
                                  title: e.target.value,
                                })
                              }
                              placeholder="Intitulé de l'Unité d'Enseignement"
                              className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                            />
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => moveProgramBlock(bIdx, "up")}
                              disabled={bIdx === 0}
                              title="Monter ce bloc"
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-40 cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveProgramBlock(bIdx, "down")}
                              disabled={
                                bIdx ===
                                (activeItem.program_blocks?.length || 1) - 1
                              }
                              title="Descendre ce bloc"
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-40 cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeProgramBlock(bIdx)}
                              title="Supprimer ce bloc d'UE"
                              className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Subjects list inside UE */}
                        <div className="space-y-2 pl-2 border-l-2 border-slate-300">
                          <div className="text-[11px] font-bold text-slate-500 uppercase">
                            Matières constitutives ({block.items.length}) :
                          </div>
                          {block.items.map((subj, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={subj}
                                onChange={(e) =>
                                  updateSubjectInBlock(
                                    bIdx,
                                    sIdx,
                                    e.target.value
                                  )
                                }
                                placeholder="Nom de la matière ou module..."
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeSubjectFromBlock(bIdx, sIdx)
                                }
                                className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                                title="Retirer cette matière"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => addSubjectToBlock(bIdx)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-afi-navy hover:underline pt-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>
                              Ajouter une matière dans UE{" "}
                              {String(bIdx + 1).padStart(2, "0")}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: ADMISSIONS & DEBOUCHES PROFESSIONNELS */}
              {activeTab === "admissions_debouches" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Conditions d'admission */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-900">
                        Conditions d&apos;Admission ({activeItem.admission_conditions_list?.length || 0})
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Prérequis académiques et pièces exigées pour postuler.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAdmissionItem}
                        onChange={(e) => setNewAdmissionItem(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (!newAdmissionItem.trim()) return;
                            setActiveItem({
                              ...activeItem,
                              admission_conditions_list: [
                                ...(activeItem.admission_conditions_list || []),
                                newAdmissionItem.trim(),
                              ],
                            });
                            setNewAdmissionItem("");
                          }
                        }}
                        placeholder="Ajouter une condition d'admission..."
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newAdmissionItem.trim()) return;
                          setActiveItem({
                            ...activeItem,
                            admission_conditions_list: [
                              ...(activeItem.admission_conditions_list || []),
                              newAdmissionItem.trim(),
                            ],
                          });
                          setNewAdmissionItem("");
                        }}
                        className="px-3.5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(activeItem.admission_conditions_list || []).map(
                        (cond, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={cond}
                              onChange={(e) => {
                                const next = [
                                  ...(activeItem.admission_conditions_list ||
                                    []),
                                ];
                                next[idx] = e.target.value;
                                setActiveItem({
                                  ...activeItem,
                                  admission_conditions_list: next,
                                });
                              }}
                              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = (
                                  activeItem.admission_conditions_list || []
                                ).filter((_, i) => i !== idx);
                                setActiveItem({
                                  ...activeItem,
                                  admission_conditions_list: next,
                                });
                              }}
                              className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Débouchés & Métiers visés */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-900">
                        Débouchés & Métiers Visés ({activeItem.career_opportunities_list?.length || 0})
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Postes et carrières accessibles après l&apos;obtention du diplôme.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCareerItem}
                        onChange={(e) => setNewCareerItem(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (!newCareerItem.trim()) return;
                            setActiveItem({
                              ...activeItem,
                              career_opportunities_list: [
                                ...(activeItem.career_opportunities_list || []),
                                newCareerItem.trim(),
                              ],
                            });
                            setNewCareerItem("");
                          }
                        }}
                        placeholder="ex: Analyste Financier, Auditeur Interne..."
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newCareerItem.trim()) return;
                          setActiveItem({
                            ...activeItem,
                            career_opportunities_list: [
                              ...(activeItem.career_opportunities_list || []),
                              newCareerItem.trim(),
                            ],
                          });
                          setNewCareerItem("");
                        }}
                        className="px-3.5 py-2 rounded-xl bg-afi-red text-white text-xs font-bold cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(activeItem.career_opportunities_list || []).map(
                        (job, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={job}
                              onChange={(e) => {
                                const next = [
                                  ...(activeItem.career_opportunities_list ||
                                    []),
                                ];
                                next[idx] = e.target.value;
                                setActiveItem({
                                  ...activeItem,
                                  career_opportunities_list: next,
                                });
                              }}
                              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = (
                                  activeItem.career_opportunities_list || []
                                ).filter((_, i) => i !== idx);
                                setActiveItem({
                                  ...activeItem,
                                  career_opportunities_list: next,
                                });
                              }}
                              className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: TARIFS, BROCHURE PDF & SEO */}
              {activeTab === "tarifs_seo" && (
                <div className="space-y-6">
                  {/* Dynamic Pricing Grid Quick-Apply */}
                  {pricingGridsConfig.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Coins className="w-4 h-4 text-afi-red" />
                        <span>Appliquer un modèle de Grille Tarifaire :</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {pricingGridsConfig.map((grid) => (
                          <button
                            key={grid.id}
                            type="button"
                            onClick={() => handleApplyPricingGrid(grid.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                          >
                            {grid.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Coût annuel de référence — Étudiants Locaux / UEMOA (FCFA)
                      </label>
                      <input
                        type="number"
                        value={activeItem.tuition_fees_local ?? 920000}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            tuition_fees_local: Number(e.target.value),
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Coût annuel de référence — Étudiants Internationaux (FCFA)
                      </label>
                      <input
                        type="number"
                        value={activeItem.tuition_fees_international ?? 1120000}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            tuition_fees_international: Number(e.target.value),
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Résumé tarifaire synthétique
                      </label>
                      <input
                        type="text"
                        value={activeItem.tuition_summary || ""}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            tuition_summary: e.target.value,
                          })
                        }
                        placeholder="ex: Inscription : 170 000 FCFA • Mensualité : dès 70 000 FCFA (Soir) / 75 000 à 85 000 FCFA (Jour)"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <FileUploadZone
                        label="Brochure PDF téléchargeable de la formation"
                        value={activeItem.brochure_url}
                        onChange={(url) =>
                          setActiveItem({ ...activeItem, brochure_url: url })
                        }
                        accept="document"
                        helpText="Document PDF officiel téléchargeable par les candidats sur la page de la filière."
                      />
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Brochure standard AFI-L&apos;UE disponible</span>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveItem({
                              ...activeItem,
                              brochure_url:
                                "/brochures/offre-de-formation-2026-2027.pdf",
                            })
                          }
                          className="font-bold text-afi-navy hover:underline cursor-pointer"
                        >
                          Appliquer la brochure 2026-2027 par défaut
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Extra Fees List */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-900">
                      Frais annexes & Modalités particulières (Soutenance, Tenue, etc.)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newExtraFeeItem}
                        onChange={(e) => setNewExtraFeeItem(e.target.value)}
                        placeholder="ex: Frais de soutenance : 50 000 FCFA"
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newExtraFeeItem.trim()) return;
                          setActiveItem({
                            ...activeItem,
                            extra_fees: [
                              ...(activeItem.extra_fees || []),
                              newExtraFeeItem.trim(),
                            ],
                          });
                          setNewExtraFeeItem("");
                        }}
                        className="px-3.5 py-2 rounded-xl bg-afi-navy text-white text-xs font-bold cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(activeItem.extra_fees || []).map((fee, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={fee}
                            onChange={(e) => {
                              const next = [...(activeItem.extra_fees || [])];
                              next[idx] = e.target.value;
                              setActiveItem({
                                ...activeItem,
                                extra_fees: next,
                              });
                            }}
                            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setActiveItem({
                                ...activeItem,
                                extra_fees: (
                                  activeItem.extra_fees || []
                                ).filter((_, i) => i !== idx),
                              })
                            }
                            className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SEO Metadata */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
                      Référencement Naturel (SEO)
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Meta Title (Titre Google)
                      </label>
                      <input
                        type="text"
                        value={activeItem.meta_title || ""}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            meta_title: e.target.value,
                          })
                        }
                        placeholder={`${activeItem.title || "Formation"} | AFI-L'UE`}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Meta Description
                      </label>
                      <textarea
                        rows={2}
                        value={activeItem.meta_description || ""}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            meta_description: e.target.value,
                          })
                        }
                        placeholder="Description optimisée pour les moteurs de recherche (150-160 caractères)..."
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-5 border-t border-slate-200 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400">
                  Les modifications sont immédiatement appliquées sur le site public après enregistrement.
                </div>
                <div className="flex items-center gap-3">
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
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-afi-navy hover:bg-afi-navy-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>
                      {isSaving
                        ? "Enregistrement..."
                        : "Enregistrer la formation"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
