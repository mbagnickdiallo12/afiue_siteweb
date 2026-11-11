import { cookies } from "next/headers";
import { getAllAdminUsers } from "@/lib/services/users.service";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/services/auth-token";
import { UtilisateursAdminManager } from "@/components/admin/UtilisateursAdminManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gestion des Utilisateurs | Administration AFI-L'UE",
};

export default async function AdminUtilisateursPage() {
  const users = await getAllAdminUsers();

  let currentUserId: string | undefined;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    const session = await verifyAdminSessionToken(token);
    if (session) {
      currentUserId = session.userId;
    }
  } catch {
    currentUserId = undefined;
  }

  return (
    <UtilisateursAdminManager
      initialUsers={users}
      currentUserId={currentUserId}
    />
  );
}

