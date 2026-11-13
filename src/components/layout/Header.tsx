"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SearchModal } from "@/components/search/SearchModal";
import { ProgrammesMegaMenu } from "@/components/layout/ProgrammesMegaMenu";

interface SubItem {
  label: string;
  href: string;
  desc?: string;
  badge?: string;
}

interface NavItem {
  label: string;
  href?: string;
  badge?: string;
  children?: SubItem[];
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection for dynamic elevation
  useEffect(() => {
    function handleScroll() {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [mobileMenuOpen]);

  // Global keyboard shortcut (⌘K or Ctrl+K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Highly-structured Apple / Google 2026 Navigation Model
  const navLinks: NavItem[] = [
    { label: "Le Groupe", href: "/universite" },
    {
      label: "Programmes",
      href: "/formations",
      children: [
        {
          label: "Licences Professionnelles",
          href: "/formations?level=licence",
          desc: "Bac+3 accrédité CAMES · 4 pôles académiques",
          badge: "CAMES",
        },
        {
          label: "Masters Professionnels & MBA",
          href: "/formations?level=master",
          desc: "Bac+5 diplôme d'État & doubles diplômes",
          badge: "Bac+5",
        },
        {
          label: "Formation Continue & Cadres",
          href: "/executive-education",
          desc: "Cours du soir et week-end pour professionnels",
        },
        {
          label: "Formation à Distance (E-Learning)",
          href: "/programmes/e-learning",
          desc: "Campus 100% en ligne pour toute l'Afrique",
          badge: "100% Flexible",
        },
        {
          label: "PRESUP (École Préparatoire)",
          href: "/presup",
          desc: "Immersion en français (Test TFI™) & gestion",
          badge: "600h",
        },
        {
          label: "Tous les Domaines Scientifiques",
          href: "/domaines",
          desc: "Gestion, Technologies, Juridique, Communication",
        },
      ],
    },
    {
      label: "Executive Education",
      href: "/executive-education",
    },
    { label: "Recherche", href: "/recherche" },
    { label: "Mobilité", href: "/mobilite" },
    {
      label: "Nos campus",
      children: [
        {
          label: "AFI Dakar",
          href: "/campus/afi-dakar",
          desc: "Siège principal Zone B / Point E & pôles d'excellence",
        },
        {
          label: "AFI-Thiès",
          href: "/campus/afi-thies",
          desc: "Campus régional Mbour 4 · +35 choix de filières",
        },
        {
          label: "AFI-TECH Dakar",
          href: "/campus/afi-tech-dakar",
          desc: "School of Technology · IA, Génie Logiciel, Réseaux & Cloud",
          badge: "Tech",
        },
      ],
    },
    {
      label: "Entreprises",
      children: [
        {
          label: "Incubateur d’entreprises",
          href: "/entreprises/incubateur",
          desc: "AFI-BOOST · Accompagnement, mentorat & création d'entreprise",
        },
        {
          label: "Carrières",
          href: "/entreprises/carrieres",
          desc: "Service Insertion · Stages, emploi, conventions & recommandations",
        },
        {
          label: "Vie Étudiante",
          href: "/entreprises/vie-etudiante",
          desc: "26+ nationalités · Clubs, événements, citoyenneté & intégration",
        },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75 border-b border-slate-200/60 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)]"
            : "bg-white/95 backdrop-blur-md border-b border-slate-100"
        }`}
      >
        {/* =========================================================
            1. ULTRA-SLEEK INSTITUTIONAL STATUS BAR (Apple 2026 Style)
            ========================================================= */}
        <div className="bg-[#0B0F19] text-slate-300 text-[11px] font-medium tracking-wide py-1.5 px-4 border-b border-white/[0.06] hidden md:block select-none">
          <div className="max-w-7xl mx-auto flex justify-end items-center">
            {/* Right: Direct Contact & Admin Access */}
            <div className="flex items-center gap-5">
              <a
                href="tel:+221338247110"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
                title="Téléphone officiel standard"
              >
                <Phone className="w-3 h-3 text-slate-300 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-slate-200">+221 33 824 71 10</span>
              </a>

              <span className="text-white/20">|</span>

              <a
                href="mailto:afi@afi-ue.sn"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
                title="Email officiel"
              >
                <Mail className="w-3 h-3 text-slate-300 group-hover:scale-110 transition-transform" />
                <span className="text-slate-200">afi@afi-ue.sn</span>
              </a>

              <span className="text-white/20">|</span>

              {/* Bouton Contact simple sans ombrage ni contour avec fond rouge */}
              <Link
                href="/contact"
                className="inline-flex items-center px-3 py-1 rounded-full bg-afi-red hover:bg-red-700 text-white transition-colors text-[10px] font-bold tracking-wider uppercase border-0 shadow-none"
              >
                <span>Contact</span>
              </Link>

              <span className="text-white/20">|</span>

              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all text-[10px] font-semibold tracking-wider uppercase border border-white/10"
              >
                <Lock className="w-2.5 h-2.5 text-slate-400" />
                <span>Espace Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================
            2. MAIN FUTURISTIC MINIMALIST NAVIGATION BAR
            ========================================================= */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] gap-4">
            {/* Brand Logo with responsive breathing room */}
            <div className="flex-shrink-0 flex items-center pr-2">
              <Logo variant="dark" size="md" />
            </div>

            {/* Desktop Navigation Links (Pill-Hover Experience, Guaranteed Single Line) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-nowrap">
              {navLinks.map((item) => {
                const isActive = item.href
                  ? item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                  : item.children?.some((sub) => pathname.startsWith(sub.href)) ?? false;

                // Dropdown link with Bento-Flyout
                if (item.children) {
                  const triggerClasses = `inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-medium tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none ${
                    isActive
                      ? "text-afi-red bg-afi-red/[0.08] font-semibold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80"
                  }`;

                  const isProgrammes = item.label === "Programmes";

                  return (
                    <div key={item.label} className="relative group flex-shrink-0">
                      {item.href ? (
                        <Link href={item.href} className={triggerClasses}>
                          <span className="whitespace-nowrap">{item.label}</span>
                          <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-700 group-hover:rotate-180 transition-transform duration-200 flex-shrink-0" />
                        </Link>
                      ) : (
                        <button type="button" className={triggerClasses}>
                          <span className="whitespace-nowrap">{item.label}</span>
                          <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-700 group-hover:rotate-180 transition-transform duration-200 flex-shrink-0" />
                        </button>
                      )}

                      {/* Mega Menu for Programmes */}
                      {isProgrammes ? (
                        <div className="absolute -left-16 xl:-left-36 top-full pt-2.5 w-[960px] xl:w-[1080px] max-w-[calc(100vw-32px)] opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-out z-50">
                          <ProgrammesMegaMenu />
                        </div>
                      ) : (
                        /* Standard Dropdown for other items */
                        <div className="absolute left-0 top-full pt-2.5 w-80 xl:w-96 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-out z-50">
                          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
                            {item.children.map((sub) => (
                              <Link
                                key={`${sub.href}-${sub.label}`}
                                href={sub.href}
                                className="group/item flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 focus:outline-none transition-all"
                              >
                                <GraduationCap className="w-4 h-4 text-afi-navy group-hover/item:text-afi-red transition-colors shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-slate-800 group-hover/item:text-afi-red transition-colors whitespace-nowrap">
                                      {sub.label}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-afi-red/10 text-afi-red font-mono whitespace-nowrap">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  {sub.desc && (
                                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-snug">
                                      {sub.desc}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Standard navigation item
                return (
                  <Link
                    key={item.href || item.label}
                    href={item.href || "#"}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-medium tracking-tight whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                      isActive
                        ? "text-afi-red bg-afi-red/[0.08] font-semibold"
                        : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80"
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Apple-Style Magnetic Pill CTA (Guaranteed Single Line) */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link
                href="/candidater"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-afi-navy via-slate-900 to-[#0F172A] hover:from-[#111633] hover:to-black text-white text-[11px] font-bold tracking-wider uppercase whitespace-nowrap flex-shrink-0 shadow-[0_4px_14px_rgba(25,29,56,0.22)] hover:shadow-[0_6px_20px_rgba(25,29,56,0.32)] hover:scale-[1.03] active:scale-[0.98] transition-all border border-white/10 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-afi-red animate-pulse flex-shrink-0" />
                <span className="whitespace-nowrap">REJOIGNEZ-NOUS</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </Link>

              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Recherche"
              >
                <Search className="w-5 h-5 text-afi-red" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
                aria-label="Menu principal"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-900" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-900" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. MOBILE SLIDE-DOWN DRAWER (Glassmorphic & Scroll-locked)
            ========================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/98 backdrop-blur-2xl px-4 pt-3 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain touch-pan-y relative z-50">
            {/* Quick Search Bar */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-afi-red" />
                <span>Rechercher une formation, un pôle...</span>
              </span>
              <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Nav list */}
            <div className="space-y-1">
              {navLinks.map((item) => (
                <div key={item.label} className="py-1">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-900 hover:bg-slate-50 hover:text-afi-red transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-900 select-none">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {item.children && (
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-slate-100 ml-3">
                      {item.children.map((sub) => (
                        <Link
                          key={`${sub.href}-${sub.label}`}
                          href={sub.href}
                          className="block px-2.5 py-1.5 text-xs text-slate-600 hover:text-afi-red hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <div className="font-medium text-slate-800">{sub.label}</div>
                          {sub.desc && (
                            <div className="text-[10px] text-slate-400 line-clamp-1">
                              {sub.desc}
                            </div>
                          )}
                        </Link>
                      ))}
                      {item.label === "Programmes" && (
                        <Link
                          href="/formations"
                          className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-bold text-afi-red hover:text-red-700 transition-colors"
                        >
                          <span>Voir tout le catalogue (37 formations)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Primary Action */}
            <div className="pt-2">
              <Link
                href="/candidater"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-afi-navy to-slate-900 text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-afi-navy/20"
              >
                <span className="w-2 h-2 rounded-full bg-afi-red animate-pulse" />
                <span>REJOIGNEZ-NOUS (CANDIDATER)</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </Link>
            </div>

            {/* Contact Details */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-600 px-2">
              <div className="flex items-center justify-between">
                <a
                  href="tel:+221338247110"
                  className="flex items-center gap-1.5 hover:text-afi-red transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>+221 33 824 71 10</span>
                </a>
                <a
                  href="tel:+221775088728"
                  className="flex items-center gap-1.5 hover:text-afi-red transition-colors font-mono"
                >
                  <span>+221 77 508 87 28</span>
                </a>
              </div>
              <a
                href="mailto:afi@afi-ue.sn"
                className="flex items-center gap-1.5 hover:text-afi-red transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>afi@afi-ue.sn</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Backdrop for Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden overscroll-none"
          onClick={() => setMobileMenuOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
          aria-hidden="true"
        />
      )}

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
