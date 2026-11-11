import {
  Domain,
  Formation,
  DomainHierarchy,
  Accreditation,
} from "@/types/database";
import {
  LICENCES_DETAILED_CONTENT,
  LICENCE_TUITION_TIERS,
  LICENCE_EXTRA_FEES,
  DEFAULT_INTERNATIONAL_LEADER_INFO,
} from "./programme-details-licences";
import {
  MASTERS_DETAILED_CONTENT,
  MASTER_TUITION_TIERS,
  MASTER_EXTRA_FEES,
} from "./programme-details-masters";

export const PROGRAMME_ACCREDITATIONS: Accreditation[] = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    name: "CAMES",
    code: "CAMES",
    organization: "Conseil Africain et Malgache pour l'Enseignement Supérieur",
    logo_url: "/images/partners/cames.png",
    description:
      "Reconnaissance et équivalence internationale des diplômes dans 19 pays membres.",
    order_index: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    name: "ANAQ-Sup",
    code: "ANAQ_SUP",
    organization:
      "Autorité Nationale d'Assurance Qualité de l'Enseignement Supérieur (Sénégal)",
    logo_url: "/images/partners/anaq-sup.png",
    description:
      "Habilitation institutionnelle et accréditation des filières délivrées par l'État du Sénégal.",
    order_index: 2,
    created_at: new Date().toISOString(),
  },
];

interface RawFormationSeed {
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  objectives?: string;
  curriculum?: string;
  career_opportunities?: string;
  admission_requirements?: string;
  is_featured?: boolean;
  cames?: boolean;
}

interface RawDomainSeed {
  id: string;
  code: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  order_index: number;
  mentions: {
    licences: RawFormationSeed[];
    masters: RawFormationSeed[];
  };
}

/**
 * Arborescence officielle :
 * Programme AFI-L'UE -> Domaines (4) -> Mentions (Licences / Masters) -> Formations
 */
