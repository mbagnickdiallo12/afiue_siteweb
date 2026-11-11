"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Folder,
  Play,
  Database,
  Settings,
  FileText,
  Save,
  Copy,
  FolderInput,
  Upload,
  RotateCcw,
  Filter,
  ListFilter,
  Type,
  X,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  ArrowLeft,
  KeyRound,
  Loader2,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const HERO_SLIDES = [
  {
    title: "Administration du Site AFI-L'UE",
    subtitle:
      "Gérez l'ensemble des contenus du site internet officiel : formations, actualités, témoignages, médias et candidatures en ligne.",
  },
  {
    title: "Gestion du Site en Temps Réel",
    subtitle:
      "Mettez à jour les pages, le slider d'accueil, la vie étudiante et les partenaires avec publication immédiate sur le site web.",
  },
  {
    title: "Back-Office & Accès Sécurisés",
    subtitle:
      "Espace réservé aux administrateurs habilités pour piloter et administrer le site internet d'AFI-L'Université de l'Entreprise.",
  },
];

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetInfo, setShowResetInfo] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShowResetInfo(false);

    if (!email.trim() || !password) {
      setError("Veuillez saisir votre adresse e-mail et votre mot de passe.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          rememberMe,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error ||
            "Identifiants incorrects. Veuillez vérifier vos informations."
        );
        setIsLoading(false);
        return;
      }

      const safeRedirect =
        redirectUrl.startsWith("/admin") && redirectUrl !== "/admin/login"
          ? redirectUrl
          : "/admin";

      router.push(safeRedirect);
      router.refresh();
    } catch {
      setError("Erreur réseau lors de la connexion au serveur.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#DCE3F1] flex items-center justify-center p-0 sm:p-6 lg:p-10 font-body antialiased">
      {/* Main Split Card Container */}
      <div className="w-full max-w-[1240px] min-h-screen sm:min-h-[720px] bg-white sm:rounded-[16px] shadow-[0_25px_70px_rgba(15,23,42,0.14)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* =====================================================================
            COLONNE GAUCHE — VISUEL GÉOMÉTRIQUE BLEU & APERÇU DASHBOARD
            ===================================================================== */}
        <div className="relative bg-[#2447E6] text-white flex flex-col justify-between overflow-hidden min-h-[460px] lg:min-h-full select-none">
          {/* Geometric Faceted Polygons Background (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            viewBox="0 0 600 750"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Base Royal Blue */}
            <rect width="600" height="750" fill="#2345E2" />
            {/* Diagonal Facets matching the reference geometric design */}
            <polygon points="0,0 440,0 160,460 0,460" fill="#1E3DD2" />
            <polygon points="440,0 600,0 600,240 240,410" fill="#2E52EE" />
            <polygon points="600,110 600,450 230,430" fill="#3B5FF7" />
            <polygon points="0,460 230,430 410,750 0,750" fill="#1A35BE" />
            <polygon points="230,430 600,450 600,750 380,750" fill="#4669FA" />
            <polygon points="150,310 370,220 230,430" fill="#3357F3" />
          </svg>

          {/* Top Bar: Official Logo & Back to Site */}
          <div className="relative z-10 px-8 sm:px-12 pt-8 sm:pt-10 flex items-center justify-between">
            <Logo variant="light" size="md" />

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Site public</span>
            </Link>
          </div>

          {/* Center-Left Copy & Carousel Dots */}
          <div className="relative z-10 px-8 sm:px-14 lg:px-16 my-auto py-8">
            <div className="max-w-[360px] space-y-3">
              <h1 className="font-heading font-light text-2xl sm:text-[32px] text-white tracking-tight leading-snug">
                {HERO_SLIDES[activeSlide].title}
              </h1>
              <p className="text-xs sm:text-[13px] text-blue-100 leading-relaxed font-normal">
                {HERO_SLIDES[activeSlide].subtitle}
              </p>

              {/* Slider Pagination Indicator (— • •) */}
              <div
                className="flex items-center gap-2 pt-5"
                role="tablist"
                aria-label="Présentation du portail"
              >
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={slide.title}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx
                        ? "w-5 bg-white"
                        : "w-1.5 bg-blue-300 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom-Right Anchored Dashboard UI Mockup (Matching "Example File" card in reference) */}
          <div className="relative z-10 ml-8 sm:ml-16 lg:ml-20 mt-2">
            {/* Mini App Preview Window */}
            <div className="rounded-tl-2xl bg-white shadow-[0_-12px_45px_rgba(11,22,78,0.32)] flex overflow-hidden h-[290px] sm:h-[330px]">
              {/* Mini Deep-Blue Sidebar */}
              <div className="w-14 bg-[#1937C6] flex flex-col items-center py-5 gap-5 shrink-0">
                <div className="w-6 h-6 rounded border-2 border-white flex items-center justify-center mb-2">
                  <span className="w-2 h-2 bg-white rounded-xs" />
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#4868FA] text-white flex items-center justify-center shadow-sm">
                  <Folder className="w-4 h-4 fill-current" />
                </div>

                <div className="w-9 h-9 rounded-xl text-blue-200 flex items-center justify-center">
                  <Play className="w-4 h-4" />
                </div>

                <div className="w-9 h-9 rounded-xl text-blue-200 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>

                <div className="w-9 h-9 rounded-xl text-blue-200 flex items-center justify-center">
                  <Settings className="w-4 h-4" />
                </div>
              </div>

              {/* Mini Spreadsheet / Analytics Content */}
              <div className="flex-1 bg-white pt-5 pl-5 sm:pl-6 pr-0 flex flex-col min-w-0 text-slate-700">
                {/* File Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <FileText className="w-4 h-4 text-[#2447E6] shrink-0" />
                  <span className="text-sm font-medium text-slate-700 truncate">
                    Gestion du Site Web AFI-L&apos;UE
                  </span>
                </div>

                {/* Action Icons Toolbar */}
                <div className="border border-slate-100 rounded-l-lg px-3 py-2.5 mb-3 flex items-center gap-4 sm:gap-5 overflow-hidden">
                  {[
                    Save,
                    Copy,
                    FolderInput,
                    Upload,
                    RotateCcw,
                    Filter,
                    ListFilter,
                    Type,
                  ].map((IconComp, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1.5 shrink-0"
                    >
                      <IconComp className="w-3.5 h-3.5 text-slate-500" />
                      <span className="w-5 h-1.5 rounded-full bg-slate-100" />
                    </div>
                  ))}
                </div>

                {/* Search / Filter Bar */}
                <div className="flex items-center gap-2 mb-3 pr-4">
                  <div className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 h-7 rounded bg-slate-50 border border-slate-100 px-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="w-2.5 h-2.5 text-slate-500 fill-current" />
                      <span className="w-24 sm:w-32 h-3 rounded bg-white border border-slate-100" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-3.5 rounded-full bg-slate-200 flex items-center px-0.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white shadow-2xs" />
                      </div>
                      <Trash2 className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Spreadsheet Rows */}
                <div className="flex-1 border-t border-l border-slate-200 text-[10px] text-slate-500 overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 font-semibold text-slate-600 h-6 items-center">
                    <div className="col-span-1 text-center border-r border-slate-200">
                      #
                    </div>
                    <div className="col-span-4 px-2 border-r border-slate-200 flex items-center justify-between">
                      <span className="font-serif font-bold">Tt</span>
                      <span className="text-[8px]">▾</span>
                    </div>
                    <div className="col-span-4 px-2 border-r border-slate-200 flex items-center justify-between">
                      <span>AZ</span>
                      <span className="text-[8px]">▾</span>
                    </div>
                    <div className="col-span-3 px-2 flex items-center justify-between">
                      <span>AZ</span>
                    </div>
                  </div>

                  {/* Table Body Rows */}
                  {[1, 2, 3, 4, 5, 6].map((rowNum) => (
                    <div
                      key={rowNum}
                      className="grid grid-cols-12 border-b border-slate-100 h-6 items-center"
                    >
                      <div className="col-span-1 text-center border-r border-slate-200 text-[9px] text-slate-400">
                        {rowNum}
                      </div>
                      <div className="col-span-4 px-2 border-r border-slate-100 flex items-center justify-end">
                        <span className="w-8 h-2 rounded-xs bg-slate-100" />
                      </div>
                      <div className="col-span-4 px-2 border-r border-slate-100 flex items-center justify-end">
                        <span className="w-8 h-2 rounded-xs bg-slate-100" />
                      </div>
                      <div className="col-span-3 px-2 flex items-center">
                        <span className="w-10 h-2 rounded-xs bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            COLONNE DROITE — FORMULAIRE DE CONNEXION
            ===================================================================== */}
        <div className="bg-white flex flex-col justify-center px-6 sm:px-14 lg:px-20 py-12 relative">
          <div className="w-full max-w-[380px] mx-auto">
            {/* Heading */}
            <h2 className="font-heading text-[28px] font-semibold text-slate-800 tracking-tight mb-7">
              Connexion
            </h2>

            {/* Error Alert (Rule Option B: 100% Opaque Solid Red Background + White Text) */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-600 text-white text-xs font-semibold flex items-start gap-2.5 shadow-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Password Reset Instruction Box (Rule Option B: 100% Opaque Solid Navy Background + White Text) */}
            {showResetInfo && (
              <div className="mb-6 p-4 rounded-xl bg-afi-navy text-white text-xs space-y-1.5 shadow-sm">
                <div className="font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Réinitialisation du mot de passe</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowResetInfo(false)}
                    className="text-white hover:opacity-80 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-200 leading-relaxed text-[11px]">
                  Les comptes étant gérés manuellement, veuillez contacter le{" "}
                  <strong className="text-white">Super Administrateur</strong>{" "}
                  (admin@afi-ue.sn) pour générer un nouveau mot de passe.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email Address Input */}
              <div>
                <label
                  htmlFor="admin-login-email"
                  className="block text-xs font-medium text-slate-600 mb-2"
                >
                  Adresse e-mail
                </label>
                <input
                  id="admin-login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@afi-ue.sn"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2447E6] focus:ring-2 focus:ring-[#2447E6]/15 transition-all"
                />
              </div>

              {/* Password Input with inline Reset Password action */}
              <div>
                <label
                  htmlFor="admin-login-password"
                  className="block text-xs font-medium text-slate-600 mb-2"
                >
                  Mot de passe
                </label>
                <div className="flex items-center h-12 px-4 rounded-xl border border-slate-200 bg-white focus-within:border-[#2447E6] focus-within:ring-2 focus-within:ring-[#2447E6]/15 transition-all gap-2">
                  <input
                    id="admin-login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none min-w-0"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer shrink-0"
                    title={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowResetInfo((prev) => !prev)}
                    className="text-[11px] font-semibold text-[#2447E6] hover:text-[#1937C6] transition-colors shrink-0 cursor-pointer"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              </div>

              {/* Remember Password Checkbox */}
              <div className="flex items-center pt-0.5">
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none group">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={rememberMe}
                    onClick={() => setRememberMe((prev) => !prev)}
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer ${
                      rememberMe
                        ? "bg-[#2447E6] text-white"
                        : "border border-slate-300 bg-white group-hover:border-[#2447E6]"
                    }`}
                  >
                    {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                    Mémoriser le mot de passe
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-[#2B50EC] hover:bg-[#1D3FD4] active:scale-[0.99] disabled:opacity-60 text-white text-sm font-semibold shadow-md shadow-[#2B50EC]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Connexion en cours...</span>
                    </>
                  ) : (
                    <span>Se connecter</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#DCE3F1] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-3 border-[#2447E6] border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
