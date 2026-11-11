"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-[#0A0D18] text-slate-400 border-t border-white/[0.08] mt-auto select-none">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">
          
          {/* Col 1: Brand & Identity (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Logo variant="light" size="md" />
              
              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-sm pt-1">
                L&apos;Université de l&apos;Entreprise. Pôle d&apos;excellence académique dédié à la formation de leaders, gestionnaires et ingénieurs agiles depuis 1993.
              </p>
            </div>

            {/* Direct Contact & Social */}
            <div className="space-y-3 pt-2">
              <div className="text-xs text-slate-400 space-y-1.5">
                <p>Dakar (Zone B Rue G) · Thiès (Caritas)</p>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <a href="tel:+221338247110" className="hover:text-white transition-colors">
                    +221 33 824 71 10
                  </a>
                  {" · "}
                  <a href="tel:+221775088728" className="hover:text-white transition-colors">
                    +221 77 508 87 28
                  </a>
                  {" · "}
                  <a href="mailto:afi@afi-ue.sn" className="hover:text-white transition-colors">
                    afi@afi-ue.sn
                  </a>
                </p>
              </div>

              {/* Social Channels - Subtle minimalist ghost pills */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://facebook.com/afildakar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
                  aria-label="Facebook AFI-L'UE"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/school/afi-l-ue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
                  aria-label="LinkedIn AFI-L'UE"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/afi_ue_dakar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
                  aria-label="Instagram AFI-L'UE"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/afi_ue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
                  aria-label="X (Twitter) AFI-L'UE"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Pôles & Formations (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-semibold tracking-widest text-slate-300 uppercase">
              Pôles &amp; Formations
            </h4>
            <ul className="space-y-3 text-[13px] text-slate-400">
              <li>
                <Link href="/domaines/sciences-economiques-et-de-gestion" className="hover:text-white transition-colors block">
                  Sciences Économiques &amp; Gestion
                </Link>
              </li>
              <li>
                <Link href="/domaines/sciences-et-technologies" className="hover:text-white transition-colors block">
                  Technologies, Informatique &amp; IA
                </Link>
              </li>
              <li>
                <Link href="/domaines/sciences-juridiques-politiques-et-de-ladministration" className="hover:text-white transition-colors block">
                  Sciences Juridiques &amp; Droit
                </Link>
              </li>
              <li>
                <Link href="/domaines/sciences-de-lhomme-et-de-la-societe" className="hover:text-white transition-colors block">
                  Sciences de l&apos;Homme &amp; Société
                </Link>
              </li>
              <li>
                <Link href="/presup" className="hover:text-white transition-colors block">
                  PRESUP (École Préparatoire)
                </Link>
              </li>
              <li>
                <Link href="/cours-du-weekend" className="hover:text-white transition-colors block">
                  Cours du Week-end (L3 &amp; Master)
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/executive-education" className="text-afi-red hover:text-red-400 font-medium inline-flex items-center gap-1 transition-colors">
                  <span>Executive Education (Soir)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions & Campus (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-semibold tracking-widest text-slate-300 uppercase">
              Admissions &amp; Campus
            </h4>
            <ul className="space-y-3 text-[13px] text-slate-400">
              <li>
                <Link href="/candidater" className="text-white font-medium hover:text-afi-red transition-colors block">
                  Candidater en ligne
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-white transition-colors block">
                  Conditions &amp; Modalités
                </Link>
              </li>
              <li>
                <Link href="/campus/afi-dakar" className="hover:text-white transition-colors block">
                  Campus AFI Dakar (Zone B)
                </Link>
              </li>
              <li>
                <Link href="/campus/afi-thies" className="hover:text-white transition-colors block">
                  Campus Régional AFI-Thiès
                </Link>
              </li>
              <li>
                <Link href="/campus/afi-tech-dakar" className="hover:text-white transition-colors block">
                  AFI-TECH (School of Tech)
                </Link>
              </li>
              <li>
                <Link href="/entreprises/incubateur" className="hover:text-white transition-colors block">
                  Incubateur AFI-BOOST
                </Link>
              </li>
              <li>
                <Link href="/entreprises/carrieres" className="hover:text-white transition-colors block">
                  Carrières &amp; Insertion Pro
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institution & Recherche (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-semibold tracking-widest text-slate-300 uppercase">
              Institution
            </h4>
            <ul className="space-y-3 text-[13px] text-slate-400">
              <li>
                <Link href="/universite" className="hover:text-white transition-colors block">
                  Le Groupe AFI-L&apos;UE
                </Link>
              </li>
              <li>
                <Link href="/universite/vision-et-valeurs" className="hover:text-white transition-colors block">
                  Vision &amp; Valeurs
                </Link>
              </li>
              <li>
                <Link href="/universite/accreditations" className="hover:text-white transition-colors block">
                  Accréditations CAMES
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="hover:text-white transition-colors block">
                  AFI Research Center
                </Link>
              </li>
              <li>
                <Link href="/entreprises/vie-etudiante" className="hover:text-white transition-colors block">
                  Vie Étudiante &amp; Clubs
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-white transition-colors block">
                  Actualités &amp; Agenda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block">
                  Contact &amp; Accès
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Copyright Bar (Apple Style) with Shimmer Beam */}
      <div className="relative border-t border-white/[0.06] py-6 sm:py-8 overflow-hidden">
        {/* Animated scanning shimmer beam */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-afi-red/70 to-transparent w-1/3 animate-shimmer-beam" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2" suppressHydrationWarning>
            <span>&copy; 2026 AFI-L&apos;Université de l&apos;Entreprise.</span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="text-slate-400">Dakar &amp; Thiès, Sénégal</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/mentions-legales" className="hover:text-slate-300 transition-colors">
              Mentions Légales
            </Link>
            <span className="text-slate-400">·</span>
            <Link href="/politique-confidentialite" className="hover:text-slate-300 transition-colors">
              Confidentialité
            </Link>
            <span className="text-slate-400">·</span>
            <Link href="/contact#acces-campus" className="hover:text-slate-300 transition-colors">
              Plan d&apos;accès
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
