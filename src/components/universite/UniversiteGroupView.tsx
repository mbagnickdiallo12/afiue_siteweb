"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Landmark,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Scale,
  Play,
  X,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, HoverLift } from "@/components/ui/motion";

export function UniversiteGroupView() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);


  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-afi-red selection:text-white select-none">
      
      {/* =========================================================================
          1. HERO SECTION (Editorial, Minimalist & Prestigious)
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-medium">Le Groupe</span>
          </div>

          {/* Big Typography */}
          <div className="max-w-4xl space-y-4">
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              AFI-L&apos;Université de l&apos;Entreprise
            </h1>
            <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-3xl">
              Pôle d&apos;enseignement supérieur de référence en Afrique de l&apos;Ouest, dédié à la formation de leaders, gestionnaires et ingénieurs directement opérationnels.
            </p>
          </div>

          {/* Quick Metrics Ribbon with Shimmer Beam */}
          <div className="relative pt-6 border-t border-white/10 overflow-hidden">
            {/* Animated scanning shimmer beam */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-afi-red to-transparent w-1/3 animate-shimmer-beam" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">
                  <AnimatedCounter value={1993} />
                </p>
                <p className="text-xs text-slate-400">Année de création</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">
                  <AnimatedCounter value={2500} suffix="+" />
                </p>
                <p className="text-xs text-slate-400">Étudiants actifs</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">
                  <AnimatedCounter value={15000} suffix="+" />
                </p>
                <p className="text-xs text-slate-400">Alumni en entreprise</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-black text-white">
                  <AnimatedCounter value={24} prefix="+" />
                </p>
                <p className="text-xs text-slate-400">Nationalités</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. LE MOT DE LA DIRECTRICE GÉNÉRALE (Executive Letter)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left: The Official Speech (Span 7) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
                    Le Mot de la Directrice Générale
                  </h2>
                  <div className="w-12 h-1 bg-afi-red rounded-full" />
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <p>
                    Créé en 1993, le Groupe AFI-L&apos;UE est l&apos;une des premières business school du Sénégal.
                  </p>
                  <p>
                    Pur produit africain résolument tourné vers la construction d&apos;un futur meilleur, son histoire est profondément marquée par une volonté de répondre à 3 constats criards, intrinsèquement liés au développement de l&apos;Afrique :
                  </p>

                  <ul className="space-y-2.5 pl-1 py-1">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                      <span>Le fort besoin en entrepreneurs pour résorber le chômage endémique de sa jeunesse ;</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                      <span>La nécessité de profiter de la valeur ajoutée provenant de la transformation de ses ressources naturelles ;</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                      <span>Le fait que l&apos;Afrique ne se développera que par l&apos;effort de ses enfants.</span>
                    </li>
                  </ul>

                  <p>
                    Ainsi, l&apos;ambition du Groupe AFI-L&apos;UE se traduit par une offre de formation et de services totalement en phase avec le monde qui l&apos;entoure ainsi que la formation d&apos;entrepreneurs et de dirigeants d&apos;entreprises ambitieux, économiquement efficaces et socialement responsables. Toutes ces démarches s&apos;inscrivent notamment dans le cadre d&apos;une interaction forte avec les entreprises, grandes ou plus petites, au Sénégal comme à l&apos;international, et visent à contribuer à la dynamique de l&apos;écosystème économique.
                  </p>
                  <p>
                    Intégrer le Groupe AFI-L&apos;UE, c&apos;est bénéficier d&apos;une pédagogie innovante et de programmes de formation qui ont un impact réel sur la performance des entreprises.
                  </p>
                  <p>
                    Face aux nouveaux enjeux de la globalisation, le Groupe AFI-L&apos;UE poursuit son développement avec un objectif ambitieux : <strong className="font-bold text-slate-900">faire partie des plus influentes Business Schools mondiales et s&apos;imposer comme un acteur majeur de l&apos;éducation et de la formation.</strong>
                  </p>
                </div>

              </div>

              {/* Right: Portrait & Directrice Identity (Span 5) */}
              <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
                <HoverLift className="flex justify-center">
                  <div className="relative w-[280px] sm:w-[320px] lg:w-[340px] h-[370px] sm:h-[420px] lg:h-[450px] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/universite/sophie-diouf-coulibaly.jpg"
                      alt="Mme Sophie Diouf COULIBALY - Directrice Générale du Groupe AFI-L'UE"
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                      className="object-cover object-top"
                    />
                  </div>
                </HoverLift>

                <div className="space-y-1 pt-1">
                  <h3 className="font-heading font-black text-xl text-slate-900">
                    Mme Sophie Diouf COULIBALY
                  </h3>
                  <p className="text-xs font-semibold text-slate-600">
                    Directrice Générale du Groupe AFI-L&apos;UE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* =========================================================================
          3. FILM INSTITUTIONNEL (Video Showcase Banner)
          ========================================================================= */}
      <section className="pt-0 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group">
          {/* Background image cover */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[360px]">
            <Image
              src="/images/universite/video-poster-afi.jpg"
              alt="Film Institutionnel AFI-L'Université de l'Entreprise"
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500" />

            {/* Play Button Trigger Only */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={() => setVideoModalOpen(true)}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-afi-red hover:bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-afi-red/50 hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn ring-8 ring-white/20 hover:ring-white/30 backdrop-blur-sm"
                aria-label="Regarder le film institutionnel"
              >
                <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current translate-x-0.5 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. NOTRE VISION (3 Architectural Minimalist Pillars)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Notre Vision
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilier 1 */}
            <StaggerItem>
              <HoverLift className="h-full">
                <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 space-y-5 flex flex-col justify-start h-full">
                  <GraduationCap className="w-10 h-10 sm:w-11 sm:h-11 text-afi-red stroke-[1.5]" />
                  <p className="font-heading font-bold text-base sm:text-lg text-slate-800 leading-relaxed">
                    Etre leader de la formation professionnelle supérieure en développant une stratégie d&apos;assurance qualité de niveau international
                  </p>
                </div>
              </HoverLift>
            </StaggerItem>

            {/* Pilier 2 */}
            <StaggerItem>
              <HoverLift className="h-full">
                <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 space-y-5 flex flex-col justify-start h-full">
                  <Landmark className="w-10 h-10 sm:w-11 sm:h-11 text-afi-red stroke-[1.5]" />
                  <p className="font-heading font-bold text-base sm:text-lg text-slate-800 leading-relaxed">
                    Être une université de référence pour tous demandeurs de formation
                  </p>
                </div>
              </HoverLift>
            </StaggerItem>

            {/* Pilier 3 */}
            <StaggerItem>
              <HoverLift className="h-full">
                <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 space-y-5 flex flex-col justify-start h-full">
                  <Handshake className="w-10 h-10 sm:w-11 sm:h-11 text-afi-red stroke-[1.5]" />
                  <p className="font-heading font-bold text-base sm:text-lg text-slate-800 leading-relaxed">
                    Etre l&apos;université partenaire privilégiée des entreprises
                  </p>
                </div>
              </HoverLift>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          5. NOS VALEURS (The 3 Core Authentic Values)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <FadeIn className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Nos Valeurs Fondatrices
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Créativité */}
          <StaggerItem>
            <HoverLift className="h-full">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-afi-red/40 transition-all duration-300 space-y-4 h-full">
                <Lightbulb className="w-10 h-10 text-afi-red" />
                <h3 className="font-heading font-black text-2xl text-slate-900">
                  Créativité
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Dans son plan d&apos;organisation et de fonctionnement, AFI-L&apos;UE accorde une place de choix à la créativité, ce qui lui permet de résoudre de manière efficiente et originale les défis auxquels elle est confrontée.
                </p>
              </div>
            </HoverLift>
          </StaggerItem>

          {/* Professionnalisme */}
          <StaggerItem>
            <HoverLift className="h-full">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0F19] text-white border border-white/10 shadow-md space-y-4 h-full">
                <ShieldCheck className="w-10 h-10 text-afi-red" />
                <h3 className="font-heading font-black text-2xl text-white">
                  Professionnalisme
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Dans la formation qu&apos;elle dispense, l&apos;Université de l&apos;Entreprise veille à l&apos;acquisition d&apos;aptitudes et de compétences nécessaires à l&apos;accomplissement d&apos;un travail fait selon les plus hautes normes d&apos;excellence et de maîtrise.
                </p>
              </div>
            </HoverLift>
          </StaggerItem>

          {/* Bonne Gouvernance */}
          <StaggerItem>
            <HoverLift className="h-full">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-afi-red/40 transition-all duration-300 space-y-4 h-full">
                <Scale className="w-10 h-10 text-afi-red" />
                <h3 className="font-heading font-black text-2xl text-slate-900">
                  Bonne Gouvernance
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Afin de maintenir un excellent niveau de performance, AFI-L&apos;UE s&apos;est engagée à renforcer la promotion de la bonne gouvernance en orientant ses actions stratégiques vers un environnement favorable à une gestion transparente et cohérente.
                </p>
              </div>
            </HoverLift>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* =========================================================================
          6. RECONNAISSANCES & ACCRÉDITATIONS (Trust Strip)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b border-slate-200/80 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
              Garantie Académique
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900">
              Reconnaissances &amp; Accréditations Internationales
            </h3>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
              {/* CAMES */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 space-y-4 group">
                <div className="h-16 w-full flex items-center justify-start">
                  <div className="relative h-16 w-24">
                    <Image
                      src="/images/universite/accreditations/cames-logo.png"
                      alt="Logo CAMES - Conseil Africain et Malgache pour l'Enseignement Supérieur"
                      fill
                      className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                      sizes="100px"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-heading font-black text-base text-slate-900">
                    Accrédité CAMES
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Diplômes reconnus et validés par le Conseil Africain et Malgache pour l&apos;Enseignement Supérieur, conférant une équivalence directe dans 19 pays.
                  </p>
                </div>
              </div>

              {/* ANAQ-SUP */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 space-y-4 group">
                <div className="h-16 w-full flex items-center justify-start">
                  <div className="relative h-16 w-28">
                    <Image
                      src="/images/universite/accreditations/anaq-sup-logo.png"
                      alt="Logo ANAQ-Sup - Autorité Nationale d'Assurance Qualité"
                      fill
                      className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                      sizes="120px"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-heading font-black text-base text-slate-900">
                    Habilité ANAQ-Sup
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Habilitation institutionnelle délivrée par l&apos;Autorité Nationale d&apos;Assurance Qualité de l&apos;Enseignement Supérieur du Sénégal.
                  </p>
                </div>
              </div>

              {/* MESRI */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 space-y-4 group">
                <div className="h-16 w-full flex items-center justify-start">
                  <div className="relative h-16 w-28">
                    <Image
                      src="/images/universite/accreditations/mesri-logo.png"
                      alt="Logo MESRI - Ministère de l'Enseignement Supérieur, de la Recherche et de l'Innovation"
                      fill
                      className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                      sizes="120px"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-heading font-black text-base text-slate-900">
                    Ministère de Tutelle
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Établissement privé d&apos;enseignement supérieur agréé par le Ministère de l&apos;Enseignement Supérieur, de la Recherche et de l&apos;Innovation (MESRI).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* =========================================================================
          7. LES ENTITÉS DU GROUPE (Le Lycée Mahmady & La Fondation AFI)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Les Entités AFI-L&apos;UE
          </h2>
        </div>

        {/* Entity 1: Le Lycée Mahmady (LEM) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
            <Image
              src="/images/universite/lycee-mahmady-students.jpg"
              alt="Élèves du Lycée Mahmady (LEM) en classe"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 450px"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-afi-red text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              Enseignement Secondaire
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                Excellence dès le Lycée
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                Le Lycée Mahmady (LEM)
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>
                Créé en 2012, le lycée d&apos;excellence MAHMADY fait partie intégrante du Groupe AFI-L&apos;UE.
              </p>
              <p>
                En effet, c&apos;est pour concourir à l&apos;œuvre éducative que l&apos;université a élargi ses offres de formation, en acceptant de s&apos;investir dans l&apos;enseignement moyen et secondaire.
              </p>
              <p>
                Ce lycée initialement dédié à la gestion, étend depuis quelques années ses programmes conformément aux recommandations du gouvernement. On y retrouve donc en plus de la série STEG, les séries L et S.
              </p>
              <p>
                Depuis sa création, Le lycée Mahmady s&apos;est inscrit dans une dynamique de progression et de performance et l&apos;organisation et l&apos;animation du LEM sont centrées sur la réussite de l&apos;élève :
              </p>

              <ul className="space-y-2 pl-1 py-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>Limiter nos effectifs à 30 élèves maximum par classe afin d&apos;optimiser les chances d&apos;atteindre nos objectifs ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>Suivre rigoureusement les programmes officiels ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>Renforcer les enseignements en français, en anglais, en informatique et en mathématiques ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>Choisir un corps professoral expérimenté à l&apos;écoute des élèves ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>Initier les apprenants à la culture de l&apos;entreprise et au leadership ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>Promouvoir un cadre d&apos;épanouissement, de rencontre, et d&apos;échange en dehors des salles de classes, à travers l&apos;animation culturelle et sportive.</span>
                </li>
              </ul>

              <p>
                Ainsi, le Groupe AFI-L&apos;UE a élaboré un plan stratégique quinquennal dont les objectifs et les activités opérationnelles contribueront à coup sûr à la réalisation de sa vision qui est d&apos;être leader de l&apos;enseignement moyen, général et professionnel et de promouvoir les valeurs dans lesquelles l&apos;Afrique se reconnaît.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact?motif=lycee-mahmady"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-afi-red text-white text-xs font-bold transition-all"
              >
                <span>En savoir plus sur le Lycée Mahmady</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Entity 2: Fondation AFI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 lg:order-2 relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
            <Image
              src="/images/universite/fondation-afi-children.jpg"
              alt="La Fondation AFI - Centre Aéré et accompagnement des enfants"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 450px"
            />
          </div>

          <div className="lg:col-span-7 lg:order-1 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-afi-red">
                Engagement Citoyen &amp; RSE
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                La Fondation AFI
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>
                la Fondation AFI-L&apos;UE est un organisme de bienfaisance qui permet à l&apos;université de s&apos;ancrer dans son environnement à travers le déploiement de programmes axés sur :
              </p>

              <ul className="space-y-2 pl-1 py-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>L&apos;appui et assistance aux enfants ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>Le développement à la base ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>L&apos;entreprise au cœur du développement durable ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>Les sciences et les techniques ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>La culture et la découverte ;</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-afi-red mt-2 shrink-0 ring-4 ring-afi-red/15" />
                  <span>L&apos;éducation à la citoyenneté et à l&apos;humanité.</span>
                </li>
              </ul>

              <p>
                Parmi les nombreuses activités menées par la fondation, <strong className="font-semibold text-slate-800">LE CENTRE AÉRÉ</strong> que nous organisons gratuitement au profit des enfants depuis 14 ans s&apos;inscrit dans le programme d&apos;appui et Assistance à la Petite Enfance.
              </p>

              <p>
                Il permet à des enfants âgés de 6 à 12 ans et ayant une moyenne de passage en classe supérieure, de passer des vacances utiles et agréables.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact?motif=fondation-afi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-afi-red text-white text-xs font-bold transition-all"
              >
                <span>Les actions de la Fondation AFI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          10. VIDEO MODAL PLAYER
          ========================================================================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 bg-slate-900 text-white border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Film Institutionnel AFI-L&apos;UE
              </span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fermer la vidéo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video container with YouTube embed */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                src="https://www.youtube-nocookie.com/embed/neieRkW4VJg?autoplay=1&rel=0"
                title="Film Institutionnel AFI-L'Université de l'Entreprise"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
