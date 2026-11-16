import {
  getAllFormationsAdmin,
  getAcademicConfigAdmin,
} from "@/lib/services/formations.service";
import { FormationsAdminManager } from "@/components/admin/FormationsAdminManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title:
    "Gestion des Formations & Paramètres Académiques | Administration AFI-L'UE",
};

export default async function AdminFormationsPage() {
  const [formations, academicConfig] = await Promise.all([
    getAllFormationsAdmin(),
    getAcademicConfigAdmin(),
  ]);

  return (
    <FormationsAdminManager
      initialFormations={formations}
      initialDomains={academicConfig.domains}
      initialGrades={academicConfig.grades}
      initialPricingGrids={academicConfig.pricingGrids}
    />
  );
}
