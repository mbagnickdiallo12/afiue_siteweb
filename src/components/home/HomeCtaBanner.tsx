"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/ui/motion";

export function HomeCtaBanner() {
  return (
    <section className="py-16 sm:py-20 bg-white select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScaleIn>
          <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-afi-navy-950 via-afi-navy-900 to-afi-navy-950 p-12 sm:p-16 lg:p-20 text-white border border-white/10 shadow-2xl">
            {/* Ambient Glows */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-afi-red/20 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-white/5 blur-[140px] pointer-events-none" />

            {/* Centered Content Container */}
            <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center space-y-6 sm:space-y-8">
              {/* Concise Title & Reduced Text */}
              <FadeIn className="space-y-3">
                <h2 className="font-heading font-black text-xl xs:text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] sm:whitespace-nowrap">
                  Prêt à Rejoindre l&apos;AFI&#8209;L&apos;UE ?
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                  Candidatez en ligne pour intégrer nos campus de Dakar Point E ou Thiès 
                  et obtenez un diplôme d&apos;État reconnu à l&apos;international.
                </p>
              </FadeIn>

              {/* Centered CTAs */}
              <FadeIn delay={0.15} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
                <Link
                  href="/candidater"
                  className="w-full sm:w-auto group inline-flex items-center justify-between gap-4 pl-6 pr-1.5 py-1.5 rounded-full bg-afi-red hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-afi-red/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Déposer ma candidature</span>
                  <span className="w-9 h-9 rounded-full bg-white text-afi-red flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto group inline-flex items-center justify-between gap-4 pl-6 pr-1.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Parler à un conseiller</span>
                  <span className="w-9 h-9 rounded-full bg-[#191D38] group-hover:bg-afi-red text-white flex items-center justify-center shrink-0 transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
