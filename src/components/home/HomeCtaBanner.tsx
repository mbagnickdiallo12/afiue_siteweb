"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
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
                <h2 className="font-heading font-black text-xl xs:text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] whitespace-nowrap">
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
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-afi-red hover:bg-afi-red-800 text-white font-bold text-sm shadow-xl shadow-afi-red/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Déposer ma candidature</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-sm backdrop-blur-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-slate-300" />
                  <span>Parler à un conseiller</span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
