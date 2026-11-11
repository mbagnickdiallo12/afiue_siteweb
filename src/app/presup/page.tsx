import { Metadata } from "next";
import { PresupPageContent } from "@/components/formations/PresupPageContent";

export const metadata: Metadata = {
  title: "La formation PRESUP | École Préparatoire en Français | AFI-L'UE",
  description:
    "Améliorez votre niveau et accédez à la formation de vos rêves ! Programme préparatoire intensif de langue française (Test TFI™) et d'initiation aux techniques de gestion à AFI-L'UE.",
};

export default function PresupPage() {
  return <PresupPageContent />;
}

