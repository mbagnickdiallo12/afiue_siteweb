import { Metadata } from "next";
import { ContactPageView } from "@/components/contact/ContactPageView";

export const metadata: Metadata = {
  title: "Contact & Localisation | Campus Dakar & Thiès | AFI-L'UE",
  description:
    "Prenez contact avec les services administratifs, pédagogiques et d'admissions de l'Université AFI-L'UE à Dakar (Zone B / Point E) et à Thiès.",
};

export default function ContactPage() {
  return <ContactPageView />;
}