export const PROGRAMME_TREE_SEED: RawDomainSeed[] = [
  // =========================================================================
  // 1. SCIENCES ÉCONOMIQUES ET GESTION (SEG)
  // =========================================================================
  {
    id: "22222222-2222-2222-2222-222222222201",
    code: "SEG",
    name: "Sciences Économiques et Gestion",
    slug: "sciences-economiques-et-de-gestion",
    short_description:
      "Banque, Finance, Audit, Comptabilité, Ressources Humaines, Marketing Digital, Logistique et Management.",
    description:
      "Pôle d'excellence formant les futurs dirigeants, auditeurs, gestionnaires, analystes financiers et managers de l'espace UEMOA et à l'international.",
    icon: "BarChart3",
    order_index: 1,
    mentions: {
      licences: [
        {
          title: "Licence Banque Assurance Finance",
          slug: "licence-banque-assurance-finance",
          short_description:
            "Formation diplômante pour intégrer les institutions bancaires, compagnies d'assurance et marchés financiers.",
          is_featured: true,
          cames: true,
        },
        {
          title: "Licence Gestion des Ressources Humaines",
          slug: "licence-gestion-des-ressources-humaines",
          short_description:
            "Administration du personnel, gestion prévisionnelle des emplois, marque employeur et dialogue social.",
          is_featured: true,
          cames: true,
        },
        {
          title: "Licence Gestion Financière, Fiscale et Comptable des Entreprises",
          slug: "licence-gestion-financiere-fiscale-et-comptable-des-entreprises",
          short_description:
            "Maîtrise des normes SYSCOHADA, comptabilité approfondie, fiscalité d'entreprise et analyse financière.",
          cames: true,
        },
        {
          title: "Licence Gestion Financière et Administrative des Entreprises",
          slug: "licence-gestion-financiere-et-administrative-des-entreprises",
          short_description:
            "Pilotage administratif, gestion budgétaire, trésorerie et organisation interne des entreprises.",
        },
        {
          title: "Licence Marketing Management et Communication Digitale",
          slug: "licence-marketing-management-et-communication-digitale",
          short_description:
            "Stratégie de marque, communication 360°, marketing digital et comportement du consommateur.",
          is_featured: true,
        },
        {
          title: "Licence Management des Affaires Internationales",
          slug: "licence-management-des-affaires-internationales",
          short_description:
            "Commerce international, import-export, géopolitique économique et négociation multiculturelle.",
        },
        {
          title: "Licence Transport et Logistique",
          slug: "licence-transport-et-logistique",
          short_description:
            "Gestion des flux de transport multimodal, transit douanier, entreposage et chaîne d'approvisionnement.",
          cames: true,
        },
        {
          title: "Licence Qualité Hygiène Sécurité et Environnement",
          slug: "licence-qualite-hygiene-securite-et-environnement",
          short_description:
            "Management de la qualité ISO, prévention des risques professionnels et conformité environnementale.",
        },
        {
          title: "Licence Langues Étrangères Appliquées à la Gestion des Entreprises",
          slug: "licence-langues-etrangeres-appliquees-a-la-gestion-des-entreprises",
          short_description:
            "Maîtrise des langues d'affaires internationales combinée aux fondamentaux du management et du commerce.",
        },
      ],
      masters: [
        {
          title: "Master Audit et Contrôle de Gestion",
          slug: "master-audit-et-controle-de-gestion",
          short_description:
            "Pilotage de la performance, audit financier et opérationnel, normes IFRS et contrôle budgétaire stratégique.",
          is_featured: true,
          cames: true,
        },
        {
          title: "Master Gestion Financière, Fiscale et Comptable des Entreprises",
          slug: "master-gestion-financiere-fiscale-et-comptable-des-entreprises",
          short_description:
            "Direction administrative et financière, ingénierie comptable, optimisation fiscale et consolidation.",
          cames: true,
        },
        {
          title: "Master Ingénierie Financière",
          slug: "master-ingenierie-financiere",
          short_description:
            "Évaluation d'entreprises, fusions-acquisitions, structuration de financements et capital-investissement.",
          cames: true,
        },
        {
          title: "Master Finance Internationale et Marchés Boursiers",
          slug: "master-finance-internationale-et-marches-boursiers",
          short_description:
            "Gestion de portefeuille, marchés des capitaux internationaux (BRVM), produits dérivés et gestion des risques.",
        },
        {
          title: "Master Banque Privée Internationale",
          slug: "master-banque-privee-internationale",
          short_description:
            "Gestion de patrimoine, ingénierie patrimoniale internationale et conseil financier haut de gamme.",
        },
        {
          title: "Master Management des Ressources Humaines",
          slug: "master-management-des-ressources-humaines",
          short_description:
            "Stratégie RH, transformation digitale des organisations, leadership et pilotage de la performance sociale.",
          cames: true,
        },
        {
          title: "Master Marketing Management et Communication Digitale",
          slug: "master-marketing-management-et-communication-digitale",
          short_description:
            "Direction marketing, stratégies digitales omnicanales, brand content et data marketing.",
        },
        {
          title: "Master Stratégie Managériale à l'Internationale",
          slug: "master-strategie-manageriale-a-linternationale",
          short_description:
            "Développement international des entreprises, gouvernance globale et management interculturel.",
          is_featured: true,
        },
        {
          title: "Master Supply Chain Management",
          slug: "master-supply-chain-management",
          short_description:
            "Management global de la chaîne logistique, achats internationaux et pilotage des flux industriels.",
          is_featured: true,
          cames: true,
        },
        {
          title: "Master Logistique et Management Portuaire",
          slug: "master-logistique-et-management-portuaire",
          short_description:
            "Exploitation portuaire et maritime, consignation, transit international et gestion des terminaux.",
        },
        {
          title: "Master Management de Projet",
          slug: "master-management-de-projet",
          short_description:
            "Conduite de projets complexes, méthodologies agiles et PMI/PMP, planification et suivi-évaluation.",
          cames: true,
        },
        {
          title: "Master Management des Organisations Sanitaires et Sociales",
          slug: "master-management-des-organisations-sanitaires-et-sociales",
          short_description:
            "Gouvernance hospitalière, gestion des établissements de santé et pilotage des politiques médico-sociales.",
        },
        {
          title: "Master Management de la Qualité, Hygiène, Sécurité et Environnement",
          slug: "master-management-de-la-qualite-hygiene-securite-et-environnement",
          short_description:
            "Direction QHSE, systèmes de management intégrés (ISO 9001, 14001, 45001), audit et RSE.",
        },
        {
          title: "Master Management Public et Innovation Territoriale",
          slug: "master-management-public-et-innovation-territoriale",
          short_description:
            "Modernisation de l'action publique, gouvernance locale, finances publiques et développement territorial.",
        },
        {
          title: "Master Business Intelligence et Stratégie Commerciale",
          slug: "master-business-intelligence-et-strategie-commerciale",
          short_description:
            "Analyse décisionnelle, intelligence économique, pilotage de la force de vente et stratégie commerciale.",
        },
      ],
    },
  },

  // =========================================================================
  // 2. SCIENCES JURIDIQUES, POLITIQUES ET DE L'ADMINISTRATION (SJPA)
  // =========================================================================
  {
    id: "22222222-2222-2222-2222-222222222203",
    code: "SJPA",
    name: "Sciences Juridiques, Politiques et de l'Administration",
    slug: "sciences-juridiques-politiques-et-de-ladministration",
    short_description:
      "Management Juridique et Fiscal, Ingénierie Juridique, Audit Juridique et Droit des Affaires OHADA.",
    description:
      "Formations juridiques orientées pratique contentieuse de l'entreprise, gouvernance d'affaires et conformité fiscale et réglementaire dans l'espace OHADA.",
    icon: "Scale",
    order_index: 2,
    mentions: {
      licences: [
        {
          title: "Licence Management Juridique et Fiscal",
          slug: "licence-management-juridique-et-fiscal",
          short_description:
            "Sécurisation des actes contractuels, droit des sociétés OHADA, droit social et fiscalité des entreprises.",
          is_featured: true,
        },
      ],
      masters: [
        {
          title: "Master Ingénierie Juridique et Fiscale",
          slug: "master-ingenierie-juridique-et-fiscale",
          short_description:
            "Structuration juridique d'opérations complexes, montages fiscaux internationaux et conseil d'entreprise.",
          is_featured: true,
          cames: true,
        },
        {
          title: "Master Audit Juridique et Fiscal",
          slug: "master-audit-juridique-et-fiscal",
          short_description:
            "Cartographie des risques juridiques et fiscaux, conformité réglementaire, due diligence et contentieux.",
        },
      ],
    },
  },

  // =========================================================================
  // 3. SCIENCES ET TECHNOLOGIES (ST)
  // =========================================================================
  {
    id: "22222222-2222-2222-2222-222222222202",
    code: "ST",
    name: "Sciences et Technologies",
    slug: "sciences-et-technologies",
    short_description:
      "Génie Logiciel, Systèmes & Réseaux, Développement Web, Intelligence Artificielle, Big Data et Finance Digitale.",
    description:
      "Cursus axés sur l'innovation technologique, la transformation numérique des organisations et l'ingénierie des systèmes informatiques et intelligents.",
    icon: "Cpu",
    order_index: 3,
    mentions: {
      licences: [
        {
          title: "Licence Génie Logiciel",
          slug: "licence-genie-logiciel",
          short_description:
            "Conception, développement et architecture d'applications web, mobiles et distribuées.",
          is_featured: true,
          cames: true,
        },
        {
          title: "Licence Système, Réseau et Télécommunication",
          slug: "licence-systeme-reseau-et-telecommunication",
          short_description:
            "Administration des infrastructures réseaux, télécommunications, virtualisation et sécurité des systèmes.",
          cames: true,
        },
        {
          title: "Licence Développement Web et Marketing Digital",
          slug: "licence-developpement-web-et-marketing-digital",
          short_description:
            "Création de plateformes web full-stack, UX/UI design, référencement SEO et stratégies d'acquisition digitale.",
        },
        {
          title: "Licence Intelligence Artificielle et Big Data",
          slug: "licence-intelligence-artificielle-et-big-data",
          short_description:
            "Apprentissage automatique, traitement massif de données et conception d'applications intelligentes.",
          is_featured: true,
        },
      ],
      masters: [
        {
          title: "Master Génie Logiciel",
          slug: "master-genie-logiciel",
          short_description:
            "Architecture logicielle distribuée, Cloud Computing, DevSecOps et direction de projets informatiques.",
          is_featured: true,
          cames: true,
        },
        {
          title: "Master Système, Réseau et Télécommunication",
          slug: "master-systeme-reseau-et-telecommunication",
          short_description:
            "Ingénierie des réseaux très haut débit, cybersécurité avancée, infrastructures Cloud et télécoms.",
          cames: true,
        },
        {
          title: "Master Ingénierie du Web et E-communication",
          slug: "master-ingenierie-du-web-et-e-communication",
          short_description:
            "Architectures web modernes, écosystèmes e-commerce, communication numérique et transformation digitale.",
        },
        {
          title: "Master Intelligence Artificielle",
          slug: "master-intelligence-artificielle",
          short_description:
            "Deep Learning, modèles génératifs, vision par ordinateur, NLP et déploiement MLOps en entreprise.",
          is_featured: true,
        },
        {
          title: "Master Finance Digitale",
          slug: "master-finance-digitale",
          short_description:
            "Technologies FinTech, services financiers numériques, blockchain, data analytics et inclusion financière.",
        },
      ],
    },
  },

  // =========================================================================
  // 4. SCIENCES DE L'HOMME ET DE LA SOCIÉTÉ (SHS)
  // =========================================================================
  {
    id: "22222222-2222-2222-2222-222222222204",
    code: "SHS",
    name: "Sciences de l'Homme et de la Société",
    slug: "sciences-de-lhomme-et-de-la-societe",
    short_description:
      "Langues Étrangères Appliquées à la Gestion des Entreprises, Communication et Dynamiques des Organisations.",
    description:
      "Développement des compétences linguistiques internationales, négociation interculturelle et gestion des entreprises dans un environnement globalisé.",
    icon: "Users",
    order_index: 4,
    mentions: {
      licences: [],
      masters: [
        {
          title: "Master Langues Étrangères Appliquées à la Gestion des Entreprises",
          slug: "master-langues-etrangeres-appliquees-a-la-gestion-des-entreprises",
          short_description:
            "Management international trilingue, commerce transfrontalier, traduction spécialisée et gestion d'entreprise.",
          is_featured: true,
        },
      ],
    },
  },
];

