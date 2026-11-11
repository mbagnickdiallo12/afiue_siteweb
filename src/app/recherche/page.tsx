import { Metadata } from "next";
import { RechercheView } from "@/components/recherche/RechercheView";

export const metadata: Metadata = {
  title: "AFI Research Center | Recherche & Laboratoire AFI-Lab | AFI-L'UE",
  description:
    "AFI Research Center, Ensemble, construisons demain. Découvrez notre centre de recherche, le laboratoire pluridisciplinaire AFI-Lab, nos axes de recherche, missions et partenariats.",
};

export default function RecherchePage() {
  return <RechercheView />;
}

