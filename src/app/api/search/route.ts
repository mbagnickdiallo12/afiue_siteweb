import { NextResponse } from "next/server";
import { instantSearch } from "@/lib/services/search.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q.trim() || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = await instantSearch(q);
  return NextResponse.json({ results });
}
