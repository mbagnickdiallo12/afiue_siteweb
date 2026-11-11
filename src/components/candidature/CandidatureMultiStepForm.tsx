"use client";

import { useState, useRef, useEffect, useMemo, useTransition } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Laptop,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Download,
  Printer,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  ChevronDown,
  FileText,
  Search,
  X,
  Copy,
  CheckCheck,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { Formation, DossierCandidatureData, ParcoursScolaireLigne } from "@/types/database";

interface Props {
  formations: Formation[];
  initialFormationSlug?: string;
}

const STEPS = [
  { id: 1, short: "Programme", title: "Choix du Programme & Niveau", desc: "Filière, modalité d'études et cycle sollicité" },
  { id: 2, short: "État Civil", title: "État Civil & Coordonnées", desc: "Informations personnelles du candidat" },
  { id: 3, short: "Tuteur", title: "Tuteur & Bailleur Financier", desc: "Responsable légal ou prise en charge financière" },
  { id: 4, short: "Parcours", title: "Cursus Antérieur & Langues", desc: "Historique académique et compétences linguistiques" },
  { id: 5, short: "Motivations", title: "Motivations & Attestation", desc: "Projet d'avenir et déclaration sur l'honneur" },
];

export function CandidatureMultiStepForm({ formations, initialFormationSlug }: Props) {
  const initialFormation = formations.find((f) => f.slug === initialFormationSlug) || formations[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [activeTuteurTab, setActiveTuteurTab] = useState<"pere" | "mere" | "autre">("pere");

  // Searchable formation selector state
  const [formationSearch, setFormationSearch] = useState("");
  const [isFormationDropdownOpen, setIsFormationDropdownOpen] = useState(false);
  const [formationLevelFilter, setFormationLevelFilter] = useState<"all" | "licence" | "master">("all");
  const formationDropdownRef = useRef<HTMLDivElement>(null);

  // Form State matching official PDF schema
  const [formData, setFormData] = useState<DossierCandidatureData>({
    // Page 1: Programmes
    programme_type: initialFormation?.level === "master" ? "master" : "initiale_licence",
    sous_option: "international_leader",
    niveau: initialFormation?.level === "master" ? "master_1" : "licence_1",
    domaine: "Sciences Économiques et de Gestion",
    mention: initialFormation?.title || "Gestion des Entreprises",
    specialite: initialFormation?.title || "",

    // Page 1: État Civil
    civilite: "M.",
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    nationalite: "Sénégalaise",
    adresse: "",
    adresse_suite: "",
    ville: "Dakar",
    telephone: "",
    portable: "",
    email: "",

    // Page 2: Tuteurs
    tuteur_type_principal: "pere",
    pere: { nom_prenom: "", profession: "", adresse: "", email: "", telephone: "" },
    mere: { nom_prenom: "", profession: "", adresse: "", email: "", telephone: "" },
    autre_tuteur: { nom_prenom: "", profession: "", adresse: "", email: "", telephone: "" },

    // Page 2: Parcours scolaire
    parcours: [
      {
        annee: "2024-2025",
        diplome: "Baccalauréat",
        etablissement: "",
        date_obtention: "2025",
      },
    ],

    // Page 2: Langues
    langue_1: { nom: "Français", niveau: "eleve" },
    langue_2: { nom: "Anglais", niveau: "moyen" },
    langue_3: { nom: "", niveau: "" },
    langue_autres: { nom: "", niveau: "" },

    // Page 2: Sources
    sources_connaissance: ["site_internet"],
    source_presse_precision: "",
    source_salons_precision: "",

    // Page 3: Motivations
    motivations_texte: "",

    // Page 4: Attestation
    attestation_nom_complet: "",
    attestation_lieu: "Dakar",
    attestation_date: new Date().toLocaleDateString("fr-FR"),
    attestation_lu_et_approuve: true,
  });

  // Dynamic linking: active academic cycle based on chosen level or programme
  const isMasterCycle =
    formData.niveau.startsWith("master") || formData.programme_type === "master";

  // Formations strictly tied to the selected cycle (Licence vs Master)
  const availableFormationsForCycle = useMemo(() => {
    return formations.filter((f) => (isMasterCycle ? f.level === "master" : f.level === "licence"));
  }, [formations, isMasterCycle]);

  // Search filter inside the active cycle
  const filteredFormations = useMemo(() => {
    const query = formationSearch.toLowerCase().trim();
    return availableFormationsForCycle.filter((f) => {
      return (
        !query ||
        f.title.toLowerCase().includes(query) ||
        (f.domain?.name && f.domain.name.toLowerCase().includes(query))
      );
    });
  }, [availableFormationsForCycle, formationSearch]);

  // Handle programme type change and sync cycle
  const handleProgrammeTypeSelect = (progId: DossierCandidatureData["programme_type"]) => {
    setFormData((prev) => {
      const isSwitchingToMaster = progId === "master";
      const isSwitchingToLicence =
        progId === "initiale_licence" || progId === "continue_licence" || progId === "presup";

      let nextNiveau = prev.niveau;
      let nextSpecialite = prev.specialite;
      let nextMention = prev.mention;
      let nextDomaine = prev.domaine;

      if (isSwitchingToMaster && prev.niveau.startsWith("licence")) {
        nextNiveau = "master_1";
        const firstMaster = formations.find((f) => f.level === "master");
        if (firstMaster) {
          nextSpecialite = firstMaster.title;
          nextMention = firstMaster.title;
          nextDomaine = firstMaster.domain?.name || prev.domaine;
        }
      } else if (isSwitchingToLicence && prev.niveau.startsWith("master")) {
        nextNiveau = "licence_1";
        const firstLicence = formations.find((f) => f.level === "licence");
        if (firstLicence) {
          nextSpecialite = firstLicence.title;
          nextMention = firstLicence.title;
          nextDomaine = firstLicence.domain?.name || prev.domaine;
        }
      }

      return {
        ...prev,
        programme_type: progId,
        niveau: nextNiveau,
        specialite: nextSpecialite,
        mention: nextMention,
        domaine: nextDomaine,
      };
    });
  };

  // Handle niveau change and sync corresponding formations
  const handleNiveauSelect = (niveauId: DossierCandidatureData["niveau"]) => {
    const isNewMaster = niveauId.startsWith("master");
    const isCurrentMaster = formData.niveau.startsWith("master");

    setFormData((prev) => {
      let nextProgramme = prev.programme_type;
      let nextSpecialite = prev.specialite;
      let nextMention = prev.mention;
      let nextDomaine = prev.domaine;

      // When switching between Licence and Master cycles
      if (isNewMaster !== isCurrentMaster) {
        if (isNewMaster) {
          if (prev.programme_type === "initiale_licence" || prev.programme_type === "continue_licence") {
            nextProgramme = "master";
          }
          const firstMaster = formations.find((f) => f.level === "master");
          if (firstMaster) {
            nextSpecialite = firstMaster.title;
            nextMention = firstMaster.title;
            nextDomaine = firstMaster.domain?.name || prev.domaine;
          }
        } else {
          if (prev.programme_type === "master") {
            nextProgramme = "initiale_licence";
          }
          const firstLicence = formations.find((f) => f.level === "licence");
          if (firstLicence) {
            nextSpecialite = firstLicence.title;
            nextMention = firstLicence.title;
            nextDomaine = firstLicence.domain?.name || prev.domaine;
          }
        }
      }

      return {
        ...prev,
        niveau: niveauId,
        programme_type: nextProgramme,
        specialite: nextSpecialite,
        mention: nextMention,
        domaine: nextDomaine,
      };
    });
  };

  // Handle selected formation change
  const handleFormationSelect = (formationId: string) => {
    const f = formations.find((item) => item.id === formationId || item.slug === formationId);
    if (!f) return;

    setFormData((prev) => ({
      ...prev,
      specialite: f.title,
      mention: f.title,
      programme_type:
        f.level === "master"
          ? "master"
          : prev.programme_type === "master"
          ? "initiale_licence"
          : prev.programme_type,
      niveau:
        f.level === "master"
          ? prev.niveau.startsWith("master")
            ? prev.niveau
            : "master_1"
          : prev.niveau.startsWith("licence")
          ? prev.niveau
          : "licence_1",
      domaine: f.domain?.name || prev.domaine,
    }));
    setIsFormationDropdownOpen(false);
    setFormationSearch("");
  };

  // Add / Remove school rows
  const addParcoursRow = () => {
    if ((formData.parcours?.length || 0) >= 7) return;
    setFormData((prev) => ({
      ...prev,
      parcours: [
        ...(prev.parcours || []),
        { annee: "", diplome: "", etablissement: "", date_obtention: "" },
      ],
    }));
  };

  const removeParcoursRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      parcours: (prev.parcours || []).filter((_, i) => i !== index),
    }));
  };

  const updateParcoursRow = (index: number, field: keyof ParcoursScolaireLigne, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.parcours || [])];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, parcours: updated };
    });
  };

  // Sources toggle
  const toggleSource = (sourceId: string) => {
    setFormData((prev) => {
      const current = prev.sources_connaissance || [];
      const exists = current.includes(sourceId);
      return {
        ...prev,
        sources_connaissance: exists
          ? current.filter((s) => s !== sourceId)
          : [...current, sourceId],
      };
    });
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    setError(null);

    if (step === 1) {
      if (!formData.specialite) {
        setError("Veuillez sélectionner votre filière de formation.");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!formData.nom.trim()) {
        setError("Le nom de famille est obligatoire.");
        return false;
      }
      if (!formData.prenom.trim()) {
        setError("Le prénom est obligatoire.");
        return false;
      }
      if (!formData.date_naissance) {
        setError("La date de naissance est obligatoire.");
        return false;
      }
      if (!formData.lieu_naissance.trim()) {
        setError("Le lieu de naissance est obligatoire.");
        return false;
      }
      if (!formData.adresse.trim()) {
        setError("L'adresse de résidence est obligatoire.");
        return false;
      }
      if (!formData.portable.trim()) {
        setError("Le numéro de portable est obligatoire.");
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes("@")) {
        setError("Une adresse e-mail valide est obligatoire.");
        return false;
      }
      return true;
    }

    if (step === 3) {
      const activeTuteur =
        activeTuteurTab === "pere"
          ? formData.pere
          : activeTuteurTab === "mere"
          ? formData.mere
          : formData.autre_tuteur;

      if (!activeTuteur?.nom_prenom.trim()) {
        setError(`Veuillez renseigner le nom et prénom pour ${activeTuteurTab === "pere" ? "le père" : activeTuteurTab === "mere" ? "la mère" : "le tuteur"}.`);
        return false;
      }
      if (!activeTuteur?.telephone.trim()) {
        setError(`Veuillez renseigner un numéro de téléphone pour ${activeTuteurTab === "pere" ? "le père" : activeTuteurTab === "mere" ? "la mère" : "le tuteur"}.`);
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!formData.parcours || formData.parcours.length === 0) {
        setError("Veuillez renseigner au moins une année d'études dans votre parcours.");
        return false;
      }
      const first = formData.parcours[0];
      if (!first.diplome.trim() || !first.etablissement.trim()) {
        setError("Veuillez renseigner le diplôme et l'établissement pour la première ligne du parcours.");
        return false;
      }
      return true;
    }

    if (step === 5) {
      if (!formData.motivations_texte?.trim()) {
        setError("Veuillez exprimer vos motivations professionnelles.");
        return false;
      }
      if (!formData.attestation_lu_et_approuve) {
        setError("Vous devez approuver l'attestation sur l'honneur pour valider votre dossier.");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    startTransition(async () => {
      try {
        setError(null);

        const currentFormation =
          formations.find((f) => f.title === formData.specialite || f.id === formData.specialite || f.slug === formData.specialite) ||
          formations[0];

        const payload = {
          formation_id: currentFormation?.id || "formation-default",
          first_name: formData.prenom.trim(),
          last_name: formData.nom.trim(),
          email: formData.email.trim(),
          phone: formData.portable.trim() || formData.telephone.trim(),
          country: formData.nationalite.trim() || "Sénégal",
          city: formData.ville.trim() || "Dakar",
          birth_date: formData.date_naissance,
          birth_place: formData.lieu_naissance.trim() || "Dakar",
          previous_school: formData.parcours?.[0]?.etablissement?.trim() || "",
          last_diploma: formData.parcours?.[0]?.diplome?.trim() || "Baccalauréat",
          session_academic_year: "2026-2027",
          // French aliases for full backwards compatibility
          nom: formData.nom.trim(),
          prenom: formData.prenom.trim(),
          telephone: formData.portable.trim() || formData.telephone.trim(),
          date_naissance: formData.date_naissance,
          lieu_naissance: formData.lieu_naissance.trim() || "Dakar",
          nationalite: formData.nationalite.trim() || "Sénégal",
          dernier_diplome: formData.parcours?.[0]?.diplome?.trim() || "Baccalauréat",
          cycle: formData.niveau.startsWith("master") ? "master" : "licence",
          civilite: formData.civilite,
          adresse: `${formData.adresse}, ${formData.ville}`.trim(),
          message: formData.motivations_texte,
          dossier_data: {
            ...formData,
            attestation_nom_complet: `${formData.prenom} ${formData.nom}`.trim(),
          },
        };

        const res = await fetch("/api/candidatures", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Une erreur est survenue lors de l'envoi.");
        } else {
          setSuccessRef(data.reference_code);
          window.scrollTo({ top: 80, behavior: "smooth" });
        }
      } catch {
        setError("Erreur de connexion. Veuillez réessayer.");
      }
    });
  };

  // Direct PDF Download Handler
  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const res = await fetch("/api/candidatures/download-dossier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur génération PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Dossier-Candidature-AFI-2026-2027-${formData.nom.toUpperCase()}-${formData.prenom}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      alert("Impossible de générer le document PDF pour l'instant.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Direct Copy Handler
  const handleCopyCode = async () => {
    if (!successRef) return;
    try {
      await navigator.clipboard.writeText(successRef);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // Fallback
    }
  };

  const formatNiveauLabel = (n: string) => {
    switch (n) {
      case "licence_1": return "Licence 1 (L1)";
      case "licence_2": return "Licence 2 (L2)";
      case "licence_3": return "Licence 3 (L3)";
      case "master_1": return "Master 1 (M1)";
      case "master_2": return "Master 2 (M2)";
      default: return n || "Licence 1";
    }
  };

  const formatProgrammeTypeLabel = (p: string) => {
    switch (p) {
      case "initiale_licence": return "Licence Initiale (Jour)";
      case "continue_licence": return "Licence Continue (Soir)";
      case "master": return "Master Professionnel";
      case "cours_weekend": return "Cours du Week-end";
      case "presup": return "PRESUP (Classe Prépa)";
      case "elearning": return "E-Learning (100% En Ligne)";
      default: return p || "Formation Initiale";
    }
  };

  // =========================================================================
  // SUCCESS SCREEN (World-Class Academic Institutional Confirmation)
  // =========================================================================
  if (successRef) {
    const todayFormatted = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date());

    return (
      <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 sm:p-10 space-y-8">
          {/* 1. Minimalist Apple-style Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-none">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>Dossier enregistré • {todayFormatted}</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Félicitations, {formData.prenom} !
            </h2>

            <p className="text-slate-800 font-medium text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Votre candidature en <span className="font-bold text-slate-950 underline decoration-emerald-500 decoration-2 underline-offset-4">{formData.specialite}</span> pour la rentrée académique 2026-2027 a bien été enregistrée auprès des services académiques d&apos;AFI-L&apos;UE.
            </p>
          </div>

          {/* 2. Apple / Google Minimalist Summary Card (Zero border, zero grey/transparent background) */}
          <div className="bg-white space-y-6">
            {/* Reference Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Référence du dossier
                </span>
                <div className="font-mono font-black text-2xl sm:text-3xl text-slate-900 tracking-wider mt-1">
                  {successRef}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm"
              >
                {copiedCode ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Code copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier la référence</span>
                  </>
                )}
              </button>
            </div>

            {/* Clean Info Grid (Pure typography, zero gray boxes, zero border nesting) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-xs pb-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Candidat
                </span>
                <p className="font-bold text-slate-900 text-base mt-1">
                  {formData.civilite} {formData.prenom} {formData.nom}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {formData.nationalite || "Sénégalaise"} • {formData.portable || formData.telephone || formData.email}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Régime & Niveau
                </span>
                <p className="font-bold text-slate-900 text-base mt-1">
                  {formatProgrammeTypeLabel(formData.programme_type)}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  Niveau {formatNiveauLabel(formData.niveau)}
                </p>
              </div>

              <div className="sm:col-span-2 pt-1 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Filière retenue
                </span>
                <p className="font-bold text-slate-900 text-base mt-1">
                  {formData.specialite}
                </p>
                {formData.domaine && (
                  <p className="text-slate-500 text-xs mt-0.5">
                    {formData.domaine}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 3. Primary Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-afi-red hover:bg-red-700 disabled:opacity-60 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{isGeneratingPdf ? "Génération..." : "Télécharger mon dossier (PDF)"}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>Imprimer</span>
            </button>
          </div>

          {/* 4. Compact Single-Line Footer Navigation */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-500">
            <Link href="/formations" className="hover:text-slate-900 font-medium transition-colors">
              Explorer les formations
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/" className="font-bold text-slate-900 hover:text-afi-red transition-colors">
              Retour à l&apos;accueil &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MULTI-STEP WIZARD (Apple / Google Modern Minimalist Clean Design)
  // =========================================================================
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden w-full max-w-5xl lg:max-w-6xl mx-auto transition-all">
      {/* 1. Apple-style Segmented Progress Track */}
      <div className="p-4 sm:p-7 lg:p-8 bg-slate-50/50 border-b border-slate-200/60 space-y-4 sm:space-y-5 rounded-t-2xl sm:rounded-t-3xl">
        {/* Step indicator badges */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold shrink-0">
              {currentStep}
            </span>
            <span className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              Étape {currentStep}/5
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-600 truncate">
              {STEPS[currentStep - 1].short}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <span>Dossier Officiel 2026-2027</span>
          </div>
        </div>

        {/* 5-segment modern progress bar */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (s.id < currentStep) setCurrentStep(s.id);
                }}
                disabled={s.id > currentStep}
                className="group flex flex-col gap-1.5 text-left focus:outline-none"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "bg-afi-red"
                      : isCompleted
                      ? "bg-slate-900"
                      : "bg-slate-200"
                  }`}
                />
                <span
                  className={`hidden sm:block text-[10px] md:text-[11px] font-semibold truncate transition-colors ${
                    isCurrent
                      ? "text-slate-900 font-bold"
                      : isCompleted
                      ? "text-slate-600"
                      : "text-slate-400"
                  }`}
                >
                  {s.short}
                </span>
              </button>
            );
          })}
        </div>

        {/* Title & subtitle of current step */}
        <div className="pt-0.5 sm:pt-1">
          <h2 className="font-heading font-black text-lg sm:text-2xl text-slate-900 tracking-tight">
            {STEPS[currentStep - 1].title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
            {STEPS[currentStep - 1].desc}
          </p>
        </div>
      </div>

      {/* 2. Main Form Content */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
        {/* Error notification (100% opaque, zero pastel) */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-sm animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        {/* =========================================================================
            ÉTAPE 1 : PROGRAMME & NIVEAU
            ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Type de Programme (Apple Clean Interactive Cards) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Type de Programme & Régime d&apos;Études *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  { id: "initiale_licence", label: "Licence Initiale (Jour)", sub: "Cours réguliers en présentiel", icon: GraduationCap },
                  { id: "continue_licence", label: "Licence Continue (Soir)", sub: "Pour professionnels et salariés", icon: Briefcase },
                  { id: "master", label: "Master Professionnel", sub: "Bac+5 diplôme d'excellence", icon: Award },
                  { id: "cours_weekend", label: "Cours du Week-end", sub: "Samedi & dimanche (professionnels)", icon: Calendar },
                  { id: "presup", label: "PRESUP (Classe Prépa)", sub: "Mise à niveau & prépa universitaire", icon: BookOpen },
                  { id: "elearning", label: "E-Learning (100% En Ligne)", sub: "Formation flexible à distance", icon: Laptop },
                ].map((item) => {
                  const isSelected = formData.programme_type === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleProgrammeTypeSelect(item.id as any)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? "border-slate-900 ring-2 ring-slate-900/10 bg-slate-50/50 shadow-sm"
                          : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option Licence Initiale (si sélectionnée) */}
            {formData.programme_type === "initiale_licence" && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-800">
                  Parcours Licence Initiale :
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { id: "international_leader", label: "International Leader" },
                    { id: "multiprogramme", label: "Multiprogramme" },
                  ].map((opt) => {
                    const isChecked = formData.sous_option === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            sous_option: opt.id as any,
                          }))
                        }
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isChecked
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Niveau d'entrée sollicité */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Niveau d&apos;Entrée Sollicité *
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "licence_1", label: "Licence 1", cycle: "licence" },
                  { id: "licence_2", label: "Licence 2", cycle: "licence" },
                  { id: "licence_3", label: "Licence 3", cycle: "licence" },
                  { id: "master_1", label: "Master 1", cycle: "master" },
                  { id: "master_2", label: "Master 2", cycle: "master" },
                ].map((item) => {
                  const isSelected = formData.niveau === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNiveauSelect(item.id as any)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choix de la filière académique avec Sélecteur & Recherche Intégrée */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Filière Académique Officielle AFI-L&apos;UE *
              </label>

              {/* Carte Récapitulative de la Filière Sélectionnée */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <span
                    className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0 shadow-2xs ${
                      isMasterCycle ? "bg-afi-red text-white" : "bg-slate-900 text-white"
                    }`}
                  >
                    {isMasterCycle ? "MASTER" : "LICENCE"}
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                      {formData.specialite || "Sélectionnez votre filière ci-dessous"}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {formData.domaine}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFormationDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer shadow-2xs shrink-0"
                >
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isFormationDropdownOpen ? "Masquer la liste" : `Changer de ${isMasterCycle ? "Master" : "Licence"}`}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                      isFormationDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Panneau de Recherche Intégré (Dans le flux de la page, aucun débordement) */}
              {isFormationDropdownOpen && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-150">
                  {/* Barre de Recherche Dynamique */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      autoFocus
                      value={formationSearch}
                      onChange={(e) => setFormationSearch(e.target.value)}
                      placeholder={`Rechercher parmi les ${availableFormationsForCycle.length} ${isMasterCycle ? "Masters" : "Licences"} (ex: Banque, Informatique, Audit...)`}
                      className="w-full pl-10 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                    />
                    {formationSearch && (
                      <button
                        type="button"
                        onClick={() => setFormationSearch("")}
                        className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* En-tête du Cycle Actif */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          isMasterCycle ? "bg-afi-red text-white" : "bg-slate-900 text-white"
                        }`}
                      >
                        {isMasterCycle ? "FORMATIONS MASTER (BAC+5)" : "FORMATIONS LICENCE (BAC+3)"}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {availableFormationsForCycle.length} filières disponibles
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Niveau choisi : {formData.niveau.replace("_", " ").toUpperCase()}
                    </span>
                  </div>

                  {/* Grille des Formations (2 colonnes sur tablette/desktop, 1 sur mobile) */}
                  <div className="max-h-80 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                    {filteredFormations.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {filteredFormations.map((f) => {
                          const isSelected = formData.specialite === f.title;
                          const isMaster = f.level === "master";

                          return (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => handleFormationSelect(f.id)}
                              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                isSelected
                                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shrink-0 ${
                                      isMaster ? "bg-afi-red text-white" : "bg-slate-800 text-white"
                                    }`}
                                  >
                                    {isMaster ? "MASTER" : "LICENCE"}
                                  </span>
                                </div>
                                <span
                                  className={`text-xs sm:text-sm font-bold block truncate leading-snug ${
                                    isSelected ? "text-white" : "text-slate-900"
                                  }`}
                                >
                                  {f.title}
                                </span>
                                {f.domain && (
                                  <span
                                    className={`text-[10px] sm:text-[11px] block truncate mt-0.5 ${
                                      isSelected ? "text-slate-300" : "text-slate-400"
                                    }`}
                                  >
                                    {f.domain.name}
                                  </span>
                                )}
                              </div>

                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                  isSelected
                                    ? "bg-white text-slate-900 border-white"
                                    : "border-slate-300 bg-slate-50"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-8 text-center space-y-1 bg-slate-50 rounded-xl">
                        <p className="text-xs font-bold text-slate-700">Aucune filière trouvée</p>
                        <p className="text-[11px] text-slate-400">
                          Aucun résultat ne correspond à « {formationSearch} »
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bouton de Fermeture */}
                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsFormationDropdownOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      Fermer la liste
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            ÉTAPE 2 : ÉTAT CIVIL & COORDONNÉES
            ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Civilité */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Civilité *
              </label>
              <div className="flex gap-2">
                {(["M.", "Mme", "Mlle"] as const).map((civ) => (
                  <button
                    key={civ}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, civilite: civ }))}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      formData.civilite === civ
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {civ}
                  </button>
                ))}
              </div>
            </div>

            {/* Nom & Prénom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nom de Famille *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nom: e.target.value.toUpperCase() }))}
                  placeholder="Ex: DIOP"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Prénom(s) *
                </label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData((prev) => ({ ...prev, prenom: e.target.value }))}
                  placeholder="Ex: Mamadou"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Date, Lieu & Nationalité */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Date de Naissance *
                </label>
                <input
                  type="date"
                  value={formData.date_naissance}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date_naissance: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Lieu de Naissance *
                </label>
                <input
                  type="text"
                  value={formData.lieu_naissance}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lieu_naissance: e.target.value }))}
                  placeholder="Dakar"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nationalité *
                </label>
                <input
                  type="text"
                  value={formData.nationalite}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nationalite: e.target.value }))}
                  placeholder="Sénégalaise"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Adresse & Ville */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Adresse de Résidence *
                </label>
                <input
                  type="text"
                  value={formData.adresse}
                  onChange={(e) => setFormData((prev) => ({ ...prev, adresse: e.target.value }))}
                  placeholder="Point E, Rue 5 x Rue de Louga"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ville / Commune *
                </label>
                <input
                  type="text"
                  value={formData.ville}
                  onChange={(e) => setFormData((prev) => ({ ...prev, ville: e.target.value }))}
                  placeholder="Dakar"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Téléphones & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Téléphone Fixe / Domicile
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, telephone: e.target.value }))}
                  placeholder="+221 33 824 00 00"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Téléphone Portable (WhatsApp) *
                </label>
                <input
                  type="tel"
                  value={formData.portable}
                  onChange={(e) => setFormData((prev) => ({ ...prev, portable: e.target.value }))}
                  placeholder="+221 77 000 00 00"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Adresse E-mail *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="candidat@email.com"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ÉTAPE 3 : TUTEUR / BAILLEUR
            ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* iOS-style Segmented Switcher */}
            <div className="grid grid-cols-3 sm:flex items-center gap-1 p-1 bg-slate-100 rounded-2xl w-full sm:w-fit">
              {[
                { id: "pere", label: "Père" },
                { id: "mere", label: "Mère" },
                { id: "autre", label: "Autre Tuteur" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTuteurTab(tab.id as any)}
                  className={`px-2 sm:px-4 py-2 rounded-xl text-center text-[11px] sm:text-xs font-bold transition-all cursor-pointer truncate ${
                    activeTuteurTab === tab.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Tuteur Card */}
            {activeTuteurTab === "pere" && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <span className="text-xs font-bold text-slate-800 block">Coordonnées du Père :</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nom &amp; Prénom(s) *</label>
                    <input
                      type="text"
                      value={formData.pere?.nom_prenom || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pere: { ...prev.pere!, nom_prenom: e.target.value },
                        }))
                      }
                      placeholder="Nom complet du père"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Profession</label>
                    <input
                      type="text"
                      value={formData.pere?.profession || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pere: { ...prev.pere!, profession: e.target.value },
                        }))
                      }
                      placeholder="Ex: Cadre d'entreprise, Enseignant..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Téléphone (avec indicatif) *</label>
                    <input
                      type="tel"
                      value={formData.pere?.telephone || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pere: { ...prev.pere!, telephone: e.target.value },
                        }))
                      }
                      placeholder="+221 77 000 00 00"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.pere?.email || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pere: { ...prev.pere!, email: e.target.value },
                        }))
                      }
                      placeholder="pere@email.com"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Adresse</label>
                    <input
                      type="text"
                      value={formData.pere?.adresse || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pere: { ...prev.pere!, adresse: e.target.value },
                        }))
                      }
                      placeholder="Adresse physique du domicile"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTuteurTab === "mere" && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <span className="text-xs font-bold text-slate-800 block">Coordonnées de la Mère :</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nom &amp; Prénom(s) *</label>
                    <input
                      type="text"
                      value={formData.mere?.nom_prenom || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mere: { ...prev.mere!, nom_prenom: e.target.value },
                        }))
                      }
                      placeholder="Nom complet de la mère"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Profession</label>
                    <input
                      type="text"
                      value={formData.mere?.profession || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mere: { ...prev.mere!, profession: e.target.value },
                        }))
                      }
                      placeholder="Ex: Fonctionnaire, Commerçante..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Téléphone (avec indicatif) *</label>
                    <input
                      type="tel"
                      value={formData.mere?.telephone || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mere: { ...prev.mere!, telephone: e.target.value },
                        }))
                      }
                      placeholder="+221 77 000 00 00"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.mere?.email || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mere: { ...prev.mere!, email: e.target.value },
                        }))
                      }
                      placeholder="mere@email.com"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Adresse</label>
                    <input
                      type="text"
                      value={formData.mere?.adresse || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mere: { ...prev.mere!, adresse: e.target.value },
                        }))
                      }
                      placeholder="Adresse physique du domicile"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTuteurTab === "autre" && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <span className="text-xs font-bold text-slate-800 block">Autre Tuteur Légal ou Bailleur :</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nom &amp; Prénom(s) *</label>
                    <input
                      type="text"
                      value={formData.autre_tuteur?.nom_prenom || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          autre_tuteur: { ...prev.autre_tuteur!, nom_prenom: e.target.value },
                        }))
                      }
                      placeholder="Nom du tuteur légal"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Profession</label>
                    <input
                      type="text"
                      value={formData.autre_tuteur?.profession || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          autre_tuteur: { ...prev.autre_tuteur!, profession: e.target.value },
                        }))
                      }
                      placeholder="Profession"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Téléphone (avec indicatif) *</label>
                    <input
                      type="tel"
                      value={formData.autre_tuteur?.telephone || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          autre_tuteur: { ...prev.autre_tuteur!, telephone: e.target.value },
                        }))
                      }
                      placeholder="+221 77 000 00 00"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.autre_tuteur?.email || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          autre_tuteur: { ...prev.autre_tuteur!, email: e.target.value },
                        }))
                      }
                      placeholder="tuteur@email.com"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Adresse</label>
                    <input
                      type="text"
                      value={formData.autre_tuteur?.adresse || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          autre_tuteur: { ...prev.autre_tuteur!, adresse: e.target.value },
                        }))
                      }
                      placeholder="Adresse"
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            ÉTAPE 4 : PARCOURS SCOLAIRE & LANGUES
            ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Cursus scolaire */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Votre Parcours Scolaire & Académique *
                  </label>
                  <p className="text-[11px] text-slate-400">
                    De la classe de terminale à votre dernière année d&apos;études.
                  </p>
                </div>
                {(formData.parcours?.length || 0) < 7 && (
                  <button
                    type="button"
                    onClick={addParcoursRow}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter une année</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {formData.parcours?.map((row, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                  >
                    <div className="sm:col-span-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Année</span>
                      <input
                        type="text"
                        placeholder="2024-2025"
                        value={row.annee}
                        onChange={(e) => updateParcoursRow(idx, "annee", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Diplôme / Titre</span>
                      <input
                        type="text"
                        placeholder="Baccalauréat Série S2"
                        value={row.diplome}
                        onChange={(e) => updateParcoursRow(idx, "diplome", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Établissement &amp; Ville</span>
                      <input
                        type="text"
                        placeholder="Lycée Lamine Guèye, Dakar"
                        value={row.etablissement}
                        onChange={(e) => updateParcoursRow(idx, "etablissement", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-end gap-1.5">
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Obtention</span>
                        <input
                          type="text"
                          placeholder="Juil 2025"
                          value={row.date_obtention}
                          onChange={(e) => updateParcoursRow(idx, "date_obtention", e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:border-slate-900 focus:outline-none"
                        />
                      </div>
                      {formData.parcours!.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeParcoursRow(idx)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Évaluation des Langues */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Compétences Linguistiques
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { key: "langue_1", defaultName: "Français" },
                  { key: "langue_2", defaultName: "Anglais" },
                  { key: "langue_3", defaultName: "Autre langue 1" },
                  { key: "langue_autres", defaultName: "Autre langue 2" },
                ].map(({ key, defaultName }) => {
                  const val = (formData as any)[key] as { nom: string; niveau: string };
                  return (
                    <div key={key} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <input
                        type="text"
                        placeholder={defaultName}
                        value={val?.nom || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [key]: { ...(prev as any)[key], nom: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                      />
                      <div className="flex gap-2 pt-1">
                        {(["faible", "moyen", "eleve"] as const).map((lvl) => {
                          const isChecked = val?.niveau === lvl;
                          return (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  [key]: { ...(prev as any)[key], niveau: lvl },
                                }))
                              }
                              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium capitalize transition-all cursor-pointer ${
                                isChecked
                                  ? "bg-slate-900 text-white font-bold shadow-xs"
                                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {lvl === "eleve" ? "Élevé" : lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comment avez-vous connu l'AFI */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Comment avez-vous connu l&apos;AFI-L&apos;UE ?
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "site_internet", label: "Site Internet" },
                  { id: "reseaux_sociaux", label: "Réseaux sociaux" },
                  { id: "bouche_a_oreille", label: "Bouche à oreille" },
                  { id: "etudiant_afi", label: "Étudiant de l'AFI-L'UE" },
                  { id: "salons", label: "Salons & Forums" },
                  { id: "presentation_etablissement", label: "Présentation au lycée" },
                  { id: "conseiller_orientation", label: "Conseiller d'orientation" },
                  { id: "evenement_afi", label: "Événement AFI" },
                  { id: "affichage", label: "Affichage" },
                  { id: "publicite_presse", label: "Publicité presse" },
                  { id: "article_presse", label: "Article de presse" },
                  { id: "courrier_mailing", label: "Courrier / Mailing" },
                ].map((src) => {
                  const checked = formData.sources_connaissance?.includes(src.id);
                  return (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => toggleSource(src.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        checked
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />}
                      <span>{src.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ÉTAPE 5 : MOTIVATIONS & ACCORD
            ========================================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Motivations */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Vos Motivations sur le choix de la filière et de l&apos;université *
              </label>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Précisez vos expériences, vos points forts et votre projet professionnel.
              </p>
              <textarea
                rows={6}
                value={formData.motivations_texte || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, motivations_texte: e.target.value }))}
                placeholder="Rédigez votre texte ici... Expliquez pourquoi vous avez choisi l'Université de l'Entreprise et vos ambitions professionnelles futures."
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Attestation sur l'honneur */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                Attestation sur l&apos;honneur du candidat
              </span>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.attestation_lu_et_approuve}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        attestation_lu_et_approuve: e.target.checked,
                      }))
                    }
                    className="mt-0.5 rounded text-slate-900 focus:ring-slate-900 shrink-0 w-4 h-4"
                  />
                  <span>
                    <strong>J&apos;atteste sur l&apos;honneur</strong> de l&apos;exactitude des renseignements et des pièces fournies et m&apos;engage à prévenir l&apos;établissement de tout changement éventuel.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.attestation_lu_et_approuve}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        attestation_lu_et_approuve: e.target.checked,
                      }))
                    }
                    className="mt-0.5 rounded text-slate-900 focus:ring-slate-900 shrink-0 w-4 h-4"
                  />
                  <span>
                    <strong>Je reconnais avoir pris connaissance</strong> des règlements intérieur et financier dont j&apos;approuve les contenus et m&apos;engage à m&apos;y conformer.
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fait à</label>
                  <input
                    type="text"
                    value={formData.attestation_lieu}
                    onChange={(e) => setFormData((prev) => ({ ...prev, attestation_lieu: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="text"
                    value={formData.attestation_date}
                    readOnly
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Apple-style Action Buttons Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow active:scale-98 cursor-pointer w-full sm:w-auto sm:ml-auto"
            >
              <span>Continuer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-afi-red hover:bg-red-700 disabled:opacity-60 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-afi-red/20 active:scale-98 cursor-pointer w-full sm:w-auto sm:ml-auto"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isPending ? "Validation du dossier..." : "Valider & Déposer ma Candidature"}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CandidatureMultiStepForm;
