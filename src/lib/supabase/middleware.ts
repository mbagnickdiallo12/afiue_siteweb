import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/services/auth-token";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  const isDashboardRoute = pathname.startsWith("/admin");
  const isAuthLoginRoute = pathname === "/admin/login";
  const isAdminApiRoute = pathname.startsWith("/api/admin");
  const isAuthApiRoute = pathname.startsWith("/api/admin/auth");

  // 1. Vérification du jeton de session Admin (HMAC-SHA256)
  const adminToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const adminSession = await verifyAdminSessionToken(adminToken);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabaseUser = null;
  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    supabaseUser = user;
  }

  const isAuthenticated = Boolean(adminSession || supabaseUser);

  // 2. Si déjà connecté et visite /admin/login -> rediriger vers /admin
  if (isAuthLoginRoute && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const targetPath =
      redirectParam && redirectParam.startsWith("/admin") && redirectParam !== "/admin/login"
        ? redirectParam
        : "/admin";
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    url.search = "";
    return NextResponse.redirect(url);
  }

  // 3. Protection des pages de l'espace Admin (/admin/** hors /admin/login)
  if (isDashboardRoute && !isAuthLoginRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 4. Protection des routes API Admin (/api/admin/** hors /api/admin/auth/**)
  if (isAdminApiRoute && !isAuthApiRoute && !isAuthenticated) {
    return NextResponse.json(
      { error: "Accès non autorisé. Veuillez vous connecter à votre compte administrateur." },
      { status: 401 }
    );
  }

  return supabaseResponse;
}
