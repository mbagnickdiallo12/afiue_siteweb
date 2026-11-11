import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAllAdminUsers,
  createAdminUser,
  getAdminUserById,
} from "@/lib/services/users.service";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/services/auth-token";

export async function GET() {
  try {
    const users = await getAllAdminUsers();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Failed to fetch admin users:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des utilisateurs." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    const session = await verifyAdminSessionToken(token);

    if (!session) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const currentUser = await getAdminUserById(session.userId);
    const createdByLabel = currentUser?.full_name || session.fullName || "Super Administrateur";

    const body = await request.json();
    const result = await createAdminUser(body, createdByLabel);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ user: result.user }, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin user:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'enrôlement de l'utilisateur." },
      { status: 500 }
    );
  }
}

