"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Clock, Info } from "lucide-react";
import { Formation } from "@/types/database";

interface FormationPricingGridProps {
  formation: Formation;
}

interface ExtraFee {
  label: string;
  amount: string;
}

interface LevelBreakdown {
  level: string;
  monthly: number;
  months: number;
  registration: number;
  total: number;
}

interface PricingPlan {
  id: string;
  name: string;
  schedule: string;
  hours: string;
  period: string;
  durationMonths: number;
  registration: number;
  monthly: number;
  monthlyDisplay?: string;
  levels?: LevelBreakdown[];
  extraFees: ExtraFee[];
  isOnline?: boolean;
}

export function FormationPricingGrid({ formation }: FormationPricingGridProps) {
  const [programTrack, setProgramTrack] = useState<"multiprogramme" | "international-leader">("multiprogramme");
  const [activePlanId, setActivePlanId] = useState<string>("cours-du-jour");

  const isLicence = formation.level === "licence";
  const isMaster = formation.level === "master";

  const formatCFA = (amount: number) => {
    return amount.toLocaleString("fr-FR") + " FCFA";
  };

  // Build pricing plans adapted to formation type, official brochure & program track
  let plans: PricingPlan[] = [];

  if (isMaster) {
    plans = [
      {
        id: "cours-du-soir",
        name: "Formation Continue (Cours du Soir)",
        schedule: "Lundi au Vendredi",
        hours: "17h30 – 20h45",
        period: "10 mois (Novembre à Août)",
        durationMonths: 10,
        registration: 180000,
        monthly: 95000,
        extraFees: [
          { label: "Bibliothèque numérique annuelle", amount: "10 000 FCFA" },
          { label: "Frais de mémoire & encadrement M2", amount: "100 000 FCFA" },
          { label: "Cérémonie de graduation M2", amount: "70 000 FCFA" },
        ],
      },
      {
        id: "cours-du-weekend",
        name: "Cours du Week-end",
        schedule: "Samedi & Dimanche",
        hours: "09h00 – 17h00",
        period: "09 mois (Janvier à Septembre)",
        durationMonths: 9,
        registration: 180000,
        monthly: 95000,
        extraFees: [
          { label: "Bibliothèque numérique annuelle", amount: "10 000 FCFA" },
          { label: "Frais de mémoire & encadrement M2", amount: "100 000 FCFA" },
          { label: "Cérémonie de graduation M2", amount: "70 000 FCFA" },
        ],
      },
      {
        id: "e-learning",
        name: "Formation à Distance (E-Learning)",
        schedule: "Lundi au Vendredi",
        hours: "18h00 – 20h00 (virtuel) & 24/7",
        period: "09 mois (Janvier à Septembre)",
        durationMonths: 9,
        registration: 200000,
        monthly: 100000,
        isOnline: true,
        extraFees: [
          { label: "Bibliothèque numérique annuelle", amount: "10 000 FCFA" },
          { label: "Frais de mémoire & encadrement M2", amount: "100 000 FCFA" },
          { label: "Cérémonie de graduation M2", amount: "70 000 FCFA" },
        ],
      },
    ];
  } else if (programTrack === "international-leader") {
    // International Leader is ONLY available for Licence Formation Initiale
    plans = [
      {
        id: "cours-du-jour-intl",
        name: "Formation Initiale – International Leader",
        schedule: "Lundi au Vendredi",
        hours: "08h00 – 17h00",
        period: "10 mois (Octobre à Juillet)",
        durationMonths: 10,
        registration: 170000,
        monthly: 95000,
        extraFees: [
          { label: "Double diplomation FEDE & TOEIC", amount: "Inclus dans le cursus" },
          { label: "Uniforme étudiant (L1 & L2)", amount: "50 000 FCFA" },
          { label: "Bootcamp d'intégration (L1)", amount: "40 000 FCFA" },
          { label: "Bibliothèque numérique annuelle", amount: "10 000 FCFA" },
          { label: "Frais de mémoire L3", amount: "70 000 FCFA" },
          { label: "Cérémonie de graduation L3", amount: "70 000 FCFA" },
        ],
      },
    ];
  } else {
    // Multiprogramme for Licence (Brochure Officielle 2026-2027)
    plans = [
      {
        id: "cours-du-jour",
        name: "Formation Initiale",
        schedule: "Lundi au Vendredi",
        hours: "08h00 – 17h00",
        period: "10 mois (Octobre à Juillet)",
        durationMonths: 10,
        registration: 170000,
        monthly: 75000,
        monthlyDisplay: "75 000 – 85 000",
        levels: [
          {
            level: "Licence 1",
            monthly: 75000,
            months: 10,
            registration: 170000,
            total: 170000 + 75000 * 10, // 920 000
          },
          {
            level: "Licence 2",
            monthly: 80000,
            months: 10,
            registration: 170000,
            total: 170000 + 80000 * 10, // 970 000
          },
          {
            level: "Licence 3",
            monthly: 85000,
            months: 10,
            registration: 170000,
            total: 170000 + 85000 * 10, // 1 020 000
          },
        ],
        extraFees: [
          { label: "Uniforme étudiant (L1 & L2)", amount: "50 000 FCFA" },
          { label: "Bootcamp d'intégration (L1)", amount: "40 000 FCFA" },
          { label: "Bibliothèque numérique annuelle", amount: "10 000 FCFA" },
          { label: "Frais de mémoire L3", amount: "70 000 FCFA" },
          { label: "Cérémonie de graduation L3", amount: "70 000 FCFA" },
        ],
      },
      {
        id: "cours-du-soir",
        name: "Formation Continue (Cours du Soir)",
        schedule: "Lundi au Vendredi",
        hours: "17h30 – 20h45",
        period: "10 mois (Novembre à Août)",
        durationMonths: 10,
        registration: 170000,
        monthly: 70000,
        extraFees: [
          { label: "Bibliothèque numérique annuelle", amount: "10 000 FCFA" },
          { label: "Frais de mémoire L3", amount: "70 000 FCFA" },
          { label: "Cérémonie de graduation L3", amount: "70 000 FCFA" },
        ],
      },
      {
        id: "cours-du-weekend",
        name: "Cours du Week-end",
        schedule: "Samedi & Dimanche",
        hours: "09h00 – 17h00",
        period: "09 mois (Janvier à Septembre)",
        durationMonths: 9,
        registration: 170000,
        monthly: 80000,
        extraFees: [
          { label: "Bibliothèque numérique annuelle", amount: "10 000 FCFA" },
          { label: "Frais de mémoire L3", amount: "70 000 FCFA" },
          { label: "Cérémonie de graduation L3", amount: "70 000 FCFA" },
        ],
      },
      {
        id: "e-learning",
        name: "Formation à Distance (E-Learning)",
        schedule: "Lundi au Vendredi",
        hours: "18h00 – 20h00 (virtuel) & 24/7",
        period: "09 mois (Janvier à Septembre)",
        durationMonths: 9,
        registration: 200000,
        monthly: 90000,
        isOnline: true,
        extraFees: [
          { label: "Bibliothèque numérique annuelle", amount: "10 000 FCFA" },
          { label: "Frais de mémoire L3", amount: "70 000 FCFA" },
          { label: "Cérémonie de graduation L3", amount: "70 000 FCFA" },
        ],
      },
    ];
  }

  const togglePlan = (id: string) => {
    setActivePlanId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="tarifs" className="py-20 sm:py-24 bg-[#F1F5F9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header (Minimalist Apple/Google Style) */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0B0F19] tracking-tight leading-tight whitespace-normal sm:whitespace-nowrap">
            Des tarifs clairs, structurés et sans surprise.
          </h2>

          {/* Program Track Selector for Licence: Multiprogramme vs International Leader */}
          {isLicence && (
            <div className="pt-2 flex justify-center">
              <div className="inline-flex p-1 bg-white rounded-full">
                <button
                  type="button"
                  onClick={() => {
                    setProgramTrack("multiprogramme");
                    setActivePlanId("cours-du-jour");
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    programTrack === "multiprogramme"
                      ? "bg-[#0B0F19] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Multiprogramme
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProgramTrack("international-leader");
                    setActivePlanId("cours-du-jour-intl");
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    programTrack === "international-leader"
                      ? "bg-[#0B0F19] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  International Leader
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Accordion List (Pure White Cards on Grey Canvas, Zero Shadow, Zero Border) */}
        <div className="space-y-4">
          {plans.map((plan) => {
            const isOpen = activePlanId === plan.id;
            const totalYearly = plan.registration + plan.monthly * plan.durationMonths;

            return (
              <div
                key={plan.id}
                className="rounded-2xl bg-white transition-all duration-200 overflow-hidden"
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => togglePlan(plan.id)}
                  className="w-full p-4 sm:p-7 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  {/* Left: Title & Hours */}
                  <div className="space-y-1.5">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-[#0B0F19]">
                      {plan.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{plan.schedule}</span>
                      <span className="text-slate-300">•</span>
                      <span>{plan.hours}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                  </div>

                  {/* Right: Price Preview & Expand Icon */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] font-semibold uppercase text-slate-400">
                        Mensualité
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading font-black text-xl sm:text-2xl text-[#0B0F19]">
                          {plan.monthlyDisplay || formatCFA(plan.monthly).replace(" FCFA", "")}
                        </span>
                        <span className="text-xs font-bold text-slate-500">FCFA</span>
                      </div>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                        isOpen
                          ? "bg-[#0B0F19] text-white rotate-180"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Accordion Content Panel (Airy, Unboxed, Single Line Layout) */}
                {isOpen && (
                  <div className="px-4 pb-6 sm:px-8 sm:pb-8 pt-4 border-t border-slate-100 animate-in fade-in-50 duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-16 pt-2">
                      {/* Left Column: Structure de paiement */}
                      <div className="space-y-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Structure de paiement
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm">
                          <div className="flex items-center justify-between py-1.5 border-b border-slate-100/70 gap-2">
                            <span className="text-slate-600">
                              Droits d&apos;inscription (paiement unique)
                            </span>
                            <span className="font-bold text-[#0B0F19] shrink-0 whitespace-nowrap ml-2">
                              {formatCFA(plan.registration)}
                            </span>
                          </div>

                          {/* If Plan has multiple academic levels (Multiprogramme Licence L1, L2, L3) */}
                          {plan.levels ? (
                            <div className="pt-3 space-y-3">
                              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                                Mensualités selon l&apos;année d&apos;études
                              </span>
                              <div className="space-y-2">
                                {plan.levels.map((lvl, lIdx) => (
                                  <div
                                    key={lIdx}
                                    className="flex items-center justify-between py-2 border-b border-slate-100/70 last:border-b-0 text-xs sm:text-sm gap-2"
                                  >
                                    <div className="min-w-0 pr-1">
                                      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                                        <span className="font-bold text-slate-900">{lvl.level}</span>
                                        <span className="text-slate-400 text-[11px] sm:text-xs">
                                          ({formatCFA(lvl.monthly)} / mois × {lvl.months} mois)
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right shrink-0 whitespace-nowrap">
                                      <span className="font-heading font-black text-sm sm:text-base text-[#C8232C]">
                                        {formatCFA(lvl.total)}
                                      </span>
                                      <span className="text-[10px] text-slate-400 ml-1 font-normal">/ an</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="pt-2 space-y-2">
                              <div className="flex items-center justify-between py-1.5 border-b border-slate-100/70 gap-2">
                                <span className="text-slate-600">
                                  Mensualités ({plan.durationMonths} mois)
                                </span>
                                <span className="font-bold text-[#0B0F19] shrink-0 whitespace-nowrap ml-2">
                                  {formatCFA(plan.monthly)} × {plan.durationMonths}
                                </span>
                              </div>

                              <div className="pt-2 flex items-center justify-between text-sm sm:text-base gap-2">
                                <span className="font-bold text-slate-900">
                                  Total scolarité annuelle
                                </span>
                                <span className="font-heading font-black text-base sm:text-lg text-[#C8232C] shrink-0 whitespace-nowrap ml-2">
                                  {formatCFA(totalYearly)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Frais supplémentaires */}
                      <div className="lg:border-l lg:border-slate-100 lg:pl-10 space-y-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Frais supplémentaires
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm">
                          {plan.extraFees.map((fee, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-center justify-between py-1.5 border-b border-slate-100/70 last:border-b-0 gap-2"
                            >
                              <span className="text-slate-600">• {fee.label}</span>
                              <span className="font-semibold text-slate-900 ml-2 shrink-0 whitespace-nowrap">
                                {fee.amount}
                              </span>
                            </div>
                          ))}
                        </div>

                        {plan.isOnline && (
                          <p className="pt-3 text-[11px] text-slate-500 leading-relaxed border-t border-slate-100/80">
                            Plateforme numérique interactive 24h/24 + classes virtuelles synchrones (18h00 – 20h00).
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="pt-5 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-[11px] text-slate-400 text-center sm:text-left whitespace-nowrap">
                        Mensualités payables d&apos;avance au plus tard le 05 de chaque mois.
                      </div>

                      <Link
                        href={`/candidater/${formation.slug}?mode=${plan.id}`}
                        className="w-full sm:w-auto px-7 py-2.5 rounded-full text-xs font-bold transition-all text-center flex items-center justify-center gap-2 active:scale-95 bg-[#0B0F19] hover:bg-[#C8232C] text-white shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
                      >
                        <span>Candidater</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Informative Note for International Leader */}
        {isLicence && programTrack === "international-leader" && (
          <div className="p-5 rounded-2xl bg-white text-xs text-slate-600 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#C8232C] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Le programme <strong>International Leader</strong> (double diplomation officielle AFI-L&apos;UE + FEDE &amp; certification TOEIC) est dispensé exclusivement en <strong>Licence Formation Initiale (Cours du Jour)</strong>. Il n&apos;est pas disponible en cours du soir, week-end ou e-learning.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}