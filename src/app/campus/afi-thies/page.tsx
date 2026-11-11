import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  BarChart3,
  Scale,
  Cpu,
  Users,
  CheckCircle2,
  Award,
  GraduationCap,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Campus AFI-Thiès | AFI-L'UE vous rejoint à Thiès | AFI-L'UE",
  description:
    "AFI-L’UE vous rejoint à Thiès. Intégrez l’université d’un monde qui bouge. Plus de 35 choix de filières réparties en quatre domaines de formation (Licences, Masters, BTS et CPS).",
};

export default function AfiThiesPage() {
  const domaines = [
    {
      icon: BarChart3,
      title: "Sciences Économiques et de Gestion",
    },
    {
      icon: Scale,
      title: "Sciences Juridiques, Politiques et de l’Administration",
    },
    {
      icon: Cpu,
      title: "Sciences et Technologies",
    },
    {
      icon: Users,
      title: "Sciences de l’Homme et de la Société",
    },
  ];

  const licences = [
    "Banque Assurance Finance",
    "Gestion des Ressources Humaines",
    "Gestion Financière, Fiscale et Comptable des Entreprises",
    "Gestion Financière et Administrative des Entreprises",
    "Marketing Management et Communication Digitale",
    "Management des Affaires Internationales",
    "Transport Logistique",
    "Qualité Hygiène Sécurité et Environnement",
    "Management Juridique et Fiscal",
    "Génie Logiciel",
    "Système Réseau et Télécommunication",
    "Développement Web et Marketing Digital",
    "Langues Etrangères Appliquées à la Gestion des Entreprises",
  ];

  const masters = [
    "Audit et Contrôle de Gestion",
    "Gestion Financière, Fiscale et Comptable des Entreprises",
    "Ingénierie Financière",
    "Finance Internationale et Marchés Boursiers",
    "Banque Privée Internationale",
    "Management des Ressources Humaines",
    "Marketing Management et Communication Digitale",
    "Stratégie Managériale à l’Internationale",
    "Supply chain Management",
    "Logistique et Management Portuaire",
    "Qualité, Hygiène, Sécurité, Environnement et Audit",
    "Ingénierie Juridique et Fiscale",
    "Audit Juridique et Fiscal",
    "Génie Logiciel",
    "Système Réseau et Télécommunication",
    "Ingénierie du web et E-communication",
  ];

  const bts = [
    "BTS Comptabilité-Gestion",
    "BTS Commerce International",
    "BTS Transport Logistique",
    "BTS Transit",
    "BTS Marketing et Communication Digitale",
    "BTS Informatique de gestion",
  ];

  const cps = [
    "CPS Assistant ressources numériques",
    "CPS Opérateur en marketing digital",
    "CPS Infographiste maquettiste",
    "CPS Opérateur en Administration de réseau locaux d’entreprise",
    "CPS en Installateur Réseaux et Télécommunications",
    "CPS Assistanat ressources humaines",
    "CPS Développement Web et mobile",
    "CPS Opérateur Webmaster",
    "CPS Agent pointeur",
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      {/* =========================================================================
          1. HERO — AFI-THIÈS (Brand Blue Gradient & Dot Pattern)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white py-16 sm:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/images/campus/afi-thies-hero.jpg"
            alt="AFI-Thiès - AFI-L'UE vous rejoint à Thiès"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#121A38]/90 to-[#1B2754]/80" />
        </div>

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
            <span className="text-afi-red">AFI-Thiès</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-afi-red">
              Campus Régional de Thiès · Mbour 4
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              AFI-L’UE vous rejoint à Thiès.
            </h1>
            <p className="text-slate-200 text-base sm:text-xl font-light leading-relaxed max-w-2xl">
              Intégrez l’université d’un monde qui bouge. Plus de{" "}
              <strong className="font-bold text-white">35 choix de filières</strong>{" "}
              réparties en{" "}
              <strong className="font-bold text-white">
                quatre domaines de formation
              </strong>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/candidater"
              className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Rejoignez-nous à Thiès</span>
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
          2. LES 4 DOMAINES DE FORMATION À THIÈS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <FadeIn className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Quatre Domaines de Formation
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Plus de 35 choix de filières à AFI-Thiès
            </h2>
          </FadeIn>

          <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domaines.map((dom, idx) => {
              const IconComponent = dom.icon;
              return (
                <StaggerItem key={idx}>
                  <HoverLift lift={-4} className="h-full">
                    <div className="h-full p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
                      <IconComponent className="w-9 h-9 text-afi-red stroke-[1.75]" />
                      <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 leading-snug">
                        {dom.title}
                      </h3>
                    </div>
                  </HoverLift>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          3. NOS LICENCES & NOS MASTERS À THIÈS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* NOS LICENCES */}
            <StaggerItem>
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-6 h-6 text-afi-red" />
                    <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-900 uppercase">
                      NOS LICENCES
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-afi-red text-white text-xs font-bold shadow-xs">
                    {licences.length} filières
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {licences.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>

            {/* NOS MASTERS */}
            <StaggerItem>
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-6 h-6 text-afi-navy" />
                    <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-900 uppercase">
                      NOS MASTERS
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-afi-navy text-white text-xs font-bold shadow-xs">
                    {masters.length} filières
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {masters.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          4. BTS & CERTIFICATS PROFESSIONNELS DE SPÉCIALISATION (CPS)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* BTS */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-5">
              <div className="flex items-center gap-2.5 border-b border-slate-200/80 pb-4">
                <Award className="w-6 h-6 text-afi-red" />
                <h2 className="font-heading font-black text-lg sm:text-xl text-slate-900">
                  Brevet de Technicien Supérieur – BTS
                </h2>
              </div>

              <ul className="space-y-2.5">
                {bts.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CPS */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-5">
              <div className="flex items-center gap-2.5 border-b border-slate-200/80 pb-4">
                <Award className="w-6 h-6 text-afi-red" />
                <h2 className="font-heading font-black text-lg sm:text-xl text-slate-900">
                  Certificats Professionnels de Spécialisation – CPS
                </h2>
              </div>

              <ul className="space-y-2.5">
                {cps.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. COORDONNÉES AFI-THIÈS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Campus Régional AFI-Thiès
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Contacter AFI-Thiès
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-sm sm:text-base text-slate-100">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-afi-red shrink-0" />
                  <span className="font-semibold text-white">Mbour 4 Thiès, en face antenne RTS</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-afi-red shrink-0 mt-0.5" />
                  <div className="space-y-0.5 font-semibold text-white">
                    <a
                      href="tel:+221775583838"
                      className="block hover:text-red-400 transition-colors"
                    >
                      +221 77 558 38 38
                    </a>
                    <a
                      href="tel:+221338247110"
                      className="block hover:text-red-400 transition-colors"
                    >
                      +221 33 824 71 10
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-afi-red shrink-0" />
                  <a
                    href="mailto:afithies@afi-ue.sn"
                    className="font-semibold text-white hover:text-red-400 transition-colors break-all"
                  >
                    afithies@afi-ue.sn
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3 relative z-10">
              <Link
                href="/candidater"
                className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Candidater à Thiès</span>
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

