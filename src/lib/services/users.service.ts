import {
  AdminUser,
  SafeAdminUser,
  AdminRole,
  AdminModulePermission,
} from "@/types/database";
import { readCmsStore, writeCmsStore, INITIAL_ADMIN_USERS } from "./cms-store";
import { hashPassword, ROLE_DEFAULT_PERMISSIONS } from "./auth-token";

function toSafeUser(user: AdminUser): SafeAdminUser {
  const { password_hash: _ignored, ...safe } = user;
  return safe;
}

export async function getAllAdminUsers(): Promise<SafeAdminUser[]> {
  const store = readCmsStore();
  const users = store.admin_users || INITIAL_ADMIN_USERS;
  return users.map(toSafeUser);
}

export async function getAdminUserById(
  id: string
): Promise<SafeAdminUser | null> {
  const store = readCmsStore();
  const users = store.admin_users || INITIAL_ADMIN_USERS;
  const found = users.find((u) => u.id === id);
  return found ? toSafeUser(found) : null;
}

export async function authenticateAdminUser(
  emailRaw: string,
  passwordPlain: string
): Promise<
  | { success: true; user: SafeAdminUser }
  | { success: false; error: string }
> {
  const email = (emailRaw || "").trim().toLowerCase();
  if (!email || !passwordPlain) {
    return {
      success: false,
      error: "Veuillez renseigner votre adresse e-mail et votre mot de passe.",
    };
  }

  const store = readCmsStore();
  const users = store.admin_users || [...INITIAL_ADMIN_USERS];
  const userIndex = users.findIndex((u) => u.email.toLowerCase() === email);

  if (userIndex === -1) {
    return {
      success: false,
      error:
        "Identifiants incorrects. Aucun compte actif ne correspond à ces informations.",
    };
  }

  const user = users[userIndex];
  const computedHash = await hashPassword(passwordPlain);

  if (user.password_hash !== computedHash) {
    return {
      success: false,
      error:
        "Identifiants incorrects. Veuillez vérifier votre adresse e-mail et votre mot de passe.",
    };
  }

  if (!user.is_active) {
    return {
      success: false,
      error:
        "Ce compte utilisateur est actuellement suspendu. Veuillez contacter le Super Administrateur.",
    };
  }

  // Update last_login_at
  const nowIso = new Date().toISOString();
  users[userIndex] = {
    ...user,
    last_login_at: nowIso,
  };
  store.admin_users = users;
  writeCmsStore(store);

  return {
    success: true,
    user: toSafeUser(users[userIndex]),
  };
}

export interface CreateAdminUserInput {
  email: string;
  full_name: string;
  role: AdminRole;
  department: string;
  job_title?: string | null;
  phone?: string | null;
  password: string;
  is_active?: boolean;
  permissions?: AdminModulePermission[];
}

export async function createAdminUser(
  input: CreateAdminUserInput,
  createdBy = "Super Administrateur"
): Promise<
  | { success: true; user: SafeAdminUser }
  | { success: false; error: string }
> {
  const email = (input.email || "").trim().toLowerCase();
  const fullName = (input.full_name || "").trim();
  const password = input.password || "";

  if (!email || !email.includes("@")) {
    return {
      success: false,
      error: "Veuillez fournir une adresse e-mail professionnelle valide.",
    };
  }

  if (!fullName || fullName.length < 2) {
    return {
      success: false,
      error: "Veuillez renseigner le nom complet de l'utilisateur.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Le mot de passe doit contenir au moins 6 caractères.",
    };
  }

  const store = readCmsStore();
  const users = store.admin_users ? [...store.admin_users] : [...INITIAL_ADMIN_USERS];

  if (users.some((u) => u.email.toLowerCase() === email)) {
    return {
      success: false,
      error: "Un compte utilisateur avec cette adresse e-mail existe déjà.",
    };
  }

  const role: AdminRole = input.role || "admin";
  const permissions =
    input.permissions && input.permissions.length > 0
      ? input.permissions
      : ROLE_DEFAULT_PERMISSIONS[role];

  const passwordHash = await hashPassword(password);
  const nowIso = new Date().toISOString();

  const newUser: AdminUser = {
    id: `usr-${Date.now()}`,
    email,
    full_name: fullName,
    role,
    department: (input.department || "Administration Générale").trim(),
    job_title: input.job_title ? input.job_title.trim() : null,
    phone: input.phone ? input.phone.trim() : null,
    avatar_url: null,
    password_hash: passwordHash,
    is_active: input.is_active !== undefined ? Boolean(input.is_active) : true,
    permissions,
    last_login_at: null,
    created_by: createdBy,
    created_at: nowIso,
    updated_at: nowIso,
  };

  users.unshift(newUser);
  store.admin_users = users;
  writeCmsStore(store);

  return {
    success: true,
    user: toSafeUser(newUser),
  };
}

