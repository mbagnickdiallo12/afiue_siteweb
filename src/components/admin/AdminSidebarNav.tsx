"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  MessageSquareQuote,
  FileCheck,
  Newspaper,
  Sliders,
  Sparkles,
  Bot,
  Camera,
  Handshake,
  Users,
  Settings,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
  { label: "Formations", href: "/admin/formations", icon: GraduationCap },
  { label: "Candidatures", href: "/admin/candidatures", icon: FileCheck },
  { label: "Actualités & Blog", href: "/admin/articles", icon: Newspaper },
  { label: "Témoignages Alumni", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Slider Accueil", href: "/admin/slides", icon: Sliders },
  { label: "Popups & Événements", href: "/admin/popups", icon: Sparkles },
  { label: "Agent IA Sophie", href: "/admin/sophie", icon: Bot },
  { label: "Vie Étudiante", href: "/admin/vie-etudiante", icon: Camera },
  { label: "Partenaires", href: "/admin/partenaires", icon: Handshake },
  { label: "Utilisateurs & Accès", href: "/admin/utilisateurs", icon: Users },
  { label: "Paramètres du Site", href: "/admin/settings", icon: Settings },
];

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="p-3.5 space-y-1 flex-1" aria-label="Menu d'administration">
      {MENU_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
              isActive
                ? "bg-afi-red text-white shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                  isActive
                    ? "text-white scale-110"
                    : "text-slate-400 group-hover:text-white group-hover:scale-105"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </div>

            {isActive ? (
              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 shadow-xs" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
