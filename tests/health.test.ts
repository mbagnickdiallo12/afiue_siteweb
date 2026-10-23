import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/health/route";

describe("Health Check API Endpoint", () => {
  it("should return a 200 HTTP response with healthy status", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("status", "healthy");
    expect(body).toHaveProperty("service", "afi-lue-platform");
    expect(body).toHaveProperty("version", "0.1.0");
    expect(body).toHaveProperty("timestamp");
    expect(body.checks).toHaveProperty("application");
    expect(body.checks.application.status).toBe("ok");
  });
});
