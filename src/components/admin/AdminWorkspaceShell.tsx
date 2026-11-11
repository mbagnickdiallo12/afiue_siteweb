"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  ShieldCheck,
  LogOut,
  Users,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";
import { SafeAdminUser, AdminRole } from "@/types/database";

const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Accès Super-Admin",
  admin: "Administrateur",
  scolarite: "Service Scolarité",
  communication: "Service Communication",
};

function getInitials(name: string): string {
  const parts = (name || "Admin")
    .replace(/^(Pr\.|Dr\.|M\.|Mme|Mlle)\s+/i, "")
    .trim()
    .split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return (parts[0]?.slice(0, 2) || "AD").toUpperCase();
}

export function AdminWorkspaceShell({
  initialUser,
  children,
}: {
  initialUser: SafeAdminUser | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<SafeAdminUser | null>(
    initialUser
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginRoute) return;

    let cancelled = false;
    fetch("/api/admin/auth/me", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          if (!cancelled) {
            router.replace(`/admin/login?redirect=${encodeURIComponent(pathname || "/admin")}`);
          }
          return;
        }
        const data = await res.json();
        if (!cancelled && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {
        // Ignore transient network errors
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, isLoginRoute, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      setCurrentUser(null);
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  const displayName = currentUser?.full_name || "Administrateur";
  const displayRole = currentUser
    ? ROLE_LABELS[currentUser.role] || "Administrateur"
    : "Accès Super-Admin";
  const initials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row font-body text-slate-800 antialiased selection:bg-afi-red selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0B0F19] text-white flex flex-col shrink-0 border-r border-slate-800 shadow-xl z-30">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Logo variant="light" />
        </div>

        {/* User Identity Ribbon */}
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-afi-red text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {displayName}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">{displayRole}</span>
              </div>
            </div>
          </div>

          <Link
            href="/admin/utilisateurs"
            title="Gérer les utilisateurs"
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <Users className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Nav Links */}
        <AdminSidebarNav />

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all group"
          >
            <span className="flex items-center gap-2 font-medium">
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Voir le site public</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              afi-ue.sn
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all cursor-pointer disabled:opacity-60"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>
                {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
              </span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-900">
              Tableau de Bord Administratif Sécurisé
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              title="Session active"
              className="relative flex h-3 w-3 items-center justify-center"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Fermer la session"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </header>

        <main className="p-6 sm:p-8 lg:p-10 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

