import { getSiteSettings } from "@/lib/services/settings.service";
import { SettingsAdminManager } from "@/components/admin/SettingsAdminManager";

export const metadata = {
  title: "Paramètres du Site | Administration AFI-L'UE",
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return <SettingsAdminManager initialSettings={settings} />;
}
