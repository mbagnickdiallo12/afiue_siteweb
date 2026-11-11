"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon,
  Laptop,
  CalendarDays,
  TrendingUp,
  Award,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function ModernHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-afi-navy-950 via-afi-navy-900 to-afi-navy-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Ambient background glows (Apple/Omoway 2026 style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-afi-red/20 via-transparent to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-afi-red/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Live Campaign Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-afi-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-afi-red"></span>
              </span>
              <span className="font-bold tracking-wider uppercase text-[11px] text-slate-200">
                Rentrée 2026-2027
              </span>
              <span className="text-white/40">•</span>
              <span className="text-slate-300">Inscriptions Ouvertes</span>
              <Sparkles className="w-3.5 h-3.5 text-slate-300" />
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white">
                Ton avenir{" "}
                <span className="bg-gradient-to-r from-afi-red via-red-500 to-red-400 bg-clip-text text-transparent">
                  commence ici.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed pt-2">
                Rejoignez <strong className="text-white font-semibold">AFI-L&apos;Université de l&apos;Entreprise</strong>, 
                pôle d&apos;excellence pionnier à Dakar & Thiès. Des cursus professionnalisants d&apos;élite, 
                reconnus par le <strong>CAMES</strong> et habilités par l&apos;<strong>ANAQ-Sup</strong>.
              </p>
            </div>

            {/* Study Modes Pills (Jour, Distance, Soir, Week-end) */}
            <div className="space-y-3 pt-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rejoignez nos Licences et Masters en :
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: "Cours du Jour", icon: Sun, desc: "Immersion campus" },
                  { label: "Cours du Soir", icon: Moon, desc: "Executive" },
                  { label: "À Distance", icon: Laptop, desc: "E-learning" },
                  { label: "Week-end", icon: CalendarDays, desc: "Formule active" },
                ].map((mode) => (
                  <div
                    key={mode.label}
                    className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-afi-red/40 hover:bg-white/[0.07] transition-all backdrop-blur-sm group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <mode.icon className="w-4 h-4 text-slate-300 group-hover:text-afi-red transition-colors" />
                      <span className="text-xs font-bold text-white">
                        {mode.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      {mode.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual CTAs & Live Support note */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/candidater"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-afi-red hover:bg-afi-red-800 text-white font-bold text-sm tracking-wide shadow-xl shadow-afi-red/25 hover:shadow-afi-red/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Candidater en ligne</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/formations"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-semibold text-sm backdrop-blur-sm transition-all"
              >
                <span>Explorer les 128 formations</span>
              </Link>
            </div>

            {/* Micro Trust Indicators with Shimmer Beam */}
            <div className="relative pt-3 border-t border-white/10 overflow-hidden">
              {/* Animated scanning shimmer beam */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-afi-red to-transparent w-1/3 animate-shimmer-beam" />

              <div className="flex items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Habilité ANAQ-Sup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-300" />
                  <span>Diplômes Reconnus CAMES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Apple 2026 Floating Glassmorphism Hero Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card container */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl backdrop-blur-xl">
                <div className="rounded-[22px] bg-afi-navy-900/90 border border-white/10 p-6 sm:p-8 space-y-6 overflow-hidden">
                  {/* Card Header with Official Logo */}
                  <div className="flex items-center justify-between">
                    <Logo variant="light" size="sm" />

                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Rentrée Ouverte
                    </span>
                  </div>

                  {/* Visual Focus Box (Representative Student & Excellence Focus) */}
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-afi-navy-800 to-afi-navy-950 p-6 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-mono text-slate-300 font-bold">PROMOTION 2026-2027</span>
                      <span className="text-[11px]">Dakar Point E &amp; Thiès</span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-2xl font-black font-heading text-white tracking-tight">
                        99% d&apos;insertion
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Diplômés en poste ou entrepreneurs dans les 6 mois suivant la diplomation.
                      </p>
                    </div>

                    {/* Progress Bar / Metric visualization */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                        <span>Insertion professionnelle</span>
                        <span className="text-emerald-400 font-bold">99.2%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-afi-red rounded-full w-[99%]" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Micro-Metric Cards inside */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold">
                        <Award className="w-3.5 h-3.5" />
                        <span>144+ Diplômes</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Accréditations CAMES &amp; ANAQ-Sup
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>28+ Années</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        D&apos;excellence &amp; d&apos;impact
                      </div>
                    </div>
                  </div>

                  {/* Direct Action Inside Card */}
                  <Link
                    href="/candidater"
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition-colors"
                  >
                    <span>Déposer votre dossier d&apos;admission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
