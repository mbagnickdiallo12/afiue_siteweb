import { getEventPopupConfig } from "@/lib/services/event-popup.service";
import { PopupsAdminManager } from "@/components/admin/PopupsAdminManager";

export const metadata = {
  title: "Popups & Événements | Administration AFI-L'UE",
};

export const dynamic = "force-dynamic";

export default async function AdminPopupsPage() {
  const config = await getEventPopupConfig();

  return <PopupsAdminManager initialConfig={config} />;
}

