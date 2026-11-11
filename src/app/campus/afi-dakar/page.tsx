import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Building2,
  Cpu,
  Wifi,
  BookOpen,
  BarChart3,
  Scale,
  Users,
  CheckCircle2,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { getFormations } from "@/lib/services/formations.service";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Campus AFI Dakar | Siège Principal Zone B & Point E | AFI-L'UE",
  description:
    "Découvrez le campus principal d'AFI-L'UE à Dakar (Zone B / Point E) : Licences, Masters, Executive Education, AFI Research Center et infrastructures modernes.",
};

export default async function AfiDakarPage() {
  const allFormations = await getFormations();
  const licences = allFormations.filter((f) => f.level === "licence");
  const masters = allFormations.filter((f) => f.level === "master");

  const domaines = [
    {
      icon: BarChart3,
      title: "Sciences Économiques et de Gestion",
      desc: "Banque, Finance, Audit, Comptabilité, Ressources Humaines, Marketing Digital, Supply Chain et Management International.",
    },
    {
      icon: Scale,
      title: "Sciences Juridiques, Politiques et de l’Administration",
      desc: "Management Juridique et Fiscal, Ingénierie Juridique, Audit Juridique et Fiscal, Droit des Affaires OHADA.",
    },
    {
      icon: Cpu,
      title: "Sciences et Technologies",
      desc: "Génie Logiciel, Intelligence Artificielle & Big Data, Systèmes Réseaux & Télécommunications, Développement Web.",
    },
    {
      icon: Users,
      title: "Sciences de l’Homme et de la Société",
      desc: "Langues Étrangères Appliquées, Management des Organisations Sanitaires et Sociales, Communication et Leadership.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      {/* =========================================================================
          1. HERO — CAMPUS AFI DAKAR (Brand Blue Gradient & Dot Pattern)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white py-16 sm:py-20">
        {/* Subtle Ambient Navy Blue Glow */}
        <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1E2E6B]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-12 w-[500px] h-[500px] rounded-full bg-[#182559]/20 blur-3xl pointer-events-none" />

        {/* Modern Dot Pattern with Radial Mask */}
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/15 [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-400">Nos campus</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-afi-red">AFI Dakar</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-afi-red">
              Siège Historique · Zone B &amp; Point E
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Campus AFI Dakar
            </h1>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-3xl">
              Implanté au cœur de Dakar depuis 1993, le campus principal d&apos;AFI-L&apos;Université de l&apos;Entreprise regroupe la Direction Générale, les quatre grands pôles académiques, l&apos;Executive Education et le centre de recherche AFI Research Center.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/candidater"
              className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Candidater à AFI Dakar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/formations"
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/15 transition-all"
            >
              Voir nos programmes
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PRÉSENTATION & ENVIRONNEMENT D'ÉTUDE
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                Un Cadre d&apos;Excellence au Cœur de la Capitale
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                L&apos;Université de l&apos;Entreprise à Dakar
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Situé à Dakar (Zone B Rue G &amp; Point E), à proximité immédiate des grands sièges d&apos;entreprises et institutions financières, le campus AFI Dakar offre un environnement d&apos;apprentissage moderne, connecté et résolument tourné vers l&apos;employabilité et l&apos;entrepreneuriat.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Accueillant plus de 24 nationalités en formation initiale (cours du jour) et en formation continue (cours du soir et week-end), le campus de Dakar délivre des diplômes reconnus par l&apos;ANAQ-Sup et le CAMES.
              </p>
            </div>

            <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100">
              <Image
                src="/images/campus/afi-dakar-overview.jpg"
                alt="Campus AFI Dakar - AFI-L'Université de l'Entreprise"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </FadeIn>

          {/* 4 Domaines de formation */}
          <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domaines.map((dom, idx) => {
              const IconComponent = dom.icon;
              return (
                <StaggerItem key={idx}>
                  <HoverLift lift={-4} className="h-full">
                    <div className="h-full p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 space-y-3">
                      <IconComponent className="w-8 h-8 text-afi-red stroke-[1.75]" />
                      <h3 className="font-heading font-black text-base text-slate-900 leading-snug">
                        {dom.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {dom.desc}
                      </p>
                    </div>
                  </HoverLift>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          3. FILIÈRES PROPOSÉES À DAKAR (LICENCES & MASTERS)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <FadeIn className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Offre Académique Dakar
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Nos Licences &amp; Masters à AFI Dakar
            </h2>
          </FadeIn>

          <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Licences */}
            <StaggerItem>
              <div className="h-full p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="font-heading font-black text-xl text-slate-900 uppercase">
                    NOS LICENCES (BAC+3)
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-afi-red text-white text-xs font-bold shadow-xs">
                    {licences.length} filières
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-2.5">
                  {licences.map((lic) => (
                    <li key={lic.id || lic.slug}>
                      <Link
                        href={`/formations/${lic.slug}`}
                        className="group flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 hover:text-afi-red transition-colors py-1"
                      >
                        <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium group-hover:underline">
                          {lic.title.replace(/^Licence\s+/i, "")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>

            {/* Masters */}
            <StaggerItem>
              <div className="h-full p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="font-heading font-black text-xl text-slate-900 uppercase">
                    NOS MASTERS (BAC+5)
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-afi-navy text-white text-xs font-bold shadow-xs">
                    {masters.length} filières
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-2.5">
                  {masters.map((mst) => (
                    <li key={mst.id || mst.slug}>
                      <Link
                        href={`/formations/${mst.slug}`}
                        className="group flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 hover:text-afi-navy transition-colors py-1"
                      >
                        <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium group-hover:underline">
                          {mst.title.replace(/^Master\s+/i, "")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          4. INFRASTRUCTURES & CONTACTS DAKAR
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <Cpu className="w-7 h-7 text-afi-red" />
              <h3 className="font-heading font-bold text-base text-slate-900">
                Laboratoires Informatiques
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Salles équipées pour les travaux pratiques en génie logiciel, réseaux Cisco CCNA, IA et Big Data.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <Wifi className="w-7 h-7 text-afi-red" />
              <h3 className="font-heading font-bold text-base text-slate-900">
                Campus Connecté Haut Débit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Couverture Wi-Fi dédiée et plateforme numérique e-learning accessible 24h/24.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <BookOpen className="w-7 h-7 text-afi-red" />
              <h3 className="font-heading font-bold text-base text-slate-900">
                Bibliothèque &amp; Recherche
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fonds documentaire spécialisé, bases numériques internationales et laboratoire AFI-Lab.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <Building2 className="w-7 h-7 text-afi-red" />
              <h3 className="font-heading font-bold text-base text-slate-900">
                Incubateur &amp; Vie Étudiante
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accompagnement entrepreneurial, AFI Web Radio, clubs étudiants et événements carrières.
              </p>
            </div>
          </div>

          {/* Contact Banner */}
          <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10 shadow-xl">
            <DotPattern
              cx={1}
              cy={1}
              cr={1}
              className="fill-white/10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
            />
            <div className="lg:col-span-7 space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                Coordonnées du Campus
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Contacter AFI Dakar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-sm sm:text-base text-slate-100">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-afi-red shrink-0" />
                  <span className="font-semibold text-white">Dakar, zone B Rue G</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-afi-red shrink-0 mt-0.5" />
                  <div className="space-y-0.5 font-semibold text-white">
                    <a
                      href="tel:+221338247110"
                      className="block hover:text-red-400 transition-colors"
                    >
                      +221 33 824 71 10
                    </a>
                    <a
                      href="tel:+221775088728"
                      className="block hover:text-red-400 transition-colors"
                    >
                      +221 77 508 87 28
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-afi-red shrink-0" />
                  <a
                    href="mailto:afi@afi-ue.sn"
                    className="font-semibold text-white hover:text-red-400 transition-colors break-all"
                  >
                    afi@afi-ue.sn
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3 relative z-10">
              <Link
                href="/candidater"
                className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Déposer ma candidature</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/formations"
                className="px-7 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-600 transition-all"
              >
                Voir nos programmes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

