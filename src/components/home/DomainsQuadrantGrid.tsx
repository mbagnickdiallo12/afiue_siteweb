"use client";

import Link from "next/link";
import {
  Target,
  Cpu,
  Scale,
  Users,
} from "lucide-react";
import { Domain } from "@/types/database";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface DomainsQuadrantGridProps {
  domains: Domain[];
}

export function DomainsQuadrantGrid({ domains }: DomainsQuadrantGridProps) {
  // Mapping domain codes to matching icons with unified AFI Red brand color
  const domainConfig: Record<string, { icon: typeof Target }> = {
    SEG: { icon: Target },
    ST: { icon: Cpu },
    SJPA: { icon: Scale },
    SHS: { icon: Users },
  };

  const defaultIcons = [Target, Cpu, Scale, Users];

  return (
    <section className="pt-16 sm:pt-20 pb-8 sm:pb-10 bg-white relative select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header: Clean 2-line title */}
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.15]">
            Nos 4 Grands Domaines
            <span className="block">d&apos;Enseignement</span>
          </h2>
        </FadeIn>

        {/* 4-Quadrant Cross-Grid with Staggered Entrance */}
        <div className="relative max-w-5xl mx-auto">
          <StaggerContainer
            staggerChildren={0.1}
            className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr relative"
          >
            {domains.slice(0, 4).map((domain, index) => {
              const Icon =
                domainConfig[domain.code]?.icon || defaultIcons[index % defaultIcons.length];

              const borderClasses = [
                "md:border-r md:border-b border-slate-200/90 border-b", // Top-Left
                "md:border-b border-slate-200/90 border-b", // Top-Right
                "md:border-r md:border-b-0 border-slate-200/90 border-b", // Bottom-Left
                "border-b-0", // Bottom-Right
              ][index];

              return (
                <StaggerItem key={domain.id} className="h-full">
                  <Link
                    href={`/domaines/${domain.slug}`}
                    className={`h-full p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center space-y-3 group hover:bg-slate-50/80 transition-all duration-300 relative ${borderClasses}`}
                  >
                    {/* Center Intersection Ring anchored precisely at the meeting point of the two borders */}
                    {index === 0 && (
                      <div
                        aria-hidden="true"
                        className="hidden md:flex absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-white border border-slate-300 items-center justify-center z-20 pointer-events-none shadow-2xs"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300/80" />
                      </div>
                    )}

                    {/* Standalone unified icon */}
                    <Icon className="w-9 h-9 sm:w-10 sm:h-10 text-afi-red group-hover:scale-110 transition-transform duration-300" />

                    {/* Domain Title */}
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 group-hover:text-afi-red transition-colors leading-snug pt-1">
                      {domain.name}
                    </h3>

                    {/* Domain Description */}
                    <p className="text-sm text-slate-500 leading-relaxed max-w-sm sm:max-w-md mx-auto">
                      {domain.description}
                    </p>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
