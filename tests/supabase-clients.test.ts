import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createAdminClient } from "@/lib/supabase/admin";

describe("Supabase Client Module Isolation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("browser client should gracefully return null when env vars are missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const client = createBrowserClient();
    expect(client).toBeNull();
  });

  it("admin client should gracefully return null when service key is missing", () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const client = createAdminClient();
    expect(client).toBeNull();
  });

  it("admin client should throw error if window object is simulated (browser leakage protection)", () => {
    // Simulate window existence
    // @ts-expect-error simulating window
    global.window = {};

    expect(() => createAdminClient()).toThrow(/SÉCURITÉ CRITIQUE/);

    // Clean up
    // @ts-expect-error clean up window
    delete global.window;
  });
});
