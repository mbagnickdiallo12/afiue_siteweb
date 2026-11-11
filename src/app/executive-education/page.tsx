import { Metadata } from "next";
import { getFormations } from "@/lib/services/formations.service";
import { ExecutiveEducationView } from "@/components/executive-education/ExecutiveEducationView";

export const metadata: Metadata = {
  title: "Executive Education & Formation Continue | AFI-L'UE Dakar",
  description:
    "Formez-vous aujourd'hui, performez demain. Programmes de formation continue, cours du soir, cours de week-end, e-learning et formations sur-mesure pour professionnels et entreprises à Dakar.",
};

export default async function ExecutiveEducationPage() {
  const formations = await getFormations();
  const eveningFormations = formations.filter((f) =>
    f.study_modes?.includes("cours_du_soir")
  );

  return <ExecutiveEducationView formations={eveningFormations} />;
}
