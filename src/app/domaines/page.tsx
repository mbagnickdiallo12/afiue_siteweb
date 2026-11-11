import { Metadata } from "next";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { getDomains } from "@/lib/services/domains.service";
import { ProgrammePedagogyAndModalities } from "@/components/formations/ProgrammePedagogyAndModalities";
import TopologyField from "@/components/ui/topology-field";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Domaines & Pôles d'Enseignement | AFI-L'UE",
  description:
    "Découvrez les 4 grands domaines scientifiques de référence d'AFI-L'Université de l'Entreprise.",
};

export default async function DomainesPage() {
  const domains = await getDomains();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero minimaliste style Apple / Google avec TopologyField */}
      <section className="relative overflow-hidden bg-[#070A12] text-white py-24 sm:py-28">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <TopologyField className="w-full h-full pointer-events-none" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#070A12] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[#070A12]/30 pointer-events-none" />
        <FadeIn className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] text-white/80 text-xs font-medium backdrop-blur-md border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>4 Domaines d&apos;Excellence • Licences & Masters</span>
          </div>

          <h1 className="font-sans font-semibold text-2xl sm:text-4xl lg:text-[40px] tracking-tight leading-[1.32] text-white">
            Intégrer le Groupe AFI-L’UE,{" "}
            <span className="text-white/70 font-normal">
              c&apos;est bénéficier d&apos;une pédagogie innovante et de
              programmes de formation qui ont
            </span>{" "}
            un impact réel sur la performance des entreprises.
          </h1>
        </FadeIn>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Domains Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((domain) => (
            <StaggerItem key={domain.id}>
              <HoverLift className="h-full">
                <div
                  className="bg-white rounded-[24px] p-8 border border-slate-200/70 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-center group-hover:bg-[#C8232C] transition-colors">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                        {domain.code}
                      </span>
                    </div>

                    <h2 className="font-sans font-bold text-xl text-[#0B0F19] group-hover:text-[#C8232C] transition-colors mb-2.5">
                      {domain.name}
                    </h2>

                    <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
                      {domain.short_description || domain.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/domaines/${domain.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B0F19] group-hover:text-[#C8232C] transition-colors"
                    >
                      <span>Explorer ce domaine</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={`/formations?domain=${domain.slug}`}
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                    >
                      Voir les filières
                    </Link>
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <ProgrammePedagogyAndModalities />
    </div>
  );
}
