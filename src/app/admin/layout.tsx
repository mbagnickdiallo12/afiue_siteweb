import { cookies } from "next/headers";
import { AdminWorkspaceShell } from "@/components/admin/AdminWorkspaceShell";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/services/auth-token";
import { getAdminUserById } from "@/lib/services/users.service";

export const metadata = {
  title: "Administration | AFI-L'Université de l'Entreprise",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialUser = null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    const payload = await verifyAdminSessionToken(token);
    if (payload) {
      const dbUser = await getAdminUserById(payload.userId);
      if (dbUser && dbUser.is_active) {
        initialUser = dbUser;
      }
    }
  } catch {
    initialUser = null;
  }

  return (
    <AdminWorkspaceShell initialUser={initialUser}>
      {children}
    </AdminWorkspaceShell>
  );
}
