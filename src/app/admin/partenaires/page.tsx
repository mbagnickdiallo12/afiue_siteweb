import { getAllPartnersAdmin } from "@/lib/services/partners.service";
import PartnersAdminManager from "@/components/admin/PartnersAdminManager";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await getAllPartnersAdmin();
  return <PartnersAdminManager initialPartners={partners} />;
}

