"use client";

import React, { useState, useMemo } from "react";
import {
  SafeAdminUser,
  AdminRole,
  AdminModulePermission,
} from "@/types/database";
import { ROLE_DEFAULT_PERMISSIONS } from "@/lib/services/auth-token";
import {
  UserPlus,
  Search,
  Edit3,
  Trash2,
  KeyRound,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  X,
  RefreshCw,
  ShieldCheck,
  Users,
  Briefcase,
  ChevronDown,
} from "lucide-react";

interface Props {
  initialUsers: SafeAdminUser[];
  currentUserId?: string;
}

const ROLE_CONFIG: Record<
  AdminRole,
  {
    label: string;
    shortHint: string;
    badgeClass: string;
  }
> = {
  super_admin: {
    label: "Super-Admin",
    shortHint: "Accès intégral au site, aux paramètres et aux utilisateurs.",
    badgeClass: "bg-afi-red text-white",
  },
  admin: {
    label: "Administrateur",
    shortHint: "Gestion des formations, candidatures et contenus du site.",
    badgeClass: "bg-afi-navy text-white",
  },
  scolarite: {
    label: "Scolarité",
    shortHint: "Suivi des dossiers de candidature et catalogue des filières.",
    badgeClass: "bg-blue-600 text-white",
  },
  communication: {
    label: "Communication",
    shortHint: "Actualités, témoignages, slider, vie étudiante et partenaires.",
    badgeClass: "bg-emerald-600 text-white",
  },
};

const MODULES_LIST: { id: AdminModulePermission; label: string }[] = [
  { id: "formations", label: "Formations" },
  { id: "candidatures", label: "Candidatures" },
  { id: "articles", label: "Actualités" },
  { id: "testimonials", label: "Témoignages" },
  { id: "slides", label: "Slider" },
  { id: "vie_etudiante", label: "Vie étudiante" },
  { id: "partenaires", label: "Partenaires" },
  { id: "settings", label: "Paramètres" },
  { id: "users", label: "Utilisateurs" },
];

const DEPARTMENTS_LIST = [
  "Direction Générale & SI",
  "Direction des Études",
  "Service Admissions & Scolarité",
  "Communication & Relations Extérieures",
  "Administration & Finances",
];

function getInitials(name: string): string {
  const parts = (name || "U")
    .replace(/^(Pr\.|Dr\.|M\.|Mme|Mlle)\s+/i, "")
    .trim()
    .split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return (parts[0]?.slice(0, 2) || "US").toUpperCase();
}

function generateStrongPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const specials = "!@#$%&*";
  let result = "Afi";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  result += specials.charAt(Math.floor(Math.random() * specials.length));
  result += Math.floor(10 + Math.random() * 89).toString();
  return result;
}

