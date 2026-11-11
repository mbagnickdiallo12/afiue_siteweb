import { AdminRole, AdminModulePermission } from "@/types/database";

export const ADMIN_SESSION_COOKIE = "afi_admin_session";

const AUTH_SECRET =
  process.env.ADMIN_AUTH_SECRET ||
  "afi-lue-university-super-secret-jwt-key-2026-dakar-senegal";

const PASSWORD_SALT = "afi-lue-salt-2026:";

export interface AdminSessionPayload {
  userId: string;
  email: string;
  fullName: string;
  role: AdminRole;
  department: string;
  permissions: AdminModulePermission[];
  iat: number;
  exp: number;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${PASSWORD_SALT}${password}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(new Uint8Array(hashBuffer));
}

async function computeHmacSignature(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  return bytesToHex(new Uint8Array(signature));
}

export async function signAdminSessionToken(
  user: {
    userId: string;
    email: string;
    fullName: string;
    role: AdminRole;
    department: string;
    permissions: AdminModulePermission[];
  },
  rememberMe = false
): Promise<string> {
  const nowSec = Math.floor(Date.now() / 1000);
  // 30 days if rememberMe, otherwise 24 hours
  const ttlSec = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

  const payload: AdminSessionPayload = {
    ...user,
    iat: nowSec,
    exp: nowSec + ttlSec,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = await computeHmacSignature(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(
  token: string | undefined | null
): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, providedSignature] = parts;
  if (!encodedPayload || !providedSignature) return null;

  try {
    const expectedSignature = await computeHmacSignature(encodedPayload);
    if (expectedSignature !== providedSignature) {
      return null;
    }

    const decodedJson = fromBase64Url(encodedPayload);
    const payload = JSON.parse(decodedJson) as AdminSessionPayload;

    const nowSec = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < nowSec) {
      return null;
    }

    if (!payload.userId || !payload.email || !payload.role) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export const ROLE_DEFAULT_PERMISSIONS: Record<
  AdminRole,
  AdminModulePermission[]
> = {
  super_admin: [
    "formations",
    "candidatures",
    "articles",
    "testimonials",
    "slides",
    "vie_etudiante",
    "partenaires",
    "settings",
    "users",
  ],
  admin: [
    "formations",
    "candidatures",
    "articles",
    "testimonials",
    "slides",
    "vie_etudiante",
    "partenaires",
    "settings",
  ],
  scolarite: ["formations", "candidatures"],
  communication: [
    "articles",
    "testimonials",
    "slides",
    "vie_etudiante",
    "partenaires",
  ],
};

