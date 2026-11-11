import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/services/auth-token";
import { getAdminUserById } from "@/lib/services/users.service";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    const payload = await verifyAdminSessionToken(token);
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await getAdminUserById(payload.userId);
    if (!user || !user.is_active) {
      const response = NextResponse.json(
        { user: null, error: "Session expirée ou compte suspendu." },
        { status: 401 }
      );
      response.cookies.set(ADMIN_SESSION_COOKIE, "", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return response;
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Admin auth/me error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

