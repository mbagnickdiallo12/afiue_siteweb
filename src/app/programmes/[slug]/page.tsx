import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Wallet,
  CheckCircle2,
  GraduationCap,
  Download,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { getFormations } from "@/lib/services/formations.service";
import { FormationCard } from "@/components/formations/FormationCard";
import { PresupPageContent } from "@/components/formations/PresupPageContent";
import { DotPattern } from "@/components/ui/dot-pattern";

interface ProgrammeModalityData {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string[];
  targetAudience: string[];
  scheduleInfo: {
    duration: string;
    hours: string;
    days: string;
  };
  tuitionTable: {
    level: string;
    registration: string;
    monthly: string;
    notes: string;
  }[];
  extraFees: string[];
  dossierRequirements: string[];
  brochureUrl: string;
  filterLevel?: "licence" | "master";
}

const MODALITIES_DATA: Record<string, ProgrammeModalityData> = {
  "formation-initiale": {
    slug: "formation-initiale",
    title: "Formation Initiale (Cours du Jour)",
    subtitle:
      "Un parcours d'excellence en 3 ans (Licence) après le Baccalauréat, disponible en parcours International Leader ou Multiprogramme.",
    badge: "Bacheliers & Étudiants • Octobre à Juillet",
    description: [
      "La Formation Initiale du Groupe AFI-L’UE s'adresse aux nouveaux bacheliers et aux étudiants souhaitant s'investir à temps plein dans un cursus universitaire structuré, professionnalisant et tourné vers l'international.",
      "Dès la 1ère année de Licence, l'étudiant choisit entre le parcours International Leader (double diplomation AFI-L'UE cosignée MESRI + Diplôme Européen d'Études Supérieures DEES de la FEDE + préparation TOEIC) et le parcours Multiprogramme (diplôme d'État AFI-L'UE cosigné MESRI).",
    ],
    targetAudience: [
      "Titulaires du Baccalauréat toutes séries (L1) ou d'un niveau BAC+1 / BAC+2 validé (L2 / L3)",
      "Étudiants recherchant un encadrement académique rigoureux, des bureaux d'adaptation au monde de l'entreprise et une vie associative riche",
      "Futurs cadres et entrepreneurs souhaitant développer leur leadership et leur ouverture internationale",
    ],
    scheduleInfo: {
      duration: "10 mois par année académique (Octobre à Juillet)",
      hours: "Cours en journée (08h00 – 17h00)",
      days: "Du lundi au vendredi + activités de leadership & sport",
    },
    tuitionTable: [
      {
        level: "Licence 1 – Multiprogramme",
        registration: "170 000 FCFA",
        monthly: "75 000 FCFA / mois",
        notes: "10 mois (Octobre – Juillet)",
      },
      {
        level: "Licence 2 – Multiprogramme",
        registration: "170 000 FCFA",
        monthly: "80 000 FCFA / mois",
        notes: "10 mois (Octobre – Juillet)",
      },
      {
        level: "Licence 3 – Multiprogramme",
        registration: "170 000 FCFA",
        monthly: "85 000 FCFA / mois",
        notes: "10 mois (Octobre – Juillet)",
      },
      {
        level: "Licence 1, 2 & 3 – International Leader",
        registration: "170 000 FCFA",
        monthly: "95 000 FCFA / mois",
        notes: "Double diplomation AFI-L'UE + FEDE & Certification TOEIC",
      },
    ],
    extraFees: [
      "Uniforme L1 et L2 : 50 000 FCFA",
      "Bootcamp d'intégration L1 : 40 000 FCFA",
      "Bibliothèque numérique (annuelle) : 10 000 FCFA",
      "Frais de mémoire L3 : 70 000 FCFA",
      "Graduation L3 : 70 000 FCFA",
    ],
    dossierRequirements: [
      "Photocopies légalisées du relevé de notes + attestation ou diplôme du BAC",
      "1 Attestation d’authenticité du BAC (uniquement pour les baccalauréats non sénégalais)",
      "1 Photocopie légalisée de la CNI ou du Passeport",
      "1 Extrait d’acte de naissance & 2 photos d’identité",
      "Pour L2 / L3 : Copies légalisées des bulletins de L1 / L2 ou relevé de notes + Attestation BTS",
    ],
    brochureUrl: "/brochures/offre-de-formation-2026-2027.pdf",
    filterLevel: "licence",
  },

  "formation-continue": {
    slug: "formation-continue",
    title: "Formation Continue (Cours du Soir)",
    subtitle:
      "Conciliez évolution de carrière et obtention d'un diplôme d'État de Licence ou de Master grâce à nos horaires aménagés en soirée.",
    badge: "Professionnels & Étudiants • 17h30 – 20h45",
    description: [
      "L’offre de formation continue du Groupe AFI-L’UE est prioritairement destinée aux professionnels en activité et aux étudiants qui souhaitent valoriser leurs expériences par un diplôme reconnu par l'État, l'ANAQ-Sup et le CAMES.",
      "Dispensés de 17h30 à 20h45 par des universitaires de rang magistral et des praticiens d'entreprise, les cours du soir permettent de donner une nouvelle orientation à sa carrière ou de la renforcer par une double compétence.",
    ],
    targetAudience: [
      "Professionnels en activité souhaitant valoriser leurs acquis par une Licence ou un Master",
      "Cadres et agents désirant évoluer vers des postes de direction",
      "Étudiants en stage ou en emploi en journée",
    ],
    scheduleInfo: {
      duration: "10 mois (Novembre à Août)",
      hours: "17h30 – 20h45",
      days: "En soirée (semaine)",
    },
    tuitionTable: [
      {
        level: "Licence 1, Licence 2 & Licence 3 (Cours du Soir)",
        registration: "170 000 FCFA",
        monthly: "70 000 FCFA / mois",
        notes: "10 mois (Novembre – Août)",
      },
      {
        level: "Master 1 & Master 2 (Cours du Soir)",
        registration: "180 000 FCFA",
        monthly: "95 000 FCFA / mois",
        notes: "10 mois (Novembre – Août)",
      },
    ],
    extraFees: [
      "Bibliothèque numérique (annuelle) : 10 000 FCFA",
      "Frais de mémoire L3 : 70 000 FCFA | Frais de mémoire M2 : 100 000 FCFA",
      "Graduation L3 / M2 : 70 000 FCFA",
    ],
    dossierRequirements: [
      "1 Extrait de naissance + 2 photos d’identité",
      "1 Copie légalisée de la CNI ou du Passeport",
      "1 Copie légalisée du diplôme et du relevé de notes du BAC (+ Attestation d’authenticité pour BAC non sénégalais)",
      "Copies légalisées des bulletins de L1, L2 et L3 (ou BTS) + Attestation de réussite Licence 3 / Master 1",
    ],
    brochureUrl: "/brochures/offre-de-formation-2026-2027.pdf",
  },

  "e-learning": {
    slug: "e-learning",
    title: "Formation à Distance (E-Learning 100% en ligne)",
    subtitle:
      "Suivez votre Licence 3 ou votre Master (M1 & M2) à distance, où que vous soyez en Afrique ou dans le monde, avec la même valeur de diplôme.",
    badge: "100% en ligne • 18h00 – 20h00",
    description: [
      "Le E-learning, encore appelé formation en ligne ou formation à distance en français, permet de suivre une formation diplômante sans besoin de présence physique.",
      "C'est une modalité moderne reposant sur la mise à disposition de supports numériques interactifs, de classes virtuelles en direct (18h00 – 20h00) et d'un suivi pédagogique individualisé, sanctionnée par les mêmes diplômes d'État cosignés par le Ministère de l'Enseignement Supérieur.",
    ],
    targetAudience: [
      "Professionnels résidant hors de Dakar ou dans les pays de la sous-région et à l'international",
      "Cadres à forte mobilité professionnelle ne pouvant assister aux cours en présentiel",
      "Titulaires d'un BAC+2 (pour la Licence 3) ou d'un BAC+3/BAC+4 (pour le Master 1 & 2)",
    ],
    scheduleInfo: {
      duration: "09 mois (Janvier à Septembre)",
      hours: "18h00 – 20h00",
      days: "Sessions synchrones & plateforme asynchrone 24h/24",
    },
    tuitionTable: [
      {
        level: "Licence 3 E-Learning (100% en ligne)",
        registration: "200 000 FCFA",
        monthly: "90 000 FCFA / mois",
        notes: "09 mois (Janvier – Septembre)",
      },
      {
        level: "Master 1 & Master 2 E-Learning (100% en ligne)",
        registration: "200 000 FCFA",
        monthly: "100 000 FCFA / mois",
        notes: "09 mois (Janvier – Septembre)",
      },
    ],
    extraFees: [
      "Bibliothèque numérique (annuelle) : 10 000 FCFA",
      "Frais de mémoire L3 : 70 000 FCFA | Frais de mémoire M2 : 100 000 FCFA",
      "Graduation L3 / M2 : 70 000 FCFA",
    ],
    dossierRequirements: [
      "1 Extrait de naissance + 2 photos d’identité",
      "1 Copie légalisée de la CNI ou du Passeport",
      "1 Copie légalisée du diplôme et du relevé de notes du BAC (+ Attestation d’authenticité pour BAC non sénégalais)",
      "Copies légalisées des bulletins de L1 & L2 (ou BTS) pour L3, et diplôme de Licence 3 pour Master",
    ],
    brochureUrl: "/brochures/offre-de-formation-2026-2027.pdf",
  },

  "cours-du-weekend": {
    slug: "cours-du-weekend",
    title: "Cours du Week-end (Licence 3 & Master)",
    subtitle:
      "Préparez votre Licence 3 ou votre Master le Samedi et le Dimanche sans impacter votre agenda professionnel de la semaine.",
    badge: "Samedi & Dimanche • 09h00 – 17h00",
    description: [
      "Les Cours du Week-end d'AFI-L'Université de l'Entreprise offrent une alternative idéale aux professionnels et étudiants qui ne peuvent se libérer en semaine, ni en journée ni en soirée.",
      "Répartis sur le Samedi et le Dimanche de 09h00 à 17h00 durant 9 mois (de Janvier à Septembre), ils couvrent l'intégralité du programme officiel de Licence 3 et de Master (Master 1 et Master 2).",
    ],
    targetAudience: [
      "Cadres et professionnels ayant des horaires de travail étendus du lundi au vendredi",
      "Titulaires d'un BTS, DUT ou Licence 2 souhaitant valider leur Licence 3 le week-end",
      "Titulaires d'une Licence (BAC+3) ou d'un Master 1 préparant un Master spécialisé",
    ],
    scheduleInfo: {
      duration: "09 mois (Janvier à Septembre)",
      hours: "09h00 – 17h00",
      days: "Samedi et Dimanche",
    },
    tuitionTable: [
      {
        level: "Licence 3 – Cours du Week-end",
        registration: "170 000 FCFA",
        monthly: "80 000 FCFA / mois",
        notes: "09 mois (Janvier – Septembre)",
      },
      {
        level: "Master 1 & Master 2 – Cours du Week-end",
        registration: "180 000 FCFA",
        monthly: "95 000 FCFA / mois",
        notes: "09 mois (Janvier – Septembre)",
      },
    ],
    extraFees: [
      "Bibliothèque numérique (annuelle) : 10 000 FCFA",
      "Frais de mémoire L3 : 70 000 FCFA | Frais de mémoire M2 : 100 000 FCFA",
      "Graduation L3 / M2 : 70 000 FCFA",
    ],
    dossierRequirements: [
      "1 Extrait de naissance + 2 photos d’identité",
      "1 Copie légalisée de la CNI ou du Passeport",
      "1 Copie légalisée du diplôme et du relevé de notes du BAC",
      "Copies légalisées des bulletins de L1 & L2 / Attestation BTS / Attestation Licence 3",
    ],
    brochureUrl: "/brochures/offre-de-formation-2026-2027.pdf",
  },

  presup: {
    slug: "presup",
    title: "PRÉSUP – École Préparatoire aux Études Supérieures en Français",
    subtitle:
      "Accompagner les étudiants internationaux non francophones dans la maîtrise du français académique et l'initiation aux techniques de gestion.",
    badge: "600 heures • 10 mois (Octobre à Juillet)",
    description: [
      "AFI-L’UE accueille tous les ans un nombre croissant d’étudiants étrangers. PRÉSUP est une école préparatoire aux études supérieures dans les universités de langue française qui a pour objectif de pallier les difficultés d’ordre linguistique que rencontrent les étudiants non francophones durant les premières années de leur formation.",
      "PRÉSUP s’adresse à tous les pays non francophones, notamment aux pays de la sous-région Ouest-Africaine et d’Afrique Centrale (Guinée-Bissau, Cap-Vert, Gambie, Ghana, Guinée Équatoriale, Mauritanie, Nigeria...), mais aussi à toute personne souhaitant améliorer son niveau de français afin d’accéder harmonieusement à une formation supérieure.",
    ],
    targetAudience: [
      "Étudiants non francophones titulaires du Baccalauréat souhaitant intégrer une Licence ou un Master en français",
      "Professionnels internationaux désirant maîtriser le français des affaires et les techniques de gestion",
    ],
    scheduleInfo: {
      duration: "10 mois (Octobre à Juillet) – Volume horaire : 600 heures",
      hours: "08h00 – 17h00",
      days: "Du lundi au vendredi",
    },
    tuitionTable: [
      {
        level: "Année Préparatoire PRÉSUP (600h)",
        registration: "150 000 FCFA",
        monthly: "50 000 FCFA / mois",
        notes: "10 mois (Octobre à Juillet)",
      },
    ],
    extraFees: [
      "Uniforme : 50 000 FCFA",
      "Programme : Expression écrite & orale, Orthographe/Grammaire, Compréhension, Conversation + Comptabilité, Mathématiques Générales & Financières, Statistiques, Anglais et Bureautique",
    ],
    dossierRequirements: [
      "Copie certifiée du BAC",
      "Extrait de l’acte de naissance",
      "2 photos d’identité",
      "Copie du passeport",
    ],
    brochureUrl: "/brochures/offre-de-formation-2026-2027.pdf",
  },

  "executive-education": {
    slug: "executive-education",
    title: "Executive Education & Certificats Dirigeants",
    subtitle:
      "Formations exécutives, séminaires de perfectionnement et renforcement de capacités sur-mesure pour les entreprises et institutions.",
    badge: "Cadres, Dirigeants & Organisations",
    description: [
      "La Direction de la Formation Continue et Executive Education d'AFI-L'UE accompagne les entreprises privées, les banques, les collectivités territoriales et les administrations publiques dans la montée en compétences de leurs équipes.",
      "Nos programmes courts, certificats exécutifs et séminaires intra-entreprise couvrent la gouvernance, la finance digitale, l'intelligence artificielle, le management de projet, l'audit juridico-fiscal OHADA et le leadership transformationnel.",
    ],
    targetAudience: [
      "Directeurs généraux, chefs de département et cadres supérieurs",
      "Directions des Ressources Humaines souhaitant déployer un plan de formation sur-mesure",
      "Administrations publiques, ONG et collectivités territoriales",
    ],
    scheduleInfo: {
      duration: "Séminaires de 3 à 5 jours ou Certificats de 3 à 6 mois",
      hours: "Formats flexibles (Présentiel, Intra-entreprise ou Hybride)",
      days: "Calendrier adapté aux contraintes des organisations",
    },
    tuitionTable: [
      {
        level: "Séminaires & Certificats Executive",
        registration: "Sur devis personnalisé",
        monthly: "Convention entreprise ou inscription individuelle",
        notes: "Catalogue Executive Education disponible auprès de la DFC",
      },
    ],
    extraFees: [
      "Certification officielle AFI-L'UE Executive Education",
      "Supports pédagogiques, études de cas sectorielles et accompagnement post-formation",
    ],
    dossierRequirements: [
      "Curriculum Vitae (CV) à jour",
      "Fiche d'inscription Executive Education ou convention de formation employeur",
      "Copie de la pièce d'identité ou du passeport",
    ],
    brochureUrl: "/brochures/offre-de-formation-2026-2027.pdf",
    filterLevel: "master",
  },
};

