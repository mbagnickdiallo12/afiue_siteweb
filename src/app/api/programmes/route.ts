import { NextRequest, NextResponse } from "next/server";
import {
  getProgrammeHierarchy,
  getFormations,
} from "@/lib/services/formations.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain") || undefined;
  const level = searchParams.get("level") || undefined;
  const search = searchParams.get("search") || undefined;

  const [hierarchy, filteredFormations] = await Promise.all([
    getProgrammeHierarchy(),
    getFormations({ domain, level, search }),
  ]);

  const filteredTree = domain
    ? hierarchy.filter(
        (d) =>
          d.slug === domain || d.code.toLowerCase() === domain.toLowerCase()
      )
    : hierarchy;

  const totalLicences = filteredTree.reduce(
    (acc, d) => acc + d.mentions.licences.length,
    0
  );
  const totalMasters = filteredTree.reduce(
    (acc, d) => acc + d.mentions.masters.length,
    0
  );

  return NextResponse.json({
    programme: "Programme AFI-L'UE",
    stats: {
      total_domains: filteredTree.length,
      total_licences: totalLicences,
      total_masters: totalMasters,
      total_formations: totalLicences + totalMasters,
    },
    domains: filteredTree,
    formations: filteredFormations,
  });
}

