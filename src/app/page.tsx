import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Newspaper,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { FocusFilieres } from "@/components/home/FocusFilieres";
import { ValuesBento } from "@/components/home/ValuesBento";
import { KeyNumbersDark } from "@/components/home/KeyNumbersDark";
import { DomainsQuadrantGrid } from "@/components/home/DomainsQuadrantGrid";
import { AlumniTestimonialsCarousel } from "@/components/home/AlumniTestimonialsCarousel";
import { StudentLifeCarousel } from "@/components/home/StudentLifeCarousel";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { EventLateralPopup } from "@/components/home/EventLateralPopup";
import { getActiveSlides } from "@/lib/services/slides.service";
import { getDomains } from "@/lib/services/domains.service";
import { getArticles } from "@/lib/services/articles.service";
import { getFormations } from "@/lib/services/formations.service";
import { getTestimonials } from "@/lib/services/testimonials.service";
import { getActivePartners } from "@/lib/services/partners.service";
import { getActiveStudentLifeItems } from "@/lib/services/student-life.service";
import { getEventPopupConfig } from "@/lib/services/event-popup.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    slides,
    domains,
    recentArticles,
    formations,
    testimonials,
    partners,
    studentLifeItems,
    eventPopupConfig,
  ] = await Promise.all([
    getActiveSlides(),
    getDomains(),
    getArticles({ limit: 3 }),
    getFormations(),
    getTestimonials(),
    getActivePartners(),
    getActiveStudentLifeItems(),
    getEventPopupConfig(),
  ]);

  return (
    <div className="flex flex-col w-full max-w-full overflow-x-hidden bg-white text-slate-900">
      {/* 1. Ultra-Modern Minimalist Hero Slider (Exact AFI-L'UE formations slides) */}
      <HeroSlider slides={slides} />

      {/* 2. Partners & Accreditations Minimalist Marquee (CAMES, ANAQ-Sup, etc.) */}
      <PartnersMarquee partners={partners} />

      {/* 3. Focus sur nos Filières (Exact WordPress filières in Apple/Omoway Bento) */}
      <FocusFilieres formations={formations} />

      {/* 4. Values & Institutional Pillars (Créativité, Professionnalisme, Gouvernance) */}
      <ValuesBento />

      {/* 5. Luxury Dark Section: Key Verified Numbers (128, 144, 1, 7, 9, 28+) */}
      <KeyNumbersDark />

      {/* 6. Scientific & Academic Domains (4-Quadrant Cross-Grid matching reference) */}
      <DomainsQuadrantGrid domains={domains} />

      {/* 7. Alumni Testimonials Modern Carousel (Apple/Google futuristic aesthetic) */}
      <AlumniTestimonialsCarousel initialTestimonials={testimonials} />

      {/* 8. Recent Campus News & Articles */}
      <section className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <FadeIn className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-heading font-black text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight uppercase sm:whitespace-nowrap">
              FOCUS SUR L&apos;ACTUALITÉ
            </h2>

            <Link
              href="/actualites"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-afi-red hover:text-afi-red-800 transition-colors shrink-0 group"
            >
              <span>Consulter toutes les actualités</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>

          <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {recentArticles.map((article) => {
              const imageUrl = article.cover_image_url || "/images/news/admission-2026.jpg";
              return (
                <StaggerItem key={article.id} className="h-full">
                  <article
                    className="h-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                  >
                    {/* Couverture photo réelle + dégradé cinématographique AFI + pattern pointillé */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900 shrink-0">
                      {/* Photo article */}
                      <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Superposition dégradé cinématographique signature AFI */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#191D38]/50 to-transparent pointer-events-none" />

                      {/* Pattern pointillé signature */}
                      <div className="absolute inset-0 pattern-grid-dots opacity-40 pointer-events-none" />

                      {/* Halo subtil au survol */}
                      <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-afi-red/20 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

                      {/* Watermark discret */}
                      <Newspaper className="absolute bottom-3 right-3.5 w-8 h-8 text-white/20 stroke-[1.25] group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

                      {/* Badge catégorie flottant style Apple (100% opaque) */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20 shadow-xs">
                        {article.category?.name || "Actualité"}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(article.published_at || article.created_at).toLocaleDateString(
                              "fr-FR",
                              { day: "numeric", month: "short", year: "numeric" }
                            )}
                          </span>
                        </div>

                        <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 group-hover:text-afi-red transition-colors leading-snug line-clamp-2">
                          <Link href={`/actualites/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <Link
                          href={`/actualites/${article.slug}`}
                          className="text-xs font-bold text-slate-900 group-hover:text-afi-red flex items-center gap-1.5 transition-colors"
                        >
                          <span>Lire le communiqué</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 9. Full-Width Student Life & Campus Activities Fluid Carousel */}
      <StudentLifeCarousel items={studentLifeItems} />

      {/* 10. Final High-Impact Futuristic CTA Banner */}
      <HomeCtaBanner />

      {/* 11. Modern Minimalist Lateral Event Popup (Slider + Countdown + CTA) */}
      <EventLateralPopup config={eventPopupConfig} />
    </div>
  );
}
