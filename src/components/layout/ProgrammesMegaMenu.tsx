"use client";

import Link from "next/link";
import {
  GraduationCap,
  Award,
  Clock,
  Laptop,
  Languages,
  Layers,
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
} from "lucide-react";

interface ProgrammesMegaMenuProps {
  onClose?: () => void;
}

export function ProgrammesMegaMenu({ onClose }: ProgrammesMegaMenuProps) {
  // All 14 Licences Professionnelles
  const allLicences = [
    {
      title: "Banque Assurance Finance",
      slug: "licence-banque-assurance-finance",
    },
    {
      title: "Génie Logiciel (GELO)",
      slug: "licence-genie-logiciel",
    },
    {
      title: "Intelligence Artificielle & Big Data",
      slug: "licence-intelligence-artificielle-et-big-data",
    },
    {
      title: "Gestion des Ressources Humaines",
      slug: "licence-gestion-des-ressources-humaines",
    },
    {
      title: "Management des Affaires Internationales",
      slug: "licence-management-des-affaires-internationales",
    },
    {
      title: "Management Juridique et Fiscal",
      slug: "licence-management-juridique-et-fiscal",
    },
    {
      title: "Marketing & Communication Digitale",
      slug: "licence-marketing-management-et-communication-digitale",
    },
    {
      title: "Système, Réseau et Télécommunication",
      slug: "licence-systeme-reseau-et-telecommunication",
    },
    {
      title: "Développement Web & Marketing Digital",
      slug: "licence-developpement-web-et-marketing-digital",
    },
    {
      title: "Gestion Financière, Fiscale & Comptable",
      slug: "licence-gestion-financiere-fiscale-et-comptable-des-entreprises",
    },
    {
      title: "Gestion Financière & Administrative",
      slug: "licence-gestion-financiere-et-administrative-des-entreprises",
    },
    {
      title: "Transport et Logistique",
      slug: "licence-transport-et-logistique",
    },
    {
      title: "Qualité Hygiène Sécurité Environnement",
      slug: "licence-qualite-hygiene-securite-et-environnement",
    },
    {
      title: "Langues Étrangères Appliquées (LEAGE)",
      slug: "licence-langues-etrangeres-appliquees-a-la-gestion-des-entreprises",
    },
  ];

  // All 23 Masters Professionnels & MBA
  const allMasters = [
    {
      title: "Audit et Contrôle de Gestion",
      slug: "master-audit-et-controle-de-gestion",
    },
    {
      title: "Finance Internationale & Marchés Boursiers",
      slug: "master-finance-internationale-et-marches-boursiers",
    },
    {
      title: "Ingénierie Financière & Fintech",
      slug: "master-ingenierie-financiere",
    },
    {
      title: "Génie Logiciel",
      slug: "master-genie-logiciel",
    },
    {
      title: "Intelligence Artificielle",
      slug: "master-intelligence-artificielle",
    },
    {
      title: "Droit des Affaires & Fiscalité OHADA",
      slug: "master-ingenierie-juridique-et-fiscale",
    },
    {
      title: "Audit Juridique et Fiscal",
      slug: "master-audit-juridique-et-fiscal",
    },
    {
      title: "Banque Privée Internationale",
      slug: "master-banque-privee-internationale",
    },
    {
      title: "Finance Digitale",
      slug: "master-finance-digitale",
    },
    {
      title: "Gestion Financière, Fiscale & Comptable",
      slug: "master-gestion-financiere-fiscale-et-comptable-des-entreprises",
    },
    {
      title: "Management des Ressources Humaines",
      slug: "master-management-des-ressources-humaines",
    },
    {
      title: "Marketing Management & Digital",
      slug: "master-marketing-management-et-communication-digitale",
    },
    {
      title: "Supply Chain Management",
      slug: "master-supply-chain-management",
    },
    {
      title: "Logistique et Management Portuaire",
      slug: "master-logistique-et-management-portuaire",
    },
    {
      title: "Management de Projet",
      slug: "master-management-de-projet",
    },
    {
      title: "Stratégie Managériale à l'Internationale",
      slug: "master-strategie-manageriale-a-linternationale",
    },
    {
      title: "Business Intelligence & Stratégie",
      slug: "master-business-intelligence-et-strategie-commerciale",
    },
    {
      title: "Management Public & Innovation Territoriale",
      slug: "master-management-public-et-innovation-territoriale",
    },
    {
      title: "Qualité Hygiène Sécurité & Environnement",
      slug: "master-management-de-la-qualite-hygiene-securite-et-environnement",
    },
    {
      title: "Management Organisations Sanitaires & Sociales",
      slug: "master-management-des-organisations-sanitaires-et-sociales",
    },
    {
      title: "Système, Réseau et Télécommunication",
      slug: "master-systeme-reseau-et-telecommunication",
    },
    {
      title: "Ingénierie du Web & E-communication",
      slug: "master-ingenierie-du-web-et-e-communication",
    },
    {
      title: "Langues Étrangères Appliquées (LEAGE)",
      slug: "master-langues-etrangeres-appliquees-a-la-gestion-des-entreprises",
    },
  ];

  const otherModalities = [
    {
      title: "Formation Initiale",
      href: "/formations",
      icon: GraduationCap,
    },
    {
      title: "Formation Continue",
      href: "/executive-education",
      icon: Briefcase,
    },
    {
      title: "Elearning",
      href: "/programmes/e-learning",
      icon: Laptop,
    },
    {
      title: "Cours du weekend",
      href: "/cours-du-weekend",
      icon: Calendar,
    },
    {
      title: "Présup",
      href: "/presup",
      icon: Languages,
    },
  ];

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("a")) {
          onClose?.();
        }
      }}
      className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden text-slate-900"
    >
      {/* 3 Colonnes Spacieuses : Licences (14), Masters (23), Autres Formations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 bg-white">
        {/* =========================================================================
            COLONNE 1 : LICENCES (14 Formations)
            ========================================================================= */}
        <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
              <GraduationCap className="w-4 h-4 text-afi-navy shrink-0" />
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-900">
                Licences
              </h3>
            </div>

            {/* Scrollable list for all 14 Licences */}
            <div className="max-h-[380px] overflow-y-auto pr-2 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]">
              {allLicences.map((lic) => (
                <Link
                  key={lic.slug}
                  href={`/formations/${lic.slug}`}
                  className="block px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-xs font-medium text-slate-700 hover:text-afi-red line-clamp-1"
                >
                  {lic.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3.5 border-t border-slate-100 mt-4">
            <Link
              href="/formations?level=licence"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-afi-red hover:text-red-700 transition-colors"
            >
              <span>Voir toutes les licences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            COLONNE 2 : MASTERS (23 Formations)
            ========================================================================= */}
        <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
              <Award className="w-4 h-4 text-afi-navy shrink-0" />
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-900">
                Masters
              </h3>
            </div>

            {/* Scrollable list for all 23 Masters */}
            <div className="max-h-[380px] overflow-y-auto pr-2 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]">
              {allMasters.map((mst) => (
                <Link
                  key={mst.slug}
                  href={`/formations/${mst.slug}`}
                  className="block px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-xs font-medium text-slate-700 hover:text-afi-red line-clamp-1"
                >
                  {mst.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3.5 border-t border-slate-100 mt-4">
            <Link
              href="/formations?level=master"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-afi-red hover:text-red-700 transition-colors"
            >
              <span>Voir tous les masters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            COLONNE 3 : AUTRES FORMATIONS & MODALITÉS
            ========================================================================= */}
        <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between bg-slate-50/60">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200/80">
              <Layers className="w-4 h-4 text-afi-navy shrink-0" />
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-900">
                Autres formations
              </h3>
            </div>

            <div className="space-y-3">
              {otherModalities.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 sm:py-4 min-h-[54px] rounded-2xl bg-[#191D38] hover:bg-[#222A5C] text-white border border-[#222A5C] hover:border-afi-red/50 shadow-sm hover:shadow-md transition-all text-xs sm:text-[13px] font-semibold group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <IconComponent className="w-5 h-5 text-afi-red shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate">{item.title}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-3.5 border-t border-slate-200/80 mt-4">
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-afi-red hover:bg-[#8C1412] text-xs font-bold text-white shadow-md hover:shadow-lg transition-all w-full justify-center group"
            >
              <BookOpen className="w-4 h-4 text-white shrink-0" />
              <span>Explorer tout le catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
