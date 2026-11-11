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
    <section className="py-16 sm:py-20 bg-afi-navy-950 text-white relative overflow-hidden select-none">
      {/* Subtle ambient lighting with AFI brand tones */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-afi-red/10 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-white/5 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10 sm:space-y-12">
        {/* Section Header: Clean centered title with FadeIn */}
        <FadeIn className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-widest uppercase">
            QUELQUES CHIFFRES CLÉS
          </h2>
        </FadeIn>

        {/* Modern Minimalist Stat Columns with Stagger and Animated Counters */}
        <StaggerContainer
          staggerChildren={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 sm:gap-y-10 lg:gap-y-0"
        >
          {stats.map((stat, index) => {
            const isLast = index === stats.length - 1;
            return (
              <StaggerItem
                key={stat.label}
                className={`flex flex-col items-center text-center px-6 sm:px-8 lg:px-6 xl:px-10 py-2 sm:py-4 group ${
                  !isLast ? "lg:border-r border-dashed border-white/20" : ""
                }`}
              >
                {/* Typographic Number with breathing room & live count-up */}
                <div className="font-heading font-light sm:font-normal text-5xl sm:text-6xl lg:text-5xl xl:text-6xl tracking-tight text-white leading-none group-hover:text-slate-300 transition-colors duration-300">
                  {stat.formatK ? (
                    <span>
                      <AnimatedCounter value={15} />K
                    </span>
                  ) : (
                    <AnimatedCounter value={stat.numericValue} />
                  )}
                  {stat.symbol && (
                    <span className="text-afi-red font-bold text-2xl sm:text-3xl -top-3.5 sm:-top-4 relative ml-1 inline-block">
                      {stat.symbol}
                    </span>
                  )}
                </div>

                {/* Stat Label */}
                <h3 className="font-heading font-bold text-xs sm:text-[13px] uppercase tracking-widest text-slate-200 mt-5 sm:mt-7">
                  {stat.label}
                </h3>

                {/* Stat Description */}
                <p className="text-xs text-slate-400 leading-relaxed max-w-[190px] xl:max-w-[210px] mx-auto mt-2.5">
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
