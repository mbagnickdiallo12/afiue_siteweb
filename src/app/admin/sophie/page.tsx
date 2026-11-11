import { Metadata } from "next";
import { SophieAdminManager } from "@/components/admin/SophieAdminManager";

export const metadata: Metadata = {
  title: "Agent IA Sophie | Administration AFI-L'UE",
  description: "Gestion de l'agent IA d'orientation Sophie, configuration et base de connaissances d'AFI-L'UE.",
};

export default function AdminSophiePage() {
  return <SophieAdminManager />;
}