export function UtilisateursAdminManager({
  initialUsers,
  currentUserId,
}: Props) {
  const [users, setUsers] = useState<SafeAdminUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SafeAdminUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS_LIST[1]);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<AdminRole>("admin");
  const [permissions, setPermissions] = useState<AdminModulePermission[]>(
    ROLE_DEFAULT_PERMISSIONS.admin
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [copiedCredentials, setCopiedCredentials] = useState(false);

  // Quick Password Reset Modal
  const [resetTargetUser, setResetTargetUser] = useState<SafeAdminUser | null>(
    null
  );
  const [newResetPassword, setNewResetPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(true);
  const [copiedReset, setCopiedReset] = useState(false);

  // Delete Modal
  const [deleteTargetUser, setDeleteTargetUser] =
    useState<SafeAdminUser | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const stats = useMemo(() => {
    return {
      total: users.length,
      actifs: users.filter((u) => u.is_active).length,
      direction: users.filter(
        (u) => u.role === "super_admin" || u.role === "admin"
      ).length,
      services: users.filter(
        (u) => u.role === "scolarite" || u.role === "communication"
      ).length,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q);

      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const openCreateModal = () => {
    setEditingUser(null);
    setFullName("");
    setEmail("");
    setDepartment(DEPARTMENTS_LIST[1]);
    setPhone("");
    setRole("admin");
    setPermissions([...ROLE_DEFAULT_PERMISSIONS.admin]);
    setPassword(generateStrongPassword());
    setShowPassword(true);
    setIsActive(true);
    setCopiedCredentials(false);
    setIsModalOpen(true);
  };

  const openEditModal = (user: SafeAdminUser) => {
    setEditingUser(user);
    setFullName(user.full_name);
    setEmail(user.email);
    setDepartment(user.department || DEPARTMENTS_LIST[0]);
    setPhone(user.phone || "");
    setRole(user.role);
    setPermissions(
      user.permissions && user.permissions.length > 0
        ? [...user.permissions]
        : [...ROLE_DEFAULT_PERMISSIONS[user.role]]
    );
    setPassword("");
    setShowPassword(false);
    setIsActive(user.is_active);
    setCopiedCredentials(false);
    setIsModalOpen(true);
  };

  const handleRoleSelect = (nextRole: AdminRole) => {
    setRole(nextRole);
    setPermissions([...ROLE_DEFAULT_PERMISSIONS[nextRole]]);
  };

  const togglePermission = (perm: AdminModulePermission) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleCopyCredentials = async () => {
    const text = `Accès Admin AFI-L'UE\nE-mail : ${email}\nMot de passe : ${
      password || "(inchangé)"
    }`;
    await navigator.clipboard.writeText(text);
    setCopiedCredentials(true);
    setTimeout(() => setCopiedCredentials(false), 2000);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      showNotification("error", "Veuillez renseigner le nom et l'e-mail.");
      return;
    }

    if (!editingUser && password.trim().length < 6) {
      showNotification(
        "error",
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingUser) {
        const res = await fetch(`/api/admin/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName.trim(),
            email: email.trim(),
            department: department.trim(),
            phone: phone.trim() || null,
            role,
            permissions,
            is_active: isActive,
            ...(password.trim() ? { password: password.trim() } : {}),
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          showNotification("error", data.error || "Erreur de mise à jour.");
          setIsSubmitting(false);
          return;
        }
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? data.user : u))
        );
        showNotification("success", `Compte de ${data.user.full_name} mis à jour.`);
      } else {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName.trim(),
            email: email.trim(),
            department: department.trim(),
            phone: phone.trim() || null,
            role,
            permissions,
            password: password.trim(),
            is_active: isActive,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          showNotification("error", data.error || "Erreur de création.");
          setIsSubmitting(false);
          return;
        }
        setUsers((prev) => [data.user, ...prev]);
        showNotification("success", `${data.user.full_name} a été ajouté.`);
      }
      setIsModalOpen(false);
    } catch {
      showNotification("error", "Erreur réseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (user: SafeAdminUser) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !user.is_active }),
      });
      const data = await res.json();
      if (!res.ok) {
        showNotification("error", data.error || "Action non autorisée.");
        return;
      }
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? data.user : u))
      );
      showNotification(
        "success",
        data.user.is_active
          ? `Compte de ${data.user.full_name} activé.`
          : `Compte de ${data.user.full_name} suspendu.`
      );
    } catch {
      showNotification("error", "Erreur réseau.");
    }
  };

  const handleConfirmResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetTargetUser || newResetPassword.trim().length < 6) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users/${resetTargetUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newResetPassword.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        showNotification("error", data.error || "Erreur.");
        setIsSubmitting(false);
        return;
      }
      showNotification(
        "success",
        `Mot de passe réinitialisé pour ${resetTargetUser.full_name}.`
      );
      setResetTargetUser(null);
    } catch {
      showNotification("error", "Erreur réseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetUser) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteTargetUser.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        showNotification("error", data.error || "Suppression refusée.");
        setIsSubmitting(false);
        return;
      }
      setUsers((prev) => prev.filter((u) => u.id !== deleteTargetUser.id));
      showNotification("success", `Compte de ${deleteTargetUser.full_name} supprimé.`);
      setDeleteTargetUser(null);
    } catch {
      showNotification("error", "Erreur réseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* =====================================================================
          1. HEADER MINIMALISTE
          ===================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight">
            Utilisateurs
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Gérez les membres habilités à administrer le site AFI-L&apos;UE.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Nouvel utilisateur</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`px-4 py-3 rounded-2xl text-white text-xs font-semibold flex items-center justify-between shadow-sm ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-white hover:opacity-80 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =====================================================================
          2. INDICATEURS COMPACTS (Style Apple / Linear)
          ===================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xl font-heading font-bold text-slate-900 leading-none">
              {stats.total}
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Total comptes
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xl font-heading font-bold text-slate-900 leading-none">
              {stats.actifs}
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Comptes actifs
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-afi-navy text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xl font-heading font-bold text-slate-900 leading-none">
              {stats.direction}
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Administrateurs
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xl font-heading font-bold text-slate-900 leading-none">
              {stats.services}
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Scolarité & Com
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. BARRE DE FILTRES & LISTE ÉPURÉE
          ===================================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Segmented Control */}
          <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start">
            {[
              { id: "ALL", label: "Tous" },
              { id: "super_admin", label: "Super-Admin" },
              { id: "admin", label: "Admin" },
              { id: "scolarite", label: "Scolarité" },
              { id: "communication", label: "Com" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  roleFilter === tab.id
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Minimalist Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 border border-transparent focus:bg-white focus:border-slate-300 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Clean Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-[#FAFAFB] text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-6">Membre</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Rôle</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const roleInfo =
                    ROLE_CONFIG[user.role] || ROLE_CONFIG.admin;
                  const isSelf = currentUserId === user.id;

                  return (
                    <tr
                      key={user.id}
                      onClick={() => openEditModal(user)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Membre */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-heading font-semibold text-xs flex items-center justify-center shrink-0">
                            {getInitials(user.full_name)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                              <span className="truncate">{user.full_name}</span>
                              {isSelf && (
                                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-900 text-white">
                                  Vous
                                </span>
                              )}
                            </div>
                            <div className="text-slate-400 text-[11px] truncate">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {user.department}
                      </td>

                      {/* Rôle */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${roleInfo.badgeClass}`}
                        >
                          {roleInfo.label}
                        </span>
                      </td>

                      {/* Statut */}
                      <td
                        className="py-3.5 px-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(user)}
                          className="cursor-pointer"
                        >
                          {user.is_active ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              <span>Actif</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                              <span>Suspendu</span>
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td
                        className="py-3.5 px-6 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setResetTargetUser(user);
                              setNewResetPassword(generateStrongPassword());
                              setShowResetPassword(true);
                              setCopiedReset(false);
                            }}
                            title="Réinitialiser le mot de passe"
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditModal(user)}
                            title="Modifier"
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteTargetUser(user)}
                            disabled={isSelf}
                            title="Supprimer"
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 disabled:opacity-25 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================================
          4. MODAL APPLE / GOOGLE WORKSPACE (MINIMALISTE, STRUCTURÉ, ZÉRO SURCHARGE)
          ===================================================================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-[24px] border border-slate-200/90 shadow-[0_24px_60px_rgba(15,23,42,0.18)] w-full max-w-[540px] overflow-hidden my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Light Header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
                  {fullName ? getInitials(fullName) : <UserPlus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 leading-tight">
                    {editingUser ? editingUser.full_name : "Nouvel utilisateur"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {editingUser ? editingUser.email : "Enrôlement manuel"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveUser} className="p-6 space-y-5">
              {/* Section 1: Identité (2 colonnes épurées) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Pr. Abdoulaye Diop"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-slate-900 text-xs font-medium text-slate-900 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@afi-ue.sn"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-slate-900 text-xs font-medium text-slate-900 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Service
                  </label>
                  <div className="relative">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full h-10 pl-3.5 pr-9 appearance-none rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-slate-900 text-xs font-medium text-slate-900 focus:outline-none transition-all cursor-pointer"
                    >
                      {DEPARTMENTS_LIST.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Statut du compte
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl h-10">
                    <button
                      type="button"
                      onClick={() => setIsActive(true)}
                      className={`rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Actif</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsActive(false)}
                      className={`rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        !isActive
                          ? "bg-red-600 text-white shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Suspendu</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 2: Rôle (Segmented Bar style Apple) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold text-slate-500">
                    Rôle
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {ROLE_CONFIG[role].shortHint}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {(Object.keys(ROLE_CONFIG) as AdminRole[]).map((rKey) => {
                    const active = role === rKey;
                    return (
                      <button
                        key={rKey}
                        type="button"
                        onClick={() => handleRoleSelect(rKey)}
                        className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer truncate ${
                          active
                            ? "bg-slate-900 text-white shadow-2xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {ROLE_CONFIG[rKey].label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Accès aux modules (Grille épurée sur fond clair) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-semibold text-slate-500">
                    Modules autorisés ({permissions.length}/9)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setPermissions([...ROLE_DEFAULT_PERMISSIONS[role]])
                    }
                    className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Par défaut
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {MODULES_LIST.map((mod) => {
                    const checked = permissions.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => togglePermission(mod.id)}
                        className={`px-3 py-2 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                          checked
                            ? "border-slate-900 bg-white text-slate-900 shadow-2xs"
                            : "border-slate-200/80 bg-[#F8FAFC] text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            checked
                              ? "bg-slate-900 text-white"
                              : "border border-slate-300 bg-white"
                          }`}
                        >
                          {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        <span className="truncate">{mod.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 4: Mot de passe */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold text-slate-500">
                    {editingUser ? "Changer le mot de passe" : "Mot de passe"}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setPassword(generateStrongPassword());
                      setShowPassword(true);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-afi-red" />
                    <span>Générer</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={!editingUser}
                      placeholder={
                        editingUser
                          ? "Laisser vide pour conserver l'actuel"
                          : "Minimum 6 caractères"
                      }
                      className="w-full h-10 pl-3.5 pr-9 rounded-xl bg-[#F8FAFC] border border-slate-200 focus:bg-white focus:border-slate-900 font-mono text-xs text-slate-900 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCredentials}
                    title="Copier les identifiants"
                    className="h-10 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                  >
                    {copiedCredentials ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. MODAL RÉINITIALISATION RAPIDE DU MOT DE PASSE
          ===================================================================== */}
      {resetTargetUser && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          onClick={() => setResetTargetUser(null)}
        >
          <div
            className="bg-white rounded-[24px] border border-slate-200 shadow-2xl w-full max-w-sm p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  Nouveau mot de passe
                </h3>
                <p className="text-xs text-slate-400">
                  {resetTargetUser.full_name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setResetTargetUser(null)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmResetPassword} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type={showResetPassword ? "text" : "password"}
                    value={newResetPassword}
                    onChange={(e) => setNewResetPassword(e.target.value)}
                    required
                    className="w-full h-10 pl-3.5 pr-9 rounded-xl bg-[#F8FAFC] border border-slate-200 font-mono text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setNewResetPassword(generateStrongPassword())
                    }
                    title="Régénérer"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `E-mail : ${resetTargetUser.email}\nMot de passe : ${newResetPassword}`
                    );
                    setCopiedReset(true);
                    setTimeout(() => setCopiedReset(false), 2000);
                  }}
                  className="h-10 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedReset ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setResetTargetUser(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Appliquer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. MODAL DE SUPPRESSION
          ===================================================================== */}
      {deleteTargetUser && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          onClick={() => setDeleteTargetUser(null)}
        >
          <div
            className="bg-white rounded-[24px] border border-slate-200 shadow-2xl w-full max-w-sm p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Supprimer {deleteTargetUser.full_name} ?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Ce compte perdra immédiatement son accès à l&apos;administration.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTargetUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer"
              >
                {isSubmitting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