const nowIso = new Date().toISOString();

function buildFormationRecord(
  raw: RawFormationSeed,
  domain: Domain,
  level: "licence" | "master",
  orderIndex: number
): Formation {
  const isLicence = level === "licence";
  const detailed = isLicence
    ? LICENCES_DETAILED_CONTENT[raw.slug]
    : MASTERS_DETAILED_CONTENT[raw.slug];

  const isCames = Boolean(detailed?.cames ?? raw.cames);

  return {
    id: `55555555-5555-5555-5555-${String(orderIndex).padStart(12, "0")}`,
    department_id: null,
    domain_id: domain.id,
    title: raw.title,
    slug: raw.slug,
    level,
    mention:
      detailed?.mention ||
      raw.title.replace(/^(Licence|Master)\s+/i, "").toUpperCase(),
    specialty: detailed?.specialty || null,
    domaine: domain.name.toUpperCase(),
    grade: isLicence ? "LICENCE" : "MASTER",
    duration_years: isLicence ? 3 : 2,
    duration_label: isLicence
      ? "3 ans (6 semestres – 180 crédits ECTS)"
      : "2 ans (4 semestres – 120 crédits ECTS)",
    credits_ects: isLicence ? 180 : 120,
    short_description:
      raw.short_description ||
      detailed?.description ||
      `Formation d'excellence en ${raw.title} dispensée au sein du pôle ${domain.name} d'AFI-L'UE.`,
    description:
      detailed?.description ||
      raw.description ||
      raw.short_description ||
      `Le programme ${raw.title} d'AFI-L'Université de l'Entreprise forme des professionnels immédiatement opérationnels dans le domaine ${domain.name}.`,
    objectives:
      detailed?.objectives ||
      raw.objectives ||
      detailed?.description ||
      "Acquérir les compétences théoriques, méthodologiques et pratiques répondant aux exigences des entreprises et organisations nationales et internationales.",
    curriculum:
      raw.curriculum ||
      (detailed?.program_blocks
        ? detailed.program_blocks
            .map((b) => `${b.title} : ${b.items.join(", ")}`)
            .join("\n\n")
        : isLicence
          ? "Parcours structuré en 6 semestres (180 crédits ECTS) combinant enseignements fondamentaux, spécialisation métier, projets tutorés et stage professionnel."
          : "Parcours structuré en 4 semestres (120 crédits ECTS) combinant séminaires d'expertise, études de cas réels, mémoire professionnel et soutenance."),
    program_blocks: detailed?.program_blocks || [],
    career_opportunities:
      detailed?.career_opportunities_list?.join(", ") ||
      raw.career_opportunities ||
      `Cadres et spécialistes de haut niveau dans les métiers liés à la mention ${raw.title.replace(/^(Licence|Master)\s+/i, "")}.`,
    career_opportunities_list: detailed?.career_opportunities_list || [],
    admission_requirements:
      detailed?.admission_conditions_list?.join(" ") ||
      raw.admission_requirements ||
      (isLicence
        ? "Baccalauréat toutes séries éligibles. Admission sur étude du dossier académique et entretien."
        : "Titulaire d'une Licence (BAC+3) ou diplôme équivalent reconnu. Sélection sur dossier et entretien devant le jury pédagogique."),
    admission_conditions_list: detailed?.admission_conditions_list || [],
    tuition_fees_local: isLicence ? 920000 : 1130000,
    tuition_fees_international: isLicence ? 1120000 : 1130000,
    tuition_summary: isLicence
      ? "Inscription : 170 000 FCFA • Mensualité : dès 70 000 FCFA (Soir) / 75 000 à 85 000 FCFA (Multiprogramme) / 95 000 FCFA (International Leader)"
      : "Inscription : 180 000 FCFA • Mensualité : 95 000 FCFA / mois (Soir & Week-end) • E-Learning : 200 000 FCFA + 100 000 FCFA / mois",
    tuition_tiers: isLicence ? LICENCE_TUITION_TIERS : MASTER_TUITION_TIERS,
    extra_fees: isLicence ? LICENCE_EXTRA_FEES : MASTER_EXTRA_FEES,
    study_modes: isLicence
      ? ["initiale", "cours_du_soir", "weekend", "e_learning"]
      : ["cours_du_soir", "weekend", "e_learning"],
    brochure_url: `/brochures/${raw.slug}.pdf`,
    image_url: `/images/formations/${raw.slug}.jpg`,
    international_leader: detailed?.international_leader
      ? DEFAULT_INTERNATIONAL_LEADER_INFO
      : null,
    is_featured: Boolean(raw.is_featured),
    is_active: true,
    order_index: orderIndex,
    meta_title: `${raw.title} | ${domain.name} | AFI-L'UE`,
    meta_description:
      raw.short_description ||
      detailed?.description?.slice(0, 160) ||
      `Découvrez la formation ${raw.title} à AFI-L'Université de l'Entreprise.`,
    legacy_wp_id: null,
    legacy_wp_url: null,
    created_at: nowIso,
    updated_at: nowIso,
    domain,
    department: null,
    accreditations: isCames
      ? [PROGRAMME_ACCREDITATIONS[0], PROGRAMME_ACCREDITATIONS[1]]
      : [PROGRAMME_ACCREDITATIONS[1]],
  };
}

