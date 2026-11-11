import { Partner } from "@/types/database";
import { MOCK_PARTNERS } from "@/lib/data/mock-data";

interface PartnersMarqueeProps {
  partners?: Partner[];
}

function PartnerSignature({ partner }: { partner: Partner }) {
  if (partner.logo_url) {
    return (
      <div
        className="flex items-center opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-default grayscale hover:grayscale-0 shrink-0 whitespace-nowrap"
        title={partner.full_title || partner.name}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partner.logo_url}
          alt={partner.full_title || partner.name}
          className="h-7 sm:h-8 w-auto max-w-[140px] object-contain shrink-0"
        />
      </div>
    );
  }

  const style = partner.display_style || "bold-caps";

  switch (style) {
    case "dot-sep":
    case "split_dot":
      return (
        <div
          className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-default shrink-0 whitespace-nowrap"
          title={partner.full_title || partner.name}
        >
          <span className="font-heading font-black text-xl sm:text-2xl text-slate-900 tracking-tight shrink-0 whitespace-nowrap">
            {partner.name}
          </span>
          {partner.sub_label && (
            <>
              <span className="text-slate-400 font-bold text-lg sm:text-xl">·</span>
              <span className="font-heading font-bold text-lg sm:text-xl text-slate-800 tracking-wide shrink-0 whitespace-nowrap">
                {partner.sub_label}
              </span>
            </>
          )}
        </div>
      );

    case "pipe-sep":
    case "split_pipe":
      return (
        <div
          className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-default shrink-0 whitespace-nowrap"
          title={partner.full_title || partner.name}
        >
          <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900 tracking-wider uppercase shrink-0 whitespace-nowrap">
            {partner.name}
          </span>
          {partner.sub_label && (
            <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase border-l border-slate-300 pl-2 shrink-0 whitespace-nowrap">
              {partner.sub_label}
            </span>
          )}
        </div>
      );

    case "serif-italic":
      return (
        <div
          className="flex items-baseline gap-1 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-default shrink-0 whitespace-nowrap"
          title={partner.full_title || partner.name}
        >
          <span className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tighter lowercase shrink-0 whitespace-nowrap">
            {partner.name}
          </span>
          {partner.sub_label && (
            <span className="font-sans font-semibold text-xs text-slate-500 shrink-0 whitespace-nowrap">
              {partner.sub_label}
            </span>
          )}
        </div>
      );

    case "cisco":
      return (
        <div
          className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-default shrink-0 whitespace-nowrap"
          title={partner.full_title || partner.name}
        >
          <svg
            className="w-6 h-5 text-slate-900 shrink-0"
            viewBox="0 0 32 20"
            fill="currentColor"
          >
            <rect x="2" y="10" width="2" height="10" rx="1" />
            <rect x="7" y="6" width="2" height="14" rx="1" />
            <rect x="12" y="2" width="2" height="18" rx="1" />
            <rect x="17" y="2" width="2" height="18" rx="1" />
            <rect x="22" y="6" width="2" height="14" rx="1" />
            <rect x="27" y="10" width="2" height="10" rx="1" />
          </svg>
          <span className="font-heading font-black text-lg sm:text-xl text-slate-900 tracking-wider shrink-0 whitespace-nowrap">
            {partner.name}
          </span>
        </div>
      );

    case "wide-caps":
      return (
        <div
          className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-default shrink-0 whitespace-nowrap"
          title={partner.full_title || partner.name}
        >
          <span className="font-heading font-black text-base sm:text-lg text-slate-900 tracking-[0.2em] uppercase shrink-0 whitespace-nowrap">
            {partner.name}
          </span>
          {partner.sub_label && (
            <span className="font-sans font-semibold text-xs text-slate-500 shrink-0 whitespace-nowrap">
              {partner.sub_label}
            </span>
          )}
        </div>
      );

    case "lowercase_bold":
      return (
        <div
          className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-default shrink-0 whitespace-nowrap"
          title={partner.full_title || partner.name}
        >
          <span className="font-heading font-black text-lg sm:text-xl text-slate-900 tracking-wider lowercase shrink-0 whitespace-nowrap">
            {partner.name}
          </span>
        </div>
      );

    case "bold-caps":
    case "uppercase_bold":
    default:
      return (
        <div
          className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-default grayscale hover:grayscale-0 shrink-0 whitespace-nowrap"
          title={partner.full_title || partner.name}
        >
          <span className="font-heading font-black text-xl sm:text-2xl text-slate-900 tracking-tight shrink-0 whitespace-nowrap">
            {partner.name}
          </span>
          {partner.sub_label && (
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 shrink-0 whitespace-nowrap">
              {partner.sub_label}
            </span>
          )}
        </div>
      );
  }
}

export function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  const activePartners =
    partners && partners.length > 0 ? partners : MOCK_PARTNERS;

  if (activePartners.length === 0) return null;

  return (
    <section
      aria-label="Accréditations et partenaires officiels"
      className="bg-white py-16 sm:py-20 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        {/* Accroche discrète */}
        <p className="text-center text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
          Diplômes reconnus &amp; partenaires d&apos;excellence
        </p>
      </div>

      {/* Carrousel continu automatique ultra-fluide sans superposition ni doublon */}
      <div className="relative w-full overflow-hidden flex [perspective:1000px]">
        {/* Masques de fondu latéraux gauche & droite */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10"
        />

        {/* Piste 1 : Les 6 logos uniques une seule fois, couvrant la largeur de l'écran */}
        <div className="flex shrink-0 w-max min-w-full items-center justify-around animate-marquee-continuous">
          {activePartners.map((partner) => (
            <div
              key={`piste1-${partner.id}`}
              className="shrink-0 flex items-center justify-center px-8 sm:px-12 lg:px-16"
            >
              <PartnerSignature partner={partner} />
            </div>
          ))}
        </div>

        {/* Piste 2 : Clone relais pour la boucle infinie, commence hors écran à droite */}
        <div
          aria-hidden="true"
          className="flex shrink-0 w-max min-w-full items-center justify-around animate-marquee-continuous"
        >
          {activePartners.map((partner) => (
            <div
              key={`piste2-${partner.id}`}
              className="shrink-0 flex items-center justify-center px-8 sm:px-12 lg:px-16"
            >
              <PartnerSignature partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersMarquee;