interface ProgrammeModalityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProgrammeModalityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = MODALITIES_DATA[slug];
  if (!data) {
    return { title: "Programme | AFI-L'UE" };
  }
  return {
    title: `${data.title} | Programmes AFI-L'UE`,
    description: data.subtitle,
  };
}

export default async function ProgrammeModalityPage({
  params,
}: ProgrammeModalityPageProps) {
  const { slug } = await params;

  if (slug === "presup") {
    return <PresupPageContent />;
  }

  if (slug === "cours-du-weekend") {
    redirect("/cours-du-weekend");
  }

  const data = MODALITIES_DATA[slug];

  if (!data) {
    notFound();
  }

  const sampleFormations = (
    await getFormations(
      data.filterLevel ? { level: data.filterLevel } : undefined
    )
  ).slice(0, 6);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Fil d'Ariane */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#C8232C] transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link
              href="/formations"
              className="hover:text-[#C8232C] transition-colors"
            >
              Programmes
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Minimaliste */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#121A38] to-[#1B2754] text-white py-16 sm:py-24">
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className="fill-white/15 [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{data.badge}</span>
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight max-w-4xl">
            {data.title}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* 3. Contenu Détaillé : Présentation, Organisation, Tarifs 2026-2027 & Dossier */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Présentation & Public Cible */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="border-l-[3px] border-[#C8232C] pl-4">
                <h2 className="font-heading font-black text-xl text-[#191D38] uppercase">
                  Présentation du Dispositif
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {data.description.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-6 sm:p-8 space-y-5">
              <h3 className="font-heading font-extrabold text-base text-[#191D38] uppercase tracking-wide">
                Organisation & Rythme
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#C8232C] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#191D38] block">
                      Durée / Période :
                    </strong>
                    <span>{data.scheduleInfo.duration}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C8232C] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#191D38] block">Horaires :</strong>
                    <span>{data.scheduleInfo.hours}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C8232C] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#191D38] block">Jours :</strong>
                    <span>{data.scheduleInfo.days}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau des Tarifs 2026-2027 */}
          <div className="space-y-5">
            <div className="border-l-[3px] border-[#C8232C] pl-4">
              <h2 className="font-heading font-black text-xl text-[#191D38] uppercase flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#C8232C]" />
                <span>Coût de la Formation (Tarifs 2026-2027)</span>
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#191D38] text-white text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-6 font-bold">Niveau / Parcours</th>
                    <th className="py-3.5 px-6 font-bold">Inscription</th>
                    <th className="py-3.5 px-6 font-bold">Mensualité</th>
                    <th className="py-3.5 px-6 font-bold">Précisions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                  {data.tuitionTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-4 px-6 font-bold text-[#191D38]">
                        {row.level}
                      </td>
                      <td className="py-4 px-6 font-semibold">
                        {row.registration}
                      </td>
                      <td className="py-4 px-6 font-bold text-[#C8232C]">
                        {row.monthly}
                      </td>
                      <td className="py-4 px-6 text-slate-500">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              {data.extraFees.map((fee, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 font-medium"
                >
                  {fee}
                </span>
              ))}
            </div>
          </div>

          {/* Pièces à fournir & Actions */}
          <div className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-8 sm:p-10 space-y-6">
            <h3 className="font-heading font-black text-lg sm:text-xl text-[#191D38] uppercase">
              Constitution du Dossier d&apos;Inscription
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              {data.dossierRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8232C] mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={data.brochureUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#C8232C] border border-slate-200 text-xs sm:text-sm font-bold shadow-xs transition-all text-center"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Télécharger la fiche tarifaire 2026-2027 (PDF)</span>
              </a>

              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#C8232C] hover:bg-[#a61b23] text-white text-xs sm:text-sm font-bold shadow-xs transition-all text-center"
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>Démarrer la demande de candidature</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Aperçu des filières éligibles */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#191D38]">
                Filières proposées dans ce programme
              </h3>
              <Link
                href="/formations"
                className="text-xs sm:text-sm font-bold text-[#C8232C] hover:underline inline-flex items-center gap-1"
              >
                <span>Voir les 37 formations</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {sampleFormations.map((f) => (
                <div key={f.id} className="h-full flex flex-col">
                  <FormationCard formation={f} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

