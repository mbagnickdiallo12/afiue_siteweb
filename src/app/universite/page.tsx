import { Metadata } from "next";
import { UniversiteGroupView } from "@/components/universite/UniversiteGroupView";

export const metadata: Metadata = {
  title: "Le Groupe AFI-L'UE | L'Université de l'Entreprise Dakar & Thiès",
  description:
    "Découvrez l'histoire, le mot de la Directrice Générale, la vision, les valeurs, le Lycée Mahmady et la Fondation AFI-L'UE.",
};

export default function UniversitePage() {
  return <UniversiteGroupView />;
}
