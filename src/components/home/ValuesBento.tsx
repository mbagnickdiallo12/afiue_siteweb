"use client";

import {
  Lightbulb,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export function ValuesBento() {
  return (
    <section className="py-16 sm:py-20 bg-white relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <FadeIn className="text-center max-w-4xl mx-auto space-y-3">
          <h2 className="font-heading font-black text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight whitespace-nowrap">
            Pourquoi Choisir AFI&#8209;L&apos;UE ?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Depuis près de trois décennies, notre modèle pédagogique repose sur un trépied 
            d&apos;exigence académique, d&apos;éthique managériale et de proximité avec le secteur privé.
          </p>
        </FadeIn>

        {/* The 3 Core Values (Unified AFI Red icons) with Staggered Entrance */}
        <StaggerContainer
          staggerChildren={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Valeur 1: Créativité */}
          <StaggerItem>
            <HoverLift lift={-6} className="h-full">
              <div className="h-full relative rounded-3xl p-8 bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-afi-red/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-5">
                  <Lightbulb className="w-11 h-11 sm:w-12 sm:h-12 text-afi-red group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                  <h3 className="font-heading font-black text-2xl text-slate-900">
                    Créativité
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Dans son plan d&apos;organisation et de fonctionnement, AFI-L&apos;UE accorde une place de choix à la créativité, ce qui lui permet de résoudre de manière efficiente et originale les défis auxquels elle est confrontée.
                  </p>
                </div>
              </div>
            </HoverLift>
          </StaggerItem>

          {/* Valeur 2: Professionnalisme (Featured Dark Card) */}
          <StaggerItem>
            <HoverLift lift={-6} className="h-full">
              <div className="h-full relative rounded-3xl p-8 bg-afi-navy text-white border border-white/10 shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-5">
                  <ShieldCheck className="w-11 h-11 sm:w-12 sm:h-12 text-afi-red group-hover:scale-110 transition-all duration-300" />
                  <h3 className="font-heading font-black text-2xl text-white">
                    Professionnalisme
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dans la formation qu&apos;elle dispense, l&apos;Université de l&apos;Entreprise veille à l&apos;acquisition d&apos;aptitudes et de compétences nécessaires à l&apos;accomplissement d&apos;un travail fait selon les plus hautes normes d&apos;excellence et de maîtrise.
                  </p>
                </div>
              </div>
            </HoverLift>
          </StaggerItem>

          {/* Valeur 3: Bonne Gouvernance */}
          <StaggerItem>
            <HoverLift lift={-6} className="h-full">
              <div className="h-full relative rounded-3xl p-8 bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-afi-red/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-5">
                  <Scale className="w-11 h-11 sm:w-12 sm:h-12 text-afi-red group-hover:scale-110 transition-all duration-300" />
                  <h3 className="font-heading font-black text-2xl text-slate-900">
                    Bonne Gouvernance
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Afin de maintenir un excellent niveau de performance, AFI-L&apos;UE s&apos;est engagée à renforcer la promotion de la bonne gouvernance en orientant ses actions stratégiques vers un environnement favorable à une gestion transparente et cohérente.
                  </p>
                </div>
              </div>
            </HoverLift>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
