import { NextRequest, NextResponse } from "next/server";
import { authenticateAdminUser } from "@/lib/services/users.service";
import {
  ADMIN_SESSION_COOKIE,
  signAdminSessionToken,
} from "@/lib/services/auth-token";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body || {};

    const result = await authenticateAdminUser(email, password);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    const { user } = result;
    const token = await signAdminSessionToken(
      {
        userId: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        department: user.department,
        permissions: user.permissions,
      },
      Boolean(rememberMe)
    );

    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

    const response = NextResponse.json({
      success: true,
      user,
    });

    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors de la connexion." },
      { status: 500 }
    );
  }
}

