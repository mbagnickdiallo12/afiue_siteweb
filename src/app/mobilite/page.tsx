import { Metadata } from "next";
import { MobiliteView } from "@/components/mobilite/MobiliteView";

export const metadata: Metadata = {
  title: "Mobilité Internationale & Échanges Académiques | AFI-L'UE",
  description:
    "Découvrez les programmes de mobilité internationale d'AFI-L'Université de l'Entreprise : semestres d'échanges, doubles diplômes européens FEDE, accueil d'étudiants de plus de 26 nationalités et partenariats académiques mondiaux.",
  keywords: [
    "mobilité internationale",
    "échanges étudiants",
    "doubles diplômes",
    "AFI-L'UE",
    "études à l'étranger",
    "étudiants internationaux",
    "Dakar",
    "Sénégal",
    "CAMES",
    "FEDE",
  ],
};

export default function MobilitePage() {
  return <MobiliteView />;
}
