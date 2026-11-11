import { getCandidatures } from "@/lib/services/candidatures.service";
import { CandidaturesAdminManager } from "@/components/admin/CandidaturesAdminManager";

export const metadata = {
  title: "Gestion des Candidatures | Administration AFI-L'UE",
};

export default async function AdminCandidaturesPage() {
  const candidatures = await getCandidatures();

  return <CandidaturesAdminManager initialCandidatures={candidatures} />;
}
