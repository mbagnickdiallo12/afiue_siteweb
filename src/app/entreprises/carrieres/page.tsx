import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Handshake,
  Compass,
  FileText,
  Users,
  FileCheck2,
  ClipboardCheck,
  Building2,
  Award,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";

export const metadata: Metadata = {
  title: "Carrières & Service Insertion | Stages & Emploi | AFI-L'UE",
  description:
    "Le service de l’insertion du Groupe AFI-L’UE accompagne les étudiants et les diplômés dans leur recherche de stage, d’emplois ou d’auto-emplois : recommandation de stage, convention de stage, bilan de stage et lettre d’introduction.",
};

export default function CarrieresPage() {
  const missions = [
    {
      icon: Handshake,
      title: "Partenariat avec le monde professionnel",
    },
    {
      icon: Compass,
      title:
        "Accompagnement des étudiants sur les techniques efficaces de recherche d’emploi",
    },
    {
      icon: FileText,
      title: "Correction de CV et préparation à l’entretien d’embauche",
    },
    {
      icon: Users,
      title: "Organisation d’évènements de networking pour étudiants/alumni",
    },
    {
      icon: FileCheck2,
      title:
        "Délivrance de documents d’appui à l’insertion (lettre de recommandation, bilan de stage, convention de stage, lettre d’introduction)",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      {/* =========================================================================
          1. HERO — SERVICE INSERTION & CARRIÈRES (Brand Blue Gradient & Dot Pattern)
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-slate-400">Entreprises</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-afi-red">Carrières</span>
              </div>

              <div className="space-y-4">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-afi-red">
                  Développement &amp; Coopération Professionnelle
                </span>
                <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                  Service Insertion
                </h1>
                <div className="space-y-3 text-slate-300 text-xs sm:text-base font-light leading-relaxed max-w-2xl">
                  <p>
                    Le service de l’insertion du Groupe AFI-L’UE travaille sous la supervision du département Développement et Coopération avec le monde professionnel. Son érection est une réponse à la nouvelle mission universitaire, en l’occurrence l’insertion des diplômés.
                  </p>
                  <p>
                    Notre objectif général consiste à accompagner les étudiants et les diplômés dans leur recherche de stage et d’emplois ou d’auto-emplois à travers l’incubateur{" "}
                    <strong className="font-bold text-white">AFI-BOOST.</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact?motif=lettre-recommandation"
                  className="px-7 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Demander une lettre</span>
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

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-slate-900">
                <Image
                  src="/images/entreprises/carrieres-1.png"
                  alt="Service Insertion et Carrières AFI-L'UE"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. NOS MISSIONS SONT LES SUIVANTES (Bento Grid)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Accompagnement Carrières
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Nos missions sont les suivantes :
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, idx) => {
              const IconComponent = mission.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-afi-red/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="w-11 h-11 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <p className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-relaxed">
                    {mission.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DOCUMENTS D'APPUI À L'INSERTION (2x2 Architectural Bento Grid)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* 1. Recommandation de stage */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>

                <h2 className="font-heading font-black text-2xl text-slate-900">
                  Recommandation de stage
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    Tout étudiant régulièrement inscrit à AFI-L’UE ou alumni de l’institution peut demander une lettre de recommandation auprès du Service Insertion. Ce document apporte du crédit à votre candidature. Il démontre aussi que l’étudiant est inscrit à AFI-L’UE et suit régulièrement les enseignements dispensés. Concernant l’alumni, la lettre de recommandation est en réalité une preuve supplémentaire de l’authenticité du parcours académique renseigné sur le CV.
                  </p>
                  <p>
                    Les structures d’accueil peuvent également, au besoin, exiger une lettre de recommandation à nos étudiants.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact?motif=lettre-recommandation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-xs"
                >
                  <span>Obtenir une lettre de recommandation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 2. Convention de stage */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                  <FileCheck2 className="w-6 h-6" />
                </div>

                <h2 className="font-heading font-black text-2xl text-slate-900">
                  Convention de stage
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  La convention de stage valide administrativement le stage de l’étudiant. Elle couvre le stagiaire, cadre ses activités au cours de son séjour en entreprise. La convention de stage est produite en trois (03) exemplaires et signée par les trois (03) parties impliquées : l’étudiant, la structure d’accueil et l’université.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact?motif=convention-stage"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-afi-red hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-xs"
                >
                  <span>Obtenir une convention de stage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 3. Bilan de stage */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-afi-red/10 text-afi-red flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6" />
                </div>

                <h2 className="font-heading font-black text-2xl text-slate-900">
                  Bilan de stage
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A cette convention de stage, il est joint un bilan de stage qui permet à l’entreprise d’évaluer le stagiaire. Il s’agit d’un outil d’appréciation des aptitudes du stagiaire sur la base d’un critérium portant principalement sur l’aptitude à traiter des problématiques, l’assiduité, la communication, l’esprit d’équipe , entre autres.
                </p>
              </div>
            </div>

            {/* 4. Lettre d’introduction */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white border border-white/10 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
              <DotPattern
                cx={1}
                cy={1}
                cr={1}
                className="fill-white/10 [mask-image:radial-gradient(350px_circle_at_center,white,transparent)]"
              />
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#1E2E6B]/25 blur-2xl pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-afi-red flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>

                <h2 className="font-heading font-black text-2xl text-white">
                  Lettre d’introduction
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pour les études thématiques, les travaux d’enquête terrain de mémoire ou d’exercice, il vous est délivré une lettre d’introduction auprès de l’entreprise concernée afin de vous autoriser l’accès aux données.
                </p>
              </div>

              <div className="pt-2 relative z-10">
                <Link
                  href="/formations"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wide border border-white/15 transition-all"
                >
                  <span>Voir nos programmes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

