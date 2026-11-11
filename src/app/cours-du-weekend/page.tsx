import { Metadata } from "next";
import { getFormations } from "@/lib/services/formations.service";
import { CoursDuWeekendView } from "@/components/formations/CoursDuWeekendView";

export const metadata: Metadata = {
  title: "Cours du Week-end à AFI-L’UE | Licence 3 & Master (Samedi et Dimanche)",
  description:
    "Élargissez vos horizons et atteignez de nouveaux sommets. Cours de week-end le samedi et dimanche de 09h à 17h pour professionnels et étudiants à AFI-L'Université de l'Entreprise.",
};

export default async function CoursDuWeekendPage() {
  const allFormations = await getFormations();
  const weekendFormations = allFormations.filter(
    (f) => !f.study_modes || f.study_modes.includes("weekend")
  );

  return <CoursDuWeekendView formations={weekendFormations} />;
}