export interface UpdateAdminUserInput {
  email?: string;
  full_name?: string;
  role?: AdminRole;
  department?: string;
  job_title?: string | null;
  phone?: string | null;
  password?: string;
  is_active?: boolean;
  permissions?: AdminModulePermission[];
}

export async function updateAdminUser(
  id: string,
  input: UpdateAdminUserInput,
  actorUserId?: string
): Promise<
  | { success: true; user: SafeAdminUser }
  | { success: false; error: string }
> {
  const store = readCmsStore();
  const users = store.admin_users ? [...store.admin_users] : [...INITIAL_ADMIN_USERS];
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return {
      success: false,
      error: "Utilisateur introuvable.",
    };
  }

  const current = users[index];

  // Check email uniqueness if changed
  const nextEmail =
    input.email !== undefined ? input.email.trim().toLowerCase() : current.email;
  if (!nextEmail || !nextEmail.includes("@")) {
    return {
      success: false,
      error: "Veuillez fournir une adresse e-mail valide.",
    };
  }
  if (
    nextEmail !== current.email.toLowerCase() &&
    users.some((u) => u.id !== id && u.email.toLowerCase() === nextEmail)
  ) {
    return {
      success: false,
      error: "Cette adresse e-mail est déjà utilisée par un autre compte.",
    };
  }

  const nextRole = input.role ?? current.role;
  const nextActive =
    input.is_active !== undefined ? Boolean(input.is_active) : current.is_active;

  // Safeguard: cannot suspend own active session account
  if (actorUserId && actorUserId === id && !nextActive) {
    return {
      success: false,
      error: "Vous ne pouvez pas suspendre votre propre compte en cours de session.",
    };
  }

  // Safeguard: ensure at least 1 active super_admin remains
  if (
    current.role === "super_admin" &&
    (nextRole !== "super_admin" || !nextActive)
  ) {
    const otherActiveSuperAdmins = users.filter(
      (u) => u.id !== id && u.role === "super_admin" && u.is_active
    );
    if (otherActiveSuperAdmins.length === 0) {
      return {
        success: false,
        error:
          "Action refusée : il doit toujours exister au moins un Super Administrateur actif.",
      };
    }
  }

  let nextPasswordHash = current.password_hash;
  if (input.password && input.password.trim().length > 0) {
    if (input.password.trim().length < 6) {
      return {
        success: false,
        error: "Le nouveau mot de passe doit contenir au moins 6 caractères.",
      };
    }
    nextPasswordHash = await hashPassword(input.password.trim());
  }

  const nextPermissions =
    input.permissions !== undefined
      ? input.permissions
      : input.role && input.role !== current.role
      ? ROLE_DEFAULT_PERMISSIONS[input.role]
      : current.permissions;

  const updated: AdminUser = {
    ...current,
    email: nextEmail,
    full_name:
      input.full_name !== undefined
        ? input.full_name.trim()
        : current.full_name,
    role: nextRole,
    department:
      input.department !== undefined
        ? input.department.trim()
        : current.department,
    job_title:
      input.job_title !== undefined
        ? input.job_title
          ? input.job_title.trim()
          : null
        : current.job_title,
    phone:
      input.phone !== undefined
        ? input.phone
          ? input.phone.trim()
          : null
        : current.phone,
    password_hash: nextPasswordHash,
    is_active: nextActive,
    permissions: nextPermissions,
    updated_at: new Date().toISOString(),
  };

  users[index] = updated;
  store.admin_users = users;
  writeCmsStore(store);

  return {
    success: true,
    user: toSafeUser(updated),
  };
}

export async function deleteAdminUser(
  id: string,
  actorUserId?: string
): Promise<{ success: boolean; error?: string }> {
  if (actorUserId && actorUserId === id) {
    return {
      success: false,
      error: "Vous ne pouvez pas supprimer votre propre compte en cours de session.",
    };
  }

  const store = readCmsStore();
  const users = store.admin_users ? [...store.admin_users] : [...INITIAL_ADMIN_USERS];
  const target = users.find((u) => u.id === id);

  if (!target) {
    return {
      success: false,
      error: "Utilisateur introuvable.",
    };
  }

  if (target.role === "super_admin") {
    const remainingSuperAdmins = users.filter(
      (u) => u.id !== id && u.role === "super_admin" && u.is_active
    );
    if (remainingSuperAdmins.length === 0) {
      return {
        success: false,
        error:
          "Impossible de supprimer le dernier Super Administrateur actif du système.",
      };
    }
  }

  store.admin_users = users.filter((u) => u.id !== id);
  writeCmsStore(store);

  return { success: true };
}

