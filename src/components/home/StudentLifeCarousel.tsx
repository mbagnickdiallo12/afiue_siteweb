import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StudentLifeItem } from "@/types/database";
import { MOCK_STUDENT_LIFE } from "@/lib/data/mock-data";

interface StudentLifeCarouselProps {
  items?: StudentLifeItem[];
}

export function StudentLifeCarousel({ items }: StudentLifeCarouselProps) {
  const photos = items && items.length > 0 ? items : MOCK_STUDENT_LIFE;

  if (photos.length === 0) return null;

  // Duplication pour défilement continu infini à 50%
  const loopItems = [...photos, ...photos];

  return (
    <section
      className="pt-16 sm:pt-20 pb-0 bg-white overflow-hidden select-none"
      aria-label="Vie étudiante et activités du campus"
    >
      {/* Header: Subtitle, Title & Action Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-afi-red">
            Campus &amp; Épanouissement
          </span>
          <h2 className="font-heading font-black text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight uppercase whitespace-nowrap">
            VIE ÉTUDIANTE À AFI&#8209;L&apos;UE
          </h2>
        </div>

        <Link
          href="/entreprises/vie-etudiante"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-afi-red hover:text-afi-red-800 transition-colors shrink-0 group"
        >
          <span>Découvrir la vie étudiante</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Full-Width Flush Infinite Image Strip */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee-scroll">
          {loopItems.map((item, idx) => (
            <div
              key={`${item.id || item.image_url}-${idx}`}
              className="group relative w-[320px] sm:w-[390px] lg:w-[440px] h-[250px] sm:h-[290px] lg:h-[320px] shrink-0 overflow-hidden bg-slate-100"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 390px, 440px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle gradient & caption on bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-5 right-5 flex flex-col gap-0.5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                  {item.tag}
                </span>
                <p className="font-heading font-bold text-xs sm:text-sm text-white tracking-tight truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudentLifeCarousel;
