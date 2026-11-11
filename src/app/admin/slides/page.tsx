import { getAllSlidesAdmin } from "@/lib/services/slides.service";
import { SlidesAdminManager } from "@/components/admin/SlidesAdminManager";

export const metadata = {
  title: "Gestion du Slider d'Accueil | Administration AFI-L'UE",
};

export default async function AdminSlidesPage() {
  const slides = await getAllSlidesAdmin();

  return <SlidesAdminManager initialSlides={slides} />;
}
