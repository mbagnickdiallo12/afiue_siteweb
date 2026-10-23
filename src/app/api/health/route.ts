import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  const checks: Record<string, { status: "ok" | "warning" | "error"; message?: string }> = {
    application: { status: "ok", message: "Next.js App Router running" },
    environment: {
      status: "ok",
      message: process.env.NODE_ENV || "development",
    },
  };

  // Verification Supabase
  let isDatabaseConnected = false;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    checks.supabase = {
      status: "warning",
      message: "Variables Supabase non configurées (mode initialisation)",
    };
  } else {
    try {
      const supabase = await createClient();
      if (supabase) {
        // Query de test légère sur les formations ou la table health
        const { error } = await supabase.from("formations").select("id").limit(1);
        if (error && error.code !== "PGRST116") {
          checks.supabase = {
            status: "warning",
            message: `Supabase joignable mais requête en avertissement: ${error.message}`,
          };
        } else {
          checks.supabase = { status: "ok", message: "Supabase connecté" };
          isDatabaseConnected = true;
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
      checks.supabase = {
        status: "error",
        message: `Erreur connexion Supabase: ${errorMessage}`,
      };
    }
  }

  const responseTimeMs = Date.now() - startTime;
  const isHealthy = checks.application.status === "ok";

  return NextResponse.json(
    {
      status: isHealthy ? "healthy" : "unhealthy",
      service: "afi-lue-platform",
      version: "0.1.0",
      timestamp: new Date().toISOString(),
      responseTimeMs,
      checks,
      supabaseConnected: isDatabaseConnected,
    },
    {
      status: isHealthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
