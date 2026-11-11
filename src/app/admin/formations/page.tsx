import { getAllFormationsAdmin } from "@/lib/services/formations.service";
import { readCmsStore } from "@/lib/services/cms-store";
import { FormationsAdminManager } from "@/components/admin/FormationsAdminManager";

export const metadata = {
  title: "Gestion des Formations & Paramètres Académiques | Administration AFI-L'UE",
};

export default async function AdminFormationsPage() {
  const [formations, store] = await Promise.all([
    getAllFormationsAdmin(),
    Promise.resolve(readCmsStore()),
  ]);

  return (
    <FormationsAdminManager
      initialFormations={formations}
      initialDomains={store.domains_config || []}
      initialGrades={store.grades_config || []}
      initialPricingGrids={store.pricing_grids_config || []}
    />
  );
}
