"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { Formation } from "@/types/database";
import { motion } from "motion/react";
import { EASINGS } from "@/components/ui/motion";

interface FormationCardProps {
  formation: Formation;
  compact?: boolean;
}

/**
 * Carte formation standard — alignée sur le design épuré des cartes
 * « Focus sur nos Filières » de la page d'accueil avec micro-interactions Apple/Google.
 */
export function FormationCard({ formation }: FormationCardProps) {
  const isMaster = formation.level === "master";
  const modes = isMaster
    ? "Soir • Week-end • À distance"
    : formation.study_modes?.includes("cours_du_soir")
    ? "Jour • Soir"
    : "Formation Initiale";
  const imageUrl = formation.image_url || `/images/formations/${formation.slug}.jpg`;

  return (
    <div className="pt-2.5 pb-1 h-full w-full flex flex-col">
      <motion.div
        whileHover={{ y: -5 }}
        transition={EASINGS.spring}
        className="group bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200/70 transition-shadow duration-300 hover:shadow-xl hover:border-slate-300 flex flex-col justify-between w-full h-full relative"
      >
        <div className="flex-1 flex flex-col">
        {/* Couverture photo métier originale + dégradé cinématographique AFI + pattern pointillé */}
        <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-900 shrink-0">
          {/* Photo métier originale */}
          <Image
            src={imageUrl}
            alt={formation.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Superposition dégradé cinématographique signature AFI */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#191D38]/50 to-transparent pointer-events-none" />

          {/* Pattern pointillé signature */}
          <div className="absolute inset-0 pattern-grid-dots opacity-40 pointer-events-none" />

          {/* Halo subtil au survol */}
          <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-afi-red/20 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

          {/* Watermark discret */}
          <BookOpen className="absolute bottom-3 right-3.5 w-8 h-8 text-white/20 stroke-[1.25] group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

          {/* Badge niveau flottant style Apple (100% opaque) */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20 shadow-xs">
            {isMaster ? "Master (BAC+5)" : "Licence (BAC+3)"}
          </div>
        </div>

        {/* Infos principales */}
        <div className="pt-4 px-1 flex-1 flex flex-col">
          <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 group-hover:text-afi-red transition-colors line-clamp-2 leading-snug mb-2 min-h-[3.25rem] flex items-start">
            <Link href={`/formations/${formation.slug}`} className="line-clamp-2">
              {formation.title}
            </Link>
          </h3>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-2.5 h-5 shrink-0 overflow-hidden">
            <span className="text-slate-700 font-semibold shrink-0">
              {formation.duration_years} an
              {formation.duration_years > 1 ? "s" : ""}
            </span>
            <span className="text-slate-300 shrink-0">•</span>
            <span className="truncate">{modes}</span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 min-h-[2.5rem]">
            {formation.short_description || formation.description}
          </p>
        </div>
      </div>

      {/* Actions (Candidater à gauche avec flèche, bouton rouge Détail du cursus à droite) */}
      <div className="pt-3.5 px-1 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto shrink-0">
        <Link
          href={`/candidater/${formation.slug}`}
          className="text-xs font-semibold text-slate-600 hover:text-afi-red inline-flex items-center gap-1.5 transition-colors group/link"
        >
          <span>Candidater</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href={`/formations/${formation.slug}`}
          className="px-6 sm:px-7 py-2.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 text-center min-w-[130px]"
        >
          Détail du cursus
        </Link>
      </div>
    </motion.div>
  </div>
  );
}
