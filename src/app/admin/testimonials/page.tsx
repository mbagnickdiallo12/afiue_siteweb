import { getAllTestimonialsAdmin } from "@/lib/services/testimonials.service";
import { TestimonialsAdminManager } from "@/components/admin/TestimonialsAdminManager";

export const metadata = {
  title: "Gestion des Témoignages Alumni | Administration AFI-L'UE",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin();

  return <TestimonialsAdminManager initialTestimonials={testimonials} />;
}

