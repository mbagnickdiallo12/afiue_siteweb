import Link from "next/link";
import {
  GraduationCap,
  MessageSquareQuote,
  FileCheck,
  Newspaper,
  Settings,
  PlusCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Layers,
  ChevronRight,
  Users,
  Bot,
} from "lucide-react";
import { getAllFormationsAdmin } from "@/lib/services/formations.service";
import { getAllTestimonialsAdmin } from "@/lib/services/testimonials.service";
import { getAllArticlesAdmin } from "@/lib/services/articles.service";
import { getCandidatures } from "@/lib/services/candidatures.service";
import { getSiteSettings } from "@/lib/services/settings.service";

export default async function AdminDashboardPage() {
  const [formations, testimonials, articles, candidatures, settings] =
    await Promise.all([
      getAllFormationsAdmin(),
      getAllTestimonialsAdmin(),
      getAllArticlesAdmin(),
      getCandidatures(),
      getSiteSettings(),
    ]);

  const licencesCount = formations.filter((f) => f.level === "licence").length;
  const mastersCount = formations.filter((f) => f.level === "master").length;
  const candidaturesEnAttente = candidatures.filter((c) => c.status === "soumis").length;
  const articlesPublies = articles.filter((a) => a.status === "published").length;

  const kpis = [
    {
      label: "Formations Diplômantes",
      count: formations.length,
      detail: `${licencesCount} Licences · ${mastersCount} Masters`,
      icon: GraduationCap,
      color: "bg-afi-navy text-white",
      href: "/admin/formations",
    },
    {
      label: "Témoignages Alumni",
      count: testimonials.length,
      detail: "Photos et avis officiels vérifiés",
      icon: MessageSquareQuote,
      color: "bg-amber-600 text-white",
      href: "/admin/testimonials",
    },
    {
      label: "Candidatures Reçues",
      count: candidatures.length,
      detail: `${candidaturesEnAttente} en attente de traitement`,
      icon: FileCheck,
      color: "bg-afi-red text-white",
      href: "/admin/candidatures",
    },
    {
      label: "Actualités & Blog",
      count: articles.length,
      detail: `${articlesPublies} articles publiés en ligne`,
      icon: Newspaper,
      color: "bg-emerald-600 text-white",
      href: "/admin/articles",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* =========================================================================
          1. HEADER & ACTIONS RAPIDES
          ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
            Portail d&apos;Administration Centralisé
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Centre de Contrôle Administratif
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-2xl">
            Gestion complète et en temps réel de tous les contenus dynamiques de l&apos;Université AFI-L&apos;UE.
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/admin/formations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Formations</span>
          </Link>
          <Link
            href="/admin/testimonials"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-95"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Témoignages</span>
          </Link>
          <Link
            href="/admin/candidatures"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-afi-navy hover:bg-[#121A38] text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-95"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Candidatures</span>
          </Link>
          <Link
            href="/admin/utilisateurs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-95"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Utilisateurs</span>
          </Link>
          <Link
            href="/admin/sophie"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-95"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Agent IA Sophie</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          2. CARTES KPI (Style Moderne, Épuré, Inspiré Kanto)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="group relative rounded-3xl bg-white border border-slate-200/70 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle Ethereal Ambient Glow Corner on Hover */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-xl group-hover:bg-slate-200/70 transition-all duration-300 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Card Top: Icon & Top-Right Arrow */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105 ${kpi.color}`}
                >
                  <kpi.icon className="w-4 h-4" />
                </div>

                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-200 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Number and Label */}
              <div>
                <div className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight group-hover:text-afi-red transition-colors">
                  {kpi.count}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                  {kpi.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 font-medium">
                  {kpi.detail}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* =========================================================================
          3. SECTIONS PRINCIPALES (Filières Récentes & Dossiers de Candidature)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Formations Preview Card */}
        <div className="bg-white rounded-3xl border border-slate-200/70 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-all space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-tight">
                  Filières Récentes
                </h3>
                <span className="text-[11px] font-medium text-slate-400">
                  {formations.length} programmes au catalogue
                </span>
              </div>
            </div>

            <Link
              href="/admin/formations"
              className="text-xs font-bold text-slate-500 hover:text-afi-red transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100 group"
            >
              <span>Gérer le catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2">
            {formations.slice(0, 5).map((f) => (
              <div
                key={f.id}
                className="p-3 sm:p-3.5 rounded-2xl hover:bg-slate-50/90 transition-all flex items-center justify-between gap-4 border border-transparent hover:border-slate-100/90 group/row"
              >
                <div className="min-w-0 space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover/row:text-afi-red transition-colors">
                    {f.title}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold uppercase text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-white">
                      {f.level}
                    </span>
                    <span>&bull;</span>
                    <span>{f.duration_years} ans</span>
                    <span>&bull;</span>
                    <span className="truncate max-w-[200px]">{f.domaine}</span>
                  </div>
                </div>

                {/* Option A Rule: Text + Icon without pill background */}
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Publié</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Candidatures Preview Card */}
        <div className="bg-white rounded-3xl border border-slate-200/70 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-all space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-afi-red text-white flex items-center justify-center shadow-xs">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-tight">
                  Dossiers de Candidature
                </h3>
                <span className="text-[11px] font-medium text-slate-400">
                  {candidatures.length} dossiers enregistrés
                </span>
              </div>
            </div>

            <Link
              href="/admin/candidatures"
              className="text-xs font-bold text-slate-500 hover:text-afi-red transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100 group"
            >
              <span>Examiner tous les dossiers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-2">
            {candidatures.slice(0, 5).map((c) => (
              <div
                key={c.id}
                className="p-3 sm:p-3.5 rounded-2xl hover:bg-slate-50/90 transition-all flex items-center justify-between gap-4 border border-transparent hover:border-slate-100/90 group/row"
              >
                <div className="min-w-0 space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover/row:text-afi-red transition-colors">
                    {c.first_name} {c.last_name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate flex items-center gap-2">
                    <span className="font-bold text-slate-500">{c.reference_code}</span>
                    <span>&bull;</span>
                    <span className="font-sans text-slate-500 truncate max-w-[220px]">
                      {c.formation?.title || "Filière choisie"}
                    </span>
                  </div>
                </div>

                {/* Option A Rule: Text + Icon without pill background */}
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold shrink-0 ${
                    c.status === "soumis"
                      ? "text-amber-600"
                      : c.status === "en_revue"
                      ? "text-blue-600"
                      : c.status === "admis"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {c.status === "soumis" || c.status === "en_revue" ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>
                    {c.status === "soumis"
                      ? "En attente"
                      : c.status === "en_revue"
                      ? "En examen"
                      : c.status === "admis"
                      ? "Admis"
                      : "Non retenu"}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. BANNIÈRE DE SYNCHRONISATION EN DIRECT (Command Island)
          ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white border border-slate-800/80 p-7 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1E2E6B]/30 blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Synchronisation en direct
          </div>
          <h3 className="font-heading font-black text-xl text-white tracking-tight">
            Données synchronisées en temps réel
          </h3>
          <p className="text-xs text-slate-300 font-normal leading-relaxed">
            Modifications appliquées instantanément sur l&apos;ensemble du site.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
          <Link
            href="/admin/vie-etudiante"
            className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Vie Étudiante
          </Link>
          <Link
            href="/admin/partenaires"
            className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Partenaires
          </Link>
          <Link
            href="/admin/slides"
            className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Slider Hero
          </Link>
          <Link
            href="/admin/popups"
            className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Popups Événements
          </Link>
          <Link
            href="/admin/settings"
            className="px-5 py-2.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Paramètres du site
          </Link>
        </div>
      </div>
    </div>
  );
}
