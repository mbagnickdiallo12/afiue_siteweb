import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Cpu,
  Network,
  Code2,
  Globe,
  Sparkles,
  LineChart,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { WaveMesh } from "@/components/ui/wave-mesh";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "AFI-TECH Dakar | School of Technology | AFI-L'UE",
  description:
    "AFI TECH propose des formations professionnelles et purement pratiques en technologie : Système Réseau et Télécommunication, Génie Logiciel, Développement Web, Intelligence Artificielle, Finance Digitale et Certifications CCNA, AWS, Azure.",
};

export default function AfiTechDakarPage() {
  const formationsTech = [
    {
      icon: Network,
      title: "Système Réseau et Télécommunication",
      image: "/images/campus/afi-tech-network.png",
    },
    {
      icon: Code2,
      title: "Génie Logiciel",
      image: "/images/campus/afi-tech-dev.png",
    },
    {
      icon: Globe,
      title: "Développement Web et Marketing Digital",
      image: "/images/campus/afi-tech-hero.png",
    },
    {
      icon: Sparkles,
      title: "Intelligence Artificielle",
      image: "/images/campus/afi-tech-ia.png",
    },
    {
      icon: LineChart,
      title: "Finance Digitale",
      image: "/images/campus/afi-tech-hero.png",
    },
  ];

  const certifications = [
    "Cisco Certified Network Associate (CCNA)",
    "AWS Certified Cloud Practitioner & Solutions Architect",
    "Microsoft Certified: Azure Administrator Associate",
    "CPS (Certificats Professionnels de Spécialisation) Développement web et mobile.",
    "CPS (Certificats Professionnels de Spécialisation) Câbleur informatique – Support informatique – Administration réseaux",
    "CPS (Certificats Professionnels de Spécialisation) Installation de réseaux et télécommunications",
    "CPS (Certificats Professionnels de Spécialisation) Marketing Digital et Infographie",
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      {/* =========================================================================
          1. HERO — AFI-TECH SCHOOL OF TECHNOLOGY (WaveMesh with Brand Blue Gradient)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white">
        <WaveMesh
          colors={["transparent", "#c9d6ea", "#E2231A"]}
          crests={true}
          className="relative w-full py-20 sm:py-24"
          style={{
            background:
              "radial-gradient(120% 60% at 50% 30%, rgba(201, 214, 234, 0.08), transparent 60%), linear-gradient(135deg, #0B0F19 0%, #121A38 50%, #1B2754 100%)",
          }}
        >
          {/* Subtle Ambient Navy Blue Glow */}
          <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1E2E6B]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-12 w-[500px] h-[500px] rounded-full bg-[#182559]/25 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-slate-400">Nos campus</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-afi-red font-medium">AFI-TECH Dakar</span>
            </div>

            <div className="max-w-4xl space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-afi-red">
                School of Technology · Point E, Dakar
              </span>
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                AFI-TECH
              </h1>
              <p className="text-slate-200 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-3xl">
                AFI TECH propose des formations professionnelles et purement pratiques en technologie, axées sur l’acquisition de compétences concrètes et immédiatement applicables en milieu professionnel. Le programme met un fort accent sur les ateliers et les projets réels, permettant aux apprenants de se confronter à des défis techniques similaires à ceux qu’ils rencontreront en entreprise.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/candidater"
                className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Rejoignez AFI-TECH</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/formations"
                className="px-7 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold tracking-wide border border-slate-600 transition-all"
              >
                Voir nos programmes
              </Link>
            </div>
          </div>
        </WaveMesh>
      </section>

      {/* =========================================================================
          2. NOS FORMATIONS EN LICENCE & MASTER (AFI-TECH)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <FadeIn className="space-y-2 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              School of Technology
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Nos formations en Licence &amp; Master
            </h2>
          </FadeIn>

          <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formationsTech.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <StaggerItem key={idx}>
                  <HoverLift lift={-5} className="h-full">
                    <div className="h-full bg-slate-50 rounded-3xl border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col justify-between">
                      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-[#0B0F19] via-[#191D38] to-[#28315E] overflow-hidden">
                        <div className="absolute inset-0 pattern-grid-dots opacity-35 pointer-events-none" />
                        <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#364482]/40 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
                        <IconComponent className="absolute bottom-3 right-3.5 w-10 h-10 text-white/10 stroke-[1.25] group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
                      </div>
                      <div className="p-6 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-afi-red text-white flex items-center justify-center shrink-0 shadow-xs">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </HoverLift>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          3. NOS CERTIFICATIONS & FORMATIONS COURTES DURÉES
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Nos Certifications */}
            <StaggerItem className="lg:col-span-7 h-full">
              <div className="h-full p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-afi-red text-white flex items-center justify-center shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                    Nos Certifications
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  À <strong className="font-bold text-slate-900">AFI TECH</strong>, nous offrons une gamme de certifications professionnelles reconnues dans les domaines techniques les plus demandés. Ces certifications permettent à nos apprenants de valider leurs compétences et d’acquérir une reconnaissance nationale et internationale, garantissant ainsi leur employabilité dans des secteurs en forte croissance.
                </p>

                <ul className="space-y-3 pt-1">
                  {certifications.map((cert, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-afi-red shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>

            {/* Nos formations courtes durées */}
            <StaggerItem className="lg:col-span-5 h-full">
              <div className="h-full p-7 sm:p-9 rounded-3xl bg-[#191D38] text-white flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 pattern-grid-dots mask-radial-faded opacity-20 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-afi-red text-white flex items-center justify-center shadow-xs">
                    <Clock className="w-6 h-6" />
                  </div>

                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    Nos formations courtes durées
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <strong className="font-bold text-white">AFI TECH</strong> propose des{" "}
                    <strong className="font-bold text-white">
                      formations courtes durées
                    </strong>{" "}
                    spécialement conçues pour répondre aux besoins immédiats des professionnels et des étudiants souhaitant acquérir de nouvelles compétences en un temps réduit. Ces formations intensives, de 1 à 3 mois, couvrent plusieurs domaines technologiques et visent à offrir une maîtrise rapide et pratique des outils et méthodes actuels dans le secteur des TIC.
                  </p>
                </div>

                <div className="pt-2 relative z-10">
                  <Link
                    href="/candidater"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 hover:scale-105"
                  >
                    <span>S&apos;inscrire à une session</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          4. COORDONNÉES AFI-TECH DAKAR
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
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
                School of Technology
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Contacter AFI-TECH Dakar
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
                      href="tel:+221775088728"
                      className="block hover:text-red-400 transition-colors"
                    >
                      +221 77 508 87 28
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
                    href="mailto:afi.tech@afi-ue.sn"
                    className="font-semibold text-white hover:text-red-400 transition-colors break-all"
                  >
                    afi.tech@afi-ue.sn
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3 relative z-10">
              <Link
                href="/formations"
                className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                <span>Voir nos programmes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/candidater"
                className="px-7 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-600 transition-all"
              >
                Candidater en ligne
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

