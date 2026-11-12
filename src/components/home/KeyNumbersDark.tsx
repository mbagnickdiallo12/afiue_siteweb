"use client";

import { AnimatedCounter, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function KeyNumbersDark() {
  const stats = [
    {
      numericValue: 1993,
      symbol: "",
      label: "Création",
      description: "Année de fondation de l'Université à Dakar Point E",
    },
    {
      numericValue: 2250,
      symbol: "+",
      label: "Étudiants",
      description: "Étudiants formés chaque année en Licence et Master",
    },
    {
      numericValue: 24,
      symbol: "+",
      label: "Nationalités",
      description: "Diversité académique et culturelle panafricaine",
    },
    {
      numericValue: 118,
      symbol: "+",
      label: "Professeurs",
      description: "Enseignants-chercheurs et directeurs d'entreprise",
    },
    {
      numericValue: 15000,
      formatK: true,
      symbol: "+",
      label: "Alumni",
      description: "Diplômés insérés en entreprise à travers le monde",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-afi-navy-950 text-white relative overflow-hidden select-none">
      {/* Subtle ambient lighting with AFI brand tones */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-afi-red/10 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-white/5 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-12">
        {/* Section Header: Clean centered title with FadeIn */}
        <FadeIn className="text-center max-w-4xl mx-auto">
          <h2 className="font-heading font-black text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-white tracking-widest uppercase sm:whitespace-nowrap">
            QUELQUES CHIFFRES CLÉS
          </h2>
        </FadeIn>

        {/* Modern Minimalist Stat Columns: 2 colonnes sur mobile pour compacité, 5 sur desktop */}
        <StaggerContainer
          staggerChildren={0.08}
          className="grid grid-cols-2 lg:grid-cols-5 gap-x-3 sm:gap-x-8 gap-y-8 sm:gap-y-10 lg:gap-y-0 items-start"
        >
          {stats.map((stat, index) => {
            const isLast = index === stats.length - 1;
            return (
              <StaggerItem
                key={stat.label}
                className={`flex flex-col items-center text-center px-2 sm:px-8 lg:px-6 xl:px-10 py-1 sm:py-4 group ${
                  isLast ? "col-span-2 sm:col-span-1 lg:col-span-1 max-w-[260px] sm:max-w-none mx-auto" : ""
                } ${!isLast ? "lg:border-r border-dashed border-white/20" : ""}`}
              >
                {/* Typographic Number with breathing room & live count-up */}
                <div className="font-heading font-light sm:font-normal text-4xl xs:text-5xl sm:text-6xl lg:text-5xl xl:text-6xl tracking-tight text-white leading-none group-hover:text-slate-300 transition-colors duration-300">
                  {stat.formatK ? (
                    <span>
                      <AnimatedCounter value={15} />K
                    </span>
                  ) : (
                    <AnimatedCounter value={stat.numericValue} />
                  )}
                  {stat.symbol && (
                    <span className="text-afi-red font-bold text-xl sm:text-3xl -top-2.5 sm:-top-4 relative ml-0.5 sm:ml-1 inline-block">
                      {stat.symbol}
                    </span>
                  )}
                </div>

                {/* Stat Label */}
                <h3 className="font-heading font-bold text-[11px] sm:text-[13px] uppercase tracking-wider sm:tracking-widest text-slate-200 mt-2 sm:mt-7">
                  {stat.label}
                </h3>

                {/* Stat Description */}
                <p className="text-[11px] sm:text-xs text-slate-400 leading-tight sm:leading-relaxed max-w-[150px] sm:max-w-[190px] xl:max-w-[210px] mx-auto mt-1 sm:mt-2.5">
                  {stat.description}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
