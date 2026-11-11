"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  subtitle: string;
  quote: string;
  avatarUrl?: string;
  initials: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    name: "M. Papa Macodou NDIAYE",
    role: "Directeur Général",
    organization: "ABB Sénégal",
    subtitle: "Directeur Général ABB Sénégal",
    avatarUrl: "/images/testimonials/alumni-ndiaye.jpg",
    initials: "PN",
    quote:
      "Mon Bachelor en Gestion des Réseaux Informatiques était un programme très riche qui en plus de l'informatique, nous formait également en management, finance et ressources humaines, ce qui a beaucoup impacté ma vie professionnelle et m'a ouvert beaucoup d'opportunités. À l'issue de mon premier stage à ABB Sénégal, j'ai eu mon premier contrat en 2008 en qualité de Responsable Informatique avant d'occuper de hautes fonctions régionales au sein du groupe comme ERP Manager for Central Africa et plus tard cumulativement ERP Service Lead Central Africa and HR Manager for West Francophone Africa puis Directeur Général ABB Sénégal et maintenant HR / IS Manager francophone West Africa and Maghreb.",
  },
  {
    id: "2",
    name: "M. Alama DIAWARA",
    role: "Directeur Général Adjoint",
    organization: "Lanala Assurances Vie - Guinée",
    subtitle: "Directeur Général Adjoint Lanala Assurances Vie - Guinée",
    avatarUrl: "/images/testimonials/alumni-diawara.jpg",
    initials: "AD",
    quote:
      "Mon passage à AFI-L'UE (promo 2013-2014) a été déterminant dans mon parcours. Encadré par des professeurs compétents et pédagogues, j'ai pu accéder rapidement au marché de l'emploi et saisir mes premières opportunités. Je conseille aux futurs diplômés de persévérer : cette expérience ne vous décevra pas. Nous sommes fiers d'être Afiens, et cela ouvre de véritables portes pour la réussite professionnelle.",
  },
  {
    id: "3",
    name: "Mme Amélie Veroucheka KOUMBA MABILA",
    role: "Chargée d'études",
    organization: "Agence de Régulation des Marchés publics - Gabon",
    subtitle: "Chargé d'études Agence de Régulation des Marchés publics - Gabon",
    avatarUrl: "/images/testimonials/alumni-mabila.jpg",
    initials: "AK",
    quote:
      "Mon Master en Ingénierie Juridique et Fiscale à l'AFI-l'UE a été une période charnière, me dotant d'une double expertise très pointue. La formation, axée sur la pratique et l'analyse de cas complexes, a renforcé ma capacité à décrypter les enjeux du droit des affaires et de la fiscalité. Cet enseignement transversal est un atout majeur dans mon rôle actuel à l'Agence de Régulation des Marchés Publics du Gabon (ARMP). En effet, l'analyse des contrats et des montages financiers, l'élaboration des politiques et le règlement du contentieux non juridictionnel exigent une rigueur juridique et fiscale que AFI m'a inculquée. Aux futurs étudiants, je vous conseille de saisir toutes les opportunités de professionnalisation offertes par l'école, de cultiver votre réseau et d'être curieux des innovations règlementaires pour devenir des experts incontournables.",
  },
  {
    id: "4",
    name: "M. Guil Alex Morlende",
    role: "Inspecteur des finances et Chef de bureau GPEC",
    organization: "Inspection générale des finances - République du Congo",
    subtitle: "Inspecteur des finances et Chef de bureau GPEC Inspection générale des finances - République du Congo",
    avatarUrl: "/images/testimonials/alumni-morlende.jpg",
    initials: "GM",
    quote:
      "Mon Master en Ressources Humaines à AFI-L'UE m'a permis de comprendre l'importance de la gestion des talents et des personnes, au-delà de l'administratif. J'ai réalisé que la valorisation du capital humain est essentielle pour le développement de nos entreprises et de l'Afrique. Afiens, ne vous limitez pas au diplôme, apprenez à résoudre les vrais problèmes. Notre avenir dépend de notre savoir, de nos compétences et de notre volonté d'agir.",
  },
  {
    id: "5",
    name: "M. El Hadji SIDY NDIAYE",
    role: "Outlets Manager",
    organization: "King Fahd Palace Hôtel - Sénégal",
    subtitle: "Outlets Manager King Fahd Palace Hôtel - Sénégal",
    avatarUrl: "/images/testimonials/alumni-sidy-ndiaye.jpg",
    initials: "EN",
    quote:
      "Désireux de faire une formation en QHSE, j'ai choisi AFI-L'UE sur recommandations d'un ami. Dès mon premier jour, j'ai apprécié les qualités humaines du service accueil et orientation qui m'ont convaincu de part leurs attitudes et comportements car j'avais également en tête d'autres universités offrant le même cycle. Pour ma promotion nous avons eu un corps professoral de qualité et toujours disponibles à accompagner les étudiants au mieux. Ma formation m'a permis également d'aider mon entreprise dans le domaine de la démarche HACCP et la Santé, Sécurité au travail.",
  },
  {
    id: "6",
    name: "M. Daoudou NASSER",
    role: "Avocat Collaborateur",
    organization: "Cabinet d'Avocats Si&A - Union des Comores",
    subtitle: "Avocat Collaborateur Cabinet d'Avocats Si&A - Union des Comores",
    avatarUrl: "/images/testimonials/alumni-nasser.jpg",
    initials: "DN",
    quote:
      "Avocat spécialisé en droit des affaires en Union des Comores, inscrit au barreau depuis le 24 août 2024, j'ai acquis toutes les bases, en droit des affaires, droit fiscal et en techniques juridiques à AFI-L'UE. Au-delà de la formation académique, AFI m'a offert une expérience exceptionnelle en matière de développement personnel, d'intégration sociale et de préparation à la vie professionnelle. L'implication de l'école dans la réussite de ses récipiendaires est remarquable. Je garde de mon passage à AFI une profonde reconnaissance et une véritable nostalgie. Merci infiniment à AFI.",
  },
];