let globalOrderCounter = 1;

export const PROGRAMME_HIERARCHY: DomainHierarchy[] = PROGRAMME_TREE_SEED.map(
  (d) => {
    const licencesCount = d.mentions.licences.length;
    const mastersCount = d.mentions.masters.length;
    const baseDomain: Domain = {
      id: d.id,
      code: d.code,
      name: d.name,
      slug: d.slug,
      short_description: d.short_description,
      description: d.description,
      icon: d.icon,
      banner_url: null,
      order_index: d.order_index,
      is_active: true,
      formations_count: licencesCount + mastersCount,
      licences_count: licencesCount,
      masters_count: mastersCount,
      created_at: nowIso,
      updated_at: nowIso,
    };

    const licences = d.mentions.licences.map((raw) =>
      buildFormationRecord(raw, baseDomain, "licence", globalOrderCounter++)
    );
    const masters = d.mentions.masters.map((raw) =>
      buildFormationRecord(raw, baseDomain, "master", globalOrderCounter++)
    );

    return {
      ...baseDomain,
      mentions: {
        licences,
        masters,
      },
    };
  }
);

export const ALL_DOMAINS: Domain[] = PROGRAMME_HIERARCHY.map(
  ({ mentions: _mentions, ...domain }) => domain
);

export const ALL_FORMATIONS: Formation[] = PROGRAMME_HIERARCHY.flatMap((d) => [
  ...d.mentions.licences,
  ...d.mentions.masters,
]);

