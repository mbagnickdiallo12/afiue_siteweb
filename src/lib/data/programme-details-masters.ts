import { TuitionTier } from "@/types/database";
import { DetailedFormationContent } from "./programme-details-licences";

export const MASTER_TUITION_TIERS: TuitionTier[] = [
  {
    label: "Master 1 & Master 2 – Cours du Soir (Présentiel)",
    registration_fee: "180 000 FCFA",
    monthly_fee: "95 000 FCFA / mois",
    duration_months: "10 mois (Novembre – Août)",
    schedule: "17h30 – 20h45",
  },
  {
    label: "Master 1 & Master 2 – Cours du Week-end",
    registration_fee: "180 000 FCFA",
    monthly_fee: "95 000 FCFA / mois",
    duration_months: "09 mois (Janvier – Septembre)",
    schedule: "Samedi & Dimanche (09h00 – 17h00)",
  },
  {
    label: "Master 1 & Master 2 – E-Learning (100% en ligne)",
    registration_fee: "200 000 FCFA",
    monthly_fee: "100 000 FCFA / mois",
    duration_months: "09 mois (Janvier – Septembre)",
    schedule: "18h00 – 20h00",
  },
];

export const MASTER_EXTRA_FEES: string[] = [
  "Bibliothèque numérique (annuelle) : 10 000 FCFA",
  "Frais de mémoire M2 : 100 000 FCFA",
  "Graduation M2 : 70 000 FCFA",
];

