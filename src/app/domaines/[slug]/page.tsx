import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, GraduationCap } from "lucide-react";
import { getDomainHierarchyBySlug } from "@/lib/services/domains.service";
import { FormationCard } from "@/components/formations/FormationCard";
import { ProgrammePedagogyAndModalities } from "@/components/formations/ProgrammePedagogyAndModalities";
import { DotPattern } from "@/components/ui/dot-pattern";

interface DomainDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: DomainDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const domain = await getDomainHierarchyBySlug(slug);

  if (!domain) {
    return {
      title: "Domaine introuvable | AFI-L'UE",
    };
  }

  return {
    title: `${domain.name} | Pôle d'Enseignement AFI-L'UE`,
    description:
      domain.short_description ||
      `Découvrez les Licences et Masters du domaine ${domain.name} à l'Université AFI-L'UE.`,
  };
}

export default async function DomainDetailPage({
  params,
}: DomainDetailPageProps) {
  const { slug } = await params;
  const domain = await getDomainHierarchyBySlug(slug);

  if (!domain) {
    notFound();
  }

  const { licences, masters } = domain.mentions;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-afi-red transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link
              href="/domaines"
              className="hover:text-afi-red transition-colors"
            >
              Domaines
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold">{domain.name}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white py-16 sm:py-24 relative overflow-hidden">
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/15 [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold font-mono">
            <span>{domain.code}</span>
            <span>•</span>
            <span>{licences.length} Licence{licences.length > 1 ? "s" : ""}</span>
            <span>•</span>
            <span>{masters.length} Master{masters.length > 1 ? "s" : ""}</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {domain.name}
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed font-medium">
            Intégrer le Groupe AFI-L’UE, c&apos;est bénéficier d&apos;une pédagogie innovante et de programmes de formation qui ont un impact réel sur la performance des entreprises.
          </p>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {domain.description || domain.short_description}
          </p>
        </div>
      </div>

      {/* Mentions : Licences & Masters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* 1. Mentions Licences */}
        {licences.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-afi-red block">
                    Cycle Licence (BAC+3)
                  </span>
                  <h2 className="font-heading font-black text-2xl text-slate-900">
                    Mentions Licences ({licences.length})
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {licences.map((f) => (
                <div key={f.id} className="h-full flex flex-col">
                  <FormationCard formation={f} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. Mentions Masters */}
        {masters.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-afi-navy/10 text-afi-navy flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-afi-navy block">
                    Cycle Master (BAC+5)
                  </span>
                  <h2 className="font-heading font-black text-2xl text-slate-900">
                    Mentions Masters ({masters.length})
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {masters.map((f) => (
                <div key={f.id} className="h-full flex flex-col">
                  <FormationCard formation={f} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Parcours 5 ans (International Leader vs Multiprogramme) + Autres Programmes */}
      <ProgrammePedagogyAndModalities />
    </div>
  );
}