interface AlumniTestimonialsCarouselProps {
  initialTestimonials?: any[];
}

export function AlumniTestimonialsCarousel({ initialTestimonials }: AlumniTestimonialsCarouselProps = {}) {
  const testimonials = (initialTestimonials && initialTestimonials.length > 0)
    ? initialTestimonials.map((t, idx) => ({
        id: t.id || String(idx + 1),
        name: t.author_name || t.name,
        role: t.author_role || t.role || "",
        organization: t.author_company || t.organization || "",
        subtitle: t.subtitle || (t.author_role ? `${t.author_role}${t.author_company ? " " + t.author_company : ""}` : ""),
        quote: t.content || t.quote || "",
        avatarUrl: t.avatar_url || t.avatarUrl || undefined,
        initials: (t.author_name || t.name || "AF")
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      }))
    : DEFAULT_TESTIMONIALS;

  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const firstCard = carouselRef.current.firstElementChild as HTMLElement | null;
    const gap = typeof window !== "undefined" && window.innerWidth >= 640 ? 32 : 24;
    const cardWidth = firstCard ? firstCard.offsetWidth + gap : 400;

    if (direction === "right") {
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      if (scrollLeft <= 20) {
        carouselRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="pt-8 sm:pt-10 pb-16 sm:pb-20 bg-white relative select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Top-Right Navigation Controls (No dots, clean arrows) */}
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={() => scroll("left")}
            aria-label="Témoignage précédent"
            className="w-11 h-11 rounded-full border border-afi-red/30 bg-white hover:bg-afi-red hover:text-white hover:border-afi-red text-afi-red shadow-2xs hover:shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-0 group"
          >
            <ChevronLeft className="w-5 h-5 text-afi-red group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Témoignage suivant"
            className="w-11 h-11 rounded-full border border-afi-red/30 bg-white hover:bg-afi-red hover:text-white hover:border-afi-red text-afi-red shadow-2xs hover:shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-0 group"
          >
            <ChevronRight className="w-5 h-5 text-afi-red group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Carousel Viewport (Scroll-snap based for pixel-perfect card alignment) */}
        <div
          ref={carouselRef}
          className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-3 -my-3 px-1 -mx-1"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="w-full md:w-[calc(50%-16px)] shrink-0 self-stretch flex flex-col snap-start p-6 sm:p-7 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-300 relative group"
            >
                {/* Subtle quotation watermark */}
                <div className="absolute top-6 right-8 text-slate-200 group-hover:text-slate-300/60 transition-colors pointer-events-none">
                  <Quote className="w-10 h-10 rotate-180" />
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Author Header with Circular Avatar */}
                  <div className="flex items-center gap-4">
                    {/* Circular Portrait Avatar */}
                    {item.avatarUrl ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm ring-1 ring-slate-200/80">
                        <Image
                          src={item.avatarUrl}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-afi-navy to-afi-navy-900 text-white font-heading font-black text-xl flex items-center justify-center shrink-0 shadow-sm border-2 border-white ring-1 ring-slate-200/80">
                        {item.initials}
                      </div>
                    )}

                    {/* Author Meta */}
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-afi-red leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="text-slate-700 text-sm sm:text-[14px] leading-relaxed">
                    «{item.quote}»
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

      </div>
    </section>
  );
}