export const MASTERS_DETAILED_CONTENT: Record<string, DetailedFormationContent> = {
  "master-audit-et-controle-de-gestion": {
    mention: "GESTION ET STRATÉGIE D’ENTREPRISE – GSE",
    specialty: "AUDIT ET CONTRÔLE DE GESTION – ACG",
    description:
      "Le Master Audit et Contrôle de Gestion – ACG permet d’acquérir en deux années académiques une formation spécialisée en comptabilité, finance, fiscalité, audit et contrôle de gestion. Il s’agit d’une formation de référence, construite en lien étroit avec les attentes des entreprises et organisations. En outre, le Master ACG permet également aux apprenants d’avoir une vision globale de l'entreprise, de la rigueur, de l'autonomie et le sens de l'initiative grâce à des modules supports tels que le développement personnel et professionnel, le management et l'organisation des entreprises et la gestion de projet.",
    career_opportunities_list: [
      "Auditeur interne / externe",
      "Expert-comptable (stagiaire / mémorialiste)",
      "Commissaire aux comptes",
      "Contrôleur de gestion",
      "Responsable des services comptables et financiers",
      "Responsable de comptabilité des groupes",
      "Analyste financier",
      "Chef comptable",
    ],
    admission_conditions_list: [
      "Ouvert aux étudiants titulaires d’une Licence en Gestion et Stratégie d’Entreprises, en Comptabilité, en Finance, en Économie ou tout autre diplôme de niveau BAC+3 admis en équivalence.",
      "Également accessible aux professionnels évoluant dans le domaine de la gestion, de la comptabilité, de la finance, du contrôle et de l’audit.",
      "Les candidats doivent au préalable remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière & Comptabilité bancaire",
          "Techniques fiscales & Fiscalité approfondie",
          "Les règles d’évaluation comptable et financière",
          "Les obligations fiscales et sociales de l'entreprise",
          "Taxe sur les activités financières",
          "L’enregistrement comptable des capitaux permanents",
          "Les opérations de fusion et les comptes consolidés",
          "L’incitation à l’investissement",
          "L’entreprise et l’administration fiscale",
          "Information comptable et management financier",
          "Normes comptables internationales IAS / IFRS",
        ],
      },
      {
        title: "Contrôle de gestion",
        items: [
          "Introduction à l’étude du contrôle de gestion",
          "L’organisation et les coûts",
          "La pertinence des méthodes d’évaluation et d’analyse des coûts",
          "Méthode des coûts préétablis",
          "Organisation et budgets",
          "Amélioration de la performance de l’entreprise",
          "Contrôle interne",
          "Le pilotage de la performance structurelle de l'entreprise",
          "Éthique de la profession comptable et contrôle interne",
        ],
      },
      {
        title: "Audit",
        items: [
          "Cadre conceptuel et spécificités de l'audit",
          "Audit légal",
          "Déroulement de la mission d'audit",
          "Examen limité et autres interventions définies",
          "Pratique de la mise en place des procédures, de l'audit financier et comptable",
        ],
      },
      {
        title: "Management des systèmes d’information",
        items: [
          "Concept SI et modélisation",
          "Conception et mise en œuvre d’un SI",
          "Systèmes décisionnels",
          "Gouvernance des systèmes d’information",
        ],
      },
      {
        title: "Système d’information financier et bancaire",
        items: [
          "La valeur & Diagnostic financier",
          "Politique d’investissement et de financement",
          "Gestion de la trésorerie",
          "Diagnostic financier approfondi",
          "Économétrie : EVIEWS",
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière & Évaluation d’entreprise",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Management et organisation des entreprises, Stratégie d’entreprise & Gestion de projet",
          "Anglais, Art oratoire & Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation & Méthodologie de recherche",
          "Projet de création d'entreprise, Études de cas de synthèse & Visites d’entreprise",
          "Stage & Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-gestion-financiere-fiscale-et-comptable-des-entreprises": {
    mention: "GESTION ET STRATÉGIE D’ENTREPRISE – GSE",
    specialty: "GESTION FINANCIÈRE, FISCALE ET COMPTABLE DES ENTREPRISES – GFCE",
    description:
      "Le Master GSE – Spécialité Gestion Financière, Fiscale et Comptable des Entreprises permet, en deux années académiques, d’acquérir une formation spécialisée. Il favorise l'acquisition de savoirs, de savoir-faire et de savoir-être indispensables à la gestion d’entreprises et à la stratégie financière pour l’accès à des postes à responsabilité dans des entreprises, des banques et cabinets privés ou publics. Il permet également d’avoir une vision globale de l'entreprise, de la rigueur, de l'autonomie et du sens de l'initiative.",
    career_opportunities_list: [
      "Responsable administratif et financier",
      "Directeur financier",
      "Chef comptable",
      "Chef d’entreprise",
      "Cadre financier",
      "Gestionnaire de Patrimoine",
      "Conseiller / Conseillère en Gestion Banque privée",
      "Conseiller / Conseillère en gestion de capitaux",
      "Conseiller fiscaliste",
      "Consultant en fusions et acquisitions",
      "Commissaire aux comptes",
      "Gestionnaire de paie",
      "Analyste financier",
      "Conseiller en investissements financiers",
      "Gestionnaire d'actifs",
      "Analyste quantitatif en finance",
      "Trésorier d’entreprise",
    ],
    admission_conditions_list: [
      "Ouvert aux étudiants titulaires d’une Licence en Gestion et Stratégie d’Entreprise, en Comptabilité, en Finance, en Économie ou tout autre diplôme de niveau BAC+3 admis en équivalence.",
      "Accessible aux professionnels évoluant dans le domaine de la gestion, de la comptabilité, de la finance, du contrôle et de l’audit.",
      "Dépôt d'un dossier de candidature et entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière & Comptabilité bancaire",
          "Techniques fiscales & Fiscalité approfondie",
          "Les règles d’évaluation comptable et financière",
          "Les obligations fiscales et sociales de l'entreprise",
          "Taxe sur les activités financières",
          "L’enregistrement comptable des capitaux permanents",
          "Les opérations de fusion et les comptes consolidés",
          "L’incitation à l’investissement",
          "L’entreprise et l’administration fiscale",
          "Information comptable et management financier",
          "Normes comptables internationales IAS / IFRS",
        ],
      },
      {
        title: "Contrôle",
        items: [
          "Introduction à l’étude du contrôle de gestion",
          "L’organisation et les coûts",
          "La pertinence des méthodes d’évaluation et d’analyse des coûts",
          "Méthode des coûts préétablis",
          "Organisation et budgets",
          "Amélioration de la performance de l’entreprise",
          "Contrôle interne & Techniques de contrôle approfondies",
          "Le pilotage de la performance structurelle de l'entreprise",
          "Éthique de la profession comptable et contrôle interne",
          "Examen limité et autres interventions définies",
        ],
      },
      {
        title: "Système d’information financier et bancaire",
        items: [
          "La valeur & Diagnostic financier",
          "Politique d’investissement et de financement",
          "Gestion de la trésorerie",
          "Diagnostic financier approfondi",
          "Économétrie : EVIEWS",
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière & Évaluation d’entreprise",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Management et organisation des entreprises, Stratégie d’entreprise & Gestion de projet",
          "Anglais, Art oratoire & Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation & Méthodologie de recherche",
          "Projet de création d'entreprise, Études de cas de synthèse & Visites d’entreprise",
          "Stage & Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-ingenierie-financiere": {
    mention: "BANQUE ASSURANCE FINANCE – BAF",
    specialty: "INGÉNIERIE FINANCIÈRE – IF",
    description:
      "Le programme de Master en Banque Assurance Finance – BAF, spécialité Ingénierie Financière permet, en deux années académiques, de préparer les apprenants à la maîtrise des techniques, méthodes et outils de la Banque et de la Finance : piloter le système de reporting et d’analyse des risques financiers, construire des mécanismes de financement à court et moyen terme, réaliser l’évaluation financière d’un projet d’investissement à long terme, assurer la gestion de portefeuilles d’actifs financiers et élaborer une stratégie de financement à long terme.",
    career_opportunities_list: [
      "Chargé de clientèle particuliers / entreprises",
      "Gestionnaire de caisse dans une banque",
      "Conseiller en patrimoine",
      "Analyste financier",
      "Comptable bancaire",
      "Directeur administratif et financier",
      "Opérateur de marché",
      "Concepteur et conseiller en opérations et produits financiers",
      "Spécialiste des opérations bancaires",
      "Credit manager",
      "Chargé d'Affaires en Capital d’Investissement",
      "Analyste Risques de Crédit",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d’une Licence en Banque Assurance et Finance, Finance et Comptabilité, Économie et gestion, Mathématiques, Économétrie et Statistique, Économie Appliquée à la Finance ou tout autre diplôme admis en équivalence.",
      "Également ouvert aux professionnels de la Banque, de la Finance et de l’Assurance.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière & Comptabilité bancaire",
          "Techniques fiscales & Fiscalité approfondie",
          "L’incitation à l’investissement",
          "L’entreprise et l’administration fiscale",
          "Fiscalité internationale",
          "Taxe sur les activités financières",
          "Audit et contrôle interne",
        ],
      },
      {
        title: "Système d’information financier et bancaire",
        items: [
          "La valeur & Diagnostic financier",
          "Politique d'investissement et de financement",
          "Gestion de la trésorerie",
          "VBA appliqué à la finance",
          "Finance islamique",
          "Diagnostic financier approfondi",
          "Économétrie : EVIEWS",
        ],
      },
      {
        title: "Ingénierie financière et management des risques",
        items: [
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière",
          "Évaluation d’entreprise & Analyse financière",
          "Stratégie financière à court et long terme",
          "Gestion de portefeuille & Gestion obligataire",
          "Management des risques : la valeur, le temps et le risque",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse économique, Analyse quantitative & Éthique des affaires",
          "Management et organisation des entreprises, Stratégie d’entreprise & Gestion de projet",
          "Anglais, Art oratoire & Développement personnel et professionnel",
          "Culture entrepreneuriale et innovation & Méthodologie de recherche",
          "Projet de création d'entreprise, Études de cas de synthèse, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-finance-internationale-et-marches-boursiers": {
    mention: "BANQUE ASSURANCE FINANCE – BAF",
    specialty: "FINANCE INTERNATIONALE ET MARCHÉS BOURSIERS – FIMB",
    description:
      "Le programme de Master en Banque Assurance Finance – BAF, spécialité Finance Internationale et Marchés Boursiers permet, en deux années académiques, de préparer les apprenants à la maîtrise des techniques, méthodes et outils permettant de devenir expert dans tous les métiers liés aux investissements sur les marchés financiers. Il est destiné particulièrement aux cadres qui projettent de travailler dans les sociétés de gestion et d’intermédiation (SGI), les banques d’investissement, les marchés financiers, la gestion du risque et le capital-risque.",
    career_opportunities_list: [
      "Conseiller en patrimoine",
      "Analyste financier",
      "Trésorier",
      "Responsable administratif et financier",
      "Trader",
      "Gestionnaire de Portefeuille",
      "Conseiller en investissement",
      "Technicien des opérations bancaires",
      "Gestionnaire de fonds",
      "Conseiller banque à distance",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d’une Licence en Banque Assurance et Finance, Finance et Comptabilité, Économie et gestion, Mathématiques, Économétrie et Statistiques ou équivalent.",
      "Également ouvert aux professionnels de la Banque, de la Finance et de l’Assurance.",
      "Dépôt d'un dossier de candidature et entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Bourse et finance de marchés",
        items: [
          "Marché monétaire",
          "Marché des actions et des obligations",
          "Simulation boursière (salle des marchés dédiée)",
          "Les marchés internationaux des capitaux",
          "Les structures et intervenants à la bourse",
          "Le fonctionnement du marché",
          "Gestion de portefeuille & Gestion obligataire",
          "Investir en bourse",
        ],
      },
      {
        title: "Ingénierie financière et management des risques",
        items: [
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière",
          "Évaluation d’entreprise & Analyse financière",
          "Stratégie financière à court et long terme",
          "Management des risques : la valeur, le temps et le risque",
        ],
      },
      {
        title: "Système d’information financier, comptable et fiscal",
        items: [
          "La valeur, Diagnostic financier & Diagnostic financier approfondi",
          "Politique d'investissement et de financement & Gestion de la trésorerie",
          "VBA appliqué à la finance, Finance islamique & Économétrie (EVIEWS)",
          "Rappel de Comptabilité financière & Comptabilité bancaire",
          "Techniques fiscales, Fiscalité approfondie & Fiscalité internationale",
          "L’incitation à l’investissement & Taxe sur les activités financières",
          "Audit et contrôle interne",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse économique, Analyse quantitative & Éthique des affaires",
          "Management et organisation des entreprises, Stratégie d’entreprise & Gestion de projet",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Projet de création d'entreprise, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-banque-privee-internationale": {
    mention: "BANQUE ASSURANCE FINANCE – BAF",
    specialty: "BANQUE PRIVÉE INTERNATIONALE – BPI",
    description:
      "Les acteurs du marché financier se caractérisent par une offre aussi variée que l’est leur clientèle, particulièrement dans un contexte international. Pour répondre aux exigences de la clientèle de la banque privée, le Master Banque Assurance Finance Spécialité Banque Privée Internationale permet de développer des compétences techniques, commerciales et patrimoniales nécessaires à l'exercice de métiers aux enjeux conséquents.",
    career_opportunities_list: [
      "Chargé de clientèle particuliers / entreprises",
      "Gestionnaire de caisse dans une banque",
      "Responsable service commercial",
      "Technicien des opérations bancaires",
      "Conseiller banque à distance",
      "Responsable d'unité commerciale",
      "Conseiller en patrimoine / Banquier privé",
      "Analyste financier",
      "Comptable bancaire",
      "Responsable administratif et financier",
      "Responsable comptable",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d’une Licence en Banque Assurance et Finance, Finance et Comptabilité, Économie et gestion, Mathématiques, Économétrie et Statistique ou équivalent.",
      "Également ouvert aux professionnels de la Banque, de la Finance et de l’Assurance.",
      "Dépôt d'un dossier de candidature et entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Banque : Outils de gestion & Patrimoine",
        items: [
          "Gestion de la relation client",
          "Analyse et gestion des actifs financiers",
          "Analyse technique",
          "Gestion de patrimoine",
        ],
      },
      {
        title: "Ingénierie financière et management des risques",
        items: [
          "Trésorerie des groupes et gestion des risques financiers",
          "Ingénierie financière",
          "Évaluation d’entreprise & Analyse financière",
          "Stratégie financière à court et long terme",
          "Gestion de portefeuille & Gestion obligataire",
          "Management des risques : la valeur, le temps et le risque",
        ],
      },
      {
        title: "Système d’information financier, comptable et fiscal",
        items: [
          "La valeur, Diagnostic financier & Diagnostic financier approfondi",
          "Politique d'investissement et de financement & Gestion de la trésorerie",
          "VBA appliqué à la finance, Finance islamique & Économétrie : EVIEWS",
          "Rappel de Comptabilité financière & Comptabilité bancaire",
          "Techniques fiscales, Fiscalité approfondie & Fiscalité internationale",
          "L’incitation à l’investissement & Taxe sur les activités financières",
          "Audit et contrôle interne",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse économique, Analyse quantitative & Éthique des affaires",
          "Management et organisation des entreprises, Stratégie d’entreprise & Gestion de projet",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Projet de création d'entreprise, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-management-des-ressources-humaines": {
    mention: "MANAGEMENT DES RESSOURCES HUMAINES – MRH",
    description:
      "Le Master MRH permet, en deux années académiques, d’acquérir une formation spécialisée dans tout le processus de la gestion du personnel : du recrutement à l’administration du personnel en passant par la rémunération et la formation. Il favorise l'acquisition de savoirs, de savoir-faire et de savoir-être indispensables pour l'accès à des emplois de direction RH et répond aux nouvelles fonctions du DRH et de son équipe dans les processus stratégiques des organisations.",
    career_opportunities_list: [
      "Directeur des Ressources Humaines (DRH)",
      "Responsable du développement des RH",
      "Responsable de la formation",
      "Responsable du recrutement",
      "Chargé des relations sociales",
      "Chargé de formation",
      "Chargé de recrutement",
      "Chef de projet RH / SIRH",
      "Consultant RH",
    ],
    admission_conditions_list: [
      "Ouvert aux étudiants et professionnels titulaires d’une Licence de GRH, de Droit, de Management ou tout autre diplôme de licence ayant les fondamentaux du droit et/ou de la gestion.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Management des Ressources Humaines",
        items: [
          "Sociologie des organisations",
          "Psychologie du travail et des organisations",
          "Gestion opérationnelle des RH",
          "Management d’équipes et gestion des conflits",
          "Conditions de travail, Bilan social & Audit social",
          "Administration du personnel et politique de rémunération comparée",
          "Gestion des carrières et développement",
          "Ergonomie",
          "Système d’amélioration des performances du personnel (SAPER)",
          "Pratique de la gestion des ressources humaines & SAARI Paie",
        ],
      },
      {
        title: "Stratégie des Ressources Humaines",
        items: [
          "Politique de l’emploi",
          "GPEC approfondie",
          "Gestion stratégique des ressources humaines",
          "GRH et changement organisationnel",
          "Système d’information RH (SIRH)",
          "Gestion de la paie et de la masse salariale",
          "Mobilité internationale",
        ],
      },
      {
        title: "Environnement juridique, Formation & Recrutement",
        items: [
          "Relations individuelles et collectives du travail",
          "Droit du travail et de la sécurité sociale",
          "Instances de représentation du personnel & Santé sécurité au travail",
          "Les obligations fiscales et sociales de l'entreprise",
          "La politique de la formation, Le droit à la formation & Le plan de formation",
          "Gestion du besoin de recrutement, Processus d’embauche et d’intégration & Recrutement en anglais",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse économique, Analyse quantitative & Éthique des affaires",
          "Management et organisation des entreprises, Stratégie d’entreprise & Gestion de projet",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Visites d’entreprise, Projet de création d'entreprise, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-marketing-management-et-communication-digitale": {
    mention: "MARKETING MANAGEMENT ET COMMUNICATION – MMC",
    specialty: "MARKETING ET COMMUNICATION DIGITALE",
    description:
      "Le programme du Master MMC permet, en deux années académiques, d’acquérir une formation spécialisée en marketing et en communication mais aussi en techniques numériques. Il offre aux apprenants toutes les clés pour devenir un relais stratégique entre entreprise et consommateur à l’ère du digital, en combinant le marketing stratégique traditionnel et l'écosystème numérique.",
    career_opportunities_list: [
      "Directeur ou chef de service marketing / communication / commercial",
      "Responsable de la stratégie digitale",
      "Marketing Business Analyst",
      "Social Media Manager",
      "Consultant Search Marketing (SEO / SEA)",
      "Responsable marketing",
      "Chef de produit / secteur",
      "Consultant dans des cabinets de marketing ou de communication",
      "Responsable du merchandising",
      "Chargé de la relation client",
      "Conseiller commercial",
      "Média planneur",
    ],
    admission_conditions_list: [
      "Accessible aux étudiants et professionnels ayant obtenu une Licence en marketing, en communication, en affaires internationales, en informatique ou tout autre diplôme de licence ayant les fondamentaux du marketing, de la communication et/ou de la gestion.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Marketing Management",
        items: [
          "Études et recherche marketing",
          "Marketing mix",
          "Système d'information marketing",
          "La marque",
          "Marketing stratégique",
          "Marketing B to B & Marketing des services",
          "Élaboration et gestion du budget marketing",
          "Management de la force de vente",
          "Droit du marketing & Audit marketing",
        ],
      },
      {
        title: "Communication",
        items: [
          "Structure de la politique globale de communication",
          "La communication média et la communication hors média",
          "Le mix communication",
          "Les tableaux de bord de la communication",
          "La communication de crise",
          "Approche psychosociale du consommateur",
          "La communication globale & Plan de communication",
        ],
      },
      {
        title: "Marketing et communication digitale",
        items: [
          "Marketing digital et E-business",
          "Communication digitale & E-commerce",
          "HTML5 / CSS3 & CMS",
          "Conception d'un site web marchand",
          "Production de contenu multimédia",
          "Web data analytics",
          "Community management et E-réputation",
          "E-strategy & Search engine marketing : SEO, SEA, SMO",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse économique, Analyse quantitative & Éthique des affaires",
          "Management et organisation des entreprises, Comptabilité de gestion, Stratégie & Gestion de projet",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Visites d’entreprise, Projet de création d'entreprise, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-strategie-manageriale-a-linternationale": {
    mention: "MANAGEMENT DES AFFAIRES INTERNATIONALES – MAI",
    specialty: "STRATÉGIE MANAGÉRIALE À L’INTERNATIONAL – SMI",
    description:
      "Le programme du Master MAI – Spécialité Stratégie Managériale à l’International permet l’acquisition de solides connaissances sur l’ensemble des expertises techniques et managériales de la pratique des affaires dans un contexte international en utilisant convenablement la langue des affaires internationales à savoir l’anglais. Il a pour objectif principal de former des cadres capables d’appréhender les nouveaux enjeux liés à la mondialisation des économies, d'anticiper les mutations du marché, de déployer une stratégie et de gérer des équipes à l’international.",
    career_opportunities_list: [
      "Chef de service ou directeur export",
      "Chef de service ou directeur marketing",
      "Chef des services étrangers dans les banques",
      "Consultant dans le développement international des entreprises",
      "Transitaire / Commissionnaire en douane",
      "Responsable achats internationaux",
      "Responsable développement produit à l’international",
      "Chargé d’affaires international",
      "Directeur / Responsable international",
    ],
    admission_conditions_list: [
      "Accessible aux étudiants et professionnels ayant obtenu une Licence et ayant au moins le niveau B1 du CECRL en anglais.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Environnement international & Stratégie de développement",
        items: [
          "Économie internationale & Stratégie d'entreprise",
          "Géopolitique et intelligence économique (en anglais)",
          "Droit international des affaires & Droit des transports",
          "Stratégie de croissance interne & Stratégie de croissance externe",
          "La structure organisationnelle de la multinationale (en anglais)",
          "La gestion commerciale des entreprises internationales (en anglais)",
        ],
      },
      {
        title: "Commerce international",
        items: [
          "La prospection des marchés étrangers",
          "Commerce et finances internationaux",
          "Management des achats à l'international (en anglais)",
          "Management des ventes à l'international (en anglais)",
          "Techniques d'assurance",
          "Négociation internationale (en anglais)",
          "Politique douanière internationale",
        ],
      },
      {
        title: "Supply Chain Management & International Finance",
        items: [
          "Logistique, Supply Chain : le concept & Chaîne et coûts logistiques",
          "Les méthodes d'approvisionnement & Distribution",
          "Transport et logistique internationale",
          "Choix des investissements & Le système monétaire international",
          "Le change, Le système bancaire international & Risques liés aux opérations à l'international",
        ],
      },
      {
        title: "Marketing Management & Digital à l'international",
        items: [
          "Études et recherche marketing, Marketing mix & Système d'information marketing",
          "Géomarketing, CRM & Marketing international",
          "Développement web, Marketing digital et E-Business",
          "Communication digitale, E-commerce & Conception d'un site web marchand",
          "Web data analytics",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse économique, Analyse quantitative, Éthique des affaires & Gestion de projet",
          "Business English, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Visites d’entreprise, Projet de création d'entreprise, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-supply-chain-management": {
    mention: "GÉNIE LOGISTIQUE – GL",
    specialty: "SUPPLY CHAIN MANAGEMENT – SCM",
    description:
      "La mondialisation et l'intensification de la concurrence exigent une parfaite maîtrise de la chaîne logistique qui constitue un axe stratégique essentiel pour l’entreprise. Le programme de Master en Génie Logistique, Spécialité Supply Chain Management prépare les apprenants à devenir des professionnels des transports et de la logistique, capables d’optimiser l’ensemble des ressources, moyens, méthodes et outils dans le but de piloter efficacement le processus des flux circulant au sein de l'organisation en termes de coûts, délais, qualité et dimension environnementale.",
    career_opportunities_list: [
      "Responsable des opérations logistiques et transports",
      "Coordinateur de parc containers",
      "Responsable logistique / Supply Chain Manager",
      "Gestionnaire de flotte terre / mer / air",
      "Collaborateur commissionnaire / transitaire",
      "Responsable d’affrètement",
      "Acheteur international",
      "Gestionnaire des stocks",
      "Chargé d'ordonnancement et de planification des transports",
      "Responsable d'expédition",
      "Responsable de production",
      "Responsable Achat / approvisionnement",
      "Gestionnaire de plateforme logistique",
      "Gestionnaire de société de transport",
      "Responsable transit",
    ],
    admission_conditions_list: [
      "Ouvert aux étudiants ayant obtenu une Licence en Transport et Logistique, en Management des Affaires Internationales, en Commerce International, en Transit, en Marketing et Communication, en Administration des entreprises ou tout autre diplôme de licence ayant les fondamentaux de la logistique et/ou de la gestion.",
      "Également ouvert aux professionnels évoluant dans le domaine de la logistique, du commerce international et de la douane.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Supply Chain Management",
        items: [
          "Logistique, supply chain management : le concept",
          "Prévision des besoins et gestion des composantes",
          "Chaîne et coûts logistiques",
          "Les méthodes d’approvisionnement & Achats et approvisionnements",
          "Gestion de production et soutien logistique intégré",
          "La gestion des stocks avec Excel",
          "Management de projets logistiques & Code ISPS",
          "Organisation des activités de manutention et de stockage",
          "Emballage – conditionnement & Système d'entreposage",
          "Gestion de plateformes logistiques & Externalisation logistique",
          "Green logistics et reverse logistics",
        ],
      },
      {
        title: "Transport, Douane & E-logistique",
        items: [
          "Introduction au transport, Droit des transports & Économie des transports",
          "Transport et logistique internationale",
          "Politique douanière internationale",
          "E-logistique et géolocalisation",
          "Gestion des SI et ERP & VBA (Excel avancé)",
        ],
      },
      {
        title: "Contrôle, Audit & Outils commerciaux",
        items: [
          "Indicateurs et tableaux de bord",
          "Contrôle de gestion et outils de prévision",
          "Audit logistique",
          "Recherche marketing & Marketing stratégique",
          "Négociation et animation des équipes de vente & Distribution",
          "Économie internationale, Prospection des marchés étrangers, Commerce et finance internationaux & Assurance",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse économique, Analyse quantitative & Recherche opérationnelle en logistique (LIPS)",
          "Éthique des affaires, Management, Stratégie d’entreprise & Gestion de la QHSE",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Visites d’entreprise, Projet de création d'entreprise, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-logistique-et-management-portuaire": {
    mention: "GÉNIE LOGISTIQUE – GL",
    specialty: "LOGISTIQUE ET MANAGEMENT PORTUAIRE – LMP",
    description:
      "Le commerce international dépendant à 90 % du transport maritime fait de ce dernier, avec les ports, un maillon clé de la supply chain. Le programme de Master en Génie Logistique, Spécialité Logistique et Management Portuaire prépare les apprenants à devenir des professionnels des transports et de la logistique maritime, capables de maîtriser toutes les problématiques du commerce international et de gérer l’ensemble des flux portuaires.",
    career_opportunities_list: [
      "Responsable logistique",
      "Responsable de parc containers",
      "Gestionnaire de flotte",
      "Responsable d’affrètement",
      "Chargé d'ordonnancement et de planification des transports",
      "Responsable d'expédition",
      "Consultant en logistique",
      "Gestionnaire de plateforme logistique",
      "Gestionnaire de société de transport",
      "Responsable transit / Responsable de service transit",
      "Responsable d’entrepôt / Responsable d’exploitation",
      "Chef de ligne maritime",
      "Ship manager",
      "Responsable Booking",
      "Expert maritime",
    ],
    admission_conditions_list: [
      "Ouvert aux étudiants ayant obtenu une Licence en Transport et Logistique, en Management des Affaires Internationales, en Commerce International, en Transit, en Marketing et Communication, en Administration des entreprises ou tout autre diplôme de licence ayant les fondamentaux de la logistique et/ou de la gestion.",
      "Également ouvert aux professionnels évoluant dans le domaine de la logistique, du commerce international, du transit, de la douane.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Management portuaire",
        items: [
          "Technologie des bateaux (anglais) & Anglais portuaire",
          "Code ISPS",
          "Booking et cotation & Lignes régulières",
          "Gestion des escales",
          "Organisation et gestion de la manutention portuaire",
          "Culture portuaire & Partenariat entreprises",
          "Vente et prestation maritime",
          "Affrètement et tramping",
          "Organisation et gestion des ports & Communication portuaire",
          "Gestion des flux portuaires et maritimes & Ligne de produit",
          "Transport de marchandises dangereuses",
          "Algorithmes des transports, Étude de la faisabilité d'une ligne & Logiciels de gestion portuaire",
        ],
      },
      {
        title: "Supply Chain Management",
        items: [
          "Logistique, supply chain management : le concept",
          "Chaîne et coûts logistiques",
          "La politique douanière internationale",
          "Transport et logistique internationale",
          "Management de projets logistiques",
        ],
      },
      {
        title: "Droit & Économie maritime",
        items: [
          "Droit africain des transports & Droit du transport international",
          "Droit des assurances maritimes & Droit portuaire",
          "Droit du travail maritime et portuaire & Droit douanier",
          "OHADA et intégration africaine",
          "Politique économique des armateurs & Économie portuaire prospective",
          "Analyse économique & Recherche opérationnelle",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse quantitative, Éthique des affaires, Management, Stratégie & Gestion de la QHSE",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Visites d’entreprise, Projet de création d'entreprise, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-management-de-projet": {
    mention: "MANAGEMENT DE PROJET",
    description:
      "Notre Master en Management de Projet vise à former une nouvelle génération de leaders capables de relever les défis complexes du monde des affaires modernes. Les auditeurs acquerront une compréhension approfondie des principes du management de projet, des compétences en communication, de la gestion du risque et du travail d’équipe. Ils seront dotés des techniques et méthodes de montage, de suivi-évaluation, de contrôle et de leadership liées au Management de projet, de programme et de portefeuille.",
    career_opportunities_list: [
      "Manager de Projet",
      "Expert en suivi-évaluation",
      "Consultant en montage de projet, de programme et de portefeuille",
      "Contrôleur de Projet, de programme et de portefeuille",
      "Chef de programme et de portefeuille",
      "Chargé de Passation de Marchés Publics",
      "Directeur de projet de développement",
      "Consultant en organisation",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d’une Licence en Sciences Économiques et Gestion, Sociologie, Comptabilité, Finance ou tout autre diplôme admis en équivalence.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Méthodes de Gestion et Planification de Projet",
        items: [
          "Généralités sur la Gestion de Projet",
          "Gestion Axée sur les Résultats (GAR 1 & GAR 2)",
          "Financement de Projet",
          "Planification Stratégique 1 & 2",
          "Planification Opérationnelle 1 & 2 (MS Project)",
          "Planification Budgétaire",
        ],
      },
      {
        title: "Outils d'Analyse, Audit et Suivi-Évaluation",
        items: [
          "Analyse économique de Projet",
          "Analyse financière de Projet",
          "Analyse socio-environnementale de Projet",
          "Audit de Projet",
          "Suivi-évaluation 1 & Suivi-évaluation 2",
          "Analyse des données",
        ],
      },
      {
        title: "Outils de base & Techniques comptables et juridiques",
        items: [
          "Statistique & Recherche Opérationnelle",
          "Gestion des Bases de données (Excel Avancé)",
          "Informatique (KoBoToolBox, SPSS)",
          "Comptabilité Générale & Gestion des coûts et des délais",
          "Aspects juridiques et fiscaux des Projets",
        ],
      },
      {
        title: "Mobilisation, Leadership & Conseil",
        items: [
          "Approche participative en conduite de Projet (MARP)",
          "Pérennisation de Projet et autofinancement",
          "Leadership et Team Building en Gestion de Projet",
          "Management culturel de Projet International & Management Agile",
          "Consultance, répondre à un appel d'offres & Passation de Marché",
          "Techniques de Négociation & Gestion de Portefeuille",
        ],
      },
      {
        title: "Sociologie, Performance, Innovation & Pratique Métiers",
        items: [
          "Psychosociologie du travail, Gestion des équipes de Projet (GEP) & Marketing Social",
          "Gestion de la Performance et du changement, Prospective & Éthique en Gestion de Projet",
          "Méthodologie de recherche & Business English",
          "Vie Active et Professionnelle, Stage et Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-management-des-organisations-sanitaires-et-sociales": {
    mention: "MANAGEMENT DES ORGANISATIONS SANITAIRES ET SOCIALES (MO2S)",
    description:
      "Notre Programme Management des Organisations Sanitaires et Sociales (MO2S) cible des étudiants (en formation initiale ou continue) titulaires d’une Licence ou d’un Master en Sciences Sociales ou des Professionnels du secteur de la santé. Il a pour objectif principal de former aux postes de direction dans des organisations publiques et privées du secteur de la santé et médico-social. Il adopte une approche holistique, intégrant la théorie, des études de cas réels, des projets pratiques et une immersion dans les entreprises et les organisations.",
    career_opportunities_list: [
      "Directeur d’hôpital",
      "Responsable Cadre hospitalier / Chef de service dans une structure sanitaire",
      "Gestionnaire du personnel dans le secteur sanitaire ou médico-social",
      "Responsable suivi-évaluation dans un organisme sanitaire ou médico-social",
      "Contrôleur de Gestion hospitalier",
      "Gestionnaire d’un Système d’information dans un établissement sanitaire ou médico-social",
      "Responsable qualité et sécurité dans les organisations sanitaires",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d’une Licence ou d’un Master 1 en Sciences Sociales : Sciences Économiques et Gestion, Marketing, Finance, Sociologie, Comptabilité ou tout autre diplôme admis en équivalence.",
      "Également ouvert aux professionnels du secteur sanitaire ou médico-social.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Outils de base & Aspects juridiques du Management des OS",
        items: [
          "Principes de base de la gestion des OS",
          "Gestion des Bases de données (Excel Avancé)",
          "Économie de la santé & Prospective des OS",
          "Comptabilité de Gestion (gestion des fournitures médicales, inventaire)",
          "Théories des organisations & Gouvernance et Management Stratégique",
          "Gestion économique et financière des OS",
          "Droit Hospitalier, Confidentialité et protection des données des patients & Droit du travail",
        ],
      },
      {
        title: "Planification, Suivi-Évaluation & Logistique des OS",
        items: [
          "Planification Stratégique & Planification Opérationnelle (MS Project)",
          "Gestion Axée sur les Résultats (GAR)",
          "Contrôle de Gestion des OS, Audit & Suivi-évaluation",
          "Gestion de la logistique hospitalière & Gestion des systèmes d'information",
          "Méthodologie de recherche, Business Médical & GRC",
        ],
      },
      {
        title: "Gestion de la QHSE & Comptabilité dans les OS",
        items: [
          "Qualité et normes de sécurité dans les OS",
          "Gestion des risques dans les établissements de santé",
          "Gestion de crise & Gestion de l'Hygiène",
          "Gestion de la caisse & Facturation et Gestion des assurances médicales",
          "Gestion de la pharmacie des OS",
        ],
      },
      {
        title: "Leadership, Gestion du Personnel & Innovation",
        items: [
          "Leadership et Team Building",
          "Recrutement, Formation et Évaluation du personnel sanitaire et social",
          "Fiscalité des revenus des personnes physiques & Éthique et gestion de la diversité",
          "Psychosociologie du travail, Marketing Social, Gestion des conflits & Accueil et Orientation",
          "Conduite du changement, Innovation dans la gestion des OS & RSE",
          "Stage et Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-management-de-la-qualite-hygiene-securite-et-environnement": {
    mention: "QUALITÉ HYGIÈNE SÉCURITÉ ENVIRONNEMENT ET AUDIT – QHSE",
    description:
      "Le Master QHSE et Audit a pour objectif de former des cadres en système de management de la qualité, de l’hygiène, de la sécurité, de l’environnement et de l’audit. Les profils sortants peuvent évoluer dans divers secteurs d’activités : de la distribution aux services en passant par les industries, afin de fournir des produits et services conformes aux normes qualité, d'accroître la satisfaction des clients, d'améliorer la santé et la sécurité des travailleurs, de prévenir toute pollution et de mener des audits QHSE.",
    career_opportunities_list: [
      "Chef de projet environnement et développement durable",
      "Responsable assurance qualité",
      "Responsable prévention des risques professionnels",
      "Responsable sécurité et environnement",
      "Responsable du service hygiène-sécurité",
      "Chargé de mission éthique et déontologie",
      "Directeur de l’environnement",
      "Manager en développement durable",
      "Directeur qualité",
      "Auditeur qualité",
      "Chargé de mission accréditation",
      "Spécialiste des certifications et des normes",
      "Chargé de recherche et développement",
    ],
    admission_conditions_list: [
      "Ouvert aux étudiants ayant obtenu une Licence en QHSE, en Agroalimentaire, Biologie, Pharmacie, Sciences, Sciences Économiques et de Gestion ou tout autre diplôme admis en équivalence.",
      "Accessible aux professionnels évoluant dans le domaine de la QHSE et de la gestion.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Management QHSE",
        items: [
          "Diagnostic et démarches qualité",
          "Les référentiels QHSE",
          "Management de la sécurité, Management de l’environnement & Management de l’hygiène",
          "Gestion documentaire et l’approche processus",
          "Gestion des risques agro-alimentaires",
          "Outils qualité & Certification et accréditation",
          "Qualité totale (EFQM) / analyse de la valeur",
          "Maîtrise statistique des procédés",
        ],
      },
      {
        title: "Audit et contrôle",
        items: [
          "Cadre conceptuel et spécifique de l’audit",
          "Documentation des missions d’audit & Déroulement des missions d’audit",
          "Introduction au contrôle de gestion",
          "Cadre général et conceptuel du contrôle interne",
          "Éthique, déontologie et responsabilité de l’auditeur",
          "Appréciation du contrôle interne et mise en place de procédures",
        ],
      },
      {
        title: "Mise en œuvre & Organisation",
        items: [
          "Système de management intégré",
          "Mise en œuvre QHSE domaine production, services, santé, sécurité",
          "Pratique de l’audit qualité & Visites d’entreprise",
          "Comptabilité financière & Comptabilité de gestion",
          "Organisation industrie, production et services & Gestion de la production",
          "Gestion de la relation client",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Analyse économique, Analyse quantitative & Éthique des affaires",
          "Management et organisation des entreprises, Stratégie d’entreprise & Gestion de projet",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Projet de création d'entreprise, Études de cas, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-management-public-et-innovation-territoriale": {
    mention: "MANAGEMENT PUBLIC ET INNOVATION TERRITORIALE",
    description:
      "Le Master Management Public et Innovation Territoriale forme des cadres supérieurs pour piloter le développement des collectivités territoriales africaines dans un contexte de décentralisation accélérée. Il s'appuie sur une progression logique : les fondamentaux du management public territorial (M1) vers le pilotage stratégique et projets innovants (M2), intégrant les enjeux numériques et durables des territoires africains.",
    career_opportunities_list: [
      "Directeur de cabinet / Secrétaire général de commune ou département",
      "Chargé de mission développement local",
      "Responsable projets territoriaux (collectivités, bailleurs de fonds)",
      "Conseiller en décentralisation (ministères, ONG internationales)",
      "Chef de service finances / RH des collectivités territoriales",
      "Consultant urbanisme et aménagement",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d’une Licence ou d’un Master 1 en Sciences Sociales : Droit et Sciences Politiques, Gestion et Administration Publique, Économie et Développement Local, Sciences de Gestion, Urbanisme et Aménagement, Sociologie et Démographie, Géographie et SIG, Informatique appliquée au territoire ou équivalent.",
      "Également ouvert aux professionnels des collectivités territoriales, ONG de développement ou entreprises publiques.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Gestion publique",
        items: [
          "Budgets locaux",
          "Fiscalité locale",
          "Audit public",
          "Ressources Humaines territoriales",
          "Droit administratif",
        ],
      },
      {
        title: "Pilotage stratégique",
        items: [
          "Diagnostic territorial",
          "Gouvernance des collectivités territoriales",
          "Gestion de crise",
          "Négociation publique",
        ],
      },
      {
        title: "Projets et innovation",
        items: [
          "Méthodologie de projets",
          "Partenariats Public-Privé (PPP)",
          "Innovation organisationnelle",
          "Ateliers créatifs",
        ],
      },
      {
        title: "Développement durable & Outils numériques",
        items: [
          "Urbanisme & Résilience",
          "Environnement & Participation citoyenne",
          "Systèmes d'Information Géographique (SIG)",
          "Communication digitale & Systèmes d'information territoriale",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-business-intelligence-et-strategie-commerciale": {
    mention: "BUSINESS INTELLIGENCE ET STRATÉGIE COMMERCIALE",
    description:
      "Le Master Business Intelligence et Stratégie Commerciale forme des cadres supérieurs capables d'analyser les données stratégiques pour piloter la performance commerciale dans un environnement digitalisé et international. Il répond à la transformation digitale des entreprises, où la Business Intelligence devient un levier stratégique pour la prise de décision, des fondamentaux du management (M1) vers la spécialisation en stratégie data-driven et innovation commerciale (M2).",
    career_opportunities_list: [
      "Consultant Business Intelligence / Stratégie",
      "Responsable Data & Performance Commerciale",
      "Chef de projet digital / E-commerce Manager",
      "Business Developer International",
      "Contrôleur de gestion commerciale",
      "Entrepreneur / Créateur d'entreprise innovante",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d’une Licence ou d’un Master 1 en Sciences Économiques et Gestion, Finance, Commerce, Comptabilité, Marketing, Sociologie, Informatique ou tout autre diplôme admis en équivalence.",
      "Également ouvert aux professionnels du commerce souhaitant se reconvertir ou se perfectionner en Business Intelligence et stratégie commerciale.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Analyse stratégique",
        items: [
          "Business Intelligence",
          "Contrôle de gestion",
          "Audit de projets",
          "Études de marché avancées",
        ],
      },
      {
        title: "Stratégie commerciale",
        items: [
          "Négociation commerciale et internationale",
          "Business models innovants",
          "Stratégie digitale et distribution",
        ],
      },
      {
        title: "Outils techniques & Management opérationnel",
        items: [
          "Excel avancé et outils BI",
          "Supply chain management",
          "Comptabilité analytique",
          "Leadership d'équipes",
          "Gestion de projets complexes",
          "Soft skills professionnels",
        ],
      },
      {
        title: "Innovation responsable",
        items: [
          "Entrepreneuriat",
          "Commerce alternatif (éthique, durable)",
          "Innovation commerciale",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-ingenierie-juridique-et-fiscale": {
    mention: "MANAGEMENT JURIDIQUE ET FISCAL – MJF",
    specialty: "INGÉNIERIE JURIDIQUE ET FISCALE – IJF",
    description:
      "Le programme de Master en Management Juridique et Fiscal, spécialité Ingénierie Juridique et Fiscale, permet en deux années académiques de former des juristes-fiscalistes dotés d’une grande capacité de réflexion et d'analyse juridique et fiscale. Ils seront capables de défendre les intérêts de l’entreprise en prévoyant les risques et en veillant à l’application des lois et règlements, tout en apportant assistance et conseil stratégique au top management.",
    career_opportunities_list: [
      "Juriste-fiscaliste",
      "Auditeur juridique et fiscal",
      "Responsable fiscal",
      "Responsable contentieux",
      "Consultant juriste-fiscaliste",
      "Juriste en assurance",
      "Cadre juridique auprès de sociétés ou associations à but non lucratif",
      "Juriste de collectivité territoriale",
      "Juriste d’entreprise",
      "Conseiller juridique et fiscal",
      "Mandataire liquidateur",
      "Administrateur judiciaire",
    ],
    admission_conditions_list: [
      "Accessible aux étudiants et professionnels ayant au préalable validé une Licence en droit, en fiscalité ou tout autre diplôme de licence ayant les fondamentaux du droit, de la fiscalité et/ou de la gestion.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Ingénierie juridique & Stratégie juridique",
        items: [
          "Droit pénal des affaires et sanctions fiscales",
          "Droit comptable & Contrats spéciaux",
          "Procédures civiles et commerciales",
          "Droit des sûretés & Droit des entreprises en difficulté",
          "Droit du contentieux & Droit bancaire et du crédit",
          "Droit privé international & Droit de la propriété intellectuelle",
          "Procédure simplifiée de recouvrement des créances et voies d’exécution",
          "AG et tenue des livres obligatoires",
          "Le gouvernement d’entreprise et le droit à l’information des associés",
          "Techniques contractuelles & Techniques comptables et problèmes juridiques et fiscaux",
        ],
      },
      {
        title: "Ingénierie fiscale & Stratégie fiscale",
        items: [
          "Généralités sur le droit fiscal, sur l’impôt et la structure du système fiscal sénégalais",
          "IS, IR et les autres impôts directs",
          "TVA et les autres impôts indirects",
          "Fiscalité immobilière & Fiscalité des fusions et opérations assimilées",
          "Taxe sur les activités financières & Fiscalité des hydrocarbures",
          "Incitation à l’investissement",
          "Conventions fiscales internationales & Contrôle et contentieux fiscaux",
        ],
      },
      {
        title: "Système d’information comptable et fiscal",
        items: [
          "Comptabilité financière",
          "Techniques fiscales",
          "Fiscalité approfondie",
          "L’entreprise et l’administration fiscale",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Éthique des affaires, Analyse économique, Management, Stratégie & Gestion de projet",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Projet de création d'entreprise, Études de cas, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-audit-juridique-et-fiscal": {
    mention: "MANAGEMENT JURIDIQUE ET FISCAL – MJF",
    specialty: "AUDIT JURIDIQUE ET FISCAL – AJF",
    description:
      "Le programme de Master en Management Juridique et Fiscal, spécialité Audit Juridique et Fiscal, permet en deux années académiques de former des juristes-fiscalistes et auditeurs capables de défendre les intérêts de l’entreprise en prévoyant les risques, en auditant la conformité juridico-fiscale et en veillant à l’application des lois et règlements. Il s'agit d'une formation à forte dominance en Droit, en Fiscalité et en Audit mais aussi en Comptabilité et en Management.",
    career_opportunities_list: [
      "Juriste-fiscaliste",
      "Auditeur juridique et fiscal",
      "Responsable fiscal",
      "Responsable contentieux",
      "Consultant juriste-fiscaliste",
      "Juriste en assurance",
      "Cadre juridique auprès de sociétés ou associations à but non lucratif",
      "Juriste de collectivité territoriale",
      "Juriste d’entreprise",
      "Juriste de banque et gestionnaire de patrimoine",
      "Administrateur judiciaire",
    ],
    admission_conditions_list: [
      "Accessible aux étudiants et professionnels ayant au préalable validé une Licence en droit, en fiscalité ou tout autre diplôme de licence ayant les fondamentaux du droit, de la fiscalité et/ou de la gestion.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Audit juridique et fiscal & Stratégie fiscale",
        items: [
          "Cadre conceptuel et spécifique de l’audit",
          "Documentation des missions d’audit & Déroulement d’une mission d’audit",
          "Éthique et déontologie de l’auditeur",
          "Appréciation du contrôle interne et mise en place de procédures",
          "Pratique de l’audit juridique et fiscal",
          "Techniques fiscales, Conventions fiscales internationales & Contrôle et contentieux fiscaux",
        ],
      },
      {
        title: "Ingénierie juridique & Stratégie juridique",
        items: [
          "Droit pénal des affaires et sanctions fiscales & Droit comptable",
          "Contrats spéciaux & Procédures civiles et commerciales",
          "Droit des sûretés & Droit des entreprises en difficulté",
          "Droit du contentieux & Droit bancaire et du crédit",
          "Droit privé international & Droit de la propriété intellectuelle",
          "Procédure simplifiée de recouvrement des créances et voies d’exécution",
          "AG et tenue des livres obligatoires & Gouvernement d’entreprise",
          "Techniques contractuelles & Techniques comptables et problèmes juridiques et fiscaux",
        ],
      },
      {
        title: "Ingénierie fiscale & Système d’information comptable",
        items: [
          "Généralités sur le droit fiscal, IS, IR et TVA",
          "Fiscalité immobilière, Fiscalité des fusions & Fiscalité des hydrocarbures",
          "Incitation à l’investissement & Obligations fiscales des banques et établissements financiers",
          "Comptabilité financière, Fiscalité approfondie & L’entreprise et l’administration fiscale",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Éthique des affaires, Analyse économique, Management, Stratégie & Gestion de projet",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Méthodologie de recherche, Projet de création d'entreprise, Études de cas, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-genie-logiciel": {
    mention: "INFORMATIQUE ET RÉSEAU",
    specialty: "GÉNIE LOGICIEL – GELO",
    description:
      "La spécialité Génie Logiciel (GELO) a pour but la maîtrise des outils et des méthodes logicielles destinés à des systèmes complexes : modélisation des connaissances, architectures Web, architectures parallèles, systèmes cyber-physiques et temps réel, systèmes multi-agents, systèmes d’information, Big Data, méthodes de conception et analyse. Le programme permet de former des professionnels de haut niveau pouvant accompagner l’entreprise dans sa transformation numérique.",
    career_opportunities_list: [
      "Analyste programmeur",
      "Développeur informatique Full-Stack",
      "Architecte logiciel",
      "Ingénieur d’études et développement",
      "Architecte et urbaniste de système d’information",
      "Chef de projet informatique",
      "Concepteur / Administrateur des bases de données",
      "Intégrateur de progiciel de gestion en client / serveur",
      "Ingénieur logiciel",
      "Testeur et intégrateur d’application",
      "Consultant IT",
    ],
    admission_conditions_list: [
      "Accessible aux professionnels du domaine de l’informatique et aux étudiants ayant obtenu une Licence en Informatique, en MIAGE, en Mathématiques, en Physique ou tout autre diplôme admis en équivalence.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Ingénierie logicielle",
        items: [
          "Algorithmique, approche orientée objet avancée",
          "Cloud computing",
          "Qualité logicielle : outils et méthodes",
          "UML 2 avancé et design patterns",
          "Intelligence artificielle",
          "Méthodologies agiles",
          "Business intelligence",
          "Data warehouse, Reporting & Data mining",
          "Traitement de données massives",
        ],
      },
      {
        title: "Développement d’applications",
        items: [
          "DBA Oracle & DBA SQL Server",
          "Technologies JEE 1 & Programmation JEE 2",
          "Technologie ASP.NET",
          "Technologie XML / JSON",
          "Développement d’applications mobiles",
          "Programmation Python / Django",
          "Développement d’applications distribuées",
        ],
      },
      {
        title: "Système et sécurité",
        items: [
          "Introduction au Big Data & Traitement Big Data",
          "Cryptographie et politique de sécurité",
          "Ethical hacking",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Management et organisation des entreprises, Droit des TIC & Conduite de projets des SI",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Projets techniques, Projet de création d'entreprise, Stage & Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-systeme-reseau-et-telecommunication": {
    mention: "INFORMATIQUE ET RÉSEAU",
    specialty: "SYSTÈME, RÉSEAU ET TÉLÉCOMMUNICATIONS – SRT",
    description:
      "La spécialité SRT a pour ambition de former des spécialistes en Système, Réseau et Télécommunications, capables non seulement de maîtriser les systèmes de communication d’aujourd’hui, mais également de concevoir et développer les systèmes de demain. Elle s’adresse aux étudiants souhaitant approfondir les méthodes de conception et de réalisation d'architectures systèmes, réseaux et télécoms dans l'entreprise, ainsi que les aspects de sécurité et d'optimisation de ces architectures.",
    career_opportunities_list: [
      "Gestionnaire de système informatique et réseaux",
      "Administrateur réseau et système",
      "Administrateur de bases de données",
      "Responsable maintenance logiciel et matériel pour les réseaux",
      "Gestionnaire de parc informatique",
      "Ingénieur systèmes",
      "Ingénieur réseaux et télécoms",
      "Ingénieur sécurité",
      "Consultant en réseaux et sécurité",
      "Responsable informatique",
      "RSSI (Responsable Sécurité du Système d’Information)",
      "Chef de projet",
    ],
    admission_conditions_list: [
      "Accessible aux professionnels du domaine de l’informatique et aux étudiants ayant obtenu une Licence en Informatique, en MIAGE, en Mathématiques, en Physique ou tout autre diplôme admis en équivalence.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Réseau et Télécommunication",
        items: [
          "CCNA 3 & CCNA 4",
          "Base de la transmission numérique & Traitement numérique du signal",
          "Next Generation Network",
          "Architecture des réseaux fixes et mobiles",
          "CISCO communication unifiée",
          "Réseaux haut débit et qualité de service (QoS)",
          "Dimensionnement et planification des réseaux mobiles",
          "Téléphonie IP niveau 2",
          "Audit des systèmes et réseaux & Ingénierie avancée des réseaux",
          "Internet des objets (IoT)",
          "Modélisation et optimisation du trafic Internet",
        ],
      },
      {
        title: "Système et sécurité",
        items: [
          "Linux administration système avancée",
          "CCNA Security",
          "Cryptographie et politique de sécurité",
          "Ethical hacking",
          "Data warehouse",
        ],
      },
      {
        title: "Fondamentaux informatiques",
        items: [
          "Algorithmique, approche orientée objet avancée",
          "Conduite de projet des SI",
          "Technologies JEE 1 & Cloud computing",
          "Linux administration réseau avancée & Administration avancée Windows Server",
          "Développement d’applications mobiles",
        ],
      },
      {
        title: "Outils de management, Développement personnel & Professionnalisation",
        items: [
          "Management et organisation des entreprises & Droit des TIC",
          "Anglais, Art oratoire, Développement personnel & Culture entrepreneuriale",
          "Projets techniques, Projet de création d'entreprise, Stage & Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: true,
  },

  "master-ingenierie-du-web-et-e-communication": {
    mention: "INFORMATIQUE ET RÉSEAU",
    specialty: "INGÉNIERIE DU WEB ET E-COMMUNICATION (DEVWEB)",
    description:
      "Le Master en Ingénierie du Web et E-communication forme des architectes web, directeurs de projets digitaux et experts en communication numérique capables de concevoir des plateformes web et mobiles complexes tout en pilotant les stratégies d'acquisition, d'e-commerce et de transformation digitale des organisations.",
    career_opportunities_list: [
      "Architecte et Développeur Full-Stack Web & Mobile",
      "Directeur de projet digital / Product Owner",
      "Consultant en E-Communication et Web Marketing",
      "Responsable E-commerce et Transformation Digitale",
      "Directeur d'agence Web et Web Média",
      "Expert SEO / SEA et Web Data Analytics",
    ],
    admission_conditions_list: [
      "Accessible aux titulaires d'une Licence en Informatique, Développement Web, Multimédia, Marketing Digital ou tout autre diplôme admis en équivalence.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Ingénierie Web & Mobile Avancée",
        items: [
          "Architectures Web modernes (Front-End & Back-End)",
          "Frameworks JavaScript & PHP (Symfony, React, Node.js)",
          "Développement d'applications mobiles multiplateformes",
          "Bases de données relationnelles et NoSQL",
          "Sécurité des applications web et Cloud Computing",
        ],
      },
      {
        title: "E-Communication & Stratégie Digitale",
        items: [
          "Marketing digital et E-business",
          "E-commerce et E-logistique",
          "Conception de plateformes marchandes et UX/UI Design",
          "Production de contenu multimédia et Brand Content",
          "Community management et E-réputation",
          "Search Engine Marketing (SEO, SEA, SMO) & Web Data Analytics",
        ],
      },
      {
        title: "Management de projet & Professionnalisation",
        items: [
          "Gestion de projet Agile / Scrum & Conduite de projets SI",
          "Droit des TIC et de la propriété intellectuelle",
          "Anglais professionnel, Leadership & Entrepreneuriat digital",
          "Projets techniques, Stage en entreprise & Mémoire de fin d'études",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-intelligence-artificielle": {
    mention: "INTELLIGENCE ARTIFICIELLE",
    description:
      "Notre Master en Intelligence Artificielle vise à former des experts capables de concevoir, développer et déployer des systèmes intelligents répondant aux enjeux complexes des organisations modernes. Les auditeurs acquerront une maîtrise approfondie des algorithmes d’apprentissage automatique, du traitement des données massives, des modèles de deep learning et des systèmes intelligents pour piloter des projets technologiques à forte valeur ajoutée.",
    career_opportunities_list: [
      "Data Analyst",
      "Data Scientist",
      "Data Engineer",
      "Chief Data Officer (CDO)",
      "Data Protection Officer (DPO)",
      "Architecte Big Data",
      "Consultant Big Data / IA",
      "Entrepreneur IA",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d’une Licence en Informatique, Data Science, Mathématiques, Télécommunications, Statistiques ou tout autre diplôme admis en équivalence.",
      "Les candidats doivent soumettre un dossier de candidature et peuvent être convoqués à un test technique et/ou un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Fondamentaux avancés en IA, Machine Learning & Deep Learning",
        items: [
          "Mathématiques pour l’IA (algèbre linéaire avancée, optimisation)",
          "Probabilités et statistiques avancées",
          "Recherche opérationnelle & Théorie de l’information",
          "Apprentissage supervisé et non supervisé",
          "Réseaux de neurones artificiels",
          "Deep Learning (CNN, RNN, Transformers)",
          "Apprentissage par renforcement",
          "Évaluation et optimisation des modèles",
        ],
      },
      {
        title: "Big Data, Data Engineering & Traitement avancé des données",
        items: [
          "Architectures Big Data & Traitement distribué (Hadoop, Spark)",
          "Data pipelines et ETL",
          "Cloud computing (AWS, Azure, GCP)",
          "Stockage et gestion de données massives",
          "Analyse exploratoire avancée & Feature engineering",
          "Visualisation avancée des données, Data storytelling & Outils BI",
        ],
      },
      {
        title: "IA Appliquée, Développement & Déploiement (MLOps)",
        items: [
          "Traitement du langage naturel (NLP) & Vision par ordinateur",
          "Systèmes de recommandation",
          "IA pour la finance digitale & IA pour la santé et l’industrie",
          "Programmation avancée en Python & Frameworks IA (TensorFlow, PyTorch, Scikit-learn)",
          "MLOps et industrialisation des modèles",
          "APIs, microservices, déploiement cloud et monitoring",
        ],
      },
      {
        title: "Sécurité, Éthique, Gouvernance & Pratique Métiers",
        items: [
          "Sécurité des systèmes intelligents & Protection des données personnelles",
          "Éthique de l’IA, Réglementation, conformité & Gouvernance des données",
          "Gestion de projet agile, Innovation et transformation digitale & Entrepreneuriat technologique",
          "Leadership, Communication scientifique & Anglais technique",
          "Projets tutorés, Études de cas réels, Hackathon IA / Data, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-finance-digitale": {
    mention: "FINANCE DIGITALE",
    description:
      "Notre Master en Finance Digitale vise à former des professionnels capables de maîtriser les transformations technologiques du secteur financier et de piloter des projets innovants intégrant les outils numériques. Les auditeurs acquerront une compréhension approfondie des mécanismes financiers, des technologies digitales (FinTech, Blockchain, IA), des systèmes de paiement électronique et de l’analyse de données financières.",
    career_opportunities_list: [
      "Analyste en finance digitale",
      "Data Analyst en finance",
      "Consultant en transformation digitale des services financiers",
      "Spécialiste FinTech",
      "Analyste en paiement électronique et mobile money",
      "Responsable innovation financière",
      "Gestionnaire de projets FinTech",
      "Responsable conformité et gestion des risques numériques",
      "Entrepreneur dans le domaine de la FinTech",
    ],
    admission_conditions_list: [
      "Être titulaire d’une Licence en finance, économie, gestion, informatique, mathématiques appliquées ou tout diplôme équivalent.",
      "Avoir des connaissances de base en finance et en outils numériques.",
      "Soumettre un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Fondamentaux de la Finance & Environnement FinTech",
        items: [
          "Finance d’entreprise & Marchés financiers",
          "Mathématiques financières, Analyse financière & Gestion des risques",
          "Introduction à la FinTech & Transformation digitale des institutions financières",
          "Écosystème des startups FinTech & Innovation financière",
          "Open banking et API financières",
        ],
      },
      {
        title: "Systèmes de paiement, Monétique & Data financière",
        items: [
          "Monétique et moyens de paiement",
          "Mobile money et finance inclusive",
          "Paiements électroniques et digitaux",
          "Sécurité des transactions & Normes et régulation (PCI-DSS, etc.)",
          "Data science appliquée à la finance & Analyse des données financières",
          "Visualisation des données, Outils BI et reporting",
          "Introduction au Machine Learning pour la finance",
        ],
      },
      {
        title: "Technologies émergentes, Risques & Sécurité",
        items: [
          "Blockchain, cryptomonnaies & Smart contracts",
          "Intelligence artificielle en finance",
          "Automatisation des processus (RPA) & Cloud computing",
          "Gestion des risques financiers & Lutte contre la fraude",
          "Cybersécurité financière",
          "Conformité réglementaire (KYC, AML) & Protection des données",
        ],
      },
      {
        title: "Management, Outils transversaux & Pratique Métiers",
        items: [
          "Gestion de projet (Agile, Scrum) & Stratégie digitale",
          "Marketing des services financiers digitaux, Leadership & Entrepreneuriat FinTech",
          "Programmation Python pour la finance, Bases de données & No-code",
          "Anglais des affaires & Méthodologie de recherche",
          "Études de cas réels, Projets tutorés, Hackathon FinTech, Stage & Mémoire",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },

  "master-langues-etrangeres-appliquees-a-la-gestion-des-entreprises": {
    mention: "LANGUES ÉTRANGÈRES APPLIQUÉES À LA GESTION DES ENTREPRISES – LEAGE",
    description:
      "Le Master Langues Étrangères Appliquées à la Gestion des Entreprises (LEAGE) forme des cadres polyglottes capables de piloter des opérations commerciales, administratives et managériales dans un environnement multiculturel et international. Il combine la maîtrise approfondie des langues d'affaires (Français, Anglais et langues internationales) avec le management stratégique, le commerce international et la communication d'entreprise.",
    career_opportunities_list: [
      "Responsable export / Responsable commercial international",
      "Cadre bilingue / trilingue en entreprise ou organisation internationale",
      "Chargé de communication internationale et relations publiques",
      "Responsable administratif et commercial bilingue",
      "Consultant en management interculturel",
      "Chargé de mission aux affaires étrangères et diplomatiques",
    ],
    admission_conditions_list: [
      "Ouvert aux titulaires d'une Licence LEAGE, Langues Étrangères Appliquées, Lettres, Commerce International, Gestion ou tout autre diplôme admis en équivalence.",
      "Remplir un dossier de candidature et passer un entretien avec un responsable pédagogique.",
    ],
    program_blocks: [
      {
        title: "Langues appliquées aux affaires et à la diplomatie",
        items: [
          "Anglais économique, financier et commercial approfondi",
          "Français administratif, juridique et diplomatique",
          "Traduction spécialisée et rédaction professionnelle bilingue",
          "Négociation commerciale internationale multilingue",
        ],
      },
      {
        title: "Management international et Commerce transfrontalier",
        items: [
          "Management interculturel et gouvernance des organisations",
          "Commerce international, transport et logistique",
          "Marketing international et communication digitale",
          "Droit des affaires et institutions internationales",
        ],
      },
      {
        title: "Outils de gestion & Professionnalisation",
        items: [
          "Comptabilité de gestion et analyse financière",
          "Conduite et gestion de projets internationaux",
          "Méthodologie de recherche, Entrepreneuriat & Leadership",
          "Stage professionnel et Mémoire de fin de parcours",
        ],
      },
    ],
    anaq_sup: true,
    cames: false,
  },
};

